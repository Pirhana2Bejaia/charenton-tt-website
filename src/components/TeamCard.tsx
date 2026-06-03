'use client';
import { Team } from '@/lib/types';
import { Users } from 'lucide-react';

export default function TeamCard({ team }: { team: Team }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6 gap-4">
        <h3 className="font-extrabold text-2xl text-slate-900">{team.name}</h3>
        <span className="px-3 py-1 bg-club-blue text-white text-xs font-bold rounded-full uppercase tracking-wider text-center shrink-0">
          n°{team.pool.replace(/^(n°|poule)\s*/i, '').trim()}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-slate-500 mb-4 pb-4 border-b border-slate-100">
        <Users size={16} className="text-club-red" />
        <span className="text-sm font-medium">Composition</span>
      </div>
      
      <ul className="flex-1 flex flex-col gap-3">
        {team.players && team.players.length > 0 ? (
          team.players.map((player, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-club-blue/40" />
              <span className="text-slate-700 font-medium">{player}</span>
            </li>
          ))
        ) : (
          <li className="text-slate-400 text-sm italic">Aucun joueur renseigné</li>
        )}
      </ul>
    </div>
  );
}
