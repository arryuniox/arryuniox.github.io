import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
}

const Slide1Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Optimized particle creation
  const createParticle = useCallback((x: number, y: number): Particle => {
    return {
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 0.5, // Much slower movement
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.5 + 0.5, // Smaller particles
      opacity: Math.random() * 0.4 + 0.1, // More subtle opacity
      hue: 174 + Math.random() * 20, // Narrower color range
      life: Math.random() * 300 + 100, // Longer life for stability
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Optimize canvas settings
    ctx.imageSmoothingEnabled = false;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize fewer particles in a more organized pattern
    const initializeParticles = () => {
      const particles: Particle[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create particles in concentric circles for more controlled look
      for (let ring = 0; ring < 3; ring++) {
        const radius = 80 + ring * 40;
        const particleCount = 4 + ring * 2; // 4, 6, 8 particles per ring
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + ring * 0.3; // Slight offset per ring
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          particles.push(createParticle(x, y));
        }
      }
      
      particlesRef.current = particles;
    };

    initializeParticles();

    let lastTime = 0;
    const targetFPS = 30; // Reduce FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear with background color for better blending
      ctx.fillStyle = 'hsl(222, 84%, 5%)'; // Match your background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Very subtle mouse influence
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150 * 0.002; // Much weaker force
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }

        // Update position with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.995; // Strong damping for stability
        particle.vy *= 0.995;

        // Gentle boundary bounce
        if (particle.x < 20) { particle.vx = Math.abs(particle.vx) * 0.3; particle.x = 20; }
        if (particle.x > canvas.width - 20) { particle.vx = -Math.abs(particle.vx) * 0.3; particle.x = canvas.width - 20; }
        if (particle.y < 20) { particle.vy = Math.abs(particle.vy) * 0.3; particle.y = 20; }
        if (particle.y > canvas.height - 20) { particle.vy = -Math.abs(particle.vy) * 0.3; particle.y = canvas.height - 20; }

        // Age particle
        particle.life -= 1;

        // Calculate life-based opacity
        const lifeRatio = Math.max(0, particle.life / 300);
        const currentOpacity = particle.opacity * lifeRatio;

        if (particle.life <= 0) {
          // Respawn particle near center
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const angle = Math.random() * Math.PI * 2;
          const radius = 60 + Math.random() * 80;
          
          particles[i] = createParticle(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
          );
          continue;
        }

        // Draw particle with subtle glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 60%, ${currentOpacity})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 50%, 50%, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 40%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core particle
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 70%, ${currentOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle connections between nearby particles
      ctx.strokeStyle = `hsla(174, 50%, 50%, 0.1)`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.05;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking with throttling
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }, 16); // ~60fps throttling
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      clearTimeout(mouseTimeout);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle, isVisible]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Canvas for particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Main text with enhanced styling */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 blur-2xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary/30">
              Jed Lin
            </h1>
          </div>
          
          {/* Main text */}
          <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-bold">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              Jed
            </span>
            <span className="text-white ml-4">Lin</span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-slate-300 font-light">
            Biology • Code • Innovation
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-primary opacity-60"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
      </motion.div>
    </div>
  );
};

export default Slide1Particles;