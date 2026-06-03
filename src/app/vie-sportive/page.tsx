'use client';

import { useEffect, useState } from 'react';
import TeamCard from '@/components/TeamCard';
import { supabase } from '@/lib/supabase';
import { Team } from '@/lib/types';

const DEMO_TEAMS: Team[] = [
  { id: '1', name: 'Nationale 2', pool: 'Poule A', players: ['Arthur D.', 'Martin S.', 'Luc P.'], order_index: 0 },
  { id: '2', name: 'Régionale 1', pool: 'Poule B', players: ['Thomas L.', 'Kevin R.', 'Marc E.'], order_index: 1 },
  { id: '3', name: 'Excellence Paris', pool: 'Poule C', players: ['Paul J.', 'Simon M.'], order_index: 2 },
];

export default function VieSportive() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('order_index');
          
        if (error) throw error;
        setTeams(data && data.length > 0 ? data : DEMO_TEAMS);
      } catch (error) {
        console.error('Error:', error);
        setTeams(DEMO_TEAMS);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
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
          <div className="text-center py-24">
            <h3 className="text-xl font-bold text-slate-400 mb-2">Aucune équipe pour le moment</h3>
          </div>
        )}
      </div>
    </div>
  );
}
