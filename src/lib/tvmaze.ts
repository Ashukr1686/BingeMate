import { SearchResult, TVShow } from "@/types/tvmaze";

const BASE_URL = "https://api.tvmaze.com";

export async function searchShows(query: string): Promise<SearchResult[]> {
  if (!query) return [];
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!response.ok) return [];
  return response.json();
}

export async function getShowDetails(id: number): Promise<TVShow | null> {
  const response = await fetch(`${BASE_URL}/shows/${id}?embed=episodes`);
  if (!response.ok) return null;
  return response.json();
}
