import type { PortfolioProject } from "./model";
import Icon from "../shared/Icon";
export default function ProjectInfo({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <div className="project-copy">
      <span className="eyebrow">{project.kind}</span>
      <div className="project-title">
        <h3 id={"project-" + project.id}>{project.title}</h3>
        <div className="project-links">
          {project.github && (
            <a
              className="icon-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.title + " source code"}
              title="Source code"
            >
              <Icon name="github" />
            </a>
          )}
          {project.link && (
            <a
              className="icon-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Visit " + project.title}
              title="Visit website"
            >
              <Icon name="external" />
            </a>
          )}
        </div>
      </div>
      <p>{project.description}</p>
      <ul className="tech-tags" aria-label={project.title + " technologies"}>
        {project.techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.details && <p className="project-note">{project.details}</p>}
    </div>
  );
}
