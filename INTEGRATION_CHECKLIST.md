# ✅ Checklist de Integración — Rediseño Wellkitt

## Fase 1: Preparación

- [ ] Leer `REDESIGN_SETUP.md` completamente
- [ ] Leer `REDESIGN_SUMMARY.txt` para entender el diseño
- [ ] Verificar que todos los componentes están en `/components/`:
  - [ ] `HeroModern.tsx`
  - [ ] `FeaturesSection.tsx`
  - [ ] `TestimonialSection.tsx`
  - [ ] `CTASection.tsx`
  - [ ] `ProductGridModern.tsx`
  - [ ] `FooterModern.tsx`
- [ ] Verificar cambios en `index.html`:
  - [ ] Nuevas fonts (Lora + Plus Jakarta Sans)
  - [ ] Paleta de colores expandida
  - [ ] Estilos globales agregados

## Fase 2: Integración en App.tsx

### 2.1 Importar nuevos componentes
```tsx
// Agregar estas líneas al top de App.tsx
import HeroModern from './components/HeroModern';
import FeaturesSection from './components/FeaturesSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import ProductGridModern from './components/ProductGridModern';
import FooterModern from './components/FooterModern';
```

- [ ] Imports agregados correctamente

### 2.2 Reorganizar estructura de secciones

Buscar la estructura actual del JSX en App.tsx y reemplazar/agregar en este orden:

```tsx
return (
  <>
    {/* 1. Navbar flotante (mantener igual) */}
    <Navbar
      onOpenCart={handleOpenCart}
      onOpenFavorites={handleOpenFavorites}
    />

    {/* 2. NUEVO: Hero moderno */}
    <HeroModern
      onStartRecommendation={() => scrollToSection('recomendador')}
    />

    {/* 3. NUEVO: Features */}
    <FeaturesSection />

    {/* 4. NUEVO: Productos destacados */}
    <ProductGridModern
      products={products.slice(0, 12)}
      title="Explora | Productos Premium"
      subtitle="Selecciones cuidadas de marcas certificadas"
      onShowDetails={handleShowProductDetails}
    />

    {/* 5. NUEVO: Testimonios */}
    <TestimonialSection />

    {/* 6. NUEVO: CTA Final */}
    <CTASection onStartTest={() => scrollToSection('recomendador')} />

    {/* 7. Mantener secciones existentes: Recomendador, Tests, etc. */}
    {/* ... (mantener igual) ... */}

    {/* 8. NUEVO: Footer moderno */}
    <FooterModern />

    {/* 9. Mantener modales (Cart, Favorites, DetailModal) */}
    {/* ... (mantener igual) ... */}
  </>
)
```

- [ ] Estructura reorganizada

### 2.3 Conectar callbacks

- [ ] `HeroModern` → `onStartRecommendation` redirige a sección recomendador
- [ ] `CTASection` → `onStartTest` redirige a sección recomendador
- [ ] `ProductGridModern` → `onShowDetails` abre DetailModal

## Fase 3: Personalización (Opcional)

### 3.1 HeroModern.tsx
- [ ] Actualizar números en trust indicators (línea ~120):
  ```tsx
  { number: '500+', label: 'Productos' },    // cambiar a números reales
  { number: '50K+', label: 'Clientes' },     // cambiar a números reales
  { number: '4.9★', label: 'Calificación' }, // cambiar a rating real
  ```

### 3.2 FeaturesSection.tsx
- [ ] Verificar que las 6 características tiene sentido (línea ~6)
- [ ] Cambiar títulos si es necesario
- [ ] Cambiar descripciones si es necesario

### 3.3 TestimonialSection.tsx
- [ ] Reemplazar testimonios con clientes reales (línea ~5)
- [ ] Cambiar emojis si no matchean roles
- [ ] Mantener o cambiar ratings según corresponda

### 3.4 CTASection.tsx
- [ ] Actualizar "Oferta limitada: Primeros 3 meses con 20% descuento" (línea ~40)
- [ ] Cambiar a promo actual si existe

### 3.5 ProductGridModern.tsx
- [ ] Configurar categorías de productos a mostrar

### 3.6 FooterModern.tsx
- [ ] Verificar redes sociales links
- [ ] Verificar email en contacto
- [ ] Verificar teléfono en contacto

