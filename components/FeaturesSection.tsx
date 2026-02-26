import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Leaf, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'IA Personalizada',
    description: 'Recomendaciones inteligentes basadas en tus necesidades específicas',
    gradient: 'from-brand-green-500 to-brand-green-600',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Productos premium de marcas certificadas y confiables',
    gradient: 'from-brand-green-600 to-brand-gold-500',
  },
  {
    icon: Shield,
    title: 'Garantía Total',
    description: 'Satisfacción garantizada o te devolvemos tu dinero',
    gradient: 'from-brand-gold-500 to-brand-gold-600',
  },
  {
    icon: Zap,
    title: 'Resultados Rápidos',
    description: 'Fórmulas potentes diseñadas para máxima efectividad',
    gradient: 'from-brand-green-400 to-brand-green-500',
  },
  {
    icon: CheckCircle2,
    title: 'Científicamente Probado',
    description: 'Respaldado por investigación clínica y nutrigenómica',
    gradient: 'from-brand-gold-400 to-brand-gold-500',
  },
  {
    icon: TrendingUp,
    title: 'Seguimiento de Progreso',
    description: 'Monitorea tu bienestar con nuestro dashboard inteligente',
    gradient: 'from-brand-green-500 to-brand-gold-400',
  },
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="text-brand-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
            ¿Por qué elegirnos?
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Bienestar integral, sin compromisos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cada producto, cada recomendación y cada interacción está diseñada para tu
            máximo bienestar y satisfacción.
          </p>
        </motion.div>

        {/* Grid de características */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Fondo gradiente en hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}
                />

                {/* Icono */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 text-white shadow-lg`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </motion.div>

                {/* Contenido */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Línea decorativa */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl origin-left`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
