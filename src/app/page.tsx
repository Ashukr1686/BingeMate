
"use client";

import { SearchBar } from "@/components/binge-calculator/search-bar";
import { useRouter } from "next/navigation";
import { Tv, Flame, Info } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleShowSelect = (id: number) => {
    router.push(`/show/${id}`);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header/Nav */}
      <header className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
            <Tv className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            BINGE<span className="text-primary">MATE</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer flex items-center gap-2">
            <Flame className="h-4 w-4" /> Trending
          </span>
          <span className="text-sm font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer flex items-center gap-2">
            <Info className="h-4 w-4" /> About
          </span>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="container mx-auto px-4 relative z-10 pt-32 pb-48">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12 animate-in fade-in zoom-in-95 duration-700">
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-tight">
            Ready to <span className="text-primary">Binge?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan your next ultimate viewing session. Search for any TV series and calculate exactly how long it takes to watch it all.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <SearchBar onSelect={handleShowSelect} />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} BingeMate • Powered by TVMaze API</p>
      </footer>
    </main>
  );
}
