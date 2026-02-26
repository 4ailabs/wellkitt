import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    avatar: '👩‍⚕️',
    quote: 'Wellkitt transformó mi rutina de suplementación. Las recomendaciones con IA son increíblemente precisas y personalizadas.',
    stars: 5,
    name: 'María García',
  },
  {
    avatar: '👨‍💼',
    quote: 'La calidad de los productos es excepcional. Noto la diferencia desde la primera semana de uso.',
    stars: 5,
    name: 'Carlos Rodríguez',
  },
  {
    avatar: '👩‍🔬',
    quote: 'El test de salud endotelial me abrió los ojos. Ahora entiendo exactamente qué necesita mi cuerpo.',
    stars: 5,
    name: 'Ana López',
  },
];

const brands = [
  { name: 'Soria Natural', style: 'italic font-semibold' },
  { name: 'Biofito', style: 'font-bold tracking-wider uppercase text-sm' },
  { name: 'Wellkitt', style: 'font-extrabold' },
  { name: 'DOZ', style: 'font-bold tracking-widest uppercase text-xs' },
];

const TestimonialSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl px-8 sm:px-16 py-16 sm:py-20 overflow-hidden bg-slate-50 border border-slate-100">
          {/* Arrows */}
          <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-8 border border-slate-200 bg-white">
                  {t.avatar}
                </div>

                <blockquote
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight max-w-3xl mb-8"
                  style={{ fontFamily: 'Lora, serif' }}
                >
                  {t.quote}
                </blockquote>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-brand-green-500 text-lg">★</span>
                  ))}
                </div>

                <p className="text-slate-500 text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-brand-green-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir a testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-400 mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Marcas de confianza que respaldan tu salud:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {brands.map((brand) => (
              <span
                key={brand.name}
                className={`text-slate-300 hover:text-slate-500 transition-colors cursor-default ${brand.style}`}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: brand.style.includes('text-xs') ? '0.75rem' : brand.style.includes('text-sm') ? '0.875rem' : '1.1rem' }}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
