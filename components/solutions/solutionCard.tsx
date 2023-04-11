import Link from "next/link";
import React from "react";

function SolutionCard({
   children,
   text,
}: {
   children: React.ReactNode;
   text: string;
}) {
   return (
      <Link
         href="/contact"
         shallow
         className="flex flex-col items-center w-full sm:max-w-[35ch] max-w-sm px-12 py-8 text-white sm:px-4"
      >
         <div className="mb-6">{children}</div>
         <div>{text}</div>
      </Link>
   );
}

export default SolutionCard;
