import ExternalLink from "./ExternalLink";

export default function ExperienceItem({ item }) {
  return (
    <article className="experience-item">
      <header>
        <p className="experience-organisation">{item.organisation}</p>
        <p className="experience-meta">{item.location} / {item.period}</p>
      </header>
      <h3>{item.role}</h3>
      {item.description && <p className="experience-description">{item.description}</p>}
      {item.link && <ExternalLink href={item.link}>{item.linkLabel || "View"}</ExternalLink>}
    </article>
  );
}
