import { useExperiments } from "@/context/experimentsContext";
import Image from "next/image";
import React, { useRef, useState } from "react";
import projectCategories from "../projects/projects";

function ExperimentsCanvas() {
   const { activeCategory, project } = useExperiments();
   // const [canvasProject,setCanvasProject] = useState()
   const link = projectCategories[activeCategory][project].link;
   // const canvasRef = useRef<HTMLCanvasElement>(null);

   // return <canvas ref={canvasRef} className="flex" />;
   return (
      <iframe
         src={link}
         className="flex relative max-w-xl !aspect-video w-[70vw] "
      />
   );
}

export default ExperimentsCanvas;
