export default function ExternalLink({ href, children, className = "" }) {
  if (!href) return children;

  return (
    <a className={`external-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