## Fase 4: Ajustes de Colores (Si aplica)

### 4.1 Si quieres cambiar la paleta
Editar `index.html` en la sección `tailwind.config`:
- [ ] Cambiar `brand-green` en `colors`
- [ ] Cambiar `brand-gold` en `colors`
- [ ] Verificar contraste después (WCAG AA)

### 4.2 Componentes existentes (Opcional)
- [ ] ProductCardPremium: cambiar colores si deseas
- [ ] DetailModal: cambiar colores si deseas
- [ ] Cart/Favorites: cambiar colores si deseas

## Fase 5: Testing

### 5.1 Testing Responsivo
- [ ] Probar en móvil (375px) — 1 columna
- [ ] Probar en tablet (768px) — 2 columnas
- [ ] Probar en desktop (1200px) — 4 columnas
- [ ] Probar en XL (1400px+) — espacios amplios

### 5.2 Testing de Animaciones
- [ ] Scroll fluido (no saltos)
- [ ] Animaciones suaves (60fps)
- [ ] Hover effects funcionar
- [ ] Stagger animations estar presentes

### 5.3 Testing de Funcionalidad
- [ ] Botones CTA redirigen correctamente
- [ ] Links en footer funcionar
- [ ] Newsletter subscription funcionar
- [ ] Botones cart/favorites funcionar

### 5.4 Testing de Accesibilidad
- [ ] Todos los textos legibles (>= 16px)
- [ ] Contraste de colores WCAG AA (mínimo)
- [ ] Navegación clara y lógica
- [ ] Iconos tienen aria-labels

### 5.5 Testing de Navegadores
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

## Fase 6: Optimización

### 6.1 Performance
- [ ] Lighthouse score >= 90 (Desktop)
- [ ] Lighthouse score >= 80 (Mobile)
- [ ] Imágenes optimizadas (lazy loading)
- [ ] Fuentes cargan rápido (woff2)

### 6.2 SEO
- [ ] Meta tags actualizados
- [ ] Open Graph tags actualizados
- [ ] Structured data válido
- [ ] Sitemap actualizado

## Fase 7: Deployment

### 7.1 Antes de push
- [ ] Código está limpio (sin console.log)
- [ ] Imports están ordenados
- [ ] TypeScript no tiene errores
- [ ] Linter pasa

### 7.2 Git
- [ ] `git status` limpio
- [ ] `git diff` revisa cambios
- [ ] Commit message descriptivo
- [ ] Push a rama correcta

### 7.3 Vercel
- [ ] Deploy automático completó exitosamente
- [ ] Acceder a URL del sitio
- [ ] Verificar que todo renderiza bien
- [ ] Compartir con team para feedback

## Fase 8: Post-Launch

- [ ] Monitorear analytics (vistas, conversiones)
- [ ] Recopilar feedback de usuarios
- [ ] Ajustar colores/texto si es necesario
- [ ] Actualizar testimonios regularmente
- [ ] Mantener ofertas al día

---

## Notas Importantes

### Color Accessibility
Si cambias colores, verificar contraste:
- Text color on white: mínimo `#757575` (4.5:1 ratio)
- Text color on colored bg: usar tonos oscuros
- Button text: blanco o muy oscuro

### Performance Tips
- Lazy load imágenes en ProductGrid
- Usar `useMobileDetect` hook para optimizar en móvil
- Debounce scroll events
- Preload críticas fonts

### Customización Segura
Cambios seguros sin romper nada:
- Editar texto en componentes
- Cambiar números en trust indicators
- Actualizar testimonios
- Cambiar colores en `index.html`

Cambios peligrosos (requieren testing):
- Modificar estructura de componentes
- Cambiar Framer Motion props
- Editar grid breakpoints
- Cambiar tamaños de fuentes

## Soporte

Si necesitas ayuda:
1. Revisa `REDESIGN_SETUP.md` para referencias
2. Revisa component inline comments
3. Prueba en local antes de push
4. Consulta Framer Motion docs si cambias animaciones

---

**Estimado: 2-3 horas para integración completa**
**Estimado: 1-2 horas para testing y ajustes**

Status: 🟢 Listo para comenzar integración
