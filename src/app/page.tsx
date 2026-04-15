
import { SearchBar } from "@/components/binge-calculator/search-bar";
import Link from "next/link";
import { MonitorPlay, Flame, Search, Clock, Calendar } from "lucide-react";
import { getTrendingShows } from "@/lib/tmdb";
import { TrendingGrid } from "@/components/binge-calculator/trending-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'theBinge | How Long to Binge a Show? Free Watch Time Calculator',
  description: 'Calculate exactly how long it takes to binge your favorite TV shows. Plan your marathon with our total episodes runtime calculator.',
  openGraph: {
    title: 'theBinge | How Long to Binge a Show? Free Watch Time Calculator',
    description: 'Calculate exactly how long it takes to binge your favorite TV shows. Plan your marathon with our total episodes runtime calculator.',
    images: [{ url: 'https://thebinge.top/thumbnail.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://thebinge.top/thumbnail.png'],
  },
};

export default async function Home() {
  // Fetch trending shows on the server for SEO
  const trendingShows = await getTrendingShows(50);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Playful Background Decor */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" aria-hidden="true" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      
      {/* Navigation */}
      <header className="container mx-auto px-6 py-10 relative z-[60] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="theBinge Home">
          <div className="bg-gradient-to-tr from-primary to-fuchsia-600 p-3 rounded-2xl shadow-xl shadow-primary/20 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500">
            <MonitorPlay className="h-7 w-7 text-white" />
          </div>
          <span className="text-4xl font-logo tracking-wider text-white uppercase drop-shadow-[0_2px_15px_rgba(139,92,246,0.4)]">
            the<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Binge</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#trending" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
            <Flame className="h-4 w-4 group-hover:text-primary transition-colors" /> Trending
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center container mx-auto px-6 relative z-50 py-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8 mb-16 animate-in fade-in slide-in-from-top-12 duration-1000">
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] lg:leading-[0.8]">
            How long to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400">
              binge?
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            With our <strong>binge watch calculator</strong> find out how long it takes to <strong>binge a show</strong>.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 relative z-50">
          <SearchBar />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-20 py-12 relative z-10" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title" className="sr-only">How theBinge Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-6">
          <article className="glass-panel p-8 rounded-[2.5rem] space-y-4 hover:scale-105 transition-transform duration-500">
            <div className="bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/20">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-black text-white">1. Find your show</h3>
            <p className="text-muted-foreground font-medium">Search using our <strong>Binge watch calculator</strong> to find any series.</p>
          </article>
          <article className="glass-panel p-8 rounded-[2.5rem] space-y-4 hover:scale-105 transition-transform duration-500">
            <div className="bg-violet-500/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-violet-500/20">
              <Clock className="h-7 w-7 text-violet-400" />
            </div>
            <h3 className="text-xl font-black text-white">2. Get the time</h3>
            <p className="text-muted-foreground font-medium">See the <strong>Total episodes runtime</strong> for a non-stop marathon.</p>
          </article>
          <article className="glass-panel p-8 rounded-[2.5rem] space-y-4 hover:scale-105 transition-transform duration-500">
            <div className="bg-fuchsia-500/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-fuchsia-500/20">
              <Calendar className="h-7 w-7 text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-black text-white">3. Plan your schedule</h3>
            <p className="text-muted-foreground font-medium">Use the <strong>Binge watch schedule tool</strong> to find your finish date.</p>
          </article>
        </div>
      </section>

      {/* Trending Shows Grid */}
      <section id="trending" className="mt-40 w-full max-w-6xl mx-auto space-y-12 mb-32 px-6 relative z-10" aria-labelledby="trending-title">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 id="trending-title" className="text-4xl font-black text-white tracking-tight">Trending This Week</h2>
            <p className="text-muted-foreground font-semibold">50 hottest series people are binging right now</p>
          </div>
        </div>
        
        <TrendingGrid initialShows={trendingShows} />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 relative z-10 bg-black/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground font-bold">
          <p>© {new Date().getFullYear()} theBinge. Data via TMDB & TVMaze.</p>
          <nav className="flex gap-10">
            <Link href="/terms" className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Terms</Link>
            <Link href="/privacy" className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Privacy</Link>
            <Link href="/support" className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Support</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
