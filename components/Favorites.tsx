import React, { useState } from 'react';
import { Heart, X, Share2, Trash2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import KitCard from './KitCard';
import { Product } from '../types';

interface FavoritesProps {
  allProducts: Product[];
  onShowDetails: (item: any) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ allProducts, onShowDetails }) => {
  const { favorites, clearFavorites, getFavoritesCount } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);

  const handleShareFavorites = () => {
    const favoriteNames = favorites.map(item => item.name).join('\n• ');
    const mensaje = `🌿 *MIS FAVORITOS DE WELLKITT*\n\nEstos son los productos que me interesan:\n\n• ${favoriteNames}\n\n¿Podrían darme más información sobre estos productos?\n\n¡Gracias!`;
    
    const whatsappUrl = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos tus favoritos?')) {
      clearFavorites();
    }
  };

  const favoritesCount = getFavoritesCount();

  return (
    <>
      {/* Botón Flotante de Favoritos - Medio */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-28 z-40 bg-red-600 text-white rounded-full p-3 md:p-4 shadow-2xl hover:bg-red-700 transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Ver Favoritos"
      >
        <Heart className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white text-red-600 text-[10px] md:text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border-2 border-red-600">
            {favoritesCount}
          </span>
        )}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-800 text-white text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Mis Favoritos ({favoritesCount})
        </div>
      </motion.button>

      {/* Panel Lateral de Favoritos */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
                    <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Mis Favoritos
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-red-700 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-red-100 text-sm">
                  {favoritesCount} {favoritesCount === 1 ? 'producto' : 'productos'} guardados
                </p>
              </div>

              {/* Lista de Favoritos */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No tienes favoritos aún</p>
                    <p className="text-gray-400 text-sm">
                      Toca el corazón en cualquier producto o kit para guardarlo aquí
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((item) => {
                      const isKit = 'productIds' in item;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => {
                            onShowDetails(item);
                            setIsOpen(false);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${isKit ? 'bg-brand-green-100' : 'bg-red-100'}`}>
                              <Heart className={`w-5 h-5 ${isKit ? 'text-brand-green-600' : 'text-red-600'}`} fill="currentColor" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{item.name}</h3>
                              {'brand' in item ? (
                                <p className="text-sm text-slate-600">{item.brand}</p>
                              ) : (
                                <span className="text-xs bg-brand-green-600 text-white px-2 py-0.5 rounded-full">
                                  KIT
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer con Acciones */}
              {favorites.length > 0 && (
                <div className="border-t border-gray-200 p-4 md:p-6 space-y-3 bg-gray-50">
                  <button
                    onClick={handleShareFavorites}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartir por WhatsApp
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="w-full bg-white hover:bg-red-50 text-red-600 font-semibold py-3 px-4 rounded-lg border-2 border-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Borrar Todos
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Favorites;

