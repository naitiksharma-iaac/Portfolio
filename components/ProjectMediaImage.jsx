"use client";

export default function ProjectMediaImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  fetchPriority,
}) {
  const preventMediaAction = (event) => event.preventDefault();

  return (
    <img
      className={`project-media-image ${className}`.trim()}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      draggable="false"
      onContextMenu={preventMediaAction}
      onDragStart={preventMediaAction}
    />
  );
}
