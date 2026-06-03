'use client';

import { useEffect, useState } from 'react';
import TickerBanner from '@/components/TickerBanner';
import PostCard from '@/components/PostCard';
import PostModal from '@/components/PostModal';
import YearFilter from '@/components/YearFilter';
import { Post, TickerItem } from '@/lib/types';

export default function Home() {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [bonASavoir, setBonASavoir] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch ticker via API route
        const tickerRes = await fetch('/api/ticker');
        if (tickerRes.ok) {
          const tickerData = await tickerRes.json();
          const activeItems = (tickerData || []).filter((t: TickerItem) => t.active);
          setTickerItems(activeItems);
        }

        // Fetch bon a savoir
        const basRes = await fetch('/api/content?key=bon_a_savoir');
        if (basRes.ok) {
          const basData = await basRes.json();
          if (basData && basData.content) {
            setBonASavoir(basData.content);
          }
        }

        // Fetch all posts to extract years
        const postsRes = await fetch('/api/posts');
        if (postsRes.ok) {
          const allPosts: Post[] = await postsRes.json();
          const uniqueYears = Array.from(new Set(allPosts.map(p => p.year)))
            .sort((a, b) => b - a);
          if (uniqueYears.length > 0) {
            setYears(uniqueYears);
            if (!uniqueYears.includes(selectedYear)) {
              setSelectedYear(uniqueYears[0]);
            }
          }
        }
      } catch (error) {
        console.error('Erreur chargement données:', error);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?year=${selectedYear}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Erreur chargement posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    if (years.length > 0) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [selectedYear, years]);

  return (
    <div className="pb-24">
      {/* Bandeau d'actualité */}
      {tickerItems.length > 0 && <TickerBanner items={tickerItems} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        {/* Bon à Savoir */}
        {bonASavoir && (
          <div className="mb-16">
            <div className="relative pl-6 py-2">
              {/* Ligne verticale jaune plus foncée */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-full" />
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Bon à Savoir :
                </h2>
                <div className="text-slate-700 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                  {bonASavoir}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Titre Section */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-10 bg-club-red rounded-full" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Vie du Club
          </h1>
        </div>

        {/* Filtre Années */}
        {years.length > 0 && (
          <YearFilter 
            years={years} 
            selectedYear={selectedYear} 
            onSelectYear={setSelectedYear} 
          />
        )}

        {/* Grille de Posts */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <div key={post.id} className={`animate-fade-in-up stagger-${(idx % 5) + 1}`}>
                <PostCard 
                  post={post} 
                  onClick={() => setSelectedPost(post)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-400 mb-2">Aucun post pour le moment</h3>
            <p className="text-slate-500">Ajoutez du contenu depuis le panneau d&apos;administration.</p>
          </div>
        )}
      </div>

      {/* Modal Détail Post */}
      <PostModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </div>
  );
}
