import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import NameSlide from './NameSlide';
import AgeSlide from './AgeSlide';
import ZoomingGlobe from './ZoomingGlobe';
import IntroSlide from './IntroSlide';

const EnhancedTechStack3D = () => {
  const containerRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [<NameSlide />, <AgeSlide />, <ZoomingGlobe />, <IntroSlide />];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const slideIndex = Math.floor(scrollY / window.innerHeight);
      setCurrentSlide(slideIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (containerRef.current) {
      const rotationX = mouse.y * 0.5;
      const rotationY = mouse.x * 0.5;
      
      containerRef.current.rotation.x = THREE.MathUtils.lerp(
        containerRef.current.rotation.x,
        rotationX,
        0.1
      );
      
      containerRef.current.rotation.y = THREE.MathUtils.lerp(
        containerRef.current.rotation.y,
        rotationY,
        0.1
      );

      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      containerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={containerRef} position={[0, 0, 0]}>
      {slides[currentSlide]}
      {/* Main tech stack sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhongMaterial
          color="#1e293b"
          transparent={true}
          opacity={0.3}
          wireframe={true}
        />
      </mesh>

      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00ff88" />
    </group>
  );
};

export default EnhancedTechStack3D;
