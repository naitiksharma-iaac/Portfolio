import Gallery from "./Gallery";
import MediaVideo from "./MediaVideo";
import ProjectMediaImage from "./ProjectMediaImage";
import ProjectVisual from "./ProjectVisual";
import { resolveMediaDisplay } from "../content/mediaPresentation";

function Placeholder({ label, className = "" }) {
  return <ProjectVisual className={className} label={label || "ADD PROJECT MEDIA"} />;
}

function getGroupItems(project, groupNames = []) {
  const seen = new Set();
  return groupNames.flatMap((group) => project?.discoveredMedia?.groups?.[group] || []).filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

function resolveMediaItem(item, project) {
  if (item.src || !item.mediaGroup) return item;
  const discovered = getGroupItems(project, [item.mediaGroup])[0];
  return discovered ? {
    ...discovered,
    ...item,
    src: discovered.src,
    mediaType: discovered.mediaType,
    alt: item.alt || discovered.alt,
    display: item.display || discovered.display,
    watermark: item.watermark ?? discovered.watermark,
  } : item;
}

function MediaFigure({ item, project, className = "", display }) {
  const resolvedItem = resolveMediaItem(item, project);
  const figureDisplay = resolveMediaDisplay(resolvedItem, display || "medium");
  const lightboxCaption = [resolvedItem.caption, resolvedItem.credit].filter(Boolean).join(" — ");
  return (
    <figure className={`project-figure figure--${figureDisplay} ${className}`}>
      {resolvedItem.src && resolvedItem.mediaType === "video" ? (
        <MediaVideo src={resolvedItem.src} poster={resolvedItem.poster} controls ariaLabel={resolvedItem.alt || "Project video"} />
      ) : resolvedItem.src ? (
        <ProjectMediaImage
          src={resolvedItem.src}
          alt={resolvedItem.alt || ""}
          caption={lightboxCaption}
          display={figureDisplay}
          watermark={resolvedItem.watermark}
        />
      ) : (
        <Placeholder label={resolvedItem.label} />
      )}
      {(resolvedItem.caption || resolvedItem.credit) && (
        <figcaption>
          {resolvedItem.caption}
          {resolvedItem.caption && resolvedItem.credit && <span> — </span>}
          {resolvedItem.credit && <span className="media-credit">{resolvedItem.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function TextContent({ block }) {
  return (
    <div className="block-text-copy">
      {block.heading && <h2>{block.heading}</h2>}
      {block.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div>
  );
}

export default function ProjectContentRenderer({ content = [], project }) {
  return (
    <div className="project-content">
      {content.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "sectionTitle") {
          return (
            <section className="block-section-title section-pad" id={`chapter-${block.number}`} key={key}>
              {block.number && <span>{block.number}</span>}
              <h2>{block.title}</h2>
            </section>
          );
        }

        if (block.type === "text") {
          return (
            <section className="block-text section-pad" key={key}>
              <span className="block-index">{String(index + 1).padStart(2, "0")}</span>
              <TextContent block={block} />
            </section>
          );
        }

        if (block.type === "image" || block.type === "gif") {
          return (
            <div className={`block-media block-${block.type} section-pad`} key={key}>
              <MediaFigure item={block} project={project} display={block.display} />
            </div>
          );
        }

        if (block.type === "fullImage") {
          return (
            <div className="block-full-image" key={key}>
              <MediaFigure item={block} project={project} display={block.display || "full"} />
            </div>
          );
        }

        if (block.type === "twoColumnImages" || block.type === "threeColumnImages") {
          const variant = block.type === "twoColumnImages" ? "two-column" : "three-column";
          return (
            <div className="block-gallery section-pad" key={key}>
              <Gallery images={block.images} variant={variant} display={block.display} />
            </div>
          );
        }

        if (block.type === "gallery" || block.type === "asymmetricGallery") {
          const variant = block.type === "gallery" ? "gallery" : "asymmetric";
          return (
            <div className="block-gallery section-pad" key={key}>
              <Gallery images={block.images} variant={variant} display={block.display} />
            </div>
          );
        }

        if (block.type === "mediaGroup") {
          const primaryItems = getGroupItems(project, block.groups);
          const discoveredItems = primaryItems.length ? primaryItems : getGroupItems(project, block.fallbackGroups);
          const images = discoveredItems.length
            ? discoveredItems
            : Array.from({ length: block.placeholderCount || 1 }, (_, placeholderIndex) => ({
                src: null,
                alt: `${project?.title || "Project"} ${block.label || "media"}`,
                label: `${block.label || "MEDIA"} / ${String(placeholderIndex + 1).padStart(2, "0")}`,
              }));

          return (
            <div className="block-gallery block-auto-media section-pad" key={key}>
              <Gallery images={images.map((image) => ({
                ...image,
                display: image.display || block.display,
                watermark: image.watermark ?? block.watermark,
              }))} variant={block.layout || "gallery"} display={block.display} />
              {block.caption && <p className="media-group-caption">{block.caption}</p>}
            </div>
          );
        }

        if (block.type === "video") {
          return (
            <figure className="block-video section-pad" key={key}>
              {block.src ? (
                <MediaVideo
                  src={block.src}
                  poster={block.poster}
                  autoplay={block.autoplay}
                  muted={block.muted}
                  loop={block.loop}
                  playsInline={block.playsInline}
                  controls={block.controls}
                  ariaLabel={block.alt || "Project process video"}
                />
              ) : (
                <Placeholder label={block.label || "ADD MP4 OR WEBM"} />
              )}
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block.type === "youtube") {
          return (
            <figure className="block-youtube section-pad" key={key}>
              {block.videoId ? (
                <div className="youtube-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${block.videoId}?rel=0`}
                    title={block.title || "Project video"}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Placeholder label={block.label || "ADD YOUTUBE VIDEO ID"} />
              )}
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block.type === "imageText" || block.type === "textImage") {
          const imageFirst = block.type === "imageText";
          return (
            <section className={`block-split ${imageFirst ? "image-first" : "text-first"} section-pad`} key={key}>
              <MediaFigure
                item={block.image || { label: "ADD MEDIA" }}
                project={project}
                className="block-split-media"
                display={block.image?.display || block.display || "medium"}
              />
              <TextContent block={block} />
            </section>
          );
        }

        if (block.type === "quote") {
          return <blockquote className="block-quote section-pad" key={key}>“{block.text}”</blockquote>;
        }

        if (block.type === "researchQuestion") {
          return (
            <section className="block-research-question section-pad" key={key}>
              <span className="eyebrow">Research question</span>
              <blockquote>{block.text}</blockquote>
            </section>
          );
        }

        if (block.type === "flow") {
          return (
            <section className="block-flow section-pad" key={key}>
              <span className="eyebrow">{block.label}</span>
              <ol className={`process-list process-list-columns-${Math.min(block.steps.length, 4)}`}>
                {block.steps.map((step, stepIndex) => (
                  <li key={step}>
                    <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
            </section>
          );
        }

        if (block.type === "dataGrid") {
          return (
            <section className="block-data-grid section-pad" key={key}>
              <span className="eyebrow">{block.label}</span>
              <dl>
                {block.items.map((item, itemIndex) => {
                  const label = typeof item === "string" ? String(itemIndex + 1).padStart(2, "0") : item.label;
                  const value = typeof item === "string" ? item : item.value;
                  return <div key={`${label}-${value}`}><dt>{label}</dt><dd>{value}</dd></div>;
                })}
              </dl>
            </section>
          );
        }

        if (block.type === "typologyGrid") {
          return (
            <section className="block-typology-grid section-pad" key={key}>
              {block.items.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </section>
          );
        }

        if (block.type === "spacer") {
          return <div className={`block-spacer spacer-${block.size || "medium"}`} key={key} aria-hidden="true" />;
        }

        return null;
      })}
    </div>
  );
}
