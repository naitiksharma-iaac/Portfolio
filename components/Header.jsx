import Link from "next/link";
import { site } from "../content/site";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label={`${site.name}, home`} data-cursor="">
        <span>N / S</span>
        <span className="wordmark-mark" aria-hidden="true" />
      </Link>
      <Navigation />
    </header>
  );
}
