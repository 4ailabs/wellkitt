import { EndotelioPregunta, EndotelioRespuestas, EndotelioResultado, EndotelioCategorias } from '../types';

export const endotelioPreguntas: EndotelioPregunta[] = [
  // CATEGORÍA 1: CARDIOVASCULAR (25 puntos)
  {
    id: 'p1',
    categoria: 'cardiovascular',
    pregunta: '¿Cuál es tu presión arterial típica?',
    opciones: [
      { valor: 5, texto: '≤120/80 (Óptima)' },
      { valor: 3, texto: '121-139/81-89 (Normal alta)' },
      { valor: 1, texto: '140-159/90-99 (Leve)' },
      { valor: 0, texto: '≥160/100 (Severa)' }
    ]
  },
  {
    id: 'p2',
    categoria: 'cardiovascular',
    pregunta: '¿Con qué frecuencia tienes manos o pies fríos?',
    opciones: [
      { valor: 5, texto: 'Nunca' },
      { valor: 4, texto: 'Solo en invierno' },
      { valor: 2, texto: 'Frecuentemente' },
      { valor: 0, texto: 'Casi siempre' }
    ]
  },
  {
    id: 'p3',
    categoria: 'cardiovascular',
    pregunta: '¿Cómo te sientes al subir 2 pisos de escaleras?',
    opciones: [
      { valor: 5, texto: 'Sin fatiga' },
      { valor: 3, texto: 'Ligeramente agitado' },
      { valor: 1, texto: 'Muy agitado' },
      { valor: 0, texto: 'No puedo o extremadamente agitado' }
    ]
  },
  {
    id: 'p4',
    categoria: 'cardiovascular',
    pregunta: '¿Cuánto tiempo tardas en recuperar tu ritmo cardíaco normal después del ejercicio?',
    opciones: [
      { valor: 5, texto: 'Menos de 2 minutos' },
      { valor: 3, texto: '2-5 minutos' },
      { valor: 1, texto: '5-10 minutos' },
      { valor: 0, texto: 'Más de 10 minutos' }
    ]
  },
  {
    id: 'p5',
    categoria: 'cardiovascular',
    pregunta: '¿Con qué frecuencia experimentas mareos al levantarte rápidamente?',
    opciones: [
      { valor: 5, texto: 'Nunca' },
      { valor: 3, texto: 'Raramente' },
      { valor: 1, texto: 'Ocasionalmente' },
      { valor: 0, texto: 'Frecuentemente' }
    ]
  },

  // CATEGORÍA 2: COGNITIVO (15 puntos)
  {
    id: 'p6',
    categoria: 'cognitivo',
    pregunta: '¿Cómo comparas tu memoria y concentración con hace 2 años?',
    opciones: [
      { valor: 5, texto: 'Igual o mejor' },
      { valor: 3, texto: 'Ligeramente peor' },
      { valor: 1, texto: 'Notablemente peor' },
      { valor: 0, texto: 'Significativamente peor' }
    ]
  },
  {
    id: 'p7',
    categoria: 'cognitivo',
    pregunta: '¿Con qué frecuencia experimentas "niebla mental"?',
    opciones: [
      { valor: 5, texto: 'Nunca' },
      { valor: 3, texto: 'Raramente' },
      { valor: 1, texto: 'Varias veces por semana' },
      { valor: 0, texto: 'Diariamente' }
    ]
  },
  {
    id: 'p8',
    categoria: 'cognitivo',
    pregunta: '¿Con qué frecuencia tienes dolores de cabeza?',
    opciones: [
      { valor: 5, texto: 'Nunca o muy raramente' },
      { valor: 3, texto: '1-2 veces al mes' },
      { valor: 1, texto: '1-2 veces por semana' },
      { valor: 0, texto: 'Casi diario' }
    ]
  },

  // CATEGORÍA 3: SEXUAL/ENERGÍA (15 puntos)
  {
    id: 'p9',
    categoria: 'sexualEnergia',
    pregunta: '¿Cómo comparas tu libido con hace 2 años?',
    opciones: [
      { valor: 5, texto: 'Igual o mejor' },
      { valor: 3, texto: 'Ligeramente menor' },
      { valor: 1, texto: 'Notablemente menor' },
      { valor: 0, texto: 'Significativamente menor o ausente' }
    ]
  },
  {
    id: 'p10',
    categoria: 'sexualEnergia',
    pregunta: '¿Cómo describirías tu función sexual física?',
    opciones: [
      { valor: 5, texto: 'Todo normal' },
      { valor: 3, texto: 'Cambios leves ocasionales' },
      { valor: 1, texto: 'Cambios moderados frecuentes' },
      { valor: 0, texto: 'Cambios severos o disfunción' }
    ]
  },
  {
    id: 'p11',
    categoria: 'sexualEnergia',
    pregunta: '¿Cómo describirías tus niveles de energía?',
    opciones: [
      { valor: 5, texto: 'Constantes y altos' },
      { valor: 3, texto: 'Buenos con pequeñas bajadas' },
      { valor: 1, texto: 'Variables con bajadas notables' },
      { valor: 0, texto: 'Constantemente bajos o fatigado' }
    ]
  },

  // CATEGORÍA 4: ESTILO DE VIDA (20 puntos)
  {
    id: 'p12',
    categoria: 'estiloVida',
    pregunta: '¿Cuántos días a la semana haces actividad física?',
    opciones: [
      { valor: 5, texto: '5-7 días por semana' },
      { valor: 4, texto: '3-4 días por semana' },
      { valor: 2, texto: '1-2 días por semana' },
      { valor: 0, texto: 'Menos de 1 día por semana' }
    ]
  },
  {
    id: 'p13',
    categoria: 'estiloVida',
    pregunta: '¿Cuántas porciones de frutas y verduras consumes al día?',
    opciones: [
      { valor: 5, texto: '7+ porciones' },
      { valor: 4, texto: '5-6 porciones' },
      { valor: 2, texto: '3-4 porciones' },
      { valor: 0, texto: 'Menos de 3 porciones' }
    ]
  },
  {
    id: 'p14',
    categoria: 'estiloVida',
    pregunta: '¿Con qué frecuencia consumes alimentos procesados?',
    opciones: [
      { valor: 5, texto: 'Nunca o raramente' },
      { valor: 3, texto: '1-2 veces por semana' },
      { valor: 1, texto: '3-5 veces por semana' },
      { valor: 0, texto: 'Diariamente' }
    ]
  },
  {
    id: 'p15',
    categoria: 'estiloVida',
    pregunta: '¿Cómo describirías la calidad de tu sueño?',
    opciones: [
      { valor: 5, texto: 'Excelente (7-9h profundamente)' },
      { valor: 3, texto: 'Buena (ocasionales interrupciones)' },
      { valor: 1, texto: 'Regular (frecuentes interrupciones)' },
      { valor: 0, texto: 'Mala (insomnio o no reparador)' }
    ]
  },

  // CATEGORÍA 5: ESTRÉS/EMOCIONAL (15 puntos)
  {
    id: 'p16',
    categoria: 'estresEmocional',
    pregunta: '¿Cómo describirías tu nivel de estrés actual?',
    opciones: [
      { valor: 5, texto: 'Bajo, bien manejado' },
      { valor: 3, texto: 'Moderado pero controlable' },
      { valor: 1, texto: 'Alto pero manejable' },
      { valor: 0, texto: 'Muy alto, abrumador' }
    ]
  },
  {
    id: 'p17',
    categoria: 'estresEmocional',
    pregunta: '¿Con qué frecuencia practicas técnicas de relajación?',
    opciones: [
      { valor: 5, texto: 'Diariamente' },
      { valor: 3, texto: 'Varias veces por semana' },
      { valor: 1, texto: 'Ocasionalmente' },
      { valor: 0, texto: 'Nunca' }
    ]
  },
  {
    id: 'p18',
    categoria: 'estresEmocional',
    pregunta: '¿Cómo describirías tu estado emocional general?',
    opciones: [
      { valor: 5, texto: 'Muy positivo y estable' },
      { valor: 3, texto: 'Generalmente positivo' },
      { valor: 1, texto: 'Variable, con altibajos' },
      { valor: 0, texto: 'Frecuentemente negativo' }
    ]
  },

  // CATEGORÍA 6: FACTORES DE RIESGO (10 puntos)
  {
    id: 'p19',
    categoria: 'factoresRiesgo',
    pregunta: '¿Cuál es tu situación con el tabaquismo?',
    opciones: [
      { valor: 5, texto: 'Nunca fumé' },
      { valor: 3, texto: 'Ex-fumador por más de 2 años' },
      { valor: 1, texto: 'Ex-fumador por menos de 2 años' },
      { valor: 0, texto: 'Fumador actual' }
    ]
  },
  {
    id: 'p20',
    categoria: 'factoresRiesgo',
    pregunta: '¿Cuál es tu situación con la diabetes/glucosa?',
    opciones: [
      { valor: 5, texto: 'No, glucosa normal' },
      { valor: 2, texto: 'Prediabetes controlada' },
      { valor: 1, texto: 'Diabetes controlada' },
      { valor: 0, texto: 'Diabetes no controlada' }
    ]
  }
];

