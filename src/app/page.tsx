"use client";

import { SearchBar } from "@/components/binge-calculator/search-bar";
import { useRouter } from "next/navigation";
import { Tv, Flame, Info, Clapperboard, MonitorPlay } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleShowSelect = (id: number) => {
    router.push(`/show/${id}`);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <header className="container mx-auto px-6 py-8 relative z-50 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/40 group-hover:rotate-6 transition-all duration-500">
            <MonitorPlay className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white uppercase italic">
            Binge<span className="text-primary">Mate</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
            <Flame className="h-4 w-4" /> Trending
          </button>
          <button className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
            <Info className="h-4 w-4" /> How it Works
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 relative z-10 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-16 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-primary uppercase mb-4">
            <Clapperboard className="h-3 w-3" /> The Ultimate TV Companion
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] lg:leading-[0.85]">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Binge Session
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Plan your next epic marathon. Calculate exactly how long it takes to conquer your favorite series.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          <SearchBar onSelect={handleShowSelect} />
        </div>

        {/* Quick Stats / Social Proof */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div>
            <div className="text-3xl font-black text-white">70k+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Shows Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">2M+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Episodes Indexed</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">24/7</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Real-time Updates</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">100%</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Free to Use</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-10 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} BingeMate. Data by TVMaze.</p>
          <div className="flex gap-8">
            <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </main>
  );
}