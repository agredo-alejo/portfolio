import { createHash } from "node:crypto";
const WINDOW = 15 * 60 * 1000;
interface Limit {
  count: number;
  expires: number;
}
export function createContactLimiter() {
  const clients = new Map<string, Limit>();
  let total: Limit = { count: 0, expires: 0 };
  return (key: string, now = Date.now()) => {
    for (const [id, value] of clients)
      if (value.expires <= now) clients.delete(id);
    if (total.expires <= now)
      total = { count: 0, expires: now + 60 * 60 * 1000 };
    if (total.count >= 20) return false;
    const id = createHash("sha256").update(key).digest("hex");
    const current = clients.get(id) || { count: 0, expires: now + WINDOW };
    if (current.count >= 3 || (!clients.has(id) && clients.size >= 1000))
      return false;
    current.count++;
    clients.set(id, current);
    total.count++;
    return true;
  };
}
