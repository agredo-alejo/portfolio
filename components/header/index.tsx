import React, { MouseEventHandler } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

interface HeaderProps {
   scroll: MouseEventHandler<HTMLButtonElement>;
}
function Header({ scroll }: HeaderProps) {
   return (
      <header className="relative w-full h-screen flex flex-col justify-center items-center text-[#eee]">
         <span className="flex flex-col items-center max-w-[60ch]">
            <h1 className=" max-w-[90vw] flex flex-wrap justify-center gap-2 text-4xl text-center">
               <p className="capitalize">Hi,</p>
               <p>I am</p>
               <p className="capitalize">Alejandro</p>
               <p className="capitalize">Agredo</p>
            </h1>
            <p className="mt-2 text-xl text-center">
               A web developer fascinated by problem solving and creating
               interactive graphic interfaces
            </p>
         </span>
         <button
            onClick={scroll}
            className="border-none mt-4 bg-[#80808080] hover:shadow-[0_0_.2rem_#808080] rounded-full flex p-1"
         >
            <KeyboardDoubleArrowDownIcon />
         </button>
      </header>
   );
}

export default Header;
