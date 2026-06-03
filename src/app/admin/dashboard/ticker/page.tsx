'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/ImageUploader';
import { TickerItem, TickerFormData } from '@/lib/types';

export default function AdminTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<TickerItem | null>(null);
  
  const [formData, setFormData] = useState<TickerFormData>({
    text: '',
    image_url: '',
    link: '',
    active: true
  });

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch('/api/ticker');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems(data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }

  function handleAddNew() {
    setCurrentItem(null);
    setFormData({ text: '', image_url: '', link: '', active: true });
    setIsEditing(true);
  }

  function handleEdit(item: TickerItem) {
    setCurrentItem(item);
    setFormData({
      text: item.text,
      image_url: item.image_url || '',
      link: item.link || '',
      active: item.active
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet élément ?')) return;
    try {
      await fetch(`/api/ticker/${id}`, { method: 'DELETE' });
      toast.success('Supprimé');
      fetchItems();
    } catch { toast.error('Erreur'); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = currentItem ? `/api/ticker/${currentItem.id}` : '/api/ticker';
      const method = currentItem ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      toast.success('Enregistré');
      setIsEditing(false);
      fetchItems();
    } catch { toast.error('Erreur'); }
  }

  async function handleToggleActive(item: TickerItem) {
    try {
      await fetch(`/api/ticker/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !item.active })
      });
      fetchItems();
    } catch { toast.error('Erreur'); }
  }

  if (isEditing) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{currentItem ? 'Modifier' : 'Nouveau'}</h2>
        <form onSubmit={handleSubmit} className="admin-card space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Texte affiché</label>
            <input required type="text" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="admin-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Lien (optionnel)</label>
            <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="admin-input" placeholder="ex: /inscriptions ou https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Petite image (optionnel)</label>
            <ImageUploader 
              multiple={false} 
              images={formData.image_url ? [formData.image_url] : []} 
              onChange={imgs => setFormData({...formData, image_url: imgs[0] || ''})} 
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-4 h-4 text-club-blue" />
            <label htmlFor="active">Actif (affiché sur le site)</label>
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
        <h2 className="text-2xl font-bold text-slate-900">Bandeau Actualité</h2>
        <button onClick={handleAddNew} className="admin-btn admin-btn-primary"><Plus size={18} /> Ajouter</button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map(i => <div key={i} className="h-16 bg-slate-200 rounded-xl" />)}
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className={`admin-card flex items-center justify-between ${!item.active && 'opacity-60'}`}>
              <div className="flex items-center gap-4">
                <input 
                  type="checkbox" 
                  checked={item.active} 
                  onChange={() => handleToggleActive(item)}
                  className="w-5 h-5 text-club-blue cursor-pointer"
                  title="Activer/Désactiver"
                />
                {item.image_url && <img src={item.image_url} alt="" className="w-8 h-8 object-contain" />}
                <div>
                  <p className="font-semibold text-slate-900">{item.text}</p>
                  {item.link && <p className="text-xs text-blue-500">{item.link}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">Aucune actualité dans le bandeau.</p>
      )}
    </div>
  );
}
