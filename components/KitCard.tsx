
import React from 'react';
import { Kit, Product } from '../types';
import { ShieldCheck, Soup, Moon, Zap, HeartPulse, Bone, Shield, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

interface KitCardProps {
  kit: Kit;
  allProducts: Product[];
  onShowDetails: () => void;
}

const kitIcons: { [key: string]: React.ReactNode } = {
  K01: <ShieldCheck className="w-8 h-8 text-brand-green-600" />,
  K02: <Soup className="w-8 h-8 text-brand-green-600" />,
  K03: <Moon className="w-8 h-8 text-brand-green-600" />,
  K04: <Zap className="w-8 h-8 text-brand-green-600" />,
  K05: <HeartPulse className="w-8 h-8 text-brand-green-600" />,
  K06: <Bone className="w-8 h-8 text-brand-green-600" />,
  K07: <Shield className="w-8 h-8 text-brand-green-600" />,
  K08: <Gauge className="w-8 h-8 text-brand-green-600" />,
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

  return (
    <motion.div
      className={`${color.bg} border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[480px]`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 bg-white rounded-full`}>
                {kitIcons[kit.id]
                  ? React.cloneElement(kitIcons[kit.id] as React.ReactElement, { className: `w-8 h-8 ${color.icon}` })
                  : <div className="w-8 h-8"></div>}
            </div>
            <div className="bg-brand-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {kit.discount}% OFF
            </div>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug" style={{ fontFamily: 'Montserrat, sans-serif' }}>{kit.name}</h3>
        <p className="text-base text-slate-700 mb-6 h-12 leading-relaxed">{kit.benefit}</p>
        
        <div className="space-y-3 mt-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Incluye:</h4>
            <ul className="text-base text-slate-800 space-y-2">
                {kitProducts.slice(0, 4).map(product => (
                    <li key={product.id} className="truncate">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-slate-500"> ({product.brand})</span>
                    </li>
                ))}
                {kitProducts.length > 4 && <li className="text-slate-500 font-medium">y {kitProducts.length - 4} más...</li>}
            </ul>
        </div>
      </div>
       <div className="p-6 bg-slate-50 border-t border-gray-200">
        <motion.button
            onClick={onShowDetails}
            whileHover={{ scale: 1.03, backgroundColor: '#1e293b', color: '#fff', borderColor: '#1e293b' }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-slate-800 border border-slate-300 text-base font-medium py-2.5 px-4 rounded-lg shadow-sm hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
          Ver Kit Completo
        </motion.button>
      </div>
    </motion.div>
  );
};

export default KitCard;
