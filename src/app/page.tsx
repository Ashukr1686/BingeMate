"use client";

import { SearchBar } from "@/components/binge-calculator/search-bar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tv, Flame, Clapperboard, MonitorPlay, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/40 group-hover:rotate-6 transition-all duration-500">
            <MonitorPlay className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white uppercase italic">
            Binge<span className="text-primary">Mate</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <button className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
            <Flame className="h-4 w-4" /> Trending
          </button>
          <a href="#faq" className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> FAQ
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 relative z-10 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-16 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-primary uppercase mb-4">
            <Clapperboard className="h-3 w-3" /> The Ultimate Series Binge Calculator
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] lg:leading-[0.85]">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Binge Session
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Plan your next epic marathon with the ultimate watch time calculator. Calculate binge time for TV series instantly.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          <SearchBar onSelect={handleShowSelect} />
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-32 w-full max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 mb-20">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">Binge Watch FAQ</h2>
            <p className="text-muted-foreground font-medium">Learn how to calculate binge time for any TV series</p>
          </div>

          <Accordion type="single" collapsible className="w-full glass-panel rounded-3xl p-6 border-white/5">
            <AccordionItem value="item-1" className="border-white/5">
              <AccordionTrigger className="text-white font-bold text-lg hover:text-primary transition-colors hover:no-underline">
                How long to binge a show with BingeMate?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We aggregate data for every single episode released for a show. Our <strong>TV binge time calculator</strong> sums the runtime of each episode. If specific episode data is missing, we use the show's reported average runtime to ensure the <strong>total episodes runtime</strong> estimate remains accurate.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/5">
              <AccordionTrigger className="text-white font-bold text-lg hover:text-primary transition-colors hover:no-underline text-left">
                How many days to finish a show? (Example)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed space-y-4">
                <p>Curious about your <strong>TV show commitment calculator</strong> result? Let's take a classic drama as an example:</p>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">Calculation Input</span>
                    <span className="text-xs text-muted-foreground">62 Episodes @ 60 min each</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-black text-white/40 uppercase">Total Minutes</p>
                      <p className="text-xl font-black text-white">3,720 min</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-white/40 uppercase">Total Hours</p>
                      <p className="text-xl font-black text-white">62 hours</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-black text-primary uppercase">Binge Calculator Result</p>
                    <p className="text-2xl font-black text-white">2 Days, 14 Hours</p>
                  </div>
                </div>
                <p className="text-sm italic">This is the time required for a non-stop marathon.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="text-white font-bold text-lg hover:text-primary transition-colors hover:no-underline">
                What is the Binge Watch Planner?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Our <strong>Binge watch planner</strong> is an <strong>episodes per day calculator</strong>. Instead of watching 24/7, set a daily limit (e.g., 2 hours), and this <strong>binge watch schedule tool</strong> will tell you exactly which calendar date you'll reach the series finale!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-10 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} BingeMate. Your favorite Binge Watch Calculator. Data by TVMaze.</p>
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
