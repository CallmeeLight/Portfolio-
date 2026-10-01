export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact-glow" />

      <div className="section-label">05 / CONTACT</div>

      <div className="contact-content">
        <p className="contact-small">HAVE AN IDEA?</p>

        <h2>
          Let's build
          <br />
          <span>something.</span>
        </h2>

        <p className="contact-description">
          I'm always interested in interesting ideas, collaborations
          and opportunities to build something meaningful.
        </p>

        <a
          href="mailto:your-callmelight888@gmail.com"
          className="email-btn"
        >
          <span>Get in touch</span>
          <span className="email-arrow">↗</span>
        </a>
      </div>

      <footer className="contact-footer">
        <div className="footer-logo">
          LIGHT<span>.</span>
        </div>

        <div className="footer-center">
          AI · CODE · DESIGN
        </div>

        <div className="footer-copy">
          © 2026 — Built with React & Three.js
        </div>
      </footer>
    </section>
  );
}