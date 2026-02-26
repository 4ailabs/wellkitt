import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart, Heart, ArrowUpRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenStore?: () => void;
  onGoHome?: () => void;
  isOnLanding?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenFavorites, onOpenStore, onGoHome, isOnLanding = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useCart();
  const { favorites } = useFavorites();

  const cartCount = state.totalItems;
  const favoritesCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // If not on landing, go home first then scroll after a short delay
  const navigateTo = (sectionId: string) => {
    if (isOnLanding) {
      scrollToSection(sectionId);
    } else {
      onGoHome?.();
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  const navLinks = [
    { id: 'recomendador', label: 'Recomendador', action: () => navigateTo('recomendador') },
    { id: 'tests', label: 'Tests', action: () => navigateTo('tests') },
    { id: 'productos', label: 'Tienda', action: onOpenStore },
    { id: 'contacto', label: 'Soporte', action: () => navigateTo('contacto') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-white'
      }`}
      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => { if (!isOnLanding) { onGoHome?.(); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <img
              src="https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=100w"
              alt="Wellkitt"
              className="h-7 w-auto"
            />
            <span
              className="font-bold text-slate-900 text-lg tracking-tight"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Wellkitt_
            </span>
          </button>

          {/* Center links + icons in pill tab bar */}
          <div className="hidden md:flex items-center gap-0 bg-slate-50 rounded-full px-1.5 py-1 border border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { link.action?.(); setIsMobileMenuOpen(false); }}
                className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-all"
              >
                {link.label}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-4 bg-slate-200 mx-1" />

            {/* Search icon */}
            <button
              onClick={() => navigateTo('recomendador')}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-full transition-colors"
              title="Buscar"
            >
              <Search className="w-[16px] h-[16px]" />
            </button>

            {/* Cart icon */}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenCart(); }}
              className="relative p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-full transition-colors"
              title="Carrito"
            >
              <ShoppingCart className="w-[16px] h-[16px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Right side - CTA button + mobile */}
          <div className="flex items-center gap-3">
            {/* Favorites (mobile & desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenFavorites(); }}
              className="relative p-2 text-slate-500 hover:text-red-500 rounded-full transition-colors md:hidden"
              title="Favoritos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* CTA pill button - desktop */}
            <button
              onClick={() => navigateTo('recomendador')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-green-600 text-white text-sm font-semibold rounded-full hover:bg-brand-green-700 transition-colors"
            >
              Empezar Test
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => { link.action?.(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-slate-700 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg transition-all"
                  >
                    <span className="font-medium">{link.label}</span>
                  </button>
                ))}

                {/* Mobile actions */}
                <div className="flex items-center gap-2 px-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenFavorites(); setIsMobileMenuOpen(false); }}
                    className="relative flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">Favoritos</span>
                    {favoritesCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {favoritesCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenCart(); setIsMobileMenuOpen(false); }}
                    className="relative flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 hover:text-brand-green-600 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-sm font-medium">Carrito</span>
                    {cartCount > 0 && (
                      <span className="bg-brand-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="px-4 pt-2">
                  <button
                    onClick={() => { navigateTo('recomendador'); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-green-600 text-white text-sm font-semibold rounded-full hover:bg-brand-green-700 transition-colors"
                  >
                    Empezar Test
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
