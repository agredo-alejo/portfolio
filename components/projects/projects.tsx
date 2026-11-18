import { useState } from "react";
import Project from "./project";
import { projectsList } from "./projectsList";
import type { ProjectPreview } from "./model";
import ImageDialog from "./ImageDialog";
export default function Projects() {
  const [preview, setPreview] = useState<ProjectPreview | null>(null);
  return (
    <section
      className="section projects-section"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="section-heading">
        <span className="eyebrow">Websites & software</span>
        <h2 id="projects-heading">Projects</h2>
        <p>Different ideas. Built to work on a real screen.</p>
      </div>
      {projectsList.map((project, index) => (
        <Project
          key={project.id}
          project={project}
          index={index}
          onPreview={setPreview}
        />
      ))}
      <ImageDialog preview={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
