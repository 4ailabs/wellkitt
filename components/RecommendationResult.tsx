
import React, { useRef, useState } from 'react';
import { Recommendation, Product } from '../types';
import { Sparkles, FileImage, FileText, Loader2, Phone } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';


interface RecommendationResultProps {
  recommendation: Recommendation;
  allProducts: Product[];
}

const RecommendationResult: React.FC<RecommendationResultProps> = ({ recommendation, allProducts }) => {
  const recommendationRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<null | 'image' | 'pdf'>(null);

  const handleWhatsAppOrder = (recommendation: Recommendation) => {
    const productos = recommendation.product_ids
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean) as Product[];

    const mensaje = `🏥 *PEDIDO BASADO EN RECOMENDACIÓN AI - WELLKITT*

¡Hola! Me gustaría hacer un pedido basado en la recomendación personalizada de Wellkitt.

📊 *MI RECOMENDACIÓN:*
• *Kit:* ${recommendation.custom_kit_name || 'Kit Personalizado'}
• *Descripción:* ${recommendation.custom_kit_description || 'Recomendación personalizada'}

🛒 *PRODUCTOS RECOMENDADOS:*
${productos.map((p, i) => `${i + 1}. ${p.name} (${p.brand})`).join('\n')}

💡 *RAZÓN DE LA RECOMENDACIÓN:*
${recommendation.reasoning}

💰 *INFORMACIÓN ADICIONAL:*
• Recomendación personalizada por IA
• Productos seleccionados según tus necesidades
• Kit optimizado para tu bienestar

¿Podrías ayudarme a procesar este pedido? También me gustaría saber más sobre el envío y formas de pago.

¡Gracias! 🙏`;

    const whatsappUrl = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const recommendedProducts = recommendation.product_ids
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean) as Product[];
    
  const kitName = recommendation.custom_kit_name || `Kit Personalizado`;

  const handleExport = async (format: 'image' | 'pdf') => {
    if (!recommendationRef.current || isExporting) return;
    setIsExporting(format);

    try {
      // Pequeño delay para asegurar que todo esté renderizado
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Detectar si es móvil para ajustar la configuración
      const isMobile = window.innerWidth <= 768;
      
      const canvas = await html2canvas(recommendationRef.current, {
        scale: isMobile ? 2 : 3, // Escala reducida en móviles para mejor rendimiento
        useCORS: true,
        backgroundColor: '#ffffff', // Fondo blanco para mejor compatibilidad
        allowTaint: true,
        foreignObjectRendering: true,
        logging: false,
        width: recommendationRef.current.scrollWidth,
        height: recommendationRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });

      const fileName = `wellkitt_recomendacion_${new Date().toISOString().split('T')[0]}`;

      if (format === 'image') {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else { // PDF
        const imgData = canvas.toDataURL('image/png');
        // Márgenes en px
        const margin = 32;
        // Tamaño máximo de página (A4 en px a 96dpi aprox)
        const maxPdfWidth = 794; // 210mm
        const maxPdfHeight = 1123; // 297mm
        // Escalar si es necesario
        let imgWidth = canvas.width;
        let imgHeight = canvas.height;
        let scale = 1;
        if (imgWidth + margin * 2 > maxPdfWidth || imgHeight + margin * 2 > maxPdfHeight) {
          scale = Math.min(
            (maxPdfWidth - margin * 2) / imgWidth,
            (maxPdfHeight - margin * 2) / imgHeight
          );
          imgWidth = imgWidth * scale;
          imgHeight = imgHeight * scale;
        }
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [maxPdfWidth, maxPdfHeight]
        });
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        pdf.save(`${fileName}.pdf`);
      }
    } catch (error) {
      console.error('Error during export:', error);
      // Optionally, set an error state to inform the user
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="mt-6 md:mt-8 animate-fade-in">
      <div ref={recommendationRef} className="bg-gradient-to-br from-brand-green-50 to-emerald-100 border-2 border-brand-green-500 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-4 md:mb-6">
            <div className="bg-white p-3 md:p-4 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-brand-green-600"/>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-green-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Tu kit personalizado Wellkitt</h2>
              <p className="text-sm md:text-base text-brand-green-800 mt-1">Basado en tus objetivos, aquí tienes nuestra recomendación:</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">{kitName}</h3>
            {recommendation.custom_kit_description && <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4">{recommendation.custom_kit_description}</p>}
            
            <p className="text-sm md:text-base text-slate-700 mb-4 md:mb-6 border-l-4 border-brand-green-400 pl-3 md:pl-4 italic">"{recommendation.reasoning}"</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {recommendedProducts.map(product => (
                <div key={product.id} className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-bold text-slate-800 text-sm md:text-base">{product.name}</p>
                    <span className="text-xs text-brand-green-700 bg-brand-green-100 px-2 py-1 rounded-full whitespace-nowrap">{product.category}</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500">{product.brand}</p>
                  {product.benefits && product.benefits.length > 0 && (
                    <p className="text-xs text-slate-600 mt-2 overflow-hidden" style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis'
                    }}>{product.benefits.slice(0, 2).join(', ')}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-brand-green-200 text-center">
                <p className="text-xs md:text-sm text-slate-600 mb-3">¿Tienes dudas o quieres realizar tu pedido?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <div className="inline-flex items-center justify-center gap-2 font-semibold text-brand-green-800 text-sm md:text-base">
                        <Phone className="w-4 h-4 md:w-5 md:h-5" />
                        <span>WhatsApp: +52 55 7907 6626</span>
                    </div>
                    <button 
                        onClick={() => handleWhatsAppOrder(recommendation)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl transition-colors text-sm md:text-base flex items-center gap-2"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        Hacer Pedido por WhatsApp
                    </button>
                </div>
            </div>

          </div>
      </div>

      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-brand-green-200 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
        <h4 className="font-semibold text-brand-green-800 text-sm md:text-base">¿Guardar o compartir?</h4>
        <div className="flex gap-3 md:gap-4">
          {isExporting && (
            <div className="text-sm text-brand-green-600 font-medium">
              {isExporting === 'image' ? 'Generando imagen...' : 'Generando PDF...'}
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(30,41,59,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExport('image')} 
            disabled={!!isExporting}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 text-sm md:text-base font-bold py-2 md:py-2.5 px-4 md:px-5 rounded-lg md:rounded-xl border-2 border-slate-300 hover:bg-slate-100 transition-all duration-300 disabled:bg-slate-200 disabled:cursor-not-allowed tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {isExporting === 'image' ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
            ) : (
                <FileImage className="w-4 h-4 md:w-5 md:h-5" />
            )}
            <span>{isExporting === 'image' ? 'Exportando...' : 'Imagen'}</span>
          </motion.button>
           <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(30,41,59,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExport('pdf')} 
            disabled={!!isExporting}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 text-sm md:text-base font-bold py-2 md:py-2.5 px-4 md:px-5 rounded-lg md:rounded-xl border-2 border-slate-300 hover:bg-slate-100 transition-all duration-300 disabled:bg-slate-200 disabled:cursor-not-allowed tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {isExporting === 'pdf' ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
            ) : (
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
            )}
            <span>{isExporting === 'pdf' ? 'Exportando...' : 'PDF'}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;