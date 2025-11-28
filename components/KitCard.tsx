import React, { useState } from 'react';
import { Kit, Product } from '../types';
import { ShoppingCart, Heart, Package, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKitActions } from '../hooks/useProductActions';
import { getKitCardColors, getKitIcon } from './kit-config';

interface KitCardProps {
  kit: Kit;
  allProducts: Product[];
  onShowDetails: () => void;
}

const KitCard: React.FC<KitCardProps> = ({ kit, allProducts, onShowDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
  const color = getKitCardColors(kit.id);
  const KitIcon = getKitIcon(kit.id);

  const { handleAddKitToCart, handleToggleFavorite, isFavorite: isKitFavorite } = useKitActions(kit, kitProducts);

  return (
    <motion.div
      className={`${color.bg} border border-gray-200 ${color.border} border-t-4 rounded-lg md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[340px] md:min-h-[480px] relative group`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick-view overlay en hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-10 p-4 md:p-5 flex flex-col justify-between cursor-pointer hidden md:flex"
            onClick={onShowDetails}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-xs uppercase tracking-wider">Vista rápida</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {kit.name}
              </h3>
              <p className="text-white/80 text-sm mb-4">{kit.problem}</p>

              {/* Lista completa de productos */}
              <div className="space-y-2">
                <span className="text-white/60 text-xs uppercase tracking-wider">Todos los productos:</span>
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
                  {kitProducts.map((product, idx) => (
                    <div key={product.id} className="flex items-center gap-2 text-white/90">
                      <span className={`w-5 h-5 rounded-full ${color.iconBg} flex items-center justify-center text-xs font-bold ${color.icon}`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm truncate">{product.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShowDetails}
                className="flex-1 bg-white text-slate-900 font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                Ver Detalles
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddKitToCart}
                className="bg-brand-green-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 md:p-6 flex-grow">
        <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className={`p-1.5 md:p-3 bg-white rounded-full shadow-md`}>
                <KitIcon className={`w-5 h-5 md:w-8 md:h-8 ${color.icon}`} />
            </div>
            <div className="flex items-start gap-2">
                <div className="flex flex-col gap-1.5 items-end">
                    <div className="bg-brand-green-600 text-white text-xs md:text-xs font-bold px-2.5 md:px-3 py-1 md:py-1 rounded-full shadow-sm">
                        {kit.discount}% OFF
                    </div>
                    <div className={`${color.accent} ${color.icon} text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full`}>
                        KIT
                    </div>
                </div>
                <motion.button
                    onClick={handleToggleFavorite}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-colors ${
                        isKitFavorite
                            ? 'bg-red-100 text-red-600'
                            : 'bg-white text-gray-400 hover:bg-red-50 hover:text-red-500'
                    }`}
                    title={isKitFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    <Heart
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill={isKitFavorite ? 'currentColor' : 'none'}
                        strokeWidth={2}
                    />
                </motion.button>
            </div>
        </div>
        <h3 className="text-lg md:text-2xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight md:leading-snug line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{kit.name}</h3>
        <p className="text-sm md:text-base text-slate-700 mb-3 md:mb-6 line-clamp-3 md:line-clamp-2 leading-snug md:leading-relaxed">{kit.benefit}</p>

        {/* Visualización mejorada de productos incluidos */}
        <div className="space-y-2 md:space-y-3 mt-2 md:mt-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Incluye {kitProducts.length} productos:</h4>

            {/* Mini avatares de productos */}
            <div className="flex items-center gap-1">
              {kitProducts.slice(0, 5).map((product, idx) => (
                <div
                  key={product.id}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${color.iconBg} flex items-center justify-center text-xs md:text-sm font-bold ${color.icon} border-2 border-white shadow-sm`}
                  style={{ marginLeft: idx > 0 ? '-8px' : '0', zIndex: 5 - idx }}
                  title={product.name}
                >
                  {product.name.charAt(0)}
                </div>
              ))}
              {kitProducts.length > 5 && (
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border-2 border-white shadow-sm"
                  style={{ marginLeft: '-8px', zIndex: 0 }}
                >
                  +{kitProducts.length - 5}
                </div>
              )}
            </div>

            {/* Lista de productos principales */}
            <ul className="text-xs md:text-sm text-slate-700 space-y-1">
                {kitProducts.slice(0, 2).map(product => (
                    <li key={product.id} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${color.accent}`}></span>
                        <span className="truncate">{product.name}</span>
                    </li>
                ))}
                {kitProducts.length > 2 && (
                  <li className="text-slate-500 text-xs">
                    y {kitProducts.length - 2} productos más...
                  </li>
                )}
            </ul>
        </div>
      </div>
       <div className="p-3 md:p-6 bg-slate-50 border-t border-gray-200">
        <div className="flex gap-2 md:gap-2">
          <motion.button
              onClick={onShowDetails}
              whileHover={{ scale: 1.03, backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-slate-800 border border-slate-300 text-sm md:text-base font-medium py-2.5 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-lg shadow-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
            Ver Kit
          </motion.button>
          <motion.button
              onClick={handleAddKitToCart}
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

export default KitCard;
