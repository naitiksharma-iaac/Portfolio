import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import ProjectVisual from "../components/ProjectVisual";
import { projects } from "../content/projects";
import { site } from "../content/site";

export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <section className="home-hero section-pad">
        <div className="hero-meta">
          <span>Architecture / Computation / Making</span>
          <span>{site.location}</span>
        </div>
        <h1>
          <span>Architecture</span>
          <span className="hero-indent">as a responsive</span>
          <span>system<span className="accent-dot">.</span></span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-intro">
            <span className="eyebrow">Profile / 001</span>
            <p>{site.description}</p>
            <Link href="/projects">View the project index <span aria-hidden="true">↘</span></Link>
          </div>
          <div className="hero-object">
            <ProjectVisual project={featured[0]} label="LIVE FIELD / SAMPLE 001" />
            <span className="hero-object-note">A visual placeholder becomes your project image later.</span>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <i />
        </div>
      </section>

      <section className="manifesto section-pad">
        <span className="eyebrow">Approach / 002</span>
        <p>
          I treat design as a <em>negotiation</em> between geometry, material,
          environment and the realities of making.
        </p>
        <div className="manifesto-note">
          <span>01 — Model the relationships</span>
          <span>02 — Test through matter</span>
          <span>03 — Build the feedback loop</span>
        </div>
      </section>

      <section className="selected-work section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Selected work / 003</span>
            <h2>Systems in practice</h2>
          </div>
          <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="featured-grid">
          {featured.map((project, index) => (
            <ProjectCard index={index} key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="capabilities section-pad">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Working modes / 004</span>
            <h2>From rule to reality</h2>
          </div>
        </div>
        <div className="capability-list">
          {[
            ["01", "Computational design", "Parametric systems, geometry rationalisation and performance-led workflows."],
            ["02", "Research", "Design investigations that make methods, assumptions and findings visible."],
            ["03", "Fabrication", "Prototypes and assemblies that connect digital precision with material behaviour."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
