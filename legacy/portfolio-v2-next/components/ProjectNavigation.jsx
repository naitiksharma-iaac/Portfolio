import Link from "next/link";

export default function ProjectNavigation({ previousProject, nextProject }) {
  return (
    <nav className="project-navigation section-pad" aria-label="Adjacent projects">
      <Link href={`/projects/${previousProject.slug}/`} data-cursor="VIEW">
        <span className="eyebrow">← Previous project / {previousProject.number}</span>
        <strong>{previousProject.title}</strong>
      </Link>
      <Link href={`/projects/${nextProject.slug}/`} data-cursor="VIEW">
        <span className="eyebrow">Next project / {nextProject.number} →</span>
        <strong>{nextProject.title}</strong>
      </Link>
    </nav>
  );
}
