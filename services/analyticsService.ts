// Servicio de Analytics para Wellkitt
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public init(): void {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      this.isInitialized = true;
      console.log('Analytics inicializado correctamente');
    } else {
      console.warn('Google Analytics no está disponible');
    }
  }

  public trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized || !window.gtag) {
      console.warn('Analytics no inicializado, evento no trackeado:', event);
      return;
    }

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });

    console.log('Evento trackeado:', event);
  }

  // Eventos específicos de Wellkitt
  public trackTestStart(): void {
    this.trackEvent({
      action: 'test_start',
      category: 'endotelio_test',
      label: 'Usuario inició test de endotelio'
    });
  }

  public trackTestComplete(score: number, level: string): void {
    this.trackEvent({
      action: 'test_complete',
      category: 'endotelio_test',
      label: `Test completado - Nivel: ${level}`,
      value: score
    });
  }

  public trackRecommendationGenerated(productsCount: number): void {
    this.trackEvent({
      action: 'recommendation_generated',
      category: 'ai_recommendation',
      label: `Recomendación generada con ${productsCount} productos`,
      value: productsCount
    });
  }

  public trackProductAddedToCart(productName: string, category: string): void {
    this.trackEvent({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: `${productName} (${category})`
    });
  }

  public trackKitAddedToCart(kitName: string, productsCount: number): void {
    this.trackEvent({
      action: 'kit_added_to_cart',
      category: 'ecommerce',
      label: `${kitName} con ${productsCount} productos`,
      value: productsCount
    });
  }

  public trackWhatsAppOrder(productsCount: number, source: 'cart' | 'recommendation' | 'test'): void {
    this.trackEvent({
      action: 'whatsapp_order',
      category: 'conversion',
      label: `Pedido WhatsApp desde ${source}`,
      value: productsCount
    });
  }

  public trackProductView(productName: string, category: string): void {
    this.trackEvent({
      action: 'product_view',
      category: 'ecommerce',
      label: `${productName} (${category})`
    });
  }

  public trackKitView(kitName: string): void {
    this.trackEvent({
      action: 'kit_view',
      category: 'ecommerce',
      label: kitName
    });
  }

  public trackCategoryFilter(category: string): void {
    this.trackEvent({
      action: 'category_filter',
      category: 'navigation',
      label: category
    });
  }

  public trackSearch(searchTerm: string): void {
    this.trackEvent({
      action: 'search',
      category: 'engagement',
      label: searchTerm
    });
  }

  public trackPageView(pageName: string): void {
    if (!this.isInitialized || !window.gtag) return;
    
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href
    });
  }

  // Métricas de conversión
  public trackConversion(conversionType: string, value?: number): void {
    this.trackEvent({
      action: 'conversion',
      category: 'business',
      label: conversionType,
      value: value
    });
  }

  // Métricas de engagement
  public trackEngagement(action: string, label?: string): void {
    this.trackEvent({
      action: action,
      category: 'engagement',
      label: label
    });
  }
}

// Exportar instancia singleton
export const analytics = AnalyticsService.getInstance(); 