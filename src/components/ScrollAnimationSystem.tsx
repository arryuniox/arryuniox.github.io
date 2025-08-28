import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide1Particles from './Slide1Particles.tsx';
import Slide2AgeCounter from './Slide2AgeCounter.tsx';
import Slide3Geography from './Slide3Geography.tsx';
import Slide4Introduction from './Slide4Introduction.tsx';
import ScrollProgress from './ScrollProgress.tsx';

interface ScrollAnimationSystemProps {
  children?: React.ReactNode;
}

const ScrollAnimationSystem: React.FC<ScrollAnimationSystemProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Total number of slides
  const totalSlides = 4;

  // Disable body scroll completely
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  const goToSlide = useCallback((slideIndex: number, dir: 'up' | 'down' = 'down') => {
    console.log(`goToSlide called: ${slideIndex}, current: ${currentSlide}, total: ${totalSlides}, isAnimating: ${isAnimating}`);
    
    if (slideIndex < 0 || slideIndex >= totalSlides) {
      console.log(`Blocked: slideIndex ${slideIndex} out of bounds (0-${totalSlides-1})`);
      return;
    }
    
    if (slideIndex === currentSlide) {
      console.log('Blocked: same slide');
      return;
    }

    // Clear any existing timeout immediately
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    // Set animation state and slide change simultaneously
    setIsAnimating(true);
    setDirection(dir);
    setCurrentSlide(slideIndex);

    // Set timeout to end animation state - slightly longer than animation duration
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      console.log(`✓ Animation completed for slide ${slideIndex}`);
    }, 700); // Slightly longer than animation duration to ensure smooth transition

  }, [currentSlide, isAnimating, totalSlides]);

  useEffect(() => {
    if (!containerRef.current) return;

    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Only prevent default if not on globe slide
      if (currentSlide !== 2) {
        e.preventDefault();
      }
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent default if not on globe slide
      if (currentSlide !== 2) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Only prevent default if not on globe slide
      if (currentSlide !== 2) {
        e.preventDefault();
      }
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const deltaY = touchStartY - touchEndY;
      const deltaTime = touchEndTime - touchStartTime;
      const velocity = Math.abs(deltaY) / deltaTime;

      console.log(`Touch end: deltaY=${deltaY}, velocity=${velocity}`);

      // Require minimum distance and velocity for swipe
      if (Math.abs(deltaY) > 20 && velocity > 0.1) { // Even lower thresholds for better responsiveness
        let targetSlide = currentSlide;
        let dir: 'up' | 'down' = 'down';

        if (deltaY > 0 && currentSlide < totalSlides - 1) {
          targetSlide = currentSlide + 1;
          dir = 'down';
        } else if (deltaY < 0 && currentSlide > 0) {
          targetSlide = currentSlide - 1;
          dir = 'up';
        }

        if (targetSlide !== currentSlide) {
          goToSlide(targetSlide, dir);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(`Key pressed: ${e.key}, isAnimating=${isAnimating}, currentSlide=${currentSlide}`);
      
      let targetSlide = currentSlide;
      let dir: 'up' | 'down' = 'down';

      if (e.key === 'ArrowDown' && currentSlide < totalSlides - 1) {
        targetSlide = currentSlide + 1;
        dir = 'down';
      } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        targetSlide = currentSlide - 1;
        dir = 'up';
      } else if (e.key === 'Escape') {
        // Reset to first slide
        if (currentSlide !== 0) {
          goToSlide(0, 'up');
        }
        return;
      }

      if (targetSlide !== currentSlide) {
        e.preventDefault();
        console.log(`Key navigation: going to slide ${targetSlide}`);
        goToSlide(targetSlide, dir);
      }
    };

    // Add event listeners to window and container
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Add keyboard listener to window for broader capture
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, isAnimating, goToSlide, totalSlides]);

  // Slide animation variants
  const slideVariants = {
    enter: (direction: 'up' | 'down') => ({
      y: direction === 'down' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: 'up' | 'down') => ({
      y: direction === 'down' ? '-100%' : '100%',
      opacity: 0,
      scale: 1.1,
    }),
  };

  const slideTransition = {
    type: 'tween' as const,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // Smoother easing curve
    duration: 0.4, // Slightly faster duration
  };

  const slides = [
    { component: <Slide1Particles />, bg: 'bg-background', width: 'w-full', height: 'h-full' },
    { component: <Slide2AgeCounter />, bg: 'bg-card' },
    { component: <Slide3Geography />, bg: 'bg-background' },
    { component: <Slide4Introduction />, bg: 'bg-card' },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden focus:outline-none"
      tabIndex={0}
      style={{ 
        userSelect: currentSlide === 2 ? 'auto' : 'none',
        WebkitUserSelect: currentSlide === 2 ? 'auto' : 'none',
        touchAction: currentSlide === 2 ? 'auto' : 'none'
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={`slide-${currentSlide}`} // More specific key
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className={`slide h-screen w-full flex items-center justify-center absolute inset-0 ${slides[currentSlide].bg}`}
        >
          <div key={`content-${currentSlide}`} className="w-full h-full flex items-center justify-center">
            {slides[currentSlide].component}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Navigation Components */}
      <ScrollProgress 
        currentSlide={currentSlide} 
        totalSlides={totalSlides}
        onSlideChange={(index) => {
          const dir = index > currentSlide ? 'down' : 'up';
          goToSlide(index, dir);
        }}
      />

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-sm text-muted-foreground opacity-60 z-50">
        Use arrow keys or swipe to navigate • ESC to reset
      </div>

      {/* Debug info
      <div className="fixed top-4 left-4 text-sm text-white bg-black/50 p-2 rounded z-50">
        <div>Slide: {currentSlide + 1}/{totalSlides}</div>
        <div>Animating: {isAnimating ? 'Yes' : 'No'}</div>
        <div>Direction: {direction}</div>
        <div>Can go forward: {currentSlide < totalSlides - 1 ? 'Yes' : 'No'}</div>
        <div>Can go back: {currentSlide > 0 ? 'Yes' : 'No'}</div>
      </div> */}

      {/* Background transition overlay */}
      <motion.div
        key={`bg-${currentSlide}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-0 -z-10 ${slides[currentSlide].bg}`}
      />
    </div>
  );
};

export default ScrollAnimationSystem;
