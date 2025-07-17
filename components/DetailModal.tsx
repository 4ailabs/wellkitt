
import React from 'react';
import { Kit, Product } from '../types';
import { X, Tag, List, Leaf, CheckCircle } from 'lucide-react';

interface DetailModalProps {
  item: Kit | Product | null;
  allProducts: Product[];
  onClose: () => void;
}

// Type guard to check if the item is a Kit
const isKit = (item: Kit | Product): item is Kit => {
  return (item as Kit).productIds !== undefined;
};

const DetailModal: React.FC<DetailModalProps> = ({ item, allProducts, onClose }) => {
  if (!item) return null;

  const renderKitDetails = (kit: Kit) => {
    const kitProducts = kit.productIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
    return (
      <>
        <div className="p-6 sm:p-8">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{kit.name}</h3>
            <p className="text-slate-600 mb-4">{kit.benefit}</p>
            <div className="inline-flex items-center gap-2 bg-brand-green-100 text-brand-green-800 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                <Tag className="w-4 h-4" />
                <span>{kit.discount}% de descuento aplicado en este kit</span>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <List className="w-5 h-5 text-brand-green-600" />
                    Productos Incluidos
                </h4>
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 -mr-2">
                    {kitProducts.map(product => (
                        <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-bold text-slate-800">{product.name}</p>
                            <p className="text-sm text-slate-500">{product.brand}</p>
                            <p className="text-xs text-brand-green-700 mt-2 bg-brand-green-100 px-2 py-1 rounded-full inline-block">{product.category}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Botón de WhatsApp CTA con lista de productos */}
            <div className="mt-8 flex justify-center">
              {(() => {
                const mensaje = `Hola, quiero más información sobre el kit "${kit.name}" que incluye: ${kitProducts.map(p => p.name).join(', ')}`;
                const url = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
                return (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors duration-200 text-lg shadow-md"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05A12.94 12.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.21-.624-5.96-1.8l-.426-.27-4.65 1.22 1.24-4.53-.277-.44A9.93 9.93 0 0 1 6.083 15c0-5.478 4.44-9.917 9.917-9.917S25.917 9.522 25.917 15 21.478 25.917 16 25.917zm5.44-7.26c-.297-.148-1.76-.867-2.033-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.457.13-.604.134-.133.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.372-.025-.52-.074-.148-.669-1.612-.916-2.21-.242-.58-.487-.502-.669-.511-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.463 1.065 2.877 1.213 3.075.148.198 2.099 3.205 5.086 4.37.712.307 1.267.49 1.7.627.714.227 1.364.195 1.877.118.573-.085 1.76-.719 2.008-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    Pedir por WhatsApp
                  </a>
                );
              })()}
            </div>
        </div>
      </>
    );
  };

  const renderProductDetails = (product: Product) => {
    return (
        <div className="p-6 sm:p-8">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{product.name}</h3>
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
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-full p-2 transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
          {isKit(item) ? renderKitDetails(item) : renderProductDetails(item)}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DetailModal;
