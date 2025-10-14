// Servidor Express para proteger la API key de Gemini
// Este servidor maneja las llamadas a la API de Gemini de forma segura

import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Validar API key al iniciar
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
  console.error('❌ ERROR: GEMINI_API_KEY no está configurada en .env.local');
  console.error('Por favor, configura tu API key de Gemini en el archivo .env.local');
  process.exit(1);
}

console.log('✅ API key de Gemini configurada correctamente');

// Schema de respuesta para Gemini
const responseSchema = {
  type: 'OBJECT',
  properties: {
    recommendation_type: {
      type: 'STRING',
      enum: ['predefined_kit', 'custom_kit'],
      description: "Determines if the recommendation is a predefined kit or a custom one.",
    },
    kit_id: {
      type: 'STRING',
      description: "The ID of the recommended predefined kit, if applicable. E.g., 'K01'."
    },
    custom_kit_name: {
      type: 'STRING',
      description: "A suitable name for the custom kit, if one is created."
    },
    custom_kit_description: {
      type: 'STRING',
      description: "A brief, compelling description for the custom kit."
    },
    product_ids: {
      type: 'ARRAY',
      description: "An array of product IDs that make up the recommended kit.",
      items: { type: 'STRING' }
    },
    reasoning: {
      type: 'STRING',
      description: "A clear, concise explanation for why this recommendation is suitable for the user."
    },
  },
  required: ["recommendation_type", "product_ids", "reasoning"]
};

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Wellkitt API Server está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de recomendación
app.post('/api/recommend', async (req, res) => {
  try {
    const { userInput, products, kits } = req.body;

    // Validar entrada
    if (!userInput || !products || !kits) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Faltan parámetros requeridos: userInput, products, kits'
      });
    }

    // Validar longitud
    if (userInput.length > 1000) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'El texto ingresado es demasiado largo (máximo 1000 caracteres)'
      });
    }

    console.log(`🔄 [${new Date().toISOString()}] Procesando recomendación para: "${userInput.substring(0, 50)}..."`);

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const model = "gemini-2.5-flash";

    const prompt = `
      System Instruction: You are an expert naturopath and product recommender for Wellkitt, a natural health supplement company. Your goal is to help users find the perfect products for their health goals. You are given a user's health concern, a list of available products, and a list of pre-defined kits. Based on this information, you must recommend either one of the pre-defined kits if it's a good match, or create a new custom kit by selecting 2 to 5 relevant products. Your response MUST be in JSON format conforming to the provided schema. Provide clear reasoning for your recommendation.

      User's Health Goal:
      "${userInput}"

      Available Products (JSON):
      ${JSON.stringify(products.map(({ id, name, benefits, category }) => ({ id, name, benefits, category })))}

      Pre-defined Kits (JSON):
      ${JSON.stringify(kits.map(({ id, name, problem, benefit }) => ({ id, name, problem, benefit })))}

      Instructions:
      1.  Analyze the user's goal.
      2.  If a pre-defined kit (from the "Pre-defined Kits" list) perfectly addresses the goal, recommend it. Set "recommendation_type" to "predefined_kit", provide the "kit_id", and list the kit's product_ids.
      3.  If no pre-defined kit is a perfect match, create a custom kit. Set "recommendation_type" to "custom_kit", create a "custom_kit_name" and "custom_kit_description", and select 2-5 relevant product_ids from the "Available Products" list.
      4.  Always provide a concise "reasoning" for your choice, explaining how the selected products or kit will help the user achieve their goal.
      5.  Base your selection on the product benefits and categories.
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
        message: 'La IA no generó una recomendación válida'
      });
    }

    const recommendation = JSON.parse(jsonText);

    console.log(`✅ [${new Date().toISOString()}] Recomendación generada exitosamente: ${recommendation.custom_kit_name || recommendation.kit_id}`);

    return res.status(200).json({
      success: true,
      data: recommendation
    });

  } catch (error) {
    console.error('❌ Error en API de recomendación:', error);

    // Diferenciar tipos de error
    if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      return res.status(500).json({
        error: 'API key invalid',
        message: 'Error de autenticación con el servicio de IA'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('429')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Se ha excedido el límite de solicitudes. Intenta de nuevo en unos minutos.'
      });
    }

    if (error.message?.includes('timeout')) {
      return res.status(504).json({
        error: 'Timeout',
        message: 'La solicitud tardó demasiado. Por favor, intenta de nuevo.'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Error al generar la recomendación. Por favor, intenta de nuevo.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'El endpoint solicitado no existe'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 ================================');
  console.log(`🚀 Wellkitt API Server iniciado`);
  console.log(`🚀 Puerto: ${PORT}`);
  console.log(`🚀 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🚀 Endpoint: http://localhost:${PORT}/api/recommend`);
  console.log('🚀 ================================');
});
