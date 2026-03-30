"use client";

import { SearchBar } from "@/components/binge-calculator/search-bar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tv, Flame, Clapperboard, MonitorPlay, HelpCircle, Sparkles } from "lucide-react";
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
          <button className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
            <Flame className="h-4 w-4 group-hover:text-orange-500 transition-colors" /> Trending
          </button>
          <a href="#faq" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> FAQ
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 relative z-10 py-12">
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-16 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black tracking-widest text-primary uppercase mb-4 animate-bounce">
            <Sparkles className="h-3.5 w-3.5" /> Start Your Next Adventure
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] lg:leading-[0.8]">
            Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400">
              Great Binge
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            The ultimate <strong>Binge watch planner</strong> for series lovers. Calculate binge time for TV series instantly and map out your marathon.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <SearchBar onSelect={handleShowSelect} />
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-40 w-full max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 mb-32">
          <div className="text-center space-y-3">
            <div className="bg-white/5 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10 rotate-6 group hover:rotate-0 transition-transform">
               <Clapperboard className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">Got Questions?</h2>
            <p className="text-muted-foreground font-semibold text-lg">Everything you need to know about calculating binge time</p>
          </div>

          <Accordion type="single" collapsible className="w-full glass-panel rounded-[2.5rem] p-8 border-white/5 space-y-2">
            <AccordionItem value="item-1" className="border-white/5 px-4">
              <AccordionTrigger className="text-white font-black text-xl hover:text-primary transition-colors hover:no-underline py-6">
                How does the binge calculator work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                Our <strong>TV binge time calculator</strong> works by fetching the precise duration of every aired episode. We aggregate the <strong>total episodes runtime</strong> to give you a perfect non-stop countdown.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/5 px-4">
              <AccordionTrigger className="text-white font-black text-xl hover:text-primary transition-colors hover:no-underline py-6 text-left">
                Can you give me a calculation example?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg leading-relaxed space-y-6 pb-6">
                <p>Curious about your <strong>TV show commitment calculator</strong> result? Let's break down a 62-episode masterpiece:</p>
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Total Minutes</p>
                      <p className="text-3xl font-black text-white">3,720m</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Total Hours</p>
                      <p className="text-3xl font-black text-white">62h</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Binge Calculator Result</p>
                    <p className="text-4xl font-black text-white">2 Days, 14 Hours</p>
                    <p className="text-sm font-medium text-muted-foreground mt-2">That's the time required for a non-stop marathon!</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none px-4">
              <AccordionTrigger className="text-white font-black text-xl hover:text-primary transition-colors hover:no-underline py-6">
                What is the Binge Watch Schedule Tool?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                Our <strong>Binge watch planner</strong> is an <strong>episodes per day calculator</strong>. Set your daily limit, and we'll calculate exactly <strong>how many days to finish a show</strong> and give you your finale date!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 relative z-10 bg-black/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground font-bold">
          <p>© {new Date().getFullYear()} BingeMate. The ultimate series binge calculator. Data via TVMaze.</p>
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