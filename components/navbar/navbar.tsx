import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <a className="brand-link" href="#intro" aria-label="Alejandro Agredo, back to top">
        <picture>
          <source media="(min-width: 681px)" srcSet="/brand/alejandro-wordmark-blue.svg" />
          <Image
            className="brand-logo"
            src="/brand/alejandro-symbol-blue.svg"
            alt=""
            width={256}
            height={256}
            unoptimized
          />
        </picture>
      </a>
      <a href="#projects">Projects</a>
      <a href="#experiments">Experiments</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}
