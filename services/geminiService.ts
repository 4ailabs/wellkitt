
import { GoogleGenAI, Type } from "@google/genai";
import { Product, Kit, Recommendation } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
      description: "A suitable name for the custom kit, if one is created."
    },
    custom_kit_description: {
        type: Type.STRING,
        description: "A brief, compelling description for the custom kit."
    },
    product_ids: {
      type: Type.ARRAY,
      description: "An array of product IDs that make up the recommended kit.",
      items: { type: Type.STRING }
    },
    reasoning: {
      type: Type.STRING,
      description: "A clear, concise explanation for why this recommendation is suitable for the user."
    },
  },
  required: ["recommendation_type", "product_ids", "reasoning"]
};

export const getKitRecommendation = async (
  userInput: string,
  products: Product[],
  kits: Kit[]
): Promise<Recommendation | null> => {
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

  try {
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
        console.error("Gemini API returned an empty response.");
        return null;
    }
    
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as Recommendation;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
