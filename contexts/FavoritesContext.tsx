import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Kit } from '../types';

interface FavoritesContextType {
  favorites: (Product | Kit)[];
  addFavorite: (item: Product | Kit) => void;
  removeFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<(Product | Kit)[]>([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('wellkitt-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
        localStorage.removeItem('wellkitt-favorites');
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('wellkitt-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: Product | Kit) => {
    setFavorites(prev => {
      // Evitar duplicados
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (itemId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const isFavorite = (itemId: string): boolean => {
    return favorites.some(item => item.id === itemId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('wellkitt-favorites');
  };

  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        getFavoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

