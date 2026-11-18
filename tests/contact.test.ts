import { test } from "node:test";
import assert from "node:assert/strict";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateContact } from "../features/contact/model";
import { createContactHandler } from "../server/contact/handler";
import type { ContactResponse } from "../server/contact/handler";
import { createContactLimiter } from "../server/contact/limits";
const valid = {
  name: "Portfolio Test",
  email: "sender@example.com",
  message: "A synthetic contact form verification message.",
  website: "",
  submissionId: "00000000-0000-4000-8000-000000000001",
};
function request(
  body: unknown = valid,
  overrides: Partial<NextApiRequest> = {},
) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3140",
      host: "localhost:3140",
    },
    socket: { remoteAddress: "127.0.0.1" },
    body,
    ...overrides,
  } as NextApiRequest;
}
function response() {
  let code = 200;
  let body: ContactResponse | undefined;
  const headers: Record<string, string | number | readonly string[]> = {};
  const res = {
    setHeader: (key: string, value: string | number | readonly string[]) => {
      headers[key] = value;
      return res;
    },
    status: (value: number) => {
      code = value;
      return res;
    },
    json: (value: ContactResponse) => {
      body = value;
      return res;
    },
  };
  return {
    res: res as unknown as NextApiResponse<ContactResponse>,
    get code() {
      return code;
    },
    get body() {
      return body;
    },
    headers,
  };
}
function handler(send = async () => {}) {
  return createContactHandler({
    getDelivery: () => ({ send }),
    env: { NODE_ENV: "test" },
  });
}
test("trims valid names and retains message line breaks", () => {
  const result = validateContact({
    ...valid,
    name: "  Alejandro Agredo  ",
    message: "A useful message.\nWith another line.",
  });
  assert(result.ok);
  assert.equal(result.value.name, "Alejandro Agredo");
  assert(result.value.message.includes("\n"));
});
test("rejects header injection, invalid types and oversized messages", () => {
  for (const payload of [
    null,
    [],
    { ...valid, name: "Name\r\nBcc: other@example.com" },
    { ...valid, email: ["a@example.com"] },
    { ...valid, message: "x".repeat(5001) },
  ])
    assert.equal(validateContact(payload).ok, false);
});
test("rejects methods and cross-origin submissions without calling mail", async () => {
  let calls = 0;
  const run = handler(async () => {
    calls++;
  });
  for (const req of [
    request(valid, { method: "GET" }),
    request(valid, {
      headers: {
        origin: "https://attacker.example",
        "content-type": "application/json",
      },
    }),
    request({ ...valid, email: "bad" }),
  ]) {
    const res = response();
    await run(req, res.res);
    assert(res.code >= 400);
  }
  assert.equal(calls, 0);
});
test("honeypot submissions do not send email", async () => {
  let calls = 0;
  const res = response();
  await handler(async () => {
    calls++;
  })(request({ ...valid, website: "bot" }), res.res);
  assert.equal(res.code, 200);
  assert.equal(calls, 0);
});
test("duplicate concurrent submissions deliver once", async () => {
  let calls = 0;
  const run = handler(async () => {
    calls++;
    await new Promise((resolve) => setTimeout(resolve, 15));
  });
  const first = response(),
    second = response();
  await Promise.all([run(request(), first.res), run(request(), second.res)]);
  assert.equal(calls, 1);
  assert.equal(first.body?.ok, true);
  assert.equal(second.body?.ok, true);
});
test("delivery failures return a safe error without exposing credentials", async () => {
  const res = response();
  await handler(async () => {
    throw new Error("secret-token-do-not-expose");
  })(request(), res.res);
  assert.equal(res.code, 503);
  assert.equal(res.body?.ok, false);
  assert(!JSON.stringify(res.body).includes("secret-token"));
});
test("per-client rate limit is bounded and expires", () => {
  const limit = createContactLimiter();
  assert(limit("one", 1000));
  assert(limit("one", 1001));
  assert(limit("one", 1002));
  assert(!limit("one", 1003));
  assert(limit("two", 1004));
  assert(limit("one", 1000 + 15 * 60 * 1000));
});
