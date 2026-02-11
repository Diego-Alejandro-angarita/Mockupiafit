import { useState } from 'react';
import { ArrowLeft, Navigation, ZoomIn, ZoomOut, Search } from 'lucide-react';

interface CampusMapScreenProps {
  onBack: () => void;
}

const buildings = [
  { id: 'bloque-19', name: 'Bloque 19', x: 150, y: 200, width: 80, height: 60, type: 'academic' },
  { id: 'bloque-26', name: 'Bloque 26', x: 280, y: 180, width: 70, height: 70, type: 'academic' },
  { id: 'bloque-38', name: 'Bloque 38', x: 180, y: 90, width: 90, height: 50, type: 'academic' },
  { id: 'biblioteca', name: 'Biblioteca', x: 400, y: 150, width: 100, height: 80, type: 'library' },
  { id: 'cafeteria-central', name: 'Cafetería Central', x: 320, y: 300, width: 70, height: 50, type: 'food' },
  { id: 'auditorio', name: 'Auditorio', x: 100, y: 320, width: 90, height: 60, type: 'event' },
  { id: 'admin', name: 'Edificio Administrativo', x: 450, y: 280, width: 80, height: 70, type: 'admin' },
  { id: 'bloque-27', name: 'Bloque 27', x: 250, y: 400, width: 75, height: 55, type: 'academic' },
];

const pointsOfInterest = [
  { id: 'entrada-principal', name: 'Entrada Principal', x: 50, y: 150, type: 'entrance' },
  { id: 'parqueadero-1', name: 'Parqueadero Norte', x: 500, y: 80, type: 'parking' },
  { id: 'parqueadero-2', name: 'Parqueadero Sur', x: 480, y: 420, type: 'parking' },
  { id: 'plaza-central', name: 'Plaza Central', x: 300, y: 250, type: 'plaza' },
];

export function CampusMapScreen({ onBack }: CampusMapScreenProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic':
        return '#003A70';
      case 'library':
        return '#8B4513';
      case 'food':
        return '#FFA500';
      case 'event':
        return '#9B59B6';
      case 'admin':
        return '#2C3E50';
      default:
        return '#003A70';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'academic':
        return 'Académico';
      case 'library':
        return 'Biblioteca';
      case 'food':
        return 'Comida';
      case 'event':
        return 'Eventos';
      case 'admin':
        return 'Administrativo';
      default:
        return type;
    }
  };

  const selectedBuildingData = buildings.find(b => b.id === selectedBuilding);

  const filteredBuildings = buildings.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg">Mapa del Campus</h1>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar edificio o ubicación..."
              className="flex-1 bg-transparent text-gray-700 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* Map Container */}
        <div className="absolute inset-0 overflow-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
              {/* SVG Map */}
              <div className="overflow-auto">
                <svg
                  viewBox="0 0 600 500"
                  className="w-full h-auto"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s' }}
                >
                  {/* Background */}
                  <rect width="600" height="500" fill="#E8F5E9" />

                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C8E6C9" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="600" height="500" fill="url(#grid)" />

                  {/* Roads */}
                  <rect x="40" y="140" width="20" height="220" fill="#95A5A6" />
                  <rect x="60" y="250" width="480" height="20" fill="#95A5A6" />

                  {/* Plaza Central */}
                  <circle cx="300" cy="250" r="30" fill="#FFD700" opacity="0.3" />
                  <text x="300" y="255" textAnchor="middle" fontSize="10" fill="#003A70">Plaza</text>

                  {/* Buildings */}
                  {buildings.map((building) => {
                    const isSelected = building.id === selectedBuilding;
                    const isFiltered = searchTerm && filteredBuildings.includes(building);
                    return (
                      <g key={building.id}>
                        <rect
                          x={building.x}
                          y={building.y}
                          width={building.width}
                          height={building.height}
                          fill={getTypeColor(building.type)}
                          stroke={isSelected ? '#FFC107' : '#003A70'}
                          strokeWidth={isSelected ? 4 : 2}
                          opacity={searchTerm && !isFiltered ? 0.3 : 1}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedBuilding(building.id)}
                        />
                        <text
                          x={building.x + building.width / 2}
                          y={building.y + building.height / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="10"
                          fill="white"
                          className="pointer-events-none"
                        >
                          {building.name}
                        </text>
                        {isSelected && (
                          <circle
                            cx={building.x + building.width / 2}
                            cy={building.y + building.height / 2}
                            r="5"
                            fill="#FFC107"
                            className="animate-ping"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Points of Interest */}
                  {pointsOfInterest.map((poi) => (
                    <g key={poi.id}>
                      <circle cx={poi.x} cy={poi.y} r="8" fill="#FFC107" stroke="#003A70" strokeWidth="2" />
                      <text x={poi.x} y={poi.y + 20} textAnchor="middle" fontSize="8" fill="#003A70">
                        {poi.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Zoom Controls */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-blue-800"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-gray-100 rounded-lg">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-blue-800"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-yellow-500"
                >
                  Restablecer
                </button>
              </div>
            </div>

            {/* Building Info */}
            {selectedBuildingData && (
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-1">{selectedBuildingData.name}</h3>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: getTypeColor(selectedBuildingData.type) }}
                    >
                      {getTypeLabel(selectedBuildingData.type)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedBuilding(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Este edificio alberga aulas, laboratorios y oficinas administrativas.
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Cómo llegar
                  </button>
                  <button className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg hover:bg-yellow-500">
                    Ver detalles
                  </button>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
              <h4 className="mb-3">Leyenda</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: '#003A70' }}></div>
                  <span className="text-sm">Académico</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: '#8B4513' }}></div>
                  <span className="text-sm">Biblioteca</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: '#FFA500' }}></div>
                  <span className="text-sm">Comida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: '#9B59B6' }}></div>
                  <span className="text-sm">Eventos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent border-2 border-primary"></div>
                  <span className="text-sm">Punto de interés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
