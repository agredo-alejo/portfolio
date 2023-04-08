import React from "react";
import projectCategories from "../projects/projects";
import CategoryTabButton from "./categoryTabButton";

function CategoryTabs({}) {
   return (
      <div className="flex w-full justify-evenly">
         {projectCategories.map((category, index) => (
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
