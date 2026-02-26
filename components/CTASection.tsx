import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onStartTest: () => void;
  onShowSalads: () => void;
  onScrollToProducts: () => void;
}

const categories = [
  { id: 'digestion', display: 'Digestión', emoji: '🌿', action: 'products' },
  { id: 'energia', display: 'Energía', emoji: '⚡', action: 'products' },
  { id: 'inmunidad', display: 'Inmunidad', emoji: '🛡️', action: 'products' },
  { id: 'ensaladas', display: 'Ensaladas', emoji: '🥗', action: 'salads' },
  { id: 'tests', display: 'Tests', emoji: '🧬', action: 'tests' },
  { id: 'kits', display: 'Kits', emoji: '📦', action: 'products' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const CTASection: React.FC<CTASectionProps> = ({ onStartTest, onShowSalads, onScrollToProducts }) => {
  const handleCategoryClick = (cat: typeof categories[0]) => {
    if (cat.action === 'salads') onShowSalads();
    else if (cat.action === 'tests') onStartTest();
    else onScrollToProducts();
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight"
            style={{ fontFamily: 'Lora, serif' }}
          >
            Explora por Categoría
          </h2>
          <p className="text-slate-500 text-base mt-2 max-w-md" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Todo lo que necesitas para cuidar tu salud en un solo lugar.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
              onClick={() => handleCategoryClick(cat)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-50 border border-slate-100"
            >
              <div className="relative px-6 sm:px-7 pt-6 sm:pt-8 pb-14 sm:pb-16 min-h-[160px] sm:min-h-[200px] flex flex-col justify-between">
                <span className="text-2xl sm:text-3xl mb-3 sm:mb-4 block" aria-hidden="true">{cat.emoji}</span>
                <div className="absolute bottom-3 sm:bottom-4 left-6 sm:left-7 right-14 sm:right-16 select-none pointer-events-none" aria-hidden="true">
                  <span
                    className="text-3xl sm:text-5xl md:text-6xl font-bold leading-none"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(0, 0, 0, 0.04)' }}
                  >
                    {cat.display}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3
                    className="text-lg sm:text-2xl font-bold text-slate-800 group-hover:text-slate-600 transition-colors"
                    style={{ fontFamily: 'Lora, serif' }}
                  >
                    {cat.display}
                  </h3>
                </div>
                <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 group-hover:bg-brand-green-600 group-hover:border-brand-green-600 group-hover:shadow-md transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 group-hover:text-white transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
