import { useRef, useEffect } from "react";
import ParticleField from "./ParticleField";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Points, PointMaterial } from "@react-three/drei";
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
      // 4D rotation: X-Y plane
      let rx = x * cosA - y * sinA;
      let ry = x * sinA + y * cosA;

      // 4D rotation: Z-W plane
      let rz = z * cosB - w * sinB;
      let rw = z * sinB + w * cosB;

      // 4D → 3D perspective
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

      const positions = line.geometry.attributes.position.array;

      positions[0] = projected[a][0];
      positions[1] = projected[a][1];
      positions[2] = projected[a][2];

      positions[3] = projected[b][0];
      positions[4] = projected[b][1];
      positions[5] = projected[b][2];

      line.geometry.attributes.position.needsUpdate = true;
    });

    // Smooth mouse interaction
    group.current.rotation.x +=
      (mouse.current.y * 0.25 - group.current.rotation.x) * 0.03;

    group.current.rotation.y +=
      (mouse.current.x * 0.25 - group.current.rotation.y) * 0.03;

    // Floating movement
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

        const material = new THREE.LineBasicMaterial({
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
   HERO
========================= */

export default function Hero() {
  const heroText = useRef();

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

  return (
    <section className="hero">

      {/* Hero Text */}

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
          I build intelligent digital experiences where AI,
          code and design come together.
        </p>
      </div>

      {/* Buttons */}

      <div className="hero-buttons">

        <a href="#projects" className="primary-btn magnetic">
  Explore my work →
</a>

<a href="#contact" className="secondary-btn magnetic">
  Contact me
</a>

      </div>

      {/* 3D Tesseract */}

      <div className="orb">
        <Canvas camera={{ position: [0, 0, 5] }}>

          <ambientLight intensity={0.4} />

          <pointLight
            position={[3, 3, 3]}
            intensity={15}
          />

          <ParticleField />

          <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.5}
          >
            <Tesseract />
          </Float>

          <Particles />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
          />

        </Canvas>
      </div>

    </section>
  );
}
