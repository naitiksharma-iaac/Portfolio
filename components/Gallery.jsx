import MediaVideo from "./MediaVideo";
import ProjectMediaImage from "./ProjectMediaImage";
import ProjectVisual from "./ProjectVisual";
import { resolveMediaDisplay } from "../content/mediaPresentation";

export default function Gallery({ images = [], variant = "gallery", display }) {
  return (
    <div className={`media-gallery media-gallery-${variant}`}>
      {images.map((image, index) => {
        const figureDisplay = resolveMediaDisplay(image, display || (variant === "full" ? "large" : "medium"));
        const lightboxCaption = [image.caption, image.credit].filter(Boolean).join(" — ");

        return (
        <figure className={`project-figure figure--${figureDisplay}`} key={`${image.src || image.label || "media"}-${index}`}>
          {image.src && image.mediaType === "video" ? (
            <MediaVideo src={image.src} poster={image.poster} controls ariaLabel={image.alt || "Project video"} />
          ) : image.src ? (
            <ProjectMediaImage
              src={image.src}
              alt={image.alt || ""}
              caption={lightboxCaption}
              display={figureDisplay}
              watermark={image.watermark}
            />
          ) : (
            <ProjectVisual label={image.label || `MEDIA ${String(index + 1).padStart(2, "0")}`} />
          )}
          {(image.caption || image.credit) && (
            <figcaption>
              {image.caption}
              {image.caption && image.credit && <span> — </span>}
              {image.credit && <span className="media-credit">{image.credit}</span>}
            </figcaption>
          )}
        </figure>
      )})}
    </div>
  );
}
