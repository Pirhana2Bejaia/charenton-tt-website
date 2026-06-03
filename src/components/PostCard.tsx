'use client';
import { Post } from '@/lib/types';

export default function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const hasImage = post.images && post.images.length > 0;
  
  return (
    <div className="post-grid-item group rounded-3xl" onClick={onClick}>
      {hasImage ? (
        <img 
          src={post.images[0]} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-club-blue to-club-blue-dark" />
      )}
      
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent">
        <div className="transform transition-transform duration-300 translate-y-6 group-hover:translate-y-0">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">{post.title}</h3>
          <p className="text-blue-200 text-sm font-medium drop-shadow-md mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
