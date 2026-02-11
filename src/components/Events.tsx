import { useState } from 'react';
import { ArrowLeft, Search, Calendar as CalendarIcon, Clock, MapPin, Users, Plus, Filter, Calendar, MessageCircle, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventsProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

interface Event {
  id: string;
  title: string;
  type: 'conference' | 'seminar' | 'workshop' | 'cultural' | 'sports';
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacity: number;
  registered: number;
  description: string;
  image: string;
}

export default function Events({ user, onNavigate }: EventsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const events: Event[] = [
    {
      id: 'e1',
      title: 'Conferencia: Inteligencia Artificial en la Medicina',
      type: 'conference',
      date: '2026-02-15',
      time: '14:00 - 16:00',
      location: 'Auditorio Principal',
      organizer: 'Facultad de Medicina',
      capacity: 200,
      registered: 156,
      description: 'Exploraremos las últimas innovaciones en IA aplicada a la medicina moderna.',
      image: 'https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc2VtaW5hciUyMGNvbmZlcmVuY2UlMjBldmVudHxlbnwxfHx8fDE3NzA4MjU2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'e2',
      title: 'Taller: Desarrollo Web con React',
      type: 'workshop',
      date: '2026-02-12',
      time: '10:00 - 13:00',
      location: 'Laboratorio 38-201',
      organizer: 'Departamento de Ingeniería',
      capacity: 30,
      registered: 28,
      description: 'Taller práctico sobre desarrollo de aplicaciones web modernas con React.',
      image: 'https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzcwNzk3MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'e3',
      title: 'Seminario: Sostenibilidad Empresarial',
      type: 'seminar',
      date: '2026-02-13',
      time: '15:00 - 17:00',
      location: 'Bloque 26 - Sala 305',
      organizer: 'Escuela de Administración',
      capacity: 80,
      registered: 65,
      description: 'Estrategias para implementar prácticas sostenibles en las organizaciones.',
      image: 'https://images.unsplash.com/photo-1664273891579-22f28332f3c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwNzM1NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'e4',
      title: 'Festival Cultural EAFIT',
      type: 'cultural',
      date: '2026-02-16',
      time: '09:00 - 18:00',
      location: 'Plaza Central',
      organizer: 'Bienestar Universitario',
      capacity: 500,
      registered: 342,
      description: 'Día completo de actividades culturales, música, danza y arte.',
      image: 'https://images.unsplash.com/photo-1763890763377-abd05301034d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwb3V0ZG9vciUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MDgyNTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'e5',
      title: 'Torneo Interuniversitario de Fútbol',
      type: 'sports',
      date: '2026-02-14',
      time: '08:00 - 16:00',
      location: 'Canchas Deportivas',
      organizer: 'Deportes EAFIT',
      capacity: 300,
      registered: 180,
      description: 'Competencia deportiva con universidades de la región.',
      image: 'https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHN0dWR5JTIwc3BhY2V8ZW58MXx8fHwxNzcwODI1NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const types = ['all', 'conference', 'seminar', 'workshop', 'cultural', 'sports'];
  const typeLabels: Record<string, string> = {
    all: 'Todos',
    conference: 'Conferencias',
    seminar: 'Seminarios',
    workshop: 'Talleres',
    cultural: 'Culturales',
    sports: 'Deportivos'
  };

  const typeColors: Record<string, string> = {
    conference: 'bg-blue-500',
    seminar: 'bg-purple-500',
    workshop: 'bg-green-500',
    cultural: 'bg-orange-500',
    sports: 'bg-red-500'
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('es-CO', options);
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('es-CO', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1">
              <h1 className="text-xl">Eventos y Actividades</h1>
              <p className="text-blue-200 text-sm">{filteredEvents.length} eventos próximos</p>
            </div>
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
              className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
            >
              {viewMode === 'list' ? <CalendarIcon size={20} /> : <Filter size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-[#003366] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar eventos por título o ubicación..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Type Badge */}
                    <div className={`absolute top-4 left-4 ${typeColors[event.type]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {typeLabels[event.type]}
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 text-center shadow-lg">
                      <p className="text-2xl text-[#003366]">{new Date(event.date).getDate()}</p>
                      <p className="text-xs text-gray-600 uppercase">
                        {new Date(event.date).toLocaleDateString('es-CO', { month: 'short' })}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-2xl text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <CalendarIcon size={18} className="text-[#003366]" />
                        <div>
                          <p className="text-sm font-medium">{getDayOfWeek(event.date)}</p>
                          <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-[#003366]" />
                        <div>
                          <p className="text-sm font-medium">{event.time}</p>
                          <p className="text-xs text-gray-500">Horario</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-[#003366]" />
                        <div>
                          <p className="text-sm font-medium">{event.location}</p>
                          <p className="text-xs text-gray-500">Ubicación</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Users size={18} className="text-[#003366]" />
                        <div>
                          <p className="text-sm font-medium">{event.registered} / {event.capacity} registrados</p>
                          <p className="text-xs text-gray-500">
                            {Math.round((event.registered / event.capacity) * 100)}% de capacidad
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Organizador</p>
                      <p className="text-sm text-gray-700">{event.organizer}</p>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#FFB800] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#003366] hover:bg-[#004080] text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <Plus size={18} />
                        <span>Registrarme</span>
                      </button>
                      <button className="flex-1 bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <CalendarIcon size={18} />
                        <span>Añadir al calendario</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-2">No se encontraron eventos</p>
              <p className="text-gray-500 text-sm">Intenta con otra búsqueda o filtro</p>
            </div>
          )}
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
              className="flex flex-col items-center gap-1 px-4 py-2 text-[#003366]"
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
