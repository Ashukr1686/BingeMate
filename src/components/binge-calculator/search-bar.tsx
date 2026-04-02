"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Tv, Loader2, Sparkles, X, Star, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchShows } from "@/lib/tvmaze";
import { SearchResult } from "@/types/tvmaze";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSelect?: (id: number) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          const searchResults = await searchShows(query);
          setResults(searchResults);
          setIsOpen(true);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Search failed", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: number) => {
    if (onSelect) {
      onSelect(id);
    } else {
      router.push(`/show/${id}`);
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex].show.id);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full z-50" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 md:h-6 md:w-6 text-primary animate-spin" />
          ) : (
            <Search className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
          )}
        </div>
        <Input
          type="text"
          placeholder="What are we binging today?..."
          className="pl-12 md:pl-16 pr-12 md:pr-16 h-16 md:h-20 bg-white/5 border-white/10 text-lg md:text-2xl rounded-[1.5rem] md:rounded-[2rem] focus:ring-8 focus:ring-primary/10 focus:border-primary/50 transition-all shadow-2xl backdrop-blur-xl placeholder:text-muted-foreground/30 font-black tracking-tight"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-4 md:right-6 inset-y-0 flex items-center gap-2 md:gap-4">
          {query && (
            <button 
              onClick={() => { setQuery(""); setResults([]); }}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-xl md:rounded-2xl text-muted-foreground hover:text-white transition-all hover:rotate-90"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}
          <div className="hidden sm:block opacity-30 group-focus-within:opacity-100 transition-opacity animate-pulse">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      {isOpen && (
        <Card className="absolute mt-4 md:mt-6 w-full max-h-[480px] md:max-h-[560px] overflow-hidden glass-panel rounded-[1.5rem] md:rounded-[2.5rem] border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
          <div className="p-2 md:p-4 overflow-y-auto max-h-[460px] md:max-h-[540px] scrollbar-thin scrollbar-thumb-white/10">
            {results.length > 0 ? (
              <div className="space-y-1 md:space-y-2">
                <div className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] uppercase font-black tracking-[0.3em] text-primary/50 flex justify-between items-center">
                  <span>Results ({results.length})</span>
                  <span className="hidden sm:inline text-white/20">Use arrows to navigate</span>
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.show.id}
                    onClick={() => handleSelect(result.show.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 md:gap-6 p-2 md:p-4 rounded-[1rem] md:rounded-[1.5rem] transition-all group border border-transparent",
                      selectedIndex === index ? "bg-primary text-white scale-[1.01] md:scale-[1.02] shadow-xl shadow-primary/20" : "hover:bg-white/5"
                    )}
                  >
                    <div className="relative h-16 w-11 md:h-24 md:w-16 flex-shrink-0 bg-muted rounded-lg md:rounded-2xl overflow-hidden shadow-xl transition-transform group-hover:scale-105">
                      {result.show.image?.medium ? (
                        <Image
                          src={result.show.image.medium}
                          alt={result.show.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-card">
                          <Tv className="h-5 w-5 md:h-8 md:w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className={cn(
                        "font-black text-base md:text-xl tracking-tight line-clamp-1",
                        selectedIndex === index ? "text-white" : "text-white group-hover:text-primary"
                      )}>
                        {result.show.name}
                      </h4>
                      <div className={cn(
                        "flex items-center gap-2 md:gap-3 text-[10px] md:text-sm mt-0.5 md:mt-1.5 font-bold",
                        selectedIndex === index ? "text-white/70" : "text-muted-foreground"
                      )}>
                        <span className="bg-white/5 px-1.5 py-0.5 rounded-md md:rounded-lg flex-shrink-0">{result.show.premiered?.split("-")[0] || "N/A"}</span>
                        <span className="opacity-30 flex-shrink-0">•</span>
                        <span className="truncate">{result.show.network?.name || result.show.status}</span>
                      </div>
                      <div className="flex gap-1.5 md:gap-2 mt-2 md:mt-3 overflow-hidden">
                        {result.show.genres.slice(0, 2).map(g => (
                          <span key={g} className={cn(
                            "px-2 md:px-3 py-0.5 md:py-1 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                            selectedIndex === index ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                          )}>
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                      {result.show.rating?.average && (
                        <div className={cn(
                          "flex items-center gap-1 md:gap-1.5 font-black text-[10px] md:text-sm px-2 md:px-3 py-1 md:py-1.5 rounded-xl md:rounded-2xl",
                          selectedIndex === index ? "bg-white/20" : "text-primary bg-primary/10 border border-primary/20"
                        )}>
                          <Star className={cn("h-3 w-3 md:h-4 md:w-4", selectedIndex === index ? "fill-white" : "fill-primary")} />
                          {result.show.rating.average}
                        </div>
                      )}
                      <ChevronRight className={cn(
                        "h-4 w-4 md:h-6 md:w-6 transition-transform duration-300 hidden sm:block",
                        selectedIndex === index ? "translate-x-1 opacity-100" : "opacity-0"
                      )} />
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length > 2 && !isLoading && (
              <div className="p-8 md:p-16 text-center space-y-4 md:space-y-6">
                <div className="bg-white/5 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto border border-white/10 rotate-12">
                  <Search className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground/20" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">No shows found</h3>
                  <p className="text-sm md:text-base text-muted-foreground font-semibold">Try adjusting your keywords.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
