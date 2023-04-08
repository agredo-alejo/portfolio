import { useExperiments } from "@/context/experimentsContext";
import Image from "next/image";
import React from "react";
import projectCategories from "../projects/projects";

function CategoryTabButton({
   category,
   index,
}: {
   category: typeof projectCategories[number];
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
         className="flex justify-center w-full px-4 py-2 text-lg text-center text-white capitalize bg-black/20 hover:scale-105 hover:bg-black/40"
         style={{
            borderRight:
               index !== projectCategories.length - 1
                  ? "1px solid #777"
                  : "none",
         }}
      >
         <span className="relative aspect-square h-[2rem]">
            <Image src={`/${category[0].category}.png`} fill alt="" />
         </span>
         {/* {category[0].category} */}
      </button>
   );
}

export default CategoryTabButton;
