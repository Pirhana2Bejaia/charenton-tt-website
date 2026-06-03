'use client';

import { useEffect, useState } from 'react';
import TeamCard from '@/components/TeamCard';
import { Team } from '@/lib/types';

export default function VieSportive() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [rencontres, setRencontres] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resTeams = await fetch('/api/equipes');
        if (resTeams.ok) {
          const data = await resTeams.json();
          setTeams(data || []);
        }

        const resRencontres = await fetch('/api/content?key=prochaines_rencontres');
        if (resRencontres.ok) {
          const data = await resRencontres.json();
          if (data && data.content) {
            setRencontres(data.content);
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-club-blue to-club-blue-dark py-20 px-4 mb-16 rounded-b-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Vie Sportive</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Nos équipes engagées en championnat, de la Nationale au niveau Départemental.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Panneau Prochaines Rencontres */}
        {rencontres && (
          <div className="mb-24 max-w-md mx-auto">
            <div className="bg-[#dea01e] rounded-[3rem] py-12 px-6 shadow-2xl border-[8px] border-club-blue relative overflow-hidden">
              {/* Ligne noire à gauche */}
              <div className="absolute top-10 bottom-10 left-6 w-1.5 bg-black z-0"></div>
              
              <div className="text-center relative z-10 pl-6 space-y-4">
                <h2 className="text-[22px] font-black text-black uppercase tracking-widest italic leading-tight">
                  PROCHAINES RENCONTRES
                </h2>
                <h3 className="text-xl font-black text-black uppercase tracking-widest italic mb-10">
                  A CHARENTON
                </h3>
                
                <div className="text-lg font-black leading-snug whitespace-pre-wrap flex flex-col gap-2">
                  {rencontres.split('\n').map((line, i) => {
                    const isDateOrTime = line.toUpperCase().includes('VENDREDI') || 
                                       line.toUpperCase().includes('SAMEDI') || 
                                       line.toUpperCase().includes('DIMANCHE') || 
                                       (line.toUpperCase().includes('H') && /\d/.test(line));
                    return (
                      <div key={i} className={isDateOrTime ? "text-[#ed3232] mt-6 mb-2 text-2xl italic font-black" : "italic text-black"}>
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, idx) => (
              <div key={team.id} className={`animate-fade-in-up stagger-${(idx % 5) + 1}`}>
                <TeamCard team={team} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-400 mb-2">Aucune équipe pour le moment</h3>
            <p className="text-slate-500">Les équipes seront bientôt affichées.</p>
          </div>
        )}
      </div>
    </div>
  );
}
