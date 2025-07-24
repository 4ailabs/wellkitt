import React, { useState, useEffect } from 'react';
import { analytics } from '../services/analyticsService';
import { Users, ShoppingCart, MessageCircle, TrendingUp, Activity, Target } from 'lucide-react';

interface MetricCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: 'Usuarios Únicos',
      value: '0',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Usuarios que visitaron la app'
    },
    {
      title: 'Tests Completados',
      value: '0',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Tests de endotelio finalizados'
    },
    {
      title: 'Recomendaciones',
      value: '0',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'Kits generados por IA'
    },
    {
      title: 'Productos en Carrito',
      value: '0',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-orange-500',
      description: 'Productos agregados al carrito'
    },
    {
      title: 'Pedidos WhatsApp',
      value: '0',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-green-600',
      description: 'Pedidos enviados por WhatsApp'
    },
    {
      title: 'Tasa de Conversión',
      value: '0%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-red-500',
      description: 'Conversión de visitantes a pedidos'
    }
  ]);

  // Solo mostrar en desarrollo
  useEffect(() => {
    // En desarrollo, mostrar el dashboard
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">📊 Analytics Dashboard</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`${metric.color} text-white p-2 rounded-lg mr-3`}>
              {metric.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-600">{metric.title}</div>
              <div className="text-lg font-bold text-gray-800">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600">
          💡 <strong>Tip:</strong> Este dashboard solo es visible en desarrollo. 
          En producción, usa Google Analytics para métricas reales.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 