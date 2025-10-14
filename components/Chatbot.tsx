import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FAQ_RESPONSES: { [key: string]: string } = {
  'horario': '🕐 Nuestro horario de atención es de Lunes a Viernes de 9:00 AM a 6:00 PM. ¿En qué más puedo ayudarte?',
  'envio': '📦 Realizamos envíos a toda la República Mexicana. El tiempo de entrega es de 3-5 días hábiles. ¿Necesitas algo más?',
  'pago': '💳 Aceptamos transferencia bancaria, depósito y pago contra entrega (CDMX). ¿Tienes otra pregunta?',
  'ubicacion': '📍 Estamos en Acapulco 36, Roma Norte, CDMX. ¿Deseas visitarnos o prefieres pedir por WhatsApp?',
  'tests': '🧬 Ofrecemos 2 tests: Test Endotelial (salud cardiovascular) y Test Nutrigenómico (respuesta genética a alimentos). Ambos son de 20 preguntas. ¿Te gustaría hacer alguno?',
  'sueroterapia': '💉 La sueroterapia es hidratación intravenosa con vitaminas y minerales. Mejora energía, sistema inmune y recuperación. ¿Quieres más detalles?',
  'carnilis': '⚡ Carnilis contiene L-Carnitina que mejora el metabolismo energético, transporta ácidos grasos y reduce la fatiga. Presentación: 60 cápsulas. ¿Te interesa?',
  'kits': '📦 Tenemos 8 kits estratégicos: Detox, Digestivo, Sueño, Energía, Mujer, Articulaciones, Inmune y Metabolismo. Cada uno con descuento especial. ¿Cuál te interesa?',
  'consulta': '👨‍⚕️ Puedes agendar una consulta personalizada. Nuestros expertos evaluarán tu caso y te recomendarán los mejores productos. ¿Deseas agendar?',
};

const QUICK_QUESTIONS = [
  { id: 'horario', text: '🕐 Horario de atención' },
  { id: 'envio', text: '📦 Información de envío' },
  { id: 'tests', text: '🧬 Tests disponibles' },
  { id: 'kits', text: '📦 Ver kits' },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: '¡Hola! 👋 Soy el asistente virtual de Wellkitt. ¿En qué puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleQuickQuestion = (questionId: string) => {
    const question = QUICK_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    // Agregar pregunta del usuario
    const userMessage: Message = {
      id: messages.length,
      text: question.text,
      isBot: false,
      timestamp: new Date(),
    };

    // Agregar respuesta del bot
    const botResponse: Message = {
      id: messages.length + 1,
      text: FAQ_RESPONSES[questionId] || 'Lo siento, no tengo esa información. ¿Quieres hablar con un asesor?',
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: messages.length,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Buscar respuesta automática
    const lowerInput = inputText.toLowerCase();
    let botResponse = '';

    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerInput.includes(key) || lowerInput.includes(key.replace('_', ' '))) {
        botResponse = response;
        break;
      }
    }

    // Si no encuentra respuesta automática
    if (!botResponse) {
      botResponse = '🤔 Interesante pregunta. Para darte la mejor respuesta, te recomiendo hablar directamente con uno de nuestros asesores por WhatsApp. ¿Te conecto?';
    }

    const botMessage: Message = {
      id: messages.length + 1,
      text: botResponse,
      isBot: true,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputText('');
  };

  const handleConnectWhatsApp = () => {
    const whatsappUrl = 'https://wa.me/525579076626?text=Hola! Tengo una consulta sobre Wellkitt.';
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Botón Flotante del Chat */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-4 md:right-6 z-40 bg-brand-green-600 text-white rounded-full p-4 shadow-2xl hover:bg-brand-green-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Chat de Ayuda"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana del Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed bottom-6 right-4 md:right-6 z-50 w-[calc(100%-2rem)] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-green-600 to-brand-green-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-brand-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>Asistente Wellkitt</h3>
                  <p className="text-xs text-green-100">Siempre disponible</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-brand-green-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isBot
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'bg-brand-green-600 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-400' : 'text-green-100'}`}>
                      {message.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preguntas Rápidas */}
            <div className="p-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Preguntas rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuickQuestion(q.id)}
                    className="text-xs bg-gray-100 hover:bg-brand-green-100 text-slate-700 hover:text-brand-green-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input y Botón de WhatsApp */}
            <div className="p-4 bg-white border-t border-gray-200 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-brand-green-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-brand-green-600 hover:bg-brand-green-700 text-white p-2 rounded-full transition-colors"
                  disabled={!inputText.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleConnectWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                Hablar con un Asesor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

