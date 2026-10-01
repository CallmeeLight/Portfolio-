import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const timelineRef = useRef(null);

useEffect(() => {
  const timeline = timelineRef.current;

  if (!timeline) return;

  const items = gsap.utils.toArray(".timeline-item");

  gsap.fromTo(
    timeline,
    {
      scaleY: 0
    },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 65%",
        end: "bottom 65%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          items.forEach((item, index) => {
            const nodeProgress = index / (items.length - 1);

            if (progress >= nodeProgress) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      }
    }
  );

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);
  return (
    <section className="journey section" id="journey">
      <div className="section-label">04 / JOURNEY</div>

      <div className="journey-heading">
        <h2>
          Still
          <br />
          <span>becoming.</span>
        </h2>

        <p>
          Every project, experiment and challenge
          adds another piece to the journey.
        </p>
      </div>

      <div className="timeline">
        <div className="timeline-track">
  <div
    ref={timelineRef}
    className="timeline-progress"
  />
</div>

        {journey.map((item, index) => (
          <article
  className="timeline-item"
  key={index}
  ref={(el) => {
    if (el) {
      el.dataset.index = index;
    }
  }}
>
            <div className="timeline-year">{item.year}</div>

            <div className="timeline-node">
              <span />
            </div>

            <div className="timeline-content">
              <span className="timeline-index">0{index + 1}</span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}