// Función para calcular puntuaciones por categoría
export function calcularCategoria(respuestas: EndotelioRespuestas, categoria: string): number {
  const preguntasCategoria = endotelioPreguntas.filter(p => p.categoria === categoria);
  let puntuacion = 0;
  
  preguntasCategoria.forEach(pregunta => {
    const respuesta = respuestas[pregunta.id as keyof EndotelioRespuestas];
    if (respuesta !== undefined) {
      puntuacion += respuesta;
    }
  });
  
  return puntuacion;
}

// Función para calcular todas las categorías
export function calcularCategorias(respuestas: EndotelioRespuestas): EndotelioCategorias {
  return {
    cardiovascular: calcularCategoria(respuestas, 'cardiovascular'),
    cognitivo: calcularCategoria(respuestas, 'cognitivo'),
    sexualEnergia: calcularCategoria(respuestas, 'sexualEnergia'),
    estiloVida: calcularCategoria(respuestas, 'estiloVida'),
    estresEmocional: calcularCategoria(respuestas, 'estresEmocional'),
    factoresRiesgo: calcularCategoria(respuestas, 'factoresRiesgo')
  };
}

// Función para determinar nivel de riesgo
export function determinarNivelRiesgo(puntuacion: number): 'OPTIMO' | 'RIESGO' | 'COMPROMETIDO' | 'CRISIS' {
  if (puntuacion >= 81) return 'OPTIMO';
  if (puntuacion >= 61) return 'RIESGO';
  if (puntuacion >= 41) return 'COMPROMETIDO';
  return 'CRISIS';
}

