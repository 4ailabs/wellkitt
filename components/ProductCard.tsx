
import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowDetails }) => {
  const config = categoryConfig[product.category];
  const Icon = config?.icon;

  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full min-h-[350px] md:min-h-[420px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="p-4 md:p-7 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className={`p-2 md:p-3 ${config?.bgClass || 'bg-gray-100'} rounded-full`}>
                {Icon ? <Icon className={`w-5 h-5 md:w-7 md:h-7 ${config.colorClass}`} /> : <div className="w-5 h-5 md:w-7 md:h-7"></div>}
            </div>
            <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 md:px-3 py-1 rounded-full">
                {product.brand}
            </div>
        </div>
        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{product.name}</h3>
        
        {product.presentation && (
          <div className="mb-3 md:mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Presentación:</h4>
            <p className="text-xs md:text-sm text-slate-700">{product.presentation}</p>
          </div>
        )}

        <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Beneficios:</h4>
            <ul className="text-xs md:text-sm text-slate-700 list-disc list-inside space-y-0.5 md:space-y-1">
                {product.benefits.map((benefit, index) => (
                    <li key={index}>
                        {benefit}
                    </li>
                ))}
            </ul>
        </div>

        <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ingredientes:</h4>
            <p className="text-xs md:text-sm text-slate-600">
                {product.ingredients.join(', ')}
            </p>
        </div>

      </div>
       <div className="p-4 md:p-6 bg-slate-50/70 border-t border-gray-100 mt-auto">
        <motion.button
            onClick={onShowDetails}
            whileHover={{ scale: 1.03, backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-slate-800 border border-slate-300 text-sm md:text-base font-medium py-2 md:py-2.5 px-3 md:px-4 rounded-lg shadow-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
          Ver Detalles
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
