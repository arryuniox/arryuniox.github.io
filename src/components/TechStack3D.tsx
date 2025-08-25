import { useEffect, useRef } from 'react';
import { Code, Dna, Database, Cpu, Brain, GitBranch, Cloud } from 'lucide-react';

interface TechItem {
  id: number;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
}

const techStack: TechItem[] = [
  {
    id: 1,
    name: 'React',
    icon: Code,
    color: 'text-blue-400',
    description: 'Frontend development'
  },
  {
    id: 2,
    name: 'Python',
    icon: Code,
    color: 'text-yellow-400',
    description: 'Data science & ML'
  },
  {
    id: 3,
    name: 'Bioinformatics',
    icon: Dna,
    color: 'text-green-400',
    description: 'Genome analysis'
  },
  {
    id: 4,
    name: 'PostgreSQL',
    icon: Database,
    color: 'text-blue-300',
    description: 'Database management'
  },
  {
    id: 5,
    name: 'TensorFlow',
    icon: Brain,
    color: 'text-orange-400',
    description: 'Machine learning'
  },
  {
    id: 6,
    name: 'Docker',
    icon: Cpu,
    color: 'text-blue-200',
    description: 'Containerization'
  },
  {
    id: 7,
    name: 'Git',
    icon: GitBranch,
    color: 'text-red-400',
    description: 'Version control'
  },
  {
    id: 8,
    name: 'AWS',
    icon: Cloud,
    color: 'text-yellow-300',
    description: 'Cloud services'
  }
];

const TechStack3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) / 25;
      const y = (clientY - innerHeight / 2) / 25;

      containerRef.current.style.transform = `
        perspective(1000px)
        rotateX(${-y}deg)
        rotateY(${x}deg)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-80 h-80 transform-style-preserve-3d transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d', height: '400px' }} // Set a height
      >
        {techStack.map((tech, index) => {
          const angle = (index / techStack.length) * Math.PI * 2;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const rotationY = (angle * 180) / Math.PI;

          return (
            <div
              key={tech.id}
              className="absolute w-20 h-20 flex flex-col items-center justify-center p-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:z-50"
              style={{
                transform: `
                  translate3d(${x}px, 0px, ${z}px)
                  rotateY(${rotationY}deg)
                `,
                transformStyle: 'preserve-3d',
              }}
            >
              <tech.icon
                className={`w-8 h-8 mb-2 ${tech.color} transition-colors duration-300`}
              />
              <span className="text-xs font-semibold text-foreground text-center">
                {tech.name}
              </span>
              <span className="text-[10px] text-muted-foreground text-center mt-1">
                {tech.description}
              </span>
            </div>
          );
        })}

        {/* Center sphere */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full border border-primary/20 shadow-lg backdrop-blur-sm flex items-center justify-center">
          <Dna className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
    </div>
  );
};

export default TechStack3D;