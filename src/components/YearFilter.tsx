'use client';

export default function YearFilter({ 
  years, 
  selectedYear, 
  onSelectYear 
}: { 
  years: number[]; 
  selectedYear: number; 
  onSelectYear: (year: number) => void;
}) {
  if (!years || years.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {years.map(year => (
        <button
          key={year}
          onClick={() => onSelectYear(year)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            selectedYear === year
              ? 'bg-club-blue text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
