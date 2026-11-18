import ContactLinks from "../contactLinks/contactLinks";
import ContactForm from "./contactForm";
export default function Footer() {
  return (
    <footer
      className="contact-footer"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading">Contact</h2>
      <ContactForm />
      <ContactLinks />
    </footer>
  );
}
