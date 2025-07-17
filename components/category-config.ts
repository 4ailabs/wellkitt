import { HeartPulse, Zap, Leaf, Shield, Moon, Gauge, BrainCircuit, Soup, Bone, ShieldCheck } from 'lucide-react';
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
};
