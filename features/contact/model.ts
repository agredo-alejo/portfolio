export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  message: 5000,
  minimumMessage: 10,
} as const;
export const CONTACT_RECIPIENT = "agredoalejo@gmail.com";
export type ContactField = "name" | "email" | "message";
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  website: string;
  submissionId: string;
}
export type ContactValidation =
  | { ok: true; value: ContactMessage }
  | { ok: false; errors: Partial<Record<ContactField, string>> };
export function validateContact(input: unknown): ContactValidation {
  if (typeof input !== "object" || input === null || Array.isArray(input))
    return { ok: false, errors: { message: "Please complete the form." } };
  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const errors: Partial<Record<ContactField, string>> = {};
  if (
    name.length < 2 ||
    name.length > CONTACT_LIMITS.name ||
    /[\u0000-\u001f\u007f]/.test(name)
  )
    errors.name = "Enter a name between 2 and 80 characters.";
  if (
    email.length > CONTACT_LIMITS.email ||
    !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(email)
  )
    errors.email = "Enter a valid email address.";
  if (
    message.length < CONTACT_LIMITS.minimumMessage ||
    message.length > CONTACT_LIMITS.message ||
    /[\u0000\u0008\u000b\u000c\u007f]/.test(message)
  )
    errors.message = "Write a message between 10 and 5,000 characters.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      name,
      email,
      message,
      website: typeof raw.website === "string" ? raw.website : "",
      submissionId:
        typeof raw.submissionId === "string" ? raw.submissionId : "",
    },
  };
}
