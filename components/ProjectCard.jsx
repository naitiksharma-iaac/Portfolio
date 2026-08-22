import Link from "next/link";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project, index, compact = false }) {
  return (
    <article className={`project-card ${compact ? "is-compact" : ""}`}>
      <Link className="project-card-link" href={`/projects/${project.slug}`}>
        <ProjectVisual project={project} />
        <div className="project-card-info">
          <div className="project-card-topline">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>
          <h3>{project.title}</h3>
          <div className="project-card-bottomline">
            <span>{project.type}</span>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
