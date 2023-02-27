import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import { WebProject } from ".";

export interface ProjectProps {
   project: WebProject;
}

function ProjectInfo({ project }: ProjectProps) {
   return (
      <div className="flex flex-col max-w-xl p-2 mb-4 ml-4 text-gray-200 sm:w-1/2">
         <div className="flex items-center justify-between w-full mb-2 mr-4">
            <h2 className="text-2xl notranslate">{project.title}</h2>
            <span className="flex items-center justify-center text-xl">
               <a
                  className="flex "
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
               >
                  <FiGithub className="hover:drop-shadow-[.1rem_0_.1rem_gray]" />
               </a>
               <a
                  className="flex ml-1"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
               >
                  <BiLinkExternal className="hover:drop-shadow-[.1rem_0_.1rem_gray]" />
               </a>
            </span>
         </div>

         <span className="flex flex-wrap border-b-2 border-[#444] ">
            {project.techs.map((tech: string) => (
               <p
                  key={tech}
                  className="mr-2 mb-2 px-2 bg-[#0000001a] text-white cursor-default notranslate"
               >
                  {tech}
               </p>
            ))}
         </span>
      </div>
   );
}

export default ProjectInfo;
