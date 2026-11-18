import ContactLinks from "../contactLinks/contactLinks";
import ContactForm from "./contactForm";
import { professionalContact as contact } from "../shared/contact";
export default function Footer({
  backgroundPaused,
  onToggleBackground,
}: {
  backgroundPaused: boolean;
  onToggleBackground: () => void;
}) {
  return (
    <footer
      className="contact-footer"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading">Contact</h2>
      <ContactForm />
      <ContactLinks />
      <a className="work-phone" href={"tel:" + contact.phone}>
        {contact.phoneDisplay}
      </a>
      <button
        className="background-toggle"
        type="button"
        onClick={onToggleBackground}
      >
        {backgroundPaused ? "Resume" : "Pause"} background animation
      </button>
    </footer>
  );
}
