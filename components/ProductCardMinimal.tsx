import React from 'react';
import { Product } from '../types';
import { categoryConfig } from './category-config';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Plus, Heart } from 'lucide-react';

interface ProductCardMinimalProps {
  product: Product;
  onShowDetails: () => void;
}

const ProductCardMinimal: React.FC<ProductCardMinimalProps> = ({ product, onShowDetails }) => {
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

  // Obtener el beneficio principal (el más corto o el primero)
  const mainBenefit = product.benefits.reduce((shortest, current) =>
    current.length < shortest.length ? current : shortest
  , product.benefits[0] || '');

  return (
    <motion.div
      onClick={onShowDetails}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Barra de color superior */}
      <div className={`h-1 ${config?.bgClass || 'bg-gray-200'}`} />

      <div className="p-4">
        {/* Header: Icono + Acciones */}
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 ${config?.bgClass || 'bg-gray-100'} rounded-xl`}>
            {Icon && <Icon className={`w-5 h-5 ${config?.colorClass}`} strokeWidth={2} />}
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              onClick={handleToggleFavorite}
              whileTap={{ scale: 0.9 }}
              className={`p-1.5 rounded-full transition-colors ${
                isProductFavorite
                  ? 'text-red-500'
                  : 'text-gray-300 hover:text-red-400'
              }`}
            >
              <Heart className="w-4 h-4" fill={isProductFavorite ? 'currentColor' : 'none'} />
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 bg-brand-green-600 text-white rounded-full hover:bg-brand-green-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>

        {/* Contenido principal */}
        <div>
          {/* Nombre */}
          <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2 group-hover:text-brand-green-600 transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Marca */}
          <p className="text-[11px] text-slate-400 mb-2">
            {product.brand}
          </p>

          {/* Beneficio principal */}
          <p className={`text-xs ${config?.colorClass || 'text-gray-600'} font-medium line-clamp-1`}>
            {mainBenefit}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardMinimal;
