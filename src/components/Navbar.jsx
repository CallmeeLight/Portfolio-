import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ["about", "skills", "projects", "journey"];

    const triggers = sections.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 45%",
        end: "bottom 45%",

        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <nav className="navbar">
      <a href="#top" className="logo">
        LIGHT<span>.</span>
      </a>

      <div className="nav-links">
        <a
          href="#about"
          className={active === "about" ? "active" : ""}
        >
          About
        </a>

        <a
          href="#skills"
          className={active === "skills" ? "active" : ""}
        >
          Stack
        </a>

        <a
          href="#projects"
          className={active === "projects" ? "active" : ""}
        >
          Work
        </a>

        <a
          href="#journey"
          className={active === "journey" ? "active" : ""}
        >
          Journey
        </a>
      </div>

      <a href="#contact" className="connect-btn">
        Let's Connect
        <span>↗</span>
      </a>
    </nav>
  );
}