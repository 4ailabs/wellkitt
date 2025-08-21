import { NutrigenomicaPregunta, NutrigenomicaRespuestas, NutrigenomicaResultado, NutrigenomicaCategorias } from '../types';

export const nutrigenomicaPreguntas: NutrigenomicaPregunta[] = [
  // CATEGORIA: Necesidad de BRÓCOLI/SULFORAFANO (Detoxificación)
  {
    id: "ng1",
    categoria: "detoxificacion",
    pregunta: "¿Qué tan frecuentemente experimentas fatiga o sensación de 'toxicidad' después de comidas procesadas?",
    opciones: [
      { valor: 1, texto: "Muy frecuentemente" },
      { valor: 2, texto: "Frecuentemente" },
      { valor: 3, texto: "Ocasionalmente" },
      { valor: 4, texto: "Raramente o nunca" }
    ]
  },
  {
    id: "ng2",
    categoria: "detoxificacion",
    pregunta: "¿Con qué frecuencia tienes problemas de piel (acné, opacidad, irritación)?",
    opciones: [
      { valor: 1, texto: "Constantemente" },
      { valor: 2, texto: "Frecuentemente" },
      { valor: 3, texto: "Ocasionalmente" },
      { valor: 4, texto: "Raramente o nunca" }
    ]
  },
  {
    id: "ng3",
    categoria: "detoxificacion",
    pregunta: "¿Qué tan sensible eres a olores químicos, perfumes o humo?",
    opciones: [
      { valor: 1, texto: "Muy sensible, me afectan mucho" },
      { valor: 2, texto: "Moderadamente sensible" },
      { valor: 3, texto: "Algo sensible" },
      { valor: 4, texto: "No me afectan" }
    ]
  },

  // CATEGORIA: Necesidad de COENZIMA Q10/B-VITAMINAS (Energía Celular)
  {
    id: "ng4",
    categoria: "metabolismo",
    pregunta: "¿Qué tan frecuentemente experimentas fatiga sin razón aparente?",
    opciones: [
      { valor: 1, texto: "Diariamente o casi todos los días" },
      { valor: 2, texto: "Varias veces por semana" },
      { valor: 3, texto: "Ocasionalmente" },
      { valor: 4, texto: "Raramente" }
    ]
  },
  {
    id: "ng5",
    categoria: "metabolismo",
    pregunta: "¿Tienes dificultades para mantener energía estable durante el día?",
    opciones: [
      { valor: 1, texto: "Sí, tengo altibajos constantes de energía" },
      { valor: 2, texto: "Frecuentemente tengo bajones de energía" },
      { valor: 3, texto: "Ocasionalmente me siento sin energía" },
      { valor: 4, texto: "Mantengo energía estable todo el día" }
    ]
  },
  {
    id: "ng6",
    categoria: "metabolismo",
    pregunta: "¿Sientes que necesitas estimulantes (cafeína, azúcar) para funcionar?",
    opciones: [
      { valor: 1, texto: "Sí, dependo mucho de estimulantes" },
      { valor: 2, texto: "Frecuentemente necesito estimulantes" },
      { valor: 3, texto: "Ocasionalmente uso estimulantes" },
      { valor: 4, texto: "Raramente necesito estimulantes" }
    ]
  },

  // CATEGORIA: Necesidad de OMEGA-3/SALMÓN (Antiinflamatorio)
  {
    id: "ng7",
    categoria: "inflamacion",
    pregunta: "¿Experimentas dolores articulares, rigidez o inflamación?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente tengo dolores articulares" },
      { valor: 2, texto: "Ocasionalmente tengo rigidez o dolores" },
      { valor: 3, texto: "Raramente tengo molestias articulares" },
      { valor: 4, texto: "No tengo problemas articulares" }
    ]
  },
  {
    id: "ng8",
    categoria: "inflamacion",
    pregunta: "¿Tienes problemas de concentración o niebla mental?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente me cuesta concentrarme" },
      { valor: 2, texto: "A veces tengo dificultades de concentración" },
      { valor: 3, texto: "Ocasionalmente tengo niebla mental" },
      { valor: 4, texto: "Mi concentración es buena" }
    ]
  },
  {
    id: "ng9",
    categoria: "inflamacion",
    pregunta: "¿Sufres de cambios de humor o irritabilidad frecuente?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente tengo cambios de humor" },
      { valor: 2, texto: "A veces me siento irritable sin razón" },
      { valor: 3, texto: "Ocasionalmente tengo cambios de humor" },
      { valor: 4, texto: "Mi estado de ánimo es estable" }
    ]
  },

  // CATEGORIA: Necesidad de CROMO/CANELA (Control Glucémico)
  {
    id: "ng10",
    categoria: "procesados",
    pregunta: "¿Tienes antojos frecuentes de azúcar o carbohidratos?",
    opciones: [
      { valor: 1, texto: "Sí, constantemente tengo antojos de dulce" },
      { valor: 2, texto: "Frecuentemente tengo antojos" },
      { valor: 3, texto: "Ocasionalmente tengo antojos" },
      { valor: 4, texto: "Raramente tengo antojos de azúcar" }
    ]
  },
  {
    id: "ng11",
    categoria: "procesados",
    pregunta: "¿Experimentas picos y caídas de energía después de comer?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente tengo picos y caídas" },
      { valor: 2, texto: "A veces tengo fluctuaciones de energía" },
      { valor: 3, texto: "Ocasionalmente siento estos cambios" },
      { valor: 4, texto: "Mi energía se mantiene estable" }
    ]
  },
  {
    id: "ng12",
    categoria: "procesados",
    pregunta: "¿Sientes somnolencia o fatiga después de las comidas?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente me da sueño después de comer" },
      { valor: 2, texto: "A veces me siento cansado post-comida" },
      { valor: 3, texto: "Ocasionalmente tengo somnolencia" },
      { valor: 4, texto: "Me mantengo alerta después de comer" }
    ]
  },

  // CATEGORIA: Necesidad de PROBIÓTICOS/FIBRA (Salud Digestiva)
  {
    id: "ng13",
    categoria: "microbiota",
    pregunta: "¿Tienes problemas digestivos como hinchazón, gases o estreñimiento?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente tengo problemas digestivos" },
      { valor: 2, texto: "A veces tengo molestias digestivas" },
      { valor: 3, texto: "Ocasionalmente tengo problemas digestivos" },
      { valor: 4, texto: "Mi digestión es buena" }
    ]
  },
  {
    id: "ng14",
    categoria: "microbiota",
    pregunta: "¿Qué tan regulares son tus evacuaciones intestinales?",
    opciones: [
      { valor: 1, texto: "Muy irregulares o problemáticas" },
      { valor: 2, texto: "Algo irregulares, 2-3 veces por semana" },
      { valor: 3, texto: "Regulares, cada 1-2 días" },
      { valor: 4, texto: "Muy regulares, una vez al día" }
    ]
  },
  {
    id: "ng15",
    categoria: "microbiota",
    pregunta: "¿Has tomado antibióticos recientemente o con frecuencia?",
    opciones: [
      { valor: 1, texto: "Sí, he tomado antibióticos recientemente o frecuentemente" },
      { valor: 2, texto: "He tomado algunos antibióticos en el último año" },
      { valor: 3, texto: "Ocasionalmente tomo antibióticos" },
      { valor: 4, texto: "Raramente tomo antibióticos" }
    ]
  },

  // CATEGORIA: Necesidad de ENZIMAS DIGESTIVAS/JENGIBRE
  {
    id: "ng16",
    categoria: "sensibilidades",
    pregunta: "¿Tienes molestias después de comer lácteos?",
    opciones: [
      { valor: 1, texto: "Sí, los lácteos me causan molestias significativas" },
      { valor: 2, texto: "A veces me causan gases o hinchazón" },
      { valor: 3, texto: "Los tolero con moderación" },
      { valor: 4, texto: "Los tolero perfectamente" }
    ]
  },
  {
    id: "ng17",
    categoria: "sensibilidades",
    pregunta: "¿Experimentas hinchazón o fatiga después de comer gluten?",
    opciones: [
      { valor: 1, texto: "Sí, el gluten me afecta negativamente" },
      { valor: 2, texto: "A veces me genera hinchazón o fatiga" },
      { valor: 3, texto: "Prefiero moderación pero lo tolero" },
      { valor: 4, texto: "No tengo problemas con el gluten" }
    ]
  },
  {
    id: "ng18",
    categoria: "sensibilidades",
    pregunta: "¿Sientes pesadez o digestión lenta después de comidas grandes?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente siento digestión pesada" },
      { valor: 2, texto: "A veces tengo digestión lenta" },
      { valor: 3, texto: "Ocasionalmente siento pesadez" },
      { valor: 4, texto: "Mi digestión es eficiente" }
    ]
  },

  // CATEGORIA: Necesidad de MELATONINA/MAGNESIO (Ritmo Circadiano)
  {
    id: "ng19",
    categoria: "circadiano",
    pregunta: "¿Tienes dificultades para conciliar el sueño?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente me cuesta dormirme" },
      { valor: 2, texto: "A veces tengo dificultades para dormir" },
      { valor: 3, texto: "Ocasionalmente tengo problemas de sueño" },
      { valor: 4, texto: "Generalmente duermo bien" }
    ]
  },
  {
    id: "ng20",
    categoria: "circadiano",
    pregunta: "¿Te despiertas frecuentemente durante la noche?",
    opciones: [
      { valor: 1, texto: "Sí, frecuentemente me despierto durante la noche" },
      { valor: 2, texto: "A veces tengo sueño interrumpido" },
      { valor: 3, texto: "Ocasionalmente me despierto" },
      { valor: 4, texto: "Duermo profundamente toda la noche" }
    ]
  }
];

