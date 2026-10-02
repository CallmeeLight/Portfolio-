import { useGLTF } from "@react-three/drei";

export default function F1Car() {
  const { scene } = useGLTF("/models/f1.glb");

  return (
    <primitive
      object={scene}
      scale={1.0}
      position={[0, -1, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

useGLTF.preload("/models/f1.glb");