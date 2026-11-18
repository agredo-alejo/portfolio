import ContactLinks from "../contactLinks/contactLinks";
import Icon from "../shared/Icon";
export default function Header() {
  return (
    <header className="intro" id="intro">
      <div className="intro-copy">
        <h1>Hi, I&apos;m Alejandro Agredo</h1>
        <ContactLinks />
        <p className="intro-description">
          My passion for web development is fueled by my love of problem-solving
          and the constant opportunity to learn and improve my skills.
        </p>
      </div>
      <a className="scroll-cue" href="#projects">
        <span>Explore my work</span>
        <Icon name="down" />
      </a>
    </header>
  );
}
