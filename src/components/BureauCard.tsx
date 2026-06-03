'use client';
import { BureauMember } from '@/lib/types';

export default function BureauCard({ member }: { member: BureauMember }) {
  const initials = `${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`.toUpperCase();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 text-center flex flex-col items-center group">
      <div className="w-40 h-40 rounded-full mb-6 overflow-hidden border-4 border-slate-50 shadow-inner group-hover:border-club-blue/10 transition-colors">
        {member.photo_url ? (
          <img 
            src={member.photo_url} 
            alt={`${member.first_name} ${member.last_name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-club-blue flex items-center justify-center text-white text-3xl font-bold">
            {initials}
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-extrabold text-slate-900 mb-1">
        {member.first_name} <span className="uppercase">{member.last_name}</span>
      </h3>
      <p className="text-club-red font-semibold text-sm uppercase tracking-wide">
        {member.role}
      </p>
    </div>
  );
}
