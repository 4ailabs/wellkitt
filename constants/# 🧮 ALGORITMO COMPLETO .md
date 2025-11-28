# 🧮 ALGORITMO COMPLETO - TEST ENDOTELIO WELLKITT

## 📊 SISTEMA DE PUNTUACIÓN

### **Puntuación Total: 0-100 puntos**
- **Cardiovascular:** 25 puntos máximo
- **Cognitivo:** 15 puntos máximo  
- **Sexual/Energía:** 15 puntos máximo
- **Estilo de Vida:** 20 puntos máximo
- **Estrés/Emocional:** 15 puntos máximo
- **Factores de Riesgo:** 10 puntos máximo

---

## 🩸 CATEGORÍA 1: CARDIOVASCULAR (25 puntos)

### **P1: Presión Arterial**
```javascript
const presionArterial = {
  "optima": 5,        // ≤120/80
  "normal_alta": 3,   // 121-139/81-89
  "leve": 1,          // 140-159/90-99
  "severa": 0,        // ≥160/100
  "no_se": 0
}
```

### **P2: Circulación Periférica**
```javascript
const circulacionPeriferica = {
  "nunca": 5,         // Nunca manos/pies fríos
  "ocasional": 4,     // Solo invierno
  "frecuente": 2,     // Frecuentemente
  "siempre": 0        // Casi siempre
}
```

### **P3: Capacidad de Ejercicio**
```javascript
const capacidadEjercicio = {
  "normal": 5,        // Sin fatiga subir 2 pisos
  "leve": 3,          // Ligeramente agitado
  "mucho": 1,         // Muy agitado
  "extremo": 0        // No puede o extremadamente agitado
}
```

### **P4: Recuperación Cardíaca**
```javascript
const recuperacionCardiaca = {
  "rapida": 5,        // <2 minutos
  "normal": 3,        // 2-5 minutos
  "lenta": 1,         // 5-10 minutos
  "muy_lenta": 0      // >10 minutos
}
```

### **P5: Mareos Posturales**
```javascript
const mareosPosturales = {
  "nunca": 5,         // Nunca
  "raro": 3,          // Raramente
  "ocasional": 1,     // Ocasionalmente
  "frecuente": 0      // Frecuentemente
}
```

---

## 🧠 CATEGORÍA 2: COGNITIVO (15 puntos)

### **P6: Memoria/Concentración**
```javascript
const memoriaConcentracion = {
  "mejor_igual": 5,   // Igual o mejor que hace 2 años
  "poco_peor": 3,     // Ligeramente peor
  "notable": 1,       // Notablemente peor
  "mucho_peor": 0     // Significativamente peor
}
```

### **P7: Niebla Mental**
```javascript
const nieblaMental = {
  "nunca": 5,         // Nunca
  "raro": 3,          // Raramente
  "semanal": 1,       // Varias veces por semana
  "diario": 0         // Diariamente
}
```

### **P8: Dolores de Cabeza**
```javascript
const doloresCabeza = {
  "nunca": 5,         // Nunca o muy raramente
  "mensual": 3,       // 1-2 veces/mes
  "semanal": 1,       // 1-2 veces/semana
  "diario": 0         // Casi diario
}
```

---

## 💪 CATEGORÍA 3: SEXUAL/ENERGÍA (15 puntos)

### **P9: Libido**
```javascript
const libido = {
  "mejor_igual": 5,   // Igual o mejor que hace 2 años
  "poco_menor": 3,    // Ligeramente menor
  "notable": 1,       // Notablemente menor
  "ausente": 0        // Significativamente menor o ausente
}
```

### **P10: Función Sexual Física**
```javascript
const funcionSexual = {
  "normal": 5,        // Todo normal
  "leves": 3,         // Cambios leves ocasionales
  "moderados": 1,     // Cambios moderados frecuentes
  "severos": 0        // Cambios severos o disfunción
}
```

### **P11: Niveles de Energía**
```javascript
const nivelesEnergia = {
  "altos": 5,         // Constantes y altos
  "buenos": 3,        // Buenos con pequeñas bajadas
  "variables": 1,     // Variables con bajadas notables
  "bajos": 0          // Constantemente bajos o fatigado
}
```

---

## 🍎 CATEGORÍA 4: ESTILO DE VIDA (20 puntos)

