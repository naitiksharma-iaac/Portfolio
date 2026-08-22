import ProjectIndex from "../../components/ProjectIndex";
import { projects } from "../../content/projects";

export const metadata = {
  title: "Projects",
  description: "A project index spanning professional, academic and research work.",
};

export default function ProjectsPage() {
  return (
    <section className="index-page section-pad page-top">
      <div className="page-intro">
        <span className="eyebrow">Project index / 001—{String(projects.length).padStart(3, "0")}</span>
        <h1>Selected systems,<br />studies &amp; structures.</h1>
        <p>
          Sample projects demonstrate the structure. Replace them with your own work when ready.
        </p>
      </div>
      <ProjectIndex projects={projects} />
    </section>
  );
}
