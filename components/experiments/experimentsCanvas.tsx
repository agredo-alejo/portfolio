import { useExperiments } from "@/context/experimentsContext";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { experiments } from "./experimentProjects";

function ExperimentsCanvas() {
   const { activeCategory, project } = useExperiments();
   const link = experiments[activeCategory][project].link;
   const iframeRef = useRef<HTMLIFrameElement>(null);

   useEffect(() => {
      iframeRef.current?.contentWindow?.location.reload();
   }, []);

   return (
      <iframe
         ref={iframeRef}
         src={link}
         allow="autoplay"
         className="flex relative max-w-xl !aspect-video w-[90vw] bg-white"
      />
   );
}

export default ExperimentsCanvas;
