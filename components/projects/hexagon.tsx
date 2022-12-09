import Image from "next/image";
import React from "react";

interface HexagonProps {
  currentKey: number;
  setCategory: Function;
  projectCategory: {
    title: string;
    photoURL: string;
    link: string;
    category: string;
  }[];
}

function Hexagon({ currentKey, setCategory, projectCategory }: HexagonProps) {
  return (
    <div
      onClick={() => setCategory(currentKey)}
      className="hexagon flex cursor-pointer justify-center items-center bg-[#454545] hover:bg-[#555] aspect-square w-[25vw] sm:w-[6rem] "
    >
      <span className="relative w-[35%] aspect-square">
        <Image
          objectFit="contain"
          layout="fill"
          src={`/${projectCategory[0].category}.png`}
          alt=""
        />
      </span>
    </div>
  );
}

export default Hexagon;
