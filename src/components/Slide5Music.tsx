import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

type Song = {
  title: string;
  artist?: string;
  url: string;
  id: string;
};

const SONGS: Song[] = [
  { title: '晴天', artist: 'Jay Chou', url: 'https://open.spotify.com/track/5pIcwtJYNJx93l420oR2Vm?si=e7aab2fc21fb413e', id: '5pIcwtJYNJx93l420oR2Vm' },
  { title: 'Let Down', artist: 'Radiohead', url: 'https://open.spotify.com/track/2fuYa3Lx06QQJAm0MjztKr?si=a51bb16160454ff9', id: '2fuYa3Lx06QQJAm0MjztKr' },
  { title: '大鱼', artist: 'Zhou Shen', url: 'https://open.spotify.com/track/0FfdtQrD9kT42o6Anv4uDn?si=438c32f25b7b4e93', id: '0FfdtQrD9kT42o6Anv4uDn' },
  { title: '珊瑚海', artist: 'Jay Chou', url: 'https://open.spotify.com/track/3Qj9Fy8BPbWmICTiNkuqB7?si=47797c45771f4cda', id: '3Qj9Fy8BPbWmICTiNkuqB7' },
  { title: 'Kawaki no Ameku', artist: 'Minami', url: 'https://open.spotify.com/track/3kUWZiVYJ4YQOl0u7Y1Og8?si=12d3674778d44fa6', id: '3kUWZiVYJ4YQOl0u7Y1Og8' },
  { title: 'I Really Want to Stay At Your House', artist: '', url: 'https://open.spotify.com/track/29Hph1StQfDYwqZEhHCS7n?si=700921c75d9045af', id: '29Hph1StQfDYwqZEhHCS7n' },
  { title: 'Hello, Sekai', artist: 'DECO*27', url: 'https://open.spotify.com/track/39nE97cbKiKMJksFexelsg?si=db401b135e8f40f9', id: '39nE97cbKiKMJksFexelsg' },
  { title: 'Kilby Girl', artist: 'The Backseat Lovers', url: 'https://open.spotify.com/track/1170VohRSx6GwE6QDCHPPH?si=b0af23e66e274810', id: '1170VohRSx6GwE6QDCHPPH' },
];

export default function Slide5MusicCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const current = SONGS[index];

  useEffect(() => {
    // center the active card smoothly
    const el = cardRefs.current[index];
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [index]);

  useEffect(() => {
    // keyboard navigation
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + SONGS.length) % SONGS.length);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % SONGS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goPrev = () => setIndex(i => (i - 1 + SONGS.length) % SONGS.length);
  const goNext = () => setIndex(i => (i + 1) % SONGS.length);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center space-x-3 mb-4">
          <Music className="w-7 h-7 text-primary" />
          <h2 className="text-2l font-bold">My Favorite Songs</h2>
        </div>

        {/* Spotify embed for selected track */}
        <div className="w-full mb-6 rounded-lg overflow-hidden bg-card border border-border/60">
          <div className="w-full h-28 md:h-36 lg:h-44 bg-black/5 flex items-center justify-center">
            <iframe
              key={current.id} // force replace when index changes
              title={`spotify-embed-${current.id}`}
              src={`https://open.spotify.com/embed/track/${current.id}`}
              width="100%"
              height="120"
              frameBorder="0"
              allow="autoplay; encrypted-media; clipboard-write"
            />
          </div>

          <div className="p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{current.title}</div>
              <div className="text-xs text-muted-foreground">{current.artist}</div>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={goPrev} aria-label="Previous" className="p-2 rounded bg-muted hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={goNext} aria-label="Next" className="p-2 rounded bg-muted hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal carousel of cards (click to select / open) */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar py-3 px-3 snap-x snap-mandatory scroll-smooth"
            role="list"
            aria-label="Song carousel"
          >
            {SONGS.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`snap-center min-w-[240px] md:min-w-[260px] max-w-[280px] bg-card rounded-lg p-4 shadow-md flex-shrink-0 cursor-pointer transition-transform ${i === index ? 'scale-105 ring-2 ring-primary/40' : ''}`}
                role="listitem"
                onClick={() => setIndex(i)}
                onDoubleClick={() => window.open(s.url, '_blank', 'noopener noreferrer')}
                title="Click to select · Double-click to open on Spotify"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="font-semibold text-sm truncate">{s.title}</div>
                    <div className="text-xs text-muted-foreground truncate mt-1">{s.artist}</div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Open on Spotify</div>
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-4 text-center">Use Prev/Next or arrow keys to navigate. Double-click a card to open on Spotify.</div>
      </div>
    </div>
  );
}
