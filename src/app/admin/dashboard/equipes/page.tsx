'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Team, TeamFormData } from '@/lib/types';

export default function AdminEquipes() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  
  const [formData, setFormData] = useState<TeamFormData>({
    name: '', pool: '', players: []
  });
  const [newPlayer, setNewPlayer] = useState('');

  useEffect(() => { fetchTeams(); }, []);

  async function fetchTeams() {
    setLoading(true);
    try {
      const res = await fetch('/api/equipes');
      const data = await res.json();
      if (!res.ok) throw new Error();
      setTeams(data || []);
    } catch { toast.error('Erreur chargement'); } finally { setLoading(false); }
  }

  function handleAddNew() {
    setCurrentTeam(null);
    setFormData({ name: '', pool: '', players: [] });
    setIsEditing(true);
  }

  function handleEdit(t: Team) {
    setCurrentTeam(t);
    setFormData({ name: t.name, pool: t.pool, players: t.players || [] });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette équipe ?')) return;
    try {
      await fetch(`/api/equipes/${id}`, { method: 'DELETE' });
      toast.success('Supprimée');
      fetchTeams();
    } catch { toast.error('Erreur'); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = currentTeam ? `/api/equipes/${currentTeam.id}` : '/api/equipes';
      await fetch(url, {
        method: currentTeam ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      toast.success('Enregistré');
      setIsEditing(false);
      fetchTeams();
    } catch { toast.error('Erreur'); }
  }

  function addPlayer() {
    if (!newPlayer.trim()) return;
    setFormData({ ...formData, players: [...formData.players, newPlayer.trim()] });
    setNewPlayer('');
  }

  function removePlayer(idx: number) {
    setFormData({ ...formData, players: formData.players.filter((_, i) => i !== idx) });
  }

  if (isEditing) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{currentTeam ? 'Modifier' : 'Nouvelle Équipe'}</h2>
        <form onSubmit={handleSubmit} className="admin-card space-y-6 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom (ex: Nationale 2)</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="admin-input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Poule (ex: Poule A)</label>
              <input required type="text" value={formData.pool} onChange={e => setFormData({...formData, pool: e.target.value})} className="admin-input" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Joueurs</label>
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={newPlayer} 
                onChange={e => setNewPlayer(e.target.value)} 
                className="admin-input flex-1" 
                placeholder="Nom du joueur"
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPlayer(); } }}
              />
              <button type="button" onClick={addPlayer} className="admin-btn admin-btn-primary px-4"><Plus size={18}/></button>
            </div>
            <div className="space-y-2">
              {formData.players.map((p, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                  <span>{p}</span>
                  <button type="button" onClick={() => removePlayer(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={16}/></button>
                </div>
              ))}
            </div>
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
        <h2 className="text-2xl font-bold text-slate-900">Équipes</h2>
        <button onClick={handleAddNew} className="admin-btn admin-btn-primary"><Plus size={18} /> Ajouter</button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map(i => <div key={i} className="h-20 bg-slate-200 rounded-xl" />)}
        </div>
      ) : teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map(t => (
            <div key={t.id} className="admin-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md mt-1">{t.pool}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="text-sm text-slate-500">{t.players?.length || 0} joueurs</p>
            </div>
          ))}
        </div>
      ) : <p>Aucune équipe.</p>}
    </div>
  );
}
