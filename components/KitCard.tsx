
import React from 'react';
import { Kit, Product } from '../types';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useKitActions } from '../hooks/useProductActions';
import { getKitIcon } from './kit-config';

interface KitCardProps {
  kit: Kit;
  allProducts: Product[];
  onShowDetails: () => void;
}

const KitCard: React.FC<KitCardProps> = ({ kit, allProducts, onShowDetails }) => {
  const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
  const KitIcon = getKitIcon(kit.id);

  const { handleAddKitToCart } = useKitActions(kit, kitProducts);

  return (
    <motion.div
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col h-full cursor-pointer group hover:border-slate-200 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onShowDetails}
    >
      <div className="p-6 sm:p-8 flex-grow flex flex-col">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-brand-green-50 flex items-center justify-center">
            <KitIcon className="w-5 h-5 text-brand-green-600" />
          </div>
          {kit.discount > 0 && (
            <span className="text-[11px] font-semibold text-brand-green-700 bg-brand-green-50 px-2.5 py-1 rounded-full border border-brand-green-100">
              {kit.discount}% OFF
            </span>
          )}
        </div>

        {/* Title + description */}
        <h3
          className="text-lg font-bold text-slate-900 mb-2 leading-snug line-clamp-2"
          style={{ fontFamily: 'Lora, serif' }}
        >
          {kit.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">{kit.benefit}</p>

        {/* Products count */}
        <div className="mt-auto">
          <p className="text-xs text-slate-400 mb-2">{kitProducts.length} productos incluidos</p>
          <div className="space-y-1">
            {kitProducts.slice(0, 3).map(product => (
              <div key={product.id} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-green-400 shrink-0" />
                <span className="text-xs text-slate-500 truncate">{product.name}</span>
              </div>
            ))}
            {kitProducts.length > 3 && (
              <p className="text-xs text-slate-400 pl-3">+{kitProducts.length - 3} más</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onShowDetails(); }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
        >
          Ver Kit <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleAddKitToCart(); }}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-green-600 text-white hover:bg-brand-green-700 transition-colors shrink-0"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default KitCard;
