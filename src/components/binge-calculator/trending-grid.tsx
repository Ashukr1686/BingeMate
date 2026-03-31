"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Info } from "lucide-react";
import { TMDBShow, getTMDBImageUrl } from "@/lib/tmdb";
import { searchShows } from "@/lib/tvmaze";

interface TrendingGridProps {
  initialShows: TMDBShow[];
}

export function TrendingGrid({ initialShows }: TrendingGridProps) {
  const router = useRouter();
  const [matchingId, setMatchingId] = useState<number | null>(null);

  const handleTrendingClick = async (show: TMDBShow) => {
    if (matchingId) return; // Prevent multiple clicks
    
    setMatchingId(show.id);
    try {
      // Try single search first for exact match
      const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(show.name)}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.id) {
          router.push(`/show/${data.id}`);
          return;
        }
      }
      
      // Fallback to regular search
      const results = await searchShows(show.name);
      if (results.length > 0) {
        // Find exact name match if possible
        const bestMatch = results.find(r => r.show.name.toLowerCase() === show.name.toLowerCase());
        router.push(`/show/${(bestMatch || results[0]).show.id}`);
      } else {
        alert("Sorry, we couldn't find the calculation data for this specific show yet.");
      }
    } catch (error) {
      console.error("Matching failed", error);
    } finally {
      setMatchingId(null);
    }
  };

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {initialShows.map((show, index) => (
        <article 
          key={`${show.id}-${index}`}
          className="group relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 binge-card-hover cursor-pointer"
          onClick={() => handleTrendingClick(show)}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleTrendingClick(show)}
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
          
          {matchingId === show.id && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
