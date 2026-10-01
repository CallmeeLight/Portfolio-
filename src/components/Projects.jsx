import { useState } from "react";

const projects = [
  {
    number: "01",
    title: "Study to Shine",
    description: "AI-powered academic productivity platform.",
    details:
      "A student-focused platform designed to organize academic tasks and make studying more productive.",
    tags: ["AI", "Education", "React"],
    links: "#"
  },
  {
    number: "02",
    title: "NOVA",
    description: "A personal AI assistant designed around your workflow.",
    details:
      "A futuristic personal AI assistant concept focused on making everyday tasks, information and productivity feel more natural.",
    tags: ["AI", "Assistant", "UI/UX"],
    links: "#"
  },
  {
    number: "03",
    title: "Bio Lens AI",
    description: "Medical report analysis and equipment recognition concept.",
    details:
      "An AI-powered healthcare concept for understanding medical reports and recognizing medical equipment through visual analysis.",
    tags: ["AI", "Healthcare", "Computer Vision"],
    links: "#"
  },
  {
    number: "04",
    title: "Medical Equipment Troubleshooter",
    description: "Identify medical equipment and understand common issues.",
    details:
      "A visual AI concept where users can identify medical equipment and explore possible causes, basic checks, safety precautions and when professional help may be needed.",
    tags: ["AI", "Healthcare", "Vision"],
    links: "#"
  },
  {
    number: "05",
    title: "College Copilot",
    description: "An academic productivity assistant for college life.",
    details:
      "A college-focused AI assistant designed to bring academic information, tasks, deadlines, schedules and productivity tools into one place.",
    tags: ["AI", "Productivity", "Web"],
    links: "#"
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects section" id="projects">
      <div className="section-label">03 / PROJECTS</div>

      <div className="projects-heading">
        <h2>
          Things I've
          <br />
          <span>built.</span>
        </h2>

        <p>
          Experiments, ideas and products exploring AI,
          technology and digital experiences.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article
            className="project-card"
            key={project.number}
            onClick={() => setSelectedProject(project)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const rotateX = ((y / rect.height) - 0.5) * -8;
              const rotateY = ((x / rect.width) - 0.5) * 8;

              e.currentTarget.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg)";
            }}
          >
            <span className="project-number">
              {project.number}
            </span>

            <div className="project-info">
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <span className="project-arrow">↗</span>
          </article>
        ))}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="project-modal"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>

            <span className="modal-number">
              {selectedProject.number}
            </span>

            <h3>{selectedProject.title}</h3>

            <p>{selectedProject.details}</p>

            <div className="project-tags">
              {selectedProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <a
              href={selectedProject.links}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
              onClick={(e) => e.stopPropagation()}
>
  View Project <span>↗</span>
</a>
          </div>
        </div>
      )}
    </section>
  );
}                                