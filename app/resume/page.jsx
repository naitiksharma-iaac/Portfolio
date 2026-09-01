import EducationItem from "../../components/EducationItem";
import ExperienceItem from "../../components/ExperienceItem";
import SkillsSection from "../../components/SkillsSection";
import TeachingSection from "../../components/TeachingSection";
import { discoverMediaCollection } from "../../content/projectMedia";
import { resume } from "../../content/resume";
import { site } from "../../content/site";
import { teaching } from "../../content/teaching";

export const metadata = {
  title: "Résumé",
  description: `Experience, education and selected capabilities — ${site.name}.`,
};

export default function ResumePage() {
  const teachingMedia = discoverMediaCollection("experience/aerie-academy", "Aerie Academy teaching");

  return (
    <article className="resume-page section-pad page-top">
      <header className="resume-intro">
        <span className="eyebrow">Résumé / 2026</span>
        <h1>Experience,<br />education &amp; tools.</h1>
        <p>{resume.introduction}</p>
        <div className="resume-actions">
          <a className="text-link" href={`mailto:${site.email}`} data-cursor="OPEN">Email ↗</a>
          {resume.resumePdf && (
            <a className="text-link" href={resume.resumePdf} download data-cursor="OPEN">Download CV ↓</a>
          )}
        </div>
      </header>

      <div className="resume-columns">
        <section className="experience-column" aria-labelledby="experience-heading">
          <div className="resume-section-heading">
            <span>01</span>
            <h2 id="experience-heading">Experience</h2>
          </div>
          {resume.experience.map((item) => (
            <ExperienceItem item={item} key={`${item.organisation}-${item.period}`} />
          ))}
        </section>

        <aside className="resume-secondary">
          <section aria-labelledby="education-heading">
            <div className="resume-section-heading">
              <span>02</span>
              <h2 id="education-heading">Education</h2>
            </div>
            {resume.education.map((item) => (
              <EducationItem item={item} key={`${item.institution}-${item.period}`} />
            ))}
          </section>

          <section className="languages-section" aria-labelledby="languages-heading">
            <div className="resume-section-heading compact">
              <span>04</span>
              <h2 id="languages-heading">Languages</h2>
            </div>
            <dl>
              {resume.languages.map((item) => (
                <div key={item.language}>
                  <dt>{item.language}</dt>
                  <dd>{item.level}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>

      <SkillsSection skills={resume.skills} />
      <TeachingSection teaching={teaching} media={teachingMedia} />

      {resume.showWorkshops && (
        <section className="workshops-section" aria-labelledby="workshops-heading">
          <div className="resume-section-heading">
            <span>05</span>
            <h2 id="workshops-heading">Workshops</h2>
          </div>
          {resume.workshops.map((workshop) => (
            <article key={`${workshop.event}-${workshop.period}`}>
              <p>{workshop.period}</p>
              <h3>{workshop.event}</h3>
              <p>{workshop.title}</p>
              <p>{workshop.tutors.join(" / ")}</p>
            </article>
          ))}
        </section>
      )}
    </article>
  );
}
