"use client";

import { Clock, Calendar, Zap } from "lucide-react";

interface DurationDisplayProps {
  totalMinutes: number;
}

export function DurationDisplay({ totalMinutes }: DurationDisplayProps) {
  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutesAfterDays = totalMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutesAfterDays / 60);
  const minutes = remainingMinutesAfterDays % 60;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="group glass-panel rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center hover:scale-[1.05] transition-all duration-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="bg-white/5 p-5 rounded-3xl mb-6 group-hover:rotate-12 transition-transform duration-500">
           <Calendar className="h-8 w-8 text-primary" />
        </div>
        <div className="text-6xl font-black text-white tracking-tighter mb-2">{days}</div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Days</div>
      </div>
      
      <div className="group bg-primary rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-[0_30px_60px_-12px_rgba(99,102,241,0.6)] transform hover:scale-[1.1] transition-all duration-500 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="bg-white/20 p-5 rounded-3xl mb-6 group-hover:rotate-12 transition-transform duration-500">
           <Clock className="h-8 w-8 text-white" />
        </div>
        <div className="text-6xl font-black text-white tracking-tighter mb-2">{hours}</div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-black">Hours</div>
      </div>

      <div className="group glass-panel rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center hover:scale-[1.05] transition-all duration-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="bg-white/5 p-5 rounded-3xl mb-6 group-hover:rotate-12 transition-transform duration-500">
           <Zap className="h-8 w-8 text-primary" />
        </div>
        <div className="text-6xl font-black text-white tracking-tighter mb-2">{minutes}</div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Minutes</div>
      </div>
    </div>
  );
}