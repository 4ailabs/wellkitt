import { useCallback } from 'react';
import { Product, Kit } from '../types';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProductActionsReturn {
  handleAddToCart: (e: React.MouseEvent) => void;
  handleToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

interface KitActionsReturn {
  handleAddKitToCart: (e: React.MouseEvent) => void;
  handleToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

/**
 * Hook para manejar acciones de producto (agregar al carrito, favoritos)
 * Elimina la duplicación de código en ProductCard, ProductCardPremium, ProductListItem, etc.
 */
export const useProductActions = (product: Product): ProductActionsReturn => {
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite: checkFavorite } = useFavorites();
  const isProductFavorite = checkFavorite(product.id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  }, [addItem, product]);

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProductFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  }, [isProductFavorite, removeFavorite, addFavorite, product]);

  return {
    handleAddToCart,
    handleToggleFavorite,
    isFavorite: isProductFavorite,
  };
};

/**
 * Hook para manejar acciones de kit (agregar todos al carrito, favoritos)
 * Elimina la duplicación de código en KitCard, DetailModal, etc.
 */
export const useKitActions = (kit: Kit, kitProducts: Product[]): KitActionsReturn => {
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite: checkFavorite } = useFavorites();
  const isKitFavorite = checkFavorite(kit.id);

  const handleAddKitToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    kitProducts.forEach(product => addItem(product));
  }, [addItem, kitProducts]);

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isKitFavorite) {
      removeFavorite(kit.id);
    } else {
      addFavorite(kit);
    }
  }, [isKitFavorite, removeFavorite, addFavorite, kit]);

  return {
    handleAddKitToCart,
    handleToggleFavorite,
    isFavorite: isKitFavorite,
  };
};
