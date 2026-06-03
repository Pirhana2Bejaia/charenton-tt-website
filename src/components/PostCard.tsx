'use client';
import { Post } from '@/lib/types';

export default function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const hasImage = post.images && post.images.length > 0;
  
  return (
    <div className="post-grid-item rounded-3xl" onClick={onClick}>
      {hasImage ? (
        <img 
          src={post.images[0]} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-club-blue to-club-blue-dark flex items-center justify-center p-6 text-center">
          <span className="text-white font-bold text-xl">{post.title}</span>
        </div>
      )}
      
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">{post.title}</h3>
        <p className="text-blue-100 text-sm font-medium drop-shadow-md">
          {new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
}
