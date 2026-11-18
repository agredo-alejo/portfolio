import Skill from "./skill";
import { skills } from "./skills";
export default function Skills() {
  return (
    <section className="skills-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills | Tech Stack</h2>
      <div className="skill-list">
        {skills.map((skill) => (
          <Skill key={skill.title} skill={skill} />
        ))}
      </div>
    </section>
  );
}
