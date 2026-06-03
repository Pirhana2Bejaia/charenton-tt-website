'use client';

import { useEffect, useState } from 'react';
import { Download, FileDown, Info } from 'lucide-react';
import { Document } from '@/lib/types';

export default function Stages() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch('/api/documents?type=stage');
        if (res.ok) {
          const data: Document[] = await res.json();
          setDocuments(data);
        } else {
          setDocuments([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-club-blue to-club-blue-dark py-20 px-4 mb-16 rounded-b-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Stages</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Découvrez nos stages de perfectionnement organisés pendant les vacances scolaires.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-slate-200 border-t-club-blue rounded-full animate-spin"></div></div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {documents.map((doc, idx) => (
              <div key={doc.id} className={`bg-white rounded-[2rem] p-6 shadow-md border border-slate-100 animate-fade-in-up stagger-${(idx % 5) + 1}`}>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{doc.title}</h3>
                <div className="aspect-[3/4] w-full bg-slate-100 rounded-xl mb-6 overflow-hidden border border-slate-200">
                  {doc.file_url ? (
                    <img src={doc.file_url} alt={doc.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileDown size={48} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <a 
                  href={doc.file_url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-club-blue hover:bg-club-blue-light text-white font-bold rounded-xl transition-all"
                >
                  <Download size={20} />
                  Télécharger la fiche
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Les fiches de stage seront bientôt disponibles.</h3>
            <p className="text-slate-500">Les fiches d&apos;inscription pour les prochains stages seront publiées ici à l&apos;approche des vacances scolaires.</p>
          </div>
        )}

      </div>
    </div>
  );
}
