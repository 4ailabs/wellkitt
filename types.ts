
export interface Product {
  id: string;
  name: string;
  brand: 'Soria Natural' | 'Biofito' | 'Wellkitt';
  ingredients: string[];
  benefits: string[];
  presentation?: string;
  category: string;
}

export interface Kit {
  id: string;
  name: string;
  problem: string;
  benefit: string;
  productIds: string[];
  discount: number;
}

export interface Recommendation {
  recommendation_type: 'predefined_kit' | 'custom_kit';
  kit_id?: string;
  custom_kit_name?: string;
  custom_kit_description?: string;
  product_ids: string[];
  reasoning: string;
}

// Tipos para el Test de Endotelio
export interface EndotelioRespuestas {
  p1?: number; // Presión Arterial
  p2?: number; // Circulación Periférica
  p3?: number; // Capacidad de Ejercicio
  p4?: number; // Recuperación Cardíaca
  p5?: number; // Mareos Posturales
  p6?: number; // Memoria/Concentración
  p7?: number; // Niebla Mental
  p8?: number; // Dolores de Cabeza
  p9?: number; // Libido
  p10?: number; // Función Sexual Física
  p11?: number; // Niveles de Energía
  p12?: number; // Actividad Física
  p13?: number; // Frutas y Verduras
  p14?: number; // Alimentos Procesados
  p15?: number; // Calidad del Sueño
  p16?: number; // Nivel de Estrés
  p17?: number; // Prácticas de Relajación
  p18?: number; // Estado Emocional
  p19?: number; // Tabaquismo
  p20?: number; // Diabetes/Glucosa
}

export interface EndotelioCategorias {
  cardiovascular: number;
  cognitivo: number;
  sexualEnergia: number;
  estiloVida: number;
  estresEmocional: number;
  factoresRiesgo: number;
}

export interface EndotelioResultado {
  puntuacionTotal: number;
  categorias: EndotelioCategorias;
  nivel: 'OPTIMO' | 'RIESGO' | 'COMPROMETIDO' | 'CRISIS';
  categoriaCritica: string;
  productos: Array<{
    id: string;
    nombre: string;
    prioridad: number;
  }>;
  descuento: number;
  mensaje: string;
  recomendacionConsulta: boolean;
}

export interface EndotelioPregunta {
  id: string;
  categoria: string;
  pregunta: string;
  opciones: Array<{
    valor: number;
    texto: string;
  }>;
}
