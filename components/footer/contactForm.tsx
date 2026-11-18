import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { CONTACT_LIMITS, validateContact } from "@/features/contact/model";
import type { ContactField } from "@/features/contact/model";
import { professionalContact as contact } from "../shared/contact";
export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>(
    {},
  );
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);
  const submissionId = useRef<string | null>(null);
  function update(field: keyof typeof values, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setStatus(null);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const validated = validateContact(values);
    if (!validated.ok) {
      setErrors(validated.errors);
      const field = Object.keys(validated.errors)[0];
      document.getElementById("contact-" + field)?.focus();
      return;
    }
    setErrors({});
    setPending(true);
    setStatus(null);
    submissionId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionId: submissionId.current }),
      });
      const body: unknown = await response.json();
      if (
        !response.ok ||
        typeof body !== "object" ||
        body === null ||
        !("ok" in body) ||
        body.ok !== true
      ) {
        const message =
          typeof body === "object" &&
          body !== null &&
          "error" in body &&
          typeof body.error === "string"
            ? body.error
            : "Your message could not be sent. Please try again.";
        setStatus({ kind: "error", text: message });
        return;
      }
      setValues({ name: "", email: "", message: "", website: "" });
      submissionId.current = null;
      setStatus({
        kind: "success",
        text: "Your message has been sent. Thank you for getting in touch.",
      });
    } catch {
      setStatus({
        kind: "error",
        text: "Your message could not be sent. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Send Alejandro a message"
      aria-busy={pending}
    >
      <div className="contact-field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={CONTACT_LIMITS.name}
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p className="field-error" id="name-error">
            {errors.name}
          </p>
        )}
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={CONTACT_LIMITS.email}
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p className="field-error" id="email-error">
            {errors.email}
          </p>
        )}
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={CONTACT_LIMITS.minimumMessage}
          maxLength={CONTACT_LIMITS.message}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      <p className="contact-data-note">
        Your name, email, and message are used to reply to your inquiry and
        delivered to my Gmail inbox.
      </p>
      <button className="contact-submit" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Submit"}
      </button>
      {status && (
        <p
          className="contact-status"
          role={status.kind === "error" ? "alert" : "status"}
        >
          {status.text}
          {status.kind === "error" && (
            <>
              {" "}
              <a href={"mailto:" + contact.email}>Email me directly</a>.
            </>
          )}
        </p>
      )}
    </form>
  );
}
