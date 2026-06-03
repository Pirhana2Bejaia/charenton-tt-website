'use client';

import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Instagram, Youtube, ExternalLink } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-club-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Club Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              Charenton<span className="text-club-red">TT</span>
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Club de tennis de table de Charenton-le-Pont, fondé en 1953.
              De l&apos;initiation à la compétition de haut niveau.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-300">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-blue-200">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-club-red" />
                <span>
                  Espace Nelson Paillou
                  <br />
                  4bis avenue Anatole France
                  <br />
                  94220 Charenton-le-Pont
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-club-red" />
                <span>06 15 71 01 01</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-club-red" />
                <a
                  href="mailto:charentontt@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  charentontt@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Liens */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-300">
              Liens utiles
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://www.instagram.com/charentontt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <Instagram size={16} />
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@CharentonTT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <Youtube size={16} />
                YouTube
              </a>
              <a
                href="https://www.fftt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
                FFTT
              </a>
              <a
                href="https://www.charenton.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
                Ville de Charenton
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-blue-300">
          <p>
            © {new Date().getFullYear()} Charenton Tennis de Table. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
