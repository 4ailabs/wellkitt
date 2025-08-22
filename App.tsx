
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
import { CartProvider } from './contexts/CartContext';
import { categoryConfig, mainCategories, getSubcategories } from './components/category-config';
import { Phone, MapPin, List, Heart, Droplets, Zap, Shield, Activity, Brain, Moon, Dna } from 'lucide-react';
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
  
  // Detectar dispositivo móvil
  const { isMobile } = useMobileDetect();

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

  const categories = ['All', ...Object.keys(categoryConfig)];
  
  // Filtrado inteligente de productos
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Obtener subcategorías de una categoría principal
  const getSubcategoriesForMainCategory = (mainCategory: string): string[] => {
    return getSubcategories(mainCategory);
  };

  // Mostrar splash screen solo en dispositivos móviles
  if (isMobile && showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-green-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Wellkitt</h1>
          <p className="hidden md:block text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>Tu Navegador de Salud Natural</p>
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
            <section className="bg-gradient-to-br from-brand-green-50 to-brand-green-100 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl mb-12 md:mb-16 border border-brand-green-200">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="flex justify-center mb-3 md:mb-4">
                        <Heart className="w-10 h-10 md:w-12 md:h-12 text-brand-green-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <span className="text-brand-green-600">Wellkitt:</span> Tu Salud,<br className="hidden sm:block" /> 
                        <span className="bg-gradient-to-r from-brand-green-600 to-brand-green-700 bg-clip-text text-transparent">Ciencia Personalizada</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 px-4 max-w-4xl mx-auto leading-relaxed">
                        <span className="font-semibold text-slate-700">Revoluciona tu bienestar</span> con nuestros algoritmos especializados de última generación. 
                        Obtén <span className="text-brand-green-600 font-medium">recomendaciones precisas</span>, 
                        realiza <span className="text-purple-600 font-medium">tests genéticos avanzados</span>, 
                        y accede a <span className="text-blue-600 font-medium">sueroterapia premium</span> 
                        — todo diseñado específicamente para tu perfil único de salud.
                    </p>
                    
                    {/* Badges de características principales */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
                        <span className="bg-white/80 backdrop-blur-sm text-brand-green-700 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-brand-green-200 shadow-sm flex items-center gap-1">
                            <Dna className="w-3 h-3 md:w-4 md:h-4" />
                            Tests Genéticos
                        </span>
                        <span className="bg-white/80 backdrop-blur-sm text-blue-700 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-blue-200 shadow-sm flex items-center gap-1">
                            <Droplets className="w-3 h-3 md:w-4 md:h-4" />
                            Sueroterapia IV
                        </span>
                        <span className="bg-white/80 backdrop-blur-sm text-purple-700 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-purple-200 shadow-sm flex items-center gap-1">
                            <Activity className="w-3 h-3 md:w-4 md:h-4" />
                            Análisis Especializado
                        </span>
                        <span className="bg-white/80 backdrop-blur-sm text-slate-700 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold border border-slate-200 shadow-sm flex items-center gap-1">
                            <Heart className="w-3 h-3 md:w-4 md:h-4" />
                            Kits Expertos
                        </span>
                    </div>
                    
                    {/* Formulario de IA */}
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                            <textarea
                                value={userInput}
                                onChange={handleInputChange}
                                placeholder="Describe tu objetivo de salud, síntomas o lo que quieres mejorar..."
                                className="flex-1 p-3 md:p-4 border-2 border-gray-300 rounded-xl md:rounded-2xl focus:border-brand-green-500 focus:outline-none resize-none text-sm md:text-base"
                                rows={3}
                            />
                                                    <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-brand-green-600 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl hover:bg-brand-green-700 focus:outline-none focus:ring-4 focus:ring-brand-green-300 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                        >
                            {isLoading ? 'Analizando...' : 'Obtener Recomendación'}
                        </button>
                        </div>
                        
                        {error && (
                            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-600 text-center font-medium text-sm md:text-base">{error}</p>
                            </div>
                        )}
                    </form>

                    {isLoading && <Spinner />}
                    {recommendation && <RecommendationResult recommendation={recommendation} allProducts={products} />}
                </div>
            </section>

            {/* Separador Visual entre Hero y Tests */}
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
                                <Brain className="w-5 h-5" />
                                <span className="font-semibold text-sm md:text-base">Tests de Salud</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Endotelio Test Section */}
            <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl mb-12 md:mb-16 border border-red-200">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-3 md:mb-4">
                        <Heart className="w-10 h-10 md:w-12 md:h-12 text-red-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Test de Salud Endotelial
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 px-4">
                        Descubre el estado de tu endotelio con nuestro test científico de 20 preguntas. 
                        Evalúa 6 áreas clave de tu salud y obtén recomendaciones personalizadas.
                    </p>
                    <button 
                        onClick={() => setShowEndotelioTest(true)}
                        className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 shadow-lg"
                    >
                        Realizar Test de Endotelio
                    </button>
                </div>
            </section>

            {/* Separador Visual entre Tests */}
            <div className="my-12 md:my-16 px-4">
                <div className="relative">
                    {/* Línea central */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    
                    {/* Círculo central con icono */}
                    <div className="relative flex justify-center">
                        <div className="bg-white px-6 py-3 rounded-full border-2 border-gray-300 shadow-lg">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Dna className="w-5 h-5" />
                                <span className="font-semibold text-sm md:text-base">Test Nutrigenómico</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nutrigenómica Test Section */}
            <section className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl mb-12 md:mb-16 border border-purple-200 animate-pulse hover:animate-none transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-3 md:mb-4">
                        <div className="relative">
                            <Dna className="w-10 h-10 md:w-12 md:h-12 text-purple-600 animate-pulse" />
                            <div className="absolute inset-0 bg-purple-400/30 rounded-full animate-ping"></div>
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 px-2 relative" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <span className="relative z-10">
                            Test de Nutrigenómica Wellvibe
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-lg animate-pulse"></div>
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 px-4">
                        Descubre cómo tus genes responden a los alimentos. Análisis personalizado de 20 preguntas 
                        sobre 7 áreas genéticas clave para optimizar tu nutrición según tu perfil único.
                    </p>
                    
                    {/* Características del Test */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Brain className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Genes Detox</h3>
                            <p className="text-xs md:text-sm text-slate-600">Evalúa tu capacidad genética de procesamiento de antioxidantes</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Zap className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Metabolismo</h3>
                            <p className="text-xs md:text-sm text-slate-600">Descubre cómo tus genes manejan la energía y los nutrientes</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Activity className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Inflamación</h3>
                            <p className="text-xs md:text-sm text-slate-600">Analiza tu respuesta genética antiinflamatoria</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowNutrigenomicaTest(true)}
                        className="w-full sm:w-auto bg-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 shadow-lg animate-bounce hover:animate-none transform hover:scale-105 hover:shadow-2xl"
                    >
                        <span className="flex items-center gap-2">
                            <span className="relative">
                                <Dna className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                                <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                            </span>
                            Realizar Test de Nutrigenómica
                        </span>
                    </button>
                </div>
            </section>

            {/* Separador Visual entre Tests y Sueroterapia */}
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
                                <Droplets className="w-5 h-5" />
                                <span className="font-semibold text-sm md:text-base">Sueroterapia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sueroterapia Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl mb-12 md:mb-16 border border-blue-200">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="flex justify-center mb-3 md:mb-4">
                        <Droplets className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Sueroterapia Premium
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 px-4 max-w-3xl mx-auto">
                        Hidratación intravenosa personalizada con vitaminas, minerales y antioxidantes. 
                        Recupera tu energía, mejora tu sistema inmune y optimiza tu bienestar general.
                    </p>
                    
                    {/* Beneficios Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Energía Inmediata</h3>
                            <p className="text-xs md:text-sm text-slate-600">Recupera tu vitalidad y energía de forma rápida y efectiva</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Sistema Inmune</h3>
                            <p className="text-xs md:text-sm text-slate-600">Fortalece tus defensas naturales con vitaminas C, D y zinc</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Activity className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Recuperación</h3>
                            <p className="text-xs md:text-sm text-slate-600">Acelera la recuperación post-ejercicio y reduce la fatiga</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Brain className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Claridad Mental</h3>
                            <p className="text-xs md:text-sm text-slate-600">Mejora la concentración y reduce el estrés mental</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Moon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Calidad del Sueño</h3>
                            <p className="text-xs md:text-sm text-slate-600">Optimiza tu descanso y mejora la calidad del sueño</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 text-sm md:text-base">Bienestar General</h3>
                            <p className="text-xs md:text-sm text-slate-600">Mejora tu salud integral y calidad de vida</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="https://wa.me/+525579076626?text=Hola! Me interesa la sueroterapia premium. ¿Podrían darme más información sobre los tratamientos disponibles?"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" />
                            <span>Consultar Sueroterapia</span>
                        </a>
                        
                        <a 
                            href="https://sueroterapia-premiun.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg border-2 border-blue-600 flex items-center justify-center gap-2"
                        >
                            <span>Ver Más Información</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Separador Visual entre Sueroterapia y Kits */}
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
                                <Heart className="w-5 h-5" />
                                <span className="font-semibold text-sm md:text-base">Kits Estratégicos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pre-defined Kits Section */}
            <section>
               <div className="text-center mb-8 md:mb-12 px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        O explora nuestros Kits Estratégicos
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
                        Soluciones expertas diseñadas para los objetivos de salud más comunes.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4">
                    {kits.map(kit => (
                        <KitCard 
                            key={kit.id} 
                            kit={kit} 
                            allProducts={products} 
                            onShowDetails={() => handleShowDetails(kit)}
                        />
                    ))}
                </div>
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

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 px-4" data-section="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onShowDetails={() => handleShowDetails(product)}
                        />
                    ))}
                </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-slate-800 text-slate-300 mt-12 md:mt-16 border-t-4 border-brand-green-700">
        <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Wellkitt</h3>
                    <p className="text-sm md:text-base text-slate-400">Tu Navegador de Salud Natural.</p>
                    <p className="text-xs md:text-sm text-slate-400 mt-3 md:mt-4">&copy; {new Date().getFullYear()} Wellkitt. Todos los derechos reservados.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-3 md:mb-4 text-sm md:text-base">Contacto</h4>
                    <ul className="space-y-2 md:space-y-3">
                        <li>
                            <a href="https://wa.me/+525579076626" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-start gap-2 md:gap-3 hover:text-brand-green-400 transition-colors text-sm md:text-base">
                                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                <span>WhatsApp</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+525579076626" className="inline-flex items-center justify-center md:justify-start gap-2 md:gap-3 hover:text-brand-green-400 transition-colors bg-brand-green-600 text-white font-semibold py-2 px-3 md:px-4 rounded-lg shadow-md hover:bg-brand-green-700 transition-colors duration-200 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Llamar a un asesor</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-3 md:mb-4 text-sm md:text-base">Ubicación</h4>
                    <ul className="space-y-2 md:space-y-3">
                        <li>
                            <a href="https://maps.google.com/?q=Acapulco%2036%20Roma%20Nte.,%20Cuauhtémoc,%2006700%20Ciudad%20de%20México,%20CDMX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-start gap-2 md:gap-3 hover:text-brand-green-400 transition-colors text-sm md:text-base">
                                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                                <span>Acapulco 36, Roma Nte., CDMX</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>
      <div className="text-center text-slate-400 text-xs px-4 max-w-2xl mx-auto">
        <strong>Descargo de responsabilidad:</strong> <br/>
        La información y recomendaciones presentadas en este sitio no sustituyen el consejo, diagnóstico o tratamiento médico profesional. Consulta siempre a tu médico u otro proveedor de salud calificado ante cualquier duda sobre una condición médica. No ignores el consejo médico profesional ni retrases su búsqueda debido a algo que hayas leído en Wellkitt.
      </div>
      <div className="text-center text-slate-400 text-sm py-4">
        <a href="https://www.wellkitt.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green-600 underline transition-colors duration-200">www.wellkitt.com</a>
      </div>

      <DetailModal 
        item={selectedItem}
        allProducts={products}
        onClose={handleCloseDetails}
      />
      
      <Cart />
    </div>
  );
};

const AppWithCart: React.FC = () => {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
};

export default AppWithCart;