// Función para identificar categoría crítica
export function identificarCategoriaCritica(categorias: EndotelioCategorias): string {
  const porcentajes = {
    cardiovascular: (categorias.cardiovascular / 25) * 100,
    cognitivo: (categorias.cognitivo / 15) * 100,
    sexualEnergia: (categorias.sexualEnergia / 15) * 100,
    estiloVida: (categorias.estiloVida / 20) * 100,
    estresEmocional: (categorias.estresEmocional / 15) * 100,
    factoresRiesgo: (categorias.factoresRiesgo / 10) * 100
  };
  
  return Object.keys(porcentajes).reduce((a, b) => 
    porcentajes[a as keyof typeof porcentajes] < porcentajes[b as keyof typeof porcentajes] ? a : b
  );
}

// Función principal de evaluación
export function evaluarEndotelio(respuestas: EndotelioRespuestas): EndotelioResultado {
  const categorias = calcularCategorias(respuestas);
  const puntuacionTotal = Object.values(categorias).reduce((sum, val) => sum + val, 0);
  const nivel = determinarNivelRiesgo(puntuacionTotal);
  const categoriaCritica = identificarCategoriaCritica(categorias);
  
  // Productos recomendados según el algoritmo
  const productos = generarProductosRecomendados(nivel, categoriaCritica, categorias);
  
  return {
    puntuacionTotal,
    categorias,
    nivel,
    categoriaCritica,
    productos,
    descuento: getDescuento(nivel),
    mensaje: getMensaje(nivel, categoriaCritica),
    recomendacionConsulta: nivel === 'CRISIS'
  };
}

// Función para generar productos recomendados
function generarProductosRecomendados(nivel: string, categoriaCritica: string, categorias: EndotelioCategorias) {
  const productos: Array<{id: string, nombre: string, prioridad: number}> = [];
  
  // Productos base según nivel
  const productosBase = getProductosBase(nivel);
  productos.push(...productosBase);
  
  // Productos específicos según categoría crítica
  const productosCategoria = getProductosCategoria(categoriaCritica, nivel);
  productos.push(...productosCategoria);
  
  // Eliminar duplicados y priorizar
  return priorizarProductos(productos);
}

