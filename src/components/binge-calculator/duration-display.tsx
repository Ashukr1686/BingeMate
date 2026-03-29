"use client";

import { Clock, Calendar, Zap, LayoutDashboard } from "lucide-react";

interface DurationDisplayProps {
  totalMinutes: number;
}

export function DurationDisplay({ totalMinutes }: DurationDisplayProps) {
  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutesAfterDays = totalMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutesAfterDays / 60);
  const minutes = remainingMinutesAfterDays % 60;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="group glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:scale-[1.03] transition-all duration-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Calendar className="h-10 w-10 text-primary mb-4 group-hover:rotate-12 transition-transform duration-500" />
        <div className="text-5xl font-black text-white tracking-tighter mb-1">{days}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black">Days</div>
      </div>
      
      <div className="group bg-primary rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_24px_48px_-12px_rgba(99,102,241,0.5)] transform hover:scale-[1.05] transition-all duration-500 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <Clock className="h-10 w-10 text-white mb-4 group-hover:rotate-12 transition-transform duration-500" />
        <div className="text-5xl font-black text-white tracking-tighter mb-1">{hours}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-black">Hours</div>
      </div>

      <div className="group glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:scale-[1.03] transition-all duration-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Zap className="h-10 w-10 text-primary mb-4 group-hover:rotate-12 transition-transform duration-500" />
        <div className="text-5xl font-black text-white tracking-tighter mb-1">{minutes}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black">Minutes</div>
      </div>
    </div>
  );
}