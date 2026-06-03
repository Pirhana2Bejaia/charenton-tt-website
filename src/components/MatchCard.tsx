import { CalendarDays, MapPin } from "lucide-react";

interface MatchCardProps {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  location: string;
}

export default function MatchCard({ date, time, homeTeam, awayTeam, competition, location }: MatchCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-club-red/10 to-transparent rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <span className="inline-block px-3 py-1 bg-blue-50 text-club-blue text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            {competition}
          </span>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <CalendarDays size={16} />
            <span>{date} • {time}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1 text-center">
          <p className="font-extrabold text-xl text-slate-900">{homeTeam}</p>
        </div>
        <div className="px-4 text-slate-400 font-bold italic">
          VS
        </div>
        <div className="flex-1 text-center">
          <p className="font-extrabold text-xl text-slate-600">{awayTeam}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <MapPin size={14} className="text-club-red" />
        {location}
      </div>
    </div>
  );
}
