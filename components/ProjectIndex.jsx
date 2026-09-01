import Link from "next/link";
import ProjectMediaImage from "./ProjectMediaImage";

function projectContext(project) {
  return project.office || project.institution || project.studio || project.context || null;
}

export default function ProjectIndex({ projects }) {
  return (
    <section className="project-index" aria-label="Projects">
      {projects.map((project, index) => {
        const context = projectContext(project);

        return (
          <article className="project-index-item" key={project.slug}>
            {project.thumbnail && (
              <figure className="project-index-media" data-ref="project-media">
                <Link href={`/projects/${project.slug}/`} tabIndex={-1} aria-hidden="true">
                  <ProjectMediaImage
                    src={project.thumbnail}
                    alt={project.thumbnailAlt || project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                  />
                </Link>
              </figure>
            )}
            <h2 className="project-index-title" data-ref="project-title">
              <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
            </h2>
            {context && <p className="project-index-meta" data-ref="project-meta">{context}</p>}
            {project.year && <p className="project-index-meta" data-ref="project-year">{project.year}</p>}
          </article>
        );
      })}
    </section>
  );
}
