'use client';

import { useEffect, useState } from 'react';
import { Download, FileDown, MapPin, Mail, Phone } from 'lucide-react';
import { Document } from '@/lib/types';

export default function Inscriptions() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch('/api/documents?type=inscription');
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
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Inscriptions</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Rejoignez le club pour la saison. Retrouvez ici tous les formulaires nécessaires.
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
                  Télécharger
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm mb-16">
            <h3 className="text-xl font-bold text-slate-400 mb-2">Les formulaires d&apos;inscription seront bientôt disponibles.</h3>
            <p className="text-slate-500">Les formulaires d&apos;inscription pour la prochaine saison seront mis en ligne prochainement.</p>
          </div>
        )}

        {/* Info complementaire */}
        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-club-blue mb-4">Pour finaliser votre inscription</h3>
          <p className="text-slate-600 mb-6">
            Veuillez remettre votre dossier complet (formulaire rempli, certificat médical, paiement) aux responsables lors des entraînements.
          </p>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-club-red" />
              <span>Espace Nelson Paillou, 4bis avenue Anatole France</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-club-red" />
              <span>charentontt@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-club-red" />
              <span>06 15 71 01 01</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
