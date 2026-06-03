'use client';

import { useEffect, useState } from 'react';
import BureauCard from '@/components/BureauCard';
import { BureauMember } from '@/lib/types';

export default function LeClub() {
  const [bureau, setBureau] = useState<BureauMember[]>([]);
  const [historique, setHistorique] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch Bureau via API
        const bureauRes = await fetch('/api/bureau');
        if (bureauRes.ok) {
          const bureauData = await bureauRes.json();
          setBureau(bureauData || []);
        }

        // Fetch Historique via API
        const contentRes = await fetch('/api/content?key=historique');
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          if (contentData && contentData.content) {
            setHistorique(contentData.content);
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="w-[92%] max-w-6xl mx-auto bg-gradient-to-br from-club-blue to-club-blue-dark py-16 px-4 mt-6 mb-20 rounded-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Le Club</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Découvrez l&apos;équipe dirigeante et l&apos;histoire riche de notre association sportive.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-32">
        
        {/* Section Bureau */}
        <section>
          <div className="flex items-center gap-4 mb-12 justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center">
              Le Bureau
            </h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center"><div className="w-10 h-10 border-4 border-slate-200 border-t-club-blue rounded-full animate-spin"></div></div>
          ) : bureau.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {bureau.map((member, idx) => (
                <div key={member.id} className={`w-full max-w-sm animate-fade-in-up stagger-${(idx % 5) + 1}`}>
                  <BureauCard member={member} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-500">Le bureau sera bientôt présenté.</p>
            </div>
          )}
        </section>

        {/* Section Historique */}
        <section>
          <div className="flex items-center gap-4 mb-16 justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center">
              Notre Histoire
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-lg border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10" />
            
            <div className="prose prose-lg prose-slate max-w-none space-y-6">
              {loading ? (
                 <div className="animate-pulse space-y-4">
                   <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                   <div className="h-4 bg-slate-200 rounded w-full"></div>
                   <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                 </div>
              ) : historique ? (
                historique.split('\n\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;
                  
                  const parts = paragraph.split('—');
                  if (parts.length > 1 && parts[0].length < 20) {
                    return (
                      <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start py-4 border-b border-slate-100 last:border-0">
                        <div className="text-club-blue font-black text-xl md:text-2xl whitespace-nowrap min-w-[120px]">
                          {parts[0].trim()}
                        </div>
                        <div className="text-slate-600 leading-relaxed text-lg">
                          {parts.slice(1).join('—').trim()}
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-slate-600 leading-relaxed text-lg text-center font-medium py-4">
                      {paragraph}
                    </p>
                  );
                })
              ) : (
                <p className="text-slate-500 text-center">L&apos;historique sera bientôt disponible.</p>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
