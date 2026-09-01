import Link from "next/link";
import { site } from "../content/site";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="site-name" href="/" aria-label={`${site.name}, main page`} data-ref="site-name">
        {site.name}
      </Link>
      <nav className="site-navigation" aria-label="Primary navigation">
        <Link href="/contact/" data-ref="contact-link">Contact</Link>
        <Link href="/about/" data-ref="bio-link">Bio</Link>
      </nav>
    </header>
  );
}
