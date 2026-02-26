import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    role: 'Nutricionista',
    image: '👩‍⚕️',
    rating: 5,
    text: 'Las recomendaciones de IA son extraordinarias. Mis pacientes ven resultados reales en 2-3 semanas.',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Atleta Profesional',
    image: '🏃‍♂️',
    rating: 5,
    text: 'Finalmente encontré suplementos que realmente funcionan y que mi cuerpo reconoce como natural.',
  },
  {
    name: 'Ana Martínez',
    role: 'Emprendedora',
    image: '👩‍💼',
    rating: 5,
    text: 'El test de nutrigenómica cambió mi perspectiva sobre la salud. Es increíblemente preciso.',
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorativos */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-green-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-brand-gold-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="text-brand-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Lo que dicen nuestros clientes
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Miles confían en Wellkitt
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Resultados reales de personas que transformaron su salud con nuestros productos.
          </p>
        </motion.div>

        {/* Testimonios */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Fondo gradiente */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-green-50 to-brand-gold-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + i * 0.05, type: 'spring' }}
                  >
                    <Star className="w-5 h-5 fill-brand-gold-400 text-brand-gold-400" />
                  </motion.div>
                ))}
              </div>

              {/* Texto */}
              <p className="text-slate-700 text-lg leading-relaxed mb-6 italic font-serif">
                "{testimonial.text}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Línea decorativa */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green-500 to-brand-gold-400 rounded-b-2xl origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
