import { Fragment } from "react";
import MediaVideo from "./MediaVideo";
import ProjectMediaImage from "./ProjectMediaImage";

function getGroupItems(project, groupNames = []) {
  const unique = new Map();
  groupNames.forEach((group) => {
    (project?.discoveredMedia?.groups?.[group] || []).forEach((item) => unique.set(item.src, item));
  });
  return [...unique.values()];
}

function resolveMediaItem(item, project) {
  if (!item) return null;
  if (item.src) return item;
  if (!item.mediaGroup) return null;
  const discovered = getGroupItems(project, [item.mediaGroup])[0];
  return discovered ? { ...discovered, ...item, src: discovered.src, mediaType: discovered.mediaType } : null;
}

function MediaFigure({ item }) {
  if (!item?.src) return null;
  const caption = item.caption || null;
  const credit = item.credit || null;

  return (
    <figure className="project-figure">
      {item.mediaType === "video" ? (
        <MediaVideo src={item.src} poster={item.poster} controls ariaLabel={item.alt || "Project video"} />
      ) : (
        <ProjectMediaImage src={item.src} alt={item.alt || ""} />
      )}
      {(caption || credit) && (
        <figcaption>
          {caption}
          {caption && credit ? " — " : ""}
          {credit}
        </figcaption>
      )}
    </figure>
  );
}

function TextBlock({ heading, paragraphs = [] }) {
  return (
    <section className="project-text">
      {heading && <h2>{heading}</h2>}
      {paragraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)}
    </section>
  );
}

function DataBlock({ block }) {
  const objects = (block.items || []).filter((item) => typeof item === "object");
  const strings = (block.items || []).filter((item) => typeof item !== "object");

  return (
    <section className="project-data">
      {block.label && <h2>{block.label}</h2>}
      {objects.length > 0 && (
        <dl>
          {objects.map((item, index) => (
            <div key={`${item.label}-${index}`}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {strings.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
    </section>
  );
}

export default function ProjectContentRenderer({ content = [], project }) {
  const seenMedia = new Set();

  const takeUnseen = (items) => items.filter((item) => {
    if (!item?.src || seenMedia.has(item.src)) return false;
    seenMedia.add(item.src);
    return true;
  });

  return (
    <div className="project-content">
      {content.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "sectionTitle") {
          return <section className="project-section-heading" key={key}><h2>{block.title}</h2></section>;
        }

        if (block.type === "text") {
          return <TextBlock heading={block.heading} paragraphs={block.paragraphs} key={key} />;
        }

        if (block.type === "researchQuestion") {
          return <section className="project-question" key={key}><p>{block.text}</p></section>;
        }

        if (block.type === "dataGrid") {
          return <DataBlock block={block} key={key} />;
        }

        if (block.type === "flow") {
          return (
            <section className="project-flow" key={key}>
              {block.label && <h2>{block.label}</h2>}
              <ul>{(block.steps || []).map((step) => <li key={step}>{step}</li>)}</ul>
            </section>
          );
        }

        if (block.type === "typologyGrid") {
          return (
            <section className="project-typologies" key={key}>
              <ul>
                {(block.items || []).map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (block.type === "imageText" || block.type === "textImage") {
          const resolved = resolveMediaItem(block.image, project);
          const items = takeUnseen(resolved ? [resolved] : []);
          return (
            <div className="project-paired-block" key={key}>
              <TextBlock heading={block.heading} paragraphs={block.paragraphs} />
              {items.map((item) => <MediaFigure item={item} key={item.src} />)}
            </div>
          );
        }

        if (["image", "gif", "fullImage"].includes(block.type)) {
          const resolved = resolveMediaItem(block, project);
          const items = takeUnseen(resolved ? [resolved] : []);
          if (!items.length) return null;
          return <div className="project-media-block" key={key}>{items.map((item) => <MediaFigure item={item} key={item.src} />)}</div>;
        }

        if (block.type === "mediaGroup") {
          const primary = getGroupItems(project, block.groups || []);
          const candidates = primary.length ? primary : getGroupItems(project, block.fallbackGroups || []);
          const items = takeUnseen(candidates);
          if (!items.length) return null;
          return <div className="project-media-block" key={key}>{items.map((item) => <MediaFigure item={item} key={item.src} />)}</div>;
        }

        return <Fragment key={key} />;
      })}
      {(() => {
        const remaining = takeUnseen(project?.discoveredMedia?.all || []);
        if (!remaining.length) return null;
        return (
          <div className="project-media-block">
            {remaining.map((item) => <MediaFigure item={item} key={item.src} />)}
          </div>
        );
      })()}
    </div>
  );
}
