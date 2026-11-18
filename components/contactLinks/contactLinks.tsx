import ContactLink from "./contactLink";
import Icon from "../shared/Icon";
import { professionalContact as contact } from "../shared/contact";
export default function ContactLinks() {
  return (
    <div className="contact-links" aria-label="Professional links">
      <ContactLink link={"mailto:" + contact.email} label="Email Alejandro">
        <Icon name="email" />
      </ContactLink>
      <ContactLink link={contact.linkedin} label="LinkedIn profile">
        <Icon name="linkedin" />
      </ContactLink>
      <ContactLink link={contact.github} label="GitHub profile">
        <Icon name="github" />
      </ContactLink>
      <ContactLink link={contact.resume} label="Open résumé PDF">
        <Icon name="resume" />
      </ContactLink>
      <ContactLink link={"tel:" + contact.phone} label="Call Alejandro">
        <Icon name="phone" />
      </ContactLink>
    </div>
  );
}
