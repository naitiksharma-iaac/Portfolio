export default function ExternalLink({ href, children, className = "" }) {
  if (!href) return children;

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
