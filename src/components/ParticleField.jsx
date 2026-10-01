import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ParticleField() {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.0004;
    ref.current.rotation.x += 0.00015;
  });

  return (
    <Points
      ref={ref}
      limit={2500}
      range={10}
      position={[0, 0, -2]}
    >
      <sphereGeometry args={[7, 64, 64]} />
      <PointMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </Points>
  );
}