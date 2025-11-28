import { HeartPulse, Zap, Leaf, Shield, Moon, Gauge, BrainCircuit, Soup, Bone, ShieldCheck, Sparkles, Activity, Droplets, Flower2, FlaskConical } from 'lucide-react';
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
  },
  {
    name: "Terapias Alternativas",
    icon: Flower2,
    colorClass: "text-violet-600",
    description: "Homeopatía, Flores de Bach y Sales de Schüssler"
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
  
  // Aminoácidos (categoría directa de data.ts)
  "Aminoácidos": { icon: Zap, colorClass: "text-yellow-700", bgClass: "bg-yellow-100", mainCategory: "Aminoácidos" },

  // Vitaminas (categoría directa de data.ts)
  "Vitaminas": { icon: Shield, colorClass: "text-blue-700", bgClass: "bg-blue-100", mainCategory: "Vitaminas" },

  // Circulación (categoría directa de data.ts)
  "Circulación": { icon: HeartPulse, colorClass: "text-red-700", bgClass: "bg-red-100", mainCategory: "Salud General" },

  // Regulación Hormonal
  "Regulación Hormonal": { icon: HeartPulse, colorClass: "text-pink-700", bgClass: "bg-pink-100", mainCategory: "Salud General" },

  // Salud Masculina
  "Salud Masculina": { icon: Shield, colorClass: "text-blue-800", bgClass: "bg-blue-100", mainCategory: "Salud General" },

  // Salud Urinaria
  "Salud Urinaria": { icon: Activity, colorClass: "text-cyan-700", bgClass: "bg-cyan-100", mainCategory: "Salud General" },

  // Salud Respiratoria
  "Salud Respiratoria": { icon: Shield, colorClass: "text-sky-600", bgClass: "bg-sky-100", mainCategory: "Salud General" },

  // Suplementos Naturales
  "Suplementos Naturales": { icon: Leaf, colorClass: "text-green-700", bgClass: "bg-green-100", mainCategory: "Salud General" },

  // Minerales / Oligoelementos (mantener para compatibilidad)
  "Oligoelementos": { icon: Activity, colorClass: "text-orange-700", bgClass: "bg-orange-100", mainCategory: "Minerales" },
  
  // Misceláneos
  "Antioxidante": { icon: Sparkles, colorClass: "text-cyan-700", bgClass: "bg-cyan-100", mainCategory: "Salud General" },
  "Regulación hormonal y glándulas": { icon: HeartPulse, colorClass: "text-pink-700", bgClass: "bg-pink-100", mainCategory: "Salud General" },

  // Terapias Alternativas (excluidas de IA principal)
  "Homeopatía": { icon: Droplets, colorClass: "text-violet-600", bgClass: "bg-violet-100", mainCategory: "Terapias Alternativas" },
  "Flores de Bach": { icon: Flower2, colorClass: "text-rose-500", bgClass: "bg-rose-100", mainCategory: "Terapias Alternativas" },
  "Sales de Schüssler": { icon: FlaskConical, colorClass: "text-slate-600", bgClass: "bg-slate-100", mainCategory: "Terapias Alternativas" },
};

// Función helper para obtener subcategorías de una categoría principal
export const getSubcategories = (mainCategory: string): string[] => {
  return Object.entries(categoryConfig)
    .filter(([, config]) => config.mainCategory === mainCategory)
    .map(([categoryName]) => categoryName);
};
