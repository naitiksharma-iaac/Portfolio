export default function ProjectChapterIndex({ content = [] }) {
  const chapters = content.filter((block) => block.type === "sectionTitle");
  if (!chapters.length) return null;

  return (
    <nav className="project-chapter-index" aria-label="Project chapters">
      <div className="project-chapter-index-inner section-pad">
        <span className="eyebrow">Case-study index</span>
        <ol>
          {chapters.map((chapter) => (
            <li key={`${chapter.number}-${chapter.title}`}>
              <a href={`#chapter-${chapter.number}`}>
                <span>{chapter.number}</span>
                <span>{chapter.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
