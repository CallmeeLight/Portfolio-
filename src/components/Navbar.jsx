export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#top" className="logo">
        LIGHT<span>.</span>
      </a>

      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Stack</a>
        <a href="#projects">Work</a>
        <a href="#journey">Journey</a>
      </div>

      <a href="#contact" className="connect-btn">
        Let's Connect
        <span>↗</span>
      </a>
    </nav>
  );
}