import Link from "next/link";
import React from "react";

function ContactLink({
   link,
   children,
}: {
   link: string;
   children: React.ReactNode;
}) {
   return (
      <Link
         href={link}
         target="_blank"
         className="hover:text-white hover:drop-shadow-[0_0_.1rem_gray] drop-shadow-[.1rem_.1rem_.1rem_#454545] m-2"
      >
         {children}
      </Link>
   );
}

export default ContactLink;
