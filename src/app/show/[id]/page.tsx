import { getShowDetails } from "@/lib/tvmaze";
import { ShowDetails } from "@/components/binge-calculator/show-details";
import { Tv, ChevronLeft } from "lucide-react";
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
    description: `How long does it take to watch ${show.name}? Calculate the total episodes runtime and plan your binge watch schedule with CineBy TV. Average runtime: ${show.averageRuntime || 'N/A'} mins.`,
    openGraph: {
      title: `How Long To Watch ${show.name}`,
      description: `Find out exactly how long it takes to watch ${show.name} with our series binge calculator and planner.`,
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
      <header className="container mx-auto px-6 py-8 relative z-50 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
            <Tv className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            CINEBY<span className="text-primary"> TV</span>
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
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <ShowDetails show={show} />
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} CineBy TV • Professional Binge Watch Calculator</p>
      </footer>
    </main>
  );
}
