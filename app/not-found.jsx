import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found section-pad page-top">
      <span className="eyebrow">Error / 404</span>
      <h1>This coordinate<br />does not exist.</h1>
      <Link className="text-link" href="/">Return home ↙</Link>
    </section>
  );
}
