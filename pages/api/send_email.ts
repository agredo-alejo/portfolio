import { createContactHandler } from "@/server/contact/handler";
import { getMailDelivery } from "@/server/contact/composition";
export const config = { api: { bodyParser: { sizeLimit: "12kb" } } };
export default createContactHandler({ getDelivery: getMailDelivery });
