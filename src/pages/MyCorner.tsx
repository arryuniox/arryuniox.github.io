import React, { useEffect, useState } from 'react';
import MyCornerCarousel from '@/components/MyCorner/Carousel';

type Slide = {
  id: string;
  title: string;
  html: string;
  filename: string;
};

const MyCorner: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically import all .html files in src/content/mycorner as raw text.
    // Place your content files in src/content/mycorner/*.html
    const modules = import.meta.glob('/src/content/mycorner/*.html?raw');

    (async () => {
      const entries = Object.entries(modules) as [string, () => Promise<string>][];
      const loaded: Slide[] = [];
      for (const [path, loader] of entries) {
        try {
          const raw = await loader();
          // extract filename and a sensible title (first <h1> or filename)
          const m = path.match(/\/([^\/]+)\.html(\?raw)?$/);
          const filename = m ? m[1] : path;
          const titleMatch = raw.match(/<h1[^>]*>(.*?)<\/h1>/i);
          const title = titleMatch ? titleMatch[1] : filename.replace(/[-_0-9]+/g, ' ').trim();
          loaded.push({
            id: filename,
            filename,
            title,
            html: raw,
          });
        } catch (e) {
          console.error('Failed to load slide', path, e);
        }
      }
      // sort by filename so slide order is filesystem order (you can prefix with numbers)
      loaded.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
      setSlides(loaded);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading My Corner…</div>;
  if (slides.length === 0) return <div className="min-h-screen flex items-center justify-center">No slides found. Add HTML files to src/content/mycorner/</div>;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">My Corner</h1>
          <p className="text-muted-foreground mt-2">Writing, art, photos, videos — add files to src/content/mycorner and they will appear here.</p>
        </header>

        <MyCornerCarousel slides={slides} />
      </div>
    </div>
  );
};

export default MyCorner;