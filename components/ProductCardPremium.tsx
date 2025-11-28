import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useProductActions } from '../hooks/useProductActions';
import { ShoppingCart, Heart, Package } from 'lucide-react';

interface ProductCardPremiumProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductCardPremium: React.FC<ProductCardPremiumProps> = ({ product, onShowDetails }) => {
  const config = categoryConfig[product.category];
  const Icon = config?.icon;
  const { handleAddToCart, handleToggleFavorite, isFavorite: isProductFavorite } = useProductActions(product);

  // Obtener el beneficio principal
  const mainBenefit = product.benefits[0] || '';

  return (
    <motion.div
      onClick={onShowDetails}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={`p-6 ${config?.bgClass || 'bg-gray-100'} rounded-2xl`}>
              {Icon ? (
                <Icon className={`w-12 h-12 ${config?.colorClass || 'text-gray-400'}`} strokeWidth={1.5} />
              ) : (
                <Package className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
              )}
            </div>
          </div>
        )}

        {/* Badge de marca */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {product.brand}
        </div>

        {/* Botón de favoritos */}
        <motion.button
          onClick={handleToggleFavorite}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 ${
            isProductFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/95 backdrop-blur-sm text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={isProductFavorite ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </motion.button>

        {/* Indicador de categoría */}
        <div className={`absolute bottom-3 left-3 ${config?.bgClass || 'bg-gray-100'} px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
          {Icon && <Icon className={`w-3 h-3 ${config?.colorClass}`} strokeWidth={2} />}
          <span className={`text-[10px] font-semibold ${config?.colorClass || 'text-gray-600'}`}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Nombre del producto */}
        <h3 className="text-sm font-bold text-slate-800 mb-1.5 line-clamp-2 group-hover:text-brand-green-600 transition-colors leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Presentación */}
        {product.presentation && (
          <p className="text-[11px] text-slate-400 mb-2 flex items-center gap-1">
            <Package className="w-3 h-3" />
            {product.presentation}
          </p>
        )}

        {/* Beneficio principal */}
        <div className="flex-grow">
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {mainBenefit.length > 60 ? mainBenefit.substring(0, 60) + '...' : mainBenefit}
          </p>
        </div>

        {/* Precio */}
        {product.price && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-lg font-bold text-brand-green-600">
              ${product.price.toLocaleString('es-MX')}
            </span>
            <span className="text-xs text-slate-400 ml-1">MXN</span>
          </div>
        )}
      </div>

      {/* Footer con botón de compra */}
      <div className="p-4 pt-0">
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-brand-green-600 border-2 border-brand-green-600 text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-brand-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Agregar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCardPremium;
