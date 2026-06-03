'use client';
import { Post } from '@/lib/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PostModal({ post, onClose }: { post: Post | null; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [post]);

  if (!post) return null;

  const hasImages = post.images && post.images.length > 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-fade-in-up m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 truncate pr-4">{post.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {hasImages && (
            <div className="relative bg-slate-900 aspect-video md:aspect-[16/10] flex items-center justify-center">
              <img 
                src={post.images[currentImageIndex]} 
                alt={`${post.title} - ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              {post.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all">
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {post.images.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <p className="text-sm font-medium text-club-red mb-3">
              {new Date(post.date).toLocaleDateString('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">{post.title}</h1>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{post.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
