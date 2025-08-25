import React from 'react';
import { Sphere } from '@react-three/drei';

const ZoomingGlobe = () => {
  return (
    <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#00ff88" />
    </Sphere>
  );
};

export default ZoomingGlobe;
