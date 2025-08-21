import { useState, useEffect, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const keywords = ['a biologist', 'a developer', 'an innovator', 'a researcher', 'Jed Lin'];
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Use refs to prevent race conditions
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Typing speed
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenWords = 1500;

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isMountedRef.current) {
        setShowCursor(prev => !prev);
      }
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (currentKeywordIndex >= keywords.length) {
      // Animation complete, fade out and complete
      if (isMountedRef.current) {
        setIsFading(true);
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            onComplete();
          }
        }, 1000);
      }
      return;
    }

    const handleTyping = () => {
      if (!isMountedRef.current) return;

      const currentWord = keywords[currentKeywordIndex];
      
      if (isDeleting) {
        // Deleting
        if (currentKeyword.length > 0) {
          setCurrentKeyword(prev => prev.slice(0, -1));
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentKeywordIndex(prev => prev + 1);
        }
      } else {
        // Typing
        if (currentKeyword.length < currentWord.length) {
          setCurrentKeyword(prev => currentWord.slice(0, prev.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          // Word complete, pause then start deleting
          timeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              setIsDeleting(true);
              timeoutRef.current = setTimeout(handleTyping, pauseBetweenWords);
            }
          }, pauseBetweenWords);
        }
      }
    };

    // Start the typing animation
    const initialDelay = currentKeywordIndex === 0 ? 500 : 100;
    timeoutRef.current = setTimeout(handleTyping, initialDelay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentKeyword, currentKeywordIndex, isDeleting, keywords.length, onComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 ${
      isFading ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        <div className="text-white text-4xl md:text-6xl font-mono">
          <span>I am </span>
          <span className="text-primary">{currentKeyword}</span>
          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
