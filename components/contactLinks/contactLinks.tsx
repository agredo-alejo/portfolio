import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContactLink from "./contactLink";

function ContactLinks() {
   return (
      <div className="flex text-gray-300">
         <ContactLink link="mailto:agredoalejo@gmail.com">
            <EmailIcon />
         </ContactLink>
         <ContactLink link="https://www.linkedin.com/in/alejandro-agredo-portilla/">
            <LinkedInIcon />
         </ContactLink>
         <ContactLink link="https://github.com/agredo-alejo">
            <GitHubIcon />
         </ContactLink>
         <ContactLink link="/resume-alejandro-agredo.pdf">
            <AttachFileIcon />
         </ContactLink>
      </div>
   );
}

export default ContactLinks;
