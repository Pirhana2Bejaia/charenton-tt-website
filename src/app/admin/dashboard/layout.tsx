'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Menu } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth');
        const data = await res.json();
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAuthenticated(true);
        }
      } catch {
        router.push('/admin');
      }
    }
    checkAuth();
  }, [router]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-club-blue/20 border-t-club-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-club-blue flex items-center justify-center">
              <span className="text-white text-sm font-black">C</span>
            </div>
            <span className="font-extrabold text-lg text-club-blue">
              Admin<span className="text-club-red">CTT</span>
            </span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
