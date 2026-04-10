
import Link from "next/link";
import { MonitorPlay, ChevronLeft, ShieldCheck } from "lucide-react";

export default function TermsPage() {
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-primary/20 mb-8">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground font-medium leading-relaxed">
            <p className="text-xl text-white font-bold">Welcome to theBinge. By using our service, you agree to these terms.</p>
            
            <h2 className="text-2xl font-black text-white pt-4">1. Use of Service</h2>
            <p>theBinge provides a tool for calculating TV show binge times based on publicly available data from TMDB and TVMaze. This service is for personal, non-commercial use only.</p>

            <h2 className="text-2xl font-black text-white pt-4">2. Data Accuracy</h2>
            <p>While we strive for accuracy, binge times are estimates based on average episode runtimes. Actual viewing time may vary based on specific platforms, versions, or viewer habits.</p>

            <h2 className="text-2xl font-black text-white pt-4">3. Intellectual Property</h2>
            <p>All show titles, posters, and metadata are the property of their respective copyright holders. theBinge claims no ownership over TV series data or imagery provided via third-party APIs.</p>

            <h2 className="text-2xl font-black text-white pt-4">4. Limitation of Liability</h2>
            <p>theBinge is not responsible for any "spoilers" or data discrepancies. We provide this tool "as is" without warranty of any kind.</p>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} theBinge • Professional Binge Watch Calculator</p>
      </footer>
    </main>
  );
}
