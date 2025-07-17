
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
