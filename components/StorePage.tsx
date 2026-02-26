import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeft, Search, X, ChevronRight, LayoutGrid, LayoutList, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { mainCategories, categoryConfig, getSubcategories } from './category-config';
import ProductCardPremium from './ProductCardPremium';
import ProductListItem from './ProductListItem';
import { useDebounce } from '../hooks/useDebounce';
import { isFuzzyMatch, calculateRelevanceScore, getSearchSuggestions, normalizeText } from '../utils/searchUtils';

interface StorePageProps {
  products: Product[];
  onBack: () => void;
  onShowDetails: (product: Product) => void;
  initialCategory?: string;
}

const INITIAL_SHOW = 8;
const LOAD_MORE_COUNT = 8;

type ViewMode = 'grid' | 'list';

const StorePage: React.FC<StorePageProps> = ({
  products,
  onBack,
  onShowDetails,
  initialCategory,
}) => {
  const [activeMainCategory, setActiveMainCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, number>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    return getSearchSuggestions(debouncedSearch, products);
  }, [debouncedSearch, products]);

  // Filter products by search
  const searchFilteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;

    return products
      .filter(p => {
        return (
          isFuzzyMatch(debouncedSearch, p.name) ||
          isFuzzyMatch(debouncedSearch, p.brand) ||
          isFuzzyMatch(debouncedSearch, p.category) ||
          p.ingredients.some((ing: string) => isFuzzyMatch(debouncedSearch, ing)) ||
          p.benefits.some((ben: string) => isFuzzyMatch(debouncedSearch, ben))
        );
      })
      .sort((a, b) => {
        const scoreA = calculateRelevanceScore(debouncedSearch, a);
        const scoreB = calculateRelevanceScore(debouncedSearch, b);
        return scoreB - scoreA;
      });
  }, [products, debouncedSearch]);

  // Group products by subcategory within active main category
  const groupedProducts = useMemo(() => {
    if (debouncedSearch.trim()) {
      // When searching, show flat results regardless of category
      return null;
    }

    if (activeMainCategory === 'all') {
      // Group all products by their main category → subcategory
      const groups: { mainCat: string; subcategory: string; products: Product[] }[] = [];

      mainCategories.forEach(mainCat => {
        const subcats = getSubcategories(mainCat.name);
        subcats.forEach(subcat => {
          const subcatProducts = searchFilteredProducts.filter(p => p.category === subcat);
          if (subcatProducts.length > 0) {
            groups.push({
              mainCat: mainCat.name,
              subcategory: subcat,
              products: subcatProducts,
            });
          }
        });
      });

      return groups;
    }

    // Specific main category selected
    const subcats = getSubcategories(activeMainCategory);

    // If the main category IS a direct subcategory (like Aminoácidos, Vitaminas)
    if (subcats.length === 1 && subcats[0] === activeMainCategory) {
      const catProducts = searchFilteredProducts.filter(p => p.category === activeMainCategory);
      if (catProducts.length > 0) {
        return [{
          mainCat: activeMainCategory,
          subcategory: activeMainCategory,
          products: catProducts,
        }];
      }
      return [];
    }

    const groups: { mainCat: string; subcategory: string; products: Product[] }[] = [];
    subcats.forEach(subcat => {
      const subcatProducts = searchFilteredProducts.filter(p => p.category === subcat);
      if (subcatProducts.length > 0) {
        groups.push({
          mainCat: activeMainCategory,
          subcategory: subcat,
          products: subcatProducts,
        });
      }
    });

    return groups;
  }, [searchFilteredProducts, activeMainCategory, debouncedSearch]);

  const getVisibleCount = (subcategory: string) => {
    return expandedSubcategories[subcategory] || INITIAL_SHOW;
  };

  const handleLoadMore = (subcategory: string) => {
    setExpandedSubcategories(prev => ({
      ...prev,
      [subcategory]: (prev[subcategory] || INITIAL_SHOW) + LOAD_MORE_COUNT,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setActiveMainCategory(category);
    setExpandedSubcategories({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalInCategory = useMemo(() => {
    if (activeMainCategory === 'all') return products.length;
    const subcats = getSubcategories(activeMainCategory);
    return products.filter(p => subcats.includes(p.category)).length;
  }, [activeMainCategory, products]);

  // Count products per main category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    mainCategories.forEach(cat => {
      const subcats = getSubcategories(cat.name);
      counts[cat.name] = products.filter(p => subcats.includes(p.category)).length;
    });
    return counts;
  }, [products]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <div className="min-h-screen bg-white pt-[72px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Store Header */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Inicio</span>
            </button>

            <div className="h-5 w-px bg-slate-200" />

            <h1
              className="text-lg sm:text-xl font-bold text-slate-900 shrink-0"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Tienda
            </h1>

            {/* Search bar */}
            <div className="flex-1 max-w-md ml-auto relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 pl-10 pr-9 border border-slate-200 rounded-full text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 focus:outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setShowSuggestions(false); searchInputRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}

              {/* Search suggestions dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-slate-100">
                  <ul className="max-h-52 overflow-y-auto py-1">
                    {searchSuggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          onMouseDown={(e) => { e.preventDefault(); setSearchQuery(suggestion); setShowSuggestions(false); }}
                          className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                        >
                          <Search className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          <span dangerouslySetInnerHTML={{
                            __html: suggestion.replace(
                              new RegExp(`(${normalizeText(searchQuery).split(/\s+/).join('|')})`, 'gi'),
                              '<strong class="text-slate-900">$1</strong>'
                            )
                          }} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* View mode toggle */}
            <div className="hidden sm:flex bg-slate-100 rounded-lg p-0.5 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile category pills - scrollable */}
          <div className="sm:hidden overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 w-max">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeMainCategory === 'all'
                    ? 'bg-brand-green-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200'
                }`}
              >
                Todos ({categoryCounts.all})
              </button>
              {mainCategories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeMainCategory === cat.name
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                >
                  {cat.name} ({categoryCounts[cat.name] || 0})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden sm:block w-56 shrink-0">
            <div className="sticky top-[160px]">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Categorías</p>
              <nav className="space-y-1">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    activeMainCategory === 'all'
                      ? 'bg-brand-green-600 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Todos</span>
                  <span className={`text-xs ${activeMainCategory === 'all' ? 'text-brand-green-200' : 'text-slate-400'}`}>
                    {categoryCounts.all}
                  </span>
                </button>
                {mainCategories.map(cat => {
                  const Icon = cat.icon;
                  const isActive = activeMainCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                        isActive
                          ? 'bg-brand-green-600 text-white'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-green-200' : cat.colorClass}`} strokeWidth={2} />
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className={`text-xs shrink-0 ${isActive ? 'text-brand-green-200' : 'text-slate-400'}`}>
                        {categoryCounts[cat.name] || 0}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Category header */}
            {!isSearching && (
              <div className="mb-8">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-slate-900"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  {activeMainCategory === 'all' ? 'Todos los Productos' : activeMainCategory}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {totalInCategory} {totalInCategory === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            )}

            {/* Search results header */}
            {isSearching && (
              <div className="mb-8">
                <p className="text-sm text-slate-500">
                  {searchFilteredProducts.length > 0 ? (
                    <>
                      <span className="font-semibold text-slate-700">{searchFilteredProducts.length}</span>
                      {' '}{searchFilteredProducts.length === 1 ? 'resultado' : 'resultados'} para "{debouncedSearch}"
                    </>
                  ) : (
                    <>
                      Sin resultados para "{debouncedSearch}".{' '}
                      <button onClick={() => setSearchQuery('')} className="text-slate-900 font-medium hover:underline">
                        Ver todos
                      </button>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Products */}
            {isSearching ? (
              // Flat search results
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchFilteredProducts.map(product => (
                      <ProductCardPremium key={product.id} product={product} onShowDetails={() => onShowDetails(product)} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-w-4xl">
                    {searchFilteredProducts.map(product => (
                      <ProductListItem key={product.id} product={product} onShowDetails={() => onShowDetails(product)} />
                    ))}
                  </div>
                )}
              </>
            ) : groupedProducts && groupedProducts.length > 0 ? (
              // Grouped by subcategory
              <div className="space-y-14">
                {groupedProducts.map(group => {
                  const visibleCount = getVisibleCount(group.subcategory);
                  const visibleProducts = group.products.slice(0, visibleCount);
                  const hasMore = group.products.length > visibleCount;
                  const remaining = group.products.length - visibleCount;
                  const config = categoryConfig[group.subcategory];
                  const Icon = config?.icon;

                  return (
                    <div key={group.subcategory}>
                      {/* Subcategory header */}
                      <div className="flex items-center gap-3 mb-5">
                        {Icon && (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config?.bgClass || 'bg-slate-100'}`}>
                            <Icon className={`w-4 h-4 ${config?.colorClass || 'text-slate-500'}`} strokeWidth={2} />
                          </div>
                        )}
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-800" style={{ fontFamily: 'Lora, serif' }}>
                            {group.subcategory}
                          </h3>
                          <p className="text-xs text-slate-400">{group.products.length} productos</p>
                        </div>
                      </div>

                      {/* Products grid */}
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {visibleProducts.map(product => (
                            <ProductCardPremium key={product.id} product={product} onShowDetails={() => onShowDetails(product)} />
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 max-w-4xl">
                          {visibleProducts.map(product => (
                            <ProductListItem key={product.id} product={product} onShowDetails={() => onShowDetails(product)} />
                          ))}
                        </div>
                      )}

                      {/* Load more button */}
                      {hasMore && (
                        <div className="flex justify-center mt-6">
                          <button
                            onClick={() => handleLoadMore(group.subcategory)}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                          >
                            Cargar más ({remaining > LOAD_MORE_COUNT ? LOAD_MORE_COUNT : remaining} de {remaining})
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : !isSearching ? (
              <div className="text-center py-20">
                <p className="text-slate-400 text-sm">No hay productos en esta categoría.</p>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="mt-3 text-sm text-slate-900 font-medium hover:underline"
                >
                  Ver todos los productos
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
