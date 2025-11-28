// Utilidades de búsqueda mejorada

/**
 * Normaliza texto removiendo acentos y caracteres especiales
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s]/g, '') // Solo letras, números y espacios
    .trim();
};

/**
 * Calcula la distancia de Levenshtein entre dos strings
 * Útil para búsqueda fuzzy/tolerante a errores
 */
export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // sustitución
          matrix[i][j - 1] + 1, // inserción
          matrix[i - 1][j] + 1 // eliminación
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Verifica si dos strings son similares (fuzzy match)
 * Retorna true si la distancia es menor al umbral permitido
 */
export const isFuzzyMatch = (search: string, target: string, threshold: number = 2): boolean => {
  const normalizedSearch = normalizeText(search);
  const normalizedTarget = normalizeText(target);

  // Si es match exacto
  if (normalizedTarget.includes(normalizedSearch)) {
    return true;
  }

  // Si la búsqueda es muy corta, solo match exacto
  if (normalizedSearch.length <= 2) {
    return normalizedTarget.includes(normalizedSearch);
  }

  // Buscar en palabras individuales del target
  const targetWords = normalizedTarget.split(/\s+/);
  const searchWords = normalizedSearch.split(/\s+/);

  for (const searchWord of searchWords) {
    if (searchWord.length <= 2) continue;

    let foundMatch = false;
    for (const targetWord of targetWords) {
      // Match exacto parcial
      if (targetWord.includes(searchWord) || searchWord.includes(targetWord)) {
        foundMatch = true;
        break;
      }

      // Fuzzy match con distancia Levenshtein
      const distance = levenshteinDistance(searchWord, targetWord);
      const maxAllowedDistance = Math.min(threshold, Math.floor(searchWord.length / 3));

      if (distance <= maxAllowedDistance) {
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      return false;
    }
  }

  return true;
};

/**
 * Calcula un score de relevancia para ordenar resultados
 */
export const calculateRelevanceScore = (query: string, product: {
  name: string;
  brand: string;
  ingredients: string[];
  benefits: string[];
  category: string;
}): number => {
  const normalizedQuery = normalizeText(query);
  let score = 0;

  // Match en nombre (máxima prioridad)
  const normalizedName = normalizeText(product.name);
  if (normalizedName === normalizedQuery) {
    score += 100; // Match exacto
  } else if (normalizedName.startsWith(normalizedQuery)) {
    score += 80; // Empieza con la búsqueda
  } else if (normalizedName.includes(normalizedQuery)) {
    score += 60; // Contiene la búsqueda
  }

  // Match en marca
  const normalizedBrand = normalizeText(product.brand);
  if (normalizedBrand.includes(normalizedQuery)) {
    score += 40;
  }

  // Match en categoría
  const normalizedCategory = normalizeText(product.category);
  if (normalizedCategory.includes(normalizedQuery)) {
    score += 30;
  }

  // Match en ingredientes
  for (const ingredient of product.ingredients) {
    if (normalizeText(ingredient).includes(normalizedQuery)) {
      score += 20;
      break;
    }
  }

  // Match en beneficios
  for (const benefit of product.benefits) {
    if (normalizeText(benefit).includes(normalizedQuery)) {
      score += 15;
      break;
    }
  }

  return score;
};

/**
 * Resalta los términos de búsqueda en un texto
 */
export const highlightSearchTerm = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(/\s+/).filter(w => w.length > 1);

  if (words.length === 0) return text;

  // Crear regex para cada palabra (case insensitive, con acentos)
  let result = text;
  for (const word of words) {
    // Crear patrón que coincida con variantes con/sin acentos
    const pattern = word.split('').map(char => {
      const accents: Record<string, string> = {
        'a': '[aáàäâ]',
        'e': '[eéèëê]',
        'i': '[iíìïî]',
        'o': '[oóòöô]',
        'u': '[uúùüû]',
        'n': '[nñ]',
      };
      return accents[char] || char;
    }).join('');

    const regex = new RegExp(`(${pattern})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">$1</mark>');
  }

  return result;
};

/**
 * Sugerencias de búsqueda basadas en historial y términos populares
 */
export const defaultSearchSuggestions = [
  'vitamina',
  'energia',
  'digestion',
  'inmunidad',
  'articulaciones',
  'coenzima q10',
  'omega',
  'magnesio',
  'hierro',
  'curcuma',
  'valeriana',
  'espirulina',
  'maca',
  'colágeno',
  'probióticos',
];

/**
 * Obtiene sugerencias basadas en el input actual
 */
export const getSearchSuggestions = (
  query: string,
  products: Array<{ name: string; category: string; ingredients: string[] }>
): string[] => {
  if (!query.trim() || query.length < 2) {
    return defaultSearchSuggestions.slice(0, 5);
  }

  const normalizedQuery = normalizeText(query);
  const suggestions = new Set<string>();

  // Buscar en nombres de productos
  for (const product of products) {
    const normalizedName = normalizeText(product.name);
    if (normalizedName.includes(normalizedQuery) && suggestions.size < 5) {
      suggestions.add(product.name);
    }
  }

  // Buscar en categorías
  const categories = [...new Set(products.map(p => p.category))];
  for (const category of categories) {
    if (normalizeText(category).includes(normalizedQuery) && suggestions.size < 8) {
      suggestions.add(category);
    }
  }

  // Buscar en ingredientes comunes
  const allIngredients = products.flatMap(p => p.ingredients);
  const ingredientCounts = allIngredients.reduce((acc, ing) => {
    acc[ing] = (acc[ing] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedIngredients = Object.entries(ingredientCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([ing]) => ing);

  for (const ingredient of sortedIngredients) {
    if (normalizeText(ingredient).includes(normalizedQuery) && suggestions.size < 10) {
      suggestions.add(ingredient);
    }
  }

  return Array.from(suggestions).slice(0, 8);
};
