// API endpoint para proteger la API key de Gemini
// Este archivo se ejecuta en el servidor, no en el cliente

import { GoogleGenAI, Type } from "@google/genai";

interface Product {
  id: string;
  name: string;
  benefits: string[];
  category: string;
}

interface Kit {
  id: string;
  name: string;
  problem: string;
  benefit: string;
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    recommendation_type: {
      type: Type.STRING,
      enum: ['predefined_kit', 'custom_kit'],
      description: "Determines if the recommendation is a predefined kit or a custom one.",
    },
    kit_id: {
      type: Type.STRING,
      description: "The ID of the recommended predefined kit, if applicable. E.g., 'K01'."
    },
    custom_kit_name: {
      type: Type.STRING,
      description: "A suitable name for the custom kit, if one is created. Make it catchy and descriptive in Spanish."
    },
    custom_kit_description: {
      type: Type.STRING,
      description: "A brief, compelling description for the custom kit in Spanish."
    },
    product_ids: {
      type: Type.ARRAY,
      description: "An array of product IDs that make up the recommended kit.",
      items: { type: Type.STRING }
    },
    reasoning: {
      type: Type.STRING,
      description: "A clear, concise explanation in Spanish for why this recommendation is suitable for the user."
    },
    product_reasons: {
      type: Type.ARRAY,
      description: "Individual reasoning for each product selected, explaining how it helps the user's specific goals.",
      items: {
        type: Type.OBJECT,
        properties: {
          product_id: { type: Type.STRING },
          reason: { type: Type.STRING, description: "Brief explanation in Spanish of why this product was selected." },
          key_benefit: { type: Type.STRING, description: "The main benefit of this product for the user's goal in Spanish." }
        }
      }
    },
    synergy_explanation: {
      type: Type.STRING,
      description: "Explanation in Spanish of how the selected products work together synergistically."
    },
    usage_suggestion: {
      type: Type.STRING,
      description: "Suggested usage timing in Spanish (e.g., 'Tomar X por la mañana, Y con las comidas')."
    },
    expected_timeline: {
      type: Type.STRING,
      description: "Expected timeline for results in Spanish (e.g., 'Resultados notables en 2-4 semanas')."
    }
  },
  required: ["recommendation_type", "product_ids", "reasoning", "product_reasons", "synergy_explanation"]
};

export default async function handler(req: any, res: any) {
  // Validar método HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Solo se permite POST'
    });
  }

  // Validar API key está configurada
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.error('❌ API key no configurada correctamente');
    return res.status(500).json({
      error: 'Configuration error',
      message: 'La API key de Gemini no está configurada en el servidor'
    });
  }

  try {
    const { userInput, products, kits } = req.body;

    // Validar entrada
    if (!userInput || !products || !kits) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Faltan parámetros requeridos: userInput, products, kits'
      });
    }

    // Validar longitud de entrada
    if (userInput.length > 1000) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'El texto ingresado es demasiado largo (máximo 1000 caracteres)'
      });
    }

    console.log('🔄 Procesando recomendación para:', userInput.substring(0, 50) + '...');

    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";

    const prompt = `
      System Instruction: Eres un experto naturópata y asesor de productos para Wellkitt, una empresa mexicana de suplementos naturales de alta calidad. Tu misión es ayudar a los usuarios a encontrar los productos perfectos para sus objetivos de salud.

      IMPORTANTE:
      - Todas tus respuestas DEBEN estar en español.
      - Sé empático y cercano, pero profesional.
      - Considera las sinergias entre productos (cómo trabajan mejor juntos).
      - Prioriza productos que ataquen la causa raíz, no solo los síntomas.
      - Ten en cuenta que los usuarios buscan soluciones naturales y efectivas.

      Objetivo de Salud del Usuario:
      "${userInput}"

      Productos Disponibles (JSON):
      ${JSON.stringify(products.map(({ id, name, benefits, category }: Product) => ({ id, name, benefits, category })))}

      Kits Predefinidos (JSON):
      ${JSON.stringify(kits.map(({ id, name, problem, benefit }: Kit) => ({ id, name, problem, benefit })))}

      INSTRUCCIONES DETALLADAS:

      1. ANÁLISIS: Analiza cuidadosamente el objetivo del usuario. Identifica:
         - El problema principal
         - Posibles causas subyacentes
         - Áreas de salud relacionadas

      2. SELECCIÓN DE PRODUCTOS:
         - Si un kit predefinido encaja perfectamente (>80% match), recomiéndalo con "recommendation_type": "predefined_kit"
         - Si no, crea un kit personalizado con 2-5 productos que:
           * Se complementen entre sí (sinergia)
           * Ataquen el problema desde diferentes ángulos
           * Sean específicos para las necesidades del usuario

      3. EXPLICACIONES REQUERIDAS:
         - "reasoning": Explicación general de por qué esta combinación es ideal (2-3 oraciones)
         - "product_reasons": Para CADA producto, explica:
           * "reason": Por qué fue seleccionado específicamente
           * "key_benefit": El beneficio principal para este usuario
         - "synergy_explanation": Cómo trabajan los productos juntos (efecto sinérgico)
         - "usage_suggestion": Cuándo y cómo tomar cada producto (ej: "Producto X por la mañana, Producto Y con las comidas")
         - "expected_timeline": Tiempo estimado para ver resultados (ej: "Mejoras notables en 2-4 semanas")

      4. NOMBRES CREATIVOS:
         - Si creas un kit personalizado, dale un nombre atractivo y descriptivo en español
         - Ejemplos: "Kit Energía Total", "Protocolo Digestivo", "Escudo Inmunológico"

      Responde ÚNICAMENTE con el JSON estructurado según el schema proporcionado.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text?.trim() || '';

    if (!jsonText) {
      console.error('❌ Gemini API retornó respuesta vacía');
      return res.status(500).json({
        error: 'Empty response',
        message: 'La IA no generó una recomendación'
      });
    }

    const recommendation = JSON.parse(jsonText);

    console.log('✅ Recomendación generada exitosamente');

    return res.status(200).json({
      success: true,
      data: recommendation
    });

  } catch (error: any) {
    console.error('❌ Error en API de recomendación:', error);

    // Diferenciar tipos de error
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        error: 'API key invalid',
        message: 'Error de autenticación con el servicio de IA'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Se ha excedido el límite de solicitudes. Intenta de nuevo en unos minutos.'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Error al generar la recomendación. Por favor, intenta de nuevo.'
    });
  }
}
