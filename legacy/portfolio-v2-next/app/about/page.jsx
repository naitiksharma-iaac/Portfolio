import { about, site } from "../../content/site";
import { resume } from "../../content/resume";

export const metadata = {
  title: "Bio",
  description: `Biography, experience, and education — ${site.name}.`,
};

export default function BioPage() {
  return (
    <article className="plain-page">
      <header className="plain-page-header"><h1>Bio</h1></header>

      <section className="plain-copy reading-column">
        {about.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section className="bio-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <ul className="bio-list">
          {resume.experience.map((item) => (
            <li className="bio-item" key={`${item.organisation}-${item.period}`}>
              <span>{item.period}</span>
              <strong>{item.role}</strong>
              <span>{item.organisation}{item.location ? `, ${item.location}` : ""}</span>
              {item.description && <p>{item.description}</p>}
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">{item.linkLabel || item.organisation}</a>}
            </li>
          ))}
        </ul>
      </section>

      <section className="bio-section" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <ul className="bio-list">
          {resume.education.map((item) => (
            <li className="bio-item" key={`${item.institution}-${item.period}`}>
              <span>{item.period}</span>
              <strong>{item.qualification}</strong>
              <span>{item.programme}</span>
              <span>{item.institution}{item.location ? `, ${item.location}` : ""}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bio-section" aria-labelledby="languages-heading">
        <h2 id="languages-heading">Languages</h2>
        <ul className="bio-list">
          {resume.languages.map((item) => <li key={item.language}>{item.language}: {item.level}</li>)}
        </ul>
      </section>
    </article>
  );
}
