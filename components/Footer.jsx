import Link from "next/link";
import { site } from "../content/site";

export default function Footer() {
  return (
    <footer className="site-footer section-pad">
      <div className="footer-callout">
        <span className="eyebrow">Have a project in mind?</span>
        <a href={`mailto:${site.email}`}>
          Let’s make it tangible <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-meta">
        <Link href="/">{site.name}</Link>
        <span>{site.location}</span>
        <div className="footer-links">
          {site.socialLinks.map((link) => (
            <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
