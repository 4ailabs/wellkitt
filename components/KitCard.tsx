
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
  K01: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K02: <Soup className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K03: <Moon className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K04: <Zap className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K05: <HeartPulse className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K06: <Bone className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K07: <Shield className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
  K08: <Gauge className="w-6 h-6 md:w-8 md:h-8 text-brand-green-600" />,
};

// Paleta de colores para cada kit
const kitColors: { [key: string]: { bg: string; icon: string } } = {
  K01: { bg: 'bg-green-50', icon: 'text-green-600' },
  K02: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  K03: { bg: 'bg-purple-50', icon: 'text-purple-600' },
  K04: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  K05: { bg: 'bg-pink-50', icon: 'text-pink-600' },
  K06: { bg: 'bg-orange-50', icon: 'text-orange-600' },
  K07: { bg: 'bg-teal-50', icon: 'text-teal-600' },
  K08: { bg: 'bg-lime-50', icon: 'text-lime-600' },
};


const KitCard: React.FC<KitCardProps> = ({ kit, allProducts, onShowDetails }) => {
  const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
  const color = kitColors[kit.id] || { bg: 'bg-white', icon: 'text-brand-green-600' };
  const { addItem } = useCart();

  const handleAddKitToCart = () => {
    kitProducts.forEach(product => {
      addItem(product);
    });
  };

  return (
    <motion.div
      className={`${color.bg} border border-gray-200 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[320px] md:min-h-[480px]`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="p-3 md:p-6 flex-grow">
        <div className="flex items-start justify-between mb-2 md:mb-4">
            <div className={`p-1.5 md:p-3 bg-white rounded-full`}>
                {kitIcons[kit.id]
                  ? React.cloneElement(kitIcons[kit.id] as React.ReactElement, { className: `w-5 h-5 md:w-8 md:h-8 ${color.icon}` })
                  : <div className="w-5 h-5 md:w-8 md:h-8"></div>}
            </div>
            <div className="bg-brand-green-600 text-white text-xs font-bold px-2 md:px-3 py-1 rounded-full">
                {kit.discount}% OFF
            </div>
        </div>
        <h3 className="text-base md:text-2xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight leading-snug" style={{ fontFamily: 'Montserrat, sans-serif' }}>{kit.name}</h3>
        <p className="text-xs md:text-base text-slate-700 mb-3 md:mb-6 h-8 md:h-12 leading-relaxed">{kit.benefit}</p>
        
        <div className="space-y-1 md:space-y-3 mt-2 md:mt-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Incluye:</h4>
            <ul className="text-xs md:text-base text-slate-800 space-y-0.5 md:space-y-2">
                {kitProducts.slice(0, 3).map(product => (
                    <li key={product.id} className="truncate">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-slate-500"> ({product.brand})</span>
                    </li>
                ))}
                {kitProducts.length > 3 && <li className="text-slate-500 font-medium text-xs">y {kitProducts.length - 3} más...</li>}
            </ul>
        </div>
      </div>
       <div className="p-3 md:p-6 bg-slate-50 border-t border-gray-200">
        <div className="flex gap-2">
          <motion.button
              onClick={onShowDetails}
              whileHover={{ scale: 1.03, backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white text-slate-800 border border-slate-300 text-xs md:text-base font-medium py-2.5 md:py-2.5 px-2 md:px-4 rounded-lg shadow-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
            Ver Kit Completo
          </motion.button>
          <motion.button
              onClick={handleAddKitToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-green-600 text-white border border-brand-green-600 text-xs md:text-base font-medium py-2.5 md:py-2.5 px-2 md:px-4 rounded-lg shadow-sm hover:bg-brand-green-700 hover:border-brand-green-700 transition-all duration-200 tracking-wide flex items-center justify-center"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default KitCard;
