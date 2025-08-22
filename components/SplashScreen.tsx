import React, { useState, useEffect } from 'react';
import { Heart, Dna, Droplets, Activity } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { duration: 800, delay: 200 },   // Logo aparece
      { duration: 600, delay: 300 },   // Nombre aparece
      { duration: 500, delay: 200 },   // Tagline aparece
      { duration: 400, delay: 300 },   // Iconos aparecen
      { duration: 1000, delay: 500 },  // Pausa final
    ];

    let currentIndex = 0;
    const totalDuration = steps.reduce((acc, step) => acc + step.duration + step.delay, 0);

    const timer = setTimeout(() => {
      onFinish();
    }, totalDuration);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, steps.slice(0, index).reduce((acc, s) => acc + s.duration + s.delay, 0) + step.delay);
    });

    return () => clearTimeout(timer);
  }, [onFinish]);

  useEffect(() => {
    if (currentStep >= 4) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [currentStep]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-brand-green-50 via-white to-brand-green-100 z-50 flex items-center justify-center">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-green-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-brand-green-200 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo principal */}
        <div className={`transition-all duration-700 ease-out ${
          currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-brand-green-500 to-brand-green-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
        </div>

        {/* Nombre de la app */}
        <div className={`transition-all duration-600 ease-out delay-200 ${
          currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Wellkitt
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-500 ease-out delay-300 ${
          currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xs mx-auto leading-relaxed">
            Tu salud, ciencia personalizada
          </p>
        </div>

        {/* Iconos de características */}
        <div className={`transition-all duration-400 ease-out delay-400 ${
          currentStep >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="flex justify-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <Dna className="w-6 h-6 md:w-7 md:h-7 text-brand-green-600" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <Droplets className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <Activity className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Indicador de carga */}
        <div className={`mt-8 transition-all duration-300 ${
          currentStep >= 4 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-green-400 to-brand-green-600 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Transición de salida */}
      <div className={`absolute inset-0 bg-white transition-opacity duration-500 ${
        !isVisible ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default SplashScreen;
