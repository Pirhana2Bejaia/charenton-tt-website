'use client';

import { useEffect, useState } from 'react';
import TickerBanner from '@/components/TickerBanner';
import PostCard from '@/components/PostCard';
import PostModal from '@/components/PostModal';
import YearFilter from '@/components/YearFilter';
import { supabase } from '@/lib/supabase';
import { Post, TickerItem } from '@/lib/types';

const DEMO_TICKER: TickerItem[] = [
  { id: '1', text: 'Victoire de la Nationale 2 ce weekend !', active: true, order_index: 0, image_url: null, link: null },
  { id: '2', text: 'Inscriptions ouvertes pour la saison prochaine', active: true, order_index: 1, image_url: null, link: '/inscriptions' },
];

const DEMO_POSTS: Post[] = [
  {
    id: '1',
    title: 'L\'équipe première Championne !',
    description: 'Notre équipe de Nationale a brillamment remporté le titre ce weekend.',
    date: '2026-05-15',
    year: 2026,
    images: ['https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1000&auto=format&fit=crop'],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Nouveau gymnase inauguré',
    description: 'Les travaux sont finis, nous avons de nouvelles tables.',
    date: '2026-03-10',
    year: 2026,
    images: ['https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?q=80&w=1000&auto=format&fit=crop'],
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Stage d\'hiver',
    description: 'Retour en images sur le stage d\'hiver des jeunes.',
    date: '2025-12-20',
    year: 2025,
    images: ['https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?q=80&w=1000&auto=format&fit=crop'],
    created_at: new Date().toISOString()
  }
];

export default function Home() {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Ticker
        const { data: tickerData, error: tickerError } = await supabase
          .from('ticker_items')
          .select('*')
          .eq('active', true)
          .order('order_index');
          
        if (tickerError) throw tickerError;
        setTickerItems(tickerData && tickerData.length > 0 ? tickerData : DEMO_TICKER);

        // Years
        const { data: yearsData, error: yearsError } = await supabase
          .from('posts')
          .select('year');
          
        if (yearsError) throw yearsError;
        
        const uniqueYears = Array.from(new Set(yearsData?.map(d => d.year) || []))
          .sort((a, b) => b - a); // Descending
          
        if (uniqueYears.length > 0) {
          setYears(uniqueYears);
          if (!uniqueYears.includes(selectedYear)) {
            setSelectedYear(uniqueYears[0]);
          }
        } else {
          setYears([2026, 2025]);
          setSelectedYear(2026);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setTickerItems(DEMO_TICKER);
        setYears([2026, 2025]);
      }
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('year', selectedYear)
          .order('date', { ascending: false });
          
        if (postsError) throw postsError;
        
        if (postsData && postsData.length > 0) {
          setPosts(postsData);
        } else {
          // Use demo data filtered by year if Supabase is empty
          setPosts(DEMO_POSTS.filter(p => p.year === selectedYear));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts(DEMO_POSTS.filter(p => p.year === selectedYear));
      } finally {
        setLoading(false);
      }
    }

    if (years.length > 0) {
      fetchPosts();
    }
  }, [selectedYear, years]);

  return (
    <div className="pb-24">
      {/* Bandeau d'actualité */}
      {tickerItems.length > 0 && <TickerBanner items={tickerItems} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        {/* Titre Section */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-10 bg-club-red rounded-full" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Vie du Club
          </h1>
        </div>

        {/* Filtre Années */}
        <YearFilter 
          years={years} 
          selectedYear={selectedYear} 
          onSelectYear={setSelectedYear} 
        />

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
            <h3 className="text-xl font-bold text-slate-400 mb-2">Aucun post pour cette année</h3>
            <p className="text-slate-500">Revenez plus tard pour de nouvelles actualités.</p>
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
