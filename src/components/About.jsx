export default function About() {
  return (
    <section className="about section" id="about">
      <div className="section-label">01 / ABOUT</div>

      <div className="about-heading">
        <p className="about-eyebrow">A LITTLE ABOUT ME</p>

        <h2>
          Building ideas
          <br />
          into <span>experiences.</span>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-main glass-panel">
          <div className="about-number">01</div>

          <p>
            I'm Light — a developer and UI/UX enthusiast exploring
            the intersection of artificial intelligence, technology
            and design.
          </p>

          <p>
            I enjoy turning ideas into useful digital products,
            from AI assistants and productivity platforms to
            healthcare technology concepts.
          </p>
        </div>

        <div className="about-side">
          <div className="about-stat glass-panel">
            <span>FOCUS</span>
            <strong>AI × Design</strong>
          </div>

          <div className="about-stat glass-panel">
            <span>BUILDING</span>
            <strong>Digital Products</strong>
          </div>

          <div className="about-stat glass-panel">
            <span>EXPLORING</span>
            <strong>Healthcare Tech</strong>
          </div>
        </div>
      </div>
    </section>
  );
}