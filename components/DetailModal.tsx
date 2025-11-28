import React, { useState } from 'react';
import { Kit, Product } from '../types';
import { X, List, Leaf, CheckCircle, ShoppingCart, Package, Target, Sparkles, Clock, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { motion, AnimatePresence } from 'framer-motion';
import { useKitActions } from '../hooks/useProductActions';
import { getKitModalColors, getKitIcon, getKitUsageSuggestion } from './kit-config';

interface DetailModalProps {
  item: Kit | Product | null;
  allProducts: Product[];
  onClose: () => void;
}

// Type guard to check if the item is a Kit
const isKit = (item: Kit | Product): item is Kit => {
  return (item as Kit).productIds !== undefined;
};

// Componente separado para el contenido del kit (permite usar hooks correctamente)
interface KitDetailContentProps {
  kit: Kit;
  kitProducts: Product[];
  expandedProduct: string | null;
  setExpandedProduct: (id: string | null) => void;
  onClose: () => void;
}

const KitDetailContent: React.FC<KitDetailContentProps> = ({ 
  kit, 
  kitProducts, 
  expandedProduct, 
  setExpandedProduct,
  onClose 
}) => {
  // Ahora el hook se llama al nivel superior del componente
  const { handleAddKitToCart, handleToggleFavorite, isFavorite: isKitFavorite } = useKitActions(kit, kitProducts);
  
  const color = getKitModalColors(kit.id);
  const KitIcon = getKitIcon(kit.id);
  const usageSuggestion = getKitUsageSuggestion(kit.id);
  const allBenefits = [...new Set(kitProducts.flatMap(p => p.benefits))].slice(0, 6);

  return (
    <div className="flex flex-col max-h-[90vh] md:max-h-[85vh]">
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-r ${color.gradient} p-6 md:p-8 text-white relative overflow-hidden`}>
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/20"></div>
          <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/20"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <KitIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    KIT
                  </span>
                  <span className="bg-white text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    {kit.discount}% OFF
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {kit.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isKitFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className="w-5 h-5" fill={isKitFavorite ? 'currentColor' : 'none'} />
              </motion.button>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-white/90 text-sm md:text-base mb-4">{kit.benefit}</p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <Package className="w-4 h-4" />
              <span>{kitProducts.length} productos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        {/* Sección: ¿Para quién es? */}
        <div className={`${color.light} rounded-xl p-4 md:p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <Target className={`w-5 h-5 ${color.text}`} />
            <h4 className="font-bold text-slate-800">¿Para quién es este kit?</h4>
          </div>
          <p className="text-slate-700">{kit.problem}</p>
        </div>

        {/* Sección: Beneficios combinados */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-5 h-5 ${color.text}`} />
            <h4 className="font-bold text-slate-800">Beneficios que obtendrás</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {allBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className={`w-4 h-4 ${color.text} flex-shrink-0`} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Productos incluidos (expandibles) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <List className={`w-5 h-5 ${color.text}`} />
            <h4 className="font-bold text-slate-800">Productos Incluidos ({kitProducts.length})</h4>
          </div>
          <div className="space-y-3">
            {kitProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${color.light} flex items-center justify-center font-bold ${color.text}`}>
                      {idx + 1}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.brand} • {product.category}</p>
                    </div>
                  </div>
                  {expandedProduct === product.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedProduct === product.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Beneficios:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {product.benefits.map((benefit, i) => (
                              <span key={i} className={`text-xs ${color.light} ${color.text} px-2 py-1 rounded-full`}>
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                        {product.ingredients.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Ingredientes:</p>
                            <p className="text-xs text-slate-600">{product.ingredients.join(', ')}</p>
                          </div>
                        )}
                        {product.presentation && (
                          <p className="text-xs text-slate-500 mt-2">📦 {product.presentation}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sección: Cómo usarlo */}
        <div className="bg-amber-50 rounded-xl p-4 md:p-5 border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-slate-800">Sugerencia de uso</h4>
          </div>
          <p className="text-slate-700 text-sm">{usageSuggestion}</p>
        </div>
      </div>

      {/* Footer con acciones */}
      <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddKitToCart}
            className={`flex-1 bg-gradient-to-r ${color.gradient} text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg`}
          >
            <ShoppingCart className="w-5 h-5" />
            Agregar Kit al Carrito
          </motion.button>

          {(() => {
            const mensaje = `Hola, quiero más información sobre el kit "${kit.name}" que incluye: ${kitProducts.map(p => p.name).join(', ')}`;
            const url = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
            return (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.21-.624-5.96-1.8l-.426-.27-4.65 1.22 1.24-4.53-.277-.44A9.93 9.93 0 0 1 6.083 15c0-5.478 4.44-9.917 9.917-9.917S25.917 9.522 25.917 15 21.478 25.917 16 25.917zm5.44-7.26c-.297-.148-1.76-.867-2.033-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.457.13-.604.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.52-.074-.148-.669-1.612-.916-2.21-.242-.58-.487-.502-.669-.511-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.463 1.065 2.877 1.213 3.075.148.198 2.099 3.205 5.086 4.37.712.307 1.267.49 1.7.627.714.227 1.364.195 1.877.118.573-.085 1.76-.719 2.008-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Consultar por WhatsApp
              </motion.a>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

const DetailModal: React.FC<DetailModalProps> = ({ item, allProducts, onClose }) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  // Bloquear scroll cuando el modal está abierto
  useScrollLock(!!item);

  if (!item) return null;

  const renderKitDetails = (kit: Kit) => {
    const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
    
    return (
      <KitDetailContent
        kit={kit}
        kitProducts={kitProducts}
        expandedProduct={expandedProduct}
        setExpandedProduct={setExpandedProduct}
        onClose={onClose}
      />
    );
  };

  const renderProductDetails = (product: Product) => {
    return (
        <div className="p-6 sm:p-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{product.name}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{product.brand}</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{product.category}</span>
                {product.presentation && <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">{product.presentation}</span>}
            </div>

            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 -mr-2">
                 <div>
                    <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-brand-green-600" />
                        Beneficios Principales
                    </h4>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 pl-2">
                        {product.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-brand-green-600" />
                        Ingredientes
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                        {product.ingredients.join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-2 md:p-4 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`bg-slate-50 rounded-2xl shadow-2xl w-full ${isKit(item) ? 'max-w-3xl' : 'max-w-2xl'} overflow-hidden`}
        onClick={e => e.stopPropagation()}
      >
        {isKit(item) ? (
          renderKitDetails(item)
        ) : (
          <div className="relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-full p-2 transition-colors z-10">
              <X className="w-6 h-6" />
            </button>
            {renderProductDetails(item)}
          </div>
        )}
      </motion.div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DetailModal;
