"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectMediaImage({
  src,
  alt = "",
  caption,
  className = "",
  display = "medium",
  loading = "lazy",
  fetchPriority,
  watermark = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  const preventMediaAction = (event) => event.preventDefault();

  return (
    <>
      <button
        ref={triggerRef}
        className={`project-media-trigger media-display-${display} ${className}`}
        type="button"
        onClick={() => setIsOpen(true)}
        onContextMenu={preventMediaAction}
        onDragStart={preventMediaAction}
        aria-label={`Enlarge ${alt || "project image"}`}
        aria-haspopup="dialog"
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          draggable="false"
        />
        {watermark && <span className="project-media-watermark" aria-hidden="true">N / S</span>}
        <span className="project-media-enlarge" aria-hidden="true">View larger +</span>
      </button>

      {isOpen && typeof document !== "undefined" && createPortal((
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${alt || "project image"}`}
          onMouseDown={() => setIsOpen(false)}
          onContextMenu={preventMediaAction}
          onDragStart={preventMediaAction}
        >
          <button
            ref={closeButtonRef}
            className="media-lightbox-close"
            type="button"
            onClick={() => setIsOpen(false)}
            onMouseDown={(event) => event.stopPropagation()}
            aria-label="Close enlarged image"
          >
            Close &times;
          </button>
          <figure className="media-lightbox-figure">
            <div className="media-lightbox-image-wrap" onMouseDown={(event) => event.stopPropagation()}>
              <img src={src} alt={alt} draggable="false" />
              {watermark && <span className="project-media-watermark" aria-hidden="true">N / S</span>}
            </div>
            {caption && <figcaption onMouseDown={(event) => event.stopPropagation()}>{caption}</figcaption>}
          </figure>
        </div>
      ), document.body)}
    </>
  );
}
