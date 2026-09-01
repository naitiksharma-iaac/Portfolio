import Link from "next/link";
import { site } from "../content/site";

export default function Footer() {
  const configuredSocials = [
    ["Instagram", site.socialLinks.instagram],
    ["LinkedIn", site.socialLinks.linkedin],
    ["GitHub", site.socialLinks.github],
  ].filter(([, href]) => href);

  return (
    <footer className="site-footer section-pad">
      <div className="footer-callout">
        <span className="eyebrow">Contact / Copenhagen</span>
        <a href={`mailto:${site.email}`} data-cursor="OPEN">
          {site.email} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-meta">
        <Link href="/">{site.name}</Link>
        <span>{site.role}</span>
        <span>{site.location}</span>
        <div className="footer-links">
          {configuredSocials.map(([label, href]) => (
            <a href={href} key={label} rel="noreferrer" target="_blank" data-cursor="OPEN">
              {label}
            </a>
          ))}
        </div>
        <span>© {new Date().getFullYear()} N / S</span>
      </div>
    </footer>
  );
}
