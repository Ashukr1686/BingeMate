"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Tv, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchShows } from "@/lib/tvmaze";
import { SearchResult } from "@/types/tvmaze";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSelect?: (id: number) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setIsLoading(true);
        const searchResults = await searchShows(query);
        setResults(searchResults);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 400);

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
          className="pl-14 h-18 py-8 bg-white/5 border-white/10 text-xl md:text-2xl rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-2xl backdrop-blur-md placeholder:text-muted-foreground/50 font-medium"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
        />
        <div className="absolute right-5 inset-y-0 flex items-center pointer-events-none opacity-50 group-focus-within:opacity-100 transition-opacity">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute mt-4 w-full max-h-[480px] overflow-y-auto glass-panel rounded-2xl overflow-hidden scrollbar-thin scrollbar-thumb-white/10 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 space-y-2">
            {results.map((result) => (
              <button
                key={result.show.id}
                onClick={() => handleSelect(result.show.id)}
                className="w-full flex items-center gap-5 p-4 hover:bg-white/10 rounded-xl transition-all group border border-transparent hover:border-white/10"
              >
                <div className="relative h-20 w-14 flex-shrink-0 bg-muted rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
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
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-white truncate group-hover:text-primary transition-colors">
                    {result.show.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 font-medium">
                    <span>{result.show.premiered?.split("-")[0] || "N/A"}</span>
                    <span>•</span>
                    <span className="truncate">{result.show.network?.name || result.show.status}</span>
                  </div>
                </div>
                {result.show.rating?.average && (
                  <div className="flex items-center gap-1.5 bg-primary/20 text-primary px-3 py-1.5 rounded-lg font-black text-sm">
                    <span className="text-xs">★</span>
                    {result.show.rating.average}
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}