import Link from "next/link";

export default function NotFound() {
  return (
    <section className="plain-page">
      <header className="plain-page-header"><h1>Page not found</h1></header>
      <p><Link href="/">Back to Main</Link></p>
    </section>
  );
}
