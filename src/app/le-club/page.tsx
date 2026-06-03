'use client';

import { useEffect, useState } from 'react';
import BureauCard from '@/components/BureauCard';
import { supabase } from '@/lib/supabase';
import { BureauMember, SiteContent } from '@/lib/types';

const DEMO_BUREAU: BureauMember[] = [
  {
    id: '1',
    first_name: 'Jean-Marc',
    last_name: 'Gagnier',
    role: 'Président',
    photo_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop',
    order_index: 0
  },
  {
    id: '2',
    first_name: 'Marie',
    last_name: 'Dupont',
    role: 'Trésorière',
    photo_url: '',
    order_index: 1
  }
];

const DEFAULT_HISTORIQUE = `
Avril 1953 — Fondation du club sous le nom SOC/SOSC Charenton. Premier président : Albert Frère (1953-1966).

1961/62 — Le club atteint la Nationale 3.

1962/63 — Champion de France de Nationale 3.

1971/72 — Champion de France de Nationale 1 ! Victoire 11-8 contre l'US Messine (avec Jacques Secrétin dans leurs rangs).

1972/73 — Quarts de finale de la Coupe d'Europe.

1974/75 — Nouveau quart de finale européen.

1975/76 — Champion de France de Nationale 2.

Aujourd'hui — Le club continue de briller avec des équipes de la Nationale au Départemental, un programme jeunes labellisé FFTT, et une communauté passionnée.
`;

export default function LeClub() {
  const [bureau, setBureau] = useState<BureauMember[]>([]);
  const [historique, setHistorique] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch Bureau
        const { data: bureauData, error: bureauError } = await supabase
          .from('bureau_members')
          .select('*')
          .order('order_index');
          
        if (bureauError) throw bureauError;
        setBureau(bureauData && bureauData.length > 0 ? bureauData : DEMO_BUREAU);

        // Fetch Historique
        const { data: contentData, error: contentError } = await supabase
          .from('site_content')
          .select('*')
          .eq('key', 'historique')
          .single();
          
        if (!contentError && contentData) {
          setHistorique((contentData as SiteContent).content);
        } else {
          setHistorique(DEFAULT_HISTORIQUE);
        }
      } catch (error) {
        console.error('Error:', error);
        setBureau(DEMO_BUREAU);
        setHistorique(DEFAULT_HISTORIQUE);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-club-blue to-club-blue-dark py-20 px-4 mb-20 rounded-b-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Le Club</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Découvrez l'équipe dirigeante et l'histoire riche de notre association sportive.
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {bureau.map((member, idx) => (
                <div key={member.id} className={`w-full max-w-sm animate-fade-in-up stagger-${(idx % 5) + 1}`}>
                  <BureauCard member={member} />
                </div>
              ))}
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
              ) : (
                historique.split('\n\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;
                  
                  // Check if paragraph starts with a year or date (e.g. "1971/72 —")
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
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
