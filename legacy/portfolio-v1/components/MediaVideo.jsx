"use client";

import { useEffect, useRef } from "react";

export default function MediaVideo({
  src,
  poster,
  className = "",
  autoplay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = true,
  ariaLabel = "Project video",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster || undefined}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      preload="metadata"
      aria-label={ariaLabel}
      draggable="false"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <source src={src} />
      Your browser does not support this video.
    </video>
  );
}
