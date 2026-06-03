'use client';

import {
  FileText,
  Megaphone,
  Users,
  Trophy,
  FileDown,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    title: 'Posts',
    description: 'Gérer les publications du club',
    href: '/admin/dashboard/posts',
    icon: FileText,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Bandeau Actualité',
    description: 'Modifier le bandeau défilant',
    href: '/admin/dashboard/ticker',
    icon: Megaphone,
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Bureau',
    description: 'Membres du bureau du club',
    href: '/admin/dashboard/bureau',
    icon: Users,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Équipes',
    description: 'Équipes et compositions',
    href: '/admin/dashboard/equipes',
    icon: Trophy,
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    title: 'Inscriptions',
    description: 'Formulaires d\'inscription',
    href: '/admin/dashboard/inscriptions',
    icon: FileDown,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Stages',
    description: 'Fiches de stage',
    href: '/admin/dashboard/stages',
    icon: GraduationCap,
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-slate-500 mt-1">
          Bienvenue dans l&apos;administration du site Charenton TT
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <FileText className="text-blue-600" size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">—</p>
            <p className="text-sm text-slate-500">Posts publiés</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <Users className="text-green-600" size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">—</p>
            <p className="text-sm text-slate-500">Membres bureau</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Trophy className="text-yellow-600" size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">—</p>
            <p className="text-sm text-slate-500">Équipes</p>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Gestion du contenu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <div className="admin-card group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-club-blue transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {section.description}
                    </p>
                  </div>
                  <TrendingUp
                    size={16}
                    className="text-slate-300 group-hover:text-club-blue transition-colors mt-1"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
