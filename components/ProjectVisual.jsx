import MediaImage from "./MediaImage";
import MediaVideo from "./MediaVideo";
import ProjectMediaImage from "./ProjectMediaImage";

export default function ProjectVisual({
  project,
  label,
  className = "",
  source,
  sourceType,
  alt,
  eager = false,
  lightbox = false,
}) {
  const mediaSource = source || project?.thumbnail;
  const mediaType = sourceType || project?.thumbnailType || "image";
  const mediaAlt = alt || project?.thumbnailAlt || project?.title || "Project media";
  const placeholderLabel = label || project?.title || "ADD PROJECT MEDIA";
  const variant = project?.visualVariant || "field";

  if (mediaSource && mediaType === "video") {
    return (
      <div className={`project-visual has-media ${className}`}>
        <MediaVideo
          src={mediaSource}
          poster={project?.thumbnailPoster}
          autoplay
          muted
          loop
          playsInline
          controls={false}
          ariaLabel={mediaAlt}
        />
      </div>
    );
  }

  if (mediaSource) {
    return (
      <div className={`project-visual has-media ${className}`}>
        {lightbox ? (
          <ProjectMediaImage
            src={mediaSource}
            alt={mediaAlt}
            display="full"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            watermark={project?.heroWatermark}
          />
        ) : (
          <MediaImage
            src={mediaSource}
            alt={mediaAlt}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`project-visual placeholder-visual variant-${variant} ${className}`} aria-label={mediaAlt}>
      <span className="placeholder-status">MEDIA TO BE ADDED</span>
      <span className="placeholder-title">{placeholderLabel}</span>
      <span className="placeholder-coordinate">X 00.00 / Y 00.00</span>
      <div className="placeholder-field" aria-hidden="true" />
      <div className="placeholder-shape" aria-hidden="true" />
    </div>
  );
}
