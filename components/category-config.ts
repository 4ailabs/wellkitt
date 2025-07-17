import { HeartPulse, Zap, Leaf, Shield, Moon, Gauge, BrainCircuit, Soup, Bone, ShieldCheck, FlaskConical, Smile, Star, Gem, Pill, PlusCircle, UserCog, Sparkles, Activity } from 'lucide-react';
import { ComponentType } from 'react';

export interface CategoryConfig {
  icon: ComponentType<any>;
  colorClass: string;
  bgClass: string;
}

export const categoryConfig: { [key: string]: CategoryConfig } = {
  "Salud Femenina": { icon: HeartPulse, colorClass: "text-pink-500", bgClass: "bg-pink-100" },
  "Energía y Rendimiento": { icon: Zap, colorClass: "text-yellow-500", bgClass: "bg-yellow-100" },
  "Piel y Belleza": { icon: Leaf, colorClass: "text-green-500", bgClass: "bg-green-100" },
  "Sistema Inmune": { icon: Shield, colorClass: "text-blue-500", bgClass: "bg-blue-100" },
  "Anti-Estrés y Sueño": { icon: Moon, colorClass: "text-indigo-500", bgClass: "bg-indigo-100" },
  "Metabolismo": { icon: Gauge, colorClass: "text-orange-500", bgClass: "bg-orange-100" },
  "Salud Cerebral": { icon: BrainCircuit, colorClass: "text-purple-500", bgClass: "bg-purple-100" },
  "Salud Digestiva": { icon: Soup, colorClass: "text-teal-500", bgClass: "bg-teal-100" },
  "Articulaciones y Movilidad": { icon: Bone, colorClass: "text-red-500", bgClass: "bg-red-100" },
  "Detox y Antioxidantes": { icon: ShieldCheck, colorClass: "text-cyan-500", bgClass: "bg-cyan-100" },
  "Control de Peso": { icon: Gauge, colorClass: "text-amber-500", bgClass: "bg-amber-100" },
  // Nuevas categorías
  "Aminoácidos colágeno": { icon: Bone, colorClass: "text-amber-700", bgClass: "bg-amber-100" },
  "Aminoácidos detox": { icon: FlaskConical, colorClass: "text-lime-700", bgClass: "bg-lime-100" },
  "Aminoácidos esenciales": { icon: Star, colorClass: "text-yellow-700", bgClass: "bg-yellow-100" },
  "Aminoácidos especializados": { icon: UserCog, colorClass: "text-blue-700", bgClass: "bg-blue-100" },
  "Aminoácidos estado de ánimo": { icon: Smile, colorClass: "text-pink-700", bgClass: "bg-pink-100" },
  "Aminoácidos no esenciales": { icon: PlusCircle, colorClass: "text-gray-700", bgClass: "bg-gray-100" },
  "Aminoácidos semi-esenciales": { icon: Gem, colorClass: "text-purple-700", bgClass: "bg-purple-100" },
  "Antioxidante": { icon: Sparkles, colorClass: "text-cyan-700", bgClass: "bg-cyan-100" },
  "Complejo aminoácidos": { icon: Pill, colorClass: "text-indigo-700", bgClass: "bg-indigo-100" },
  "Complejo aminoácidos avanzado": { icon: Pill, colorClass: "text-indigo-900", bgClass: "bg-indigo-100" },
  "Complejo vitamínico": { icon: PlusCircle, colorClass: "text-green-700", bgClass: "bg-green-100" },
  "Multivitamínico completo": { icon: PlusCircle, colorClass: "text-green-900", bgClass: "bg-green-100" },
  "Oligoelementos": { icon: Activity, colorClass: "text-orange-700", bgClass: "bg-orange-100" },
  "Oligoelementos completo": { icon: Activity, colorClass: "text-orange-900", bgClass: "bg-orange-100" },
  "Regulación hormonal y glándulas": { icon: HeartPulse, colorClass: "text-pink-700", bgClass: "bg-pink-100" },
};
