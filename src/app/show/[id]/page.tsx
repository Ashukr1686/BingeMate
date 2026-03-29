
import { getShowDetails } from "@/lib/tvmaze";
import { ShowDetails } from "@/components/binge-calculator/show-details";
import { SearchBar } from "@/components/binge-calculator/search-bar";
import { Tv, Flame, Info, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const show = await getShowDetails(parseInt(id));

  if (!show) {
    return {
      title: "Show Not Found | BingeMate",
    };
  }

  // Strip HTML tags from summary for SEO description
  const cleanSummary = show.summary?.replace(/<[^>]*>?/gm, "").substring(0, 160) || "";

  return {
    title: `${show.name} Binge Time & Calculator | BingeMate`,
    description: `How long does it take to watch ${show.name}? Total binge duration: ${show.averageRuntime || 'N/A'} mins avg. ${cleanSummary}`,
    openGraph: {
      title: `${show.name} Binge Duration`,
      description: cleanSummary,
      images: show.image?.original ? [show.image.original] : [],
    },
  };
}

export default async function ShowPage({ params }: Props) {
  const { id } = await params;
  const show = await getShowDetails(parseInt(id));

  if (!show) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Header/Nav */}
      <header className="container mx-auto px-4 py-8 relative z-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
            <Tv className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            BINGE<span className="text-primary">MATE</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" /> Back to Search
          </Link>
        </div>
      </header>

      {/* Content Section */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <ShowDetails show={show} />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} BingeMate • Powered by TVMaze API</p>
      </footer>
    </main>
  );
}
