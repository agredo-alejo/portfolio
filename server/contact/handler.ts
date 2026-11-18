import type { NextApiRequest, NextApiResponse } from "next";
import { validateContact } from "../../features/contact/model";
import type { MailDelivery } from "./contracts";
import { createContactLimiter } from "./limits";
export interface ContactResponse {
  ok: boolean;
  error?: string;
  fields?: Partial<Record<"name" | "email" | "message", string>>;
}
export function createContactHandler(dependencies: {
  getDelivery: () => MailDelivery;
  env?: NodeJS.ProcessEnv;
}) {
  const env = dependencies.env || process.env;
  const limit = createContactLimiter();
  const requests = new Map<
    string,
    { expires: number; result: Promise<boolean> }
  >();
  return async (req: NextApiRequest, res: NextApiResponse<ContactResponse>) => {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ ok: false, error: "Use POST." });
      return;
    }
    if (!req.headers["content-type"]?.startsWith("application/json")) {
      res.status(415).json({ ok: false, error: "Use JSON." });
      return;
    }
    const allowed = new Set([
      "https://www.alejandroagredo.com",
      "https://alejandroagredo.com",
      ...(env.CONTACT_ALLOWED_ORIGIN || "").split(",").filter(Boolean),
    ]);
    if (env.VERCEL_URL) allowed.add("https://" + env.VERCEL_URL);
    if (env.NODE_ENV !== "production" && req.headers.host)
      allowed.add("http://" + req.headers.host);
    if (
      typeof req.headers.origin !== "string" ||
      !allowed.has(req.headers.origin)
    ) {
      res
        .status(403)
        .json({
          ok: false,
          error: "Please use the contact form on this website.",
        });
      return;
    }
    const validation = validateContact(req.body as unknown);
    if (!validation.ok) {
      res
        .status(400)
        .json({
          ok: false,
          fields: validation.errors,
          error: "Check the highlighted fields.",
        });
      return;
    }
    const message = validation.value;
    if (message.website) {
      res.status(200).json({ ok: true });
      return;
    }
    if (!/^[a-zA-Z0-9-]{16,64}$/.test(message.submissionId)) {
      res
        .status(400)
        .json({ ok: false, error: "Refresh the form and try again." });
      return;
    }
    const now = Date.now();
    for (const [key, value] of requests)
      if (value.expires < now) requests.delete(key);
    const previous = requests.get(message.submissionId);
    if (previous) {
      const ok = await previous.result;
      res
        .status(ok ? 200 : 503)
        .json(
          ok
            ? { ok: true }
            : {
                ok: false,
                error:
                  "Email is temporarily unavailable. Please try again or email me directly.",
              },
        );
      return;
    }
    const address = env.VERCEL
      ? typeof req.headers["x-forwarded-for"] === "string"
        ? req.headers["x-forwarded-for"].split(",")[0]
        : req.socket.remoteAddress
      : req.socket.remoteAddress;
    if (!limit(address || "unknown") || requests.size >= 1000) {
      res.setHeader("Retry-After", "900");
      res
        .status(429)
        .json({
          ok: false,
          error: "Please wait a little before sending another message.",
        });
      return;
    }
    const result = (async () => {
      try {
        await dependencies.getDelivery().send(message);
        return true;
      } catch {
        return false;
      }
    })();
    requests.set(message.submissionId, {
      expires: now + 15 * 60 * 1000,
      result,
    });
    const ok = await result;
    if (!ok) requests.delete(message.submissionId);
    res
      .status(ok ? 200 : 503)
      .json(
        ok
          ? { ok: true }
          : {
              ok: false,
              error:
                "Email is temporarily unavailable. Please try again or email me directly.",
            },
      );
  };
}
