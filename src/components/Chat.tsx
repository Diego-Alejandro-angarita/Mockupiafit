import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, MapPin, Search, MessageCircle, Calendar, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';

interface ChatProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

export default function Chat({ user, onNavigate }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `¡Hola ${user.name}! Soy el Asistente Virtual de EAFIT. ¿En qué puedo ayudarte hoy?`,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        '¿Dónde está el Bloque 38?',
        'Horario de biblioteca',
        'Próximos eventos',
        'Aulas disponibles'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let responseText = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('bloque') || lowerMessage.includes('ubicación') || lowerMessage.includes('dónde')) {
      responseText = 'Puedo ayudarte a encontrar cualquier edificio en el campus. El Bloque 38 se encuentra en la zona norte, cerca de la biblioteca. ¿Te gustaría ver la ubicación en el mapa?';
      suggestions = ['Ver en mapa', 'Otros bloques', 'Cómo llegar'];
    } else if (lowerMessage.includes('biblioteca') || lowerMessage.includes('horario')) {
      responseText = 'La biblioteca Carlos Gaviria Díaz está abierta de Lunes a Viernes de 7:00 AM a 10:00 PM, y Sábados de 8:00 AM a 6:00 PM. ¿Necesitas saber sobre algún servicio específico?';
      suggestions = ['Salas de estudio', 'Préstamo de libros', 'Computadores disponibles'];
    } else if (lowerMessage.includes('evento') || lowerMessage.includes('seminario') || lowerMessage.includes('actividad')) {
      responseText = 'Tenemos varios eventos interesantes esta semana. Puedo mostrarte el calendario completo con conferencias, seminarios y actividades culturales. ¿Te gustaría verlos?';
      suggestions = ['Ver eventos', 'Eventos de hoy', 'Registrarme a un evento'];
    } else if (lowerMessage.includes('aula') || lowerMessage.includes('salón') || lowerMessage.includes('disponible')) {
      responseText = 'Actualmente hay 23 aulas disponibles en diferentes bloques. ¿Buscas alguna capacidad o ubicación específica?';
      suggestions = ['Ver aulas disponibles', 'Bloque específico', 'Reservar aula'];
    } else if (lowerMessage.includes('comida') || lowerMessage.includes('cafetería') || lowerMessage.includes('restaurante')) {
      responseText = 'Tenemos varias opciones de alimentación en el campus: Cafetería Central, Restaurante de Posgrados, y varias cafeterías distribuidas por los bloques. ¿Quieres ver horarios y ubicaciones?';
      suggestions = ['Ver restaurantes', 'Menú del día', 'Más cercano'];
    } else {
      responseText = 'Entiendo tu consulta. Puedo ayudarte con información sobre el campus, horarios, ubicaciones, eventos y mucho más. ¿Sobre qué tema te gustaría saber más?';
      suggestions = ['Ubicaciones', 'Eventos', 'Servicios', 'Aulas'];
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-[#003366]" />
              </div>
              <div>
                <h1 className="text-xl">Asistente EAFIT</h1>
                <p className="text-blue-200 text-sm">Siempre disponible para ayudarte</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#003366] text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-md'
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {message.suggestions && message.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 ml-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 bg-white border-2 border-[#FFB800] text-[#003366] rounded-full text-sm hover:bg-[#FFB800] hover:text-white transition-all duration-200 shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-5 py-3 shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
              <MapPin size={20} className="text-gray-600" />
            </button>
            
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
              <button className="text-gray-400 hover:text-[#003366] transition-colors">
                <Mic size={20} />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                inputText.trim()
                  ? 'bg-[#FFB800] hover:bg-[#FFA000] text-[#003366]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#003366]"
            >
              <Search size={24} />
              <span className="text-xs">Inicio</span>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-[#003366]"
            >
              <MessageCircle size={24} />
              <span className="text-xs">Asistente</span>
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#003366]"
            >
              <MapPin size={24} />
              <span className="text-xs">Mapa</span>
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#003366]"
            >
              <Calendar size={24} />
              <span className="text-xs">Eventos</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#003366]"
            >
              <User size={24} />
              <span className="text-xs">Perfil</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
