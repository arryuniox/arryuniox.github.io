import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNameAnimation = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

    colors[i * 3] = Math.random(); // r
    colors[i * 3 + 1] = Math.random(); // g
    colors[i * 3 + 2] = Math.random(); // b
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.005;
    }
  });

  console.log("ParticleNameAnimation rendered"); // Debug log

  return <points ref={particlesRef} geometry={geometry} material={material} />;
};

export default ParticleNameAnimation;
