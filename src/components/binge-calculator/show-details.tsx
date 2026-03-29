"use client";

import { useState } from "react";
import { TVShow } from "@/types/tvmaze";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, PlayCircle, Star, Tv, Info, Clock, Share2, Heart, ExternalLink } from "lucide-react";
import Image from "next/image";
import { DurationDisplay } from "./duration-display";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";

interface ShowDetailsProps {
  show: TVShow;
}

export function ShowDetails({ show }: ShowDetailsProps) {
  const [hoursPerDay, setHoursPerDay] = useState([2.5]);
  
  const episodes = show._embedded?.episodes || [];
  const totalEpisodes = episodes.length;
  
  const totalRuntimeMinutes = episodes.reduce((acc, ep) => {
    return acc + (ep.runtime || show.averageRuntime || 45);
  }, 0);
  
  const totalHours = totalRuntimeMinutes / 60;
  const daysToFinish = totalHours > 0 ? Math.ceil(totalHours / hoursPerDay[0]) : 0;
  const finishDate = addDays(new Date(), daysToFinish);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Hero Backdrop Overlay */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 opacity-30 blur-3xl">
        {show.image?.original && (
          <Image
            src={show.image.original}
            alt=""
            fill
            className="object-cover scale-150 rotate-12"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Poster & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-white/10 bg-transparent shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative aspect-[2/3] group rounded-3xl binge-card-hover">
            {show.image?.original ? (
              <Image
                src={show.image.original}
                alt={show.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Tv className="h-20 w-20 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-6 right-6">
              {show.rating?.average && (
                <div className="bg-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-black flex items-center gap-1.5 shadow-2xl border border-white/20">
                  <Star className="h-4 w-4 fill-white" />
                  {show.rating.average}
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 h-14 rounded-2xl font-bold bg-white/5 border-white/10 hover:bg-white/10 gap-2">
              <Heart className="h-5 w-5" /> Favorite
            </Button>
            <Button variant="secondary" className="h-14 w-14 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 p-0">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right: Info & Binge Logic */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-primary/40 text-primary uppercase tracking-[0.2em] text-[10px] px-3 py-1 font-black rounded-lg">
                  {show.status}
                </Badge>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white leading-none">
                {show.name}
              </h1>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {show.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-primary/10 text-primary border border-primary/20 font-bold px-4 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div 
              className="text-muted-foreground/80 leading-relaxed text-xl prose prose-invert max-w-none font-medium italic"
              dangerouslySetInnerHTML={{ __html: show.summary || "No summary available." }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
            <div className="space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Release</p>
              <div className="flex items-center gap-2.5 text-white">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-xl font-black">{show.premiered?.split("-")[0] || "N/A"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Episodes</p>
              <div className="flex items-center gap-2.5 text-white">
                <PlayCircle className="h-5 w-5 text-primary" />
                <span className="text-xl font-black">{totalEpisodes}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Runtime</p>
              <div className="flex items-center gap-2.5 text-white">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-xl font-black">{show.averageRuntime || 45} min</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Network</p>
              <div className="flex items-center gap-2.5 text-white">
                <Tv className="h-5 w-5 text-primary" />
                <span className="text-xl font-black truncate">{show.network?.name || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                Total Binge Time
              </h2>
              <p className="text-muted-foreground font-medium">
                The absolute time required to finish every season back-to-back without breaks.
              </p>
            </div>
            
            <DurationDisplay totalMinutes={totalRuntimeMinutes} />
            
            <Card className="p-8 glass-panel border-white/10 space-y-8 rounded-[2rem] binge-card-hover overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" /> Smart Binge Planner
                  </h3>
                  <p className="text-muted-foreground font-medium max-w-md">
                    Customize your pace. Adjust your daily watching limit to forecast your finish line.
                  </p>
                </div>
                <div className="bg-primary p-6 rounded-3xl text-center min-w-[120px] shadow-2xl shadow-primary/30">
                  <span className="text-4xl font-black text-white">{hoursPerDay[0]}h</span>
                  <p className="text-[10px] uppercase font-black text-white/70 tracking-widest mt-1">Daily Cap</p>
                </div>
              </div>

              <div className="space-y-8">
                <Slider
                  value={hoursPerDay}
                  onValueChange={setHoursPerDay}
                  max={24}
                  min={0.5}
                  step={0.5}
                  className="py-4"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                    <Label className="text-muted-foreground text-[10px] uppercase font-black tracking-widest mb-3 block">Timeline</Label>
                    <p className="text-3xl font-black text-white">{daysToFinish} <span className="text-sm text-muted-foreground font-bold">Days</span></p>
                  </div>
                  <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20 group hover:bg-primary/20 transition-all">
                    <Label className="text-primary text-[10px] uppercase font-black tracking-widest mb-3 block">Grand Finale</Label>
                    <p className="text-3xl font-black text-primary">{format(finishDate, 'MMM do')}</p>
                    <p className="text-xs font-bold text-primary/60 mt-1">{format(finishDate, 'yyyy')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground/50 text-xs font-bold uppercase tracking-widest">
              <Info className="h-4 w-4" /> Calculated for optimized viewing flow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}