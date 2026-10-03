import F1Car from "./F1Car";
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
   SCROLL CAR
========================= */

function ScrollCar({ progress }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;

    const targetY = -progress * 2.8;
    const targetX = progress * 1.2;
    const targetZ = progress * -1.2;

    group.current.position.y +=
      (targetY - group.current.position.y) * 0.08;

    group.current.position.x +=
      (targetX - group.current.position.x) * 0.08;

    group.current.position.z +=
      (targetZ - group.current.position.z) * 0.08;

    const targetRotationY = progress * 0.7;

    group.current.rotation.y +=
      (targetRotationY - group.current.rotation.y) * 0.08;

    const targetScale = 1 - progress * 0.35;

    const currentScale =
      group.current.scale.x +
      (targetScale - group.current.scale.x) * 0.08;

    group.current.scale.setScalar(currentScale);
  });

  return (
    <group ref={group}>
      <F1Car />
    </group>
  );
}


/* =========================
   SCENE
========================= */

function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.4} />

      <pointLight
        position={[3, 3, 3]}
        intensity={15}
      />

      <ParticleField />

      <ScrollCar progress={scrollProgress} />

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

    const [scrollProgress, setScrollProgress] =
  React.useState(0);

  /* HERO INTRO */

  useEffect(() => {
    if (!heroText.current) return;

    gsap.fromTo(
      heroText.current.children,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  /* =========================
     CINEMATIC SCROLL
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      if (!hero.current) return;

      const rect =
        hero.current.getBoundingClientRect();

      const progress = THREE.MathUtils.clamp(
        -rect.top / window.innerHeight,
        0,
        1
      );

      setScrollProgress(progress);

    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <section
  id="home"
  className="hero"
  ref={hero}
>
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
          Hi, I'm <span>Light.</span>
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
          <Scene
  scrollProgress={scrollProgress}
/>
        </Canvas>
      </div>
    </section>
  );
}

