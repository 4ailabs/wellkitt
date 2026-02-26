import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FooterModern: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'Lora, serif' }}>
            Wellkitt_
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="flex-1 max-w-md">
              <div className="rounded-2xl p-8 bg-white border border-slate-100">
                <h3
                  className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-6"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Únete a nuestro newsletter y obtén 20% de descuento en tu primera compra.
                </h3>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu Email"
                    className="flex-1 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-brand-green-600 hover:bg-brand-green-700 transition-colors"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Unirme
                  </button>
                </form>
              </div>
              <p className="text-sm text-slate-400 mt-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Creado por <span className="font-semibold text-slate-600">Wellkitt</span> &copy; 2026
              </p>
            </div>

            <div className="flex gap-16 sm:gap-20" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4 text-sm">Páginas</h4>
                <ul className="space-y-3">
                  {['Inicio', 'Tienda', 'Categorías', 'Soporte'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4 text-sm">Información</h4>
                <ul className="space-y-3">
                  {['Términos y Condiciones', 'Política de Privacidad', 'FAQ', 'Contacto'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterModern;
