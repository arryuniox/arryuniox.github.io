import React, { useEffect, useState } from 'react';
import { Text } from '@react-three/drei';

const AgeSlide = () => {
  const [age, setAge] = useState('');

  useEffect(() => {
    const calculateAge = () => {
      const startDate = new Date('2008-10-15T13:44:00');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const seconds = Math.floor(diff / 1000);
      const years = Math.floor(seconds / (365.25 * 24 * 60 * 60));
      const days = Math.floor((seconds % (365.25 * 24 * 60 * 60)) / (24 * 60 * 60));
      const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      const remainingSeconds = seconds % 60;

      setAge(`${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`);
    };

    const interval = setInterval(calculateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text fontSize={1.5} color="#ffffff" anchorX="center" anchorY="middle">
      {age}
    </Text>
  );
};

export default AgeSlide;
