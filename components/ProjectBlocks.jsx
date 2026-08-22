import ProjectVisual from "./ProjectVisual";

function MediaPlaceholder({ block, theme }) {
  return (
    <ProjectVisual
      className={`block-visual aspect-${block.aspect || "landscape"}`}
      label={block.label}
      project={{ visualTheme: block.theme || theme }}
    />
  );
}

function Figure({ item, theme, aspect }) {
  return (
    <figure>
      {item.src ? (
        <img className={`content-image aspect-${aspect || "natural"}`} src={item.src} alt={item.alt} />
      ) : (
        <MediaPlaceholder block={{ ...item, aspect }} theme={theme} />
      )}
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}

export default function ProjectBlocks({ blocks, theme }) {
  return (
    <div className="project-blocks">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <section className="content-text content-grid" key={index}>
              <span className="eyebrow">{block.eyebrow}</span>
              <div>
                <h2>{block.heading}</h2>
                {block.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "image") {
          return (
            <div className="content-media" key={index}>
              <Figure item={block} theme={theme} aspect={block.aspect} />
            </div>
          );
        }

        if (block.type === "gallery") {
          return (
            <div className={`content-gallery columns-${block.columns || 2}`} key={index}>
              {block.images.map((image, imageIndex) => (
                <Figure item={image} key={imageIndex} theme={theme} aspect="portrait" />
              ))}
            </div>
          );
        }

        if (block.type === "video") {
          return (
            <figure className="content-video" key={index}>
              {block.src ? (
                <video controls playsInline poster={block.poster || undefined}>
                  <source src={block.src} />
                </video>
              ) : (
                <MediaPlaceholder block={{ ...block, aspect: "wide" }} theme={theme} />
              )}
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block.type === "metrics") {
          return (
            <div className="content-metrics" key={index}>
              {block.items.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "quote") {
          return <blockquote key={index}>“{block.text}”</blockquote>;
        }

        return null;
      })}
    </div>
  );
}
