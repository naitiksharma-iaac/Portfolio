export const filterDefinitions = [
  { label: "All", terms: [] },
  { label: "Professional", category: "professional" },
  { label: "Academic", category: "academic" },
  { label: "Research", terms: ["research"] },
  { label: "Computational", terms: ["computational", "parametric", "generative", "algorithmic"] },
  { label: "Fabrication", terms: ["fabrication", "robotic fabrication", "circular construction"] },
  { label: "AI / ML", terms: ["machine learning", "graph machine learning", "generative ai", "artificial intelligence", "computer vision"] },
  { label: "Tools", terms: ["software / tools", "automation", "bim", "interoperability", "rhino compute"] },
];

export function projectMatchesFilter(project, filterLabel) {
  const definition = filterDefinitions.find((filter) => filter.label === filterLabel);
  if (!definition) return false;
  if (definition.label === "All") return true;
  if (definition.category) return project.category === definition.category;

  const searchableProjectData = [
    project.classification,
    project.projectType,
    project.type,
    ...(project.tags || []),
    ...(project.keywords || []),
  ].filter(Boolean).join(" ").toLowerCase();

  return definition.terms.some((term) => searchableProjectData.includes(term));
}

export default function ProjectFilters({ activeFilter, onFilterChange, projects }) {
  return (
    <div className="project-filters" role="group" aria-label="Filter projects">
      {filterDefinitions.map((filter) => {
        const count = projects.filter((project) => projectMatchesFilter(project, filter.label)).length;
        return (
          <button
            className={activeFilter === filter.label ? "is-active" : ""}
            key={filter.label}
            onClick={() => onFilterChange(filter.label)}
            type="button"
            aria-pressed={activeFilter === filter.label}
          >
            {filter.label}
            <span>{String(count).padStart(2, "0")}</span>
          </button>
        );
      })}
    </div>
  );
}
