'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Users,
  Trophy,
  FileDown,
  GraduationCap,
  History,
  LogOut,
  CalendarDays,
  Lightbulb,
} from 'lucide-react';
import toast from 'react-hot-toast';

const menuItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/dashboard/posts', label: 'Posts', icon: FileText },
  { href: '/admin/dashboard/ticker', label: 'Bandeau Actualité', icon: Megaphone },
  { href: '/admin/dashboard/bureau', label: 'Bureau', icon: Users },
  { href: '/admin/dashboard/equipes', label: 'Équipes', icon: Trophy },
  { href: '/admin/dashboard/inscriptions', label: 'Inscriptions', icon: FileDown },
  { href: '/admin/dashboard/stages', label: 'Stages', icon: GraduationCap },
  { href: '/admin/dashboard/historique', label: 'Historique', icon: History },
  { href: '/admin/dashboard/rencontres', label: 'Rencontres', icon: CalendarDays },
  { href: '/admin/dashboard/bon-a-savoir', label: 'Bon à Savoir', icon: Lightbulb },
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' });
    toast.success('Déconnecté');
    if (onClose) onClose();
    router.push('/admin');
  }

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-club-blue flex items-center justify-center">
            <span className="text-white text-sm font-black">C</span>
          </div>
          <span className="font-extrabold text-lg text-club-blue">
            Admin<span className="text-club-red">CTT</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-club-blue text-white shadow-md shadow-club-blue/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-club-blue'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-club-red transition-all w-full"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
