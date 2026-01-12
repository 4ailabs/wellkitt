import React, { useState } from 'react';
import { SaladRecipe, Product } from '../types';
import { MASTER_SALADS } from '../constants/salads';
import { products } from '../constants/data';
import { ChevronRight, ArrowLeft, Clock, Timer, Sparkles, CheckCircle2, Microscope, ChefHat, Lightbulb, Calendar, TrendingUp, Leaf, Salad, Drumstick, Droplet, Stars, Soup, Package, ExternalLink } from 'lucide-react';

interface SaladsBankProps {
  onSelectSalad: (salad: SaladRecipe) => void;
  onBack: () => void;
  onShowProductDetails?: (product: Product) => void;
}

const SaladsBank: React.FC<SaladsBankProps> = ({ onSelectSalad, onBack, onShowProductDetails }) => {
  const [selectedSalad, setSelectedSalad] = useState<SaladRecipe | null>(null);

  if (selectedSalad) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 pb-12">
        {/* Header with Back Button */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <button
              onClick={() => setSelectedSalad(null)}
              className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="text-sm md:text-base">Volver al Banco</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-12">
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-16">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 opacity-10">
                <Sparkles className="w-32 h-32 md:w-48 md:h-48" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-bold rounded-full mb-3 md:mb-4 border border-white/30">
                  {selectedSalad.scienceQuick.mechanism}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 tracking-tight leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {selectedSalad.name}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-50 font-light mb-6 md:mb-8 leading-relaxed max-w-3xl">
                  {selectedSalad.target}
                </p>

                {/* Quick Stats Pills */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/20">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-semibold">{selectedSalad.totalTime}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/20">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-semibold">{selectedSalad.scienceQuick.evidence}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/20">
                    <Timer className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-semibold">{selectedSalad.scienceQuick.timeToEffect}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Objective Molecular - Card destacada */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-blue-200 shadow-lg relative overflow-hidden">
              <div className="absolute -right-8 -top-8 opacity-5">
                <Microscope className="w-32 h-32 md:w-48 md:h-48" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <Microscope className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <h2 className="text-sm md:text-base font-bold text-blue-900 uppercase tracking-wider">Objetivo Molecular</h2>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-900 font-bold italic leading-relaxed">
                  "{selectedSalad.molecularGoalDesc}"
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Ingredientes
              </h2>
              <p className="text-sm md:text-base text-slate-600">Cada componente cumple una función molecular específica</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {['base', 'verdura', 'proteina', 'grasa', 'topping', 'aderezo'].map((category) => {
                const items = selectedSalad.ingredients.filter(i => i.category === category);
                if (items.length === 0) return null;

                const categoryConfig = {
                  base: { name: 'Base', color: 'green', IconComponent: Leaf },
                  verdura: { name: 'Verduras', color: 'emerald', IconComponent: Salad },
                  proteina: { name: 'Proteína', color: 'orange', IconComponent: Drumstick },
                  grasa: { name: 'Grasas Saludables', color: 'amber', IconComponent: Droplet },
                  topping: { name: 'Toppings', color: 'purple', IconComponent: Stars },
                  aderezo: { name: 'Aderezo', color: 'blue', IconComponent: Soup }
                };

                const config = categoryConfig[category as keyof typeof categoryConfig];
                const IconComponent = config.IconComponent;

                return (
                  <div key={category} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
                      <IconComponent className={`w-5 h-5 md:w-6 md:h-6 text-${config.color}-600`} />
                      <h3 className={`text-xs md:text-sm font-bold text-${config.color}-600 uppercase tracking-wider`}>
                        {config.name}
                      </h3>
                    </div>
                    <ul className="space-y-3 md:space-y-4">
                      {items.map((ingredient) => (
                        <li key={ingredient.name} className="group">
                          <div className="flex justify-between items-baseline mb-1 md:mb-1.5 gap-2">
                            <span className="font-bold text-sm md:text-base text-slate-900 group-hover:text-green-600 transition-colors">
                              {ingredient.name}
                            </span>
                            <span className="text-xs md:text-sm font-semibold text-gray-500 whitespace-nowrap">
                              {ingredient.amount}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-2">
                            {ingredient.reason}
                          </p>
                          {ingredient.power && (
                            <div className={`inline-flex items-center gap-1 text-xs font-bold text-${config.color}-700 bg-${config.color}-50 px-2 py-1 rounded-lg border border-${config.color}-200`}>
                              <Sparkles className="w-3 h-3" />
                              {ingredient.power}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation Section */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-orange-200 shadow-lg">
              <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <ChefHat className="w-6 h-6 md:w-7 md:h-7 text-orange-600" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Preparación Científica
                </h2>
              </div>
              <ol className="space-y-4 md:space-y-5">
                {selectedSalad.preparation.map((step, i) => (
                  <li key={i} className="flex gap-3 md:gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                    </div>
                    <p className="text-sm md:text-base lg:text-lg text-slate-700 font-medium leading-relaxed pt-1 md:pt-2">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Secret Section */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border-2 border-amber-300 shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5">
                <Lightbulb className="w-32 h-32 md:w-48 md:h-48" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                  <h3 className="text-sm md:text-base font-bold text-amber-900 uppercase tracking-wider">El Secreto de la Sinergia</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-900 font-bold italic leading-relaxed">
                  "{selectedSalad.secret}"
                </p>
              </div>
            </div>
          </div>

          {/* Pro Optimization Grid */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Optimización PRO
              </h2>
              <p className="text-sm md:text-base text-slate-600">Maximiza los beneficios con estas recomendaciones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border-2 border-purple-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  <p className="text-xs md:text-sm font-bold text-purple-900 uppercase tracking-wider">Cuándo Comer</p>
                </div>
                <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                  {selectedSalad.proOptimization.whenToEat}
                </p>
              </div>

              <div className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border-2 border-blue-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <p className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-wider">Frecuencia</p>
                </div>
                <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                  {selectedSalad.proOptimization.frequency}
                </p>
              </div>

              <div className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border-2 border-green-200 shadow-sm hover:shadow-lg transition-shadow md:col-span-1">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  <p className="text-xs md:text-sm font-bold text-green-900 uppercase tracking-wider">Combina Con</p>
                </div>
                <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                  {selectedSalad.proOptimization.combinesWith}
                </p>
              </div>
            </div>
          </div>

          {/* Smart Rotation */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl border border-green-200 shadow-lg relative overflow-hidden">
              <div className="absolute -left-8 -bottom-8 opacity-5">
                <TrendingUp className="w-32 h-32 md:w-48 md:h-48" strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  <h3 className="text-sm md:text-base font-bold text-green-900 uppercase tracking-wider">Rotación Inteligente</h3>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-green-900 font-medium leading-relaxed">
                  {selectedSalad.smartRotation}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Products Section */}
          {selectedSalad.recommendedProducts && selectedSalad.recommendedProducts.length > 0 && (
            <div className="max-w-5xl mx-auto mb-8 md:mb-12">
              <div className="mb-6 md:mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4">
                  <Package className="w-4 h-4 md:w-5 md:h-5 text-blue-700" />
                  <span className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-wider">Sinergia Nutrigenómica</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Productos <span className="text-blue-600">Recomendados</span>
                </h2>
                <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
                  Suplementos estratégicamente seleccionados para potenciar los efectos moleculares de esta ensalada
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {selectedSalad.recommendedProducts.map((rec, index) => {
                  const product = products.find(p => p.id === rec.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={rec.productId}
                      className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-6 border-2 border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-500 font-medium">
                            {product.brand} • {product.presentation || 'Ver detalles'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <p className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-wide">Por Qué Funciona</p>
                          </div>
                          <p className="text-xs md:text-sm text-slate-700 leading-relaxed pl-3.5">
                            {rec.reason}
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 md:p-4 rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                            <p className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-wide">Sinergia Molecular</p>
                          </div>
                          <p className="text-xs md:text-sm text-blue-900 leading-relaxed font-medium">
                            {rec.synergy}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="text-lg md:text-xl font-bold text-slate-900">
                            ${product.price} <span className="text-sm md:text-base font-normal text-slate-500">MXN</span>
                          </div>
                          <button
                            onClick={() => {
                              if (onShowProductDetails) {
                                onShowProductDetails(product);
                                setSelectedSalad(null);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-xs md:text-sm group/btn"
                          >
                            <span>Ver más</span>
                            <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clinical Note */}
              <div className="mt-6 md:mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 p-4 md:p-6 rounded-lg">
                <p className="text-xs md:text-sm text-amber-900 leading-relaxed">
                  <span className="font-bold">Nota Clínica:</span> Estos productos fueron seleccionados por un clínico experto en nutrigenómica para trabajar sinérgicamente con los compuestos bioactivos de la ensalada. La combinación alimento + suplemento optimiza la biodisponibilidad y efectos terapéuticos.
                </p>
              </div>
            </div>
          )}

          {/* Call to Action - Educational */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border-2 border-green-200 shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-5">
                <Sparkles className="w-48 h-48 md:w-64 md:h-64" strokeWidth={1} />
              </div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  🧬 Nutrición <span className="text-green-600">Inteligente</span>
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-8">
                  Esta receta representa la integración de nutrigenómica aplicada: alimentos + suplementos trabajando sinérgicamente a nivel molecular para optimizar tu salud.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-300 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <span className="text-sm md:text-base font-semibold text-slate-700">Receta guardada en tu memoria 😊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 pb-12">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="text-sm md:text-base">Volver al Menú Principal</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-8 md:mb-16 text-center">
          <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-green-100 text-green-700 text-xs md:text-sm font-bold rounded-full mb-4 md:mb-6">
            NUTRIGENÓMICA APLICADA
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Banco de <span className="text-green-600">Ensaladas</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            Recetas maestras diseñadas con precisión nutrigenómica. Cada ensalada activa vías bioquímicas específicas para optimizar tu salud a nivel molecular.
          </p>
        </div>

        {/* Salads Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-5xl mx-auto">
          {MASTER_SALADS.map((salad, index) => {
            const gradients = [
              'from-blue-500 to-cyan-600',
              'from-purple-500 to-pink-600',
              'from-green-500 to-emerald-600',
              'from-orange-500 to-amber-600'
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <button
                key={salad.id}
                onClick={() => setSelectedSalad(salad)}
                className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all group text-left transform hover:-translate-y-1"
              >
                {/* Header colorido */}
                <div className={`bg-gradient-to-br ${gradient} p-6 md:p-8 text-white relative overflow-hidden`}>
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <Sparkles className="w-24 h-24 md:w-32 md:h-32" strokeWidth={1} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <span className="px-2.5 py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-bold rounded-full border border-white/30">
                        {salad.scienceQuick.mechanism}
                      </span>
                      <span className="px-2.5 py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-bold rounded-full border border-white/30">
                        {salad.scienceQuick.evidence}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {salad.name}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium">
                      {salad.target}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8 leading-relaxed line-clamp-3">
                    {salad.molecularGoalDesc}
                  </p>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
                    <div className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{salad.totalTime}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{salad.proOptimization.frequency}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600">
                      <Timer className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{salad.scienceQuick.timeToEffect}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-200">
                    <span className="text-sm md:text-base font-bold text-green-600 group-hover:text-green-700 transition-colors">
                      Ver Receta Completa
                    </span>
                    <div className="bg-green-50 group-hover:bg-green-600 p-2 md:p-3 rounded-xl transition-all">
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-green-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SaladsBank;
