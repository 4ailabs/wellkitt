
import React, { useState, useCallback } from 'react';
import { products as baseProducts, kits } from './constants/data';
import productosJsonRaw from './constants/Productos.json';
import { Product, Kit, Recommendation } from './types';
import KitCard from './components/KitCard';
import RecommendationResult from './components/RecommendationResult';
import Spinner from './components/Spinner';
import { getKitRecommendation } from './services/geminiService';
import ProductCard from './components/ProductCard';
import DetailModal from './components/DetailModal';
import EndotelioTest from './components/EndotelioTest';
import NutrigenomicaTest from './components/NutrigenomicaTest';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import Chatbot from './components/Chatbot';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { mainCategories, getSubcategories } from './components/category-config';
import { Phone, MapPin, List, Heart, Droplets, Zap, Dna, X } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import useMobileDetect from './hooks/useMobileDetect';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Detectar dispositivo móvil
  const { isMobile } = useMobileDetect();
  
  // Productos por página según dispositivo
  const productsPerPage = isMobile ? 4 : 12; // Móvil: 4 productos (1 columna), Desktop: 12 productos (3x4)

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
      const result = await getKitRecommendation(userInput, products, kits);
      if (result) {
        setRecommendation(result);
      } else {
        setError("No pudimos generar una recomendación. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Ocurrió un error al contactar al servicio de recomendación.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, products, kits]);

  const handleShowDetails = (item: Kit | Product) => {
    setSelectedItem(item);
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

  // Filtrado inteligente de productos con búsqueda
  const filteredProducts = products.filter(p => {
    // Filtro por categoría
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    
    // Filtro por búsqueda
    if (!searchQuery.trim()) {
      return matchesCategory;
    }
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.ingredients.some((ing: string) => ing.toLowerCase().includes(query)) ||
      p.benefits.some((ben: string) => ben.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });

  // Paginación de productos
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-green-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>Wellkitt</h1>
          <p className="hidden md:block text-slate-600 font-light" style={{ fontFamily: 'Inter, sans-serif' }}>Tu Navegador de Salud Natural</p>
        </div>
      </header>
      
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
            <section className="max-w-5xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
                <div className="text-center">
                    <div className="flex justify-center mb-4 md:mb-6">
                        <Heart className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-brand-green-600" strokeWidth={1.5} />
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <span className="text-brand-green-600">Wellkitt:</span> Tu Salud,<br className="hidden sm:block" /> 
                        <span className="text-slate-900">Ciencia Personalizada</span>
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 md:mb-12 px-2 md:px-4 max-w-3xl mx-auto leading-relaxed font-light">
                        Revoluciona tu bienestar con algoritmos especializados. 
                        Tests genéticos, sueroterapia premium y recomendaciones personalizadas para tu perfil único.
                    </p>
                    
                    {/* Formulario de IA */}
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-8">
                        <div className="flex flex-col gap-4 mb-6">
                            <textarea
                                value={userInput}
                                onChange={handleInputChange}
                                placeholder="Describe tu objetivo de salud, síntomas o lo que quieres mejorar..."
                                className="w-full p-4 md:p-5 border-2 border-gray-200 rounded-2xl focus:border-brand-green-500 focus:outline-none resize-none text-base md:text-lg text-slate-700 bg-white shadow-sm"
                                rows={3}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group inline-flex items-center justify-center gap-3 text-brand-green-600 text-lg md:text-xl font-semibold hover:gap-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{isLoading ? 'Analizando...' : 'Obtener Recomendación'}</span>
                                {!isLoading && (
                                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        {error && (
                            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                <p className="text-red-600 text-center font-medium">{error}</p>
                            </div>
                        )}
                    </form>

                    {isLoading && <Spinner />}
                    {recommendation && <RecommendationResult recommendation={recommendation} allProducts={products} />}
                </div>
            </section>

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
            <section className="max-w-6xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
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

            {/* Divisor */}
            <div className="max-w-5xl mx-auto mb-12 md:mb-20 lg:mb-28 px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
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
                
                {/* Grid centrado con justificación mejorada */}
                <div className={`
                    grid gap-4 md:gap-6 
                    ${showAllKits 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }
                    ${!showAllKits ? 'max-w-6xl mx-auto' : ''}
                `}>
                    {(showAllKits ? kits : kits.slice(0, 3)).map(kit => (
                        <KitCard 
                            key={kit.id} 
                            kit={kit} 
                            allProducts={products} 
                            onShowDetails={() => handleShowDetails(kit)}
                        />
                    ))}
                </div>
                
                {/* Botón Ver Más/Menos Kits */}
                {kits.length > 3 && (
                    <div className="flex justify-center mt-8 md:mt-10">
                        <button
                            onClick={() => setShowAllKits(!showAllKits)}
                            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-brand-green-600 to-brand-green-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:from-brand-green-700 hover:to-brand-green-800 focus:outline-none focus:ring-4 focus:ring-brand-green-300 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                        >
                            <span className="relative z-10">
                                {showAllKits ? 'Ver Menos Kits' : `Ver Todos los Kits (${kits.length})`}
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
                )}
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
            <section className="mt-8 md:mt-12" data-section="products">
                <div className="text-center mb-8 md:mb-12 px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Explora Todos Nuestros Productos
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                        Encuentra el suplemento individual perfecto para tus necesidades específicas de nuestra completa selección.
                    </p>
                </div>

                {/* Barra de Búsqueda */}
                <div className="mb-6 md:mb-8 px-4 max-w-3xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Buscar por nombre, ingrediente, beneficio o marca..."
                            className="w-full px-4 md:px-5 py-3 md:py-4 pl-12 md:pl-14 pr-10 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:border-brand-green-500 focus:outline-none text-sm md:text-base text-slate-700 bg-white shadow-sm"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                            </button>
                        )}
                    </div>
                    {searchQuery && (
                        <p className="mt-2 text-sm text-slate-600 text-center">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'} encontrados
                        </p>
                    )}
                </div>

                {/* Categorías Principales - Navegación por Pestañas */}
                <div className="mb-8 md:mb-12 px-4">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
                        {['All', ...mainCategories.map(cat => cat.name)].map(category => {
                            const isActive = activeCategory === category;
                            const mainCat = mainCategories.find(cat => cat.name === category);
                            const Icon = category === 'All' ? List : mainCat?.icon;
                            
                            return (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-xl transition-all duration-300 border-2 ${
                                        isActive
                                            ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                                            : 'bg-white text-slate-700 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                                >
                                    {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
                                    <span>{category === 'All' ? 'Todos' : category}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Subcategorías Específicas - Solo se muestran cuando se selecciona una categoría principal */}
                    {activeCategory !== 'All' && mainCategories.some(cat => cat.name === activeCategory) && (
                        <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
                                Filtros Específicos de {activeCategory}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                                {getSubcategoriesForMainCategory(activeCategory).map(subcategory => (
                                    <button
                                        key={subcategory}
                                        onClick={() => handleSubcategoryChange(subcategory)}
                                        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-full bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                                    >
                                        {subcategory}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4" data-section="products-grid">
                    {currentProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onShowDetails={() => handleShowDetails(product)}
                        />
                    ))}
                </div>

                {/* Información de productos y paginación */}
                {filteredProducts.length > 0 && (
                    <div className="mt-6 md:mt-12 px-4">
                        {/* Contador de productos */}
                        <div className="text-center mb-4 md:mb-6">
                            <p className="text-xs md:text-base text-slate-600">
                                Mostrando <span className="font-bold text-slate-800">{indexOfFirstProduct + 1}</span>-<span className="font-bold text-slate-800">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> de <span className="font-bold text-slate-800">{filteredProducts.length}</span>
                            </p>
                        </div>

                        {/* Controles de paginación */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-1.5 md:gap-3">
                                {/* Botón Anterior */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-1 px-2.5 md:px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-xs md:text-base ${
                                        currentPage === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-brand-green-600 text-white hover:bg-brand-green-700 shadow-md hover:shadow-lg active:scale-95'
                                    }`}
                                >
                                    <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden sm:inline">Anterior</span>
                                </button>

                                {/* Números de página */}
                                <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                                        // Mostrar solo algunas páginas para no saturar en móviles
                                        const showPage = 
                                            pageNumber === 1 || 
                                            pageNumber === totalPages || 
                                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                                        
                                        // Mostrar puntos suspensivos
                                        if (!showPage && (pageNumber === currentPage - 2 || pageNumber === currentPage + 2)) {
                                            return <span key={pageNumber} className="px-2 text-slate-400">...</span>;
                                        }
                                        
                                        if (!showPage) return null;

                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`min-w-[32px] h-8 md:min-w-[40px] md:h-10 px-2 md:px-3 rounded-lg font-bold transition-all duration-300 text-xs md:text-base active:scale-95 ${
                                                    currentPage === pageNumber
                                                        ? 'bg-brand-green-600 text-white shadow-lg scale-105'
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
                                    className={`flex items-center gap-1 px-2.5 md:px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-xs md:text-base ${
                                        currentPage === totalPages
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-brand-green-600 text-white hover:bg-brand-green-700 shadow-md hover:shadow-lg active:scale-95'
                                    }`}
                                >
                                    <span className="hidden sm:inline">Siguiente</span>
                                    <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-12 md:mt-20 lg:mt-28">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center md:text-left">
                <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Wellkitt</h3>
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
      
      <Cart />
      <Favorites allProducts={products} onShowDetails={handleShowDetails} />
      <Chatbot />
    </div>
  );
};

const AppWithCart: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  );
};

export default AppWithCart;