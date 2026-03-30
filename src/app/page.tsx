
"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/binge-calculator/search-bar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tv, Flame, MonitorPlay, Sparkles, Search, Clock, Calendar, Info, Loader2 } from "lucide-react";
import Image from "next/image";
import { getTrendingShows, getTMDBImageUrl, TMDBShow } from "@/lib/tmdb";

export default function Home() {
  const router = useRouter();
  const [trendingShows, setTrendingShows] = useState<TMDBShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      const shows = await getTrendingShows(50);
      setTrendingShows(shows);
      setIsLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Playful Background Decor */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Navigation */}
      <header className="container mx-auto px-6 py-10 relative z-50 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/40 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500">
            <MonitorPlay className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white uppercase italic">
            Binge<span className="text-primary">Mate</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#trending" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
            <Flame className="h-4 w-4 group-hover:text-orange-500 transition-colors" /> Trending
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center container mx-auto px-6 relative z-10 py-12">
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-16 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black tracking-widest text-primary uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Start Your Next Adventure
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] lg:leading-[0.8]">
            Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400">
              Great Binge
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            The ultimate <strong>Binge watch planner</strong>. Calculate <strong>total episodes runtime</strong> instantly and map out your marathon.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <SearchBar />
        </div>

        {/* How It Works Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto relative z-10">
          <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 hover:scale-105 transition-transform duration-500">
            <div className="bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/20">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-black text-white">1. Find your show</h3>
            <p className="text-muted-foreground font-medium">Search using our <strong>Binge watch calculator</strong> to find any series.</p>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 hover:scale-105 transition-transform duration-500">
            <div className="bg-indigo-500/20 w-14 h-14 rounded-2xl flex items-center justify-center border border-indigo-500/20">
              <Clock className="h-7 w-7 text-indigo-400" />
            </div>
            <h3 className="text-xl font-black text-white">2. Get the time</h3>
            <p className="text-muted-foreground font-medium">See the <strong>Total episodes runtime</strong> for a non-stop marathon.</p>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 hover:scale-105 transition-transform duration-500">
            <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center border border-cyan-500/20">
              <Calendar className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-black text-white">3. Plan your schedule</h3>
            <p className="text-muted-foreground font-medium">Use the <strong>Binge watch schedule tool</strong> to find your finish date.</p>
          </div>
        </div>

        {/* Trending Shows Grid (TMDB) */}
        <div id="trending" className="mt-40 w-full max-w-6xl mx-auto space-y-12 mb-32">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tight">Trending This Week</h2>
              <p className="text-muted-foreground font-semibold">50 hottest series people are binging right now</p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-[2rem] bg-white/5 animate-pulse flex items-center justify-center">
                   <Loader2 className="h-8 w-8 text-primary/20 animate-spin" />
                </div>
              ))}
            </div>
          ) : trendingShows.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {trendingShows.map((show, index) => (
                <div 
                  key={`${show.id}-${index}`}
                  className="group relative aspect-[2/3] rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 binge-card-hover cursor-pointer"
                  onClick={() => {
                    // TMDB IDs differ from TVMaze IDs used in the search/details flow.
                    // Guide users to use search for details.
                  }}
                >
                  <Image 
                    src={getTMDBImageUrl(show.poster_path) || "https://picsum.photos/seed/placeholder/400/600"} 
                    alt={show.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                      {show.first_air_date?.split("-")[0]}
                    </span>
                    <h4 className="text-lg font-black text-white leading-tight truncate">{show.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-[3rem] text-center space-y-4">
              <Info className="h-12 w-12 text-primary/50 mx-auto" />
              <h3 className="text-2xl font-black text-white">No Trending Shows</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't load the trending list right now. Try searching for your favorite show instead.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 relative z-10 bg-black/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground font-bold">
          <p>© {new Date().getFullYear()} BingeMate. Data via TMDB & TVMaze.</p>
          <div className="flex gap-10">
            <span className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Terms</span>
            <span className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Privacy</span>
            <span className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Support</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
