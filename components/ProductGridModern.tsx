import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import ProductCardPremium from './ProductCardPremium';

interface ProductGridModernProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  onShowDetails: (product: Product) => void;
}

const ProductGridModern: React.FC<ProductGridModernProps> = ({
  products,
  title,
  subtitle,
  onShowDetails,
}) => {
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
      {/* Decorativos */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-green-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-gold-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-24"
          >
            {title && (
              <p className="text-brand-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
                {title.split('|')[0]?.trim()}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                {title.split('|')[1]?.trim() || title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
            >
              <ProductCardPremium
                product={product}
                onShowDetails={() => onShowDetails(product)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Ver más */}
        {products.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
            >
              Ver todos los productos
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGridModern;
