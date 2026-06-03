'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/ImageUploader';
import { BureauMember, BureauFormData } from '@/lib/types';

export default function AdminBureau() {
  const [members, setMembers] = useState<BureauMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<BureauMember | null>(null);
  
  const [formData, setFormData] = useState<BureauFormData>({
    first_name: '', last_name: '', role: '', photo_url: ''
  });

  useEffect(() => { fetchMembers(); }, []);

  async function fetchMembers() {
    setLoading(true);
    try {
      const res = await fetch('/api/bureau');
      const data = await res.json();
      if (!res.ok) throw new Error();
      setMembers(data || []);
    } catch { toast.error('Erreur chargement'); } finally { setLoading(false); }
  }

  function handleAddNew() {
    setCurrentMember(null);
    setFormData({ first_name: '', last_name: '', role: '', photo_url: '' });
    setIsEditing(true);
  }

  function handleEdit(m: BureauMember) {
    setCurrentMember(m);
    setFormData({ first_name: m.first_name, last_name: m.last_name, role: m.role, photo_url: m.photo_url || '' });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce membre ?')) return;
    try {
      await fetch(`/api/bureau/${id}`, { method: 'DELETE' });
      toast.success('Supprimé');
      fetchMembers();
    } catch { toast.error('Erreur'); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = currentMember ? `/api/bureau/${currentMember.id}` : '/api/bureau';
      await fetch(url, {
        method: currentMember ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      toast.success('Enregistré');
      setIsEditing(false);
      fetchMembers();
    } catch { toast.error('Erreur'); }
  }

  if (isEditing) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{currentMember ? 'Modifier' : 'Nouveau Membre'}</h2>
        <form onSubmit={handleSubmit} className="admin-card space-y-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom</label>
              <input required type="text" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nom</label>
              <input required type="text" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="admin-input" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rôle (ex: Président)</label>
            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="admin-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Photo (optionnelle)</label>
            <ImageUploader multiple={false} images={formData.photo_url ? [formData.photo_url] : []} onChange={imgs => setFormData({...formData, photo_url: imgs[0] || ''})} />
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => setIsEditing(false)} className="admin-btn admin-btn-ghost">Annuler</button>
            <button type="submit" className="admin-btn admin-btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Membres du Bureau</h2>
        <button onClick={handleAddNew} className="admin-btn admin-btn-primary"><Plus size={18} /> Ajouter</button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map(i => <div key={i} className="h-20 bg-slate-200 rounded-xl" />)}
        </div>
      ) : members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map(m => (
            <div key={m.id} className="admin-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                {m.photo_url ? (
                  <img src={m.photo_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-club-blue text-white flex items-center justify-center font-bold">
                    {m.first_name[0]}{m.last_name[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-bold">{m.first_name} {m.last_name}</h3>
                  <p className="text-sm text-club-red">{m.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(m)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(m.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : <p>Aucun membre.</p>}
    </div>
  );
}
