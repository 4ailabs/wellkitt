import React, { useState } from 'react';
import { NutrigenomicaPregunta, NutrigenomicaRespuestas, NutrigenomicaResultado } from '../types';
import { nutrigenomicaPreguntas, evaluarNutrigenomica } from '../constants/nutrigenomicaTest';
import { Product } from '../types';
import { Dna, Zap, Activity, Droplets, Shield, Clock, Apple, ArrowLeft, ArrowRight, CheckCircle, TrendingUp, AlertCircle, Heart } from 'lucide-react';

interface NutrigenomicaTestProps {
  allProducts: Product[];
  onShowDetails: (product: Product) => void;
  onBackToMain: () => void;
}

const NutrigenomicaTest: React.FC<NutrigenomicaTestProps> = ({ allProducts, onShowDetails, onBackToMain }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [respuestas, setRespuestas] = useState<NutrigenomicaRespuestas>({});
  const [resultado, setResultado] = useState<NutrigenomicaResultado | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = nutrigenomicaPreguntas.length;
  const currentQuestion = nutrigenomicaPreguntas[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

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
    
    // Procesamiento inmediato
    const resultadoTest = evaluarNutrigenomica(respuestas);
    setResultado(resultadoTest);
    setIsLoading(false);
  };

  const getCategoryIcon = (categoria: string) => {
    const icons = {
      detoxificacion: Shield,
      metabolismo: Zap,
      inflamacion: Activity,
      procesados: Apple,
      microbiota: Droplets,
      sensibilidades: AlertCircle,
      circadiano: Clock
    };
    return icons[categoria as keyof typeof icons] || Dna;
  };

  const getCategoryColor = (categoria: string) => {
    const colors = {
      detoxificacion: 'text-green-600 bg-green-100',
      metabolismo: 'text-yellow-600 bg-yellow-100',
      inflamacion: 'text-red-600 bg-red-100',
      procesados: 'text-purple-600 bg-purple-100',
      microbiota: 'text-blue-600 bg-blue-100',
      sensibilidades: 'text-orange-600 bg-orange-100',
      circadiano: 'text-indigo-600 bg-indigo-100'
    };
    return colors[categoria as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getPerfilIcon = (perfil: string) => {
    switch (perfil) {
      case 'OPTIMIZADOR': return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'EQUILIBRADO': return <TrendingUp className="w-8 h-8 text-blue-600" />;
      case 'SENSIBLE': return <AlertCircle className="w-8 h-8 text-yellow-600" />;
      case 'REACTIVO': return <Heart className="w-8 h-8 text-red-600" />;
      default: return <Dna className="w-8 h-8 text-gray-600" />;
    }
  };

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case 'OPTIMIZADOR': return 'from-green-50 to-green-100 border-green-200';
      case 'EQUILIBRADO': return 'from-blue-50 to-blue-100 border-blue-200';
      case 'SENSIBLE': return 'from-yellow-50 to-yellow-100 border-yellow-200';
      case 'REACTIVO': return 'from-red-50 to-red-100 border-red-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getNutrienteInfo = (categoria: string) => {
    const nutrientes = {
      detoxificacion: {
        nombre: "Sulforafano & Selenio",
        fuente: "Brócoli, Selenio",
        necesidad: "Detoxificación"
      },
      metabolismo: {
        nombre: "Coenzima Q10 & B-Vitaminas", 
        fuente: "CoQ10, L-Carnitina",
        necesidad: "Energía Celular"
      },
      inflamacion: {
        nombre: "Omega-3 & Curcumina",
        fuente: "Salmón, Cúrcuma", 
        necesidad: "Antiinflamatorio"
      },
      procesados: {
        nombre: "Cromo & Canela",
        fuente: "Cromo, Té Verde",
        necesidad: "Control Glucémico"
      },
      microbiota: {
        nombre: "Probióticos & Fibra",
        fuente: "Fermentados, Inulina",
        necesidad: "Salud Digestiva"
      },
      sensibilidades: {
        nombre: "Enzimas Digestivas",
        fuente: "Jengibre, Papaína",
        necesidad: "Digestión"
      },
      circadiano: {
        nombre: "Melatonina & Magnesio",
        fuente: "Triptófano, Magnesio",
        necesidad: "Sueño"
      }
    };
    return nutrientes[categoria as keyof typeof nutrientes] || {
      nombre: "Nutriente",
      fuente: "Fuente natural",
      necesidad: "Bienestar"
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Analizando tu Perfil Nutrigenómico</h3>
          <p className="text-gray-600">Procesando la conversación entre tus genes y alimentos...</p>
        </div>
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <button
            onClick={onBackToMain}
            className="mb-4 sm:mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Volver al inicio
          </button>

          {/* Resultado Principal */}
          <div className={`bg-gradient-to-br ${getPerfilColor(resultado.perfil)} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl mb-6 sm:mb-8 border`}>
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                {getPerfilIcon(resultado.perfil)}
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Perfil Nutrigenómico: {resultado.perfil}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">{resultado.mensaje}</p>
              <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{resultado.puntuacionTotal}/100</div>
              <div className="text-xs sm:text-sm text-gray-600">Puntuación General de Compatibilidad Genético-Nutricional</div>
            </div>
          </div>

          {/* Nutrientes Recomendados */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Nutrientes que tu Cuerpo Necesita
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Object.entries(resultado.categorias).map(([categoria, puntuacion]) => {
                const Icon = getCategoryIcon(categoria);
                const colorClass = getCategoryColor(categoria);
                const isAreaOportunidad = categoria === resultado.areaOportunidad;
                const nutrienteInfo = getNutrienteInfo(categoria);
                
                return (
                  <div
                    key={categoria}
                    className={`p-4 sm:p-6 rounded-xl border-2 ${isAreaOportunidad ? 'ring-2 ring-purple-400' : ''} ${colorClass.includes('green') ? 'bg-green-50 border-green-200' : 
                      colorClass.includes('yellow') ? 'bg-yellow-50 border-yellow-200' :
                      colorClass.includes('red') ? 'bg-red-50 border-red-200' :
                      colorClass.includes('purple') ? 'bg-purple-50 border-purple-200' :
                      colorClass.includes('blue') ? 'bg-blue-50 border-blue-200' :
                      colorClass.includes('orange') ? 'bg-orange-50 border-orange-200' :
                      'bg-indigo-50 border-indigo-200'}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base">{nutrienteInfo.nombre}</h4>
                        <p className="text-xs text-gray-600">{nutrienteInfo.fuente}</p>
                        {isAreaOportunidad && <span className="text-xs text-purple-600 font-medium">⭐ Mayor Necesidad</span>}
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                        <span>Necesidad</span>
                        <span>{puntuacion < 60 ? 'Alta' : puntuacion < 80 ? 'Media' : 'Baja'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${puntuacion >= 80 ? 'bg-green-500' : 
                            puntuacion >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${100 - puntuacion}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 mt-2">Para: {nutrienteInfo.necesidad}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Productos Recomendados */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Productos Personalizados para tu Perfil Genético
            </h3>
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Basado en tu análisis nutrigenómico, estos productos están especialmente seleccionados 
              para optimizar la comunicación entre tus genes y nutrientes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {resultado.productos.map((productoRecomendado, index) => {
                const producto = allProducts.find(p => p.id === productoRecomendado.id);
                if (!producto) return null;

                return (
                  <div
                    key={producto.id}
                    className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => onShowDetails(producto)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">{producto.name}</h4>
                        <p className="text-xs sm:text-sm text-purple-600 font-medium">{producto.brand}</p>
                      </div>
                      <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full ml-2">
                        #{index + 1}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      {producto.benefits.slice(0, 2).join(', ')}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{producto.category}</span>
                      <button className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium">
                        Ver detalles →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Recomendación de Consulta */}
          {resultado.recomendacionConsulta && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 sm:p-6 text-center">
              <Dna className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="text-base sm:text-lg font-bold text-purple-800 mb-2">Consulta Nutrigenómica Personalizada</h4>
              <p className="text-purple-700 mb-4 text-sm sm:text-base">
                Optimiza aún más tu alimentación con una consulta especializada. Nuestros expertos te ayudarán 
                a crear un plan nutricional específico según tu perfil genético y necesidades individuales.
              </p>
              <a
                href="https://wa.me/+525579076626?text=Hola! Realicé el test de nutrigenómica en Wellkitt y me gustaría una consulta personalizada para optimizar mi alimentación según mi perfil genético."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <Dna className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Solicitar Consulta Nutrigenómica</span>
                <span className="sm:hidden">Solicitar Consulta</span>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Test en progreso
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
        <button
          onClick={onBackToMain}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Volver al inicio
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <Dna className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Test de Nutrigenómica Wellvibe
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Descubre cómo tus genes responden a los alimentos y optimiza tu nutrición personalizada
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>Pregunta {currentStep + 1} de {totalSteps}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getCategoryColor(currentQuestion.categoria)}`}>
                {React.createElement(getCategoryIcon(currentQuestion.categoria), { className: "w-4 h-4 sm:w-5 sm:h-5" })}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600 capitalize">
                {currentQuestion.categoria.replace(/([A-Z])/g, ' $1')}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              {currentQuestion.pregunta}
            </h2>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {currentQuestion.opciones.map((opcion) => (
              <button
                key={opcion.valor}
                onClick={() => handleRespuesta(currentQuestion.id, opcion.valor)}
                className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  respuestas[currentQuestion.id] === opcion.valor
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                    respuestas[currentQuestion.id] === opcion.valor
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {respuestas[currentQuestion.id] === opcion.valor && (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-sm sm:text-base">{opcion.texto}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Anterior
          </button>

          {currentStep === totalSteps - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!respuestas[currentQuestion.id]}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base order-1 sm:order-2"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Analizar mi Perfil</span>
              <span className="sm:hidden">Analizar Perfil</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!respuestas[currentQuestion.id]}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base order-1 sm:order-2"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">Siguiente</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutrigenomicaTest;