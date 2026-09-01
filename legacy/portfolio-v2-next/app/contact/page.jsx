import { site } from "../../content/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${site.name}.`,
};

export default function ContactPage() {
  const links = [
    [site.email, `mailto:${site.email}`],
    ["LinkedIn", site.socialLinks.linkedin],
    ["Instagram", site.socialLinks.instagram],
  ].filter(([, href]) => href);

  return (
    <section className="plain-page">
      <header className="plain-page-header"><h1>Contact</h1></header>
      <ul className="contact-list reading-column">
        {links.map(([label, href]) => (
          <li key={href}>
            <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
