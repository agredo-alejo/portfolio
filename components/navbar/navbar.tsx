import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <a className="brand-link" href="#intro" aria-label="Alejandro Agredo, back to top">
        <Image
          className="brand-logo"
          src="/brand/alejandro-symbol-grayscale.svg"
          alt=""
          width={256}
          height={256}
          unoptimized
        />
      </a>
      <a href="#projects">Projects</a>
      <a href="#experiments">Experiments</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}