function getProductosBase(nivel: string) {
  const productosBase: {[key: string]: Array<{id: string, nombre: string, prioridad: number}>} = {
    'OPTIMO': [
      { id: 'SN19', nombre: 'Resverasor', prioridad: 1 },
      { id: 'SN02', nombre: 'Coenzima Q10', prioridad: 2 }
    ],
    'RIESGO': [
      { id: 'SN19', nombre: 'Resverasor', prioridad: 1 },
      { id: 'SN02', nombre: 'Coenzima Q10', prioridad: 2 },
      { id: 'BF17', nombre: 'Cúrcuma', prioridad: 3 }
    ],
    'COMPROMETIDO': [
      { id: 'SN19', nombre: 'Resverasor', prioridad: 1 },
      { id: 'SN02', nombre: 'Coenzima Q10', prioridad: 2 },
      { id: 'BF17', nombre: 'Cúrcuma', prioridad: 3 }
    ],
    'CRISIS': [
      { id: 'SN19', nombre: 'Resverasor', prioridad: 1 },
      { id: 'SN02', nombre: 'Coenzima Q10', prioridad: 1 },
      { id: 'BF17', nombre: 'Cúrcuma', prioridad: 2 },
      { id: 'SN22', nombre: 'Totalvid 4', prioridad: 3 }
    ]
  };
  
  return productosBase[nivel] || [];
}

function getProductosCategoria(categoria: string, nivel: string) {
  const productosCategoria: {[key: string]: Array<{id: string, nombre: string, prioridad: number}>} = {
    'cardiovascular': [
      { id: 'BF09', nombre: 'Zapote Blanco', prioridad: 1 },
      { id: 'SN02', nombre: 'Coenzima Q10', prioridad: 2 }
    ],
    'cognitivo': [
      { id: 'SN09', nombre: 'Fosfoserina Complex', prioridad: 1 },
      { id: 'SN02', nombre: 'Coenzima Q10', prioridad: 2 }
    ],
    'sexualEnergia': [
      { id: 'BF10', nombre: 'Maca Peruana', prioridad: 1 },
      { id: 'SN21', nombre: 'Carnilis', prioridad: 2 }
    ],
    'estresEmocional': [
      { id: 'BF07', nombre: 'Ner-vit', prioridad: 1 },
      { id: 'BF08', nombre: 'Valeriana', prioridad: 2 }
    ],
    'estiloVida': [
      { id: 'SN22', nombre: 'Totalvid 4', prioridad: 1 },
      { id: 'BF11', nombre: 'Alga Espirulina', prioridad: 2 }
    ],
    'factoresRiesgo': [
      { id: 'SN19', nombre: 'Resverasor', prioridad: 1 },
      { id: 'BF17', nombre: 'Cúrcuma', prioridad: 2 },
      { id: 'BF01', nombre: 'Hepacryl', prioridad: 3 }
    ]
  };
  
  return productosCategoria[categoria] || [];
}

function priorizarProductos(productos: Array<{id: string, nombre: string, prioridad: number}>) {
  // Eliminar duplicados manteniendo la prioridad más alta
  const productosUnicos = new Map();
  productos.forEach(producto => {
    if (!productosUnicos.has(producto.id) || productosUnicos.get(producto.id).prioridad > producto.prioridad) {
      productosUnicos.set(producto.id, producto);
    }
  });
  
  // Ordenar por prioridad
  return Array.from(productosUnicos.values()).sort((a, b) => a.prioridad - b.prioridad);
}

function getDescuento(nivel: string): number {
  const descuentos: {[key: string]: number} = {
    'OPTIMO': 10,
    'RIESGO': 15,
    'COMPROMETIDO': 20,
    'CRISIS': 25
  };
  
  return descuentos[nivel] || 0;
}

function getMensaje(nivel: string, categoriaCritica: string): string {
  const mensajes: {[key: string]: string} = {
    'OPTIMO': '¡Felicitaciones! Tu endotelio está en excelente estado. Mantén tu rutina actual.',
    'RIESGO': 'Tu endotelio necesita apoyo nutricional específico para prevenir deterioro.',
    'COMPROMETIDO': 'Tu endotelio muestra signos de disfunción que requieren intervención activa.',
    'CRISIS': 'Tu endotelio necesita atención urgente. Te recomendamos consulta con especialista.'
  };
  
  return mensajes[nivel] || '';
} 