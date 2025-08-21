import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const keywords = ['biologist', 'developer', 'innovator', 'researcher', 'Jed Lin'];
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Typing speed
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenWords = 1500;

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentKeywordIndex >= keywords.length) {
      // Animation complete, fade out and complete
      setIsFading(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
      return;
    }

    const handleTyping = () => {
      const currentWord = keywords[currentKeywordIndex];
      
      if (isDeleting) {
        // Deleting
        if (currentKeyword.length > 0) {
          setCurrentKeyword(prev => prev.slice(0, -1));
          setTimeout(handleTyping, deletingSpeed);
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentKeywordIndex(prev => prev + 1);
        }
      } else {
        // Typing
        if (currentKeyword.length < currentWord.length) {
          setCurrentKeyword(prev => currentWord.slice(0, prev.length + 1));
          setTimeout(handleTyping, typingSpeed);
        } else {
          // Word complete, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true);
            setTimeout(handleTyping, pauseBetweenWords);
          }, pauseBetweenWords);
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, currentKeywordIndex === 0 ? 500 : 100);
    
    return () => clearTimeout(timeoutId);
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
