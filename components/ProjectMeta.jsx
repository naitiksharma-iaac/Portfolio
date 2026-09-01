import ExternalLink from "./ExternalLink";

export default function ProjectMeta({ project }) {
  const categoryLabel = project.category
    ? `${project.category.charAt(0).toUpperCase()}${project.category.slice(1)}`
    : null;
  const entries = [
    ["Year", project.year],
    ["Location", project.location],
    ["Category", categoryLabel],
    ["Project type", project.projectType || project.type],
    ["Client", project.client],
    ["Office", project.office ? <ExternalLink href={project.officeLink}>{project.office}</ExternalLink> : null],
    ["Institute", project.institution ? <ExternalLink href={project.institutionLink}>{project.institution}</ExternalLink> : null],
    ["Office / Institute", !project.office && !project.institution ? project.organisation : null],
    ["Programme", project.institution ? project.programme : null],
    ["Studio", project.studio],
    ["Status", project.status],
    ["Site area", project.siteArea],
    ["Built-up area", project.builtUpArea],
    ["Programme / brief", project.programme && !project.institution ? project.programme : null],
    ["Faculty", project.faculty],
    ["Assistant(s)", project.assistants?.join(", ")],
    ["Principal architect", project.principalArchitect],
    ["Context", project.context],
    ["Team", project.collaborators?.join(", ")],
    ["Tutor / Guide", project.guides?.join(", ")],
    ["Role", project.role],
    ["Software", Array.isArray(project.software) ? project.software.join(" / ") : project.software],
    ["Methods", Array.isArray(project.methods) ? project.methods.join(" / ") : project.methods],
    ["Technical credit", project.technicalCredit],
    ["Keywords", project.keywords?.join(" / ")],
  ].filter(([, value]) => value && (!Array.isArray(value) || value.length !== 0));

  return (
    <dl className="project-meta">
      {entries.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
