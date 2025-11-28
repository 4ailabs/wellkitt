
import React, { useRef, useState } from 'react';
import { Recommendation, Product } from '../types';
import { Sparkles, FileImage, FileText, Loader2, Phone, ShoppingCart, Clock, Zap, CheckCircle, Info, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';


interface RecommendationResultProps {
  recommendation: Recommendation;
  allProducts: Product[];
  onNewRecommendation?: () => void;
}

const RecommendationResult: React.FC<RecommendationResultProps> = ({ recommendation, allProducts, onNewRecommendation }) => {
  const recommendationRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<null | 'image' | 'pdf'>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const { addItem } = useCart();
  
  // Detectar dispositivo móvil
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddRecommendationToCart = () => {
    recommendedProducts.forEach(product => {
      addItem(product);
    });
  };

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
    if (!recommendationRef.current || isExporting) {
      console.log('Exportación bloqueada: elemento no disponible o ya exportando');
      return;
    }
    
    setIsExporting(format);
    console.log('🚀 Iniciando exportación como:', format);

    try {
      const element = recommendationRef.current;
      console.log('📦 Elemento a capturar:', {
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight
      });
      
      // Delay más largo para asegurar renderizado completo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Detectar si es móvil
      const isMobile = window.innerWidth <= 768;
      const scale = isMobile ? 2 : 3;
      
      console.log('⚙️ Configuración:', { isMobile, scale });
      
      // Scroll a la posición del elemento para asegurar que esté visible
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      console.log('✅ Canvas generado exitosamente:', canvas.width, 'x', canvas.height);

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('El canvas generado está vacío');
      }

      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const fileName = `wellkitt_recomendacion_${timestamp}`;

      if (format === 'image') {
        console.log('🖼️ Generando imagen PNG...');
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        if (!imgData || imgData === 'data:,') {
          throw new Error('No se pudo generar la imagen');
        }
        
        if (isMobile && navigator.share) {
          // Usar Web Share API en móviles (funciona en iOS Safari y Android Chrome)
          console.log('📱 Usando Web Share API');
          
          // Convertir base64 a Blob
          const base64Data = imgData.split(',')[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/png' });
          
          const file = new File([blob], `${fileName}.png`, { type: 'image/png' });
          
          try {
            await navigator.share({
              files: [file],
              title: 'Wellkitt - Tu Recomendación Personalizada',
              text: 'Mi recomendación personalizada de Wellkitt'
            });
            console.log('✅ Compartido exitosamente');
          } catch (shareError: any) {
            if (shareError.name === 'AbortError') {
              console.log('ℹ️ Usuario canceló compartir');
            } else {
              console.log('⚠️ Error al compartir, intentando método alternativo');
              // Método alternativo: descargar directamente
              const link = document.createElement('a');
              link.href = imgData;
              link.download = `${fileName}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        } else if (isMobile) {
          // Fallback para móviles sin Web Share API
          console.log('📱 Fallback móvil: Descarga directa');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `${fileName}.png`;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          
          document.body.appendChild(link);
          link.click();
          
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
          
          alert('📱 Imagen descargada.\n\nRevisa tu carpeta de Descargas o Galería.');
        } else {
          // En desktop, descarga directa
          console.log('💻 Modo desktop: Descarga directa');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `${fileName}.png`;
          link.style.display = 'none';
          
          document.body.appendChild(link);
          link.click();
          
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
          
          alert('✅ Imagen descargada correctamente');
        }
        
        console.log('✅ Imagen procesada exitosamente');
        
      } else { // PDF
        console.log('📄 Generando PDF...');
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        if (!imgData || imgData === 'data:,') {
          throw new Error('No se pudo generar la imagen para el PDF');
        }
        
        // Dimensiones del canvas en píxeles
        const canvasWidthPx = canvas.width;
        const canvasHeightPx = canvas.height;
        
        // Convertir a mm (usando una escala más precisa)
        const pxToMm = 0.264583;
        const imgWidthMM = (canvasWidthPx * pxToMm) / scale;
        const imgHeightMM = (canvasHeightPx * pxToMm) / scale;
        
        // Tamaño A4 en mm
        const a4WidthMM = 210;
        const a4HeightMM = 297;
        const marginMM = 15;
        
        // Área útil
        const maxWidthMM = a4WidthMM - (marginMM * 2);
        const maxHeightMM = a4HeightMM - (marginMM * 2);
        
        console.log('📏 Dimensiones:', {
          'Canvas (px)': `${canvasWidthPx} x ${canvasHeightPx}`,
          'Imagen (mm)': `${imgWidthMM.toFixed(2)} x ${imgHeightMM.toFixed(2)}`,
          'Área útil A4 (mm)': `${maxWidthMM} x ${maxHeightMM}`
        });
        
        // Calcular escala para ajustar a la página
        let finalWidthMM = imgWidthMM;
        let finalHeightMM = imgHeightMM;
        
        if (finalWidthMM > maxWidthMM || finalHeightMM > maxHeightMM) {
          const scaleRatio = Math.min(
            maxWidthMM / finalWidthMM,
            maxHeightMM / finalHeightMM
          );
          finalWidthMM *= scaleRatio;
          finalHeightMM *= scaleRatio;
        }
        
        // Determinar orientación
        const orientation = finalWidthMM > finalHeightMM ? 'landscape' : 'portrait';
        
        console.log('📐 PDF final:', {
          orientation,
          'Dimensiones (mm)': `${finalWidthMM.toFixed(2)} x ${finalHeightMM.toFixed(2)}`
        });
        
        const pdf = new jsPDF({
          orientation: orientation,
          unit: 'mm',
          format: 'a4',
          compress: true
        });
        
        // Centrar la imagen
        const xPosition = (a4WidthMM - finalWidthMM) / 2;
        const yPosition = marginMM;
        
        pdf.addImage(
          imgData,
          'PNG',
          xPosition,
          yPosition,
          finalWidthMM,
          finalHeightMM,
          undefined,
          'FAST'
        );
        
        if (isMobile && navigator.share) {
          // Usar Web Share API en móviles
          console.log('📱 Usando Web Share API para PDF');
          const pdfBlob = pdf.output('blob');
          const pdfFile = new File([pdfBlob], `${fileName}.pdf`, { type: 'application/pdf' });
          
          try {
            await navigator.share({
              files: [pdfFile],
              title: 'Wellkitt - Tu Recomendación Personalizada',
              text: 'Mi recomendación personalizada de Wellkitt en PDF'
            });
            console.log('✅ PDF compartido exitosamente');
          } catch (shareError: any) {
            if (shareError.name === 'AbortError') {
              console.log('ℹ️ Usuario canceló compartir');
            } else {
              console.log('⚠️ Error al compartir PDF, descargando directamente');
              pdf.save(`${fileName}.pdf`);
            }
          }
        } else if (isMobile) {
          // Fallback para móviles sin Web Share API
          console.log('📱 Fallback móvil: Descarga directa de PDF');
          pdf.save(`${fileName}.pdf`);
          alert('📱 PDF descargado.\n\nRevisa tu carpeta de Descargas.');
        } else {
          // En desktop, descarga directa
          pdf.save(`${fileName}.pdf`);
          alert('✅ PDF descargado correctamente');
        }
        
        console.log('✅ PDF procesado exitosamente');
      }
      
    } catch (error) {
      console.error('❌ Error detallado durante exportación:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert(`❌ Error al exportar: ${errorMessage}\n\nPor favor, intenta de nuevo o contacta a soporte.`);
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
              {recommendedProducts.map(product => {
                const productReason = recommendation.product_reasons?.find(pr => pr.product_id === product.id);
                return (
                  <motion.div
                    key={product.id}
                    className="bg-white p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-bold text-slate-800 text-sm md:text-base">{product.name}</p>
                      <span className="text-xs text-brand-green-700 bg-brand-green-100 px-2 py-1 rounded-full whitespace-nowrap">{product.category}</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 mb-2">{product.brand}</p>

                    {/* Beneficio clave personalizado */}
                    {productReason?.key_benefit && (
                      <div className="flex items-start gap-2 mb-2 p-2 bg-brand-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-brand-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-brand-green-800 font-medium">{productReason.key_benefit}</p>
                      </div>
                    )}

                    {/* Razón de selección */}
                    {productReason?.reason && (
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <p className="italic">{productReason.reason}</p>
                      </div>
                    )}

                    {/* Fallback a beneficios genéricos si no hay razón personalizada */}
                    {!productReason && product.benefits && product.benefits.length > 0 && (
                      <p className="text-xs text-slate-600 mt-2 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                      }}>{product.benefits.slice(0, 2).join(', ')}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Sección de Sinergia */}
            {recommendation.synergy_explanation && (
              <div className="mt-4 md:mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h4 className="font-bold text-purple-900 text-sm md:text-base">Efecto Sinérgico</h4>
                </div>
                <p className="text-sm text-purple-800">{recommendation.synergy_explanation}</p>
              </div>
            )}

            {/* Sugerencia de Uso y Timeline */}
            {(recommendation.usage_suggestion || recommendation.expected_timeline) && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendation.usage_suggestion && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-blue-800">Cómo tomarlo</span>
                    </div>
                    <p className="text-xs text-blue-700">{recommendation.usage_suggestion}</p>
                  </div>
                )}
                {recommendation.expected_timeline && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-800">Resultados esperados</span>
                    </div>
                    <p className="text-xs text-amber-700">{recommendation.expected_timeline}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-brand-green-200 text-center">
                <p className="text-xs md:text-sm text-slate-600 mb-3">¿Tienes dudas o quieres realizar tu pedido?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <div className="inline-flex items-center justify-center gap-2 font-semibold text-brand-green-800 text-sm md:text-base">
                        <Phone className="w-4 h-4 md:w-5 md:h-5" />
                        <span>WhatsApp: +52 55 7907 6626</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={handleAddRecommendationToCart}
                            className="bg-brand-green-600 hover:bg-brand-green-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg md:rounded-xl transition-colors text-sm md:text-base flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Agregar al Carrito
                        </button>
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
      </div>

      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-brand-green-200 flex flex-col items-center justify-center gap-3 md:gap-4">
        <div className="text-center">
          <h4 className="font-semibold text-brand-green-800 text-sm md:text-base">
            {isMobileDevice ? '📱 Compartir o guardar' : '💾 Guardar o compartir'}
          </h4>
          {isMobileDevice && (
            <p className="text-xs text-slate-600 mt-1">Usa el menú de compartir de tu dispositivo</p>
          )}
        </div>
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
            <span>
              {isExporting === 'image' ? 'Exportando...' : (isMobileDevice ? 'Compartir Imagen' : 'Imagen')}
            </span>
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
            <span>
              {isExporting === 'pdf' ? 'Exportando...' : (isMobileDevice ? 'Compartir PDF' : 'PDF')}
            </span>
          </motion.button>
        </div>

        {/* Botón para nueva recomendación */}
        {onNewRecommendation && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewRecommendation}
            className="mt-4 inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm md:text-base font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-xl border border-slate-300 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
            <span>Hacer otra recomendación</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default RecommendationResult;