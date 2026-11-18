export interface PortfolioProject {
  id: string;
  title: string;
  kind: string;
  description: string;
  details?: string;
  desktop: string;
  phone: string;
  link?: string;
  github?: string;
  techs: readonly string[];
}
export interface ProjectPreview {
  title: string;
  image: string;
  device: "desktop" | "phone";
}
