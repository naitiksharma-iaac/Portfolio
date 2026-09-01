import ExternalLink from "./ExternalLink";
import Gallery from "./Gallery";

function mediaForGroup(media, group, label) {
  return media.groups[group]?.length
    ? media.groups[group]
    : [{ src: null, label, alt: label }];
}

export default function TeachingSection({ teaching, media }) {
  const primaryWorkflow = teaching.workflows[0];
  const visualisationWorkflows = teaching.workflows.slice(1);

  return (
    <section className="teaching-section" aria-labelledby="teaching-heading">
      <header className="teaching-header">
        <span className="eyebrow">Experience / Teaching</span>
        <div>
          <p className="teaching-period">{teaching.period}</p>
          <h2 id="teaching-heading">{teaching.organisation}</h2>
          <h3>{teaching.role}</h3>
          <p>{teaching.description}</p>
          <dl className="teaching-meta">
            <div><dt>Course</dt><dd>{teaching.course}</dd></div>
            <div><dt>Format</dt><dd>{teaching.format}</dd></div>
            <div><dt>Focus</dt><dd>{teaching.focus.join(" / ")}</dd></div>
          </dl>
          <ExternalLink href={teaching.courseLink} className="text-link">View course</ExternalLink>
        </div>
      </header>

      <article className="teaching-feature teaching-introduction">
        <div className="teaching-feature-copy">
          <span>{teaching.introduction.label}</span>
          <h3>{teaching.introduction.title}</h3>
          <p>{teaching.introduction.description}</p>
          <ExternalLink href={teaching.introduction.link}>View introduction</ExternalLink>
        </div>
        <Gallery images={mediaForGroup(media, teaching.introduction.mediaGroup, "ADD COURSE INTRODUCTION POSTER / MP4")} variant="full" />
      </article>

      <div className="teaching-subheading">
        <span>Selected class workflows</span>
        <h3>{primaryWorkflow.number} — {primaryWorkflow.label}</h3>
      </div>
      <article className="teaching-feature teaching-primary-workflow">
        <Gallery images={mediaForGroup(media, primaryWorkflow.mediaGroup, "ADD DATA TREES EXERCISE")} variant="full" />
        <div className="teaching-feature-copy">
          <h3>{primaryWorkflow.title}</h3>
          <p>{primaryWorkflow.description}</p>
          <ExternalLink href={primaryWorkflow.link}>View post</ExternalLink>
        </div>
      </article>

      <div className="teaching-subheading">
        <span>AI-assisted visualisation</span>
        <h3>Design geometry remains explicit</h3>
      </div>
      <div className="teaching-workflow-grid">
        {visualisationWorkflows.map((workflow) => (
          <article key={workflow.number}>
            <Gallery images={mediaForGroup(media, workflow.mediaGroup, `ADD ${workflow.label.toUpperCase()}`)} variant="full" />
            <span>{workflow.number} — {workflow.label}</span>
            <h3>{workflow.title}</h3>
            <p>{workflow.description}</p>
            <ExternalLink href={workflow.link}>View post</ExternalLink>
          </article>
        ))}
      </div>

      <footer className="teaching-footer">
        <span>More computational design + teaching</span>
        <ExternalLink href={teaching.profileLink}>synthedesign</ExternalLink>
        <p>{teaching.mediaCredit}</p>
      </footer>
    </section>
  );
}
