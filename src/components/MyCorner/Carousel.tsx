import React, { useEffect, useRef, useState } from 'react';

type Slide = {
  id: string;
  title: string;
  html: string;
  filename: string;
};

export default function MyCornerCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (orientation === 'horizontal') prev();
        else setOrientation('horizontal');
      } else if (e.key === 'ArrowRight') {
        if (orientation === 'horizontal') next();
        else setOrientation('horizontal');
      } else if (e.key === 'ArrowUp') {
        if (orientation === 'vertical') prev();
        else setOrientation('vertical');
      } else if (e.key === 'ArrowDown') {
        if (orientation === 'vertical') next();
        else setOrientation('vertical');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, orientation, slides.length]);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(i => (i - 1 + slides.length) % slides.length);
    // allow animation to finish
    setTimeout(() => setIsAnimating(false), 520);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(i => (i + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 520);
  };

  // shuffle / card-style transform for each slide (small rotation + scale)
  const slideStyle = (pos: number) => {
    const isActive = pos === index;
    return {
      transform: isActive ? 'translateZ(0) scale(1) rotate(0deg)' : 'translateZ(0) scale(0.95) rotate(-1.2deg)',
      transition: 'transform 520ms cubic-bezier(.2,.9,.2,1), opacity 420ms',
      opacity: isActive ? 1 : 0.85,
    } as React.CSSProperties;
  };

  // compute container transform based on orientation
  const containerTransform = () => {
    if (orientation === 'horizontal') {
      return { transform: `translateX(-${index * 100}%)`, transition: 'transform 520ms cubic-bezier(.2,.9,.2,1)' };
    } else {
      return { transform: `translateY(-${index * 100}%)`, transition: 'transform 520ms cubic-bezier(.2,.9,.2,1)' };
    }
  };

  return (
    <div className="relative bg-transparent">
      {/* controls + minimap */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={prev} aria-label="Previous" className="px-3 py-1 rounded bg-muted hover:bg-muted/80">Prev</button>
          <button onClick={next} aria-label="Next" className="px-3 py-1 rounded bg-muted hover:bg-muted/80">Next</button>
          <button onClick={() => setOrientation(o => o === 'horizontal' ? 'vertical' : 'horizontal')} className="px-3 py-1 rounded bg-muted hover:bg-muted/80">
            Orientation: {orientation}
          </button>
        </div>

        {/* minimap */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground mr-2">Jump to</div>
          <div className="flex items-center space-x-2 bg-card/60 px-2 py-1 rounded">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                title={s.title}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-muted/60'} focus:outline-none`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* viewport */}
      <div className="relative w-full h-[64vh] md:h-[72vh] overflow-hidden rounded-lg bg-card border border-border/30">
        {/* sliding track */}
        <div
          ref={containerRef}
          className={`absolute left-0 top-0 w-full h-full flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}`}
          style={containerTransform()}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              className="w-full h-full flex-shrink-0 p-6 flex items-center justify-center"
              style={{ boxSizing: 'border-box' }}
            >
              <div
                className="max-w-4xl w-full h-full bg-background/80 rounded-xl p-6 overflow-auto shadow-lg"
                style={slideStyle(i)}
              >
                {/* slide header */}
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-semibold">{s.title}</h2>
                  <div className="text-sm text-muted-foreground">{s.filename}</div>
                </div>

                {/* content area — use dangerouslySetInnerHTML for HTML slides */}
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* small footer / hint */}
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Use arrow keys to navigate. Toggle orientation to switch horizontal/vertical sliding. Click minimap to jump.
      </div>
    </div>
  );
}