
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

  const recommendedProducts = recommendation.product_ids
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean) as Product[];
    
  const kitName = recommendation.custom_kit_name || `Kit Personalizado`;

  const handleExport = async (format: 'image' | 'pdf') => {
    if (!recommendationRef.current || isExporting) return;
    setIsExporting(format);

    try {
      const canvas = await html2canvas(recommendationRef.current, {
        scale: 3, // Even higher scale for better quality
        useCORS: true,
        backgroundColor: null, // Capture the gradient background
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
    <div className="mt-8 animate-fade-in">
      <div ref={recommendationRef} className="bg-gradient-to-br from-brand-green-50 to-emerald-100 border-2 border-brand-green-500 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Sparkles className="w-10 h-10 text-brand-green-600"/>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-green-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Tu kit personalizado Wellkitt</h2>
              <p className="text-brand-green-800 mt-1">Basado en tus objetivos, aquí tienes nuestra recomendación:</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{kitName}</h3>
            {recommendation.custom_kit_description && <p className="text-slate-600 mb-4">{recommendation.custom_kit_description}</p>}
            
            <p className="text-slate-700 mb-6 border-l-4 border-brand-green-400 pl-4 italic">"{recommendation.reasoning}"</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-slate-800">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.brand}</p>
                  <p className="text-xs text-brand-green-700 mt-2 bg-brand-green-100 px-2 py-1 rounded-full inline-block">{product.category}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-brand-green-200 text-center">
                <p className="text-sm text-slate-600">¿Tienes dudas o quieres realizar tu pedido?</p>
                <div className="inline-flex items-center justify-center gap-2 mt-2 font-semibold text-brand-green-800">
                    <Phone className="w-5 h-5" />
                    <span>WhatsApp: +52 55 7907 6626</span>
                </div>
            </div>

          </div>
      </div>

      <div className="mt-6 pt-6 border-t border-brand-green-200 flex flex-col sm:flex-row items-center justify-center gap-4">
        <h4 className="font-semibold text-brand-green-800">¿Guardar o compartir?</h4>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(30,41,59,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExport('image')} 
            disabled={!!isExporting}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 text-base font-bold py-2.5 px-5 rounded-xl border-2 border-slate-300 hover:bg-slate-100 transition-all duration-300 disabled:bg-slate-200 disabled:cursor-not-allowed tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {isExporting === 'image' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <FileImage className="w-5 h-5" />
            )}
            <span>{isExporting === 'image' ? 'Exportando...' : 'Imagen'}</span>
          </motion.button>
           <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(30,41,59,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExport('pdf')} 
            disabled={!!isExporting}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 text-base font-bold py-2.5 px-5 rounded-xl border-2 border-slate-300 hover:bg-slate-100 transition-all duration-300 disabled:bg-slate-200 disabled:cursor-not-allowed tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {isExporting === 'pdf' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <FileText className="w-5 h-5" />
            )}
            <span>{isExporting === 'pdf' ? 'Exportando...' : 'PDF'}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;