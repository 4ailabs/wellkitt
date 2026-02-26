
import React from 'react';
import { Product } from '../types';
import { ArrowLeft, ShoppingCart, Heart, CheckCircle, Leaf, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductActions } from '../hooks/useProductActions';
import { categoryConfig } from './category-config';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onShowDetails?: (product: Product) => void;
  relatedProducts?: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onShowDetails, relatedProducts = [] }) => {
  const { handleAddToCart, handleToggleFavorite, isFavorite } = useProductActions(product);
  const config = categoryConfig[product.category];
  const Icon = config?.icon;

  const handleWhatsApp = () => {
    const mensaje = `Hola, me interesa el producto "${product.name}" de ${product.brand}. ¿Podrían darme más información?`;
    const url = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isFavorite ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:text-red-400'
              }`}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleAddToCart}
              className="h-9 px-4 rounded-full bg-brand-green-600 text-white text-sm font-semibold hover:bg-brand-green-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Left: Image */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center sticky top-20"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 sm:p-12"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  {Icon ? (
                    <div className={`w-24 h-24 rounded-2xl ${config?.bgClass || 'bg-slate-100'} flex items-center justify-center`}>
                      <Icon className={`w-12 h-12 ${config?.colorClass || 'text-slate-400'}`} strokeWidth={1.5} />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Package className="w-12 h-12 text-slate-300" strokeWidth={1.5} />
                    </div>
                  )}
                  <span className="text-sm text-slate-300">Sin imagen disponible</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Breadcrumb tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                {product.brand}
              </span>
              <span className="text-xs font-medium text-brand-green-700 bg-brand-green-50 px-3 py-1 rounded-full border border-brand-green-100">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-3"
              style={{ fontFamily: 'Lora, serif' }}
            >
              {product.name}
            </h1>

            {/* Presentation */}
            {product.presentation && (
              <p className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                {product.presentation}
              </p>
            )}

            {/* Price */}
            {product.price != null && (
              <div className="mb-8">
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-slate-400 ml-2">MXN</span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand-green-600 text-white text-sm font-semibold rounded-full hover:bg-brand-green-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar al carrito
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors"
              >
                Consultar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-8 mb-8" />

            {/* Benefits */}
            {product.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-green-600" />
                  Beneficios
                </h3>
                <div className="space-y-3">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-brand-green-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-brand-green-600">{i + 1}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-brand-green-600" />
                  Ingredientes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h2
              className="text-2xl font-bold text-slate-900 mb-8"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Productos relacionados
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((related) => (
                <div
                  key={related.id}
                  className="group cursor-pointer"
                  onClick={() => onShowDetails?.(related)}
                >
                  <div className="aspect-square rounded-xl bg-slate-50 border border-slate-100 overflow-hidden mb-3">
                    {related.image ? (
                      <img
                        src={related.image}
                        alt={related.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-slate-200" style={{ fontFamily: 'Lora, serif' }}>
                          {related.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-green-600 transition-colors">
                    {related.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{related.brand}</p>
                  {related.price != null && (
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      ${related.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
