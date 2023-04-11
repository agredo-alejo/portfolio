import { useExperiments } from "@/context/experimentsContext";
import Image from "next/image";
import React from "react";
import { experiments } from "./experimentProjects";

function CategoryProjects() {
   const { activeCategory, setProject } = useExperiments();
   const category = experiments[activeCategory];
   return (
      <ul className="flex ">
         {category.map((project, index) => (
            <button
               className="relative flex w-full mt-1 mx-1 rounded-lg overflow-hidden  aspect-video hover:scale-105 hover:drop-shadow-[0_0_.1rem_#fff]]"
               onClick={() => setProject(index)}
               key={project.link}
            >
               <Image src={project.photoURL} fill alt={project.title} />
            </button>
         ))}
      </ul>
   );
}

export default CategoryProjects;
