import { useState } from 'react';
import { ArrowLeft, Filter, Search, MapPin, Users, Clock, Calendar, MessageCircle, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';

interface ClassroomsProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

interface Classroom {
  id: string;
  name: string;
  building: string;
  capacity: number;
  available: boolean;
  nextAvailable?: string;
  features: string[];
  floor: number;
}

export default function Classrooms({ user, onNavigate }: ClassroomsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'occupied'>('all');
  const [filterCapacity, setFilterCapacity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const classrooms: Classroom[] = [
    { id: 'a1', name: '38-101', building: 'Bloque 38', capacity: 40, available: true, features: ['Proyector', 'AC', 'Pizarra'], floor: 1 },
    { id: 'a2', name: '38-205', building: 'Bloque 38', capacity: 35, available: false, nextAvailable: '14:00', features: ['Proyector', 'AC'], floor: 2 },
    { id: 'a3', name: '38-310', building: 'Bloque 38', capacity: 50, available: true, features: ['Proyector', 'AC', 'Pizarra', 'Sonido'], floor: 3 },
    { id: 'a4', name: '26-102', building: 'Bloque 26', capacity: 30, available: true, features: ['Proyector', 'AC'], floor: 1 },
    { id: 'a5', name: '26-201', building: 'Bloque 26', capacity: 45, available: false, nextAvailable: '16:00', features: ['Proyector', 'AC', 'Pizarra'], floor: 2 },
    { id: 'a6', name: '26-305', building: 'Bloque 26', capacity: 60, available: true, features: ['Proyector', 'AC', 'Pizarra', 'Sonido', 'Grabación'], floor: 3 },
    { id: 'a7', name: '19-104', building: 'Bloque 19', capacity: 25, available: true, features: ['Proyector', 'Pizarra'], floor: 1 },
    { id: 'a8', name: '19-208', building: 'Bloque 19', capacity: 30, available: false, nextAvailable: '15:30', features: ['Proyector', 'AC', 'Laboratorio'], floor: 2 },
    { id: 'a9', name: '19-312', building: 'Bloque 19', capacity: 40, available: true, features: ['Proyector', 'AC', 'Pizarra'], floor: 3 },
    { id: 'a10', name: '38-405', building: 'Bloque 38', capacity: 55, available: false, nextAvailable: '17:00', features: ['Proyector', 'AC', 'Pizarra', 'Sonido'], floor: 4 },
  ];

  const buildings = ['all', ...Array.from(new Set(classrooms.map(c => c.building)))];
  const capacities = ['all', '< 30', '30-50', '> 50'];

  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classroom.building.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBuilding = filterBuilding === 'all' || classroom.building === filterBuilding;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'available' && classroom.available) ||
                         (filterStatus === 'occupied' && !classroom.available);
    const matchesCapacity = filterCapacity === 'all' ||
                           (filterCapacity === '< 30' && classroom.capacity < 30) ||
                           (filterCapacity === '30-50' && classroom.capacity >= 30 && classroom.capacity <= 50) ||
                           (filterCapacity === '> 50' && classroom.capacity > 50);
    
    return matchesSearch && matchesBuilding && matchesStatus && matchesCapacity;
  });

  const availableCount = filteredClassrooms.filter(c => c.available).length;
  const occupiedCount = filteredClassrooms.filter(c => !c.available).length;

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
              <h1 className="text-xl">Aulas Disponibles</h1>
              <p className="text-blue-200 text-sm">Encuentra el espacio perfecto</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                showFilters ? 'bg-[#FFB800] text-[#003366]' : 'hover:bg-white/10'
              }`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 text-center">
              <p className="text-3xl mb-1">{availableCount}</p>
              <p className="text-sm text-green-100">Disponibles</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4 text-center">
              <p className="text-3xl mb-1">{occupiedCount}</p>
              <p className="text-sm text-red-100">Ocupadas</p>
            </div>
            <div className="bg-gradient-to-br from-[#003366] to-[#004080] text-white rounded-xl p-4 text-center">
              <p className="text-3xl mb-1">{classrooms.length}</p>
              <p className="text-sm text-blue-200">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Edificio</label>
              <select
                value={filterBuilding}
                onChange={(e) => setFilterBuilding(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
              >
                <option value="all">Todos los edificios</option>
                {buildings.slice(1).map(building => (
                  <option key={building} value={building}>{building}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Estado</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
                >
                  <option value="all">Todas</option>
                  <option value="available">Disponibles</option>
                  <option value="occupied">Ocupadas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Capacidad</label>
                <select
                  value={filterCapacity}
                  onChange={(e) => setFilterCapacity(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
                >
                  {capacities.map(capacity => (
                    <option key={capacity} value={capacity}>{capacity === 'all' ? 'Todas' : capacity + ' personas'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por número de aula o edificio..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
            />
          </div>
        </div>
      </div>

      {/* Classrooms List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClassrooms.map((classroom) => (
              <div
                key={classroom.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                  classroom.available ? 'border-green-200 hover:border-green-400' : 'border-red-200 hover:border-red-400'
                }`}
              >
                <div className={`p-4 ${classroom.available ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl text-gray-800 mb-1">{classroom.name}</h3>
                      <p className="text-sm text-gray-600">{classroom.building} - Piso {classroom.floor}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      classroom.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {classroom.available ? 'Disponible' : 'Ocupada'}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{classroom.capacity} personas</span>
                    </div>
                    {!classroom.available && classroom.nextAvailable && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock size={16} />
                        <span>Libre a las {classroom.nextAvailable}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Características</p>
                    <div className="flex flex-wrap gap-2">
                      {classroom.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#003366] hover:bg-[#004080] text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                      <MapPin size={14} />
                      <span>Ver en mapa</span>
                    </button>
                    {classroom.available && (
                      <button className="flex-1 bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] py-2 px-3 rounded-lg text-sm transition-colors">
                        Reservar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClassrooms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-2">No se encontraron aulas</p>
              <p className="text-gray-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
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
