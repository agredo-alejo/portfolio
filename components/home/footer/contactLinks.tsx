import React, { useEffect, useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

const links = [
   {
      link: "mailto:agredoalejo@gmail.com",
      icon: <EmailIcon />,
   },
   {
      link: "https://www.linkedin.com/in/alejandro-agredo-portilla/",
      icon: <LinkedInIcon />,
   },
   {
      link: "https://github.com/agredo-alejo",
      icon: <GitHubIcon />,
   },
   {
      link: "https://firebasestorage.googleapis.com/v0/b/portfolio-ab1e2.appspot.com/o/docs%2Fresume-alejandro-agredo.pdf?alt=media&token=fddf1703-c020-4e34-9e37-6ef673389328",
      icon: <AttachFileIcon />,
   },
];

function ContactLinks() {
   const [resume, setResume] = useState("");
   useEffect(() => {
      const getResume = async () => {
         const resume = await getDoc(doc(db, "docs", "resume"));
         if (!resume.exists()) return console.log("No resume found");
         setResume(resume.data().pdf);
      };
      getResume();
   }, []);

   return (
      <div className="flex flex-wrap justify-center w-full my-4 text-gray-300">
         {links.map((link, key) => (
            <span
               key={link.link}
               className="flex m-2 hover:text-white hover:drop-shadow-[0_0_.1rem_gray] "
            >
               <a
                  href={key === 3 ? resume : link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex drop-shadow-[.1rem_.1rem_.1rem_#454545]"
                  download={key === 3}
               >
                  {link.icon}
               </a>
            </span>
         ))}
      </div>
   );
}

export default ContactLinks;
