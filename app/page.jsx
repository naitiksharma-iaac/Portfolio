import Link from "next/link";
import FeaturedProject from "../components/FeaturedProject";
import { getProjectsWithMedia } from "../content/projectMedia";
import { projects } from "../content/projects";
import { site } from "../content/site";

export default function HomePage() {
  const projectsWithMedia = getProjectsWithMedia(projects);
  const featuredProjects = projectsWithMedia.filter((project) => project.featured);

  return (
    <>
      <section className="home-hero section-pad">
        <div className="hero-topline">
          <span>{site.role}</span>
          <span>{site.location}</span>
        </div>
        <div className="hero-name" aria-label={site.name}>
          <span>Naitik</span>
          <span>Sharma<span className="accent-dot">.</span></span>
        </div>
        <div className="hero-context">
          <p>{site.academicContext.programme}</p>
          <p>{site.academicContext.institution}</p>
          <p>{site.academicContext.period}</p>
        </div>
        <Link className="hero-index-link" href="/projects/" data-cursor="VIEW">
          Project index <span aria-hidden="true">↘</span>
        </Link>
      </section>

      <section className="positioning section-pad">
        <span className="eyebrow">Position / 01</span>
        <p>
          Architecture, computation and material practice—focused on digital tools,
          circular construction, fabrication and adaptive systems.
        </p>
        <p className="positioning-detail">
          Current work and study span computational design, digital fabrication,
          material systems, environmental design, machine learning and reclaimed
          timber strategies for material reuse.
        </p>
      </section>

      <section className="selected-work section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Curated work / 02</span>
            <h2>Selected projects</h2>
          </div>
          <Link href="/projects/" data-cursor="VIEW">Full catalogue ↗</Link>
        </div>
        <div className="featured-list">
          {featuredProjects.map((project, index) => (
            <FeaturedProject project={project} index={index} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="focus-section section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Selected focus / 03</span>
            <h2>Areas of work</h2>
          </div>
        </div>
        <div className="focus-list">
          {[
            "Computational Design",
            "Digital Fabrication",
            "Circular Construction",
            "Material Systems",
            "Environmental Design",
            "Machine Learning + Tools",
          ].map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
