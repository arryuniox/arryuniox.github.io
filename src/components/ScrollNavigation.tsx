import React from 'react';

interface ScrollNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (slideIndex: number) => void;
}

const ScrollNavigation: React.FC<ScrollNavigationProps> = ({ currentSlide, totalSlides, onSlideChange }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
      <button
        className={`px-4 py-2 rounded-lg text-white ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'}`}
        onClick={() => currentSlide > 0 && onSlideChange(currentSlide - 1)}
        disabled={currentSlide === 0}
      >
        Previous
      </button>
      <button
        className={`px-4 py-2 rounded-lg text-white ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'}`}
        onClick={() => currentSlide < totalSlides - 1 && onSlideChange(currentSlide + 1)}
        disabled={currentSlide === totalSlides - 1}
      >
        Next
      </button>
    </div>
  );
};

export default ScrollNavigation;
