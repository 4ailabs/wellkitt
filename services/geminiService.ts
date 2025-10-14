import { Product, Kit, Recommendation } from '../types';

/**
 * Servicio para obtener recomendaciones de kits usando la API segura
 * La API key ahora está protegida en el backend
 */
export const getKitRecommendation = async (
  userInput: string,
  products: Product[],
  kits: Kit[]
): Promise<Recommendation | null> => {
  try {
    console.log('🔄 Solicitando recomendación al backend...');

    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        products: products.map(({ id, name, benefits, category }) => ({
          id,
          name,
          benefits,
          category
        })),
        kits: kits.map(({ id, name, problem, benefit }) => ({
          id,
          name,
          problem,
          benefit
        }))
      }),
    });

    // Manejar respuestas no exitosas
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      console.error('❌ Error del servidor:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      // Mensajes de error específicos según el código de estado
      if (response.status === 429) {
        throw new Error('Se ha excedido el límite de solicitudes. Por favor, intenta de nuevo en unos minutos.');
      } else if (response.status === 500) {
        throw new Error(errorData.message || 'Error interno del servidor. Por favor, intenta de nuevo.');
      } else if (response.status === 400) {
        throw new Error(errorData.message || 'Solicitud inválida. Verifica los datos ingresados.');
      } else {
        throw new Error('Error al generar la recomendación. Por favor, intenta de nuevo.');
      }
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      console.error('❌ Respuesta del servidor sin datos válidos:', data);
      return null;
    }

    console.log('✅ Recomendación recibida exitosamente');
    return data.data as Recommendation;

  } catch (error) {
    console.error('❌ Error en getKitRecommendation:', error);

    // Re-lanzar el error para que el componente lo maneje
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Error de conexión. Verifica tu conexión a internet e intenta de nuevo.');
  }
};
