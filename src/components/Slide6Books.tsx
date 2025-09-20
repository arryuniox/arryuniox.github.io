import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import type { GBBook } from '@/services/googleBooks';
import { fetchBookByTitle } from '@/services/googleBooks';

console.log('[Slide6Books] mounted, has Google Books key?', !!(import.meta as any).env?.VITE_GOOGLE_BOOKS_API_KEY);

const FAVORITE_TITLES = [
  'The Metamorphosis',
  'Crime and Punishment',
  'Snow Country',
  'White Nights',
  'Tao Te Ching',
  'The Narrow Road to the Interior',
  'Tuesdays with Morrie',
  'No Longer Human',
  'The Trial by Kafka'
];

const StarRow: React.FC<{ rating?: number }> = ({ rating }) => {
  const r = Math.round(rating || 0);
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < r ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};

export default function BookCarousel() {
  const [books, setBooks] = useState<GBBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const speed = 50; // px per second

  useEffect(() => {
    let mounted = true;
    (async () => {
      const results: GBBook[] = [];
      for (const t of FAVORITE_TITLES) {
        const b = await fetchBookByTitle(t);
        if (b) results.push(b);
        else results.push({
          id: t,
          title: t,
        } as GBBook);
      }
      if (!mounted) return;
      setBooks(results);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  // auto-scroll loop via requestAnimationFrame; duplicate content for seamless loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el || books.length === 0) return;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        offsetRef.current += speed * dt;
        // when offset exceeds width of one copy, wrap
        const width = el.scrollWidth / 2 || 1;
        if (offsetRef.current >= width) offsetRef.current -= width;
        el.style.transform = `translateX(-${Math.round(offsetRef.current)}px)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [books, paused]);

  const togglePause = () => setPaused(p => !p);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  // render duplicated list for smooth loop
  const displayList = [...books, ...books];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">My Favorite Books</h3>
      </div>

      <div
        onClick={(e) => { e.stopPropagation(); togglePause(); }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden relative"
        style={{ touchAction: 'pan-y' }}
      >
        <div
          ref={containerRef}
          className="flex gap-4 will-change-transform"
          aria-hidden={false}
          role="list"
        >
          {displayList.map((b, i) => {
            const href = b.infoLink || `https://www.google.com/search?q=${encodeURIComponent(b.title)}`;

            return (
              <a
                key={`${b.id}-${i}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // prevent parent togglePause
                aria-label={`Open ${b.title} info`}
                className="block"
              >
                <motion.div
                  className="min-w-[220px] max-w-[220px] bg-card rounded-lg p-3 shadow-lg flex-shrink-0 cursor-pointer hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ scale: 1.03 }}
                  role="listitem"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-3">
                      <img src={b.thumbnail || '/placeholder.svg'} alt={`${b.title} cover`} className="w-14 h-20 object-cover rounded-sm flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm line-clamp-2">{b.title}</div>
                        <div className="text-xs text-muted-foreground">{b.authors?.join(', ')}</div>
                        <div className="text-xs text-muted-foreground mt-1">{b.publishedDate}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Open details</span>
                      <ExternalLink className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </motion.div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
