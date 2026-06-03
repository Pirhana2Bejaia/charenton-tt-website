'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminHistorique() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/content?key=historique');
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
          key: 'historique',
          title: 'Historique du Club',
          content: content
        })
      });
      if (!res.ok) throw new Error();
      toast.success('Historique sauvegardé avec succès');
    } catch {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Historique du Club</h2>
        <p className="text-slate-500 mt-1">Le texte affiché sur la page "Le Club"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Éditeur */}
        <div className="admin-card flex flex-col h-[700px]">
          <label className="block text-sm font-medium mb-4 text-club-blue">Texte de l'historique (Markdown supporté pour les dates)</label>
          <p className="text-xs text-slate-400 mb-4">
            Pour créer la frise chronologique, écrivez la date suivie d'un tiret cadratin "—". <br/>
            Exemple: "1971 — Champion de France de Nationale 1"
          </p>
          {loading ? (
            <div className="flex-1 bg-slate-100 animate-pulse rounded-xl" />
          ) : (
            <textarea
              className="admin-input flex-1 font-mono text-sm resize-none mb-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Avril 1953 — Fondation du club..."
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
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm h-[700px] overflow-y-auto">
          <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm mb-6">Aperçu en direct</h3>
          <div className="prose prose-sm max-w-none">
            {content.split('\n\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;
              
              const parts = paragraph.split('—');
              if (parts.length > 1 && parts[0].length < 20) {
                return (
                  <div key={index} className="flex gap-4 py-3 border-b border-slate-100 last:border-0">
                    <div className="text-club-blue font-black min-w-[80px]">
                      {parts[0].trim()}
                    </div>
                    <div className="text-slate-600">
                      {parts.slice(1).join('—').trim()}
                    </div>
                  </div>
                );
              }
              
              return (
                <p key={index} className="text-slate-600 py-2">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
