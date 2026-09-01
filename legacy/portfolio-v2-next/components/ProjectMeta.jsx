import ExternalLink from "./ExternalLink";

export default function ProjectMeta({ project }) {
  const entries = [
    ["Office", project.office ? <ExternalLink href={project.officeLink}>{project.office}</ExternalLink> : null],
    ["Institution", project.institution ? <ExternalLink href={project.institutionLink}>{project.institution}</ExternalLink> : null],
    ["Studio", project.studio],
    ["Programme", project.programme],
    ["Context", project.context],
    ["Year", project.year],
    ["Role", project.role],
  ].filter(([, value]) => value);

  return (
    <dl className="project-header-meta">
      {entries.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
