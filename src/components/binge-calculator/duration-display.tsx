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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:bg-primary/20 transition-all">
        <Calendar className="h-8 w-8 text-primary mb-2" />
        <div className="text-3xl font-black text-white">{days}</div>
        <div className="text-xs uppercase tracking-widest text-primary font-bold">Days</div>
      </div>
      
      <div className="bg-primary border border-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-primary/20 transform hover:scale-105 transition-all">
        <Clock className="h-8 w-8 text-white mb-2" />
        <div className="text-3xl font-black text-white">{hours}</div>
        <div className="text-xs uppercase tracking-widest text-white/80 font-bold">Hours</div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:bg-primary/20 transition-all">
        <Zap className="h-8 w-8 text-primary mb-2" />
        <div className="text-3xl font-black text-white">{minutes}</div>
        <div className="text-xs uppercase tracking-widest text-primary font-bold">Minutes</div>
      </div>
    </div>
  );
}
