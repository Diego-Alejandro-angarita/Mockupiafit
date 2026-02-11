import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventsScreenProps {
  onBack: () => void;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  image: string;
  organizer: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Conferencia de IA y Tecnología',
    date: '2026-02-15',
    time: '2:00 PM - 4:00 PM',
    location: 'Auditorio Principal',
    category: 'Tecnología',
    description: 'Conferencia sobre las últimas tendencias en Inteligencia Artificial y su impacto en la industria.',
    attendees: 87,
    maxAttendees: 150,
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBldmVudHxlbnwxfHx8fDE3NzA4MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'Departamento de Ingeniería'
  },
  {
    id: '2',
    title: 'Feria de Emprendimiento',
    date: '2026-02-18',
    time: '10:00 AM - 5:00 PM',
    location: 'Plaza Central',
    category: 'Emprendimiento',
    description: '展览会 de proyectos emprendedores de estudiantes y networking con inversionistas.',
    attendees: 124,
    maxAttendees: 200,
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBldmVudHxlbnwxfHx8fDE3NzA4MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'Centro de Emprendimiento'
  },
  {
    id: '3',
    title: 'Taller de Investigación Científica',
    date: '2026-02-20',
    time: '3:00 PM - 5:30 PM',
    location: 'Sala de Seminarios - Bloque 26',
    category: 'Investigación',
    description: 'Taller práctico sobre metodología de investigación y escritura de papers académicos.',
    attendees: 23,
    maxAttendees: 30,
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBldmVudHxlbnwxfHx8fDE3NzA4MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'Centro de Investigación'
  },
  {
    id: '4',
    title: 'Concierto de la Orquesta EAFIT',
    date: '2026-02-22',
    time: '7:00 PM - 9:00 PM',
    location: 'Teatro EAFIT',
    category: 'Cultural',
    description: 'Presentación especial de la Orquesta Sinfónica de la Universidad EAFIT.',
    attendees: 156,
    maxAttendees: 300,
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBldmVudHxlbnwxfHx8fDE3NzA4MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'Departamento Cultural'
  },
  {
    id: '5',
    title: 'Hackathon EAFIT 2026',
    date: '2026-02-25',
    time: '8:00 AM - 8:00 PM',
    location: 'Laboratorios - Bloque 19',
    category: 'Tecnología',
    description: 'Competencia de programación de 12 horas. Forma tu equipo y desarrolla soluciones innovadoras.',
    attendees: 64,
    maxAttendees: 80,
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBldmVudHxlbnwxfHx8fDE3NzA4MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'IEEE EAFIT'
  },
  {
    id: '6',
    title: 'Feria de Internacionalización',
    date: '2026-03-01',
    time: '9:00 AM - 4:00 PM',
    location: 'Edificio Administrativo',
    category: 'Académico',
    description: 'Conoce programas de intercambio, becas internacionales y oportunidades de movilidad.',
    attendees: 45,
    maxAttendees: 100,
    image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBldmVudHxlbnwxfHx8fDE3NzA4MjUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'Oficina de Relaciones Internacionales'
  }
];

const categories = ['Todos', 'Tecnología', 'Emprendimiento', 'Investigación', 'Cultural', 'Académico'];

export function EventsScreen({ onBack }: EventsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredEvents = selectedCategory === 'Todos'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return {
      day: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Tecnología': 'bg-blue-100 text-blue-700',
      'Emprendimiento': 'bg-green-100 text-green-700',
      'Investigación': 'bg-purple-100 text-purple-700',
      'Cultural': 'bg-pink-100 text-pink-700',
      'Académico': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg">Eventos y Seminarios</h1>
              <p className="text-xs text-blue-200">Próximas actividades en el campus</p>
            </div>
            <button className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-yellow-500">
              <Calendar className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-blue-700 text-white hover:bg-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map(event => {
            const { day, month } = formatDate(event.date);
            const percentFull = event.maxAttendees
              ? Math.round((event.attendees / event.maxAttendees) * 100)
              : 0;

            return (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-primary rounded-lg p-2 shadow-lg">
                    <div className="text-center">
                      <div className="text-xs">{month}</div>
                      <div className="text-2xl leading-none">{day}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {event.attendees}
                        {event.maxAttendees && ` / ${event.maxAttendees}`} asistentes
                      </span>
                    </div>
                  </div>

                  {event.maxAttendees && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Cupos disponibles</span>
                        <span className="text-primary">{percentFull}% lleno</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-accent rounded-full h-2 transition-all"
                          style={{ width: `${percentFull}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mb-3">
                    Organizado por: {event.organizer}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-800 text-sm flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Registrarse
                    </button>
                    <button className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg hover:bg-yellow-500 text-sm flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Añadir a calendario
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-muted-foreground">No hay eventos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}
