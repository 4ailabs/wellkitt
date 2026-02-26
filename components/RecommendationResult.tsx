
import React, { useRef, useState } from 'react';
import { Recommendation, Product } from '../types';
import { Sparkles, FileImage, FileText, Loader2, ShoppingCart, Clock, Zap, CheckCircle, Info, RefreshCw, ArrowRight } from 'lucide-react';
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

  const handleWhatsAppOrder = (rec: Recommendation) => {
    const productos = rec.product_ids
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean) as Product[];

    const mensaje = `🏥 *PEDIDO BASADO EN RECOMENDACIÓN AI - WELLKITT*

¡Hola! Me gustaría hacer un pedido basado en la recomendación personalizada de Wellkitt.

📊 *MI RECOMENDACIÓN:*
• *Kit:* ${rec.custom_kit_name || 'Kit Personalizado'}
• *Descripción:* ${rec.custom_kit_description || 'Recomendación personalizada'}

🛒 *PRODUCTOS RECOMENDADOS:*
${productos.map((p, i) => `${i + 1}. ${p.name} (${p.brand})`).join('\n')}

💡 *RAZÓN DE LA RECOMENDACIÓN:*
${rec.reasoning}

¿Podrían ayudarme a procesar este pedido? ¡Gracias! 🙏`;

    const whatsappUrl = `https://wa.me/525579076626?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const recommendedProducts = recommendation.product_ids
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const kitName = recommendation.custom_kit_name || 'Kit Personalizado';

  const handleExport = async (format: 'image' | 'pdf') => {
    if (!recommendationRef.current || isExporting) return;

    setIsExporting(format);

    try {
      const element = recommendationRef.current;
      await new Promise(resolve => setTimeout(resolve, 500));

      const isMobile = window.innerWidth <= 768;
      const scale = isMobile ? 2 : 3;

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('El canvas generado está vacío');
      }

      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const fileName = `wellkitt_recomendacion_${timestamp}`;

      if (format === 'image') {
        const imgData = canvas.toDataURL('image/png', 1.0);
        if (!imgData || imgData === 'data:,') throw new Error('No se pudo generar la imagen');

        if (isMobile && navigator.share) {
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
            await navigator.share({ files: [file], title: 'Wellkitt - Tu Recomendación', text: 'Mi recomendación personalizada de Wellkitt' });
          } catch (shareError: any) {
            if (shareError.name !== 'AbortError') {
              const link = document.createElement('a');
              link.href = imgData;
              link.download = `${fileName}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        } else {
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `${fileName}.png`;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => document.body.removeChild(link), 100);
        }

      } else {
        const imgData = canvas.toDataURL('image/png', 1.0);
        if (!imgData || imgData === 'data:,') throw new Error('No se pudo generar la imagen para el PDF');

        const canvasWidthPx = canvas.width;
        const canvasHeightPx = canvas.height;
        const pxToMm = 0.264583;
        const imgWidthMM = (canvasWidthPx * pxToMm) / scale;
        const imgHeightMM = (canvasHeightPx * pxToMm) / scale;
        const a4WidthMM = 210;
        const a4HeightMM = 297;
        const marginMM = 15;
        const maxWidthMM = a4WidthMM - (marginMM * 2);
        const maxHeightMM = a4HeightMM - (marginMM * 2);

        let finalWidthMM = imgWidthMM;
        let finalHeightMM = imgHeightMM;

        if (finalWidthMM > maxWidthMM || finalHeightMM > maxHeightMM) {
          const scaleRatio = Math.min(maxWidthMM / finalWidthMM, maxHeightMM / finalHeightMM);
          finalWidthMM *= scaleRatio;
          finalHeightMM *= scaleRatio;
        }

        const orientation = finalWidthMM > finalHeightMM ? 'landscape' : 'portrait';
        const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4', compress: true });
        const xPosition = (a4WidthMM - finalWidthMM) / 2;

        pdf.addImage(imgData, 'PNG', xPosition, marginMM, finalWidthMM, finalHeightMM, undefined, 'FAST');

        if (isMobile && navigator.share) {
          const pdfBlob = pdf.output('blob');
          const pdfFile = new File([pdfBlob], `${fileName}.pdf`, { type: 'application/pdf' });
          try {
            await navigator.share({ files: [pdfFile], title: 'Wellkitt - Tu Recomendación', text: 'Mi recomendación en PDF' });
          } catch (shareError: any) {
            if (shareError.name !== 'AbortError') pdf.save(`${fileName}.pdf`);
          }
        } else {
          pdf.save(`${fileName}.pdf`);
        }
      }

    } catch (error) {
      console.error('Error durante exportación:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert(`Error al exportar: ${errorMessage}`);
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="mt-12" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div ref={recommendationRef} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-brand-green-50 px-6 sm:px-8 py-6 sm:py-8 border-b border-brand-green-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-green-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900" style={{ fontFamily: 'Lora, serif' }}>
                {kitName}
              </h2>
              {recommendation.custom_kit_description && (
                <p className="text-sm text-slate-500 mt-1">{recommendation.custom_kit_description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6 sm:py-8">
          {/* Reasoning */}
          <p className="text-sm text-slate-600 leading-relaxed pl-4 border-l-2 border-brand-green-300 mb-8">
            {recommendation.reasoning}
          </p>

          {/* Products List */}
          <div className="space-y-3">
            {recommendedProducts.map((product, index) => {
              const productReason = recommendation.product_reasons?.find(pr => pr.product_id === product.id);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xs font-bold text-slate-400">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-slate-800 text-sm leading-snug">{product.name}</h4>
                      <span className="text-[10px] font-medium text-brand-green-700 bg-brand-green-50 px-2 py-0.5 rounded-full shrink-0 border border-brand-green-100">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{product.brand}</p>

                    {productReason?.key_benefit && (
                      <div className="flex items-start gap-1.5 mb-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-green-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 font-medium">{productReason.key_benefit}</p>
                      </div>
                    )}

                    {productReason?.reason && (
                      <div className="flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 italic">{productReason.reason}</p>
                      </div>
                    )}

                    {!productReason && product.benefits && product.benefits.length > 0 && (
                      <p className="text-xs text-slate-400 line-clamp-2">{product.benefits.slice(0, 2).join(', ')}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Synergy */}
          {recommendation.synergy_explanation && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-brand-green-600" />
                <h4 className="font-semibold text-slate-800 text-sm">Efecto Sinérgico</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{recommendation.synergy_explanation}</p>
            </div>
          )}

          {/* Usage + Timeline */}
          {(recommendation.usage_suggestion || recommendation.expected_timeline) && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendation.usage_suggestion && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-semibold text-slate-700">Cómo tomarlo</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{recommendation.usage_suggestion}</p>
                </div>
              )}
              {recommendation.expected_timeline && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand-green-500" />
                    <span className="text-xs font-semibold text-slate-700">Resultados esperados</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{recommendation.expected_timeline}</p>
                </div>
              )}
            </div>
          )}

          {/* CTA buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddRecommendationToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-brand-green-600 text-white text-sm font-semibold rounded-full hover:bg-brand-green-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar todo al carrito
              </button>
              <button
                onClick={() => handleWhatsAppOrder(recommendation)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors"
              >
                Pedir por WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions below the card */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport('image')}
            disabled={!!isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-500 bg-slate-50 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-40"
          >
            {isExporting === 'image' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileImage className="w-3.5 h-3.5" />}
            {isExporting === 'image' ? 'Exportando...' : (isMobileDevice ? 'Compartir Imagen' : 'Guardar Imagen')}
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={!!isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-500 bg-slate-50 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-40"
          >
            {isExporting === 'pdf' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
            {isExporting === 'pdf' ? 'Exportando...' : (isMobileDevice ? 'Compartir PDF' : 'Guardar PDF')}
          </button>
        </div>

        {onNewRecommendation && (
          <button
            onClick={onNewRecommendation}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Hacer otra recomendación
          </button>
        )}
      </div>
    </div>
  );
};

export default RecommendationResult;
