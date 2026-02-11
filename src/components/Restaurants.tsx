import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Clock, Coffee, ChefHat, DollarSign, Star, Calendar, MessageCircle, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantsProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

interface Restaurant {
  id: string;
  name: string;
  type: string;
  location: string;
  hours: string;
  priceRange: string;
  rating: number;
  menu: string[];
  image: string;
  open: boolean;
}

export default function Restaurants({ user, onNavigate }: RestaurantsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const restaurants: Restaurant[] = [
    {
      id: 'r1',
      name: 'Cafetería Central',
      type: 'Comedor',
      location: 'Bloque Central',
      hours: '7:00 AM - 7:00 PM',
      priceRange: '$$',
      rating: 4.5,
      menu: ['Almuerzos completos', 'Desayunos', 'Snacks', 'Bebidas'],
      image: 'https://images.unsplash.com/photo-1763890763377-abd05301034d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwb3V0ZG9vciUyMHN0dWRlbnRzfGVufDF8fHx8MTc3MDgyNTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      open: true
    },
    {
      id: 'r2',
      name: 'Café Bon Appetit',
      type: 'Cafetería',
      location: 'Bloque 26',
      hours: '7:30 AM - 6:00 PM',
      priceRange: '$',
      rating: 4.3,
      menu: ['Café especializado', 'Postres', 'Sándwiches', 'Pastelería'],
      image: 'https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHN0dWR5JTIwc3BhY2V8ZW58MXx8fHwxNzcwODI1NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      open: true
    },
    {
      id: 'r3',
      name: 'Restaurante de Posgrados',
      type: 'Restaurante',
      location: 'Edificio de Posgrados',
      hours: '12:00 PM - 3:00 PM',
      priceRange: '$$$',
      rating: 4.7,
      menu: ['Comida gourmet', 'Menú ejecutivo', 'Opciones vegetarianas', 'Bebidas premium'],
      image: 'https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc2VtaW5hciUyMGNvbmZlcmVuY2UlMjBldmVudHxlbnwxfHx8fDE3NzA4MjU2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      open: false
    },
    {
      id: 'r4',
      name: 'Café 38',
      type: 'Cafetería',
      location: 'Bloque 38',
      hours: '7:00 AM - 5:00 PM',
      priceRange: '$',
      rating: 4.1,
      menu: ['Bebidas calientes', 'Snacks', 'Empanadas', 'Jugos naturales'],
      image: 'https://images.unsplash.com/photo-1664273891579-22f28332f3c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwNzM1NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      open: true
    },
    {
      id: 'r5',
      name: 'Food Court',
      type: 'Comedor',
      location: 'Zona de Comidas',
      hours: '11:00 AM - 8:00 PM',
      priceRange: '$$',
      rating: 4.4,
      menu: ['Comida rápida', 'Comida internacional', 'Ensaladas', 'Pizza'],
      image: 'https://images.unsplash.com/photo-1757192420329-39acf20a12b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzcwNzk3MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      open: true
    }
  ];

  const types = ['all', ...Array.from(new Set(restaurants.map(r => r.type)))];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || restaurant.type === selectedType;
    return matchesSearch && matchesType;
  });

  const openCount = restaurants.filter(r => r.open).length;

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
              <h1 className="text-xl">Restaurantes y Cafeterías</h1>
              <p className="text-blue-200 text-sm">{openCount} lugares abiertos ahora</p>
            </div>
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
                {type === 'all' ? 'Todos' : type}
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
              placeholder="Buscar restaurantes o ubicación..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#003366]"
            />
          </div>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                    restaurant.open ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {restaurant.open ? 'Abierto' : 'Cerrado'}
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-[#FFB800] text-[#003366] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    {restaurant.type === 'Cafetería' ? <Coffee size={14} /> : <ChefHat size={14} />}
                    {restaurant.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-xl text-gray-800 mb-1">{restaurant.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{restaurant.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={14} />
                      <span>{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <DollarSign size={14} />
                      <span>{restaurant.priceRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(restaurant.rating) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{restaurant.rating}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Menú destacado</p>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.menu.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                        >
                          {item}
                        </span>
                      ))}
                      {restaurant.menu.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                          +{restaurant.menu.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#003366] hover:bg-[#004080] text-white py-2 px-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-1">
                      <MapPin size={14} />
                      <span>Ver ubicación</span>
                    </button>
                    <button className="flex-1 bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] py-2 px-3 rounded-xl text-sm transition-colors">
                      Ver menú
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-2">No se encontraron lugares</p>
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
