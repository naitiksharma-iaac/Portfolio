"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";

const filters = ["All", "Professional", "Academic", "Research"];

export default function ProjectIndex({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.classification === activeFilter),
    [activeFilter, projects],
  );

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            className={activeFilter === filter ? "is-active" : ""}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
            <span>
              {filter === "All"
                ? projects.length
                : projects.filter((project) => project.classification === filter).length}
            </span>
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <ProjectCard
            index={projects.findIndex((item) => item.slug === project.slug)}
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </>
  );
}
