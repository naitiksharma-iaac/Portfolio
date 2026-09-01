import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectChapterIndex from "../../../components/ProjectChapterIndex";
import ProjectContentRenderer from "../../../components/ProjectContentRenderer";
import ProjectCredits from "../../../components/ProjectCredits";
import ProjectMeta from "../../../components/ProjectMeta";
import ProjectNavigation from "../../../components/ProjectNavigation";
import ProjectVisual from "../../../components/ProjectVisual";
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

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="project-page page-top">
      <header className="project-hero section-pad">
        <div className="project-breadcrumb">
          <Link href="/projects/">Project index</Link>
          <span>/</span>
          <span>{project.number}</span>
        </div>
        <div className="project-title-row">
          <div>
            <p className="project-classification">{project.type}</p>
            <h1>{project.title}</h1>
          </div>
          <div>
            {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
            <p className="project-statement">{project.shortDescription}</p>
          </div>
        </div>
        <ProjectMeta project={project} />
        <ProjectVisual
          className="project-hero-visual"
          project={project}
          source={project.heroMedia}
          sourceType={project.heroMediaType}
          alt={project.heroAlt}
          eager
          lightbox
        />
      </header>

      <section className="project-introduction section-pad" aria-labelledby="project-introduction-title">
        <span className="eyebrow">Introduction</span>
        <div>
          <h2 id="project-introduction-title">Project overview</h2>
          {project.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <ProjectChapterIndex content={project.content} />
      <ProjectContentRenderer content={project.content} project={project} />
      <ProjectCredits project={project} />
      <ProjectNavigation previousProject={previousProject} nextProject={nextProject} />
    </article>
  );
}
