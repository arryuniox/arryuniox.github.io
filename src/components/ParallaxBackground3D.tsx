import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const ParallaxBackground3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Parallax effect based on mouse position
      const parallaxX = mouse.x * 0.1;
      const parallaxY = mouse.y * 0.1;
      
      // Update material color based on viewing angle
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      const hue = (Math.atan2(mouse.y, mouse.x) / Math.PI + 1) * 0.5;
      material.color.setHSL(hue, 0.8, 0.6);
      
      // Apply parallax transformation
      meshRef.current.position.x = parallaxX * 2;
      meshRef.current.position.y = parallaxY * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial 
        color="#0f172a" 
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

export default ParallaxBackground3D;
