import { useExperiments } from "@/context/experimentsContext";
import Image from "next/image";
import React from "react";
import { experiments } from "./experimentProjects";

function CategoryTabButton({
   category,
   index,
}: {
   category: typeof experiments[number];
   index: number;
}) {
   const { activeCategory, setActiveCategory, setProject } = useExperiments();

   const handleSetCategory = () => {
      setActiveCategory(index);
      setProject(0);
   };

   return (
      <button
         onClick={handleSetCategory}
         className={`flex justify-center w-full px-4 py-3 text-lg text-center text-white capitalize bg-black/20 hover:scale-105 hover:bg-black/40 ${
            activeCategory === index && "bg-black"
         }`}
         style={{
            borderRight:
               index !== experiments.length - 1 ? "1px solid #777" : "none",
         }}
      >
         <span className="relative aspect-square h-[1.5rem] sm:h-[2rem]">
            <Image src={`/${category[0].category}.png`} fill alt="" />
         </span>
         {/* {category[0].category} */}
      </button>
   );
}

export default CategoryTabButton;
