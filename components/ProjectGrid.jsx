import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, allProjects, variant = "" }) {
  return (
    <div className={`projects-grid ${variant ? `projects-grid-${variant}` : ""}`}>
      {projects.map((project) => (
        <ProjectCard
          index={allProjects.findIndex((item) => item.slug === project.slug)}
          key={project.slug}
          project={project}
          variant={variant}
        />
      ))}
    </div>
  );
}
