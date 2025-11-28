import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X, Trash2, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { RecommendationHistoryEntry } from '../hooks/useRecommendationHistory';
import { useScrollLock } from '../hooks/useScrollLock';

interface RecommendationHistoryProps {
  history: RecommendationHistoryEntry[];
  onSelectRecommendation: (entry: RecommendationHistoryEntry) => void;
  onDeleteRecommendation: (id: string) => void;
  onClearHistory: () => void;
}

const RecommendationHistory: React.FC<RecommendationHistoryProps> = ({
  history,
  onSelectRecommendation,
  onDeleteRecommendation,
  onClearHistory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll cuando el historial está abierto
  useScrollLock(isOpen);

  if (history.length === 0) return null;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  };

  const getHealthAreasText = (areas: string[]) => {
    const healthAreasMap: Record<string, string> = {
      energia: 'Energía',
      digestion: 'Digestión',
      inmunidad: 'Inmunidad',
      sueno: 'Sueño',
      estres: 'Estrés',
      cardiovascular: 'Corazón',
      cognitivo: 'Mente',
      articular: 'Articulaciones',
    };
    return areas.map(a => healthAreasMap[a] || a).join(', ');
  };

  return (
    <>
      {/* Botón flotante para abrir historial */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-4 z-40 bg-white border-2 border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Ver historial de recomendaciones"
      >
        <History className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-brand-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {history.length}
        </span>
      </motion.button>

      {/* Panel lateral del historial */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-brand-green-50 to-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-green-100 rounded-full">
                    <History className="w-5 h-5 text-brand-green-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">Mis Recomendaciones</h2>
                    <p className="text-xs text-slate-500">{history.length} guardadas</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Lista de recomendaciones */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {history.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-brand-green-300 transition-all cursor-pointer group"
                    onClick={() => {
                      onSelectRecommendation(entry);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-green-600" />
                        <span className="font-semibold text-slate-800 text-sm">
                          {entry.recommendation.custom_kit_name || 'Kit Personalizado'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">{formatDate(entry.timestamp)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                      "{entry.userInput}"
                    </p>

                    {entry.healthAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {entry.healthAreas.slice(0, 3).map(area => (
                          <span key={area} className="text-[10px] px-2 py-0.5 bg-brand-green-100 text-brand-green-700 rounded-full">
                            {getHealthAreasText([area])}
                          </span>
                        ))}
                        {entry.healthAreas.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                            +{entry.healthAreas.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {entry.recommendation.product_ids.length} productos
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteRecommendation(entry.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-green-600 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de que quieres eliminar todo el historial?')) {
                      onClearHistory();
                    }
                  }}
                  className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar historial
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecommendationHistory;
