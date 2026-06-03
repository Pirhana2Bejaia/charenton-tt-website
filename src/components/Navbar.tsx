'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  {
    href: '/le-club',
    label: 'Le Club',
    sub: [
      { href: '/le-club', label: 'Bureau & Historique' },
    ],
  },
  { href: '/joueurs', label: 'Joueurs' },
  { href: '/top-progression', label: 'Top Progression' },
  { href: '/vie-sportive', label: 'Vie Sportive' },
  { href: '/inscriptions', label: 'Inscriptions' },
  { href: '/stages', label: 'Stages' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Logo Charenton TT" className="w-10 h-12 object-contain" />
            <span className="text-club-blue">
              Charenton<span className="text-club-red">TT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.sub && link.sub.some((s) => pathname === s.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-club-blue bg-blue-50'
                      : 'text-slate-600 hover:text-club-blue hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-club-blue bg-blue-50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
