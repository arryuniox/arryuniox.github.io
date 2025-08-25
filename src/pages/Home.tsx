<<<<<<< Updated upstream
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"; 
import { Link } from "react-router-dom"; 
import EnhancedTechStack3D from "@/components/EnhancedTechStack3D";
import ParallaxBackground3D from "@/components/ParallaxBackground3D";

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Canvas covering the entire screen */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.5}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* 3D Components */}
          <ParallaxBackground3D />
          <EnhancedTechStack3D />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Explore My Work
            </h3>
            <Button size="lg" asChild className="w-full gradient-hero">
              <Link to="/projects">View My Work</Link>
            </Button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Learn About Me
            </h3>
            <Button variant="outline" size="lg" asChild className="w-full hover:border-primary/50">
              <Link to="/about">More About Me</Link>
            </Button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Get My Resume
            </h3>
            <Button
              size="lg"
              variant="secondary"
              className="w-full bg-primary/10 hover:bg-primary/20"
              onClick={() => window.open('/JedLin_Resume_20250824.pdf', '_blank')}
            >
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
=======
import ScrollAnimationSystem from "@/components/ScrollAnimationSystem";

const Home = () => {
  return (
    <ScrollAnimationSystem>
      {/* The content of the scroll animation system will replace the existing content */}
    </ScrollAnimationSystem>
>>>>>>> Stashed changes
  );
};

export default Home;
