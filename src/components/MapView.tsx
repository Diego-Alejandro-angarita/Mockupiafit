import { useState } from 'react';
import { ArrowLeft, Search, Navigation, MapPin, Building2, Coffee, BookOpen, Users, Calendar, MessageCircle, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';

interface MapViewProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

interface POI {
  id: string;
  name: string;
  type: 'building' | 'cafeteria' | 'library' | 'sports' | 'admin';
  x: number;
  y: number;
  description: string;
}

export default function MapView({ user, onNavigate }: MapViewProps) {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const pointsOfInterest: POI[] = [
    { id: 'b38', name: 'Bloque 38', type: 'building', x: 30, y: 40, description: 'Aulas de ingeniería' },
    { id: 'b26', name: 'Bloque 26', type: 'building', x: 50, y: 35, description: 'Administración y Negocios' },
    { id: 'b19', name: 'Bloque 19', type: 'building', x: 70, y: 45, description: 'Ciencias Básicas' },
    { id: 'bib', name: 'Biblioteca Carlos Gaviria', type: 'library', x: 45, y: 60, description: 'Biblioteca principal' },
    { id: 'caf1', name: 'Cafetería Central', type: 'cafeteria', x: 60, y: 55, description: 'Comedor principal' },
    { id: 'caf2', name: 'Café Bon Appetit', type: 'cafeteria', x: 35, y: 70, description: 'Cafetería y snacks' },
    { id: 'dep', name: 'Deportes', type: 'sports', x: 20, y: 75, description: 'Instalaciones deportivas' },
    { id: 'adm', name: 'Edificio de Posgrados', type: 'admin', x: 75, y: 30, description: 'Programas de posgrado' },
  ];

  const filteredPOIs = searchQuery
    ? pointsOfInterest.filter(poi => 
        poi.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pointsOfInterest;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'building': return Building2;
      case 'cafeteria': return Coffee;
      case 'library': return BookOpen;
      case 'sports': return Users;
      default: return MapPin;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'building': return '#003366';
      case 'cafeteria': return '#FFB800';
      case 'library': return '#10B981';
      case 'sports': return '#8B5CF6';
      default: return '#6B7280';
    }
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
            <div>
              <h1 className="text-xl">Mapa del Campus</h1>
              <p className="text-blue-200 text-sm">Universidad EAFIT - Medellín</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar edificios, cafeterías, servicios..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
              />
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Map Area */}
          <div className="flex-1 relative bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto h-full">
              {/* Interactive Map */}
              <div className="relative w-full h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-gray-200">
                {/* Map Background */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Campus paths */}
                  <path
                    d="M 10,50 L 90,50 M 50,10 L 50,90 M 30,30 L 70,70 M 70,30 L 30,70"
                    stroke="#E5E7EB"
                    strokeWidth="0.3"
                    fill="none"
                  />
                  
                  {/* Green areas */}
                  <ellipse cx="25" cy="25" rx="10" ry="8" fill="#D1FAE5" opacity="0.6" />
                  <ellipse cx="75" cy="75" rx="12" ry="10" fill="#D1FAE5" opacity="0.6" />
                  
                  {/* Buildings and POIs */}
                  {filteredPOIs.map((poi) => {
                    const Icon = getIconForType(poi.type);
                    const color = getColorForType(poi.type);
                    const isSelected = selectedPOI?.id === poi.id;
                    
                    return (
                      <g key={poi.id}>
                        {/* Selection indicator */}
                        {isSelected && (
                          <circle
                            cx={poi.x}
                            cy={poi.y}
                            r="4"
                            fill="none"
                            stroke="#FFB800"
                            strokeWidth="0.5"
                            opacity="0.6"
                          >
                            <animate
                              attributeName="r"
                              from="4"
                              to="6"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        
                        {/* POI marker */}
                        <circle
                          cx={poi.x}
                          cy={poi.y}
                          r="2.5"
                          fill={isSelected ? '#FFB800' : color}
                          className="cursor-pointer transition-all duration-200"
                          onClick={() => setSelectedPOI(poi)}
                          style={{
                            filter: isSelected ? 'drop-shadow(0 0 3px rgba(255, 184, 0, 0.8))' : 'none'
                          }}
                        />
                        
                        {/* Label */}
                        <text
                          x={poi.x}
                          y={poi.y - 4}
                          fontSize="2.5"
                          fill={color}
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                          style={{ fontWeight: isSelected ? 'bold' : 'normal' }}
                        >
                          {poi.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* My Location Button */}
                <button className="absolute bottom-4 right-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center border-2 border-[#003366] text-[#003366]">
                  <Navigation size={20} />
                </button>
              </div>

              {/* Legend */}
              <div className="mt-4 bg-white rounded-xl shadow-md p-4">
                <h3 className="text-sm text-gray-600 mb-3">Leyenda</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#003366]"></div>
                    <span className="text-sm text-gray-700">Edificios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#FFB800]"></div>
                    <span className="text-sm text-gray-700">Cafeterías</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#10B981]"></div>
                    <span className="text-sm text-gray-700">Biblioteca</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#8B5CF6]"></div>
                    <span className="text-sm text-gray-700">Deportes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#D1FAE5] border-2 border-[#10B981]"></div>
                    <span className="text-sm text-gray-700">Zonas verdes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* POI Details Panel */}
          {selectedPOI && (
            <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: getColorForType(selectedPOI.type) + '20' }}>
                    {(() => {
                      const Icon = getIconForType(selectedPOI.type);
                      return <Icon size={24} style={{ color: getColorForType(selectedPOI.type) }} />;
                    })()}
                  </div>
                  <button
                    onClick={() => setSelectedPOI(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-2xl text-gray-800 mb-2">{selectedPOI.name}</h2>
                <p className="text-gray-600">{selectedPOI.description}</p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#003366] hover:bg-[#004080] text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Navigation size={18} />
                  <span>Cómo llegar</span>
                </button>
                
                <button className="w-full bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  <span>Preguntar al asistente</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm text-gray-600 mb-3">Información adicional</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Horario: 7:00 AM - 10:00 PM</p>
                  <p>• Capacidad: Variable</p>
                  <p>• Accesibilidad: ✓</p>
                  <p>• WiFi disponible: ✓</p>
                </div>
              </div>
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
              className="flex flex-col items-center gap-1 px-4 py-2 text-[#003366]"
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
