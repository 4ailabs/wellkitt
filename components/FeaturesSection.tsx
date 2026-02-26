import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Diamond, Truck } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Recomendación con IA',
    description:
      'Análisis personalizado de tus necesidades de salud con inteligencia artificial avanzada.',
  },
  {
    icon: Diamond,
    title: 'Calidad Certificada',
    description:
      'Productos de marcas certificadas con ingredientes de la más alta calidad y pureza.',
  },
  {
    icon: Truck,
    title: 'Envío Seguro y Rápido',
    description:
      'Entrega confiable con seguimiento completo en todos tus pedidos de productos.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const FeaturesSection: React.FC = () => {
  return (
    <section
      className="py-20 sm:py-28 bg-white"
      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="rounded-2xl p-8 sm:p-10 bg-slate-50 border border-slate-100"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-brand-green-50 border border-brand-green-100">
                  <Icon className="w-5 h-5 text-brand-green-600" strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
