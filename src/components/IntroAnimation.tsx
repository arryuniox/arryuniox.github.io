import { useState, useEffect, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
  onSkip: () => void;
}

const IntroAnimation = ({ onComplete, onSkip }: IntroAnimationProps) => {
  const keywords = ['a biologist', 'a developer', 'an innovator', 'a researcher', 'Jed Lin'];
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Use refs to prevent race conditions
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Typing speed
  const typingSpeed = 80;
  const deletingSpeed = 40;
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
      if (isMountedRef.current && !isComplete) {
        setShowCursor(prev => !prev);
      }
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [isComplete]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (currentKeywordIndex >= keywords.length) {
      // Animation complete, keep "Jed Lin" on screen
      if (isMountedRef.current) {
        setIsComplete(true);
        setShowCursor(false); // Hide cursor when complete
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setIsFading(true);
            timeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                onComplete();
              }
            }, 1000);
          }
        }, 2000); // Give 2 seconds to view "Jed Lin" before fading
      }
      return;
    }

    const handleTyping = () => {
      if (!isMountedRef.current) return;

      const currentWord = keywords[currentKeywordIndex];
      const isLastWord = currentKeywordIndex === keywords.length - 1;
      
      if (isDeleting) {
        // Don't delete if it's the last word ("Jed Lin")
        if (isLastWord) {
          setIsComplete(true);
          return;
        }
        
        // Deleting for other words
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
          // Word complete
          if (isLastWord) {
            // Last word complete, don't delete
            setTimeout(() => {
              if (isMountedRef.current) {
                setIsComplete(true);
                timeoutRef.current = setTimeout(() => {
                  if (isMountedRef.current) {
                    setIsFading(true);
                    timeoutRef.current = setTimeout(() => {
                      if (isMountedRef.current) {
                        onComplete();
                      }
                    }, 1000);
                  }
                }, 2000);
              }
            }, pauseBetweenWords);
          } else {
            // Not last word, pause then start deleting
            timeoutRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                setIsDeleting(true);
                timeoutRef.current = setTimeout(handleTyping, pauseBetweenWords);
              }
            }, pauseBetweenWords);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentKeyword, currentKeywordIndex, isDeleting, keywords.length, onComplete, isComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 ${
      isFading ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        <div className="text-white text-4xl md:text-6xl font-mono">
          <span>I am </span>
          <span className="text-primary">{currentKeyword}</span>
          {!isComplete && (
            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
          )}
        </div>
      </div>
      {!isComplete && (
        <button
          onClick={onSkip}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white hover:text-primary text-lg md:text-xl font-medium transition-all duration-1150 bg-primary/20 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-primary/50 hover:border-primary animate-pulse hover:animate-none hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          aria-label="Skip intro animation"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
};

export default IntroAnimation;
