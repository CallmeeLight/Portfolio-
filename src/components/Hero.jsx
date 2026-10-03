import React, { useRef, useEffect } from "react";
import ParticleField from "./ParticleField";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/* =========================
   TESSERACT
========================= */

function Tesseract() {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x =
        (e.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const vertices = [];

  for (let i = 0; i < 16; i++) {
    vertices.push([
      i & 1 ? 1 : -1,
      i & 2 ? 1 : -1,
      i & 4 ? 1 : -1,
      i & 8 ? 1 : -1,
    ]);
  }

  const edges = [];

  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let difference = 0;

      for (let k = 0; k < 4; k++) {
        if (vertices[i][k] !== vertices[j][k]) {
          difference++;
        }
      }

      if (difference === 1) {
        edges.push([i, j]);
      }
    }
  }

  const edgeLines = useRef([]);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();

    const angleXY = time * 0.35;
    const angleZW = time * 0.55;

    const cosA = Math.cos(angleXY);
    const sinA = Math.sin(angleXY);

    const cosB = Math.cos(angleZW);
    const sinB = Math.sin(angleZW);

    const projected = vertices.map(([x, y, z, w]) => {
      let rx = x * cosA - y * sinA;
      let ry = x * sinA + y * cosA;

      let rz = z * cosB - w * sinB;
      let rw = z * sinB + w * cosB;

      const distance = 4;
      const scale = distance / (distance - rw);

      return [
        rx * scale,
        ry * scale,
        rz * scale,
      ];
    });

    edges.forEach(([a, b], index) => {
      const line = edgeLines.current[index];

      if (!line) return;

      const positions =
        line.geometry.attributes.position.array;

      positions[0] = projected[a][0];
      positions[1] = projected[a][1];
      positions[2] = projected[a][2];

      positions[3] = projected[b][0];
      positions[4] = projected[b][1];
      positions[5] = projected[b][2];

      line.geometry.attributes.position.needsUpdate = true;
    });

    group.current.rotation.x +=
      (mouse.current.y * 0.25 -
        group.current.rotation.x) *
      0.03;

    group.current.rotation.y +=
      (mouse.current.x * 0.25 -
        group.current.rotation.y) *
      0.03;

    group.current.position.y =
      Math.sin(time * 1.2) * 0.12;
  });

  return (
    <group ref={group} scale={0.8}>
      {edges.map(([a, b], index) => {
        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            [
              vertices[a][0],
              vertices[a][1],
              vertices[a][2],

              vertices[b][0],
              vertices[b][1],
              vertices[b][2],
            ],
            3
          )
        );

        const material =
          new THREE.LineBasicMaterial({
            color:
              index % 2 === 0
                ? "#ffffff"
                : "#a78bfa",
            transparent: true,
            opacity: 0.85,
          });

        const line = new THREE.Line(
          geometry,
          material
        );

        return (
          <primitive
            key={index}
            object={line}
            ref={(el) => {
              if (el) {
                edgeLines.current[index] = el;
              }
            }}
          />
        );
      })}

      <pointLight
        color="#8b5cf6"
        intensity={4}
        distance={6}
      />
    </group>
  );
}

/* =========================
   PARTICLES
========================= */

function Particles() {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.0008;
    ref.current.rotation.x += 0.0003;
  });

  return (
    <Points
      ref={ref}
      limit={1200}
      range={6}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[3.5, 64, 64]} />

      <PointMaterial
        transparent
        color="#c4b5fd"
        size={0.025}
        sizeAttenuation
      />
    </Points>
  );
}

  
/* =========================
   SCENE
========================= */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />

      <pointLight
        position={[3, 3, 3]}
        intensity={15}
      />

      <ParticleField />

      <Particles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
}


/* =========================
   HERO
========================= */

export default function Hero() {
  const heroText = useRef();
  const hero = useRef();

  const terminal = useRef();
const terminalCommand = useRef();
const terminalOutput = useRef();
const fakeCursor = useRef();

  /* HERO INTRO */

  useEffect(() => {
  const ctx = gsap.context(() => {
    const command = "print('Hi, I'm Light.')";
    const tl = gsap.timeline();

    // Terminal enters
    tl.fromTo(
      terminal.current,
      {
        opacity: 0,
        scale: 0.92,
        y: 25,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    );

    // Type command
    tl.to(
      {},
      {
        duration: command.length * 0.07,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const count = Math.floor(
            progress * command.length
          );

          terminalCommand.current.textContent =
            command.slice(0, count);
        },
      }
    );

    // Small pause
    tl.to({}, { duration: 0.25 });

    // Cursor moves to command
    tl.to(fakeCursor.current, {
      x: 145,
      y: -2,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Click
    tl.to(fakeCursor.current, {
      scale: 0.75,
      duration: 0.08,
    });

    tl.to(fakeCursor.current, {
      scale: 1,
      duration: 0.12,
    });

    // Output
    tl.to(terminalOutput.current, {
      opacity: 1,
      duration: 0.25,
    });

    // Let user see output
    tl.to({}, { duration: 0.9 });

    // Terminal exits
    tl.to(terminal.current, {
      opacity: 0,
      scale: 1.05,
      y: -25,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Hero appears
    tl.set(heroText.current, {
      visibility: "visible",
    });

    tl.fromTo(
      heroText.current.children,
      {
        opacity: 0,
        y: 45,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );

    // Buttons
    tl.fromTo(
      ".hero-buttons",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.5"
    );
  });

  return () => ctx.revert();
}, []);

  return (
    <section
  id="home"
  className="hero"
  ref={hero}
>

  {/* TERMINAL INTRO */}
<div className="terminal-intro" ref={terminal}>
  <div className="terminal-window">
    <div className="terminal-header">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div className="terminal-body">
      <div>
        <span className="terminal-prompt">$ </span>
        <span ref={terminalCommand}></span>
        <span className="terminal-caret">▋</span>
      </div>

      <div className="terminal-output" ref={terminalOutput}>
        <div> Running Command...</div>
      </div>
    </div>
  </div>
</div>

<div className="fake-cursor" ref={fakeCursor}>
  ↖
</div>

      {/* =========================
          HERO TEXT
      ========================= */}

      <div
        className="hero-text"
        ref={heroText}
      >
        <p className="eyebrow">
          PERSONAL AI • DEVELOPER • DESIGNER
        </p>

        <h1>
  Hi, I'm{" "}
  <span className="light-name">
    Light.
    <span className="hero-cursor">|</span>
  </span>
</h1>

        <p className="subtitle">
          I build intelligent digital experiences
          where AI, code and design come together.
        </p>
      </div>

      {/* =========================
          BUTTONS
      ========================= */}

      <div className="hero-buttons">
        <a
          href="#projects"
          className="primary-btn magnetic"
        >
          Explore my work →
        </a>

        <a
          href="#contact"
          className="secondary-btn magnetic"
        >
          Contact me
        </a>
      </div>

      {/* =========================
          NORMAL 3D SCENE
      ========================= */}

      <div className="orb">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 45,
          }}
          gl={{
            alpha: true,
            antialias: true,
          }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>
    </section>
  );
}

