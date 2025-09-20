import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import  Slide6Books  from "@/components/Slide6Books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Trophy, Code, Globe, Heart, FileText, ArrowUpRight, Play, Pause, SkipBack, SkipForward, Repeat } from "lucide-react";
import Slide5Music from "@/components/Slide5Music";


interface Widget {
  id: string;
  title: React.ReactNode;
  icon: React.ReactNode;
  content: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  size: 'small' | 'medium' | 'large';
}

const About = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const initialWidgets: Widget[] = [
    {
      id: 'resume',
      title: 'Resume',
      icon: <FileText className="w-4 h-4" />,
      position: { x: 630, y: 135 },
      zIndex: 2,
      size: 'small',
      content: (
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Full experience & qualifications</p>
          <a href="/JedLin_Resume_20250824.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/80 transition-colors group">
            <span>Download</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      )
    },
    {
      id: 'current',
      title: 'Currently',
      icon: <Code className="w-4 h-4" />,
      position: { x: 950, y: 80 },
      zIndex: 3,
      size: 'small',
      content: (
        <div className="space-y-4">
          <h4 className="font-medium text-sm mb-2 text-primary">Research Focus</h4>
          <ul className="space-y-2">
            {["Bacterial stress response mechanisms", "ML models for phenotype prediction", "Random molecular biology stuff"].map((item, i) => (
              <li key={i} className="text-sm text-foreground/70 flex items-center space-x-2"><div className="w-1 h-1 bg-primary rounded-full"></div><span>{item}</span></li>
            ))}
          </ul>
        </div>
      )
    },
    // put the music widget near the top but slightly squeezed — make it medium to accommodate player UI
    {
      id: 'music',
      title: 'Sounds',
      icon: <Music className="w-4 h-4" />,
      position: { x: 40, y: 96 },
      zIndex: 4,
      size: 'medium',
      content: <Slide5Music />
    },
    {
      id: 'books',
      title: 'Reading',
      icon: <BookOpen className="w-4 h-4" />,
      position: { x: 350, y: 380 }, // slightly higher for better layout with larger size
      zIndex: 5,
      size: 'large', // changed from 'small' to 'large' to make the books widget bigger
      content: <Slide6Books />
    },
    {
      id: 'fun',
      title: 'Random',
      icon: <Globe className="w-4 h-4" />,
      position: { x: 760, y: 350 },
      zIndex: 6,
      size: 'large',
      content: (
        <div className="space-y-3">
          {["NCBI documentation enthusiast", "Cyanobacteria advocate", "\"I use linux btw\"", <><a href='https://allpoetry.com/Arryuniox' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 underline'>Emo poetry</a> writer (don't ask)</>, <>Mid-tier <a href='https://www.youtube.com/@jeddrumz' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 underline'>Youtube</a> drummer</>, "Peaked S-rank Tetris Player", "Likes to think that he can draw"].map((fact, index) => (
            <div key={index} className="text-sm text-foreground/70 flex items-start space-x-2">
              <span className="text-orange-400 mt-0.5 flex-shrink-0 text-xs">●</span>
              <span className="leading-relaxed">{fact}</span>
            </div>
          ))}
        </div>
      )
    },
  ];

  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    draggedId: string | null;
    offset: { x: number; y: number };
    lastPos?: { x: number; y: number };
  }>( {
    isDragging: false,
    draggedId: null,
    offset: { x: 0, y: 0 },
    lastPos: undefined
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    widgets.forEach(w => {
      const el = cardRefs.current[w.id];
      if (el) {
        el.style.position = 'absolute';
        el.style.left = '0';
        el.style.top = '0';
        el.style.transform = `translate3d(${w.position.x}px, ${w.position.y}px, 0)`;
        el.style.willChange = 'transform';
      }
    });
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bringToFront = (widgetId: string) => {
    setWidgets(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === widgetId ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, widgetId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const el = cardRefs.current[widgetId];
    const rect = el ? el.getBoundingClientRect() : (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const currentX = rect.left - containerRect.left;
    const currentY = rect.top - containerRect.top;

    setDragState({ isDragging: true, draggedId: widgetId, offset, lastPos: { x: Math.round(currentX), y: Math.round(currentY) } });
    bringToFront(widgetId);

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedId || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const el = cardRefs.current[dragState.draggedId];
    const elRect = el ? el.getBoundingClientRect() : { width: 320, height: 200 };
    const elW = elRect.width;
    const elH = elRect.height;

    let newX = e.clientX - containerRect.left - dragState.offset.x;
    let newY = e.clientY - containerRect.top - dragState.offset.y;

    const maxX = Math.max(0, containerRect.width - elW);
    const maxY = Math.max(0, Math.max(containerRef.current.scrollHeight, containerRect.height) - elH);

    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    if (el) el.style.transform = `translate3d(${Math.round(constrainedX)}px, ${Math.round(constrainedY)}px, 0)`;
    setDragState(ds => ds.isDragging ? { ...ds, lastPos: { x: constrainedX, y: constrainedY } } : ds);
  }, [dragState]);

  const handleMouseUp = useCallback(() => {
    if (!dragState.isDragging || !dragState.draggedId) return;

    const finalPos = dragState.lastPos;
    if (finalPos) {
      setWidgets(prev => prev.map(w => w.id === dragState.draggedId ? { ...w, position: { x: Math.round(finalPos.x), y: Math.round(finalPos.y) } } : w));
    } else {
      // fallback: read from DOM
      const el = dragState.draggedId ? cardRefs.current[dragState.draggedId] : null;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (el && containerRect) {
        const rect = el.getBoundingClientRect();
        const x = Math.round(rect.left - containerRect.left);
        const y = Math.round(rect.top - containerRect.top);
        setWidgets(prev => prev.map(w => w.id === dragState.draggedId ? { ...w, position: { x, y } } : w));
      }
    }

    setDragState({ isDragging: false, draggedId: null, offset: { x: 0, y: 0 }, lastPos: undefined });
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [dragState]);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  const resetLayout = () => {
    setWidgets(initialWidgets);
    requestAnimationFrame(() => {
      initialWidgets.forEach(w => {
        const el = cardRefs.current[w.id];
        if (el) el.style.transform = `translate3d(${w.position.x}px, ${w.position.y}px, 0)`;
      });
    });
  };

  const getSizeClasses = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 'w-72 min-h-48';
      case 'medium': return 'w-[560px] min-h-56'; // slightly wider for music UI
      case 'large': return 'w-96 min-h-80';
      default: return 'w-80 min-h-64';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* subtle bg */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="relative">
        {/* Header moved down with top-20 so nav won't cover it */}
        <div className={`sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="container mx-auto px-6 py-8"> {/* increased vertical padding */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light tracking-tight">
                  About <span className="font-medium">Jed</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2">Drag widgets around • Explore freely</p>
              </div>
              <button onClick={resetLayout} className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors font-medium">
                Reset layout
              </button>
            </div>
          </div>
        </div>

        {/* draggable area */}
        <div ref={containerRef} className="relative px-8 pb-24" style={{ minHeight: '1200px', paddingTop: '28px' }}> {/* slightly more padding */}
          {widgets.map(widget => (
            <Card
              key={widget.id}
              ref={(el: HTMLDivElement | null) => { cardRefs.current[widget.id] = el; }}
              className={`absolute cursor-grab active:cursor-grabbing transition-all duration-200 ease-out border border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card ${getSizeClasses(widget.size)} ${
                dragState.draggedId === widget.id ? 'shadow-2xl shadow-primary/10 border-primary/30 scale-[1.02] z-50' : 'shadow-sm hover:shadow-md hover:border-border hover:-translate-y-1'
              }`}
              style={{ left: 0, top: 0, zIndex: widget.zIndex, transform: `translate3d(${widget.position.x}px, ${widget.position.y}px, 0)` }}
              onMouseDown={(e) => handleMouseDown(e, widget.id)}
            >
              <CardHeader className={`pb-4 border-b border-border/40 ${dragState.draggedId === widget.id ? 'bg-primary/5' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {widget.icon}
                    <CardTitle className="text-base font-medium tracking-tight">{widget.title}</CardTitle>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-colors ${dragState.draggedId === widget.id ? 'bg-primary' : 'bg-muted-foreground/30'}`}></div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div onClick={(e) => e.stopPropagation()}>{widget.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-64 h-64 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>
    </div>
  );
};

export default About;