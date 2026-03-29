"use client";

import { TVShow } from "@/types/tvmaze";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, PlayCircle, Star, Tv } from "lucide-react";
import Image from "next/image";
import { DurationDisplay } from "./duration-display";

interface ShowDetailsProps {
  show: TVShow;
}

export function ShowDetails({ show }: ShowDetailsProps) {
  const totalEpisodes = show._embedded?.episodes.length || 0;
  const totalRuntimeMinutes = show._embedded?.episodes.reduce((acc, ep) => acc + (ep.runtime || show.averageRuntime || 0), 0) || 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Poster */}
        <div className="lg:col-span-4">
          <Card className="overflow-hidden border-white/5 bg-transparent shadow-2xl relative aspect-[2/3]">
            {show.image?.original ? (
              <Image
                src={show.image.original}
                alt={show.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Tv className="h-20 w-20 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              {show.rating?.average && (
                <div className="bg-primary text-white px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
                  <Star className="h-4 w-4 fill-white" />
                  {show.rating.average}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
              {show.name}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-white/10 text-accent font-medium hover:bg-white/20">
                  {genre}
                </Badge>
              ))}
              <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-wider text-[10px] font-bold">
                {show.status}
              </Badge>
            </div>

            <div 
              className="text-muted-foreground leading-relaxed text-lg prose prose-invert max-w-none line-clamp-4 hover:line-clamp-none transition-all"
              dangerouslySetInnerHTML={{ __html: show.summary || "No summary available." }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Premiered</p>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-semibold">{show.premiered?.split("-")[0] || "N/A"}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Episodes</p>
              <div className="flex items-center gap-2 text-white">
                <PlayCircle className="h-4 w-4 text-primary" />
                <span className="font-semibold">{totalEpisodes}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Avg Runtime</p>
              <div className="flex items-center gap-2 text-white">
                <Star className="h-4 w-4 text-primary" />
                <span className="font-semibold">{show.averageRuntime || show._embedded?.episodes[0]?.runtime || "N/A"} min</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Network</p>
              <div className="flex items-center gap-2 text-white">
                <Tv className="h-4 w-4 text-primary" />
                <span className="font-semibold truncate">{show.network?.name || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">Total Binge Duration</h2>
            </div>
            <DurationDisplay totalMinutes={totalRuntimeMinutes} />
            <p className="text-center text-sm text-muted-foreground italic">
              Estimated time to watch all {totalEpisodes} episodes back-to-back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
