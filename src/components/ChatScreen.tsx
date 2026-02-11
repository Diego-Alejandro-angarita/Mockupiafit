import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MapPin, ArrowLeft, Bot, User } from 'lucide-react';

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: '¡Hola! Soy tu asistente virtual de EAFIT. ¿En qué puedo ayudarte hoy?',
    sender: 'bot',
    timestamp: new Date(),
    suggestions: [
      '¿Dónde está el Bloque 38?',
      'Aulas disponibles ahora',
      'Horario de cafeterías',
      'Próximos eventos'
    ]
  }
];

const botResponses: Record<string, string> = {
  'bloque 38': 'El Bloque 38 está ubicado en la zona norte del campus, cerca de la biblioteca. ¿Te gustaría que te muestre la ruta en el mapa?',
  'aulas disponibles': 'En este momento hay 15 aulas disponibles. Las más cercanas son: Aula 301 (Bloque 19), Aula 205 (Bloque 26) y Aula 104 (Bloque 38). ¿Te interesa alguna en particular?',
  'cafeterías': 'Nuestras cafeterías están abiertas en los siguientes horarios:\n\n• Cafetería Central: 7:00 AM - 7:00 PM\n• Café Jardín: 8:00 AM - 6:00 PM\n• Restaurante Administrativo: 12:00 PM - 3:00 PM',
  'eventos': 'Los próximos eventos esta semana son:\n\n• Conferencia de IA - Feb 15, 2:00 PM\n• Feria de Emprendimiento - Feb 18, 10:00 AM\n• Taller de Investigación - Feb 20, 3:00 PM',
  'default': 'Entiendo tu pregunta. Como asistente puedo ayudarte con información sobre el campus, aulas, restaurantes, eventos y servicios de EAFIT. ¿Podrías ser más específico?'
};

export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let responseText = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue('¿Dónde está el Bloque 38?');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg">Asistente IA EAFIT</h1>
              <p className="text-xs text-blue-200">En línea</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-accent text-primary'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  } flex flex-col`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('es-CO', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Suggestions */}
              {message.suggestions && (
                <div className="ml-11 mt-2 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-white border border-primary text-primary px-3 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <button
              onClick={toggleVoice}
              className={`p-3 rounded-xl transition-colors flex-shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-input-background rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="w-full px-4 py-3 bg-transparent focus:outline-none"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-3 bg-accent text-accent-foreground rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Ubicación compartida: Campus EAFIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
