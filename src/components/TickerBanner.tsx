'use client';
import { TickerItem } from '@/lib/types';
import Link from 'next/link';

export default function TickerBanner({ items }: { items: TickerItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-club-blue text-white overflow-hidden py-3 border-b border-club-blue-light whitespace-nowrap flex items-center">
      <div className="flex ticker-animate w-max">
        {[...items, ...items, ...items].map((item, index) => {
          const content = (
            <div className="flex items-center gap-4 mx-8" key={`${item.id}-${index}`}>
              {item.image_url && (
                <img src={item.image_url} alt="" className="h-8 object-contain rounded" />
              )}
              <span className="font-semibold text-sm tracking-wide uppercase">{item.text}</span>
              <span className="text-club-red mx-4">•</span>
            </div>
          );

          if (item.link) {
            return (
              <Link href={item.link} key={`${item.id}-${index}`} className="hover:text-blue-200 transition-colors">
                {content}
              </Link>
            );
          }
          return <div key={`${item.id}-${index}`}>{content}</div>;
        })}
      </div>
    </div>
  );
}
