
import Link from "next/link";
import { MonitorPlay, ChevronLeft, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <header className="container mx-auto px-6 md:px-12 lg:px-24 py-10 relative z-50 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-tr from-primary to-fuchsia-600 p-2.5 rounded-xl shadow-lg shadow-primary/30">
            <MonitorPlay className="h-6 w-6 text-white" />
          </div>
          <span className="text-4xl font-logo tracking-wider text-white uppercase">
            the<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Binge</span>
          </span>
        </Link>
        <Link href="/" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
      </header>

      <section className="container mx-auto px-6 md:px-12 lg:px-24 pb-24 relative z-10 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-4">
            <div className="bg-fuchsia-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 mb-8">
              <HelpCircle className="h-8 w-8 text-fuchsia-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Support Center</h1>
            <p className="text-xl text-muted-foreground font-medium">Have questions or need help with theBinge? We're here for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 border-white/10 hover:bg-white/5 transition-colors">
              <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black text-white">Email Us</h3>
              <p className="text-muted-foreground font-medium">Send us an email and we'll get back to you within 24 hours.</p>
              <Button className="w-full bg-primary text-white font-black rounded-xl h-12">support@thebinge.tv</Button>
            </div>

            <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 border-white/10 hover:bg-white/5 transition-colors">
              <div className="bg-violet-500/10 w-12 h-12 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-black text-white">Feature Requests</h3>
              <p className="text-muted-foreground font-medium">Want to see a new tool in the calculator? Let us know!</p>
              <Button variant="outline" className="w-full border-white/10 text-white font-black rounded-xl h-12">Submit Feedback</Button>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[3rem] border-white/10 space-y-8">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">Is the binge time accurate?</h4>
                <p className="text-muted-foreground">It is an estimate. We calculate the sum of all individual episode runtimes. If specific runtimes are missing, we use the series' average.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">Can I save my binge schedule?</h4>
                <p className="text-muted-foreground">Currently, schedules are session-based. We are working on a feature to allow you to save and share your marathon plans!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} theBinge • Professional Binge Watch Calculator</p>
      </footer>
    </main>
  );
}