// Función para evaluar el test de nutrigenómica
export const evaluarNutrigenomica = (respuestas: NutrigenomicaRespuestas): NutrigenomicaResultado => {
  // Calcular puntuaciones por categoría
  const categorias: NutrigenomicaCategorias = {
    detoxificacion: 0,
    metabolismo: 0,
    inflamacion: 0,
    procesados: 0,
    microbiota: 0,
    sensibilidades: 0,
    circadiano: 0
  };

  // Mapeo de preguntas a categorías
  const preguntasCategorias = {
    detoxificacion: ['ng1', 'ng2', 'ng3'],
    metabolismo: ['ng4', 'ng5', 'ng6'],
    inflamacion: ['ng7', 'ng8', 'ng9'],
    procesados: ['ng10', 'ng11', 'ng12'],
    microbiota: ['ng13', 'ng14', 'ng15'],
    sensibilidades: ['ng16', 'ng17', 'ng18'],
    circadiano: ['ng19', 'ng20']
  };

  // Calcular puntuación por categoría (optimizado)
  for (const [categoria, preguntas] of Object.entries(preguntasCategorias)) {
    let suma = 0;
    for (const preguntaId of preguntas) {
      suma += respuestas[preguntaId] || 0;
    }
    categorias[categoria as keyof NutrigenomicaCategorias] = (suma / preguntas.length) * 25; // Escala a 100
  }

  // Puntuación total
  const puntuacionTotal = Object.values(categorias).reduce((acc, val) => acc + val, 0) / 7;

  // Determinar perfil nutrigenómico
  let perfil: 'OPTIMIZADOR' | 'EQUILIBRADO' | 'SENSIBLE' | 'REACTIVO';
  
  if (puntuacionTotal >= 85) {
    perfil = 'OPTIMIZADOR';
  } else if (puntuacionTotal >= 70) {
    perfil = 'EQUILIBRADO';
  } else if (puntuacionTotal >= 55) {
    perfil = 'SENSIBLE';
  } else {
    perfil = 'REACTIVO';
  }

  // Encontrar categoría más baja (área de oportunidad)
  const areaOportunidad = Object.entries(categorias).reduce((min, [key, value]) => 
    value < min.value ? { key, value } : min, 
    { key: 'detoxificacion', value: 100 }
  ).key;

  // Mensajes por perfil
  const mensajes = {
    OPTIMIZADOR: "¡Excelente! Tus genes responden muy bien a los nutrientes. Tienes una alta capacidad para procesar antioxidantes, manejar la inflamación y mantener un metabolismo eficiente.",
    EQUILIBRADO: "Muy bien. Tienes un perfil genético balanceado que responde positivamente a la mayoría de alimentos saludables. Algunas áreas pueden beneficiarse de optimización.",
    SENSIBLE: "Tu perfil indica algunas sensibilidades que vale la pena considerar. Ciertos alimentos pueden activar mejor tus genes protectores que otros.",
    REACTIVO: "Tu perfil sugiere mayor sensibilidad a ciertos alimentos. Un enfoque personalizado puede ayudarte a activar mejor tus genes de protección y bienestar."
  };

  // Recomendaciones específicas por perfil - siempre mostrar consulta
  const recomendacionesConsulta = true;

  // Productos recomendados basados en las categorías más bajas
  const productosRecomendados = generarProductosNutrigenomicos(categorias, areaOportunidad);

  // Descuento basado en el perfil
  const descuento = {
    OPTIMIZADOR: 10,
    EQUILIBRADO: 15,
    SENSIBLE: 20,
    REACTIVO: 25
  }[perfil];

  return {
    puntuacionTotal: Math.round(puntuacionTotal),
    categorias,
    perfil,
    areaOportunidad,
    productos: productosRecomendados,
    descuento,
    mensaje: mensajes[perfil],
    recomendacionConsulta: recomendacionesConsulta
  };
};

