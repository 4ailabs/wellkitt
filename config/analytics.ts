// Configuración de Analytics para Wellkitt

// Definir tipos para Vite env
interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const ANALYTICS_CONFIG = {
  // ID de Google Analytics 4 para Wellkitt
  GA_MEASUREMENT_ID: 'G-KQVFDWQ8VT',
  
  // Eventos personalizados
  EVENTS: {
    TEST_START: 'test_start',
    TEST_COMPLETE: 'test_complete',
    RECOMMENDATION_GENERATED: 'recommendation_generated',
    PRODUCT_ADDED_TO_CART: 'add_to_cart',
    KIT_ADDED_TO_CART: 'kit_added_to_cart',
    WHATSAPP_ORDER: 'whatsapp_order',
    PRODUCT_VIEW: 'product_view',
    KIT_VIEW: 'kit_view',
    CATEGORY_FILTER: 'category_filter',
    SEARCH: 'search',
    CONVERSION: 'conversion',
    ENGAGEMENT: 'engagement'
  },
  
  // Categorías de eventos
  CATEGORIES: {
    ENDOTELIO_TEST: 'endotelio_test',
    AI_RECOMMENDATION: 'ai_recommendation',
    ECOMMERCE: 'ecommerce',
    CONVERSION: 'conversion',
    NAVIGATION: 'navigation',
    ENGAGEMENT: 'engagement',
    BUSINESS: 'business'
  },
  
  // Fuentes de pedidos
  ORDER_SOURCES: {
    CART: 'cart',
    RECOMMENDATION: 'recommendation',
    TEST: 'test'
  }
};

// Función para obtener el ID de GA desde variables de entorno
export const getGAId = (): string => {
  // Por ahora, usar el ID de configuración
  // En producción, configurar VITE_GA_MEASUREMENT_ID en las variables de entorno
  return ANALYTICS_CONFIG.GA_MEASUREMENT_ID;
}; 