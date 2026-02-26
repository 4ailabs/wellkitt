import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

interface CTASectionProps {
  onStartTest: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onStartTest }) => {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Fondo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-brand-green-900 to-slate-900" />

      {/* Elementos decorativos */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-green-500/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-brand-gold-500/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green-500/20 border border-brand-green-400/40 backdrop-blur-sm mb-6"
          >
            <Zap className="w-4 h-4 text-brand-green-300" />
            <span className="text-sm font-medium text-brand-green-200">
              Oferta limitada: Primeros 3 meses con 20% descuento
            </span>
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Comienza tu transformación{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-300 to-brand-gold-300">
              hoy mismo
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-12"
          >
            Tu kit personalizado te espera. Responde nuestro test de 5 minutos y descubre
            exactamente qué necesita tu cuerpo.
          </motion.p>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(43, 168, 154, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartTest}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-green-400 to-brand-green-500 text-slate-900 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Empezar Test IA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#2ba89a' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:border-brand-green-400/60 transition-all duration-300"
            >
              Ver Catálogo
            </motion.button>
          </motion.div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10 text-slate-400 text-sm"
          >
            ✓ 100% Satisfacción garantizada o devolvemos tu dinero
            <br />
            ✓ Envío gratis en órdenes mayores a $500
            <br />✓ Asesoramiento profesional incluido
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
