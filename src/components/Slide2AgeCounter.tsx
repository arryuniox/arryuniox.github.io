import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

// Memoize components to prevent unnecessary re-renders
const CounterDigit: React.FC<{ value: number; label: string }> = memo(({ value, label }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative h-16 md:h-20 lg:h-24 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0.7 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0.7 }}
          transition={{ 
            duration: 0.3, // Even faster
            ease: "easeOut"
          }}
          className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-primary flex items-center justify-center"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="text-sm md:text-base text-muted-foreground mt-2 uppercase tracking-wider">
      {label}
    </div>
  </motion.div>
));

const StatCard: React.FC<{ value: number; label: string; description: string }> = memo(({ value, label, description }) => (
  <motion.div
    className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="text-2xl md:text-3xl font-bold text-primary font-mono min-h-[2rem] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.15 }}
        >
          {value.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
    <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">
      {label}
    </div>
    <div className="text-xs text-muted-foreground/70 mt-2">
      {description}
    </div>
  </motion.div>
));

const Slide2AgeCounter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const birthDate = useMemo(() => new Date(2008, 9, 15, 13, 44, 0), []); // October 15, 2008 13:44

  useEffect(() => {
    // Use requestAnimationFrame for smoother updates
    let animationFrame: number;
    
    const updateTime = () => {
      setCurrentTime(new Date());
      animationFrame = requestAnimationFrame(updateTime);
    };
    
    // Start the animation loop
    animationFrame = requestAnimationFrame(updateTime);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Memoize calculations to prevent unnecessary recalculations
  const ageData = useMemo(() => {
    const years = differenceInYears(currentTime, birthDate);
    const months = differenceInMonths(currentTime, birthDate) % 12;
    const weeks = differenceInWeeks(currentTime, birthDate) % 4;
    const days = differenceInDays(currentTime, birthDate) % 7;
    const hours = differenceInHours(currentTime, birthDate) % 24;
    const minutes = differenceInMinutes(currentTime, birthDate) % 60;
    const seconds = differenceInSeconds(currentTime, birthDate) % 60;

    // Calculate additional statistics
    const totalDays = Math.floor((currentTime.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24 + hours;
    const totalMinutes = totalHours * 60 + minutes;
    const totalSeconds = totalMinutes * 60 + seconds;
    const estimatedHeartbeats = Math.floor(totalMinutes * 70); // Average 70 bpm
    const estimatedBreaths = Math.floor(totalMinutes * 16); // Average 16 breaths per minute

    return {
      years, months, weeks, days, hours, minutes, seconds,
      totalDays, totalHours, estimatedHeartbeats, estimatedBreaths
    };
  }, [currentTime, birthDate]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      {/* Static header - won't re-render */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Time Alive
        </h2>
        <p className="text-muted-foreground text-lg">
          Since October 15, 2008 13:44
        </p>
      </motion.div>

      {/* Main counter - only changing digits will animate */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
        <CounterDigit value={ageData.years} label="Years" />
        <CounterDigit value={ageData.months} label="Months" />
        <CounterDigit value={ageData.weeks} label="Weeks" />
        <CounterDigit value={ageData.days} label="Days" />
        <CounterDigit value={ageData.hours} label="Hours" />
        <CounterDigit value={ageData.minutes} label="Minutes" />
        <CounterDigit value={ageData.seconds} label="Seconds" />
      </div>

      {/* Additional statistics - memoized to prevent unnecessary updates */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <StatCard
          value={ageData.totalDays}
          label="Total Days"
          description="Days lived so far"
        />
        <StatCard
          value={ageData.totalHours}
          label="Total Hours"
          description="Hours of experience"
        />
        <StatCard
          value={ageData.estimatedHeartbeats}
          label="Heartbeats"
          description="Estimated cardiac cycles"
        />
        <StatCard
          value={ageData.estimatedBreaths}
          label="Breaths"
          description="Estimated breaths taken"
        />
      </motion.div>

      {/* Static fun fact - won't re-render */}
      <motion.div
        className="mt-8 text-center text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p>Each second is a new opportunity for discovery</p>
      </motion.div>
    </div>
  );
};

export default memo(Slide2AgeCounter);