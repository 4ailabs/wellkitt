import { useState, useMemo, useRef, useCallback } from 'react';
import { Product } from '../types';
import { useDebounce } from './useDebounce';
import { isFuzzyMatch, calculateRelevanceScore, getSearchSuggestions } from '../utils/searchUtils';

export type SortOption = 'default' | 'name-asc' | 'name-desc' | 'category';

interface UseSearchOptions {
  debounceMs?: number;
}

interface UseSearchReturn {
  // Estado de búsqueda
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearchQuery: string;

  // Sugerencias
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  searchSuggestions: string[];

  // Ordenamiento
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;

  // Resultados
  filteredProducts: Product[];
  sortedProducts: Product[];

  // Paginación
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentProducts: Product[];

  // Refs
  searchInputRef: React.RefObject<HTMLInputElement>;

  // Acciones
  clearSearch: () => void;
  selectSuggestion: (suggestion: string) => void;
}

/**
 * Hook centralizado para toda la lógica de búsqueda y filtrado
 * Extrae la lógica de App.tsx para mejor mantenibilidad
 */
export const useSearch = (
  products: Product[],
  activeCategory: string,
  productsPerPage: number = 12,
  options: UseSearchOptions = {}
): UseSearchReturn => {
  const { debounceMs = 300 } = options;

  // Estado de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);

  // Sugerencias de búsqueda
  const searchSuggestions = useMemo(() => {
    return getSearchSuggestions(debouncedSearchQuery, products);
  }, [debouncedSearchQuery, products]);

  // Filtrado de productos con búsqueda fuzzy
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Filtro por categoría
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;

      // Sin búsqueda, solo filtrar por categoría
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
        return scoreB - scoreA;
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

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, currentPage, productsPerPage]);

  // Acciones
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  }, []);

  const selectSuggestion = useCallback((suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setCurrentPage(1);
  }, []);

  // Wrapper para setSearchQuery que resetea la página
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Wrapper para setSortBy que resetea la página
  const handleSetSortBy = useCallback((sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    debouncedSearchQuery,
    showSuggestions,
    setShowSuggestions,
    searchSuggestions,
    sortBy,
    setSortBy: handleSetSortBy,
    filteredProducts,
    sortedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    currentProducts,
    searchInputRef,
    clearSearch,
    selectSuggestion,
  };
};
