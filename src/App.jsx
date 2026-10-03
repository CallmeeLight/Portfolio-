import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import CursorGlow from "./components/CursorGlow";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =================================
         SECTION REVEAL
      ================================= */

      gsap.utils.toArray(".section").forEach((section) => {
        const children = section.querySelectorAll(
          ".section-label, .about-heading, .about-grid, .skills-heading, .skills-grid, .projects-heading, .projects-list, .journey-heading, .timeline, .contact-content, .contact-footer"
        );

        if (!children.length) return;

        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );
      });

      /* =================================
         ABOUT CINEMATIC PARALLAX
      ================================= */

      gsap.to(".about-heading", {
        y: -70,
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".about-grid", {
        y: -30,
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =================================
         SKILLS CARDS
      ================================= */

      gsap.fromTo(
        ".skill-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 78%",
          },
        }
      );

      /* =================================
         PROJECT CARDS
      ================================= */

      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          x: -80,
          scale: 0.97,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".projects-list",
            start: "top 78%",
          },
        }
      );

      /* =================================
         PROJECT HEADING PARALLAX
      ================================= */

      gsap.to(".projects-heading h2", {
        y: -50,
        scrollTrigger: {
          trigger: ".projects",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".projects-heading p", {
        y: 30,
        scrollTrigger: {
          trigger: ".projects",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =================================
         JOURNEY
      ================================= */

      gsap.fromTo(
        ".timeline-item",
        {
          opacity: 0,
          x: -70,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 75%",
          },
        }
      );

      /* =================================
         CONTACT CINEMATIC SCALE
      ================================= */

      gsap.fromTo(
        ".contact-content",
        {
          opacity: 0,
          scale: 0.88,
          y: 80,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact",
            start: "top 70%",
          },
        }
      );

      /* =================================
         CONTACT GLOW PARALLAX
      ================================= */

      gsap.to(".contact-glow", {
        scale: 1.5,
        opacity: 0.22,
        scrollTrigger: {
          trigger: ".contact",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      /* =================================
         SECTION TRANSITION GLOW
      ================================= */

      gsap.utils.toArray(".section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            "--section-glow": 0,
          },
          {
            "--section-glow": 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="app">
      <CursorGlow />

      <Navbar />

      <main>
        <Hero />

        <About />

        <Skills />

        <Projects />

        <Journey />

        <Contact />
      </main>
    </div>
  );
}

export default App;