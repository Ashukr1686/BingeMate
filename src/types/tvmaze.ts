export interface TVShow {
  id: number;
  name: string;
  summary: string;
  image?: {
    medium: string;
    original: string;
  };
  status: string;
  averageRuntime?: number;
  premiered?: string;
  rating?: {
    average?: number;
  };
  genres: string[];
  network?: {
    name: string;
  };
  _embedded?: {
    episodes: TVEpisode[];
  };
}

export interface TVEpisode {
  id: number;
  name: string;
  season: number;
  number: number;
  runtime?: number;
  airdate: string;
}

export interface SearchResult {
  score: number;
  show: TVShow;
}
