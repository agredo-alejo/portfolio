import Link from "next/link";
import React from "react";
import NavItem from "./navItem";

function Navbar() {
   return (
      <div className="flex justify-end w-full text-white ">
         <NavItem text="projects" link="/projects" />
         <NavItem text="experiments" link="/experiments" />
         <NavItem text="contact" link="/contact" />
      </div>
   );
}

export default Navbar;
