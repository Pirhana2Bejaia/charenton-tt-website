'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/ImageUploader';
import { Document, DocumentFormData } from '@/lib/types';

export default function AdminStages() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '', file_url: '', type: 'stage'
  });

  useEffect(() => { fetchDocs(); }, []);

  async function fetchDocs() {
    setLoading(true);
    try {
      const res = await fetch('/api/documents?type=stage');
      const data = await res.json();
      if (!res.ok) throw new Error();
      setDocs(data || []);
    } catch { toast.error('Erreur chargement'); } finally { setLoading(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce document ?')) return;
    try {
      await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      toast.success('Supprimé');
      fetchDocs();
    } catch { toast.error('Erreur'); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.file_url) { toast.error('Veuillez ajouter un fichier'); return; }
    
    try {
      await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      toast.success('Ajouté');
      setIsEditing(false);
      fetchDocs();
    } catch { toast.error('Erreur'); }
  }

  if (isEditing) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Nouvelle Fiche de Stage</h2>
        <form onSubmit={handleSubmit} className="admin-card space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Titre (ex: Stage de Pâques)</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fichier (Image de la fiche)</label>
            <ImageUploader multiple={false} images={formData.file_url ? [formData.file_url] : []} onChange={imgs => setFormData({...formData, file_url: imgs[0] || ''})} />
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => setIsEditing(false)} className="admin-btn admin-btn-ghost">Annuler</button>
            <button type="submit" className="admin-btn admin-btn-primary">Ajouter</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Stages</h2>
        <button onClick={() => { setFormData({title:'', file_url:'', type:'stage'}); setIsEditing(true); }} className="admin-btn admin-btn-primary"><Plus size={18} /> Ajouter</button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
        </div>
      ) : docs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {docs.map(doc => (
            <div key={doc.id} className="admin-card">
              <div className="aspect-[3/4] bg-slate-100 rounded-lg mb-4 overflow-hidden">
                {doc.file_url && <img src={doc.file_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <h3 className="font-bold text-sm mb-3 truncate">{doc.title}</h3>
              <button onClick={() => handleDelete(doc.id)} className="w-full admin-btn admin-btn-danger text-sm py-2">
                <Trash2 size={16} /> Supprimer
              </button>
            </div>
          ))}
        </div>
      ) : <p>Aucune fiche de stage.</p>}
    </div>
  );
}
