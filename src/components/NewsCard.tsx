import { ArrowRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export default function NewsCard({ title, excerpt, date, category, imageUrl }: NewsCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      {imageUrl ? (
        <div className="h-48 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-club-red text-white text-xs font-bold rounded-full">
            {category}
          </span>
        </div>
      ) : (
        <div className="h-32 w-full bg-gradient-to-br from-club-blue to-blue-800 relative p-6 flex items-end">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            {category}
          </span>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-medium text-slate-400 mb-2">{date}</span>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-club-blue transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
          {excerpt}
        </p>
        <button className="flex items-center gap-2 text-sm font-bold text-club-red group-hover:gap-3 transition-all">
          Lire la suite <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
