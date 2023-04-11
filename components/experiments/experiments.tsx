import { ExperimentsProvider } from "@/context/experimentsContext";
import { scrollIntoView } from "@/utils/scrollIntoView";
import { useRouter } from "next/router";
import React, { useRef, useEffect } from "react";
import CategoryProjects from "./categoryProjects";
import CategoryTabs from "./categoryTabs";
import ExperimentsCanvas from "./experimentsCanvas";

function Experiments() {
   const router = useRouter();
   const scrollRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (router.asPath !== "/experiments") return;

      scrollIntoView(scrollRef);

      router.replace("/", undefined, { shallow: true });
   }, [router]);
   return (
      <ExperimentsProvider>
         <div ref={scrollRef} className="flex flex-col">
            <CategoryTabs />
            <ExperimentsCanvas />
            <CategoryProjects />
         </div>
      </ExperimentsProvider>
   );
}

export default Experiments;
