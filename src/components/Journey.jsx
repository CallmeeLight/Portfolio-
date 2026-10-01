const journey = [
  {
    year: "2026",
    title: "B.Tech Biomedical Engineering",
    description:
      "Started my engineering journey while exploring AI, software and healthcare technology."
  },
  {
    year: "2026",
    title: "Building with AI",
    description:
      "Started turning ideas into real products using AI-assisted development and modern web technologies."
  },
  {
    year: "2026",
    title: "FOSS & Hackathons",
    description:
      "Joined the FOSS community and began working on events, management and collaborative projects."
  },
  {
    year: "NOW",
    title: "What's next?",
    description:
      "Keep learning. Keep building. Turn experiments into products that actually matter."
  }
];

export default function Journey() {
  return (
    <section className="journey section" id="journey">
      <div className="section-label">04 / JOURNEY</div>

      <h2 className="journey-title">
        Still <span>becoming.</span>
      </h2>

      <div className="timeline">
        {journey.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-year">{item.year}</div>

            <div className="timeline-line">
              <div className="timeline-dot" />
            </div>

            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}