import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export default function F1Car() {
  const { scene } = useGLTF("/models/f1.glb");

  scene.traverse((child) => {
  if (child.isMesh) {
    const box = new THREE.Box3().setFromObject(child);
    const size = new THREE.Vector3();
    box.getSize(size);

    console.log(
      "PART:",
      child.name,
      "SIZE:",
      size.x.toFixed(2),
      size.y.toFixed(2),
      size.z.toFixed(2)
    );
  }
});

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