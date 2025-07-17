
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
import { categoryConfig } from './components/category-config';
import { Phone, MapPin, List } from 'lucide-react';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Kit | Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

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

  const categories = ['All', ...Object.keys(categoryConfig)];
  
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brand-green-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Wellkitt</h1>
          <p className="hidden md:block text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>Tu Navegador de Salud Natural</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 md:py-12" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* AI Recommender Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16 border border-gray-100">
            <div className="text-center max-w-3xl mx-auto">
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Encuentra tu Kit de Bienestar Ideal
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                    Nuestro sistema avanzado inteligente te creará un kit personalizado con los mejores productos naturales para ti.
                </p>
            </div>
           
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="relative">
                    <textarea
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Ej: 'Quiero más energía durante el día y mejorar mi digestión...'"
                        className="w-full h-32 p-4 pr-32 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-brand-green-200 focus:border-brand-green-500 transition-all duration-300 resize-none text-base"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit"
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-brand-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-green-700 focus:outline-none focus:ring-4 focus:ring-brand-green-300 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Crear mi Kit'}
                    </button>
                </div>
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </form>

            {isLoading && <Spinner />}
            {recommendation && <RecommendationResult recommendation={recommendation} allProducts={products} />}

        </section>

        {/* Pre-defined Kits Section */}
        <section>
           <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    O explora nuestros Kits Estratégicos
                </h2>
                <p className="text-md text-slate-600 max-w-xl mx-auto">
                    Soluciones expertas diseñadas para los objetivos de salud más comunes.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* All Products Section */}
        <section className="mt-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Explora Todos Nuestros Productos
                </h2>
                <p className="text-md text-slate-600 max-w-2xl mx-auto">
                    Encuentra el suplemento individual perfecto para tus necesidades específicas de nuestra completa selección.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(category => {
                    const isActive = activeCategory === category;
                    const config = categoryConfig[category];
                    const Icon = config?.icon;
                    
                    return (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border-2 ${
                                isActive
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                                    : 'bg-white text-slate-700 border-gray-200 hover:border-slate-300'
                            }`}
                        >
                            {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-white' : config.colorClass}`} />}
                            {category === 'All' && <List className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-700'}`} />}
                            <span>{category === 'All' ? 'Todos' : category}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onShowDetails={() => handleShowDetails(product)}
                    />
                ))}
            </div>
        </section>

      </main>

      <footer className="bg-slate-800 text-slate-300 mt-16 border-t-4 border-brand-green-700">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Wellkitt</h3>
                    <p className="text-slate-400">Tu Navegador de Salud Natural.</p>
                    <p className="text-slate-400 mt-4">&copy; {new Date().getFullYear()} Wellkitt. Todos los derechos reservados.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-4">Contacto</h4>
                    <ul className="space-y-3">
                        <li>
                            <a href="https://wa.me/+525579076626" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-start gap-3 hover:text-brand-green-400 transition-colors">
                                <Phone className="w-5 h-5" />
                                <span>WhatsApp</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-wider mb-4">Ubicación</h4>
                    <ul className="space-y-3">
                        <li>
                            <a href="https://maps.google.com/?q=Acapulco%2036%20Roma%20Nte.,%20Cuauhtémoc,%2006700%20Ciudad%20de%20México,%20CDMX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center md:justify-start gap-3 hover:text-brand-green-400 transition-colors">
                                <MapPin className="w-5 h-5" />
                                <span>Acapulco 36, Roma Nte., CDMX</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>

      <DetailModal 
        item={selectedItem}
        allProducts={products}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default App;