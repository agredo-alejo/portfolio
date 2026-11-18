import Image from "next/image";
import { skills } from "./skills";
export default function Skill({ skill }: { skill: (typeof skills)[number] }) {
  return (
    <a
      href={skill.link}
      target="_blank"
      rel="noopener noreferrer"
      className="skill-link"
      aria-label={skill.title + " official website"}
    >
      <Image
        src={skill.photoURL}
        width={32}
        height={32}
        alt={skill.title}
        unoptimized
      />
      <span className="skill-tooltip">{skill.title}</span>
    </a>
  );
}
