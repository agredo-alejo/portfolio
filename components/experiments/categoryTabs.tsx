import React from "react";
import { experiments } from "./experimentProjects";
import CategoryTabButton from "./categoryTabButton";

function CategoryTabs({}) {
   return (
      <div className="flex w-full justify-evenly">
         {experiments.map((category, index) => (
            <CategoryTabButton
               key={category[0].link}
               category={category}
               index={index}
            />
         ))}
      </div>
   );
}

export default CategoryTabs;
