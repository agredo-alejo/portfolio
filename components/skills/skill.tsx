import Image from "next/image";
import React, { useState } from "react";
import { skills } from "./skills";

function Title({ title }: { title: string }) {
   return (
      <div className="absolute p-2 text-black transform -translate-x-1/2 bg-white rounded-md shadow-md bottom-full left-1/2 ">
         {title}
      </div>
   );
}

function Skill({ skill }: { skill: typeof skills[number] }) {
   const [showTitle, setShowTitle] = useState(false);
   const handleClose = () => setShowTitle(false);
   const handleOpen = () => setShowTitle(true);

   return (
      <a
         target="_blank"
         href={skill.link}
         className=" flex items-center m-2  w-8 h-8 hover:drop-shadow-[0_0_.2rem_gray] relative "
         rel="noreferrer"
         onMouseEnter={handleOpen}
         onMouseLeave={handleClose}
         onTouchMove={handleOpen}
         onTouchEnd={handleClose}
      >
         <Image
            src={skill.photoURL}
            alt={skill.title}
            fill
            className="!relative !w-full !h-auto"
         />
         {showTitle && <Title title={skill.title} />}
      </a>
   );
}

export default Skill;
