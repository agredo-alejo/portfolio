import Link from "next/link";
import React from "react";

function NavItem({ text, link }: { text: string; link: string }) {
   return (
      <Link
         href={link}
         shallow
         className="flex items-center h-12 px-4 capitalize rounded hover:drop-shadow hover:bg-black/20"
      >
         {text}
      </Link>
   );
}

export default NavItem;
