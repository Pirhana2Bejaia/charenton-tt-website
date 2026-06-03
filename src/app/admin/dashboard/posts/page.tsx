'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/ImageUploader';
import { Post, PostFormData } from '@/lib/types';

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    images: []
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des posts');
    } finally {
      setLoading(false);
    }
  }

  function handleAddNew() {
    setCurrentPost(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      images: []
    });
    setIsEditing(true);
  }

  function handleEdit(post: Post) {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      date: post.date.split('T')[0],
      images: post.images || []
    });
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Post supprimé');
      fetchPosts();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = currentPost ? `/api/posts/${currentPost.id}` : '/api/posts';
      const method = currentPost ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error();
      
      toast.success(`Post ${currentPost ? 'modifié' : 'créé'}`);
      setIsEditing(false);
      fetchPosts();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  }

  if (isEditing) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">{currentPost ? 'Modifier le Post' : 'Nouveau Post'}</h2>
        <form onSubmit={handleSubmit} className="admin-card space-y-6 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Titre</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="admin-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="admin-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea 
              required
              rows={6}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Images</label>
            <ImageUploader 
              multiple 
              images={formData.images} 
              onChange={images => setFormData({...formData, images})} 
            />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setIsEditing(false)} className="admin-btn admin-btn-ghost">
              Annuler
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Gestion des Posts</h2>
        <button onClick={handleAddNew} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Nouveau Post
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl" />)}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {posts.map(post => (
            <div key={post.id} className="admin-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                {post.images && post.images.length > 0 ? (
                  <img src={post.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">Pas d'image</div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900">{post.title}</h3>
                  <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString('fr-FR')} • Année {post.year}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">Aucun post. Créez-en un nouveau !</p>
      )}
    </div>
  );
}
