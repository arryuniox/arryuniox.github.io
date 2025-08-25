import { useEffect, useState } from 'react';
import { Text } from '@react-three/drei';

const DynamicAgeCounter = () => {
  const [age, setAge] = useState('');

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date('2008-10-15T13:44:00');
      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();
      const seconds = Math.floor(diff / 1000);
      const years = Math.floor(seconds / (3600 * 24 * 365));
      const days = Math.floor((seconds % (3600 * 24 * 365)) / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      setAge(`${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      fontSize={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      position={[0, 0, 0]} // Adjust position as needed
    >
      {age}
    </Text>
  );
};

export default DynamicAgeCounter;
