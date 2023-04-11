import { scrollIntoView } from "@/utils/scrollIntoView";

import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Project from "./project";
import { projectsList } from "./projectsList";

export type ProjectType = typeof projectsList[number];

function Projects() {
   const router = useRouter();
   const scrollRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (router.asPath !== "/projects") return;

      scrollIntoView(scrollRef);

      router.replace("/", undefined, { shallow: true });
   }, [router]);
   return (
      <section
         ref={scrollRef}
         className="flex flex-col items-center w-full pt-4 mb-16 gap-y-12"
      >
         {projectsList.map((project, index) => (
            <Project key={project.link} project={project} index={index} />
         ))}
      </section>
   );
}

export default Projects;
