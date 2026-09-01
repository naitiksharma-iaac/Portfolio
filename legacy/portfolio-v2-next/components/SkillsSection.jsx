export default function SkillsSection({ skills }) {
  return (
    <section className="skills-section" aria-labelledby="skills-heading">
      <div className="resume-section-heading">
        <span>03</span>
        <h2 id="skills-heading">Selected skills</h2>
      </div>
      <div className="skills-taxonomy">
        {skills.map((group) => (
          <article className={`skill-group priority-${group.priority}`} key={group.category}>
            <h3>{group.category}</h3>
            <p>{group.items.join(" / ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
