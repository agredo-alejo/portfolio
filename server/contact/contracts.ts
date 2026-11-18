import type { ContactMessage } from "../../features/contact/model";
export interface MailDelivery {
  send(message: ContactMessage): Promise<void>;
}
