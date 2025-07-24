# 📊 Configuración de Analytics para Wellkitt

## 🎯 Métricas que se Trackean

### **Eventos Principales:**
- **Test de Endotelio:** Inicio y completado
- **Recomendaciones IA:** Generación de kits personalizados
- **Carrito:** Agregar productos, kits y pedidos
- **Conversiones:** Pedidos por WhatsApp
- **Navegación:** Filtros de categorías, vistas de productos

### **Métricas de Negocio:**
- Usuarios únicos y sesiones
- Tasa de conversión (visitantes → pedidos)
- Productos más populares
- Fuentes de tráfico
- Comportamiento de usuarios

## 🚀 Configuración de Google Analytics 4

### **1. Crear Cuenta de Google Analytics**

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva cuenta para "Wellkitt"
3. Crea una nueva propiedad web
4. Obtén tu **Measurement ID** (formato: G-XXXXXXXXXX)

### **2. Configurar el ID en la Aplicación**

#### **Opción A: Configuración Directa**
Edita `config/analytics.ts`:
```typescript
export const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID: 'G-KQVFDWQ8VT', // Reemplaza con tu ID
  // ... resto de configuración
};
```

#### **Opción B: Variable de Entorno (Recomendado)**
1. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_GA_MEASUREMENT_ID=G-TU-ID-REAL-AQUI
```

2. Agrega `.env` a tu `.gitignore`:
```gitignore
.env
.env.local
```

### **3. Verificar la Instalación**

1. Abre la consola del navegador
2. Deberías ver: "Analytics inicializado correctamente"
3. Ve a Google Analytics → Tiempo real → Verifica que aparezcan visitantes

## 📈 Dashboard de Métricas

### **Métricas Clave a Monitorear:**

#### **🚀 Engagement:**
- **Usuarios únicos** por día/semana/mes
- **Sesiones** y duración promedio
- **Páginas vistas** por sesión
- **Tasa de rebote**

#### **🧪 Test de Endotelio:**
- **Tests iniciados** vs **completados**
- **Tasa de abandono** por pregunta
- **Distribución de resultados** (Óptimo, Riesgo, etc.)
- **Tiempo promedio** para completar

#### **🤖 Recomendaciones IA:**
- **Recomendaciones generadas**
- **Productos más recomendados**
- **Tasa de conversión** de recomendaciones a pedidos
- **Calidad de prompts** (longitud, contenido)

#### **🛒 Carrito y Conversiones:**
- **Productos agregados** al carrito
- **Kits más populares**
- **Tasa de abandono** del carrito
- **Pedidos por WhatsApp** (conversiones)
- **Valor promedio** de pedidos

#### **📱 Experiencia Móvil:**
- **Tráfico móvil** vs desktop
- **Rendimiento** en diferentes dispositivos
- **Errores** y problemas técnicos

## 🔧 Eventos Personalizados

### **Eventos Automáticos:**
```typescript
// Se trackean automáticamente
analytics.trackTestStart();
analytics.trackTestComplete(score, level);
analytics.trackRecommendationGenerated(productsCount);
analytics.trackProductAddedToCart(productName, category);
analytics.trackWhatsAppOrder(productsCount, source);
```

### **Eventos Manuales (si necesitas agregar más):**
```typescript
// En cualquier componente
import { analytics } from '../services/analyticsService';

// Trackear evento personalizado
analytics.trackEvent({
  action: 'button_click',
  category: 'engagement',
  label: 'cta_principal',
  value: 1
});
```

## 📊 Reportes Recomendados

### **Reportes Diarios:**
1. **Usuarios activos** por día
2. **Tests completados**
3. **Pedidos por WhatsApp**
4. **Productos más agregados al carrito**

### **Reportes Semanales:**
1. **Tendencias de engagement**
2. **Análisis de conversión**
3. **Performance por dispositivo**
4. **Fuentes de tráfico**

### **Reportes Mensuales:**
1. **Crecimiento de usuarios**
2. **ROI de marketing**
3. **Análisis de cohortes**
4. **Optimización de funnel**

## 🛠️ Herramientas Adicionales

### **Google Tag Manager (Opcional):**
Para mayor flexibilidad en el tracking:
1. Configura GTM en lugar de GA directamente
2. Permite cambios sin modificar código
3. Mejor gestión de eventos

### **Hotjar (Análisis de Comportamiento):**
Para entender mejor el comportamiento de usuarios:
- **Heatmaps** de clics y scroll
- **Grabaciones** de sesiones
- **Encuestas** de satisfacción

### **Google Search Console:**
Para SEO y tráfico orgánico:
- **Palabras clave** que llevan tráfico
- **Errores** de indexación
- **Performance** en búsquedas

## 🔒 Privacidad y GDPR

### **Configuraciones Recomendadas:**
1. **Anonimizar IPs** en Google Analytics
2. **Respetar Do Not Track**
3. **Consentimiento** de cookies (si aplica)
4. **Retención de datos** limitada

### **Implementación:**
```typescript
// En analyticsService.ts
gtag('config', 'GA_MEASUREMENT_ID', {
  anonymize_ip: true,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});
```

## 🚨 Troubleshooting

### **Problemas Comunes:**

#### **"Analytics no inicializado"**
- Verifica que el ID de GA sea correcto
- Asegúrate de que el script de GA se cargue
- Revisa la consola del navegador

#### **Eventos no aparecen en GA**
- Espera 24-48 horas para datos en tiempo real
- Verifica que los eventos se envíen correctamente
- Revisa filtros en GA

#### **Datos inconsistentes**
- Verifica múltiples fuentes de tráfico
- Revisa configuración de objetivos
- Asegúrate de no tener tracking duplicado

## 📞 Soporte

Para problemas técnicos:
- Revisa la [documentación de GA4](https://developers.google.com/analytics/devguides/collection/ga4)
- Consulta la [comunidad de Google Analytics](https://support.google.com/analytics/)
- Contacta al equipo de desarrollo

---

**¡Con esta configuración tendrás visibilidad completa del comportamiento de tus usuarios en Wellkitt!** 🎯📊 