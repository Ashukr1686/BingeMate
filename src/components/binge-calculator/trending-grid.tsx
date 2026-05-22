"use client";

import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import { TMDBShow, getTMDBImageUrl } from "@/lib/tmdb";

interface TrendingGridProps {
  initialShows: TMDBShow[];
}

export function TrendingGrid({ initialShows }: TrendingGridProps) {
  if (!initialShows || initialShows.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-[3rem] text-center space-y-4">
        <Info className="h-12 w-12 text-primary/50 mx-auto" />
        <h3 className="text-2xl font-black text-white">No Trending Shows</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't load the trending list right now. Try searching for your favorite show instead.
        </p>
      </div>
    );
  }

  // Helper to create a URL-friendly slug
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {initialShows.map((show, index) => (
        <Link 
          key={`${show.id}-${index}`}
          href={`/show/${slugify(show.name)}`}
          className="group relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 binge-card-hover cursor-pointer block"
          aria-label={`View details for ${show.name}`}
        >
          <Image 
            src={getTMDBImageUrl(show.poster_path) || "https://picsum.photos/seed/placeholder/400/600"} 
            alt={`${show.name} poster`} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
            sizes="(max-width: 768px) 50vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
              {show.first_air_date?.split("-")[0]}
            </span>
            <h3 className="text-lg font-black text-white leading-tight truncate">{show.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
