import { resume } from "../../content/resume";
import { site } from "../../content/site";

export const metadata = {
  title: "Résumé",
  description: `Experience, education and capabilities — ${site.name}.`,
};

export default function ResumePage() {
  return (
    <article className="resume-page section-pad page-top">
      <header className="resume-intro">
        <span className="eyebrow">Résumé / Profile</span>
        <h1>Designing relationships,<br />not just objects.</h1>
        <p>{resume.introduction}</p>
        <a className="text-link" href={`mailto:${site.email}`}>Contact by email <span aria-hidden="true">↗</span></a>
      </header>

      <section className="resume-focus">
        <span className="resume-label">Focus</span>
        <div>
          {resume.focus.map((item, index) => (
            <span key={item}><small>0{index + 1}</small>{item}</span>
          ))}
        </div>
      </section>

      <ResumeSection title="Experience">
        {resume.experience.map((item) => (
          <div className="resume-entry" key={`${item.period}-${item.role}`}>
            <span className="resume-period">{item.period}</span>
            <div>
              <h3>{item.role}</h3>
              <p className="resume-organisation">{item.organisation} / {item.location}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Education">
        {resume.education.map((item) => (
          <div className="resume-entry" key={`${item.period}-${item.qualification}`}>
            <span className="resume-period">{item.period}</span>
            <div>
              <h3>{item.qualification}</h3>
              <p className="resume-organisation">{item.institution} / {item.location}</p>
            </div>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Capabilities">
        <div className="skills-grid">
          {resume.skills.map((skill) => (
            <div key={skill.category}>
              <h3>{skill.category}</h3>
              <p>{skill.items.join(" / ")}</p>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Recognition">
        {resume.recognition.map((item) => (
          <div className="recognition-entry" key={`${item.year}-${item.title}`}>
            <span>{item.year}</span>
            <p>{item.title}</p>
            <p>{item.organisation}</p>
          </div>
        ))}
      </ResumeSection>
    </article>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2 className="resume-label">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
