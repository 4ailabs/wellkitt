
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { products as baseProducts, kits } from './constants/data';
import productosJsonRaw from './constants/Productos.json';
import { Product, Kit, Recommendation } from './types';
import KitCard from './components/KitCard';
import RecommendationResult from './components/RecommendationResult';
import Spinner from './components/Spinner';
import { getKitRecommendation } from './services/geminiService';
import ProductCardPremium from './components/ProductCardPremium';
import ProductListItem from './components/ProductListItem';
import DetailModal from './components/DetailModal';
import EndotelioTest from './components/EndotelioTest';
import NutrigenomicaTest from './components/NutrigenomicaTest';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import Toast from './components/Toast';
import RecommendationHistory from './components/RecommendationHistory';
import Navbar from './components/Navbar';
import { useRecommendationHistory, RecommendationHistoryEntry } from './hooks/useRecommendationHistory';
import { CartProvider, useCart } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { mainCategories, getSubcategories, categoryConfig } from './components/category-config';
import { Phone, MapPin, List, Heart, Droplets, Zap, Dna, X, ArrowUpDown, LayoutGrid, LayoutList, Search, Sparkles, Package } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import useMobileDetect from './hooks/useMobileDetect';
import { useDebounce } from './hooks/useDebounce';
import { normalizeText, isFuzzyMatch, calculateRelevanceScore, getSearchSuggestions } from './utils/searchUtils';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'category';
type ViewMode = 'grid' | 'list';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Kit | Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showEndotelioTest, setShowEndotelioTest] = useState(false);
  const [showNutrigenomicaTest, setShowNutrigenomicaTest] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showAllKits, setShowAllKits] = useState(false);
  const [activeKitFilter, setActiveKitFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedHealthAreas, setSelectedHealthAreas] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Hook para historial de recomendaciones
  const {
    history: recommendationHistory,
    addRecommendation,
    deleteRecommendation,
    clearHistory,
  } = useRecommendationHistory();

  // Detectar dispositivo móvil
  const { isMobile } = useMobileDetect();
  
  // Productos por página según dispositivo y vista
  const productsPerPage = viewMode === 'list'
    ? (isMobile ? 8 : 12)  // Lista: más productos porque ocupan menos espacio
    : (isMobile ? 6 : 12); // Grid: tarjetas premium más grandes

  const handleBackToMain = () => {
    setShowEndotelioTest(false);
    setShowNutrigenomicaTest(false);
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Resetear a la primera página
    
    // Scroll automático a la grilla de productos en móviles
    setTimeout(() => {
      const productsGrid = document.querySelector('[data-section="products-grid"]');
      if (productsGrid) {
        productsGrid.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 200);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setActiveCategory(subcategory);
    setCurrentPage(1); // Resetear a la primera página
    // Scroll automático a la grilla de productos en móviles
    setTimeout(() => {
      const productsGrid = document.querySelector('[data-section="products-grid"]');
      if (productsGrid) {
        productsGrid.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 200);
  };

  // Sugerencias de búsqueda
  const searchSuggestions = useMemo(() => {
    return getSearchSuggestions(debouncedSearchQuery, products);
  }, [debouncedSearchQuery, products]);

  // Filtrado inteligente de productos con búsqueda fuzzy
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Filtro por categoría
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;

      // Filtro por búsqueda con debounce
      if (!debouncedSearchQuery.trim()) {
        return matchesCategory;
      }

      const query = debouncedSearchQuery;

      // Búsqueda fuzzy tolerante a errores tipográficos
      const matchesSearch =
        isFuzzyMatch(query, p.name) ||
        isFuzzyMatch(query, p.brand) ||
        isFuzzyMatch(query, p.category) ||
        p.ingredients.some((ing: string) => isFuzzyMatch(query, ing)) ||
        p.benefits.some((ben: string) => isFuzzyMatch(query, ben));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, debouncedSearchQuery]);

  // Ordenamiento de productos (con relevancia cuando hay búsqueda)
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    // Si hay búsqueda activa y ordenamiento por defecto, ordenar por relevancia
    if (debouncedSearchQuery.trim() && sortBy === 'default') {
      return sorted.sort((a, b) => {
        const scoreA = calculateRelevanceScore(debouncedSearchQuery, a);
        const scoreB = calculateRelevanceScore(debouncedSearchQuery, b);
        return scoreB - scoreA; // Mayor relevancia primero
      });
    }

    // Ordenamiento manual seleccionado
    return sorted.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy, debouncedSearchQuery]);

  // Contador de productos por categoría
  const getProductCountByCategory = (category: string): number => {
    if (category === 'All') return products.length;

    // Si es una categoría principal, contar todas las subcategorías
    const mainCat = mainCategories.find(cat => cat.name === category);
    if (mainCat) {
      const subcats = getSubcategories(category);
      return products.filter(p => subcats.includes(p.category)).length;
    }

    // Si es una subcategoría específica
    return products.filter(p => p.category === category).length;
  };

  // Paginación de productos
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll al inicio de los productos
    setTimeout(() => {
      const productsGrid = document.querySelector('[data-section="products-grid"]');
      if (productsGrid) {
        productsGrid.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  // Obtener subcategorías de una categoría principal
  const getSubcategoriesForMainCategory = (mainCategory: string): string[] => {
    return getSubcategories(mainCategory);
  };

  // Mostrar splash screen solo en dispositivos móviles
  if (isMobile && showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 font-sans text-slate-800">
      {/* Navbar que aparece al scroll */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 md:py-12" style={{ fontFamily: 'Inter, sans-serif' }}>
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
        ) : (
          <>
            {/* Hero Section */}
            <section id="hero" className="max-w-5xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
                <div className="text-center">
                    <div className="flex justify-center mb-6 md:mb-8">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=300w"
                            srcSet="
                                https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=100w 100w,
                                https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=200w 200w,
                                https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=300w 300w
                            "
                            sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 128px"
                            alt="Wellkitt Logo"
                            className="h-16 md:h-24 lg:h-32 w-auto"
                            loading="eager"
                        />
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <span className="text-brand-green-600">Wellkitt:</span> Tu Salud,<br className="hidden sm:block" /> 
                        <span className="text-slate-900">Ciencia Personalizada</span>
                    </h1>
                    
                    <p className="text-sm sm:text-base md:text-lg text-slate-500 mb-6 md:mb-8 px-2 md:px-4 max-w-2xl mx-auto leading-relaxed font-light italic">
                        Descubre tu kit de bienestar ideal. Completa el formulario y recibe recomendaciones personalizadas basadas en tus necesidades.
                    </p>
                    
                    {/* Separador visual */}
                    <div className="flex items-center justify-center gap-4 mb-8 md:mb-12 px-4 max-w-3xl mx-auto">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300"></div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-brand-green-600" />
                            <span className="text-xs md:text-sm font-medium text-slate-700">Recomendación Personalizada</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-300"></div>
                    </div>
                    
                    {/* Sistema de Recomendación Mejorado */}
                    <div id="recomendador" className="max-w-3xl mx-auto mb-8">
                        {/* Paso 1: Áreas de Salud */}
                        <div className="mb-6">
                            <p className="text-sm md:text-base text-slate-600 mb-3 font-medium">
                                1. ¿Qué áreas de salud te interesan? (opcional)
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
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
                                                prev.includes(area.id)
                                                    ? prev.filter(a => a !== area.id)
                                                    : [...prev, area.id]
                                            );
                                        }}
                                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                                            selectedHealthAreas.includes(area.id)
                                                ? 'bg-brand-green-600 text-white border-brand-green-600'
                                                : 'bg-white text-slate-600 border-gray-200 hover:border-brand-green-400'
                                        }`}
                                    >
                                        <span className="mr-1">{area.icon}</span>
                                        {area.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Paso 2: Objetivo */}
                        <div className="mb-6">
                            <p className="text-sm md:text-base text-slate-600 mb-3 font-medium">
                                2. ¿Qué resultado esperas? (opcional)
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
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
                                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                                            selectedGoal === goal.id
                                                ? 'bg-slate-800 text-white border-slate-800'
                                                : 'bg-white text-slate-600 border-gray-200 hover:border-slate-400'
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
                                <p className="text-sm md:text-base text-slate-600 mb-3 font-medium">
                                    3. Cuéntanos más sobre tu situación:
                                </p>
                                <textarea
                                    value={userInput}
                                    onChange={handleInputChange}
                                    placeholder="Describe tu objetivo de salud, síntomas o lo que quieres mejorar..."
                                    className="w-full p-4 md:p-5 border-2 border-gray-200 rounded-2xl focus:border-brand-green-500 focus:outline-none resize-none text-base md:text-lg text-slate-700 bg-white shadow-sm"
                                    rows={3}
                                />
                            </div>

                            {/* Sugerencias de ejemplo */}
                            <div className="mb-6">
                                <p className="text-xs md:text-sm text-slate-500 mb-2">
                                    Prueba con alguno de estos ejemplos:
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {[
                                        'Quiero más energía durante el día',
                                        'Mejorar mi digestión',
                                        'Fortalecer mi sistema inmune',
                                        'Reducir el estrés y dormir mejor',
                                        'Mejorar mi concentración',
                                    ].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() => setUserInput(suggestion)}
                                            className="text-xs md:text-sm px-3 py-1.5 bg-gray-100 text-slate-600 rounded-lg hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors"
                                        >
                                            "{suggestion}"
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !userInput.trim()}
                                className="group inline-flex items-center justify-center gap-3 text-brand-green-600 text-lg md:text-xl font-semibold hover:gap-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{isLoading ? 'Analizando tu perfil...' : 'Obtener Recomendación Personalizada'}</span>
                                {!isLoading && (
                                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                )}
                            </button>

                            {error && (
                                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                    <p className="text-red-600 text-center font-medium">{error}</p>
                                </div>
                            )}
                        </form>
                    </div>

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

            {/* Separador entre IA y Video */}
            <div className="flex items-center justify-center gap-4 my-12 md:my-16 px-4 max-w-5xl mx-auto">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300"></div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <Droplets className="w-4 h-4 md:w-5 md:h-5 text-brand-green-600" />
                    <span className="text-xs md:text-sm font-medium text-slate-700">Contenido Destacado</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-300"></div>
            </div>

            {/* Producto Destacado: Carnilis */}
            <section className="max-w-5xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
                <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-orange-200">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 md:mb-8">
                        <div className="flex-1 w-full">
                            <div className="inline-block px-3 py-1 md:px-4 md:py-1 bg-orange-500 text-white text-xs md:text-sm font-bold rounded-full mb-3 md:mb-4">
                                PRODUCTO DESTACADO
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Carnilis
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-3 md:mb-4 font-light leading-relaxed">
                                Potencia tu metabolismo energético con L-Carnitina. Optimiza el transporte de ácidos grasos y reduce la fatiga.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                                <span className="px-2.5 py-1 md:px-3 md:py-1 bg-white/80 text-orange-700 rounded-full text-xs md:text-sm font-semibold border border-orange-200">L-Carnitina</span>
                                <span className="px-2.5 py-1 md:px-3 md:py-1 bg-white/80 text-orange-700 rounded-full text-xs md:text-sm font-semibold border border-orange-200">Metabolismo Energético</span>
                                <span className="px-2.5 py-1 md:px-3 md:py-1 bg-white/80 text-orange-700 rounded-full text-xs md:text-sm font-semibold border border-orange-200">60 cápsulas</span>
                            </div>
                            <button 
                                onClick={() => {
                                    const carnilis = products.find(p => p.id === "SN21" || p.name === "Carnilis");
                                    if (carnilis) handleShowDetails(carnilis);
                                }}
                                className="group inline-flex items-center gap-2 md:gap-3 text-orange-600 text-base md:text-lg lg:text-xl font-semibold hover:gap-3 md:hover:gap-4 transition-all duration-300"
                            >
                                <span>Ver Detalles</span>
                                <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-shrink-0 hidden md:block">
                            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-2xl">
                                <Zap className="w-16 h-16 lg:w-24 lg:h-24 text-white" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Video Embed */}
                    <div className="w-full">
                        <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                            <iframe 
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/c3d1YQ2s7qY"
                                title="Carnilis - Video Explicativo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divisor */}
            <div className="max-w-5xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Tests Section - Agrupados */}
            <section id="tests" className="max-w-6xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
                <div className="text-center mb-8 md:mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Tests de Salud <span className="text-brand-green-600">Personalizados</span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-slate-600 font-light max-w-3xl mx-auto px-2">
                        Evaluaciones científicas para conocer tu perfil de salud y recibir recomendaciones personalizadas
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Endotelio Test */}
                    <div className="group bg-white/50 rounded-2xl p-6 md:p-0 md:bg-transparent">
                        <div className="h-full flex flex-col">
                            <div className="mb-3 md:mb-4">
                                <Heart className="w-10 h-10 md:w-12 md:h-12 text-red-600 mb-2 md:mb-3" strokeWidth={1.5} />
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 md:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    Test Endotelial
                                </h3>
                                <div className="h-0.5 w-12 md:w-16 bg-red-600 mb-3 md:mb-4"></div>
                            </div>
                            <p className="text-sm md:text-base lg:text-lg text-slate-600 mb-4 flex-1 leading-relaxed">
                                Evalúa tu salud cardiovascular con 20 preguntas sobre 6 áreas fundamentales.
                            </p>
                            <button 
                                onClick={() => setShowEndotelioTest(true)}
                                className="group/btn inline-flex items-center gap-2 text-red-600 text-base md:text-lg font-semibold hover:gap-3 transition-all duration-300"
                            >
                                <span>Realizar Test</span>
                                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Nutrigenómica Test */}
                    <div className="group bg-white/50 rounded-2xl p-6 md:p-0 md:bg-transparent">
                        <div className="h-full flex flex-col">
                            <div className="mb-3 md:mb-4">
                                <Dna className="w-10 h-10 md:w-12 md:h-12 text-purple-600 mb-2 md:mb-3" strokeWidth={1.5} />
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 md:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    Test Nutrigenómico
                                </h3>
                                <div className="h-0.5 w-12 md:w-16 bg-purple-600 mb-3 md:mb-4"></div>
                            </div>
                            <p className="text-sm md:text-base lg:text-lg text-slate-600 mb-4 flex-1 leading-relaxed">
                                Descubre cómo tus genes responden a los alimentos. 20 preguntas sobre 7 áreas genéticas.
                            </p>
                            <button 
                                onClick={() => setShowNutrigenomicaTest(true)}
                                className="group/btn inline-flex items-center gap-2 text-purple-600 text-base md:text-lg font-semibold hover:gap-3 transition-all duration-300"
                            >
                                <span>Realizar Test</span>
                                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Sueroterapia */}
                    <div className="group bg-white/50 rounded-2xl p-6 md:p-0 md:bg-transparent">
                        <div className="h-full flex flex-col">
                            <div className="mb-3 md:mb-4">
                                <Droplets className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-2 md:mb-3" strokeWidth={1.5} />
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 md:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    Sueroterapia Premium
                                </h3>
                                <div className="h-0.5 w-12 md:w-16 bg-blue-600 mb-3 md:mb-4"></div>
                            </div>
                            <p className="text-sm md:text-base lg:text-lg text-slate-600 mb-4 flex-1 leading-relaxed">
                                Hidratación intravenosa con vitaminas, minerales y antioxidantes. Recupera tu energía inmediatamente.
                            </p>
                            <a 
                                href="https://sueroterapia-premiun.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn inline-flex items-center gap-2 text-blue-600 text-base md:text-lg font-semibold hover:gap-3 transition-all duration-300"
                            >
                                <span>Realizar Test</span>
                                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separador entre Tests y Kits */}
            <div className="flex items-center justify-center gap-4 my-12 md:my-16 px-4 max-w-5xl mx-auto">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300"></div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-brand-green-600" />
                    <span className="text-xs md:text-sm font-medium text-slate-700">Kits Estratégicos</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-300"></div>
            </div>

            {/* Pre-defined Kits Section */}
            <section className="px-4">
               <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        O explora nuestros Kits Estratégicos
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
                        Soluciones expertas diseñadas para los objetivos de salud más comunes.
                    </p>
                </div>

                {/* Filtros por categoría/objetivo */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 max-w-4xl mx-auto">
                    {[
                        { id: 'all', label: 'Todos', icon: '✨' },
                        { id: 'detox', label: 'Detox', icon: '🌿', keywords: ['detox', 'desintox'] },
                        { id: 'digestivo', label: 'Digestión', icon: '🍃', keywords: ['digestiv', 'flora', 'intestin'] },
                        { id: 'estres', label: 'Estrés & Sueño', icon: '😴', keywords: ['estrés', 'sueño', 'ansiedad', 'relaj'] },
                        { id: 'energia', label: 'Energía', icon: '⚡', keywords: ['energía', 'fatiga', 'rendimiento'] },
                        { id: 'hormonal', label: 'Hormonal', icon: '💗', keywords: ['hormonal', 'femenin', 'menopaus'] },
                        { id: 'articular', label: 'Articulaciones', icon: '🦴', keywords: ['articulacion', 'dolor', 'movilidad', 'inflam'] },
                        { id: 'inmunidad', label: 'Inmunidad', icon: '🛡️', keywords: ['inmun', 'defensa', 'resfri'] },
                        { id: 'peso', label: 'Control de Peso', icon: '⚖️', keywords: ['peso', 'metabolismo', 'grasa'] },
                    ].map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => {
                                setActiveKitFilter(filter.id);
                                if (filter.id !== 'all') setShowAllKits(true);
                            }}
                            className={`
                                flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium
                                transition-all duration-300 border-2
                                ${activeKitFilter === filter.id
                                    ? 'bg-brand-green-600 text-white border-brand-green-600 shadow-lg scale-105'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-brand-green-400 hover:bg-brand-green-50'
                                }
                            `}
                        >
                            <span>{filter.icon}</span>
                            <span>{filter.label}</span>
                        </button>
                    ))}
                </div>

                {/* Grid centrado con justificación mejorada */}
                <div className={`
                    grid gap-4 md:gap-6
                    ${showAllKits
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }
                    ${!showAllKits ? 'max-w-6xl mx-auto' : ''}
                `}>
                    {(() => {
                        const filterConfig = [
                            { id: 'all', keywords: [] },
                            { id: 'detox', keywords: ['detox', 'desintox'] },
                            { id: 'digestivo', keywords: ['digestiv', 'flora', 'intestin'] },
                            { id: 'estres', keywords: ['estrés', 'sueño', 'ansiedad', 'relaj'] },
                            { id: 'energia', keywords: ['energía', 'fatiga', 'rendimiento'] },
                            { id: 'hormonal', keywords: ['hormonal', 'femenin', 'menopaus'] },
                            { id: 'articular', keywords: ['articulacion', 'dolor', 'movilidad', 'inflam'] },
                            { id: 'inmunidad', keywords: ['inmun', 'defensa', 'resfri'] },
                            { id: 'peso', keywords: ['peso', 'metabolismo', 'grasa'] },
                        ];

                        const currentFilter = filterConfig.find(f => f.id === activeKitFilter);
                        const keywords = currentFilter?.keywords || [];

                        const filteredKits = activeKitFilter === 'all'
                            ? kits
                            : kits.filter(kit =>
                                keywords.some(keyword =>
                                    kit.name.toLowerCase().includes(keyword) ||
                                    kit.problem.toLowerCase().includes(keyword) ||
                                    kit.benefit.toLowerCase().includes(keyword)
                                )
                            );

                        const kitsToShow = showAllKits ? filteredKits : filteredKits.slice(0, 3);

                        if (kitsToShow.length === 0) {
                            return (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-slate-500 text-lg">No hay kits en esta categoría</p>
                                    <button
                                        onClick={() => setActiveKitFilter('all')}
                                        className="mt-4 text-brand-green-600 hover:text-brand-green-700 font-medium"
                                    >
                                        Ver todos los kits
                                    </button>
                                </div>
                            );
                        }

                        return kitsToShow.map(kit => (
                            <KitCard
                                key={kit.id}
                                kit={kit}
                                allProducts={products}
                                onShowDetails={() => handleShowDetails(kit)}
                            />
                        ));
                    })()}
                </div>

                {/* Botón Ver Más/Menos Kits */}
                {(() => {
                    const filterConfig = [
                        { id: 'all', keywords: [] },
                        { id: 'detox', keywords: ['detox', 'desintox'] },
                        { id: 'digestivo', keywords: ['digestiv', 'flora', 'intestin'] },
                        { id: 'estres', keywords: ['estrés', 'sueño', 'ansiedad', 'relaj'] },
                        { id: 'energia', keywords: ['energía', 'fatiga', 'rendimiento'] },
                        { id: 'hormonal', keywords: ['hormonal', 'femenin', 'menopaus'] },
                        { id: 'articular', keywords: ['articulacion', 'dolor', 'movilidad', 'inflam'] },
                        { id: 'inmunidad', keywords: ['inmun', 'defensa', 'resfri'] },
                        { id: 'peso', keywords: ['peso', 'metabolismo', 'grasa'] },
                    ];

                    const currentFilter = filterConfig.find(f => f.id === activeKitFilter);
                    const keywords = currentFilter?.keywords || [];

                    const filteredKits = activeKitFilter === 'all'
                        ? kits
                        : kits.filter(kit =>
                            keywords.some(keyword =>
                                kit.name.toLowerCase().includes(keyword) ||
                                kit.problem.toLowerCase().includes(keyword) ||
                                kit.benefit.toLowerCase().includes(keyword)
                            )
                        );

                    if (filteredKits.length <= 3) return null;

                    return (
                        <div className="flex justify-center mt-8 md:mt-10">
                            <button
                                onClick={() => setShowAllKits(!showAllKits)}
                                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-brand-green-600 to-brand-green-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:from-brand-green-700 hover:to-brand-green-800 focus:outline-none focus:ring-4 focus:ring-brand-green-300 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                            >
                                <span className="relative z-10">
                                    {showAllKits ? 'Ver Menos Kits' : `Ver Todos los Kits (${filteredKits.length})`}
                                </span>
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${showAllKits ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>

                                {/* Efecto de brillo al hacer hover */}
                                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    );
                })()}
            </section>

            {/* Separador Visual entre Kits y Productos */}
            <div className="my-16 md:my-20 px-4">
                <div className="relative">
                    {/* Línea central */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    
                    {/* Círculo central con icono */}
                    <div className="relative flex justify-center">
                        <div className="bg-white px-6 py-3 rounded-full border-2 border-gray-300 shadow-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <List className="w-5 h-5" />
                                <span className="font-semibold text-sm md:text-base">Productos Individuales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Products Section */}
            <section id="productos" className="mt-8 md:mt-12" data-section="products">
                <div className="text-center mb-10 md:mb-14 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green-50 text-brand-green-700 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Catálogo Completo</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Nuestros <span className="text-brand-green-600">Productos</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-light">
                        Encuentra el suplemento perfecto para tus necesidades
                    </p>
                </div>

                {/* Barra de Búsqueda Premium */}
                <div className="mb-8 md:mb-10 px-4 max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-green-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                        <div className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                placeholder="¿Qué producto buscas?"
                                className="w-full px-5 py-4 md:py-5 pl-14 pr-12 border-0 rounded-2xl focus:ring-2 focus:ring-brand-green-500 focus:outline-none text-base md:text-lg text-slate-700 bg-white shadow-lg transition-all duration-300 placeholder:text-slate-400"
                            />
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-green-100 rounded-lg flex items-center justify-center">
                                <Search className="w-4 h-4 text-brand-green-600" />
                            </div>

                            {/* Indicador de búsqueda activa */}
                            {searchQuery && searchQuery !== debouncedSearchQuery && (
                                <div className="absolute right-14 top-1/2 -translate-y-1/2">
                                    <div className="w-5 h-5 border-2 border-brand-green-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setCurrentPage(1);
                                        setShowSuggestions(false);
                                        searchInputRef.current?.focus();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}

                            {/* Dropdown de sugerencias */}
                            {showSuggestions && searchSuggestions.length > 0 && searchQuery.length >= 2 && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100">
                                    <div className="px-4 py-2.5 bg-gradient-to-r from-brand-green-50 to-teal-50 border-b border-gray-100">
                                        <p className="text-xs text-brand-green-700 font-medium flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            Sugerencias
                                        </p>
                                    </div>
                                    <ul className="max-h-64 overflow-y-auto py-1">
                                        {searchSuggestions.map((suggestion, index) => (
                                            <li key={index}>
                                                <button
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setSearchQuery(suggestion);
                                                        setShowSuggestions(false);
                                                        setCurrentPage(1);
                                                    }}
                                                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-brand-green-50 transition-colors flex items-center gap-3"
                                                >
                                                    <Search className="w-4 h-4 text-gray-300" />
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: suggestion.replace(
                                                                new RegExp(`(${normalizeText(searchQuery).split(/\s+/).join('|')})`, 'gi'),
                                                                '<strong class="text-brand-green-600">$1</strong>'
                                                            )
                                                        }}
                                                    />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resultado de búsqueda con mejor feedback */}
                    {debouncedSearchQuery && (
                        <div className="mt-3 text-center">
                            {filteredProducts.length > 0 ? (
                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold text-brand-green-600">{filteredProducts.length}</span>
                                    {' '}{filteredProducts.length === 1 ? 'resultado' : 'resultados'} para
                                    {' '}<span className="font-medium">"{debouncedSearchQuery}"</span>
                                    {debouncedSearchQuery.trim() && sortBy === 'default' && (
                                        <span className="text-xs text-gray-500 ml-2">(ordenados por relevancia)</span>
                                    )}
                                </p>
                            ) : (
                                <div className="py-4">
                                    <p className="text-slate-600 mb-2">
                                        No encontramos resultados para <span className="font-medium">"{debouncedSearchQuery}"</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Intenta con términos similares o revisa la ortografía
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {['vitamina', 'energia', 'digestion', 'inmunidad'].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => {
                                                    setSearchQuery(term);
                                                    setCurrentPage(1);
                                                }}
                                                className="px-3 py-1.5 text-xs bg-gray-100 text-slate-600 rounded-full hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Categorías Principales - Cards elegantes */}
                <div className="mb-8 md:mb-12 px-4 max-w-5xl mx-auto">
                    {/* Categorías como cards horizontales */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8">
                        {['All', ...mainCategories.map(cat => cat.name)].map(category => {
                            const isActive = activeCategory === category;
                            const mainCat = mainCategories.find(cat => cat.name === category);
                            const Icon = category === 'All' ? List : mainCat?.icon;
                            const count = getProductCountByCategory(category);

                            return (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`group relative flex flex-col items-center p-4 md:p-5 rounded-2xl transition-all duration-300 ${
                                        isActive
                                            ? 'bg-gradient-to-br from-brand-green-500 to-brand-green-600 text-white shadow-lg shadow-brand-green-500/25 scale-[1.02]'
                                            : 'bg-white hover:bg-gray-50 text-slate-700 shadow-sm hover:shadow-md border border-gray-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                                        isActive
                                            ? 'bg-white/20'
                                            : 'bg-gray-100 group-hover:bg-brand-green-100'
                                    }`}>
                                        {Icon && <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-white' : 'text-brand-green-600'}`} />}
                                    </div>
                                    <span className="text-xs md:text-sm font-semibold text-center leading-tight">
                                        {category === 'All' ? 'Todos' : category}
                                    </span>
                                    <span className={`mt-1.5 text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full ${
                                        isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Controles de ordenamiento y vista en línea */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 md:px-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        {/* Ordenamiento */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm text-slate-500 font-medium flex items-center gap-1.5">
                                <ArrowUpDown className="w-4 h-4" />
                                <span className="hidden sm:inline">Ordenar:</span>
                            </span>
                            <div className="flex gap-1">
                                {[
                                    { value: 'default', label: 'Relevancia' },
                                    { value: 'name-asc', label: 'A-Z' },
                                    { value: 'name-desc', label: 'Z-A' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setSortBy(option.value as SortOption);
                                            setCurrentPage(1);
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                            sortBy === option.value
                                                ? 'bg-brand-green-600 text-white'
                                                : 'text-slate-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Vista */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 hidden sm:inline">Vista:</span>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-brand-green-600 shadow-sm'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                    title="Vista cuadrícula"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${
                                        viewMode === 'list'
                                            ? 'bg-white text-brand-green-600 shadow-sm'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                    title="Vista lista"
                                >
                                    <LayoutList className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Subcategorías - Chips modernos */}
                    {activeCategory !== 'All' && mainCategories.some(cat => cat.name === activeCategory) && (
                        <div className="mt-6 p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                            <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                                Filtrar por subcategoría
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {getSubcategoriesForMainCategory(activeCategory).map(subcategory => {
                                    const subCount = getProductCountByCategory(subcategory);
                                    const subConfig = categoryConfig[subcategory];
                                    const SubIcon = subConfig?.icon;
                                    const isSubActive = activeCategory === subcategory;

                                    return (
                                        <button
                                            key={subcategory}
                                            onClick={() => handleSubcategoryChange(subcategory)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-200 ${
                                                isSubActive
                                                    ? `${subConfig?.bgClass || 'bg-brand-green-100'} ${subConfig?.colorClass || 'text-brand-green-700'} ring-2 ring-offset-1 ring-brand-green-300`
                                                    : 'bg-white text-slate-600 border border-gray-200 hover:border-brand-green-300 hover:bg-brand-green-50'
                                            }`}
                                        >
                                            {SubIcon && <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? subConfig?.colorClass : 'text-gray-400'}`} />}
                                            <span>{subcategory}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                                isSubActive ? 'bg-white/50' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {subCount}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Productos */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 px-4" data-section="products-grid">
                        {currentProducts.map(product => (
                            <ProductCardPremium
                                key={product.id}
                                product={product}
                                onShowDetails={() => handleShowDetails(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 md:gap-3 px-4 max-w-4xl mx-auto" data-section="products-grid">
                        {currentProducts.map(product => (
                            <ProductListItem
                                key={product.id}
                                product={product}
                                onShowDetails={() => handleShowDetails(product)}
                            />
                        ))}
                    </div>
                )}

                {/* Información de productos y paginación */}
                {filteredProducts.length > 0 && (
                    <div className="mt-6 md:mt-12 px-4">
                        {/* Contador de productos */}
                        <div className="text-center mb-4 md:mb-6">
                            <p className="text-xs md:text-base text-slate-600">
                                Mostrando <span className="font-bold text-slate-800">{indexOfFirstProduct + 1}</span>-<span className="font-bold text-slate-800">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> de <span className="font-bold text-slate-800">{filteredProducts.length}</span>
                            </p>
                        </div>

                        {/* Controles de paginación - Touch optimizado (min 44px) */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
                                {/* Botón Anterior */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center justify-center gap-1 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                                        currentPage === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-brand-green-600 text-white hover:bg-brand-green-700 shadow-md hover:shadow-lg active:scale-95'
                                    }`}
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden sm:inline">Anterior</span>
                                </button>

                                {/* Números de página */}
                                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                                        // Mostrar solo algunas páginas para no saturar en móviles
                                        const showPage =
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                                        // Mostrar puntos suspensivos
                                        if (!showPage && (pageNumber === currentPage - 2 || pageNumber === currentPage + 2)) {
                                            return <span key={pageNumber} className="px-1.5 text-slate-400 self-center">...</span>;
                                        }

                                        if (!showPage) return null;

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`min-w-[44px] h-[44px] md:min-w-[40px] md:h-10 px-3 md:px-3 rounded-xl font-bold transition-all duration-300 text-sm md:text-base active:scale-95 ${
                                                    currentPage === pageNumber
                                                        ? 'bg-brand-green-600 text-white shadow-lg'
                                                        : 'bg-white text-slate-700 border border-gray-300 hover:border-brand-green-500 hover:bg-brand-green-50'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Botón Siguiente */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center justify-center gap-1 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                                        currentPage === totalPages
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-brand-green-600 text-white hover:bg-brand-green-700 shadow-md hover:shadow-lg active:scale-95'
                                    }`}
                                >
                                    <span className="hidden sm:inline">Siguiente</span>
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
          </>
        )}
      </main>

      <footer id="contacto" className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-12 md:mt-20 lg:mt-28">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center md:text-left">
                <div>
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                        <img 
                            src="https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=500w" 
                            alt="Wellkitt Logo" 
                            className="h-8 md:h-10 w-auto"
                        />
                    </div>
                    <p className="text-sm md:text-base text-slate-600 font-light">Tu Navegador de Salud Natural</p>
                    <p className="text-xs md:text-sm text-slate-500 mt-3 md:mt-4">&copy; {new Date().getFullYear()} Wellkitt. Todos los derechos reservados.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 text-base md:text-lg mb-3 md:mb-4">Contacto</h4>
                    <ul className="space-y-2 md:space-y-3">
                        <li>
                            <a href="https://wa.me/+525579076626" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center md:justify-start gap-2 text-slate-600 hover:text-brand-green-600 transition-colors text-sm md:text-base">
                                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                <span>WhatsApp</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+525579076626" className="group inline-flex items-center justify-center md:justify-start gap-2 text-slate-600 hover:text-brand-green-600 transition-colors text-sm md:text-base">
                                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Llamar a un asesor</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 text-base md:text-lg mb-3 md:mb-4">Ubicación</h4>
                    <ul className="space-y-2 md:space-y-3">
                        <li>
                            <a href="https://maps.google.com/?q=Acapulco%2036%20Roma%20Nte.,%20Cuauhtémoc,%2006700%20Ciudad%20de%20México,%20CDMX" target="_blank" rel="noopener noreferrer" className="group inline-flex items-start justify-center md:justify-start gap-2 text-slate-600 hover:text-brand-green-600 transition-colors text-sm md:text-base">
                                <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                                <span className="text-center md:text-left">Acapulco 36, Roma Nte., CDMX</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
      <div className="bg-slate-100/50 border-t border-gray-200 mt-8 md:mt-12 pt-6 md:pt-8 pb-4 md:pb-6">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-slate-500 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
            <span className="font-semibold text-slate-700">Descargo de responsabilidad:</span> La información y recomendaciones presentadas en este sitio no sustituyen el consejo, diagnóstico o tratamiento médico profesional. Consulta siempre a tu médico u otro proveedor de salud calificado ante cualquier duda sobre una condición médica.
          </p>
          <div className="text-center">
            <a href="https://www.wellkitt.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-green-600 transition-colors duration-200 font-medium text-sm md:text-base">
              www.wellkitt.com
            </a>
          </div>
        </div>
      </div>

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