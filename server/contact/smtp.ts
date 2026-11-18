import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { PUBLIC_CONTACT_EMAIL } from "../../features/contact/addresses";
import type { MailDelivery } from "./contracts";
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
export function createSmtpDelivery(
  env: NodeJS.ProcessEnv = process.env,
): MailDelivery & { verify(): Promise<true> } {
  const user = env.SMTP_TRANSPORT_USER || env.SMTP_USER;
  const sender = env.CONTACT_SENDER || PUBLIC_CONTACT_EMAIL;
  const recipient = env.CONTACT_RECIPIENT || PUBLIC_CONTACT_EMAIL;
  if (!user || ![user, sender, recipient].every(address => emailPattern.test(address)))
    throw new Error("Invalid mail address configuration");
  let options: SMTPTransport.Options;
  if (env.CONTACT_MAIL_TRANSPORT === "smtp") {
    const host = env.SMTP_HOST;
    if (!host) throw new Error("Mail is not configured");
    const local = ["127.0.0.1", "localhost", "::1"].includes(host);
    if (!local && (!env.SMTP_USER || !env.SMTP_PASSWORD))
      throw new Error("Authenticated SMTP is required");
    const port = Number(env.SMTP_PORT || 465);
    if (!Number.isInteger(port) || port < 1 || port > 65535)
      throw new Error("Invalid SMTP port");
    options = {
      host,
      port,
      secure: env.SMTP_SECURE === "true" || port === 465,
      auth:
        env.SMTP_USER && env.SMTP_PASSWORD
          ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
          : undefined,
      ignoreTLS: local,
    };
  } else if (
    env.GOOGLE_APIS_CLIENT_ID &&
    env.GOOGLE_APIS_CLIENT_SECRET &&
    env.GOOGLE_APIS_REFRESH_TOKEN
  ) {
    // Reuse the existing Google OAuth credentials; Nodemailer refreshes access tokens.
    options = {
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId: env.GOOGLE_APIS_CLIENT_ID,
        clientSecret: env.GOOGLE_APIS_CLIENT_SECRET,
        refreshToken: env.GOOGLE_APIS_REFRESH_TOKEN,
      },
    };
  } else if (env.SMTP_PASSWORD) {
    options = { service: "gmail", auth: { user, pass: env.SMTP_PASSWORD } };
  } else throw new Error("Mail is not configured");
  const transport = nodemailer.createTransport({
    ...options,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    logger: false,
    debug: false,
  });
  return {
    verify: () => transport.verify(),
    async send(message) {
      const result = await transport.sendMail({
        from: { name: "Alejandro Agredo Portfolio", address: sender },
        to: recipient,
        replyTo: message.email,
        subject: "Portfolio message from " + message.name,
        text:
          "Name: " +
          message.name +
          "\nReply email: " +
          message.email +
          "\n\n" +
          message.message,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      if (!result.accepted?.length)
        throw new Error("Mail server did not accept the recipient");
    },
  };
}
