
import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowDetails }) => {
  const config = categoryConfig[product.category];
  const Icon = config?.icon;
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-lg md:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full min-h-[280px] md:min-h-[420px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="p-3 md:p-7 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className={`p-1.5 md:p-3 ${config?.bgClass || 'bg-gray-100'} rounded-full`}>
                {Icon ? <Icon className={`w-5 h-5 md:w-7 md:h-7 ${config.colorClass}`} /> : <div className="w-5 h-5 md:w-7 md:h-7"></div>}
            </div>
            <div className="bg-slate-100 text-slate-600 text-xs md:text-xs font-bold px-2 md:px-3 py-1 md:py-1 rounded-full">
                {product.brand}
            </div>
        </div>
        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 md:mb-2 line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{product.name}</h3>
        
        {product.presentation && (
          <div className="mb-2 md:mb-4">
            <h4 className="text-xs md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Presentación:</h4>
            <p className="text-sm md:text-sm text-slate-700 line-clamp-1">{product.presentation}</p>
          </div>
        )}

        <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
            <h4 className="text-xs md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Beneficios:</h4>
            <ul className="text-sm md:text-sm text-slate-700 list-disc list-inside space-y-0.5">
                {product.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="line-clamp-1">
                        {benefit}
                    </li>
                ))}
                {product.benefits.length > 2 && (
                    <li className="text-slate-500 text-xs md:text-xs">+{product.benefits.length - 2} más</li>
                )}
            </ul>
        </div>

        <div className="space-y-1 md:space-y-1 mb-auto">
            <h4 className="text-xs md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Ingredientes:</h4>
            <p className="text-sm md:text-sm text-slate-600 line-clamp-2">
                {product.ingredients.slice(0, 3).join(', ')}{product.ingredients.length > 3 ? '...' : ''}
            </p>
        </div>

      </div>
       <div className="p-3 md:p-6 bg-slate-50/70 border-t border-gray-100 mt-auto">
        <div className="flex gap-2 md:gap-2">
          <motion.button
              onClick={onShowDetails}
              whileHover={{ scale: 1.03, backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-slate-800 border border-slate-300 text-sm md:text-base font-medium py-2.5 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-lg shadow-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
            Ver Detalles
          </motion.button>
          <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-green-600 text-white border border-brand-green-600 text-sm md:text-base font-medium py-2.5 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-lg shadow-sm hover:bg-brand-green-700 hover:border-brand-green-700 transition-all duration-200 flex items-center justify-center"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
            <ShoppingCart className="w-4 h-4 md:w-4 md:h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