### **P12: Actividad Física**
```javascript
const actividadFisica = {
  "optima": 5,        // 5-7 días/semana
  "buena": 4,         // 3-4 días/semana
  "poca": 2,          // 1-2 días/semana
  "sedentario": 0     // <1 día/semana
}
```

### **P13: Frutas y Verduras**
```javascript
const frutasVerduras = {
  "optima": 5,        // 7+ porciones/día
  "buena": 4,         // 5-6 porciones/día
  "regular": 2,       // 3-4 porciones/día
  "poca": 0           // <3 porciones/día
}
```

### **P14: Alimentos Procesados**
```javascript
const procesados = {
  "nunca": 5,         // Nunca o raramente
  "poco": 3,          // 1-2 veces/semana
  "moderado": 1,      // 3-5 veces/semana
  "mucho": 0          // Diariamente
}
```

### **P15: Calidad del Sueño**
```javascript
const calidadSueno = {
  "excelente": 5,     // 7-9h profundamente
  "buena": 3,         // Ocasionales interrupciones
  "regular": 1,       // Frecuentes interrupciones
  "mala": 0           // Insomnio o no reparador
}
```

---

## 😰 CATEGORÍA 5: ESTRÉS/EMOCIONAL (15 puntos)

### **P16: Nivel de Estrés**
```javascript
const nivelEstres = {
  "bajo": 5,          // Bajo, bien manejado
  "moderado": 3,      // Moderado pero controlable
  "alto": 1,          // Alto pero manejable
  "abrumador": 0      // Muy alto, abrumador
}
```

### **P17: Prácticas de Relajación**
```javascript
const practicasRelajacion = {
  "diario": 5,        // Diariamente
  "frecuente": 3,     // Varias veces/semana
  "ocasional": 1,     // Ocasionalmente
  "nunca": 0          // Nunca
}
```

### **P18: Estado Emocional**
```javascript
const estadoEmocional = {
  "muy_positivo": 5,  // Muy positivo y estable
  "positivo": 3,      // Generalmente positivo
  "variable": 1,      // Variable, altibajos
  "negativo": 0       // Frecuentemente negativo
}
```

---

## 🚬 CATEGORÍA 6: FACTORES DE RIESGO (10 puntos)

### **P19: Tabaquismo**
```javascript
const tabaquismo = {
  "nunca": 5,         // Nunca fumó
  "ex_largo": 3,      // Ex-fumador >2 años
  "ex_corto": 1,      // Ex-fumador <2 años
  "actual": 0         // Fumador actual
}
```

### **P20: Diabetes/Glucosa**
```javascript
const diabetes = {
  "normal": 5,        // No, glucosa normal
  "prediabetes": 2,   // Prediabetes controlada
  "controlada": 1,    // Diabetes controlada
  "no_controlada": 0  // Diabetes no controlada
}
```

---

## 🧮 ALGORITMO DE CÁLCULO

### **Función Principal de Evaluación:**
```javascript
function evaluarEndotelio(respuestas) {
  // Calcular puntuación por categoría
  const cardiovascular = calcularCardiovascular(respuestas);
  const cognitivo = calcularCognitivo(respuestas);
  const sexualEnergia = calcularSexualEnergia(respuestas);
  const estiloVida = calcularEstiloVida(respuestas);
  const estresEmocional = calcularEstresEmocional(respuestas);
  const factoresRiesgo = calcularFactoresRiesgo(respuestas);
  
  // Puntuación total
  const total = cardiovascular + cognitivo + sexualEnergia + 
                estiloVida + estresEmocional + factoresRiesgo;
  
  // Identificar categoría más débil
  const categorias = {
    cardiovascular: cardiovascular,
    cognitivo: cognitivo,
    sexualEnergia: sexualEnergia,
    estiloVida: estiloVida,
    estresEmocional: estresEmocional,
    factoresRiesgo: factoresRiesgo
  };
  
  const categoriaCritica = identificarCategoriaCritica(categorias);
  
  return {
    puntuacionTotal: total,
    categorias: categorias,
    categoriaCritica: categoriaCritica,
    nivelRiesgo: determinarNivelRiesgo(total),
    recomendaciones: generarRecomendaciones(total, categoriaCritica, categorias)
  };
}
```

### **Función de Nivel de Riesgo:**
```javascript
function determinarNivelRiesgo(puntuacion) {
  if (puntuacion >= 81) return "OPTIMO";
  if (puntuacion >= 61) return "RIESGO";
  if (puntuacion >= 41) return "COMPROMETIDO";
  return "CRISIS";
}
```

