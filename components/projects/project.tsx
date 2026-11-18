import type { PortfolioProject, ProjectPreview } from "./model";
import ProjectInfo from "./projectInfo";
import DeviceMockups from "./DeviceMockups";
export default function Project({
  project,
  index,
  onPreview,
}: {
  project: PortfolioProject;
  index: number;
  onPreview: (preview: ProjectPreview) => void;
}) {
  return (
    <article
      className={"project-row " + (index % 2 ? "project-row-reverse" : "")}
      aria-labelledby={"project-" + project.id}
    >
      <DeviceMockups project={project} onPreview={onPreview} />
      <ProjectInfo project={project} />
    </article>
  );
}
