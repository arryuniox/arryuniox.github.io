import React, { useEffect, useRef } from 'react';

interface RainDrop {
  id: number;
  x: number;
  y: number;
  length: number;
  opacity: number;
  speed: number;
  delay: number;
  blur?: boolean;
}

const RainEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rainDrops, setRainDrops] = React.useState<RainDrop[]>([]);
  const [mistParticles, setMistParticles] = React.useState<RainDrop[]>([]);

  useEffect(() => {
    const generateRainDrops = () => {
      const drops: RainDrop[] = [];
      const dropCount = 60;

      for (let i = 0; i < dropCount; i++) {
        drops.push({
          id: i,
          x: Math.random() * 100,
          y: -20 - Math.random() * 100,
          length: Math.random() * 30 + 15,
          opacity: Math.random() * 0.4 + 0.1,
          speed: Math.random() * 1.5 + 0.5,
          delay: Math.random() * 3,
          blur: Math.random() > 0.7
        });
      }

      setRainDrops(drops);
    };

    const generateMistParticles = () => {
      const mist: RainDrop[] = [];
      const mistCount = 30;

      for (let i = 0; i < mistCount; i++) {
        mist.push({
          id: i + 100,
          x: Math.random() * 100,
          y: Math.random() * 100,
          length: Math.random() * 2 + 1,
          opacity: Math.random() * 0.05 + 0.02,
          speed: Math.random() * 0.5 + 0.2,
          delay: Math.random() * 5
        });
      }

      setMistParticles(mist);
    };

    generateRainDrops();
    generateMistParticles();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Main rain drops */}
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-gradient-to-b from-blue-400/40 via-blue-500/20 to-transparent"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            width: drop.blur ? '1.5px' : '1px',
            height: `${drop.length}px`,
            opacity: drop.opacity,
            animation: `fall ${drop.speed + 2}s linear ${drop.delay}s infinite`,
            transform: 'rotate(12deg)',
            filter: drop.blur ? 'blur(0.5px)' : 'none',
            boxShadow: '0 0 3px rgba(59, 130, 246, 0.3)',
          }}
        />
      ))}
      
      {/* Secondary rain streaks */}
      {rainDrops.slice(0, 25).map((drop) => (
        <div
          key={`streak-${drop.id}`}
          className="absolute bg-blue-300/30"
          style={{
            left: `${drop.x + 0.3}%`,
            top: `${drop.y - 5}%`,
            width: '0.5px',
            height: `${drop.length * 1.2}px`,
            opacity: drop.opacity * 0.4,
            animation: `fall ${drop.speed + 2.5}s linear ${drop.delay + 0.3}s infinite`,
            transform: 'rotate(8deg)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Mist particles for atmospheric effect */}
      {mistParticles.map((mist) => (
        <div
          key={`mist-${mist.id}`}
          className="absolute rounded-full bg-blue-200/10"
          style={{
            left: `${mist.x}%`,
            top: `${mist.y}%`,
            width: `${mist.length * 3}px`,
            height: `${mist.length * 3}px`,
            opacity: mist.opacity,
            animation: `float ${mist.speed + 8}s ease-in-out ${mist.delay}s infinite`,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Subtle lightning effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-transparent"
        style={{
          animation: 'lightning 8s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default RainEffect;
