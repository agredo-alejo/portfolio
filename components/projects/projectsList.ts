import type { PortfolioProject } from "./model";
export const projectsList = [
  {
    id: "daya",
    title: "Daya Muneton",
    kind: "Artist website & commerce",
    description: "A space for her art, her community, and emotional education.",
    desktop: "/projects/daya-desktop.jpg",
    phone: "/projects/daya-phone.jpg",
    link: "https://www.dayamuneton.com/",
    techs: ["Next.js", "React", "Firebase"],
  },
  {
    id: "yatum",
    title: "Experiencia Yatum",
    kind: "Editorial website",
    description:
      "An art-led experience, brought into a website that can grow with it.",
    desktop: "/projects/yatum-desktop.jpg",
    phone: "/projects/yatum-phone.jpg",
    link: "https://www.experienciayatum.com/",
    techs: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "herencia",
    title: "Empanadas Herencia",
    kind: "Commerce & pickup ordering",
    description:
      "From exploring the menu to pickup ordering and behind-the-counter administration.",
    details:
      "The current preview uses simulated orders and does not collect payments.",
    desktop: "/projects/herencia-desktop.jpg",
    phone: "/projects/herencia-phone.jpg",
    link: "https://empanadas-herencia.vercel.app/",
    techs: ["Next.js", "TypeScript", "Firestore"],
  },
  {
    id: "workoutsync",
    title: "WorkoutSync",
    kind: "Personal project",
    description:
      "A training app for recording the work and seeing progress over time.",
    details: "Dashboard shown with sample data.",
    desktop: "/projects/workoutsync-desktop.jpg",
    phone: "/projects/workoutsync-phone.jpg",
    link: "https://www.workoutsync.com/",
    techs: ["Next.js", "React", "Firebase"],
  },
] as const satisfies readonly PortfolioProject[];
