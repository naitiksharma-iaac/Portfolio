import Link from "next/link";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project, index, variant = "" }) {
  const visibleTags = project.tags?.slice(0, 3).join(" / ") || project.indexFocus;

  return (
    <article className={`project-card ${variant ? `project-card-${variant}` : ""}`}>
      <Link className="project-card-link" href={`/projects/${project.slug}/`} data-cursor="VIEW">
        <ProjectVisual project={project} />
        <div className="project-card-info">
          <span className="project-number">{project.number || String(index + 1).padStart(2, "0")}</span>
          <div>
            {project.cardLabel && <span className="project-card-label">{project.cardLabel}</span>}
            <h2>{project.title}</h2>
            <p className="project-card-type">
              {[project.category, project.office || project.institution].filter(Boolean).join(" / ")}
            </p>
            {visibleTags && <p className="project-card-tags">{visibleTags}</p>}
          </div>
        </div>
      </Link>
    </article>
  );
}
