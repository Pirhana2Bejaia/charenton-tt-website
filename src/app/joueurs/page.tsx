'use client';

import Script from 'next/script';

export default function Joueurs() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="w-[92%] max-w-6xl mx-auto bg-gradient-to-br from-club-blue to-club-blue-dark py-16 px-4 mt-6 mb-16 rounded-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Nos Joueurs</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Découvrez la liste des licenciés du club et leurs classements actualisés.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          <iframe
            src="https://www.pongiste.fr/include/pages/joueurs.php?num_club=08940052"
            width="100%"
            height="800"
            scrolling="auto"
            frameBorder="0"
            title="Classement des joueurs Charenton TT"
            style={{ minHeight: '800px', border: 'none' }}
          />
        </div>
        <p className="text-center text-slate-400 text-sm mt-6">
          Données fournies par pongiste.fr — Classements officiels FFTT
        </p>
      </div>

      <Script src="https://www.pongiste.fr/include/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="https://www.pongiste.fr/include/setIframeHeight-master/dist/set-iframe-height-parent.js" strategy="afterInteractive" />
    </div>
  );
}
