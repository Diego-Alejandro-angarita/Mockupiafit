import { Search, MapPin, School, Coffee, Calendar, HelpCircle, MessageCircle, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

export default function Home({ user, onNavigate }: HomeProps) {
  const quickActions = [
    {
      id: 'map',
      title: 'Campus y Ubicación',
      description: 'Explora el mapa interactivo',
      icon: MapPin,
      color: 'bg-blue-500',
      screen: 'map' as Screen,
      image: 'https://images.unsplash.com/photo-1664273891579-22f28332f3c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwNzM1NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'classrooms',
      title: 'Aulas Disponibles',
      description: 'Encuentra espacios libres',
      icon: School,
      color: 'bg-green-500',
      screen: 'classrooms' as Screen,
      image: 'https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzcwNzk3MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'restaurants',
      title: 'Restaurantes',
      description: 'Cafeterías y comedores',
      icon: Coffee,
      color: 'bg-orange-500',
      screen: 'restaurants' as Screen,
      image: 'https://images.unsplash.com/photo-1763890763377-abd05301034d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwb3V0ZG9vciUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MDgyNTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'events',
      title: 'Eventos',
      description: 'Seminarios y actividades',
      icon: Calendar,
      color: 'bg-purple-500',
      screen: 'events' as Screen,
      image: 'https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc2VtaW5hciUyMGNvbmZlcmVuY2UlMjBldmVudHxlbnwxfHx8fDE3NzA4MjU2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const frequentQuestions = [
    '¿Dónde está el Bloque 38?',
    '¿Horario de la biblioteca?',
    '¿Cómo llegar a la cafetería central?',
    'Próximos eventos académicos'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#FFB800] text-2xl">E</span>
              </div>
              <div>
                <h1 className="text-2xl">Asistente EAFIT</h1>
                <p className="text-blue-200 text-sm">Bienvenido, {user.name}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-32">
        {/* Barra de búsqueda principal */}
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-2">
              <div className="flex items-center gap-3 px-4">
                <Search className="text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="¿Qué necesitas saber sobre EAFIT?"
                  className="flex-1 py-4 text-lg outline-none"
                  onFocus={() => onNavigate('chat')}
                />
                <button
                  onClick={() => onNavigate('chat')}
                  className="bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  <span>Preguntar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="mb-12">
          <h2 className="text-2xl text-gray-800 mb-6">Accesos Rápidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.screen)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={action.image}
                      alt={action.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute top-4 right-4 ${action.color} text-white p-3 rounded-xl shadow-lg`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg text-gray-800 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FFB800]/10 p-3 rounded-xl">
                <HelpCircle className="text-[#FFB800]" size={28} />
              </div>
              <h2 className="text-2xl text-gray-800">Preguntas Frecuentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {frequentQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate('chat')}
                  className="text-left p-4 border-2 border-gray-200 hover:border-[#003366] rounded-xl transition-all duration-200 hover:bg-blue-50 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 group-hover:text-[#003366]">{question}</span>
                    <MessageCircle className="text-gray-400 group-hover:text-[#FFB800]" size={18} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Información destacada */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Estado del Campus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#003366] to-[#004d99] text-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[160px] border-b-4 border-[#FFB800]">
              <div>
                <h3 className="text-lg opacity-90 mb-1 font-medium">Horario Biblioteca</h3>
                <p className="text-3xl font-bold mb-1">7:00 AM - 10:00 PM</p>
              </div>
              <p className="text-blue-200 text-sm mt-4">Lunes a Sábado • Bloque 32</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#FFB800] to-[#FFD700] text-[#003366] rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[160px] border-b-4 border-[#003366]">
              <div>
                <h3 className="text-lg opacity-90 mb-1 font-medium">Eventos Hoy</h3>
                <p className="text-3xl font-bold mb-1">5 Actividades</p>
              </div>
              <button onClick={() => onNavigate('events')} className="text-[#003366] font-bold text-sm mt-4 flex items-center gap-1 hover:translate-x-1 transition-transform">
                Ver calendario completo <span>→</span>
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[160px] sm:col-span-2 lg:col-span-1 border-b-4 border-emerald-700">
              <div>
                <h3 className="text-lg opacity-90 mb-1 font-medium">Aulas Disponibles</h3>
                <p className="text-3xl font-bold mb-1">23 Espacios</p>
              </div>
              <p className="text-emerald-50/80 text-sm mt-4">Consulta disponibilidad en tiempo real</p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-[#003366]"
            >
              <Search size={24} />
              <span className="text-xs">Inicio</span>
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-[#003366]"
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
