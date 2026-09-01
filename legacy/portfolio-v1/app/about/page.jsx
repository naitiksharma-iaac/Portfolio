import Link from "next/link";
import { about, site } from "../../content/site";

export const metadata = {
  title: "About",
  description: `About ${site.name}, architect and computational designer.`,
};

export default function AboutPage() {
  return (
    <article className="about-page section-pad page-top">
      <header className="about-header">
        <span className="eyebrow">About / Current practice</span>
        <h1>Architecture as<br />a material system.</h1>
      </header>
      <section className="about-biography">
        <span className="about-index">01</span>
        <div>
          {about.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="about-interests">
        <span className="about-index">02</span>
        <div>
          <h2>Current fields</h2>
          {about.interests.map((interest) => <p key={interest}>{interest}</p>)}
        </div>
      </section>
      <div className="about-links">
        <Link className="text-link" href="/projects/" data-cursor="VIEW">View projects ↗</Link>
        <Link className="text-link" href="/resume/">View résumé ↗</Link>
      </div>
    </article>
  );
}
