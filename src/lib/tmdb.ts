
const TMDB_API_KEY = "3c45bc32668873a235555c43bcdc1761";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface TMDBShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
}

/**
 * Fetches the top weekly trending TV shows.
 */
export async function getTrendingShows(count: number = 50): Promise<TMDBShow[]> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB API Key missing.");
    return [];
  }

  const pagesNeeded = Math.ceil(count / 20) + 1;
  const uniqueShows = new Map<number, TMDBShow>();

  try {
    for (let i = 1; i <= pagesNeeded; i++) {
      const res = await fetch(
        `${BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&language=en-US&page=${i}`
      );
      if (!res.ok) break;
      const data = await res.json();
      if (data.results) {
        for (const show of data.results) {
          if (!uniqueShows.has(show.id)) {
            uniqueShows.set(show.id, show);
          }
          if (uniqueShows.size >= count) break;
        }
      }
      if (uniqueShows.size >= count) break;
    }
  } catch (error) {
    console.error("Failed to fetch trending shows from TMDB", error);
  }

  return Array.from(uniqueShows.values());
}

/**
 * Fetches popular TV shows (legacy/alternate).
 */
export async function getPopularShows(count: number = 50): Promise<TMDBShow[]> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB API Key missing.");
    return [];
  }

  const pagesNeeded = Math.ceil(count / 20) + 1;
  const uniqueShows = new Map<number, TMDBShow>();

  try {
    for (let i = 1; i <= pagesNeeded; i++) {
      const res = await fetch(
        `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${i}`
      );
      if (!res.ok) break;
      const data = await res.json();
      if (data.results) {
        for (const show of data.results) {
          if (!uniqueShows.has(show.id)) {
            uniqueShows.set(show.id, show);
          }
          if (uniqueShows.size >= count) break;
        }
      }
      if (uniqueShows.size >= count) break;
    }
  } catch (error) {
    console.error("Failed to fetch popular shows from TMDB", error);
  }

  return Array.from(uniqueShows.values());
}

export function getTMDBImageUrl(path: string, size: "w500" | "original" = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
