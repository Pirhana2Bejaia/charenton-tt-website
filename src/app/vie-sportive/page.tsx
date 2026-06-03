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
      <div className="w-[92%] max-w-6xl mx-auto bg-gradient-to-br from-club-blue to-club-blue-dark py-16 px-4 mt-6 mb-16 rounded-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Vie Sportive</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Nos équipes engagées en championnat, de la Nationale au niveau Départemental.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {teams.map((team, idx) => (
              <div key={team.id} className={`animate-fade-in-up stagger-${(idx % 5) + 1}`}>
                <TeamCard team={team} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm mb-24">
            <h3 className="text-xl font-bold text-slate-400 mb-2">Aucune équipe pour le moment</h3>
            <p className="text-slate-500">Les équipes seront bientôt affichées.</p>
          </div>
        )}

        {/* Panneau Prochaines Rencontres */}
        {rencontres && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 to-club-blue-dark rounded-[2.5rem] py-12 px-6 shadow-2xl border border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-club-blue rounded-full blur-3xl opacity-20 z-0" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-club-red rounded-full blur-3xl opacity-10 z-0" />
              
              <div className="text-center relative z-10 space-y-4">
                <div className="flex flex-col items-center justify-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-2">
                    PROCHAINES RENCONTRES
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="h-0.5 w-8 bg-club-red rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-200 uppercase tracking-widest">
                      A CHARENTON
                    </h3>
                    <div className="h-0.5 w-8 bg-club-red rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-lg md:text-xl font-medium leading-relaxed whitespace-pre-wrap flex flex-col gap-1">
                  {rencontres.split('\n').map((line, i) => {
                    const isDateOrTime = /^(LUNDI|MARDI|MERCREDI|JEUDI|VENDREDI|SAMEDI|DIMANCHE)\b/i.test(line.trim()) || 
                                       /^\d{1,2}H\d{0,2}/i.test(line.trim());
                    return (
                      <div key={i} className={isDateOrTime ? "text-club-red mt-6 mb-2 text-2xl font-black" : "text-slate-200"}>
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
