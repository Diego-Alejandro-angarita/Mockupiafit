import { ArrowLeft, MapPin, Clock, Phone, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantsScreenProps {
  onBack: () => void;
}

interface Restaurant {
  id: string;
  name: string;
  type: string;
  location: string;
  hours: string;
  phone?: string;
  rating: number;
  image: string;
  description: string;
  menu: string[];
  openNow: boolean;
}

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Cafetería Central',
    type: 'Cafetería',
    location: 'Edificio Principal - Piso 1',
    hours: '7:00 AM - 7:00 PM',
    phone: '+57 4 261 9500 ext. 8234',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1636044991461-58cf58e1ff8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZldGVyaWElMjBoZWFsdGh5JTIwZm9vZCUyMHBsYXRlfGVufDF8fHx8MTc3MDgyNTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Variedad de opciones para desayuno, almuerzo y snacks.',
    menu: ['Desayunos', 'Almuerzos', 'Café', 'Repostería', 'Jugos naturales'],
    openNow: true
  },
  {
    id: '2',
    name: 'Café Jardín',
    type: 'Café',
    location: 'Zona verde - Cerca Bloque 26',
    hours: '8:00 AM - 6:00 PM',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1636044991461-58cf58e1ff8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZldGVyaWElMjBoZWFsdGh5JTIwZm9vZCUyMHBsYXRlfGVufDF8fHx8MTc3MDgyNTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ambiente al aire libre con opciones saludables.',
    menu: ['Café de especialidad', 'Sándwiches', 'Ensaladas', 'Smoothies'],
    openNow: true
  },
  {
    id: '3',
    name: 'Restaurante Administrativo',
    type: 'Restaurante',
    location: 'Edificio Administrativo - Piso 2',
    hours: '12:00 PM - 3:00 PM',
    phone: '+57 4 261 9500 ext. 8456',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1636044991461-58cf58e1ff8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZldGVyaWElMjBoZWFsdGh5JTIwZm9vZCUyMHBsYXRlfGVufDF8fHx8MTc3MDgyNTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Menú ejecutivo diario con opciones variadas.',
    menu: ['Menú ejecutivo', 'Plato del día', 'Opciones vegetarianas', 'Postres'],
    openNow: false
  },
  {
    id: '4',
    name: 'Juice Bar',
    type: 'Jugos y Snacks',
    location: 'Cerca Biblioteca',
    hours: '7:30 AM - 5:00 PM',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1636044991461-58cf58e1ff8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZldGVyaWElMjBoZWFsdGh5JTIwZm9vZCUyMHBsYXRlfGVufDF8fHx8MTc3MDgyNTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Jugos naturales, batidos y snacks saludables.',
    menu: ['Jugos naturales', 'Batidos', 'Frutas frescas', 'Snacks saludables'],
    openNow: true
  },
  {
    id: '5',
    name: 'Tienda EAFIT',
    type: 'Tienda',
    location: 'Bloque 38',
    hours: '8:00 AM - 5:00 PM',
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1636044991461-58cf58e1ff8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZldGVyaWElMjBoZWFsdGh5JTIwZm9vZCUyMHBsYXRlfGVufDF8fHx8MTc3MDgyNTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Snacks, bebidas y productos básicos.',
    menu: ['Snacks', 'Bebidas', 'Dulces', 'Productos de higiene'],
    openNow: true
  }
];

export function RestaurantsScreen({ onBack }: RestaurantsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg">Restaurantes y Servicios</h1>
            <p className="text-xs text-blue-200">Servicios de alimentación en el campus</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Quick Info */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 mb-6 shadow-lg">
          <h3 className="mb-2">Horarios de almuerzo</h3>
          <p className="text-sm text-orange-100">
            La mayoría de restaurantes sirven almuerzo de 12:00 PM a 3:00 PM. ¡Planifica tu visita!
          </p>
        </div>

        {/* Restaurants List */}
        <div className="space-y-4">
          {restaurants.map(restaurant => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/3 h-48 md:h-auto">
                  <ImageWithFallback
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 md:w-2/3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg">{restaurant.name}</h3>
                        {restaurant.openNow && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Abierto ahora
                          </span>
                        )}
                        {!restaurant.openNow && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            Cerrado
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{restaurant.rating}</span>
                        <span className="text-sm text-muted-foreground ml-2">{restaurant.type}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {restaurant.description}
                  </p>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{restaurant.hours}</span>
                    </div>
                    {restaurant.phone && (
                      <div className="flex items-start gap-2 text-sm">
                        <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{restaurant.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="text-sm mb-2">Menú disponible:</div>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.menu.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-800 text-sm flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Mostrar en mapa
                    </button>
                    {restaurant.phone && (
                      <button className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg hover:bg-yellow-500 text-sm flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Llamar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <h4 className="flex items-center gap-2 mb-2">
            ℹ️ <span>Información adicional</span>
          </h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Aceptamos efectivo y tarjetas de crédito/débito</li>
            <li>Contamos con opciones vegetarianas y veganas</li>
            <li>Menús especiales para estudiantes con descuento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
