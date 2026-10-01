const skills = [
  {
    number: "01",
    title: "Development",
    description: "Building responsive and interactive digital products.",
    items: ["Python", "JavaScript", "React", "HTML", "CSS"]
  },
  {
    number: "02",
    title: "AI & Technology",
    description: "Exploring intelligent systems and modern technologies.",
    items: ["Artificial Intelligence", "Three.js", "Firebase", "APIs"]
  },
  {
    number: "03",
    title: "Design",
    description: "Creating interfaces that feel simple, clear and intentional.",
    items: ["UI/UX", "Figma", "Prototyping", "Visual Design"]
  }
];

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="section-label">02 / TECH STACK</div>

      <div className="skills-heading">
        <h2>
          Tools I use
          <br />
          to <span className="build-text">build.</span>
        </h2>

        <p>
          A growing toolkit shaped by curiosity,
          experimentation and real projects.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-card" key={skill.number}>
            <div className="skill-top">
              <span>{skill.number}</span>
              <span className="skill-icon">↗</span>
            </div>

            <div className="skill-content">
              <h3>{skill.title}</h3>

              <p>{skill.description}</p>

              <div className="skill-list">
                {skill.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}