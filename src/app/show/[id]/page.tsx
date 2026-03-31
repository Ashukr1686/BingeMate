import { getShowDetails } from "@/lib/tvmaze";
import { ShowDetails } from "@/components/binge-calculator/show-details";
import { MonitorPlay, ChevronLeft } from "lucide-react";
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
      title: "Show Not Found | CineBy TV",
    };
  }

  const cleanSummary = show.summary?.replace(/<[^>]*>?/gm, "").substring(0, 160) || "";

  return {
    title: `How Long To Watch ${show.name} | CineBy TV`,
    description: `How long does it take to watch ${show.name}? Calculate the total episodes runtime and plan your binge watch schedule with CineBy TV. Total episodes: ${show._embedded?.episodes?.length || 0}.`,
    openGraph: {
      title: `How Long To Watch ${show.name}`,
      description: `Find out exactly how long it takes to watch ${show.name} with our series binge calculator and planner.`,
      images: show.image?.original ? [show.image.original] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `How Long To Watch ${show.name}`,
      description: `Binge watch time calculation for ${show.name}.`,
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

  const totalEpisodes = show._embedded?.episodes?.length || 0;
  const cleanSummary = show.summary?.replace(/<[^>]*>?/gm, "") || "";

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": show.name,
    "description": cleanSummary,
    "image": show.image?.original,
    "numberOfEpisodes": totalEpisodes,
    "startDate": show.premiered,
    "genre": show.genres,
    "author": {
      "@type": "Organization",
      "name": show.network?.name || "Streaming Service"
    },
    "aggregateRating": show.rating?.average ? {
      "@type": "AggregateRating",
      "ratingValue": show.rating.average,
      "bestRating": "10",
      "ratingCount": "100" // Placeholder count as TVMaze doesn't provide it
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        {/* Header/Nav */}
        <header className="container mx-auto px-8 md:px-16 lg:px-24 py-10 relative z-50 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="CineBy TV Home">
            <div className="bg-gradient-to-tr from-primary to-fuchsia-600 p-2.5 rounded-xl shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
              <MonitorPlay className="h-6 w-6 text-white" />
            </div>
            <span className="text-4xl font-logo tracking-wider text-white uppercase drop-shadow-[0_2px_15px_rgba(139,92,246,0.4)]">
              CineBy<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> TV</span>
            </span>
          </Link>
          <Link 
            href="/" 
            className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" /> 
            <span>Back to Search</span>
          </Link>
        </header>

        {/* Content Section */}
        <section className="container mx-auto px-8 md:px-16 lg:px-24 pb-24 relative z-10">
          <ShowDetails show={show} />
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/5 py-12 relative z-10 bg-black/20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted-foreground font-bold">
            <p>© {new Date().getFullYear()} CineBy TV. Data via TMDB & TVMaze.</p>
            <nav className="flex gap-10">
              <Link href="/terms" className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Terms</Link>
              <Link href="/privacy" className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Privacy</Link>
              <Link href="/support" className="hover:text-primary cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Support</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
