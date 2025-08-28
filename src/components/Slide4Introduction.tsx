import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Code, Trophy, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Slide4Introduction: React.FC = () => {
  const navigate = useNavigate();
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleViewWork = () => {
    navigate('/projects');
  };

  const handleDownloadResume = () => {
    window.open('/JedLin_Resume_20250824.pdf', '_blank');
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          
          <motion.div
            className="prose prose-lg md:prose-xl text-muted-foreground max-w-none text-left"
            variants={staggerContainer}
          >
            <motion.p variants={textVariants} className="mb-6">
              Hi, I'm <span className="text-primary font-semibold">Jed Lin</span> — a high school student with a suspicious amount of free time that I tend to funnel into molecular biology, bacterial genomics, and building pipelines that probably shouldn't work but somehow do.
            </motion.p>
            
            <motion.p variants={textVariants} className="mb-6">
              I've dabbled in genetically engineering cyanobacteria (yes, the pond scum kind) for carbon sequestration, competed in multiple biology Olympiads (gold medals included), and somehow spent my summer at prestigious SSP studying how bacteria handle stress (arguably more productively and healthily than I do).
            </motion.p>
            
            <motion.p variants={textVariants} className="mb-6">
              I also code things when biology gets too wet (although I do prefer wet lab a bit more than dry lab) — machine learning pipelines, genome annotation tools, random Colab scripts that yell at HMMER until it cooperates. My work lives somewhere at the intersection of curiosity, grimdark science fair energy, and the mild chaos of <span className="font-mono text-code-orange">open-source bioinformatics</span>.
            </motion.p>
            
            <motion.p variants={textVariants} className="text-primary font-semibold">
              If you want to talk about molecular genetics, systems biology, or why bacteria are the greatest life forms to ever exist on Earth, we'll get along.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-muted-foreground mb-6">
            Ready to explore more?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewWork}
            >
              View My Work
            </motion.button>
            <motion.button
              className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
            >
              Download Resume
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4Introduction;
