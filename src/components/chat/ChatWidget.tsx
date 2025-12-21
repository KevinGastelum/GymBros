'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_RESPONSES: Record<string, string> = {
  'envio': '📦 ¡Envío gratis en pedidos mayores a $999 MXN! El tiempo de entrega es de 3-5 días hábiles dentro de México.',
  'devolucion': '🔄 Tienes 30 días para realizar devoluciones. El producto debe estar en su empaque original.',
  'talla': '📏 Consulta nuestra guía de tallas en cada página de producto. Si tienes dudas, te recomendamos una talla más grande.',
  'pago': '💳 Aceptamos tarjeta de crédito/débito, PayPal, y pago en tiendas de conveniencia (OXXO).',
  'puntos': '🎁 Ganas 1 punto por cada peso gastado. Acumula puntos para subir de nivel y obtener descuentos exclusivos.',
  'default': '¡Hola! 👋 Soy el asistente de GymBros. Puedo ayudarte con preguntas sobre envíos, devoluciones, tallas, pagos o nuestro programa de puntos. ¿En qué te puedo ayudar?'
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('envio') || lowerMessage.includes('envío') || lowerMessage.includes('entrega')) {
    return FAQ_RESPONSES.envio;
  }
  if (lowerMessage.includes('devolu') || lowerMessage.includes('cambio') || lowerMessage.includes('reembolso')) {
    return FAQ_RESPONSES.devolucion;
  }
  if (lowerMessage.includes('talla') || lowerMessage.includes('tamaño') || lowerMessage.includes('size')) {
    return FAQ_RESPONSES.talla;
  }
  if (lowerMessage.includes('pago') || lowerMessage.includes('pagar') || lowerMessage.includes('tarjeta') || lowerMessage.includes('oxxo')) {
    return FAQ_RESPONSES.pago;
  }
  if (lowerMessage.includes('punto') || lowerMessage.includes('lealtad') || lowerMessage.includes('recompensa')) {
    return FAQ_RESPONSES.puntos;
  }
  
  return FAQ_RESPONSES.default;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: FAQ_RESPONSES.default,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(input),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-background rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-h-[500px] bg-card border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-background">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-bold">Asistente GymBros</h3>
                  <p className="text-xs opacity-80">Respuesta instantánea</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                      msg.isBot
                        ? 'bg-secondary text-foreground'
                        : 'bg-primary text-background'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  type="submit"
                  className="p-2 bg-primary text-background rounded hover:brightness-110 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
