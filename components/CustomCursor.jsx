"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return undefined;

    document.body.classList.add("custom-cursor-active");

    const moveCursor = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");
    };

    const updateCursor = (event) => {
      const target = event.target.closest("[data-cursor], a, button");
      if (!target) {
        cursor.classList.remove("is-expanded");
        label.textContent = "";
        return;
      }

      cursor.classList.add("is-expanded");
      label.textContent = target.dataset.cursor || "";
    };

    const hideCursor = () => cursor.classList.remove("is-visible");

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", updateCursor);
    document.addEventListener("pointerout", updateCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", updateCursor);
      document.removeEventListener("pointerout", updateCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}
