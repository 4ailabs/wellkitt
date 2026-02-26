import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductGridModernProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  onShowDetails: (product: Product) => void;
  onViewAll?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const ProductGridModern: React.FC<ProductGridModernProps> = ({
  products,
  title,
  subtitle,
  onShowDetails,
  onViewAll,
}) => {
  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12 sm:mb-16"
          >
            <div>
              {title && (
                <h2
                  className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-base text-slate-400" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onViewAll}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Ver Todo <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => onShowDetails(product)}
            >
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <div className="relative aspect-square">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                      <span
                        className="text-5xl sm:text-6xl font-bold text-slate-200"
                        style={{ fontFamily: 'Lora, serif' }}
                      >
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </div>
              </div>

              <div className="mt-3 sm:mt-4 px-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{product.brand || product.category}</p>
                {product.price != null && (
                  <p className="text-sm font-semibold text-slate-900 mt-1.5">
                    ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">MXN</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex sm:hidden justify-center mt-10">
          <button
            onClick={onViewAll}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Ver Todo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGridModern;
