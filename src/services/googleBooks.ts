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

// Prefer env var so Vite builds can inject the correct key for each environment.
// Falls back to the previous hardcoded value only to avoid breaking local dev.
const API_KEY = (import.meta as any)?.env?.VITE_GOOGLE_BOOKS_API_KEY || "AIzaSyBjXyFnr9ukuexJiHVo57x7kZcgSqcN6Ws";

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

    console.debug('[googleBooks] requesting', {
      title,
      hasApiKey: !!API_KEY,
      apiKeySource: (import.meta as any)?.env?.VITE_GOOGLE_BOOKS_API_KEY ? 'env' : 'fallback-hardcoded'
    });

    const res = await fetch(url);
    const text = await res.text().catch(() => '');
    let body: any = text;
    try { body = text ? JSON.parse(text) : text; } catch (e) { /* raw text */ }

    console.debug('[googleBooks] fetch response', { title, status: res.status, hasItems: !!body?.items?.length });

    if (!res.ok) {
      if (res.status === 401) {
        console.error('[googleBooks] 401 Unauthorized — check VITE_GOOGLE_BOOKS_API_KEY, API enabled, and referrer restrictions.');
      } else if (res.status === 429) {
        console.error('[googleBooks] 429 Rate Limited — add VITE_GOOGLE_BOOKS_API_KEY to increase rate limits.');
      } else {
        console.error(`[googleBooks] Request failed with status ${res.status}`);
      }
      cache.set(key, null);
      return null;
    }

    if (!body?.items || body.items.length === 0) {
      console.debug('[googleBooks] no items found for', title);
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
      infoLink: v.infoLink ? toHttps(v.infoLink) : undefined,
    };

    console.debug('[googleBooks] book fetched', { title, hasThumbnail: !!book.thumbnail, hasInfoLink: !!book.infoLink });
    cache.set(key, book);
    return book;
  } catch (e) {
    console.error('[googleBooks] fetchBookByTitle error', e);
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