
import React, { useState, useCallback, useEffect } from 'react';
import { products as baseProducts, kits } from './constants/data';
import productosJsonRaw from './constants/Productos.json';
import { Product, Kit, Recommendation, SaladRecipe } from './types';
import KitCard from './components/KitCard';
import RecommendationResult from './components/RecommendationResult';
import Spinner from './components/Spinner';
import { getKitRecommendation } from './services/geminiService';
import DetailModal from './components/DetailModal';
import EndotelioTest from './components/EndotelioTest';
import NutrigenomicaTest from './components/NutrigenomicaTest';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import Toast from './components/Toast';
import RecommendationHistory from './components/RecommendationHistory';
import Navbar from './components/Navbar';
import SaladsBank from './components/SaladsBank';
import { useRecommendationHistory, RecommendationHistoryEntry } from './hooks/useRecommendationHistory';
import { CartProvider, useCart } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { mainCategories } from './components/category-config';
import { Heart, Droplets, Dna, ArrowRight } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import HeroModern from './components/HeroModern';
import FeaturesSection from './components/FeaturesSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import ProductGridModern from './components/ProductGridModern';
import FooterModern from './components/FooterModern';
import StorePage from './components/StorePage';
import useMobileDetect from './hooks/useMobileDetect';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Kit | Product | null>(null);
  const [showEndotelioTest, setShowEndotelioTest] = useState(false);
  const [showNutrigenomicaTest, setShowNutrigenomicaTest] = useState(false);
  const [showSalads, setShowSalads] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [storeInitialCategory, setStoreInitialCategory] = useState<string | undefined>(undefined);
  const [showSplash, setShowSplash] = useState(true);
  const [showAllKits, setShowAllKits] = useState(false);
  const [activeKitFilter, setActiveKitFilter] = useState<string>('all');
  const [selectedHealthAreas, setSelectedHealthAreas] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const isSaladScreen = (state: any) =>
    state?.screen === 'salads' || state?.screen === 'salad-detail';

  // Hook para historial de recomendaciones
  const {
    history: recommendationHistory,
    addRecommendation,
    deleteRecommendation,
    clearHistory,
  } = useRecommendationHistory();

  // Detectar dispositivo móvil
  const { isMobile } = useMobileDetect();

  const handleBackToMain = () => {
    setShowEndotelioTest(false);
    setShowNutrigenomicaTest(false);
    setShowSalads(false);
    setShowStore(false);
    setStoreInitialCategory(undefined);
  };

  const handleOpenStore = (category?: string) => {
    setStoreInitialCategory(category);
    setShowStore(true);
    window.scrollTo({ top: 0 });
  };

  const handleSaladsBack = () => {
    if (window.history.state?.screen === 'salads') {
      window.history.back();
      return;
    }
    setShowSalads(false);
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setShowSalads(isSaladScreen(event.state));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (showSalads && !isSaladScreen(window.history.state)) {
      window.history.pushState({ screen: 'salads' }, '');
    }
  }, [showSalads]);

  // Tipar como any para evitar errores de tipo
  const productosJson: any = productosJsonRaw;

  // Mapear productos extra
  const extraProducts = [
    ...(productosJson.productos?.biofito || []).map((p: any) => ({
      id: p.id,
      name: p.nombre,
      brand: 'Biofito',
      ingredients: p.ingredientes,
      benefits: p.beneficios,
      presentation: p.presentacion,
      category: Array.isArray(p.categoria) ? p.categoria[0] : p.categoria,
    })),
    ...(productosJson.productos?.aminoacidos || []).map((p: any) => ({
      id: p.id,
      name: p.nombre,
      brand: 'Aminoácidos',
      ingredients: p.ingredientes,
      benefits: p.beneficios,
      presentation: p.presentacion,
      category: Array.isArray(p.categoria) ? p.categoria[0] : p.categoria,
    })),
  ];
  const existingIds = new Set(baseProducts.map(p => p.id));
  const newProducts = extraProducts.filter(p => !existingIds.has(p.id));
  const products = [...baseProducts, ...newProducts];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) {
      setError("Por favor, describe tu objetivo de salud.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      // Construir contexto enriquecido con las selecciones del usuario
      const healthAreasMap: Record<string, string> = {
        energia: 'energía y vitalidad',
        digestion: 'salud digestiva',
        inmunidad: 'sistema inmunológico',
        sueno: 'calidad del sueño',
        estres: 'manejo del estrés',
        cardiovascular: 'salud cardiovascular',
        cognitivo: 'función cognitiva y memoria',
        articular: 'salud articular y ósea',
      };

      const goalsMap: Record<string, string> = {
        inmediato: 'busco alivio rápido de síntomas',
        largo: 'busco mejora sostenida a largo plazo',
        preventivo: 'quiero prevenir problemas futuros',
        optimizar: 'quiero optimizar mi rendimiento actual',
      };

      let enrichedInput = userInput;

      if (selectedHealthAreas.length > 0) {
        const areasText = selectedHealthAreas.map(a => healthAreasMap[a]).join(', ');
        enrichedInput = `Áreas de interés: ${areasText}. ${enrichedInput}`;
      }

      if (selectedGoal) {
        enrichedInput = `${enrichedInput} (${goalsMap[selectedGoal]})`;
      }

      const result = await getKitRecommendation(enrichedInput, products, kits);
      if (result) {
        setRecommendation(result);
        // Guardar en historial
        addRecommendation(userInput, selectedHealthAreas, selectedGoal, result);
      } else {
        setError("No pudimos generar una recomendación. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Ocurrió un error al contactar al servicio de recomendación.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, products, kits, selectedHealthAreas, selectedGoal]);

  const handleShowDetails = (item: Kit | Product) => {
    setSelectedItem(item);
  };

  const handleSelectFromHistory = (entry: RecommendationHistoryEntry) => {
    setUserInput(entry.userInput);
    setSelectedHealthAreas(entry.healthAreas);
    setSelectedGoal(entry.goal);
    setRecommendation(entry.recommendation);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  // Scroll a una sección específica
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mostrar splash screen solo en dispositivos móviles
  if (isMobile && showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Navbar que aparece al scroll */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenStore={() => handleOpenStore()}
        onGoHome={handleBackToMain}
        isOnLanding={!showEndotelioTest && !showNutrigenomicaTest && !showSalads && !showStore}
      />

      <main style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {showEndotelioTest ? (
          <EndotelioTest
            allProducts={products}
            onShowDetails={handleShowDetails}
            onBackToMain={handleBackToMain}
          />
        ) : showNutrigenomicaTest ? (
          <NutrigenomicaTest
            allProducts={products}
            onShowDetails={handleShowDetails}
            onBackToMain={handleBackToMain}
          />
        ) : showSalads ? (
          <SaladsBank
            onSelectSalad={(salad: SaladRecipe) => {
              console.log('Ensalada seleccionada:', salad);
            }}
            onBack={handleSaladsBack}
            onShowProductDetails={handleShowDetails}
          />
        ) : showStore ? (
          <StorePage
            products={products}
            onBack={handleBackToMain}
            onShowDetails={handleShowDetails}
            initialCategory={storeInitialCategory}
          />
        ) : (
          <>
            {/* Hero Section */}
            {/* Hero Moderno */}
            <HeroModern onStartRecommendation={() => scrollToSection('recomendador')} />

            {/* Features Section */}
            <FeaturesSection />

            {/* Productos Destacados */}
            <ProductGridModern
              products={products.slice(0, 12)}
              title="Explora | Productos Premium"
              subtitle="Selecciones cuidadas de marcas certificadas"
              onShowDetails={handleShowDetails}
              onViewAll={() => handleOpenStore()}
            />

            {/* Testimonios */}
            <TestimonialSection />

            {/* CTA Categorías */}
            <CTASection
              onStartTest={() => scrollToSection('tests')}
              onShowSalads={() => setShowSalads(true)}
              onScrollToProducts={() => handleOpenStore()}
            />

            {/* Recomendador IA */}
            <section id="recomendador" className="py-20 sm:py-28 bg-white">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Lora, serif' }}>
                    Tu recomendación personalizada
                  </h2>
                  <p className="text-slate-500 text-base mt-3 max-w-lg mx-auto">
                    Nuestra IA analiza tu perfil y te sugiere los productos ideales para tus objetivos.
                  </p>
                </div>

                {/* Paso 1: Áreas de Salud */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-slate-700 mb-3">1. Áreas de salud <span className="text-slate-400 font-normal">(opcional)</span></p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'energia', label: 'Energía', icon: '⚡' },
                      { id: 'digestion', label: 'Digestión', icon: '🌿' },
                      { id: 'inmunidad', label: 'Inmunidad', icon: '🛡️' },
                      { id: 'sueno', label: 'Sueño', icon: '😴' },
                      { id: 'estres', label: 'Estrés', icon: '🧘' },
                      { id: 'cardiovascular', label: 'Corazón', icon: '❤️' },
                      { id: 'cognitivo', label: 'Mente', icon: '🧠' },
                      { id: 'articular', label: 'Articulaciones', icon: '🦴' },
                    ].map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => {
                          setSelectedHealthAreas(prev =>
                            prev.includes(area.id) ? prev.filter(a => a !== area.id) : [...prev, area.id]
                          );
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedHealthAreas.includes(area.id)
                            ? 'bg-brand-green-600 text-white'
                            : 'bg-slate-50 text-slate-600 hover:bg-brand-green-50 hover:text-brand-green-700 border border-slate-200'
                        }`}
                      >
                        <span className="mr-1.5">{area.icon}</span>{area.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paso 2: Objetivo */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-slate-700 mb-3">2. Resultado esperado <span className="text-slate-400 font-normal">(opcional)</span></p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'inmediato', label: 'Alivio rápido' },
                      { id: 'largo', label: 'Mejora a largo plazo' },
                      { id: 'preventivo', label: 'Prevención' },
                      { id: 'optimizar', label: 'Optimizar rendimiento' },
                    ].map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoal(prev => prev === goal.id ? '' : goal.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedGoal === goal.id
                            ? 'bg-brand-green-600 text-white'
                            : 'bg-slate-50 text-slate-600 hover:bg-brand-green-50 hover:text-brand-green-700 border border-slate-200'
                        }`}
                      >
                        {goal.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paso 3: Descripción libre */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-3">3. Cuéntanos más</p>
                    <textarea
                      value={userInput}
                      onChange={handleInputChange}
                      placeholder="Describe tu objetivo de salud, síntomas o lo que quieres mejorar..."
                      className="w-full p-5 border border-slate-200 rounded-2xl focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-100 focus:outline-none resize-none text-base text-slate-700 bg-white"
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {[
                      'Quiero más energía',
                      'Mejorar mi digestión',
                      'Fortalecer mi sistema inmune',
                      'Dormir mejor',
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setUserInput(suggestion)}
                        className="text-xs px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors border border-slate-100"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="w-full py-4 bg-brand-green-600 text-white text-base font-semibold rounded-full hover:bg-brand-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Analizando tu perfil...' : 'Obtener Recomendación'}
                  </button>

                  {error && (
                    <div className="mt-6 p-4 bg-red-50 rounded-2xl">
                      <p className="text-red-600 text-center text-sm font-medium">{error}</p>
                    </div>
                  )}
                </form>

                {isLoading && <Spinner />}
                {recommendation && (
                  <RecommendationResult
                    recommendation={recommendation}
                    allProducts={products}
                    onNewRecommendation={() => {
                      setRecommendation(null);
                      setUserInput('');
                      setSelectedHealthAreas([]);
                      setSelectedGoal('');
                    }}
                  />
                )}
              </div>
            </section>

            {/* Tests de Salud */}
            <section id="tests" className="py-20 sm:py-28 bg-slate-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Lora, serif' }}>
                    Tests de Salud
                  </h2>
                  <p className="text-slate-500 text-base mt-2 max-w-md">
                    Evaluaciones científicas para conocer tu perfil y recibir recomendaciones personalizadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    {
                      icon: <Heart className="w-5 h-5" strokeWidth={2} />,
                      title: 'Test Endotelial',
                      desc: 'Evalúa tu salud cardiovascular con 20 preguntas sobre 6 áreas fundamentales.',
                      action: () => setShowEndotelioTest(true),
                      href: undefined,
                    },
                    {
                      icon: <Dna className="w-5 h-5" strokeWidth={2} />,
                      title: 'Test Nutrigenómico',
                      desc: 'Descubre cómo tus genes responden a los alimentos. 20 preguntas sobre 7 áreas genéticas.',
                      action: () => setShowNutrigenomicaTest(true),
                      href: undefined,
                    },
                    {
                      icon: <Droplets className="w-5 h-5" strokeWidth={2} />,
                      title: 'Sueroterapia Premium',
                      desc: 'Hidratación intravenosa con vitaminas, minerales y antioxidantes.',
                      action: undefined,
                      href: 'https://sueroterapia-premiun.vercel.app',
                    },
                  ].map((test) => (
                    <div
                      key={test.title}
                      className="group bg-white rounded-2xl p-8 hover:shadow-md transition-shadow cursor-pointer border border-slate-100"
                      onClick={test.action}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-brand-green-50 text-brand-green-600">
                        {test.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug" style={{ fontFamily: 'Lora, serif' }}>
                        {test.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">{test.desc}</p>
                      {test.href ? (
                        <a href={test.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-600 hover:text-brand-green-700 transition-colors">
                          Comenzar <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-600 group-hover:text-brand-green-700 transition-colors">
                          Comenzar <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Kits Estratégicos */}
            <section className="py-20 sm:py-28 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Lora, serif' }}>
                      Kits Estratégicos
                    </h2>
                    <p className="text-slate-500 text-base mt-2 max-w-md">
                      Soluciones diseñadas para objetivos de salud específicos.
                    </p>
                  </div>
                  {!showAllKits && kits.length > 3 && (
                    <button
                      onClick={() => setShowAllKits(true)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-brand-green-600 transition-colors shrink-0 self-start sm:self-auto"
                    >
                      Ver Todos ({kits.length}) <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Kit filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'detox', label: 'Detox', keywords: ['detox', 'desintox'] },
                    { id: 'digestivo', label: 'Digestión', keywords: ['digestiv', 'flora', 'intestin'] },
                    { id: 'estres', label: 'Estrés & Sueño', keywords: ['estrés', 'sueño', 'ansiedad', 'relaj'] },
                    { id: 'energia', label: 'Energía', keywords: ['energía', 'fatiga', 'rendimiento'] },
                    { id: 'inmunidad', label: 'Inmunidad', keywords: ['inmun', 'defensa', 'resfri'] },
                  ].map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setActiveKitFilter(filter.id);
                        if (filter.id !== 'all') setShowAllKits(true);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeKitFilter === filter.id
                          ? 'bg-brand-green-600 text-white'
                          : 'bg-slate-50 text-slate-600 hover:bg-brand-green-50 hover:text-brand-green-700 border border-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(() => {
                    const filterConfig: Record<string, string[]> = {
                      detox: ['detox', 'desintox'],
                      digestivo: ['digestiv', 'flora', 'intestin'],
                      estres: ['estrés', 'sueño', 'ansiedad', 'relaj'],
                      energia: ['energía', 'fatiga', 'rendimiento'],
                      inmunidad: ['inmun', 'defensa', 'resfri'],
                    };

                    const keywords = filterConfig[activeKitFilter] || [];
                    const filteredKits = activeKitFilter === 'all'
                      ? kits
                      : kits.filter(kit =>
                          keywords.some(kw =>
                            kit.name.toLowerCase().includes(kw) ||
                            kit.problem.toLowerCase().includes(kw) ||
                            kit.benefit.toLowerCase().includes(kw)
                          )
                        );

                    const kitsToShow = showAllKits ? filteredKits : filteredKits.slice(0, 3);

                    if (kitsToShow.length === 0) {
                      return (
                        <div className="col-span-full text-center py-12">
                          <p className="text-slate-400">No hay kits en esta categoría</p>
                          <button onClick={() => setActiveKitFilter('all')} className="mt-3 text-sm text-brand-green-600 hover:text-brand-green-700 font-medium">
                            Ver todos los kits
                          </button>
                        </div>
                      );
                    }

                    return kitsToShow.map(kit => (
                      <KitCard key={kit.id} kit={kit} allProducts={products} onShowDetails={() => handleShowDetails(kit)} />
                    ));
                  })()}
                </div>

                {showAllKits && kits.length > 3 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setShowAllKits(false)}
                      className="px-6 py-3 rounded-full text-sm font-semibold bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      Ver menos
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Explorar Tienda CTA */}
            <section id="productos" className="py-20 sm:py-28 bg-slate-50">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Lora, serif' }}>
                  Explora nuestro catálogo completo
                </h2>
                <p className="text-slate-500 text-base mt-3 max-w-lg mx-auto">
                  {products.length} productos organizados por categoría. Encuentra exactamente lo que necesitas.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  <button
                    onClick={() => handleOpenStore()}
                    className="px-8 py-3.5 bg-brand-green-600 text-white text-sm font-semibold rounded-full hover:bg-brand-green-700 transition-colors flex items-center gap-2"
                  >
                    Ver Todos los Productos <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {mainCategories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => handleOpenStore(cat.name)}
                      className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <FooterModern />

      <DetailModal 
        item={selectedItem}
        allProducts={products}
        onClose={handleCloseDetails}
      />
      
      <Cart
        externalOpen={isCartOpen}
        onExternalClose={() => setIsCartOpen(false)}
      />
      <Favorites
        allProducts={products}
        onShowDetails={handleShowDetails}
        externalOpen={isFavoritesOpen}
        onExternalClose={() => setIsFavoritesOpen(false)}
      />
      <RecommendationHistory
        history={recommendationHistory}
        onSelectRecommendation={handleSelectFromHistory}
        onDeleteRecommendation={deleteRecommendation}
        onClearHistory={clearHistory}
      />
    </div>
  );
};

// Componente que maneja el Toast del carrito
const CartToastHandler: React.FC = () => {
  const { lastAddedProduct, clearLastAdded } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (lastAddedProduct) {
      setToastMessage(`✓ ${lastAddedProduct.name} agregado al carrito`);
      setShowToast(true);
      clearLastAdded();
    }
  }, [lastAddedProduct, clearLastAdded]);

  return (
    <Toast
      message={toastMessage}
      isVisible={showToast}
      onClose={() => setShowToast(false)}
      type="success"
    />
  );
};

const AppWithCart: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <App />
        <CartToastHandler />
      </CartProvider>
    </FavoritesProvider>
  );
};

export default AppWithCart;
