import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { ShoppingCart, Heart, Sparkles, Package } from 'lucide-react';

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

  return (
    <motion.div
      className="group relative bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Header con icono prominente */}
      <div className={`relative h-28 md:h-36 ${config?.bgClass || 'bg-gradient-to-br from-gray-100 to-gray-50'} flex items-center justify-center overflow-hidden`}>
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-white/50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/30 -translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Icono central */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className={`p-4 md:p-5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg`}>
            {Icon ? (
              <Icon className={`w-8 h-8 md:w-10 md:h-10 ${config.colorClass}`} strokeWidth={1.5} />
            ) : (
              <Package className="w-8 h-8 md:w-10 md:h-10 text-gray-400" strokeWidth={1.5} />
            )}
          </div>
        </motion.div>

        {/* Botón de favoritos */}
        <motion.button
          onClick={handleToggleFavorite}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 ${
            isProductFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={isProductFavorite ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </motion.button>

        {/* Badge de marca */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {product.brand}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-5 flex-grow flex flex-col">
        {/* Categoría */}
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1 ${config?.colorClass || 'text-gray-600'} text-[10px] md:text-xs font-semibold`}>
            <Sparkles className="w-3 h-3" />
            {product.category}
          </span>
        </div>

        {/* Nombre del producto */}
        <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-green-600 transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {product.name}
        </h3>

        {/* Presentación */}
        {product.presentation && (
          <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
            <Package className="w-3 h-3" />
            {product.presentation}
          </p>
        )}

        {/* Beneficios con nuevo diseño */}
        <div className="flex-grow">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <span
                key={index}
                className="inline-block bg-brand-green-50 text-brand-green-700 text-[10px] md:text-xs px-2 py-1 rounded-md font-medium"
              >
                {benefit.length > 25 ? benefit.substring(0, 25) + '...' : benefit}
              </span>
            ))}
            {product.benefits.length > 2 && (
              <span className="inline-block bg-gray-100 text-gray-500 text-[10px] md:text-xs px-2 py-1 rounded-md">
                +{product.benefits.length - 2}
              </span>
            )}
          </div>

          {/* Ingredientes principales */}
          <p className="text-xs text-slate-500 line-clamp-1">
            <span className="font-medium text-slate-600">Ingredientes: </span>
            {product.ingredients.slice(0, 2).join(', ')}{product.ingredients.length > 2 ? '...' : ''}
          </p>
        </div>
      </div>

      {/* Footer con botones */}
      <div className="p-4 md:p-5 pt-0">
        <div className="flex gap-2">
          <motion.button
            onClick={onShowDetails}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-slate-100 text-slate-700 text-sm font-semibold py-2.5 md:py-3 px-4 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300"
          >
            Ver más
          </motion.button>
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-green-600 text-white text-sm font-semibold py-2.5 md:py-3 px-4 rounded-xl hover:bg-brand-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-green-600/25"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden md:inline">Agregar</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
