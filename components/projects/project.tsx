import React, { useEffect, useRef, useState } from "react";
import { ProjectType } from "./projects";
import ProjectInfo from "./projectInfo";
import ProjectMockUps from "./projectMockUps";

function Project({ project, index }: { project: ProjectType; index: number }) {
   const [isVisible, setIsVisible] = useState(false);
   const projectRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const refCopy = projectRef.current;
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsVisible(entry.isIntersecting);
         },
         {
            root: null,
            rootMargin: "0px",
            threshold: 0.4,
         }
      );

      if (refCopy) {
         observer.observe(refCopy);
      }

      return () => {
         if (refCopy) {
            observer.unobserve(refCopy);
         }
      };
   }, []);

   const row = index % 2 == 0 ? "sm:flex-row" : "sm:flex-row-reverse";

   return (
      <div
         ref={projectRef}
         className={`flex flex-col items-center w-[85%] mb-4 ${row} sm:justify-center  sm:mb-14 sm:max-w-[75ch] transition-all duration-500 ease-in-out ${
            isVisible ? "" : "scale-[.95] opacity-75"
         } `}
      >
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
