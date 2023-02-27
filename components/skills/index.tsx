import Image from "next/image";
import React from "react";
import { skills } from "./skills";

function Skills() {
   return (
      <section className="flex flex-col items-center justify-center w-full p-4 mt-8">
         <h2 className="text-2xl text-gray-100">Skills</h2>
         <div className="flex justify-center w-[90%] max-w-md m-auto flex-wrap">
            {skills.map((skill, key) => (
               <a
                  key={key}
                  target="_blank"
                  href={skill.link}
                  className="flex items-center m-2 relative w-7 h-7 hover:drop-shadow-[0_0_.2rem_gray]"
                  rel="noreferrer"
               >
                  <Image
                     src={skill.photoURL}
                     alt={skill.title}
                     objectFit="contain"
                     layout="fill"
                  />
               </a>
            ))}
         </div>
      </section>
   );
}

export default Skills;
