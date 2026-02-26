import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

const FooterModern: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Productos',
      links: ['Catálogo Completo', 'Ofertas Especiales', 'Nuevos Productos', 'Bestsellers'],
    },
    {
      title: 'Sobre Nosotros',
      links: ['Nuestra Misión', 'Quiénes Somos', 'Blog de Salud', 'Sostenibilidad'],
    },
    {
      title: 'Soporte',
      links: ['Centro de Ayuda', 'Contacto', 'Entregas', 'Devoluciones'],
    },
    {
      title: 'Legal',
      links: ['Términos de Servicio', 'Privacidad', 'Cookies', 'Aviso Legal'],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
      {/* Decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-green-500/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-gold-500/10 to-transparent rounded-full blur-3xl -z-10" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-green-500 to-brand-green-600 flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-serif text-xl font-bold text-white">Wellkitt</span>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Tu navegador de salud natural. Suplementos premium con recomendaciones personalizadas.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(43, 168, 154, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:text-brand-green-400 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
            >
              <h4 className="font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-sm hover:text-brand-green-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Línea separadora */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-brand-green-500/20 to-transparent my-8 origin-left"
        />

        {/* Contacto y CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="font-bold text-white mb-6">Contacto</h4>
            <div className="space-y-4">
              <a
                href="tel:+5255790766226"
                className="flex items-center gap-3 text-sm hover:text-brand-green-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-green-500/10 flex items-center justify-center group-hover:bg-brand-green-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-brand-green-400" />
                </div>
                <div>
                  <p className="text-slate-400">Teléfono</p>
                  <p className="text-white">+52 55 7907-6626</p>
                </div>
              </a>
              <a
                href="mailto:hola@wellkitt.com"
                className="flex items-center gap-3 text-sm hover:text-brand-green-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-green-500/10 flex items-center justify-center group-hover:bg-brand-green-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-brand-green-400" />
                </div>
                <div>
                  <p className="text-slate-400">Email</p>
                  <p className="text-white">hola@wellkitt.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-brand-green-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-green-400" />
                </div>
                <div>
                  <p className="text-slate-400">Ubicación</p>
                  <p className="text-white">CDMX, México</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="font-bold text-white mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">
              Recibe consejos de salud y ofertas exclusivas directamente en tu correo.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-green-500/50 focus:ring-1 focus:ring-brand-green-500/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Suscribir
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-slate-500 border-t border-white/10 pt-8"
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            <Leaf className="w-4 h-4 text-brand-green-500" />
            <p>
              © {currentYear} Wellkitt. Todos los derechos reservados. Hecho con ❤️ para tu
              bienestar.
            </p>
          </div>
          <p className="text-slate-600">
            Wellkitt no es un sustituto de consejo médico profesional. Consulta a un médico
            antes de comenzar cualquier suplemento.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterModern;
