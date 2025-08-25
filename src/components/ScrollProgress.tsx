import React from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange?: (index: number) => void; // Add this prop
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  currentSlide, 
  totalSlides, 
  onSlideChange 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-center space-y-2">
      {Array.from({ length: totalSlides }, (_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 ${
            index === currentSlide
              ? 'bg-primary border-primary scale-125'
              : 'bg-transparent border-muted-foreground hover:border-primary'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            onSlideChange?.(index); // Use the callback instead of console.log
          }}
        />
      ))}
      
      {/* Progress bar connecting the dots */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-muted-foreground/30 h-full -z-10">
        <motion.div
          className="w-full bg-primary origin-top"
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: (currentSlide + 1) / totalSlides 
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: 'top center' }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;