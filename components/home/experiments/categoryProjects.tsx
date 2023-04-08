import { useExperiments } from "@/context/experimentsContext";
import Image from "next/image";
import React from "react";
import projectCategories from "../projects/projects";

function CategoryProjects() {
   const { activeCategory, setProject } = useExperiments();
   const category = projectCategories[activeCategory];
   return (
      <ul className="flex flex-col">
         {category.map((project, index) => (
            <button
               className="relative flex w-[6rem] aspect-video hover:scale-105 hover:drop-shadow-[0_0_.1rem_#fff]]"
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
