import { HeartPulse, Zap, Leaf, Shield, Moon, Gauge, BrainCircuit, Soup, Bone, ShieldCheck, FlaskConical, Smile, Star, Gem, Pill, PlusCircle, UserCog, Sparkles, Activity } from 'lucide-react';
import { ComponentType } from 'react';

export interface CategoryConfig {
  icon: ComponentType<any>;
  colorClass: string;
  bgClass: string;
  mainCategory: string;
}

export interface MainCategory {
  name: string;
  icon: ComponentType<any>;
  colorClass: string;
  description: string;
}

export const mainCategories: MainCategory[] = [
  {
    name: "Salud General",
    icon: HeartPulse,
    colorClass: "text-pink-600",
    description: "Productos para necesidades generales de salud"
  },
  {
    name: "Aminoácidos",
    icon: Zap,
    colorClass: "text-yellow-600",
    description: "Suplementos de aminoácidos especializados"
  },
  {
    name: "Vitaminas",
    icon: Shield,
    colorClass: "text-blue-600",
    description: "Complejos vitamínicos y suplementos"
  },
  {
    name: "Minerales",
    icon: Activity,
    colorClass: "text-orange-600",
    description: "Oligoelementos y minerales esenciales"
  }
];

export const categoryConfig: { [key: string]: CategoryConfig } = {
  // Salud General
  "Salud Femenina": { icon: HeartPulse, colorClass: "text-pink-500", bgClass: "bg-pink-100", mainCategory: "Salud General" },
  "Energía y Rendimiento": { icon: Zap, colorClass: "text-yellow-500", bgClass: "bg-yellow-100", mainCategory: "Salud General" },
  "Piel y Belleza": { icon: Leaf, colorClass: "text-green-500", bgClass: "bg-green-100", mainCategory: "Salud General" },
  "Sistema Inmune": { icon: Shield, colorClass: "text-blue-500", bgClass: "bg-blue-100", mainCategory: "Salud General" },
  "Anti-Estrés y Sueño": { icon: Moon, colorClass: "text-indigo-500", bgClass: "bg-indigo-100", mainCategory: "Salud General" },
  "Metabolismo": { icon: Gauge, colorClass: "text-orange-500", bgClass: "bg-orange-100", mainCategory: "Salud General" },
  "Salud Cerebral": { icon: BrainCircuit, colorClass: "text-purple-500", bgClass: "bg-purple-100", mainCategory: "Salud General" },
  "Salud Digestiva": { icon: Soup, colorClass: "text-teal-500", bgClass: "bg-teal-100", mainCategory: "Salud General" },
  "Articulaciones y Movilidad": { icon: Bone, colorClass: "text-red-500", bgClass: "bg-red-100", mainCategory: "Salud General" },
  "Detox y Antioxidantes": { icon: ShieldCheck, colorClass: "text-cyan-500", bgClass: "bg-cyan-100", mainCategory: "Salud General" },
  "Control de Peso": { icon: Gauge, colorClass: "text-amber-500", bgClass: "bg-amber-100", mainCategory: "Salud General" },
  
  // Aminoácidos
  "Aminoácidos colágeno": { icon: Bone, colorClass: "text-amber-700", bgClass: "bg-amber-100", mainCategory: "Aminoácidos" },
  "Aminoácidos detox": { icon: FlaskConical, colorClass: "text-lime-700", bgClass: "bg-lime-100", mainCategory: "Aminoácidos" },
  "Aminoácidos esenciales": { icon: Star, colorClass: "text-yellow-700", bgClass: "bg-yellow-100", mainCategory: "Aminoácidos" },
  "Aminoácidos especializados": { icon: UserCog, colorClass: "text-blue-700", bgClass: "bg-blue-100", mainCategory: "Aminoácidos" },
  "Aminoácidos estado de ánimo": { icon: Smile, colorClass: "text-pink-700", bgClass: "bg-pink-100", mainCategory: "Aminoácidos" },
  "Aminoácidos no esenciales": { icon: PlusCircle, colorClass: "text-gray-700", bgClass: "bg-gray-100", mainCategory: "Aminoácidos" },
  "Aminoácidos semi-esenciales": { icon: Gem, colorClass: "text-purple-700", bgClass: "bg-purple-100", mainCategory: "Aminoácidos" },
  "Complejo aminoácidos": { icon: Pill, colorClass: "text-indigo-700", bgClass: "bg-indigo-100", mainCategory: "Aminoácidos" },
  "Complejo aminoácidos avanzado": { icon: Pill, colorClass: "text-indigo-900", bgClass: "bg-indigo-100", mainCategory: "Aminoácidos" },
  
  // Vitaminas
  "Complejo vitamínico": { icon: PlusCircle, colorClass: "text-green-700", bgClass: "bg-green-100", mainCategory: "Vitaminas" },
  "Multivitamínico completo": { icon: PlusCircle, colorClass: "text-green-900", bgClass: "bg-green-100", mainCategory: "Vitaminas" },
  
  // Minerales
  "Oligoelementos": { icon: Activity, colorClass: "text-orange-700", bgClass: "bg-orange-100", mainCategory: "Minerales" },
  "Oligoelementos completo": { icon: Activity, colorClass: "text-orange-900", bgClass: "bg-orange-100", mainCategory: "Minerales" },
  
  // Misceláneos
  "Antioxidante": { icon: Sparkles, colorClass: "text-cyan-700", bgClass: "bg-cyan-100", mainCategory: "Salud General" },
  "Regulación hormonal y glándulas": { icon: HeartPulse, colorClass: "text-pink-700", bgClass: "bg-pink-100", mainCategory: "Salud General" },
};

// Función helper para obtener subcategorías de una categoría principal
export const getSubcategories = (mainCategory: string): string[] => {
  return Object.entries(categoryConfig)
    .filter(([, config]) => config.mainCategory === mainCategory)
    .map(([categoryName]) => categoryName);
};