### **Función de Categoría Crítica:**
```javascript
function identificarCategoriaCritica(categorias) {
  // Convertir a porcentajes de la puntuación máxima
  const porcentajes = {
    cardiovascular: (categorias.cardiovascular / 25) * 100,
    cognitivo: (categorias.cognitivo / 15) * 100,
    sexualEnergia: (categorias.sexualEnergia / 15) * 100,
    estiloVida: (categorias.estiloVida / 20) * 100,
    estresEmocional: (categorias.estresEmocional / 15) * 100,
    factoresRiesgo: (categorias.factoresRiesgo / 10) * 100
  };
  
  // Encontrar la categoría con menor porcentaje
  return Object.keys(porcentajes).reduce((a, b) => 
    porcentajes[a] < porcentajes[b] ? a : b
  );
}
```

---

## 🎯 ALGORITMO DE RECOMENDACIONES

### **Función Principal de Recomendaciones:**
```javascript
function generarRecomendaciones(total, categoriaCritica, categorias) {
  const nivel = determinarNivelRiesgo(total);
  let productos = [];
  
  // Productos base según nivel
  productos = productos.concat(getProductosBase(nivel));
  
  // Productos específicos según categoría crítica
  productos = productos.concat(getProductosCategoria(categoriaCritica, nivel));
  
  // Productos de apoyo según otras categorías débiles
  productos = productos.concat(getProductosApoyo(categorias, nivel));
  
  // Eliminar duplicados y priorizar
  productos = priorizarProductos(productos);
  
  return {
    nivel: nivel,
    categoriaCritica: categoriaCritica,
    productos: productos,
    kit: generarKit(nivel, productos),
    descuento: getDescuento(nivel),
    mensaje: getMensaje(nivel, categoriaCritica)
  };
}
```

### **Productos Base por Nivel:**
```javascript
function getProductosBase(nivel) {
  const productosBase = {
    "OPTIMO": [
      { id: "OMEGA3", prioridad: 1 },
      { id: "SN19", prioridad: 2 }, // Resverasor
      { id: "SN02", prioridad: 3 }  // CoQ10
    ],
    "RIESGO": [
      { id: "AA003", prioridad: 1 }, // L-Arginina
      { id: "OMEGA3", prioridad: 1 },
      { id: "SN02", prioridad: 2 },  // CoQ10
      { id: "BF17", prioridad: 3 }   // Cúrcuma
    ],
    "COMPROMETIDO": [
      { id: "AA003", prioridad: 1 }, // L-Arginina
      { id: "OMEGA3", prioridad: 1 },
      { id: "SN19", prioridad: 2 },  // Resverasor
      { id: "SN02", prioridad: 2 },  // CoQ10
      { id: "CARZILASA", prioridad: 3 },
      { id: "BF17", prioridad: 3 }   // Cúrcuma
    ],
    "CRISIS": [
      { id: "AA003", prioridad: 1 }, // L-Arginina
      { id: "OMEGA3", prioridad: 1 },
      { id: "SN02", prioridad: 1 },  // CoQ10
      { id: "CARZILASA", prioridad: 1 },
      { id: "SN19", prioridad: 2 },  // Resverasor
      { id: "AA008", prioridad: 2 }, // Cronovida
      { id: "BF17", prioridad: 3 },  // Cúrcuma
      { id: "SN32", prioridad: 3 }   // Totalvid 4
    ]
  };
  
  return productosBase[nivel] || [];
}
```

