export default function MediaImage({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  fetchPriority,
}) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  );
}
