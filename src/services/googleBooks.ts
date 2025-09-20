export type GBBook = {
  id: string;
  title: string;
  authors?: string[];
  publishedDate?: string;
  averageRating?: number;
  ratingsCount?: number;
  thumbnail?: string;
  infoLink?: string;
};

const cache = new Map<string, GBBook | null>();

const API_KEY = (import.meta as any).env?.VITE_GOOGLE_BOOKS_API_KEY || '';

function toHttps(url?: string) {
  if (!url) return undefined;
  return url.replace(/^http:\/\//i, 'https://');
}

/**
 * Fetch a single book by title from Google Books (returns first match).
 * Uses simple in-memory cache to reduce duplicate requests.
 */
export async function fetchBookByTitle(title: string): Promise<GBBook | null> {
  const key = `title:${title}`;
  if (cache.has(key)) return cache.get(key) || null;

  try {
    const q = encodeURIComponent(`intitle:${title}`);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1${API_KEY ? `&key=${API_KEY}` : ''}`;

    console.debug('[googleBooks] requesting', { title, urlContainsKey: !!API_KEY });

    const res = await fetch(url);
    const text = await res.text().catch(() => '');
    let body: any = text;
    try { body = text ? JSON.parse(text) : text; } catch (e) { /* raw text */ }

    console.debug('[googleBooks] fetch response', { title, status: res.status, body });

    if (!res.ok) {
      if (res.status === 401) {
        console.error('[googleBooks] 401 Unauthorized — check VITE_GOOGLE_BOOKS_API_KEY, API enabled, and referrer restrictions.');
      }
      cache.set(key, null);
      return null;
    }

    if (!body?.items || body.items.length === 0) {
      cache.set(key, null);
      return null;
    }

    const item = body.items[0];
    const v = item.volumeInfo || {};

    const book: GBBook = {
      id: item.id || title,
      title: v.title || title,
      authors: v.authors,
      publishedDate: v.publishedDate,
      averageRating: typeof v.averageRating === 'number' ? v.averageRating : undefined,
      ratingsCount: typeof v.ratingsCount === 'number' ? v.ratingsCount : undefined,
      thumbnail: toHttps(v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail),
      infoLink: toHttps(v.infoLink),
    };

    cache.set(key, book);
    return book;
  } catch (e) {
    console.error('fetchBookByTitle error', e);
    cache.set(key, null);
    return null;
  }
}

/**
 * Fetch multiple titles. This runs requests sequentially to be gentle with rate limits.
 */
export async function fetchBooksByTitles(titles: string[]): Promise<GBBook[]> {
  const out: GBBook[] = [];
  for (const t of titles) {
    const b = await fetchBookByTitle(t);
    out.push(b ?? { id: t, title: t });
    // small delay to reduce burst rate (optional)
    await new Promise((r) => setTimeout(r, 120));
  }
  return out;
}