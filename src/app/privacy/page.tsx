
import Link from "next/link";
import { MonitorPlay, ChevronLeft, Eye } from "lucide-react";

export default function PrivacyPage() {
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
          <div className="bg-violet-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-violet-500/20 mb-8">
            <Eye className="h-8 w-8 text-violet-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground font-medium leading-relaxed">
            <p className="text-xl text-white font-bold">Your privacy is important to us. Here is how we handle your data.</p>
            
            <h2 className="text-2xl font-black text-white pt-4">1. Data Collection</h2>
            <p>theBinge does not require an account to use. We do not collect personal identification information like names or emails unless you explicitly contact us for support.</p>

            <h2 className="text-2xl font-black text-white pt-4">2. Cookies and Analytics</h2>
            <p>We may use local storage to save your preferences (like the "Skip Intros" setting). We use anonymous analytics to understand how users interact with our binge calculator.</p>

            <h2 className="text-2xl font-black text-white pt-4">3. Third Party Services</h2>
            <p>Our app fetches data from TMDB and TVMaze APIs. These services may collect information in accordance with their own privacy policies when their resources (like images) are loaded.</p>

            <h2 className="text-2xl font-black text-white pt-4">4. Security</h2>
            <p>We use industry-standard security measures to protect the integrity of our platform and any data processed during your session.</p>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} theBinge • Professional Binge Watch Calculator</p>
      </footer>
    </main>
  );
}
