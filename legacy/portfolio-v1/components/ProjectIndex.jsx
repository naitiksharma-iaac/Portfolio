"use client";

import { useMemo, useState } from "react";
import ProjectFilters, { projectMatchesFilter } from "./ProjectFilters";
import ProjectGrid from "./ProjectGrid";

export default function ProjectIndex({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilter(project, activeFilter)),
    [activeFilter, projects],
  );

  return (
    <>
      <ProjectFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} projects={projects} />
      <section className="project-index-group">
        <div className="project-index-group-heading">
          <span>{activeFilter === "All" ? `01-${String(projects.length).padStart(2, "0")}` : "Filtered index"}</span>
          <h2>{activeFilter === "All" ? "All Projects" : `${activeFilter} Projects`}</h2>
          <p>{String(visibleProjects.length).padStart(2, "0")} projects</p>
        </div>
        {visibleProjects.length > 0 ? (
          <ProjectGrid projects={visibleProjects} allProjects={projects} />
        ) : (
          <p className="empty-filter">No projects currently use this classification.</p>
        )}
      </section>
    </>
  );
}
