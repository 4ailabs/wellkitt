import React, { useState } from 'react';
import { EndotelioPregunta, EndotelioRespuestas, EndotelioResultado } from '../types';
import { endotelioPreguntas, evaluarEndotelio } from '../constants/endotelioTest';
import { Product } from '../types';
import { Heart, Brain, Zap, Activity, Smile, AlertTriangle, CheckCircle, Clock, TrendingUp, ArrowLeft } from 'lucide-react';

interface EndotelioTestProps {
  allProducts: Product[];
  onShowDetails: (product: Product) => void;
  onBackToMain: () => void;
}

const EndotelioTest: React.FC<EndotelioTestProps> = ({ allProducts, onShowDetails, onBackToMain }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [respuestas, setRespuestas] = useState<EndotelioRespuestas>({});
  const [resultado, setResultado] = useState<EndotelioResultado | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = endotelioPreguntas.length;



  const handleRespuesta = (preguntaId: string, valor: number) => {
    setRespuestas(prevRespuestas => ({
      ...prevRespuestas,
      [preguntaId]: valor
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simular procesamiento
    setTimeout(() => {
      const resultadoTest = evaluarEndotelio(respuestas);
      setResultado(resultadoTest);
      setIsLoading(false);
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setRespuestas({});
    setResultado(null);
  };

  const handleWhatsAppOrder = (resultado: EndotelioResultado) => {
    const productos = resultado.productos.map(p => {
      const product = findProduct(p.id);
      return product ? `${product.name} (${product.brand}) - Prioridad ${p.prioridad}` : '';
    }).filter(Boolean);

    const categoriaCriticaFormateada = resultado.categoriaCritica
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const mensaje = `🏥 *PEDIDO BASADO EN TEST DE ENDOTELIO - WELLKITT*

¡Hola! Acabo de realizar el test de salud endotelial y me gustaría hacer un pedido con los productos recomendados.

📊 *RESULTADOS DEL TEST:*
• *Nivel de Salud:* ${resultado.nivel}
• *Puntuación Total:* ${resultado.puntuacionTotal}/100 puntos
• *Área de Atención Crítica:* ${categoriaCriticaFormateada}
• *Descuento Aplicable:* ${resultado.descuento}% OFF

🛒 *PRODUCTOS RECOMENDADOS:*
${productos.map((p, i) => `${i + 1}. ${p}`).join('\n')}

💡 *RECOMENDACIÓN DEL SISTEMA:*
${resultado.mensaje}

💰 *INFORMACIÓN ADICIONAL:*
• Descuento especial por perfil de salud
• Productos seleccionados por prioridad
• Recomendación personalizada basada en test científico

¿Podrías ayudarme a procesar este pedido con el descuento aplicado? También me gustaría saber más sobre el envío y formas de pago.

¡Gracias! 🙏`;

    const whatsappUrl = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'cardiovascular': return <Heart className="w-5 h-5" />;
      case 'cognitivo': return <Brain className="w-5 h-5" />;
      case 'sexualEnergia': return <Zap className="w-5 h-5" />;
      case 'estiloVida': return <Activity className="w-5 h-5" />;
      case 'estresEmocional': return <Smile className="w-5 h-5" />;
      case 'factoresRiesgo': return <AlertTriangle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'OPTIMO': return 'text-green-600 bg-green-100';
      case 'RIESGO': return 'text-yellow-600 bg-yellow-100';
      case 'COMPROMETIDO': return 'text-orange-600 bg-orange-100';
      case 'CRISIS': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNivelIcon = (nivel: string) => {
    switch (nivel) {
      case 'OPTIMO': return <CheckCircle className="w-6 h-6" />;
      case 'RIESGO': return <Clock className="w-6 h-6" />;
      case 'COMPROMETIDO': return <TrendingUp className="w-6 h-6" />;
      case 'CRISIS': return <AlertTriangle className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const findProduct = (id: string) => {
    return allProducts.find(p => p.id === id);
  };

  if (resultado) {
    return (
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
        {/* Botón de regresar */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={onBackToMain}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Regresar a la página principal</span>
          </button>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 md:mb-4 px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Resultados del Test de Endotelio
          </h2>
          <div className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full ${getNivelColor(resultado.nivel)}`}>
            {getNivelIcon(resultado.nivel)}
            <span className="font-semibold text-sm md:text-base">{resultado.nivel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
          {/* Puntuación Total */}
          <div className="bg-gradient-to-br from-brand-green-50 to-brand-green-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">Puntuación Total</h3>
            <div className="text-3xl md:text-4xl font-bold text-brand-green-600 mb-2">
              {resultado.puntuacionTotal}/100
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div 
                className="bg-brand-green-600 h-2 md:h-3 rounded-full transition-all duration-500"
                style={{ width: `${(resultado.puntuacionTotal / 100) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs md:text-sm text-slate-600 mt-2">{resultado.mensaje}</p>
          </div>

          {/* Categoría Crítica */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">Área de Atención Prioritaria</h3>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              {getCategoriaIcon(resultado.categoriaCritica)}
              <span className="text-base md:text-lg font-semibold capitalize">
                {resultado.categoriaCritica.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-red-600">
              {resultado.categorias[resultado.categoriaCritica as keyof typeof resultado.categorias]}/
              {resultado.categoriaCritica === 'cardiovascular' ? 25 : 
               resultado.categoriaCritica === 'cognitivo' ? 15 :
               resultado.categoriaCritica === 'sexualEnergia' ? 15 :
               resultado.categoriaCritica === 'estiloVida' ? 20 :
               resultado.categoriaCritica === 'estresEmocional' ? 15 : 10}
            </div>
          </div>
        </div>

        {/* Productos Recomendados */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Productos Recomendados</h3>
            <button 
              onClick={() => handleWhatsAppOrder(resultado)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl transition-colors text-sm md:text-base flex items-center gap-2"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Pedir por WhatsApp
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {resultado.productos.map((producto, index) => {
              const product = findProduct(producto.id);
              if (!product) return null;
              
              return (
                <div 
                  key={producto.id}
                  className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onShowDetails(product)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-900 text-sm md:text-base">{product.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      producto.prioridad === 1 ? 'bg-red-100 text-red-600' :
                      producto.prioridad === 2 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      Prioridad {producto.prioridad}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 mb-2">{product.brand}</p>
                  <p className="text-xs text-slate-500">{product.benefits.slice(0, 2).join(', ')}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Descuento y Pedido */}
        <div className="bg-gradient-to-r from-brand-green-600 to-brand-green-700 text-white p-4 md:p-6 rounded-xl md:rounded-2xl mb-4 md:mb-6">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-2">¡Descuento Especial!</h3>
            <p className="text-base md:text-lg mb-3 md:mb-4">Por tu perfil de salud, obtienes un {resultado.descuento}% de descuento</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-brand-green-600 font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors text-sm md:text-base">
                Aplicar Descuento
              </button>
              <button 
                onClick={() => handleWhatsAppOrder(resultado)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg md:rounded-xl transition-colors text-sm md:text-base flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Hacer Pedido por WhatsApp
              </button>
            </div>
          </div>
        </div>

        {resultado.recomendacionConsulta && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-800 text-sm md:text-base">Recomendación Médica</h4>
                <p className="text-red-700 text-xs md:text-sm">Te recomendamos consultar con un especialista para una evaluación más detallada.</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <button 
            onClick={handleRestart}
            className="bg-slate-800 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg md:rounded-xl hover:bg-slate-700 transition-colors text-sm md:text-base"
          >
            Realizar Test Nuevamente
          </button>
        </div>
      </div>
    );
  }

  const currentPregunta = endotelioPreguntas[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
      {/* Botón de regresar */}
      <div className="mb-4 md:mb-6">
        <button
          onClick={onBackToMain}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span>Regresar a la página principal</span>
        </button>
      </div>

      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 md:mb-4 px-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Test de Salud Endotelial
        </h2>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-4">
          Evalúa la salud de tu endotelio con nuestro test científico de 20 preguntas. 
          Descubre tu perfil de riesgo y obtén recomendaciones personalizadas.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between text-xs md:text-sm text-slate-600 mb-2">
          <span>Pregunta {currentStep + 1} de {totalSteps}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
          <div 
            className="bg-brand-green-600 h-2 md:h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Categoría Actual */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        {getCategoriaIcon(currentPregunta.categoria)}
        <span className="text-base md:text-lg font-semibold capitalize">
          {currentPregunta.categoria.replace(/([A-Z])/g, ' $1').trim()}
        </span>
      </div>

      {/* Pregunta */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 md:mb-6">
          {currentPregunta.pregunta}
        </h3>
        
        <div className="space-y-2 md:space-y-3">
          {currentPregunta.opciones.map((opcion, index) => (
            <button
              key={index}
              onClick={() => handleRespuesta(currentPregunta.id, opcion.valor)}
              className={`w-full text-left p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-200 ${
                respuestas[currentPregunta.id as keyof EndotelioRespuestas] === opcion.valor
                  ? 'border-brand-green-500 bg-brand-green-50 text-brand-green-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                  respuestas[currentPregunta.id as keyof EndotelioRespuestas] === opcion.valor
                    ? 'border-brand-green-500 bg-brand-green-500'
                    : 'border-gray-300'
                }`}>
                  {respuestas[currentPregunta.id as keyof EndotelioRespuestas] === opcion.valor && (
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-sm md:text-base">{opcion.texto}</span>
              </div>
            </button>
          ))}
        </div>
      </div>



      {/* Navigation */}
      <div className="flex justify-between gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 md:px-6 py-2 md:py-3 text-slate-600 font-semibold rounded-lg md:rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
        >
          Anterior
        </button>
        
        {currentStep === totalSteps - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={respuestas[currentPregunta.id as keyof EndotelioRespuestas] === undefined || isLoading}
            className="px-6 md:px-8 py-2 md:py-3 bg-brand-green-600 text-white font-bold rounded-lg md:rounded-xl hover:bg-brand-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            {isLoading ? 'Procesando...' : 'Ver Resultados'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={respuestas[currentPregunta.id as keyof EndotelioRespuestas] === undefined}
            className={`px-4 md:px-6 py-2 md:py-3 font-bold rounded-lg md:rounded-xl transition-colors text-sm md:text-base ${
              respuestas[currentPregunta.id as keyof EndotelioRespuestas] !== undefined
                ? 'bg-brand-green-600 text-white hover:bg-brand-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Siguiente ({currentStep + 1}/{totalSteps})
          </button>
        )}
      </div>
    </div>
  );
};

export default EndotelioTest; 