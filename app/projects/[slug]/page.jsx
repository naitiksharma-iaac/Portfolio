import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectBlocks from "../../../components/ProjectBlocks";
import ProjectVisual from "../../../components/ProjectVisual";
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
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const facts = [
    ["Year", project.year],
    ["Type", project.type],
    ["Classification", project.classification],
    ["Role", project.role],
    ["Organisation", project.organisation],
    ["Collaborators", project.collaborators.join(", ") || "—"],
    ["Guides / mentors", project.guides.join(", ") || "—"],
    ["Software", project.software.join(", ")],
  ];

  return (
    <article className="project-page page-top">
      <header className="project-hero section-pad">
        <div className="project-breadcrumb">
          <Link href="/projects">Project index</Link>
          <span>/</span>
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        </div>
        <div className="project-title-row">
          <div>
            <span className="eyebrow">{project.kicker}</span>
            <h1>{project.title}</h1>
          </div>
          <p>{project.shortDescription}</p>
        </div>
        <ProjectVisual className="project-hero-visual" image={project.hero} project={project} />
      </header>

      <section className="project-facts section-pad">
        {facts.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <p>{value}</p>
          </div>
        ))}
        <div>
          <span>Tags</span>
          <p>{project.tags.join(" / ")}</p>
        </div>
      </section>

      <ProjectBlocks blocks={project.blocks} theme={project.visualTheme} />

      <Link className="next-project section-pad" href={`/projects/${nextProject.slug}`}>
        <span className="eyebrow">Next project / {String(((currentIndex + 1) % projects.length) + 1).padStart(2, "0")}</span>
        <span className="next-project-title">{nextProject.title}</span>
        <span className="next-project-arrow" aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
