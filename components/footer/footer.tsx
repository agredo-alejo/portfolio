import ContactLinks from "@/components/contactLinks/contactLinks";
import { scrollIntoView } from "@/utils/scrollIntoView";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import ContactForm from "./contactForm";

function Footer() {
   const router = useRouter();
   const scrollRef = useRef<HTMLFormElement>(null);

   useEffect(() => {
      if (router.asPath !== "/contact") return;

      scrollIntoView(scrollRef);
   }, [router]);

   return (
      <footer
         ref={scrollRef}
         className="topTriangleClipPath w-full bg-[#555] flex flex-col items-center pt-16 pb-8"
      >
         <h2 className="text-2xl text-white">Contact</h2>
         <ContactForm />
         <ContactLinks />
      </footer>
   );
}

export default Footer;
