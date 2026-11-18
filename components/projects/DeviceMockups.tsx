import Image from "next/image";
import type { PortfolioProject, ProjectPreview } from "./model";
export default function DeviceMockups({
  project,
  onPreview,
}: {
  project: PortfolioProject;
  onPreview: (preview: ProjectPreview) => void;
}) {
  return (
    <div className="device-pair">
      <button
        type="button"
        className="laptop-mockup"
        aria-label={"Open " + project.title + " desktop image"}
        onClick={() =>
          onPreview({
            title: project.title,
            image: project.desktop,
            device: "desktop",
          })
        }
      >
        <span className="laptop-display">
          <span className="device-camera" />
          <Image
            src={project.desktop}
            alt={project.title + " on a laptop"}
            width={1280}
            height={800}
            sizes="(max-width: 680px) 80vw, 43vw"
          />
        </span>
        <span className="laptop-base">
          <span />
        </span>
      </button>
      <button
        type="button"
        className="phone-mockup"
        aria-label={"Open " + project.title + " phone image"}
        onClick={() =>
          onPreview({
            title: project.title,
            image: project.phone,
            device: "phone",
          })
        }
      >
        <span className="phone-display">
          <span className="phone-camera" />
          <Image
            src={project.phone}
            alt={project.title + " on a phone"}
            width={390}
            height={844}
            sizes="(max-width: 680px) 24vw, 12vw"
          />
        </span>
      </button>
    </div>
  );
}
