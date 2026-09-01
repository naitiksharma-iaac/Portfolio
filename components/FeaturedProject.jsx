import Link from "next/link";
import ProjectVisual from "./ProjectVisual";

export default function FeaturedProject({ project, index }) {
  const mediaFirst = index % 2 === 0;

  return (
    <article className={`featured-project ${mediaFirst ? "media-first" : "info-first"}`}>
      <Link className="featured-media" href={`/projects/${project.slug}/`} data-cursor="VIEW">
        <ProjectVisual project={project} />
      </Link>
      <div className="featured-info">
        <span className="eyebrow">Featured / {project.number || String(index + 1).padStart(2, "0")}</span>
        <h3>
          <Link href={`/projects/${project.slug}/`} data-cursor="VIEW">{project.title}</Link>
        </h3>
        <p>{project.shortDescription}</p>
        <div className="featured-meta">
          <span>{project.indexFocus || project.tags.join(" / ")}</span>
          {project.year && <span>{project.year}</span>}
        </div>
      </div>
    </article>
  );
}
