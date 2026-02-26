import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Leaf } from 'lucide-react';

interface HeroModernProps {
  onStartRecommendation: () => void;
}

const HeroModern: React.FC<HeroModernProps> = ({ onStartRecommendation }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden pt-20">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente circular en la esquina superior derecha */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-green-500/20 to-brand-gold-500/10 rounded-full blur-3xl"
        />

        {/* Gradiente circular en la esquina inferior izquierda */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-brand-green-600/15 to-slate-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Lado izquierdo - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-brand-green-500/10 border border-brand-green-500/20 backdrop-blur-sm"
            >
              <Leaf className="w-4 h-4 text-brand-green-400" />
              <span className="text-sm font-medium text-brand-green-300">
                Bienestar personalizado con IA
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Tu kit de{' '}
                <span className="bg-gradient-to-r from-brand-green-400 to-brand-gold-400 bg-clip-text text-transparent">
                  salud
                </span>
                {' '}perfecto
              </h1>
            </motion.div>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-300 leading-relaxed max-w-lg"
            >
              Descubre suplementos naturales premium seleccionados específicamente para ti.
              Nuestro sistema de IA analiza tus necesidades y te recomienda los productos
              que realmente funcionan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(43, 168, 154, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartRecommendation}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300"
              >
                Empezar Test IA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Ver Catálogo
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              {[
                { number: '500+', label: 'Productos' },
                { number: '50K+', label: 'Clientes' },
                { number: '4.9★', label: 'Calificación' },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-brand-green-400 font-serif">
                    {item.number}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Lado derecho - Visualización */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Tarjetas flotantes */}
            <div className="relative w-full h-[500px]">
              {/* Tarjeta principal - Producto destacado */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 flex flex-col justify-center items-center"
              >
                <div className="w-48 h-48 bg-gradient-to-br from-brand-green-400/20 to-brand-gold-400/10 rounded-2xl mb-6 flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-brand-green-300 opacity-40" />
                </div>
                <h3 className="text-2xl font-serif text-white text-center mb-2">
                  Wellness Kit Pro
                </h3>
                <p className="text-sm text-slate-400 text-center">
                  Combinación perfecta para ti
                </p>
              </motion.div>

              {/* Tarjeta flotante 1 */}
              <motion.div
                animate={{
                  y: [0, 30, 0],
                  x: [-20, 0, -20],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-12 top-20 w-40 h-32 rounded-2xl bg-gradient-to-br from-brand-green-500/20 to-brand-green-600/10 backdrop-blur-lg border border-brand-green-400/30 p-4 shadow-xl"
              >
                <div className="text-white">
                  <div className="text-3xl font-bold mb-1">✓</div>
                  <p className="text-sm font-medium">100% Natural</p>
                </div>
              </motion.div>

              {/* Tarjeta flotante 2 */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  x: [20, 0, 20],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-12 bottom-32 w-40 h-32 rounded-2xl bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-600/10 backdrop-blur-lg border border-brand-gold-400/30 p-4 shadow-xl"
              >
                <div className="text-white">
                  <div className="text-3xl font-bold mb-1">✓</div>
                  <p className="text-sm font-medium">Recomendado por IA</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Descubre más</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroModern;
