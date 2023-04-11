import Image from "next/image";
import React from "react";
import Skill from "./skill";
import { skills } from "./skills";

function Skills() {
   return (
      <section className="flex flex-col items-center justify-center w-full p-4 mt-8">
         <h2 className="text-2xl text-gray-100 mb-4">Skills | Tech Stack</h2>
         <div className="flex justify-center w-[90%] max-w-md m-auto flex-wrap">
            {skills.map((skill) => (
               <Skill key={skill.link} skill={skill} />
            ))}
         </div>
      </section>
   );
}

export default Skills;
