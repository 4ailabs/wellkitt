import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Plus, Heart, ChevronRight } from 'lucide-react';

interface ProductListItemProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onShowDetails }) => {
  const config = categoryConfig[product.category];
  const Icon = config?.icon;
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProductFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <motion.div
      onClick={onShowDetails}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center p-3 md:p-4 gap-3 md:gap-4">
        {/* Icono de categoría */}
        <div className={`flex-shrink-0 p-2.5 md:p-3 ${config?.bgClass || 'bg-gray-100'} rounded-xl`}>
          {Icon && <Icon className={`w-5 h-5 md:w-6 md:h-6 ${config?.colorClass}`} strokeWidth={1.5} />}
        </div>

        {/* Contenido principal */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-slate-800 truncate group-hover:text-brand-green-600 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] md:text-xs text-slate-400">
                  {product.brand}
                </span>
                <span className="text-slate-300">•</span>
                <span className={`text-[11px] md:text-xs ${config?.colorClass || 'text-gray-500'} font-medium`}>
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Beneficio en una línea */}
          <p className="text-xs text-slate-500 mt-1 truncate hidden md:block">
            {product.benefits[0]}
          </p>
        </div>

        {/* Precio */}
        {product.price && (
          <div className="flex-shrink-0 text-right mr-2">
            <span className="text-base md:text-lg font-bold text-brand-green-600">
              ${product.price.toLocaleString('es-MX')}
            </span>
            <span className="text-[10px] md:text-xs text-slate-400 ml-0.5">MXN</span>
          </div>
        )}

        {/* Acciones - Touch targets optimizados (mínimo 44px) */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <motion.button
            onClick={handleToggleFavorite}
            whileTap={{ scale: 0.9 }}
            className={`p-2.5 md:p-2 rounded-full transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center ${
              isProductFavorite
                ? 'text-red-500 bg-red-50'
                : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
            }`}
          >
            <Heart className="w-5 h-5 md:w-4 md:h-4" fill={isProductFavorite ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 md:p-2 bg-brand-green-600 text-white rounded-full hover:bg-brand-green-700 transition-colors shadow-sm min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 md:w-4 md:h-4" strokeWidth={2.5} />
          </motion.button>

          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green-500 transition-colors hidden md:block" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductListItem;
