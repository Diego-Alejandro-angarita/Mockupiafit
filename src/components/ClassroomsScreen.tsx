import { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Users, Clock } from 'lucide-react';

interface ClassroomsScreenProps {
  onBack: () => void;
}

interface Classroom {
  id: string;
  name: string;
  building: string;
  capacity: number;
  available: boolean;
  nextAvailable?: string;
  currentOccupant?: string;
  equipment: string[];
}

const classrooms: Classroom[] = [
  {
    id: '1',
    name: 'Aula 301',
    building: 'Bloque 19',
    capacity: 40,
    available: true,
    equipment: ['Proyector', 'Aire acondicionado', 'Pizarra digital']
  },
  {
    id: '2',
    name: 'Aula 205',
    building: 'Bloque 26',
    capacity: 30,
    available: true,
    equipment: ['Proyector', 'Aire acondicionado']
  },
  {
    id: '3',
    name: 'Aula 104',
    building: 'Bloque 38',
    capacity: 50,
    available: false,
    nextAvailable: '2:00 PM',
    currentOccupant: 'Cálculo II - Prof. García',
    equipment: ['Proyector', 'Aire acondicionado', 'Sistema de audio']
  },
  {
    id: '4',
    name: 'Laboratorio 201',
    building: 'Bloque 19',
    capacity: 25,
    available: true,
    equipment: ['Computadores', 'Proyector', 'Aire acondicionado']
  },
  {
    id: '5',
    name: 'Aula 402',
    building: 'Bloque 27',
    capacity: 35,
    available: false,
    nextAvailable: '4:00 PM',
    currentOccupant: 'Programación - Prof. Martínez',
    equipment: ['Proyector', 'Pizarra digital']
  },
  {
    id: '6',
    name: 'Sala de Seminarios',
    building: 'Bloque 26',
    capacity: 20,
    available: true,
    equipment: ['Proyector', 'Mesa de conferencias', 'Videoconferencia']
  },
  {
    id: '7',
    name: 'Aula 103',
    building: 'Bloque 38',
    capacity: 45,
    available: true,
    equipment: ['Proyector', 'Aire acondicionado']
  },
  {
    id: '8',
    name: 'Auditorio 1',
    building: 'Auditorio',
    capacity: 150,
    available: false,
    nextAvailable: 'Mañana 9:00 AM',
    currentOccupant: 'Conferencia de Ingeniería',
    equipment: ['Sistema de audio profesional', 'Proyector HD', 'Iluminación']
  }
];

export function ClassroomsScreen({ onBack }: ClassroomsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const buildings = ['all', ...new Set(classrooms.map(c => c.building))];

  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = filterBuilding === 'all' || classroom.building === filterBuilding;
    const matchesAvailability = filterAvailability === 'all' ||
                                (filterAvailability === 'available' && classroom.available) ||
                                (filterAvailability === 'occupied' && !classroom.available);
    
    return matchesSearch && matchesBuilding && matchesAvailability;
  });

  const availableCount = classrooms.filter(c => c.available).length;
  const occupiedCount = classrooms.length - availableCount;

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
              <h1 className="text-lg">Disponibilidad de Aulas</h1>
              <p className="text-xs text-blue-200">
                {availableCount} disponibles • {occupiedCount} ocupadas
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar aula o edificio..."
              className="flex-1 bg-transparent text-gray-700 focus:outline-none"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-3 space-y-2">
              <div>
                <label className="text-xs text-blue-200 block mb-1">Edificio</label>
                <select
                  value={filterBuilding}
                  onChange={(e) => setFilterBuilding(e.target.value)}
                  className="w-full bg-white text-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option value="all">Todos los edificios</option>
                  {buildings.filter(b => b !== 'all').map(building => (
                    <option key={building} value={building}>{building}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-blue-200 block mb-1">Disponibilidad</label>
                <select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                  className="w-full bg-white text-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                >
                  <option value="all">Todas</option>
                  <option value="available">Solo disponibles</option>
                  <option value="occupied">Solo ocupadas</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <div className="text-2xl">{availableCount}</div>
                <div className="text-sm text-muted-foreground">Disponibles</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <div className="text-2xl">{occupiedCount}</div>
                <div className="text-sm text-muted-foreground">Ocupadas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Classrooms List */}
        <div className="space-y-3">
          {filteredClassrooms.map(classroom => (
            <div
              key={classroom.id}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg">{classroom.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        classroom.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {classroom.available ? 'Disponible' : 'Ocupada'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {classroom.building}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {classroom.capacity} personas
                    </span>
                  </div>
                  {!classroom.available && (
                    <div className="text-sm mb-2">
                      <div className="text-muted-foreground">
                        Actualmente: <span className="text-foreground">{classroom.currentOccupant}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Clock className="w-4 h-4" />
                        Disponible desde: {classroom.nextAvailable}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {classroom.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-primary text-xs rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-800 text-sm">
                  Ver en mapa
                </button>
                {classroom.available && (
                  <button className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg hover:bg-yellow-500 text-sm">
                    Reservar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredClassrooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-muted-foreground">No se encontraron aulas con los filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  );
}
