import type { MailDelivery } from "./contracts";
import { createSmtpDelivery } from "./smtp";
let delivery: MailDelivery | undefined;
export function getMailDelivery() {
  delivery ??= createSmtpDelivery();
  return delivery;
}
