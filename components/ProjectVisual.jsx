export default function ProjectVisual({ project, label, className = "", image }) {
  const source = image || project?.thumbnail;
  const theme = project?.visualTheme || "cobalt";
  const title = label || project?.kicker || "Media placeholder";

  if (source) {
    return (
      <div className={`project-visual has-image ${className}`}>
        <img src={source} alt={project?.title || title} />
      </div>
    );
  }

  return (
    <div className={`project-visual theme-${theme} ${className}`} aria-label={title}>
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-orbit visual-orbit-a" aria-hidden="true" />
      <div className="visual-orbit visual-orbit-b" aria-hidden="true" />
      <span className="visual-code">{title}</span>
      <span className="visual-axis">X 00 — Y 01</span>
    </div>
  );
}
