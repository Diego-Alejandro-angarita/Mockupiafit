import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Filter,
  Bell,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import type { User, Screen } from '../App';

interface AcademicCalendarProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'examen' | 'matricula' | 'evento' | 'cancelacion';
  location?: string;
  description: string;
}

export default function AcademicCalendar({ user, onNavigate }: AcademicCalendarProps) {
  const [currentMonth] = useState('Febrero 2026');
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Inicio de Clases',
      date: '2026-02-16',
      time: '07:00 AM',
      category: 'evento',
      location: 'Campus Principal',
      description: 'Inicio del semestre 2026-1'
    },
    {
      id: '2',
      title: 'Fecha límite de matrícula',
      date: '2026-02-20',
      time: '05:00 PM',
      category: 'matricula',
      description: 'Último día para realizar ajustes de matrícula'
    },
    {
      id: '3',
      title: 'Semana de Inducción',
      date: '2026-02-17',
      time: '08:00 AM',
      category: 'evento',
      location: 'Auditorio Principal',
      description: 'Programa de bienvenida para estudiantes nuevos'
    },
    {
      id: '4',
      title: 'Cancelación sin penalidad',
      date: '2026-03-15',
      time: '05:00 PM',
      category: 'cancelacion',
      description: 'Último día para cancelar materias sin penalidad'
    },
    {
      id: '5',
      title: 'Primer Parcial',
      date: '2026-03-24',
      time: '07:00 AM',
      category: 'examen',
      location: 'Bloques Académicos',
      description: 'Inicio de evaluaciones del primer corte'
    },
    {
      id: '6',
      title: 'Semana Santa',
      date: '2026-04-06',
      time: 'Todo el día',
      category: 'evento',
      description: 'Receso académico - No hay clases'
    },
    {
      id: '7',
      title: 'Segundo Parcial',
      date: '2026-04-27',
      time: '07:00 AM',
      category: 'examen',
      location: 'Bloques Académicos',
      description: 'Evaluaciones del segundo corte'
    },
    {
      id: '8',
      title: 'Exámenes Finales',
      date: '2026-05-25',
      time: '07:00 AM',
      category: 'examen',
      location: 'Bloques Académicos',
      description: 'Semana de exámenes finales del semestre'
    }
  ];

  const categoryColors = {
    examen: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' },
    matricula: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
    evento: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
    cancelacion: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' }
  };

  const categoryLabels = {
    examen: 'Examen',
    matricula: 'Matrícula',
    evento: 'Evento',
    cancelacion: 'Cancelación'
  };

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.category === selectedFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-[#FFB800] p-3 rounded-xl">
                  <CalendarIcon size={28} />
                </div>
                <div>
                  <h1 className="text-2xl">Calendario Académico</h1>
                  <p className="text-blue-200 text-sm">Semestre 2026-1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#FFB800] to-[#FFD700] rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Bell size={28} className="text-[#003366]" />
              </div>
              <div>
                <h2 className="text-xl text-[#003366]">Notificaciones</h2>
                <p className="text-[#003366]/70 text-sm">Recibe recordatorios de fechas importantes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#003366]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#003366]"></div>
            </label>
          </div>
          {notificationsEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-[#003366]/20"
            >
              <p className="text-sm text-[#003366] flex items-center gap-2">
                <CheckCircle2 size={16} />
                Recibirás notificaciones 24 horas antes de cada evento
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* View Toggle and Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'list' ? 'bg-[#003366] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'calendar' ? 'bg-[#003366] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Calendario
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter size={20} />
              <span className="text-sm">Filtrar por:</span>
            </div>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedFilter === key
                    ? 'bg-[#003366] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
              <h2 className="text-xl text-[#003366]">{currentMonth}</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 1;
                const hasEvent = filteredEvents.some((event) => {
                  const eventDay = new Date(event.date).getDate();
                  return eventDay === dayNumber;
                });
                return (
                  <div
                    key={i}
                    className={`aspect-square border-2 rounded-lg p-2 text-center text-sm ${
                      dayNumber > 0 && dayNumber <= 29
                        ? hasEvent
                          ? 'border-[#FFB800] bg-[#FFB800]/10 cursor-pointer hover:bg-[#FFB800]/20'
                          : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                        : 'border-transparent bg-gray-50'
                    }`}
                  >
                    {dayNumber > 0 && dayNumber <= 29 && (
                      <span className={hasEvent ? 'text-[#003366]' : 'text-gray-600'}>
                        {dayNumber}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredEvents.map((event) => {
              const colors = categoryColors[event.category];
              return (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${colors.border} hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl text-[#003366]">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text}`}>
                          {categoryLabels[event.category]}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <CalendarIcon size={16} />
                          <span>{new Date(event.date).toLocaleDateString('es-CO', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {notificationsEnabled && (
                      <button className="p-3 bg-[#FFB800]/10 hover:bg-[#FFB800]/20 rounded-lg transition-colors">
                        <Bell size={20} className="text-[#FFB800]" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#004d99] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
