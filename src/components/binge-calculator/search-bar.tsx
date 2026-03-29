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
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
          )}
        </div>
        <Input
          type="text"
          placeholder="Search for your next obsession..."
          className="pl-14 pr-14 h-18 py-8 bg-white/5 border-white/10 text-xl md:text-2xl rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-2xl backdrop-blur-md placeholder:text-muted-foreground/30 font-medium"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-5 inset-y-0 flex items-center gap-3">
          {query && (
            <button 
              onClick={() => { setQuery(""); setResults([]); }}
              className="p-1 hover:bg-white/10 rounded-full text-muted-foreground hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <div className="opacity-30 group-focus-within:opacity-100 transition-opacity">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      {isOpen && (
        <Card className="absolute mt-4 w-full max-h-[520px] overflow-hidden glass-panel rounded-3xl border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 overflow-y-auto max-h-[510px] scrollbar-thin scrollbar-thumb-white/10">
            {results.length > 0 ? (
              <div className="space-y-1">
                <div className="px-4 py-2 text-[10px] uppercase font-black tracking-widest text-muted-foreground/50">
                  Search Results ({results.length})
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.show.id}
                    onClick={() => handleSelect(result.show.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-5 p-3 rounded-2xl transition-all group border border-transparent",
                      selectedIndex === index ? "bg-primary text-white" : "hover:bg-white/5"
                    )}
                  >
                    <div className="relative h-20 w-14 flex-shrink-0 bg-muted rounded-xl overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
                      {result.show.image?.medium ? (
                        <Image
                          src={result.show.image.medium}
                          alt={result.show.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-card">
                          <Tv className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className={cn(
                        "font-black text-lg truncate",
                        selectedIndex === index ? "text-white" : "text-white group-hover:text-primary"
                      )}>
                        {result.show.name}
                      </h4>
                      <div className={cn(
                        "flex items-center gap-2 text-sm mt-1 font-bold",
                        selectedIndex === index ? "text-white/70" : "text-muted-foreground"
                      )}>
                        <span>{result.show.premiered?.split("-")[0] || "N/A"}</span>
                        <span>•</span>
                        <span className="truncate">{result.show.network?.name || result.show.status}</span>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        {result.show.genres.slice(0, 2).map(g => (
                          <span key={g} className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter",
                            selectedIndex === index ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                          )}>
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {result.show.rating?.average && (
                        <div className={cn(
                          "flex items-center gap-1 font-black text-sm px-2 py-1 rounded-lg",
                          selectedIndex === index ? "bg-white/20" : "text-primary bg-primary/10"
                        )}>
                          <Star className={cn("h-3 w-3", selectedIndex === index ? "fill-white" : "fill-primary")} />
                          {result.show.rating.average}
                        </div>
                      )}
                      <ChevronRight className={cn(
                        "h-5 w-5 transition-transform",
                        selectedIndex === index ? "translate-x-1 opacity-100" : "opacity-0"
                      )} />
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length > 2 && !isLoading && (
              <div className="p-12 text-center space-y-4">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-white/10">
                  <Search className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">No shows found</h3>
                  <p className="text-muted-foreground text-sm font-medium">Try adjusting your keywords or checking the spelling.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
