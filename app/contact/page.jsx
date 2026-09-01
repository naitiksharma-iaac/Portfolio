import { site } from "../../content/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${site.name}.`,
};

export default function ContactPage() {
  const configuredSocials = [
    ["Instagram", site.socialLinks.instagram],
    ["LinkedIn", site.socialLinks.linkedin],
    ["GitHub", site.socialLinks.github],
  ].filter(([, href]) => href);

  return (
    <section className="contact-page section-pad page-top">
      <span className="eyebrow">Contact / {site.location}</span>
      <h1>Let’s<br />talk.</h1>
      <div className="contact-links">
        <a href={`mailto:${site.email}`} data-cursor="OPEN">
          <span>Email</span>
          <strong>{site.email}</strong>
          <i aria-hidden="true">↗</i>
        </a>
        {configuredSocials.map(([label, href]) => (
          <a href={href} key={label} target="_blank" rel="noreferrer" data-cursor="OPEN">
            <span>Social</span>
            <strong>{label}</strong>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </section>
  );
}
