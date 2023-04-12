import React from "react";
import ContactLinks from "../contactLinks/contactLinks";

function Header() {
   return (
      <header className="h-[calc(100vh-3rem)] w-full text-[#eee] flex items-center md:justify-start justify-center md:pl-[20vw] ">
         <div className="flex flex-col justify-center max-w-[70ch] w-[90vw]">
            <h1 className="flex flex-wrap gap-2 text-4xl font-medium text-center capitalize 0">
               <p>Hi,</p>
               <p>{"I'm"}</p>
               <p>Alejandro</p>
               <p>Agredo</p>
            </h1>
            <ContactLinks />
            <p className="mt-2 text-xl ">
               My passion for web development is fueled by my love of
               problem-solving and the constant opportunity to learn and improve
               my skills.
            </p>
         </div>
      </header>
   );
}

export default Header;
