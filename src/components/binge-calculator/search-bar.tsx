"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Tv, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchShows } from "@/lib/tvmaze";
import { SearchResult } from "@/types/tvmaze";
import Image from "next/image";

interface SearchBarProps {
  onSelect: (id: number) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    }, 500);

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

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          )}
        </div>
        <Input
          type="text"
          placeholder="Search for a TV series..."
          className="pl-10 h-14 bg-card/50 border-white/10 text-lg rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-lg backdrop-blur-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute mt-2 w-full max-h-[400px] overflow-y-auto bg-card border-white/10 shadow-2xl rounded-xl scrollbar-thin scrollbar-thumb-white/10">
          <div className="p-2 space-y-1">
            {results.map((result) => (
              <button
                key={result.show.id}
                onClick={() => {
                  onSelect(result.show.id);
                  setIsOpen(false);
                  setQuery("");
                }}
                className="w-full flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors text-left group"
              >
                <div className="relative h-14 w-10 flex-shrink-0 bg-muted rounded overflow-hidden">
                  {result.show.image?.medium ? (
                    <Image
                      src={result.show.image.medium}
                      alt={result.show.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tv className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {result.show.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {result.show.premiered?.split("-")[0] || "N/A"} • {result.show.network?.name || result.show.status}
                  </p>
                </div>
                {result.show.rating?.average && (
                  <div className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded">
                    ★ {result.show.rating.average}
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
