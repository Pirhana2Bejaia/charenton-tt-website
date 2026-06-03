'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminRencontres() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/content?key=prochaines_rencontres');
        const data = await res.json();
        if (data && data.content) {
          setContent(data.content);
        }
      } catch {
        toast.error('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'prochaines_rencontres',
          title: 'Prochaines Rencontres',
          content: content
        })
      });
      if (!res.ok) throw new Error();
      toast.success('Rencontres sauvegardées avec succès');
    } catch {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Prochaines Rencontres à Charenton</h2>
        <p className="text-slate-500 mt-1">Gérez le panneau d'affichage des matchs à domicile pour la page "Vie Sportive"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Éditeur */}
        <div className="admin-card flex flex-col h-[700px]">
          <label className="block text-sm font-medium mb-4 text-club-blue">Texte des rencontres</label>
          <p className="text-xs text-slate-400 mb-4">
            Modèle suggéré (tapez Entrée pour passer à la ligne) :<br/><br/>
            VENDREDI 15 MAI - 20H30<br/>
            CHAMPIONNAT DE PARIS<br/>
            EXCELLENCE VS MAISONS ALFORT<br/>
            HONNEUR VS US PARIS 2
          </p>
          {loading ? (
            <div className="flex-1 bg-slate-100 animate-pulse rounded-xl" />
          ) : (
            <textarea
              className="admin-input flex-1 font-mono text-sm resize-none mb-4 p-4 leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="VENDREDI 15 MAI - 20H30&#10;CHAMPIONNAT DE PARIS&#10;EXCELLENCE VS MAISONS ALFORT"
            />
          )}
          <button 
            onClick={handleSave} 
            disabled={saving || loading}
            className="admin-btn admin-btn-primary w-full"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
          </button>
        </div>

        {/* Aperçu */}
        <div className="bg-gradient-to-b from-amber-500 to-amber-600 rounded-[2.5rem] p-8 md:p-12 shadow-xl border-[6px] border-club-blue h-[700px] overflow-y-auto relative">
          <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm mb-6 border-b border-amber-600/50 pb-4 relative z-10">Aperçu en direct</h3>
          
          <div className="text-center space-y-6 relative z-10 py-8">
            <h2 className="text-3xl font-black text-club-blue uppercase tracking-widest drop-shadow-sm mb-2">
              PROCHAINES RENCONTRES
            </h2>
            <h3 className="text-2xl font-black text-club-blue uppercase tracking-widest drop-shadow-sm italic">
              A CHARENTON
            </h3>
            
            <div className="w-24 h-1.5 bg-club-blue mx-auto rounded-full my-8"></div>
            
            <div className="text-xl md:text-2xl font-bold text-club-blue leading-loose whitespace-pre-wrap">
              {content ? (
                content.split('\n').map((line, i) => {
                  const isDateOrTime = line.toUpperCase().includes('VENDREDI') || 
                                     line.toUpperCase().includes('SAMEDI') || 
                                     line.toUpperCase().includes('DIMANCHE') || 
                                     (line.toUpperCase().includes('H') && /\d/.test(line));
                  return (
                    <div key={i} className={isDateOrTime ? "text-red-600 my-4 text-2xl italic font-black" : "my-2 font-black italic"}>
                      {line}
                    </div>
                  );
                })
              ) : (
                <span className="opacity-50">Texte d'exemple...</span>
              )}
            </div>
          </div>
          
          {/* Ligne décorative à gauche */}
          <div className="absolute top-0 bottom-0 left-8 w-2 bg-black z-0 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