### **Productos por Categoría Crítica:**
```javascript
function getProductosCategoria(categoria, nivel) {
  const productosCategoria = {
    "cardiovascular": [
      { id: "AA003", prioridad: 1 }, // L-Arginina
      { id: "OMEGA3", prioridad: 1 },
      { id: "CARZILASA", prioridad: 2 },
      { id: "BF09", prioridad: 3 }   // Zapote Blanco
    ],
    "cognitivo": [
      { id: "SN09", prioridad: 1 },  // Fosfoserina
      { id: "AA008", prioridad: 1 }, // Cronovida
      { id: "OMEGA3", prioridad: 2 },
      { id: "AA005", prioridad: 3 }  // L-Triptófano
    ],
    "sexualEnergia": [
      { id: "BF10", prioridad: 1 },  // Maca
      { id: "AA003", prioridad: 1 }, // L-Arginina
      { id: "CARZILASA", prioridad: 2 },
      { id: "AA007", prioridad: 3 }  // Carnilis
    ],
    "estresEmocional": [
      { id: "BF07", prioridad: 1 },  // Ner-vit
      { id: "AA005", prioridad: 1 }, // L-Triptófano
      { id: "AA006", prioridad: 2 }, // Neurotransmisores
      { id: "BF08", prioridad: 3 }   // Valeriana
    ],
    "estiloVida": [
      { id: "SN32", prioridad: 1 },  // Totalvid 4
      { id: "BF11", prioridad: 2 },  // Espirulina
      { id: "SN15", prioridad: 3 }   // Minesor
    ],
    "factoresRiesgo": [
      { id: "SN19", prioridad: 1 },  // Resverasor
      { id: "BF17", prioridad: 1 },  // Cúrcuma
      { id: "BF01", prioridad: 2 }   // Hepacryl
    ]
  };
  
  return productosCategoria[categoria] || [];
}
```

### **Función de Descuentos:**
```javascript
function getDescuento(nivel) {
  const descuentos = {
    "OPTIMO": 10,
    "RIESGO": 15,
    "COMPROMETIDO": 20,
    "CRISIS": 25
  };
  
  return descuentos[nivel];
}
```

### **Mensajes Personalizados:**
```javascript
function getMensaje(nivel, categoriaCritica) {
  const mensajes = {
    "OPTIMO": "¡Felicitaciones! Tu endotelio está en excelente estado. Mantén tu rutina actual.",
    "RIESGO": "Tu endotelio necesita apoyo nutricional específico para prevenir deterioro.",
    "COMPROMETIDO": "Tu endotelio muestra signos de disfunción que requieren intervención activa.",
    "CRISIS": "Tu endotelio necesita atención urgente. Te recomendamos consulta con especialista."
  };
  
  return mensajes[nivel];
}
```

---

## 📊 IMPLEMENTACIÓN TÉCNICA

### **Estructura de Datos de Respuesta:**
```javascript
const resultadoTest = {
  puntuacionTotal: 67,
  categorias: {
    cardiovascular: 18,    // de 25
    cognitivo: 12,         // de 15
    sexualEnergia: 8,      // de 15 (CRÍTICA)
    estiloVida: 16,        // de 20
    estresEmocional: 9,    // de 15
    factoresRiesgo: 4      // de 10
  },
  nivel: "RIESGO",
  categoriaCritica: "sexualEnergia",
  productos: [
    { id: "BF10", nombre: "Maca Peruana", prioridad: 1 },
    { id: "AA003", nombre: "L-Arginina", prioridad: 1 },
    { id: "OMEGA3", nombre: "Omega-3", prioridad: 1 },
    { id: "SN02", nombre: "Coenzima Q10", prioridad: 2 }
  ],
  descuento: 15,
  mensaje: "Tu endotelio necesita apoyo específico para energía y vitalidad.",
  recomendacionConsulta: false
}
```

### **Validación de Respuestas:**
```javascript
function validarRespuestas(respuestas) {
  const errores = [];
  
  // Verificar que todas las preguntas estén respondidas
  for (let i = 1; i <= 20; i++) {
    if (!respuestas[`p${i}`]) {
      errores.push(`Pregunta ${i} sin responder`);
    }
  }
  
  // Verificar valores válidos
  const valoresValidos = [0, 1, 2, 3, 4, 5];
  Object.values(respuestas).forEach((valor, index) => {
    if (!valoresValidos.includes(valor)) {
      errores.push(`Valor inválido en pregunta ${index + 1}`);
    }
  });
  
  return errores;
}
```

---

## 🔄 FLUJO DE PROCESAMIENTO

### **Secuencia de Ejecución:**
1. **Recibir respuestas** del usuario
2. **Validar completitud** y formato
3. **Calcular puntuaciones** por categoría
4. **Determinar nivel** de riesgo endotelial
5. **Identificar categoría** más crítica
6. **Generar recomendaciones** personalizadas
7. **Crear kit** de productos específico
8. **Aplicar descuento** según severidad
9. **Mostrar resultados** con call-to-action
10. **Trackear conversión** para optimización

---

*Este algoritmo asegura recomendaciones científicamente fundamentadas y comercialmente efectivas, conectando cada perfil de riesgo endotelial con los productos específicos de Wellkitt.*