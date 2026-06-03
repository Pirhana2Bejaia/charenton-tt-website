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
            VENDREDI 15 MAI<br/>
            20H30<br/>
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
              placeholder="VENDREDI 15 MAI&#10;20H30&#10;CHAMPIONNAT DE PARIS&#10;EXCELLENCE VS MAISONS ALFORT"
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
        <div className="bg-gradient-to-br from-slate-900 to-club-blue-dark rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-700/50 h-[700px] overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-club-blue rounded-full blur-3xl opacity-20 z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-club-red rounded-full blur-3xl opacity-10 z-0" />
          
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm mb-6 border-b border-slate-700 pb-4 relative z-10">Aperçu en direct</h3>
          
          <div className="text-center relative z-10 py-4">
            <div className="flex flex-col items-center justify-center mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">
                PROCHAINES RENCONTRES
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-8 bg-club-red rounded-full"></div>
                <h3 className="text-lg font-bold text-blue-200 uppercase tracking-widest">
                  A CHARENTON
                </h3>
                <div className="h-0.5 w-8 bg-club-red rounded-full"></div>
              </div>
            </div>
            
            <div className="text-lg font-medium leading-relaxed flex flex-col gap-1 text-slate-200">
              {content ? (
                content.split('\n').map((line, i) => {
                  const isDateOrTime = /^(LUNDI|MARDI|MERCREDI|JEUDI|VENDREDI|SAMEDI|DIMANCHE)\b/i.test(line.trim()) || 
                                     /^\d{1,2}H\d{0,2}/i.test(line.trim());
                  return (
                    <div key={i} className={isDateOrTime ? "text-club-red mt-6 mb-2 text-2xl font-black" : ""}>
                      {line}
                    </div>
                  );
                })
              ) : (
                <span className="opacity-50 text-slate-400">Texte d'exemple...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
