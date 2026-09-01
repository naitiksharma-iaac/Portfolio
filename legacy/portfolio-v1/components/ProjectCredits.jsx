import ExternalLink from "./ExternalLink";

export default function ProjectCredits({ project }) {
  const categoryLabel = project.category
    ? `${project.category.charAt(0).toUpperCase()}${project.category.slice(1)}`
    : null;
  const credits = [
    ["Project", project.title],
    ["Year", project.year],
    ["Category", categoryLabel],
    ["Project type", project.projectType || project.type],
    ["Architectural project", project.architecturalProject],
    ["Office", project.office],
    ["Institute", project.institution],
    ["Office / Institute", !project.office && !project.institution ? project.organisation : null],
    ["Studio", project.studio],
    ["Programme", project.programme],
    ["Design", project.designLeads?.join(", ")],
    ["Faculty", project.faculty],
    ["Assistant(s)", project.assistants?.join(", ")],
    ["Principal architect", project.principalArchitect],
    ["Context", project.context],
    ["Team", project.collaborators?.join(", ")],
    ["Tutor / Guide", project.guides?.join(", ")],
    ["Role", project.role],
    ["Technical credit", project.technicalCredit],
    ["Media credit", project.mediaCredit || project.imageCredit],
  ].filter(([, value]) => value && (!Array.isArray(value) || value.length !== 0));

  return (
    <section className="project-credits section-pad" aria-labelledby="project-credits-title">
      <div className="block-section-title">
        <span>CR</span>
        <h2 id="project-credits-title">Credits</h2>
      </div>
      <dl>
        {credits.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {project.externalLinks?.length > 0 && (
        <div className="project-external-links">
          {project.externalLinks.map((link) => (
            <div key={link.url}>
              {link.kind && <span>{link.kind}</span>}
              <ExternalLink href={link.url}>{link.label}</ExternalLink>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
