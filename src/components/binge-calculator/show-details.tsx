"use client";

import { useState } from "react";
import { TVShow } from "@/types/tvmaze";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, PlayCircle, Star, Tv, Info, Clock, Share2, Heart, Sparkles, TrendingUp } from "lucide-react";
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
  const [hoursPerDay, setHoursPerDay] = useState([3]);
  
  const episodes = show._embedded?.episodes || [];
  const totalEpisodes = episodes.length;
  
  const totalRuntimeMinutes = episodes.reduce((acc, ep) => {
    return acc + (ep.runtime || show.averageRuntime || 30);
  }, 0);
  
  const totalHours = totalRuntimeMinutes / 60;
  const daysToFinish = totalHours > 0 ? Math.ceil(totalHours / hoursPerDay[0]) : 0;
  const finishDate = addDays(new Date(), daysToFinish);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Hero Backdrop Overlay */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 opacity-30">
        {show.image?.original && (
          <Image
            src={show.image.original}
            alt=""
            fill
            className="object-cover blur-3xl scale-125 transition-transform duration-[10s] animate-pulse"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Poster & Quick Actions */}
        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-8">
          <Card className="overflow-hidden border-white/10 bg-transparent shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative aspect-[2/3] group rounded-[2.5rem] binge-card-hover">
            {show.image?.original ? (
              <Image
                src={show.image.original}
                alt={show.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Tv className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="absolute top-8 right-8">
              {show.rating?.average && (
                <div className="bg-primary backdrop-blur-xl text-white px-5 py-3 rounded-2xl font-black flex items-center gap-2 shadow-2xl border border-white/20 text-lg">
                  <Star className="h-5 w-5 fill-white" />
                  {show.rating.average}
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="secondary" className="flex-1 h-16 rounded-2xl font-black text-lg bg-white/5 border-white/10 hover:bg-white/10 gap-3 hover:scale-105 transition-all">
              <Heart className="h-6 w-6 text-pink-500 fill-pink-500" /> Favorite
            </Button>
            <Button variant="secondary" className="h-16 w-16 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 p-0 hover:rotate-12 transition-all">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Right: Info & Binge Logic */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.3em] text-[10px] px-4 py-1.5 font-black rounded-xl">
                  {show.status}
                </Badge>
                <div className="h-[1px] flex-1 bg-white/5" />
                <TrendingUp className="h-5 w-5 text-primary/40" />
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] animate-in fade-in slide-in-from-left-8 duration-1000">
                {show.name}
              </h1>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {show.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-white/5 text-muted-foreground border border-white/10 font-black px-6 py-2.5 rounded-2xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 bg-white/[0.02] rounded-[3rem] px-10">
            <div className="space-y-3">
              <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Release</p>
              <div className="flex items-center gap-3 text-white">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-2xl font-black">{show.premiered?.split("-")[0] || "N/A"}</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Episodes</p>
              <div className="flex items-center gap-3 text-white">
                <PlayCircle className="h-6 w-6 text-primary" />
                <span className="text-2xl font-black">{totalEpisodes}</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Runtime</p>
              <div className="flex items-center gap-3 text-white">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-2xl font-black">{show.averageRuntime || 45}m</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Network</p>
              <div className="flex items-center gap-3 text-white min-w-0">
                <Tv className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-2xl font-black truncate">{show.network?.name || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-12 pt-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white flex items-center gap-4">
                <div className="h-10 w-2 bg-primary rounded-full" />
                Total Binge Time
              </h2>
              <p className="text-muted-foreground font-semibold text-lg max-w-2xl leading-relaxed">
                The ultimate <strong>Series binge calculator</strong>. This is the <strong>total episodes runtime</strong> if you watch every single season back-to-back.
              </p>
            </div>
            
            <DurationDisplay totalMinutes={totalRuntimeMinutes} />
            
            <Card className="p-12 glass-panel border-white/10 space-y-12 rounded-[3.5rem] binge-card-hover overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                    <Sparkles className="h-3 w-3" /> Interactive Planner
                  </div>
                  <h3 className="text-4xl font-black text-white tracking-tight">
                    Personal Schedule
                  </h3>
                  <p className="text-muted-foreground font-semibold text-lg max-w-md leading-relaxed">
                    Use our <strong>episodes per day calculator</strong> to forecast your <strong>binge watch schedule</strong>.
                  </p>
                </div>
                <div className="bg-primary p-10 rounded-[2.5rem] text-center min-w-[180px] shadow-[0_20px_50px_rgba(99,102,241,0.5)] transform hover:scale-110 transition-transform">
                  <span className="text-6xl font-black text-white tracking-tighter">{hoursPerDay[0]}h</span>
                  <p className="text-[10px] uppercase font-black text-white/60 tracking-[0.3em] mt-3">Daily Limit</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="px-2">
                  <Slider
                    value={hoursPerDay}
                    onValueChange={setHoursPerDay}
                    max={24}
                    min={0.5}
                    step={0.5}
                    className="py-6"
                  />
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-2">
                    <span>Just a taste</span>
                    <span>All-in marathon</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-white/5">
                  <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 group hover:bg-white/10 transition-all flex flex-col justify-center">
                    <Label className="text-muted-foreground text-[10px] uppercase font-black tracking-[0.3em] mb-4 block">Commitment</Label>
                    <div className="flex items-baseline gap-2">
                      <p className="text-5xl font-black text-white tracking-tighter">{daysToFinish}</p>
                      <span className="text-xl font-bold text-muted-foreground">Days</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-10 rounded-[2.5rem] border border-primary/20 group hover:bg-primary/20 transition-all flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                    <Label className="text-primary text-[10px] uppercase font-black tracking-[0.3em] mb-4 block">The Finale</Label>
                    <p className="text-5xl font-black text-primary tracking-tighter">{format(finishDate, 'MMM do')}</p>
                    <p className="text-xl font-black text-primary/40 mt-1">{format(finishDate, 'yyyy')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-3 py-10 text-muted-foreground/30 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
              <Info className="h-5 w-5" /> Professional TV show commitment calculator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}