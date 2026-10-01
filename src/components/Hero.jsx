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

  const mouse = useRef({
    x: 0,
    y: 0,
  });

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

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();

    // Automatic rotation
    group.current.rotation.x +=
      (mouse.current.y * 0.35 - group.current.rotation.x) * 0.02;

    group.current.rotation.y +=
      (mouse.current.x * 0.35 + t * 0.003 - group.current.rotation.y) * 0.02;

    group.current.rotation.z =
      Math.sin(t * 0.5) * 0.08;

    // Floating movement
    group.current.position.y =
      Math.sin(t * 1.2) * 0.12;
  });

  /* 16 vertices of a 4D hypercube */

  const vertices = [];

  for (let i = 0; i < 16; i++) {
    vertices.push([
      i & 1 ? 1 : -1,
      i & 2 ? 1 : -1,
      i & 4 ? 1 : -1,
      i & 8 ? 1 : -1,
    ]);
  }

  /* Project 4D → 3D */

  const project = ([x, y, z, w]) => {
    const distance = 3;
    const scale = distance / (distance - w);

    return [
      x * scale,
      y * scale,
      z * scale,
    ];
  };

  const tesseractVertices = vertices.map((v) => [...v]);

const projected = tesseractVertices.map(project);

  /* Find the 32 edges */

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

  return (
    <group ref={group} scale={0.8}>

      {/* Tesseract edges */}

      {edges.map(([a, b], index) => {
        const start = projected[a];
        const end = projected[b];

        const points = [
          new THREE.Vector3(...start),
          new THREE.Vector3(...end),
        ];

        const geometry =
          new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={index}>

            {/* Glow */}

            <primitive
              object={
                new THREE.Line(
                  geometry,
                  new THREE.LineBasicMaterial({
                    color: "#8b5cf6",
                    transparent: true,
                    opacity: 0.12,
                  })
                )
              }
              scale={1.08}
            />

            {/* Main edge */}

            <primitive
              object={
                new THREE.Line(
                  geometry,
                  new THREE.LineBasicMaterial({
                    color:
                      index % 2 === 0
                        ? "#ffffff"
                        : "#a78bfa",
                    transparent: true,
                    opacity: 0.9,
                  })
                )
              }
            />

          </group>
        );
      })}

      {/* Tesseract vertices */}

      {projected.map((position, index) => (
        <mesh
          key={index}
          position={position}
        >
          <sphereGeometry args={[0.045, 16, 16]} />

          <meshBasicMaterial
            color={
              index % 2 === 0
                ? "#ffffff"
                : "#a78bfa"
            }
          />
        </mesh>
      ))}

      {/* Glow light */}

      <pointLight
        color="#8b5cf6"
        intensity={3}
        distance={5}
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

        <a
          href="#projects"
          className="primary-btn"
        >
          Explore my work →
        </a>

        <a
          href="#contact"
          className="secondary-btn"
        >
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
