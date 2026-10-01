export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">LIGHT<span>.</span></div>

      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#journey">Journey</a>
        <a href="#contact">Contact</a>
      </div>

      <button className="connect-btn">
        Let's Connect
      </button>
    </nav>
  );
}