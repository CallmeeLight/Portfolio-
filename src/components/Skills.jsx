const skills = [
  {
    title: "Development",
    items: ["Python", "JavaScript", "React", "HTML", "CSS"]
  },
  {
    title: "AI & Tech",
    items: ["Artificial Intelligence", "Three.js", "Firebase", "APIs"]
  },
  {
    title: "Design",
    items: ["UI/UX", "Figma", "Prototyping", "Visual Design"]
  }
];

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="section-label">02 / SKILLS</div>

      <h2 className="skills-title">
        Tools I use to
        <span> build.</span>
      </h2>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.title}>
            <h3>{skill.title}</h3>

            <div className="skill-list">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}