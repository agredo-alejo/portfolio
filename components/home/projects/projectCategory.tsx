import Image from "next/image";
import React from "react";

interface ProjectCategoryProps {
   projectCategory: {
      title: string;
      photoURL: string;
      link: string;
      category: string;
   }[];
}
function ProjectCategory({ projectCategory }: ProjectCategoryProps) {
   return (
      <div className="cursor-pointer self-center grid grid-cols-2 overflow-y-scroll w-[90vw]  scrollbarHide sm:w-[60vw] gap-2">
         {projectCategory.map((project, key) => (
            <a
               rel="noreferrer"
               key={key}
               target="_blank"
               href={project.link}
               className="relative flex w-[100%] aspect-[89/50] drop-shadow-[.1rem_.1rem_.1rem_#000] "
            >
               <Image
                  src={project.photoURL}
                  fill
                  className="rounded-sm"
                  alt={project.title}
               />
            </a>
         ))}
      </div>
   );
}

export default ProjectCategory;
