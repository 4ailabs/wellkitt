import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart, sendCartToWhatsApp } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleSendToWhatsApp = () => {
    sendCartToWhatsApp();
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón del carrito */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-brand-green-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-brand-green-700 active:scale-95 transition-all duration-300 group"
      >
        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
        {state.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
            {state.totalItems > 99 ? '99+' : state.totalItems}
          </span>
        )}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-800 text-white text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Mi Carrito ({state.totalItems})
        </div>
      </button>

      {/* Modal del carrito */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-brand-green-600 text-white p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Mi Carrito</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[50vh] md:max-h-[60vh]">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-500">Agrega productos para hacer tu pedido</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                              {item.product.name}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-500">{item.product.brand}</p>
                            <span className="inline-block mt-1 text-xs bg-brand-green-100 text-brand-green-700 px-2 py-1 rounded-full">
                              {item.product.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-sm text-gray-600">
                      Total: {state.totalItems} productos
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full sm:flex-1 bg-gray-200 text-gray-800 font-semibold py-2.5 md:py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors text-sm md:text-base"
                    >
                      Seguir comprando
                    </button>
                    <button
                      onClick={handleSendToWhatsApp}
                      className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 md:py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <Send className="w-4 h-4" />
                      Pedir por WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart; 