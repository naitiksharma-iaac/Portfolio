import ExternalLink from "./ExternalLink";

export default function ProjectCredits({ project }) {
  const credits = [
    ["Project", project.title],
    ["Year", project.year],
    ["Architectural project", project.architecturalProject],
    ["Office", project.office],
    ["Institution", project.institution],
    ["Studio", project.studio],
    ["Programme", project.programme],
    ["Design", project.designLeads?.join(", ")],
    ["Faculty", project.faculty],
    ["Assistants", project.assistants?.join(", ")],
    ["Principal architect", project.principalArchitect],
    ["Context", project.context],
    ["Team", project.collaborators?.join(", ")],
    ["Tutors / guides", project.guides?.join(", ")],
    ["Role", project.role],
    ["Technical credit", project.technicalCredit],
    ["Media credit", project.mediaCredit || project.imageCredit],
  ].filter(([, value]) => value);

  return (
    <section className="project-credits" aria-labelledby="project-credits-title">
      <h2 id="project-credits-title">Credits</h2>
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
              <ExternalLink href={link.url}>{link.label}</ExternalLink>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
