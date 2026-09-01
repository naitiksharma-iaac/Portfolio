import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectContentRenderer from "../../../components/ProjectContentRenderer";
import ProjectCredits from "../../../components/ProjectCredits";
import ProjectMeta from "../../../components/ProjectMeta";
import { attachProjectMedia } from "../../../content/projectMedia";
import { getProject, projects } from "../../../content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.shortDescription };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const sourceProject = getProject(slug);
  const project = sourceProject ? attachProjectMedia(sourceProject) : null;
  if (!project) notFound();

  const introduction = project.introduction?.length ? project.introduction : [project.shortDescription].filter(Boolean);

  return (
    <article className="project-page">
      <header className="project-header">
        <h1>{project.title}</h1>
        <ProjectMeta project={project} />
      </header>

      {introduction.length > 0 && (
        <section className="project-introduction">
          {introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      )}

      <ProjectContentRenderer content={project.content} project={project} />
      <ProjectCredits project={project} />
      <nav className="project-back" aria-label="Back to main page">
        <Link href="/">Back to Main</Link>
      </nav>
    </article>
  );
}
