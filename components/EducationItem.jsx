export default function EducationItem({ item }) {
  return (
    <article className="education-item">
      <p className="education-period">{item.period}</p>
      <h3>{item.institution}</h3>
      <p className="education-location">{item.location}</p>
      <p className="education-degree">{item.qualification}</p>
      {item.programme && <p>{item.programme}</p>}
      {item.department && <p>{item.department}</p>}
      {item.focus?.length > 0 && <p className="education-focus">{item.focus.join(" / ")}</p>}
    </article>
  );
}
