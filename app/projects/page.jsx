import ProjectIndex from "../../components/ProjectIndex";
import { getProjectsWithMedia } from "../../content/projectMedia";
import { projects } from "../../content/projects";

export const metadata = {
  title: "Projects",
  description: "A project index spanning professional, academic and research work.",
};

export default function ProjectsPage() {
  const projectsWithMedia = getProjectsWithMedia(projects).map((project) => ({
    id: project.id,
    number: project.number,
    slug: project.slug,
    title: project.title,
    year: project.year,
    type: project.type,
    classification: project.classification,
    category: project.category,
    projectType: project.projectType,
    office: project.office,
    institution: project.institution,
    cardLabel: project.cardLabel,
    tags: project.tags,
    keywords: project.keywords,
    indexFocus: project.indexFocus,
    thumbnail: project.thumbnail,
    thumbnailType: project.thumbnailType,
    thumbnailAlt: project.thumbnailAlt,
    visualVariant: project.visualVariant,
  }));

  return (
    <section className="index-page section-pad page-top">
      <div className="page-intro">
        <span className="eyebrow">Catalogue / {String(projects.length).padStart(2, "0")} projects</span>
        <h1>Project<br />index.</h1>
        <p>
          A visual catalogue across professional, academic, research, computational,
          fabrication and tool-based work.
        </p>
      </div>
      <ProjectIndex projects={projectsWithMedia} />
    </section>
  );
}
