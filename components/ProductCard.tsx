
import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowDetails }) => {
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

  // Extraer el color principal de la categoría para el borde
  const getBorderColor = () => {
    if (config?.colorClass) {
      // Convertir la clase de color a un color de borde
      const colorMap: { [key: string]: string } = {
        'text-pink-500': 'border-t-pink-500',
        'text-yellow-500': 'border-t-yellow-500',
        'text-green-500': 'border-t-green-500',
        'text-blue-500': 'border-t-blue-500',
        'text-indigo-500': 'border-t-indigo-500',
        'text-orange-500': 'border-t-orange-500',
        'text-purple-500': 'border-t-purple-500',
        'text-teal-500': 'border-t-teal-500',
        'text-red-500': 'border-t-red-500',
        'text-cyan-500': 'border-t-cyan-500',
        'text-amber-500': 'border-t-amber-500',
        'text-amber-700': 'border-t-amber-700',
        'text-lime-700': 'border-t-lime-700',
        'text-yellow-700': 'border-t-yellow-700',
        'text-blue-700': 'border-t-blue-700',
        'text-pink-700': 'border-t-pink-700',
        'text-gray-700': 'border-t-gray-700',
        'text-purple-700': 'border-t-purple-700',
        'text-indigo-700': 'border-t-indigo-700',
        'text-indigo-900': 'border-t-indigo-900',
        'text-green-700': 'border-t-green-700',
        'text-green-900': 'border-t-green-900',
        'text-orange-700': 'border-t-orange-700',
        'text-orange-900': 'border-t-orange-900',
        'text-cyan-700': 'border-t-cyan-700',
      };
      return colorMap[config.colorClass] || 'border-t-gray-300';
    }
    return 'border-t-gray-300';
  };

  return (
    <motion.div
      className={`relative bg-white border border-gray-100 ${getBorderColor()} border-t-4 rounded-lg md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[280px] md:min-h-[420px] overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      {/* Gradiente sutil de fondo */}
      <div className={`absolute inset-0 opacity-[0.03] ${config?.bgClass || 'bg-gray-100'} pointer-events-none rounded-lg md:rounded-2xl`}></div>
      
      <div className="p-3 md:p-7 flex-grow flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className={`p-1.5 md:p-3 ${config?.bgClass || 'bg-gray-100'} rounded-full shadow-sm`}>
                {Icon ? <Icon className={`w-5 h-5 md:w-7 md:h-7 ${config.colorClass}`} /> : <div className="w-5 h-5 md:w-7 md:h-7"></div>}
            </div>
            <div className="flex items-start gap-2">
                <div className="flex flex-col gap-1 items-end">
                    <div className="bg-slate-100 text-slate-600 text-xs md:text-xs font-bold px-2 md:px-3 py-1 md:py-1 rounded-full">
                        {product.brand}
                    </div>
                    {product.category && (
                        <div className={`${config?.bgClass || 'bg-gray-100'} ${config?.colorClass || 'text-gray-600'} text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full`}>
                            {product.category}
                        </div>
                    )}
                </div>
                <motion.button
                    onClick={handleToggleFavorite}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-colors ${
                        isProductFavorite 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                    }`}
                    title={isProductFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    <Heart 
                        className="w-4 h-4 md:w-5 md:h-5" 
                        fill={isProductFavorite ? 'currentColor' : 'none'}
                        strokeWidth={2}
                    />
                </motion.button>
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
