
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
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

export async function getPopularShows(count: number = 50): Promise<TMDBShow[]> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB API Key missing. Please set NEXT_PUBLIC_TMDB_API_KEY.");
    return [];
  }

  const pagesNeeded = Math.ceil(count / 20);
  let allShows: TMDBShow[] = [];

  try {
    for (let i = 1; i <= pagesNeeded; i++) {
      const res = await fetch(
        `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${i}`
      );
      if (!res.ok) break;
      const data = await res.json();
      if (data.results) {
        allShows = [...allShows, ...data.results];
      }
    }
  } catch (error) {
    console.error("Failed to fetch popular shows from TMDB", error);
  }

  return allShows.slice(0, count);
}

export function getTMDBImageUrl(path: string, size: "w500" | "original" = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
