'use client';

import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('Votre message a été envoyé avec succès !');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Erreur');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'envoi du message.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-club-blue to-club-blue-dark py-10 px-4 mb-16 rounded-b-[3rem] shadow-xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Contactez-nous</h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
          Une question ? Envie de nous rejoindre ? N'hésitez pas à nous écrire.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Formulaire */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Envoyer un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-2">Nom / Prénom <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-club-blue focus:ring-2 focus:ring-club-blue/20 transition-all outline-none"
                  placeholder="Jean Dupont"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-2">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-club-blue focus:ring-2 focus:ring-club-blue/20 transition-all outline-none"
                  placeholder="jean.dupont@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 ml-2">Sujet <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-club-blue focus:ring-2 focus:ring-club-blue/20 transition-all outline-none"
                  placeholder="Demande d'information..."
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-2">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-club-blue focus:ring-2 focus:ring-club-blue/20 transition-all outline-none resize-none"
                  placeholder="Votre message ici..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-club-red hover:bg-red-600 text-white font-extrabold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-lg disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Coordonnées */}
          <div className="flex flex-col justify-center space-y-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Où nous trouver</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 shrink-0 bg-blue-50 text-club-blue rounded-2xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Gymnase Nelson Paillou</h3>
                    <p className="text-slate-600 leading-relaxed">
                      4bis avenue Anatole France<br />
                      94220 Charenton-le-Pont
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 shrink-0 bg-red-50 text-club-red rounded-2xl flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Téléphone</h3>
                    <p className="text-slate-600">Jean-Marc Gagnier : 06 15 71 01 01</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 shrink-0 bg-blue-50 text-club-blue rounded-2xl flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Email</h3>
                    <a href="mailto:charentontt@gmail.com" className="text-club-blue hover:underline">
                      charentontt@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 shrink-0 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">Réseaux Sociaux</h3>
                    <a href="https://www.instagram.com/charentontt/" target="_blank" rel="noopener noreferrer" className="text-club-blue hover:underline">
                      Instagram Charenton TT
                    </a>
                  </div>
                </div>
              </div>
            </div>
            

          </div>

        </div>
      </div>
    </div>
  );
}
