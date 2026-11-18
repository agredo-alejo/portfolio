import { SMTPServer } from "smtp-server";
import http from "node:http";
import { spawn } from "node:child_process";
const messages = [];
let failNext = false;
const smtp = new SMTPServer({
  secure: false,
  authOptional: true,
  disabledCommands: ["AUTH", "STARTTLS"],
  logger: false,
  onData(stream, session, callback) {
    let content = "";
    stream.on("data", (chunk) => {
      content += chunk.toString();
    });
    stream.on("end", () => {
      if (failNext) {
        failNext = false;
        const error = new Error("Synthetic SMTP failure");
        error.responseCode = 451;
        callback(error);
        return;
      }
      messages.push({
        from: session.envelope.mailFrom,
        to: session.envelope.rcptTo,
        content,
      });
      callback();
    });
  },
});
await new Promise((resolve) => smtp.listen(3150, "127.0.0.1", resolve));
const fixtures = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/fail-next" && req.method === "POST") {
    failNext = true;
    res.end("{}");
  } else if (req.url === "/messages") {
    res.end(JSON.stringify(messages));
  } else {
    res.statusCode = 404;
    res.end("{}");
  }
});
await new Promise((resolve) => fixtures.listen(3151, "127.0.0.1", resolve));
const [major, minor] = process.versions.node.split(".").map(Number);
const flags =
  major === 22 && minor < 12 ? ["--experimental-require-module"] : [];
const child = spawn(
  process.execPath,
  [
    ...flags,
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3141",
  ],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
      CONTACT_MAIL_TRANSPORT: "smtp",
      SMTP_HOST: "127.0.0.1",
      SMTP_PORT: "3150",
      SMTP_SECURE: "false",
      SMTP_USER: "",
      SMTP_PASSWORD: "",
      SMTP_TRANSPORT_USER: "portfolio@example.test",
      CONTACT_ALLOWED_ORIGIN: "http://127.0.0.1:3141",
    },
  },
);
function stop() {
  child.kill();
  smtp.close();
  fixtures.close();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
child.on("exit", (code) => {
  smtp.close();
  fixtures.close();
  process.exit(code ?? 0);
});
