import React from "react";
import ProjectInfo, { ProjectProps } from "./projectInfo";
import ProjectMockUps from "./projectMockUps";

function Project({ project }: ProjectProps) {
   return (
      <div className="flex flex-col items-center w-[85%] mb-4 sm:flex-row sm:justify-center sm:items-start sm:mb-14 sm:max-w-[70ch]">
         <ProjectMockUps
            phone={project.phone}
            desk={project.desk}
            link={project.link}
         />

         <ProjectInfo project={project} />
      </div>
   );
}

export default Project;
