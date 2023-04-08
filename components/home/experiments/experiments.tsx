import { ExperimentsProvider } from "@/context/experimentsContext";
import React from "react";
import CategoryProjects from "./categoryProjects";
import CategoryTabs from "./categoryTabs";
import ExperimentsCanvas from "./experimentsCanvas";

function Experiments() {
   return (
      <ExperimentsProvider>
         <div className="flex flex-col">
            <CategoryTabs />
            <div className="flex">
               <ExperimentsCanvas />
               <CategoryProjects />
            </div>
         </div>
      </ExperimentsProvider>
   );
}

export default Experiments;
