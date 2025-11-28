import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, FlaskConical, Package, Phone, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenFavorites: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenFavorites }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart();
  const { favorites } = useFavorites();

  const cartCount = state.totalItems;
  const favoritesCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = 400; // Altura aproximada del hero

      // Mostrar navbar después de pasar el hero
      if (currentScrollY > heroHeight) {
        // Mostrar al hacer scroll hacia arriba o si está quieto
        if (currentScrollY < lastScrollY || currentScrollY > heroHeight + 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'hero', label: 'Inicio', icon: null },
    { id: 'recomendador', label: 'Recomendador IA', icon: Sparkles },
    { id: 'tests', label: 'Tests', icon: FlaskConical },
    { id: 'productos', label: 'Productos', icon: Package },
    { id: 'contacto', label: 'Contacto', icon: Phone },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/73c6af8e-f633-4998-8928-407855b4400e/logo+wellkitt.png?format=100w"
                  alt="Wellkitt"
                  className="h-8 w-auto"
                />
                <span className="font-bold text-brand-green-600 text-lg hidden sm:block">Wellkitt</span>
              </button>

              {/* Links de navegación - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-green-600 hover:bg-brand-green-50 rounded-lg transition-all"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Acciones - Carrito y Favoritos */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenFavorites}
                  className="relative p-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Favoritos"
                >
                  <Heart className="w-5 h-5" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onOpenCart}
                  className="relative p-2 text-slate-600 hover:text-brand-green-600 hover:bg-brand-green-50 rounded-full transition-all"
                  title="Carrito"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Botón menú móvil */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Menú móvil */}
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
                        onClick={() => scrollToSection(link.id)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-slate-700 hover:bg-brand-green-50 hover:text-brand-green-600 rounded-lg transition-all"
                      >
                        {link.icon && <link.icon className="w-5 h-5" />}
                        <span className="font-medium">{link.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
