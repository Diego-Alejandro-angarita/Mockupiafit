import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Heart,
  Filter,
  MapPin,
  Calendar,
  Mail,
  ArrowLeft,
  X,
  Clock,
  User as UserIcon
} from 'lucide-react';
import type { User, Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudentGroupsProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface Group {
  id: string;
  name: string;
  category: 'investigacion' | 'cultural' | 'deportivo' | 'academico';
  description: string;
  image: string;
  members: number;
  contact: string;
  location: string;
  schedule: string;
  nextMeeting: string;
  coordinator: string;
  interested: boolean;
}

export default function StudentGroups({ user, onNavigate }: StudentGroupsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Semillero de Inteligencia Artificial',
      category: 'investigacion',
      description: 'Grupo de investigación enfocado en Machine Learning, Deep Learning y aplicaciones de IA en diferentes industrias.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 24,
      contact: 'ia.semillero@eafit.edu.co',
      location: 'Bloque 19 - Lab 304',
      schedule: 'Miércoles 4:00 PM - 6:00 PM',
      nextMeeting: '2026-02-14',
      coordinator: 'Dr. Carlos Rodríguez',
      interested: false
    },
    {
      id: '2',
      name: 'Grupo de Teatro Universitario',
      category: 'cultural',
      description: 'Espacio creativo para estudiantes interesados en las artes escénicas, improvisación y montajes teatrales.',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 18,
      contact: 'teatro@eafit.edu.co',
      location: 'Auditorio Principal',
      schedule: 'Lunes y Jueves 5:00 PM - 7:00 PM',
      nextMeeting: '2026-02-12',
      coordinator: 'Prof. Ana González',
      interested: false
    },
    {
      id: '3',
      name: 'Club de Fútbol EAFIT',
      category: 'deportivo',
      description: 'Equipo representativo de fútbol de la universidad. Entrenamientos regulares y participación en torneos interuniversitarios.',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 32,
      contact: 'futbol@eafit.edu.co',
      location: 'Canchas deportivas',
      schedule: 'Martes y Viernes 3:00 PM - 5:00 PM',
      nextMeeting: '2026-02-13',
      coordinator: 'Entrenador Miguel Pérez',
      interested: false
    },
    {
      id: '4',
      name: 'Blockchain & Fintech',
      category: 'investigacion',
      description: 'Semillero dedicado al estudio de tecnologías blockchain, criptomonedas y aplicaciones financieras tecnológicas.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 15,
      contact: 'blockchain@eafit.edu.co',
      location: 'Bloque 26 - Sala 201',
      schedule: 'Viernes 2:00 PM - 4:00 PM',
      nextMeeting: '2026-02-16',
      coordinator: 'Prof. Roberto Sánchez',
      interested: false
    },
    {
      id: '5',
      name: 'Taller de Fotografía',
      category: 'cultural',
      description: 'Grupo para aprender y practicar fotografía artística, documental y técnicas de edición profesional.',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 21,
      contact: 'fotografia@eafit.edu.co',
      location: 'Bloque 38 - Taller 102',
      schedule: 'Sábados 10:00 AM - 1:00 PM',
      nextMeeting: '2026-02-17',
      coordinator: 'Prof. Laura Martínez',
      interested: false
    },
    {
      id: '6',
      name: 'Club de Debate',
      category: 'academico',
      description: 'Desarrollo de habilidades de oratoria, argumentación y pensamiento crítico a través de debates formales.',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 19,
      contact: 'debate@eafit.edu.co',
      location: 'Bloque 34 - Aula 405',
      schedule: 'Miércoles 6:00 PM - 8:00 PM',
      nextMeeting: '2026-02-14',
      coordinator: 'Dra. Patricia López',
      interested: false
    },
    {
      id: '7',
      name: 'Equipo de Voleibol',
      category: 'deportivo',
      description: 'Equipo competitivo de voleibol femenino y masculino. Preparación para torneos interuniversitarios.',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 28,
      contact: 'voleibol@eafit.edu.co',
      location: 'Coliseo deportivo',
      schedule: 'Lunes y Miércoles 4:00 PM - 6:00 PM',
      nextMeeting: '2026-02-12',
      coordinator: 'Entrenadora Claudia Ramírez',
      interested: false
    },
    {
      id: '8',
      name: 'Emprendimiento e Innovación',
      category: 'academico',
      description: 'Espacio para desarrollar ideas de negocio, aprender sobre startups y conectar con el ecosistema emprendedor.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      members: 26,
      contact: 'emprendimiento@eafit.edu.co',
      location: 'Centro de Emprendimiento',
      schedule: 'Jueves 3:00 PM - 5:00 PM',
      nextMeeting: '2026-02-15',
      coordinator: 'Prof. Fernando Vargas',
      interested: false
    }
  ]);

  const categories = [
    { id: 'all', label: 'Todos', icon: Users },
    { id: 'investigacion', label: 'Investigación', icon: Users },
    { id: 'cultural', label: 'Cultural', icon: Users },
    { id: 'deportivo', label: 'Deportivo', icon: Users },
    { id: 'academico', label: 'Académico', icon: Users }
  ];

  const categoryColors = {
    investigacion: { bg: 'bg-blue-100', text: 'text-blue-700', badge: 'bg-blue-500' },
    cultural: { bg: 'bg-purple-100', text: 'text-purple-700', badge: 'bg-purple-500' },
    deportivo: { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-500' },
    academico: { bg: 'bg-orange-100', text: 'text-orange-700', badge: 'bg-orange-500' }
  };

  const categoryLabels = {
    investigacion: 'Investigación',
    cultural: 'Cultural',
    deportivo: 'Deportivo',
    academico: 'Académico'
  };

  const filteredGroups = selectedCategory === 'all' 
    ? groups 
    : groups.filter(group => group.category === selectedCategory);

  const handleInterest = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, interested: !group.interested }
        : group
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
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
                  <Users size={28} />
                </div>
                <div>
                  <h1 className="text-2xl">Grupos y Semilleros</h1>
                  <p className="text-blue-200 text-sm">Encuentra tu comunidad en EAFIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-[#003366]" />
              <h2 className="text-lg text-[#003366]">Filtrar por categoría</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#003366] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGroups.map((group) => {
            const colors = categoryColors[group.category];
            return (
              <motion.div
                key={group.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 right-4 ${colors.badge} text-white px-3 py-1 rounded-full text-sm`}>
                    {categoryLabels[group.category]}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl mb-1">{group.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <UserIcon size={16} />
                      <span>{group.members} miembros</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{group.description}</p>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInterest(group.id);
                    }}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                      group.interested
                        ? 'bg-[#003366] text-white'
                        : 'bg-[#FFB800] hover:bg-[#FFA000] text-[#003366]'
                    }`}
                  >
                    <Heart size={20} className={group.interested ? 'fill-current' : ''} />
                    <span>{group.interested ? 'Te interesa' : 'Me interesa'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredGroups.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <Users size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl text-gray-600 mb-2">No se encontraron grupos</h3>
            <p className="text-gray-500">Intenta con otra categoría</p>
          </motion.div>
        )}
      </div>

      {/* Group Detail Modal */}
      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGroup(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src={selectedGroup.image}
                  alt={selectedGroup.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className={`inline-block ${categoryColors[selectedGroup.category].badge} text-white px-3 py-1 rounded-full text-sm mb-3`}>
                    {categoryLabels[selectedGroup.category]}
                  </div>
                  <h2 className="text-3xl text-white mb-2">{selectedGroup.name}</h2>
                  <div className="flex items-center gap-2 text-white/90">
                    <UserIcon size={18} />
                    <span>{selectedGroup.members} miembros activos</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg text-[#003366] mb-2">Descripción</h3>
                  <p className="text-gray-600">{selectedGroup.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#003366] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Ubicación</p>
                      <p className="text-gray-800">{selectedGroup.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-[#003366] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Horario</p>
                      <p className="text-gray-800">{selectedGroup.schedule}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-[#003366] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Próxima reunión</p>
                      <p className="text-gray-800">
                        {new Date(selectedGroup.nextMeeting).toLocaleDateString('es-CO', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <UserIcon size={20} className="text-[#003366] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Coordinador</p>
                      <p className="text-gray-800">{selectedGroup.coordinator}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <Mail size={20} className="text-[#003366] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Contacto</p>
                      <p className="text-gray-800">{selectedGroup.contact}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleInterest(selectedGroup.id)}
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                      selectedGroup.interested
                        ? 'bg-[#003366] text-white'
                        : 'bg-[#FFB800] hover:bg-[#FFA000] text-[#003366]'
                    }`}
                  >
                    <Heart size={20} className={selectedGroup.interested ? 'fill-current' : ''} />
                    <span>{selectedGroup.interested ? 'Te interesa' : 'Me interesa'}</span>
                  </button>
                  <button
                    onClick={() => onNavigate('map')}
                    className="flex-1 py-3 rounded-lg border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin size={20} />
                    <span>Ver ubicación</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
