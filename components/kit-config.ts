import React from 'react';
import { ShieldCheck, Soup, Moon, Zap, HeartPulse, Bone, Shield, Gauge, Package } from 'lucide-react';

/**
 * Configuración centralizada para kits
 * Elimina duplicación entre DetailModal.tsx y KitCard.tsx
 */

// Iconos por kit ID
export const kitIconComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
  K01: ShieldCheck,
  K02: Soup,
  K03: Moon,
  K04: Zap,
  K05: HeartPulse,
  K06: Bone,
  K07: Shield,
  K08: Gauge,
};

// Icono por defecto
export const DefaultKitIcon = Package;

// Colores para KitCard (variante con más propiedades)
export interface KitCardColors {
  bg: string;
  icon: string;
  border: string;
  accent: string;
  iconBg: string;
}

export const kitCardColors: { [key: string]: KitCardColors } = {
  K01: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-t-green-500', accent: 'bg-green-100', iconBg: 'bg-green-200' },
  K02: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-t-blue-500', accent: 'bg-blue-100', iconBg: 'bg-blue-200' },
  K03: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-t-purple-500', accent: 'bg-purple-100', iconBg: 'bg-purple-200' },
  K04: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-t-yellow-500', accent: 'bg-yellow-100', iconBg: 'bg-yellow-200' },
  K05: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-t-pink-500', accent: 'bg-pink-100', iconBg: 'bg-pink-200' },
  K06: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-t-orange-500', accent: 'bg-orange-100', iconBg: 'bg-orange-200' },
  K07: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-t-teal-500', accent: 'bg-teal-100', iconBg: 'bg-teal-200' },
  K08: { bg: 'bg-lime-50', icon: 'text-lime-600', border: 'border-t-lime-500', accent: 'bg-lime-100', iconBg: 'bg-lime-200' },
};

// Colores para DetailModal (variante con gradientes)
export interface KitModalColors {
  bg: string;
  text: string;
  light: string;
  gradient: string;
}

export const kitModalColors: { [key: string]: KitModalColors } = {
  K01: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', gradient: 'from-green-500 to-green-600' },
  K02: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', gradient: 'from-blue-500 to-blue-600' },
  K03: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', gradient: 'from-purple-500 to-purple-600' },
  K04: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', gradient: 'from-yellow-500 to-yellow-600' },
  K05: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50', gradient: 'from-pink-500 to-pink-600' },
  K06: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', gradient: 'from-orange-500 to-orange-600' },
  K07: { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50', gradient: 'from-teal-500 to-teal-600' },
  K08: { bg: 'bg-lime-500', text: 'text-lime-600', light: 'bg-lime-50', gradient: 'from-lime-500 to-lime-600' },
};

// Sugerencias de uso por kit
export const kitUsageSuggestions: { [key: string]: string } = {
  K01: "Toma los productos detox por la mañana en ayunas para mejor absorción. El drenaje linfático puede tomarse antes de dormir.",
  K02: "Toma los enzimas digestivos con las comidas principales. Los probióticos preferentemente en ayunas.",
  K03: "Toma los relajantes 30 minutos antes de dormir. La valeriana puede complementarse durante el día si hay ansiedad.",
  K04: "Toma los energizantes por la mañana y después del almuerzo. Evita tomarlos después de las 4pm.",
  K05: "Toma los suplementos hormonales con el desayuno. Puede llevar 2-4 semanas notar beneficios.",
  K06: "Toma los antiinflamatorios con las comidas para mejor tolerancia. La glucosamina funciona mejor con uso continuo.",
  K07: "Toma los inmunomoduladores por la mañana. Durante infecciones activas, puede aumentarse la dosis.",
  K08: "Toma los termogénicos por la mañana. El control de apetito 30 min antes de las comidas principales.",
};

// Colores por defecto
export const defaultKitCardColors: KitCardColors = {
  bg: 'bg-white',
  icon: 'text-brand-green-600',
  border: 'border-t-gray-300',
  accent: 'bg-gray-100',
  iconBg: 'bg-gray-200',
};

export const defaultKitModalColors: KitModalColors = {
  bg: 'bg-brand-green-500',
  text: 'text-brand-green-600',
  light: 'bg-brand-green-50',
  gradient: 'from-brand-green-500 to-brand-green-600',
};

// Helper functions
export const getKitCardColors = (kitId: string): KitCardColors => {
  return kitCardColors[kitId] || defaultKitCardColors;
};

export const getKitModalColors = (kitId: string): KitModalColors => {
  return kitModalColors[kitId] || defaultKitModalColors;
};

export const getKitIcon = (kitId: string): React.ComponentType<{ className?: string }> => {
  return kitIconComponents[kitId] || DefaultKitIcon;
};

export const getKitUsageSuggestion = (kitId: string): string => {
  return kitUsageSuggestions[kitId] || "Sigue las instrucciones de cada producto individual.";
};
