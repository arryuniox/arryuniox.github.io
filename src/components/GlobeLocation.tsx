import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlobeLocation = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.01; // Rotate globe
    }
  });

  console.log("GlobeLocation rendered"); // Debug log

  return (
    <mesh ref={globeRef} position={[0, 0, -2]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#00ff88"
        transparent={true}
        opacity={0.8}
        wireframe={false}
      />
    </mesh>
  );
};

export default GlobeLocation;
