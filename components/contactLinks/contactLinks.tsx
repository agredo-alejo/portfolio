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
         <ContactLink link="https://firebasestorage.googleapis.com/v0/b/portfolio-ab1e2.appspot.com/o/docs%2Fresume-alejandro-agredo.pdf?alt=media&token=fddf1703-c020-4e34-9e37-6ef673389328">
            <AttachFileIcon />
         </ContactLink>
      </div>
   );
}

export default ContactLinks;