// Función para generar productos recomendados basados en el perfil nutrigenómico
const generarProductosNutrigenomicos = (categorias: NutrigenomicaCategorias, areaOportunidad: string) => {
  // Mapeo de áreas a productos específicos según necesidades nutricionales
  const mapaProductos: Record<string, Array<{id: string, nombre: string, prioridad: number}>> = {
    detoxificacion: [
      // Para toxicidad, problemas de piel, sensibilidad química = necesita BRÓCOLI/SULFORAFANO
      { id: "SN15", nombre: "Minesor con Selenio", prioridad: 1 }, // Selenio para detox
      { id: "SN18", nombre: "Oligosor", prioridad: 2 }, // Minerales detox
      { id: "BF01", nombre: "Hepacryl", prioridad: 3 }, // Hígado detox
      { id: "BF02", nombre: "Diente de León", prioridad: 4 }, // Detox diurético
      { id: "BF03", nombre: "Cola de Caballo", prioridad: 5 } // Silicio detox
    ],
    metabolismo: [
      // Para fatiga, dependencia de estimulantes = necesita COENZIMA Q10/B-VITAMINAS
      { id: "SN02", nombre: "Coenzima Q10", prioridad: 1 }, // Energía celular
      { id: "SN21", nombre: "Carnilis", prioridad: 2 }, // L-Carnitina para energía
      { id: "SN11", nombre: "Fostprint MAX", prioridad: 3 }, // Complejo energético
      { id: "SN10", nombre: "Fostprint Classic", prioridad: 4 }, // Energía base
      { id: "BF10", nombre: "Maca Peruana", prioridad: 5 }, // Adaptógeno energético
      { id: "BF11", nombre: "Alga Espirulina", prioridad: 6 } // Proteínas y energía
    ],
    inflamacion: [
      // Para dolores articulares, niebla mental, cambios de humor = necesita OMEGA-3/SALMÓN
      { id: "SN19", nombre: "Resverasor", prioridad: 1 }, // Antiinflamatorio
      { id: "BF17", nombre: "Cúrcuma", prioridad: 2 }, // Antiinflamatorio natural
      { id: "BF15", nombre: "Uña de Gato", prioridad: 3 }, // Antiinflamatorio
      { id: "BF16", nombre: "Harpagofito", prioridad: 4 }, // Articulaciones
      { id: "SN14", nombre: "Mincartil polvo", prioridad: 5 } // Cartílago y articulaciones
    ],
    procesados: [
      // Para antojos de azúcar, picos de energía, somnolencia = necesita CROMO/CANELA
      { id: "SN09", nombre: "Fosfoserina Complex", prioridad: 1 }, // Control glucémico cerebral
      { id: "BF22", nombre: "Fat-less", prioridad: 2 }, // Metabolismo y control
      { id: "SN21", nombre: "Carnilis", prioridad: 3 }, // Metabolismo energético
      { id: "BF23", nombre: "Té Verde", prioridad: 4 }, // Antioxidante metabolismo
      { id: "SN08", nombre: "Diatonato 5.2", prioridad: 5 } // Regulación endocrina
    ],
    microbiota: [
      // Para problemas digestivos, irregularidad, antibióticos = necesita PROBIÓTICOS/FIBRA
      { id: "SN12", nombre: "Inulac Tablets", prioridad: 1 }, // Prebióticos y enzimas
      { id: "SN13", nombre: "Lacticol suspensión", prioridad: 2 }, // Probióticos
      { id: "BF04", nombre: "Colix", prioridad: 3 }, // Digestivo
      { id: "BF05", nombre: "Jengibre", prioridad: 4 }, // Enzimas digestivas
      { id: "SN05", nombre: "Diatonato 2", prioridad: 5 } // Sistema inmuno-metabólico
    ],
    sensibilidades: [
      // Para intolerancias, digestión pesada = necesita ENZIMAS DIGESTIVAS/JENGIBRE
      { id: "BF05", nombre: "Jengibre", prioridad: 1 }, // Digestivo y enzimas
      { id: "BF04", nombre: "Colix", prioridad: 2 }, // Antiespasmódico digestivo
      { id: "BF06", nombre: "Melissa", prioridad: 3 }, // Digestivo suave
      { id: "SN04", nombre: "Diatonato 1", prioridad: 4 }, // Sistema respiratorio/alergias
      { id: "BF24", nombre: "Ojo de Gallina", prioridad: 5 } // Antihistamínico
    ],
    circadiano: [
      // Para problemas de sueño, despertares = necesita MELATONINA/MAGNESIO
      { id: "SN20", nombre: "Analis L-Triptófano", prioridad: 1 }, // Precursor melatonina
      { id: "BF08", nombre: "Valeriana", prioridad: 2 }, // Sueño natural
      { id: "BF07", nombre: "Ner-vit", prioridad: 3 }, // Complejo relajante
      { id: "BF09", nombre: "Zapote Blanco", prioridad: 4 }, // Presión y sueño
      { id: "SN06", nombre: "Diatonato 3", prioridad: 5 }, // Fatiga y ansiedad
      { id: "SN16", nombre: "Oligonato 1", prioridad: 6 } // Funciones neuromusculares
    ]
  };

  // Obtener productos para el área de oportunidad principal
  const productosBase = mapaProductos[areaOportunidad] || [];
  
  // Agregar productos adicionales basados en otras categorías bajas
  const categoriasOrdenadas = Object.entries(categorias)
    .sort(([,a], [,b]) => a - b)
    .slice(0, 2); // Solo top 2 categorías más bajas para rapidez

  const productosAdicionales: Array<{id: string, nombre: string, prioridad: number}> = [];
  
  categoriasOrdenadas.forEach(([categoria, puntuacion], index) => {
    if (categoria !== areaOportunidad && puntuacion < 70) {
      const productos = mapaProductos[categoria]?.slice(0, 1) || []; // Solo 1 producto adicional
      productos.forEach(producto => {
        if (!productosBase.find(p => p.id === producto.id) && 
            !productosAdicionales.find(p => p.id === producto.id)) {
          productosAdicionales.push({
            ...producto,
            prioridad: producto.prioridad + (index + 1) * 10
          });
        }
      });
    }
  });

  return [...productosBase.slice(0, 3), ...productosAdicionales]
    .sort((a, b) => a.prioridad - b.prioridad)
    .slice(0, 4); // Máximo 4 productos para rapidez
};