import { Clock, CreditCard, CalendarCheck } from "lucide-react";

export default function EntrainementsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
      
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-club-blue rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
          <CalendarCheck size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Entraînements & Tarifs</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Rejoignez l'un de nos nombreux créneaux selon votre âge et votre niveau.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Horaires */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-club-blue text-white rounded-2xl flex items-center justify-center">
              <Clock size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Horaires</h2>
          </div>
          
          <ul className="space-y-6">
            <li className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2">
                <div>
                  <span className="font-bold text-slate-800 text-lg block">Lundi</span>
                  <span className="text-sm text-slate-500">Loisirs / Adultes</span>
                </div>
                <span className="px-4 py-2 bg-white rounded-full font-bold text-club-blue shadow-sm">19h00 - 22h00</span>
              </div>
            </li>
            <li className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2">
                <div>
                  <span className="font-bold text-slate-800 text-lg block">Mardi</span>
                  <span className="text-sm text-slate-500">Jeunes / Débutants</span>
                </div>
                <span className="px-4 py-2 bg-white rounded-full font-bold text-club-blue shadow-sm">18h00 - 20h00</span>
              </div>
            </li>
            <li className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2">
                <div>
                  <span className="font-bold text-slate-800 text-lg block">Mercredi</span>
                  <span className="text-sm text-slate-500">Compétiteurs</span>
                </div>
                <span className="px-4 py-2 bg-white rounded-full font-bold text-club-blue shadow-sm">20h00 - 22h30</span>
              </div>
            </li>
            <li className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2">
                <div>
                  <span className="font-bold text-slate-800 text-lg block">Vendredi</span>
                  <span className="text-sm text-slate-500">Jeu libre tous niveaux</span>
                </div>
                <span className="px-4 py-2 bg-white rounded-full font-bold text-club-blue shadow-sm">18h00 - 22h30</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Tarifs */}
        <div className="bg-gradient-to-br from-club-red to-red-800 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0"></div>
          
          <div className="relative z-10 flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <CreditCard size={28} />
            </div>
            <h2 className="text-3xl font-bold">Tarifs 2026-2027</h2>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-red-100 font-medium mb-2">Cotisation Adulte</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white">180€</span>
                <span className="text-red-200">/ an</span>
              </div>
              <p className="text-sm text-red-100 mt-4">Accès à tous les créneaux loisirs et jeu libre.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-red-100 font-medium mb-2">Cotisation Jeune (-18 ans)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-white">140€</span>
                <span className="text-red-200">/ an</span>
              </div>
              <p className="text-sm text-red-100 mt-4">Inclut les entraînements dirigés encadrés.</p>
            </div>
          </div>

          <div className="mt-8 relative z-10 text-center">
            <a href="/contact" className="inline-block w-full py-4 bg-white text-club-red font-bold rounded-xl hover:bg-red-50 transition-colors">
              Nous contacter pour un essai
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
