import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, FlaskConical } from 'lucide-react';

interface HeroModernProps {
  onStartRecommendation: () => void;
}

const HeroModern: React.FC<HeroModernProps> = ({ onStartRecommendation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f0fdf0 0%, #dcfce7 30%, #bbf7d0 60%, #bbf7d0 100%)',
            minHeight: '520px',
          }}
        >
          {/* Organic flowing shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: [0, 15, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '-15%', right: '-10%', width: '65%', height: '130%',
                background: 'radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.15) 0%, rgba(74,222,128,0.1) 30%, rgba(187,247,208,0.08) 60%, transparent 80%)',
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              }}
            />
            <motion.div
              animate={{ x: [0, -10, 0], y: [0, 15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{
                position: 'absolute', top: '10%', right: '-5%', width: '55%', height: '100%',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(22,163,74,0.12) 0%, rgba(134,239,172,0.08) 40%, transparent 70%)',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            />
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', bottom: '5%', right: '10%', width: '35%', height: '50%',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08) 0%, rgba(220,252,231,0.05) 50%, transparent 80%)',
                borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%',
              }}
            />
            {/* Wave SVG */}
            <svg
              className="absolute right-0 top-0 h-full"
              style={{ width: '45%', opacity: 0.5 }}
              viewBox="0 0 400 600"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(34,197,94,0.08)" />
                  <stop offset="50%" stopColor="rgba(74,222,128,0.12)" />
                  <stop offset="100%" stopColor="rgba(134,239,172,0.06)" />
                </linearGradient>
              </defs>
              <path d="M200,0 C250,80 150,160 220,240 C290,320 180,400 240,480 C300,560 220,600 260,600 L400,600 L400,0 Z" fill="url(#waveGrad)" />
              <path d="M280,0 C310,100 240,200 300,300 C360,400 270,500 320,600 L400,600 L400,0 Z" fill="rgba(34,197,94,0.05)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 sm:p-12 lg:p-16 xl:p-20">
            <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-brand-green-200/60 shadow-sm"
              >
                <FlaskConical className="w-4 h-4 text-brand-green-600" />
                <span className="text-sm font-semibold text-brand-green-700">
                  Respaldado por Ciencia
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-brand-green-950"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  La forma más{' '}
                  <span className="text-brand-green-600">inteligente</span> de cuidar tu salud.
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-base sm:text-lg leading-relaxed max-w-lg text-slate-500"
              >
                Descubre suplementos premium seleccionados con ciencia. Tu bienestar personalizado en un solo lugar.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
                className="pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(34,197,94,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onStartRecommendation}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-green-600 rounded-full font-semibold text-base text-white transition-all duration-300 hover:bg-brand-green-700"
                >
                  Empezar Test
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right side - abstract SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <svg viewBox="0 0 500 500" className="w-full h-auto max-w-md" fill="none">
                <defs>
                  <linearGradient id="heroGrad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dcfce7" />
                    <stop offset="40%" stopColor="#86efac" />
                    <stop offset="70%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <linearGradient id="heroGrad2" x1="0.2" y1="0" x2="0.8" y2="1">
                    <stop offset="0%" stopColor="#bbf7d0" />
                    <stop offset="50%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                  <linearGradient id="heroGrad3" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dcfce7" />
                    <stop offset="60%" stopColor="#bbf7d0" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                </defs>
                <motion.path
                  animate={{
                    d: [
                      'M250,80 C340,80 420,140 430,230 C440,320 380,400 300,420 C220,440 130,400 100,320 C70,240 160,80 250,80Z',
                      'M260,90 C350,70 430,150 420,240 C410,330 370,410 280,430 C190,450 120,380 110,300 C100,220 170,110 260,90Z',
                      'M250,80 C340,80 420,140 430,230 C440,320 380,400 300,420 C220,440 130,400 100,320 C70,240 160,80 250,80Z',
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  fill="url(#heroGrad1)" opacity="0.6"
                />
                <motion.path
                  animate={{
                    d: [
                      'M280,120 C360,110 400,180 390,260 C380,340 330,380 260,390 C190,400 150,350 140,280 C130,210 200,130 280,120Z',
                      'M270,130 C350,120 410,190 400,270 C390,350 340,390 270,400 C200,410 140,360 130,290 C120,220 190,140 270,130Z',
                      'M280,120 C360,110 400,180 390,260 C380,340 330,380 260,390 C190,400 150,350 140,280 C130,210 200,130 280,120Z',
                    ],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  fill="url(#heroGrad2)" opacity="0.5"
                />
                <motion.path
                  animate={{
                    d: [
                      'M300,160 C350,155 380,200 370,250 C360,300 320,330 280,330 C240,330 210,300 210,260 C210,220 250,165 300,160Z',
                      'M310,170 C360,160 390,210 380,260 C370,310 330,340 290,340 C250,340 220,310 220,270 C220,230 260,180 310,170Z',
                      'M300,160 C350,155 380,200 370,250 C360,300 320,330 280,330 C240,330 210,300 210,260 C210,220 250,165 300,160Z',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  fill="url(#heroGrad3)" opacity="0.7"
                />
                <motion.circle
                  animate={{ cx: [180, 190, 180], cy: [180, 170, 180], r: [30, 35, 30] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  fill="#22c55e" opacity="0.12"
                />
                <motion.circle
                  animate={{ cx: [340, 335, 340], cy: [350, 360, 350], r: [20, 25, 20] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  fill="#4ade80" opacity="0.15"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroModern;
