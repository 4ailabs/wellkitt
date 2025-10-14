
import React from 'react';
import { Kit, Product } from '../types';
import { ShieldCheck, Soup, Moon, Zap, HeartPulse, Bone, Shield, Gauge, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface KitCardProps {
  kit: Kit;
  allProducts: Product[];
  onShowDetails: () => void;
}

const kitIcons: { [key: string]: React.ReactNode } = {
  K01: <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K02: <Soup className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K03: <Moon className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K04: <Zap className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K05: <HeartPulse className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K06: <Bone className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K07: <Shield className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
  K08: <Gauge className="w-5 h-5 md:w-8 md:h-8 text-brand-green-600" />,
};

// Paleta de colores para cada kit
const kitColors: { [key: string]: { bg: string; icon: string; border: string; accent: string } } = {
  K01: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-t-green-500', accent: 'bg-green-100' },
  K02: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-t-blue-500', accent: 'bg-blue-100' },
  K03: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-t-purple-500', accent: 'bg-purple-100' },
  K04: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-t-yellow-500', accent: 'bg-yellow-100' },
  K05: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-t-pink-500', accent: 'bg-pink-100' },
  K06: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-t-orange-500', accent: 'bg-orange-100' },
  K07: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-t-teal-500', accent: 'bg-teal-100' },
  K08: { bg: 'bg-lime-50', icon: 'text-lime-600', border: 'border-t-lime-500', accent: 'bg-lime-100' },
};


const KitCard: React.FC<KitCardProps> = ({ kit, allProducts, onShowDetails }) => {
  const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
  const color = kitColors[kit.id] || { bg: 'bg-white', icon: 'text-brand-green-600', border: 'border-t-gray-300', accent: 'bg-gray-100' };
  const { addItem } = useCart();

  const handleAddKitToCart = () => {
    kitProducts.forEach(product => {
      addItem(product);
    });
  };

  return (
    <motion.div
      className={`${color.bg} border border-gray-200 ${color.border} border-t-4 rounded-lg md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[340px] md:min-h-[480px]`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="p-3 md:p-6 flex-grow">
        <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className={`p-1.5 md:p-3 bg-white rounded-full shadow-md`}>
                {kitIcons[kit.id] || <div className="w-5 h-5 md:w-8 md:h-8"></div>}
            </div>
            <div className="flex flex-col gap-1.5 items-end">
                <div className="bg-brand-green-600 text-white text-xs md:text-xs font-bold px-2.5 md:px-3 py-1 md:py-1 rounded-full shadow-sm">
                    {kit.discount}% OFF
                </div>
                <div className={`${color.accent} ${color.icon} text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full`}>
                    KIT
                </div>
            </div>
        </div>
        <h3 className="text-lg md:text-2xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight md:leading-snug line-clamp-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{kit.name}</h3>
        <p className="text-sm md:text-base text-slate-700 mb-3 md:mb-6 line-clamp-3 md:line-clamp-2 leading-snug md:leading-relaxed">{kit.benefit}</p>
        
        <div className="space-y-1 md:space-y-3 mt-2 md:mt-4">
            <h4 className="text-xs md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 md:mb-1">Incluye:</h4>
            <ul className="text-sm md:text-base text-slate-800 space-y-1 md:space-y-2">
                {kitProducts.slice(0, 3).map(product => (
                    <li key={product.id} className="truncate">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-slate-500 hidden md:inline"> ({product.brand})</span>
                    </li>
                ))}
                {kitProducts.length > 3 && <li className="text-slate-500 font-medium text-xs md:text-xs">y {kitProducts.length - 3} más...</li>}
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
