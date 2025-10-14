# 🌿 Wellkitt - Tu Navegador de Salud Natural

<div align="center">

![Wellkitt Logo](https://img.shields.io/badge/Wellkitt-16a34a?style=for-the-badge&logo=heart&logoColor=white)

**Plataforma de recomendaciones personalizadas de suplementos naturales con IA**

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)

[Demo en vivo](https://www.wellkitt.com) • [Documentación](./SECURITY_AND_SEO_UPDATE.md) • [Reportar Bug](https://github.com/wellkitt/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Backend](#-api-backend)
- [SEO y Optimización](#-seo-y-optimización)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)

---

## ✨ Características

### 🤖 **Recomendaciones Personalizadas con IA**
- Motor de recomendaciones impulsado por **Google Gemini AI**
- Análisis de necesidades de salud del usuario
- Sugerencias de kits predefinidos o personalizados
- Explicación detallada de cada recomendación

### 🧬 **Tests de Salud Interactivos**
- **Test Endotelial**: Evalúa salud cardiovascular (20 preguntas, 6 áreas)
- **Test Nutrigenómico**: Analiza respuesta genética a alimentos (20 preguntas, 7 áreas)
- Resultados instantáneos con recomendaciones específicas

### 💉 **Sueroterapia Premium**
- Integración con plataforma de sueroterapia
- Hidratación intravenosa con vitaminas y minerales
- Link directo a tests de sueroterapia

### 🛒 **Sistema de Compras**
- Carrito de compras persistente (localStorage)
- Integración directa con WhatsApp para pedidos
- Exportación de recomendaciones (PDF/Imagen)
- Web Share API para móviles

### 📱 **Mobile-First & Responsive**
- Diseño optimizado para móviles
- Splash screen en dispositivos móviles
- Navegación intuitiva y fluida
- Paginación adaptativa (1 columna móvil, 3-4 desktop)

### 🎨 **Diseño Moderno**
- Estilo editorial limpio
- Animaciones con Framer Motion
- Gradientes sutiles y bordes de color por categoría
- Tipografía responsive (Montserrat + Inter)

---

## 🛠️ Tecnologías

### Frontend
- **React 19.1** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6.2** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **html2canvas + jsPDF** - Export functionality

### Backend
- **Express 5.1** - API server
- **Google Gemini AI** - Recommendations engine
- **CORS** - Cross-origin requests

### Productos
- **Soria Natural** - Suplementos premium
- **Biofito** - Productos naturales
- **+50 productos** en catálogo
- **8 kits estratégicos** predefinidos

---

## 🚀 Instalación

### Prerrequisitos
- **Node.js** 18+
- **npm** 9+
- **API Key de Google Gemini** ([Obtener aquí](https://makersuite.google.com/app/apikey))

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/wellkitt.git
   cd wellkitt
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env.local

   # Edita .env.local y agrega tu API key:
   # GEMINI_API_KEY=tu_api_key_real_aqui
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   Esto iniciará:
   - **Backend Express** en `http://localhost:3001`
   - **Frontend Vite** en `http://localhost:5173`

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

---

## 📖 Uso

### Modo Desarrollo

```bash
# Ejecutar ambos servidores (recomendado)
npm run dev

# Solo backend
npm run dev:server

# Solo frontend
npm run dev:client
```

### Modo Producción

```bash
# Build del frontend
npm run build

# Preview del build
npm run preview

# Ejecutar solo el servidor de producción
npm run server
```

### Verificar Estado del Backend

```bash
curl http://localhost:3001/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "message": "Wellkitt API Server está funcionando",
  "timestamp": "2025-10-14T21:00:00.000Z"
}
```

---

## 📁 Estructura del Proyecto

```
wellkitt/
├── components/           # Componentes React
│   ├── AnalyticsDashboard.tsx
│   ├── Cart.tsx
│   ├── DetailModal.tsx
│   ├── EndotelioTest.tsx
│   ├── Icons.tsx
│   ├── KitCard.tsx
│   ├── NutrigenomicaTest.tsx
│   ├── ProductCard.tsx
│   ├── RecommendationResult.tsx
│   ├── Spinner.tsx
│   ├── SplashScreen.tsx
│   └── category-config.ts
├── config/              # Configuración
│   └── analytics.ts
├── constants/           # Datos estáticos
│   ├── data.ts         # Productos y kits
│   ├── endotelioTest.ts
│   └── nutrigenomicaTest.ts
├── contexts/            # React Context
│   └── CartContext.tsx
├── hooks/               # Custom hooks
│   └── useMobileDetect.ts
├── services/            # Servicios API
│   ├── analyticsService.ts
│   └── geminiService.ts  # ✨ Actualizado: usa backend
├── public/              # Assets estáticos
│   ├── robots.txt       # 🆕 SEO
│   └── sitemap.xml      # 🆕 SEO
├── server.js            # 🆕 Backend Express
├── App.tsx              # Componente principal
├── index.html           # ✨ Actualizado: Meta tags SEO
├── types.ts             # TypeScript types
├── vite.config.ts       # ✨ Actualizado: Proxy
├── package.json         # ✨ Actualizado: Scripts
├── .env.local           # Variables de entorno (NO subir a Git)
├── .env.example         # 🆕 Plantilla de variables
└── SECURITY_AND_SEO_UPDATE.md  # 🆕 Documentación de cambios
```

---

## 🔒 API Backend

### Endpoint: `POST /api/recommend`

**Request:**
```json
{
  "userInput": "Quiero mejorar mi digestión y reducir el estrés",
  "products": [...],
  "kits": [...]
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "recommendation_type": "custom_kit",
    "custom_kit_name": "Kit Digestivo Anti-Estrés",
    "custom_kit_description": "...",
    "product_ids": ["BF04", "BF05", "BF07"],
    "reasoning": "..."
  }
}
```

**Response (Error):**
```json
{
  "error": "Rate limit exceeded",
  "message": "Se ha excedido el límite de solicitudes. Intenta de nuevo en unos minutos."
}
```

### Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 400 | Solicitud inválida |
| 429 | Rate limit excedido |
| 500 | Error del servidor |
| 504 | Timeout |

### Seguridad

✅ **API Key protegida** en el servidor (NO expuesta al cliente)
✅ **CORS habilitado** para el frontend
✅ **Validación de entrada** (máx 1000 caracteres)
✅ **Manejo robusto de errores**
✅ **Logging detallado**

---

## 🔍 SEO y Optimización

### Meta Tags Implementados

✅ **Primary meta tags** (title, description, keywords)
✅ **Open Graph** (Facebook, LinkedIn)
✅ **Twitter Cards**
✅ **Canonical URLs**
✅ **Mobile-first** (viewport, theme-color)
✅ **PWA-ready** (manifest, apple-touch-icon)

### Structured Data (Schema.org)

✅ **LocalBusiness** - Información del negocio
✅ **Organization** - Datos de contacto
✅ **WebSite** - SearchAction

### Archivos SEO

- `/public/robots.txt` - Control de crawlers
- `/public/sitemap.xml` - Mapa del sitio
- Canonical URLs en todas las páginas

### Google Analytics 4

Tracking ID: `G-KQVFDWQ8VT`

Configurado para:
- Page views
- Events personalizados
- Anonymize IP
- GDPR compliance

---

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

1. **Conectar repositorio**
   ```bash
   vercel
   ```

2. **Configurar variables de entorno**
   - GEMINI_API_KEY

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Opción 2: Netlify

1. **Configurar build**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Agregar variables de entorno**
   - GEMINI_API_KEY

3. **Deploy**

### Opción 3: Railway / Render

Ambos soportan Node.js + Express de forma nativa.

### Post-Deploy

1. ✅ Enviar sitemap a Google Search Console
2. ✅ Verificar meta tags con [OpenGraph](https://www.opengraph.xyz/)
3. ✅ Probar responsive en diferentes dispositivos
4. ✅ Verificar Google Analytics

---

## 🤝 Contribuir

¡Contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y propiedad de **Wellkitt**.

---

## 📞 Contacto

**Wellkitt**
- 📱 WhatsApp: [+52 55 7907 6626](https://wa.me/525579076626)
- 📍 Dirección: Acapulco 36, Roma Nte., CDMX
- 🌐 Web: [www.wellkitt.com](https://www.wellkitt.com)

---

<div align="center">

**Hecho con ❤️ por el equipo Wellkitt**

[⬆ Volver arriba](#-wellkitt---tu-navegador-de-salud-natural)

</div>
