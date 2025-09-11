import React, { useEffect, useRef } from 'react';

interface OceanParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  glowIntensity: number;
  color: string;
  delay: number;
}

const OceanicParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = React.useState<OceanParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: OceanParticle[] = [];
      const particleCount = 50;

      const lightModeColors = [
        '#4FC3F7', // Light blue - like shallow water
        '#29B6F6', // Medium blue
        '#0288D1', // Deep blue
        '#00BCD4', // Turquoise
        '#26C6DA', // Cyan
        '#80DEEA', // Very light blue
        '#B2EBF2', // Pale blue
        '#E0F7FA', // Almost white blue
      ];

      const darkModeColors = [
        '#1565C0', // Deep ocean blue
        '#0D47A1', // Dark navy
        '#0277BD', // Rich blue
        '#00838F', // Deep teal
        '#006064', // Dark cyan
        '#4DD0E1', // Bright cyan
        '#80DEEA', // Light cyan
        '#B2EBF2', // Pale cyan
      ];

      const colors = lightModeColors; // Default to light mode for now
      
      for (let i = 0; i < particleCount; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1, // Slightly larger particles
          opacity: Math.random() * 0.4 + 0.1, // More visible
          speedX: (Math.random() - 0.5) * 0.6, // Faster horizontal movement
          speedY: (Math.random() - 0.5) * 0.3, // Faster vertical movement
          glowIntensity: Math.random() * 0.2 + 0.2, // Stronger glow
          color: colors[colorIndex],
          delay: Math.random() * 3 // Shorter delay
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Main oceanic particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animation: `oceanFloat ${Math.random() * 6 + 4}s ease-in-out ${particle.delay}s infinite`,
            boxShadow: `
              0 0 ${particle.size * 3}px ${particle.size * 1.5}px ${particle.color}${Math.floor(particle.glowIntensity * 100)}`,
            filter: `blur(${particle.size * 0.8}px)`,
          }}
        />
      ))}

      {/* Subtle background gradient for oceanic atmosphere */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-blue-800/5"
        style={{
          animation: 'oceanPulse 15s ease-in-out infinite alternate',
        }}
      />

      <style>{`
        @keyframes oceanFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 15 - 7.5}px) scale(1.3);
            opacity: 0.6;
          }
          50% {
            transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 20 - 10}px) scale(0.9);
            opacity: 0.3;
          }
          75% {
            transform: translate(${Math.random() * 25 - 12.5}px, ${Math.random() * 25 - 12.5}px) scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes oceanPulse {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
};

export default OceanicParticles;
