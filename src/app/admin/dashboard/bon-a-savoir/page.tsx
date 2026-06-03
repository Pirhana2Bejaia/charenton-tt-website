'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminBonASavoir() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/content?key=bon_a_savoir');
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
          key: 'bon_a_savoir',
          title: 'Bon à Savoir',
          content: content
        })
      });
      if (!res.ok) throw new Error();
      toast.success('Informations sauvegardées avec succès');
    } catch {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Bon à Savoir 💡</h2>
        <p className="text-slate-500 mt-1">Gérez le bloc d'informations pratiques affiché sur la page d'accueil</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Éditeur */}
        <div className="admin-card flex flex-col h-[600px]">
          <label className="block text-sm font-medium mb-4 text-club-blue">Texte d'information</label>
          <p className="text-xs text-slate-400 mb-4">
            Ce texte sera affiché dans un encadré visible sur la page d'accueil.
            Vous pouvez sauter des lignes pour aérer le texte.
          </p>
          {loading ? (
            <div className="flex-1 bg-slate-100 animate-pulse rounded-xl" />
          ) : (
            <textarea
              className="admin-input flex-1 font-medium text-sm resize-none mb-4 p-4 leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Fermeture du gymnase pendant les vacances scolaires..."
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
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm mb-6 border-b border-slate-100 pb-4">Aperçu en direct</h3>
          
          <div className="relative pl-6 py-2">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-full" />
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              Bon à Savoir : <span className="text-2xl">💡</span>
            </h3>
            <div className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
              {content || <span className="opacity-50 italic">Entrez votre texte ici...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
