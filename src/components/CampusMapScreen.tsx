import { useState, useMemo } from 'react';
import { ArrowLeft, Navigation, ZoomIn, ZoomOut, Search, MapPin, Coffee, Utensils, ParkingCircle, DollarSign, Info, Building2, BookOpen, Users, Home, X, Filter, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface CampusMapScreenProps {
  onBack: () => void;
}

type LocationType = 'academic' | 'library' | 'food' | 'admin' | 'services' | 'sports' | 'arts' | 'entrance' | 'parking' | 'atm' | 'restroom' | 'plaza';

interface Building {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: LocationType;
  description: string;
  services?: string[];
  floor?: number;
}

interface PointOfInterest {
  id: string;
  name: string;
  x: number;
  y: number;
  type: LocationType;
  description: string;
}

const buildings: Building[] = [
  { 
    id: 'bloque-38', 
    name: 'Bloque 38', 
    x: 280, 
    y: 120, 
    width: 100, 
    height: 70, 
    type: 'academic',
    description: 'Edificio principal de ingeniería y ciencias',
    services: ['Aulas', 'Laboratorios', 'Oficinas'],
    floor: 8
  },
  { 
    id: 'bloque-19', 
    name: 'Bloque 19', 
    x: 150, 
    y: 220, 
    width: 90, 
    height: 70, 
    type: 'academic',
    description: 'Facultad de Administración',
    services: ['Aulas', 'Salas de estudio', 'Cafetería'],
    floor: 5
  },
  { 
    id: 'bloque-26', 
    name: 'Bloque 26', 
    x: 420, 
    y: 200, 
    width: 85, 
    height: 75, 
    type: 'academic',
    description: 'Facultad de Derecho',
    services: ['Aulas', 'Biblioteca sectorial'],
    floor: 6
  },
  { 
    id: 'bloque-27', 
    name: 'Bloque 27', 
    x: 250, 
    y: 420, 
    width: 80, 
    height: 65, 
    type: 'academic',
    description: 'Aulas y laboratorios',
    services: ['Aulas', 'Laboratorios'],
    floor: 4
  },
  { 
    id: 'bloque-32', 
    name: 'Bloque 32', 
    x: 150, 
    y: 340, 
    width: 75, 
    height: 60, 
    type: 'academic',
    description: 'Escuela de Humanidades',
    services: ['Aulas', 'Oficinas de profesores'],
    floor: 4
  },
  { 
    id: 'biblioteca', 
    name: 'Biblioteca Luis Echavarría Villegas', 
    x: 540, 
    y: 150, 
    width: 110, 
    height: 100, 
    type: 'library',
    description: 'Biblioteca central con amplios recursos',
    services: ['Préstamo de libros', 'Salas de estudio', 'Computadores', 'WiFi'],
    floor: 7
  },
  { 
    id: 'centro-artes', 
    name: 'Centro de Artes', 
    x: 100, 
    y: 100, 
    width: 95, 
    height: 75, 
    type: 'arts',
    description: 'Espacios culturales y artísticos',
    services: ['Auditorio', 'Salas de exposición', 'Talleres'],
    floor: 3
  },
  { 
    id: 'edificio-admisiones', 
    name: 'Admisiones y Registro', 
    x: 450, 
    y: 320, 
    width: 90, 
    height: 70, 
    type: 'admin',
    description: 'Servicios administrativos y registro',
    services: ['Inscripciones', 'Certificados', 'Información'],
    floor: 3
  },
  { 
    id: 'cafeteria-central', 
    name: 'Cafetería Central', 
    x: 360, 
    y: 340, 
    width: 75, 
    height: 60, 
    type: 'food',
    description: 'Principal zona de alimentación',
    services: ['Comidas', 'Bebidas', 'Snacks'],
    floor: 2
  },
  { 
    id: 'restaurante-campus', 
    name: 'Restaurante Campus', 
    x: 560, 
    y: 380, 
    width: 70, 
    height: 55, 
    type: 'food',
    description: 'Restaurante universitario',
    services: ['Almuerzos', 'Menú ejecutivo'],
    floor: 1
  },
  { 
    id: 'coliseo', 
    name: 'Coliseo', 
    x: 90, 
    y: 430, 
    width: 85, 
    height: 70, 
    type: 'sports',
    description: 'Instalaciones deportivas',
    services: ['Gimnasio', 'Canchas', 'Clases deportivas'],
    floor: 2
  },
  { 
    id: 'bloque-servicios', 
    name: 'Centro de Servicios', 
    x: 380, 
    y: 80, 
    width: 80, 
    height: 60, 
    type: 'services',
    description: 'Servicios estudiantiles',
    services: ['Bienestar', 'Salud', 'Orientación'],
    floor: 2
  },
];

const pointsOfInterest: PointOfInterest[] = [
  { id: 'entrada-principal', name: 'Entrada Principal', x: 50, y: 250, type: 'entrance', description: 'Acceso principal al campus' },
  { id: 'entrada-vehicular', name: 'Entrada Vehicular', x: 50, y: 400, type: 'entrance', description: 'Ingreso para vehículos' },
  { id: 'parqueadero-norte', name: 'Parqueadero Norte', x: 670, y: 100, type: 'parking', description: 'Zona de parqueo norte' },
  { id: 'parqueadero-sur', name: 'Parqueadero Sur', x: 650, y: 450, type: 'parking', description: 'Zona de parqueo sur' },
  { id: 'parqueadero-central', name: 'Parqueadero Central', x: 320, y: 280, type: 'parking', description: 'Parqueadero principal' },
  { id: 'cajero-biblioteca', name: 'Cajero Automático (Biblioteca)', x: 520, y: 270, type: 'atm', description: 'Cajero disponible 24/7' },
  { id: 'cajero-cafeteria', name: 'Cajero Automático (Cafetería)', x: 340, y: 410, type: 'atm', description: 'Cajero en zona de cafetería' },
  { id: 'plaza-principal', name: 'Plaza Principal', x: 360, y: 250, type: 'plaza', description: 'Área de reunión central' },
  { id: 'plaza-eventos', name: 'Plaza de Eventos', x: 200, y: 160, type: 'plaza', description: 'Zona para eventos al aire libre' },
  { id: 'cafe-38', name: 'Café Bloque 38', x: 260, y: 140, type: 'food', description: 'Cafetería en Bloque 38' },
  { id: 'cafe-biblioteca', name: 'Café Biblioteca', x: 580, y: 250, type: 'food', description: 'Café en biblioteca' },
];

const categories = [
  { id: 'all', name: 'Todos', icon: MapIcon, color: '#003366' },
  { id: 'academic', name: 'Académico', icon: Building2, color: '#003366' },
  { id: 'library', name: 'Biblioteca', icon: BookOpen, color: '#8B4513' },
  { id: 'food', name: 'Alimentación', icon: Utensils, color: '#FFB800' },
  { id: 'admin', name: 'Administrativo', icon: Users, color: '#2C3E50' },
  { id: 'services', name: 'Servicios', icon: Info, color: '#27AE60' },
  { id: 'sports', name: 'Deportes', icon: Home, color: '#E74C3C' },
  { id: 'arts', name: 'Artes y Cultura', icon: Users, color: '#9B59B6' },
  { id: 'parking', name: 'Parqueaderos', icon: ParkingCircle, color: '#7F8C8D' },
  { id: 'atm', name: 'Cajeros', icon: DollarSign, color: '#16A085' },
];

export function CampusMapScreen({ onBack }: CampusMapScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [showFilters, setShowFilters] = useState(false);

  // Combinar todos los lugares para búsqueda
  const allLocations = useMemo(() => {
    const buildingLocations = buildings.map(b => ({ ...b, isBuilding: true }));
    const poiLocations = pointsOfInterest.map(p => ({ ...p, isBuilding: false, width: 0, height: 0 }));
    return [...buildingLocations, ...poiLocations];
  }, []);

  // Filtrar por búsqueda
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return allLocations.filter(loc => 
      loc.name.toLowerCase().includes(term) || 
      loc.type.toLowerCase().includes(term) ||
      loc.description.toLowerCase().includes(term)
    ).slice(0, 6);
  }, [searchTerm, allLocations]);

  // Filtrar por categorías
  const filteredBuildings = useMemo(() => {
    if (selectedCategories.includes('all')) return buildings;
    return buildings.filter(b => selectedCategories.includes(b.type));
  }, [selectedCategories]);

  const filteredPOIs = useMemo(() => {
    if (selectedCategories.includes('all')) return pointsOfInterest;
    return pointsOfInterest.filter(p => selectedCategories.includes(p.type));
  }, [selectedCategories]);

  const getTypeColor = (type: LocationType) => {
    const category = categories.find(c => c.id === type);
    return category?.color || '#003366';
  };

  const getTypeLabel = (type: LocationType) => {
    const category = categories.find(c => c.id === type);
    return category?.name || type;
  };

  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.filter(c => c !== 'all');
      if (selectedCategories.includes(categoryId)) {
        const filtered = newCategories.filter(c => c !== categoryId);
        setSelectedCategories(filtered.length === 0 ? ['all'] : filtered);
      } else {
        setSelectedCategories([...newCategories, categoryId]);
      }
    }
  };

  const selectedLocationData = allLocations.find(l => l.id === selectedLocation);

  const handleSearchSelect = (location: typeof allLocations[0]) => {
    setSelectedLocation(location.id);
    setSearchTerm('');
    setShowSearch(false);
    // Zoom into the location
    setZoom(1.5);
  };

  const quickActions = [
    { id: 'parking', label: 'Parqueaderos', icon: ParkingCircle, action: () => { setSelectedCategories(['parking']); setShowFilters(false); } },
    { id: 'food', label: 'Cafeterías', icon: Coffee, action: () => { setSelectedCategories(['food']); setShowFilters(false); } },
    { id: 'atm', label: 'Cajeros', icon: DollarSign, action: () => { setSelectedCategories(['atm']); setShowFilters(false); } },
    { id: 'library', label: 'Biblioteca', icon: BookOpen, action: () => { 
      setSelectedLocation('biblioteca'); 
      setZoom(1.5); 
    }},
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="hover:bg-blue-700 text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Mapa del Campus EAFIT</h1>
              <p className="text-sm text-blue-200">Navegación interactiva</p>
            </div>
            <Button
              onClick={() => setShowSearch(!showSearch)}
              variant="ghost"
              size="icon"
              className="hover:bg-blue-700 text-white"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="ghost"
              size="icon"
              className="hover:bg-blue-700 text-white relative"
            >
              <Filter className="w-5 h-5" />
              {!selectedCategories.includes('all') && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs font-bold rounded-full flex items-center justify-center">
                  {selectedCategories.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-700 border-t border-blue-600"
            >
              <div className="max-w-7xl mx-auto p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar bloque, aula, servicio..."
                    className="pl-10 pr-10 bg-white"
                    autoFocus
                  />
                  {searchTerm && (
                    <Button
                      onClick={() => setSearchTerm('')}
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-white rounded-lg shadow-xl max-h-80 overflow-y-auto"
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearchSelect(result)}
                        className="w-full p-3 hover:bg-gray-50 transition-colors flex items-start gap-3 text-left border-b last:border-b-0"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getTypeColor(result.type) }}
                        >
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{result.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{result.description}</p>
                          <Badge variant="secondary" className="mt-1">
                            {getTypeLabel(result.type)}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {searchTerm && searchResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 bg-white rounded-lg p-4 text-center text-gray-600"
                  >
                    No se encontraron resultados para "{searchTerm}"
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-700 border-t border-blue-600"
            >
              <div className="max-w-7xl mx-auto p-4">
                <h3 className="text-sm font-semibold mb-3">Filtrar por categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <Button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        variant={isSelected ? "secondary" : "outline"}
                        size="sm"
                        className={`${
                          isSelected 
                            ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                            : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {cat.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Quick Actions Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  onClick={action.action}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-auto">
          <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Map */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] lg:h-[700px] flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Mapa Interactivo</CardTitle>
                        <CardDescription>
                          {selectedCategories.includes('all') 
                            ? 'Mostrando todas las ubicaciones' 
                            : `Filtrando: ${selectedCategories.map(c => getTypeLabel(c as LocationType)).join(', ')}`
                          }
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {Math.round(zoom * 100)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* SVG Map */}
                    <div className="flex-1 overflow-auto bg-gray-50">
                      <div className="p-4 min-w-[700px]">
                        <svg
                          viewBox="0 0 720 550"
                          className="w-full h-auto"
                          style={{ 
                            transform: `scale(${zoom})`, 
                            transformOrigin: 'center',
                            transition: 'transform 0.3s ease-out'
                          }}
                        >
                          {/* Background */}
                          <defs>
                            <linearGradient id="campusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#E8F5E9" />
                              <stop offset="100%" stopColor="#C8E6C9" />
                            </linearGradient>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#A5D6A7" strokeWidth="0.5" opacity="0.3" />
                            </pattern>
                          </defs>
                          <rect width="720" height="550" fill="url(#campusGradient)" />
                          <rect width="720" height="550" fill="url(#grid)" />

                          {/* Campus boundary */}
                          <rect x="30" y="30" width="660" height="490" fill="none" stroke="#003366" strokeWidth="3" strokeDasharray="10,5" opacity="0.3" />

                          {/* Roads */}
                          <rect x="30" y="240" width="660" height="25" fill="#95A5A6" opacity="0.6" />
                          <rect x="340" y="30" width="25" height="490" fill="#95A5A6" opacity="0.6" />
                          <line x1="220" y1="30" x2="220" y2="550" stroke="#BDC3C7" strokeWidth="15" opacity="0.4" />
                          <line x1="480" y1="30" x2="480" y2="550" stroke="#BDC3C7" strokeWidth="15" opacity="0.4" />

                          {/* Green areas / Plazas */}
                          <circle cx="360" cy="250" r="45" fill="#81C784" opacity="0.4" />
                          <text x="360" y="255" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2E7D32">Plaza Principal</text>
                          
                          <ellipse cx="200" cy="160" rx="50" ry="30" fill="#81C784" opacity="0.4" />
                          <text x="200" y="165" textAnchor="middle" fontSize="10" fill="#2E7D32">Plaza Eventos</text>

                          {/* Buildings */}
                          {filteredBuildings.map((building) => {
                            const isSelected = building.id === selectedLocation;
                            return (
                              <motion.g 
                                key={building.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <rect
                                  x={building.x}
                                  y={building.y}
                                  width={building.width}
                                  height={building.height}
                                  fill={getTypeColor(building.type)}
                                  stroke={isSelected ? '#FFB800' : '#003366'}
                                  strokeWidth={isSelected ? 4 : 2}
                                  className="cursor-pointer hover:opacity-80 transition-all"
                                  onClick={() => setSelectedLocation(building.id)}
                                  rx="4"
                                />
                                {/* Building shadow */}
                                <rect
                                  x={building.x + 3}
                                  y={building.y + 3}
                                  width={building.width}
                                  height={building.height}
                                  fill="black"
                                  opacity="0.1"
                                  className="pointer-events-none"
                                  rx="4"
                                />
                                <text
                                  x={building.x + building.width / 2}
                                  y={building.y + building.height / 2 - 5}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fontSize="12"
                                  fontWeight="bold"
                                  fill="white"
                                  className="pointer-events-none"
                                >
                                  {building.name}
                                </text>
                                {building.floor && (
                                  <text
                                    x={building.x + building.width / 2}
                                    y={building.y + building.height / 2 + 10}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="9"
                                    fill="white"
                                    opacity="0.8"
                                    className="pointer-events-none"
                                  >
                                    {building.floor} pisos
                                  </text>
                                )}
                                {isSelected && (
                                  <>
                                    <circle
                                      cx={building.x + building.width / 2}
                                      cy={building.y + building.height / 2}
                                      r="8"
                                      fill="#FFB800"
                                      className="animate-ping"
                                    />
                                    <circle
                                      cx={building.x + building.width / 2}
                                      cy={building.y + building.height / 2}
                                      r="6"
                                      fill="#FFB800"
                                    />
                                  </>
                                )}
                              </motion.g>
                            );
                          })}

                          {/* Points of Interest */}
                          {filteredPOIs.map((poi) => {
                            const isSelected = poi.id === selectedLocation;
                            const Icon = poi.type === 'parking' ? ParkingCircle : 
                                        poi.type === 'atm' ? DollarSign :
                                        poi.type === 'food' ? Coffee : MapPin;
                            return (
                              <motion.g 
                                key={poi.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                              >
                                <circle 
                                  cx={poi.x} 
                                  cy={poi.y} 
                                  r={isSelected ? 14 : 12} 
                                  fill={getTypeColor(poi.type)}
                                  stroke={isSelected ? '#FFB800' : 'white'}
                                  strokeWidth={isSelected ? 4 : 3}
                                  className="cursor-pointer hover:opacity-80 transition-all"
                                  onClick={() => setSelectedLocation(poi.id)}
                                />
                                <text 
                                  x={poi.x} 
                                  y={poi.y + 25} 
                                  textAnchor="middle" 
                                  fontSize="9" 
                                  fontWeight="500"
                                  fill="#003366"
                                  className="pointer-events-none"
                                >
                                  {poi.name}
                                </text>
                                {isSelected && (
                                  <circle
                                    cx={poi.x}
                                    cy={poi.y}
                                    r="18"
                                    fill="none"
                                    stroke="#FFB800"
                                    strokeWidth="2"
                                    className="animate-ping"
                                  />
                                )}
                              </motion.g>
                            );
                          })}

                          {/* Compass */}
                          <g transform="translate(650, 480)">
                            <circle r="25" fill="white" stroke="#003366" strokeWidth="2" opacity="0.9" />
                            <text y="-10" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#003366">N</text>
                            <line x1="0" y1="-15" x2="0" y2="-5" stroke="#E74C3C" strokeWidth="3" />
                            <text y="20" textAnchor="middle" fontSize="10" fill="#7F8C8D">S</text>
                            <text x="-15" y="5" textAnchor="middle" fontSize="10" fill="#7F8C8D">O</text>
                            <text x="15" y="5" textAnchor="middle" fontSize="10" fill="#7F8C8D">E</text>
                          </g>
                        </svg>
                      </div>
                    </div>

                    {/* Zoom Controls */}
                    <div className="border-t bg-white p-3">
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                          variant="outline"
                          size="sm"
                          disabled={zoom <= 0.5}
                        >
                          <ZoomOut className="w-4 h-4 mr-2" />
                          Alejar
                        </Button>
                        <Button
                          onClick={() => setZoom(1)}
                          variant="outline"
                          size="sm"
                        >
                          Restablecer
                        </Button>
                        <Button
                          onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                          variant="outline"
                          size="sm"
                          disabled={zoom >= 2}
                        >
                          <ZoomIn className="w-4 h-4 mr-2" />
                          Acercar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Location Info */}
                <AnimatePresence mode="wait">
                  {selectedLocationData ? (
                    <motion.div
                      key={selectedLocationData.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Badge 
                                className="mb-2"
                                style={{ backgroundColor: getTypeColor(selectedLocationData.type) }}
                              >
                                {getTypeLabel(selectedLocationData.type)}
                              </Badge>
                              <CardTitle className="text-xl">{selectedLocationData.name}</CardTitle>
                              <CardDescription className="mt-2">
                                {selectedLocationData.description}
                              </CardDescription>
                            </div>
                            <Button
                              onClick={() => setSelectedLocation(null)}
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {'services' in selectedLocationData && selectedLocationData.services && (
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Servicios disponibles</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedLocationData.services.map((service, idx) => (
                                  <Badge key={idx} variant="outline">
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <Separator />

                          <div className="space-y-2">
                            <Button className="w-full bg-primary hover:bg-blue-800">
                              <Navigation className="w-4 h-4 mr-2" />
                              Cómo llegar
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Info className="w-4 h-4 mr-2" />
                              Más información
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Explora el Campus</CardTitle>
                          <CardDescription>
                            Selecciona un edificio o punto de interés en el mapa para ver más detalles
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center py-8 text-gray-400">
                            <MapIcon className="w-16 h-16" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Leyenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-3">
                        {categories.filter(c => c.id !== 'all').map((category) => {
                          const Icon = category.icon;
                          return (
                            <div key={category.id} className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: category.color }}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium">{category.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total edificios</span>
                      <Badge variant="secondary">{buildings.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Puntos de interés</span>
                      <Badge variant="secondary">{pointsOfInterest.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Área del campus</span>
                      <Badge variant="secondary">~80 hectáreas</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
