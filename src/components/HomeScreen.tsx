import { Search, MapPin, DoorOpen, UtensilsCrossed, Calendar, HelpCircle, Menu, Bell, User } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpenSearch: () => void;
}

const quickAccessItems = [
  {
    id: 'map',
    title: 'Campus y Ubicación',
    description: 'Mapa interactivo del campus',
    icon: MapPin,
    color: 'bg-blue-100 text-primary',
    screen: 'map'
  },
  {
    id: 'classrooms',
    title: 'Aulas Disponibles',
    description: 'Consulta espacios libres',
    icon: DoorOpen,
    color: 'bg-green-100 text-green-700',
    screen: 'classrooms'
  },
  {
    id: 'restaurants',
    title: 'Restaurantes',
    description: 'Cafeterías y servicios',
    icon: UtensilsCrossed,
    color: 'bg-orange-100 text-orange-700',
    screen: 'restaurants'
  },
  {
    id: 'events',
    title: 'Eventos',
    description: 'Seminarios y actividades',
    icon: Calendar,
    color: 'bg-purple-100 text-purple-700',
    screen: 'events'
  },
  {
    id: 'faq',
    title: 'FAQ Institucional',
    description: 'Preguntas frecuentes',
    icon: HelpCircle,
    color: 'bg-yellow-100 text-yellow-700',
    screen: 'chat'
  }
];

export function HomeScreen({ onNavigate, onOpenSearch }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-xl text-primary">E</span>
              </div>
              <div>
                <h1 className="text-lg">EAFIT Asistente IA</h1>
                <p className="text-xs text-blue-200">Universidad EAFIT, Colombia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button onClick={() => onNavigate('profile')} className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <button
            onClick={onOpenSearch}
            className="w-full bg-white text-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-3"
          >
            <Search className="w-5 h-5 text-primary" />
            <span className="flex-1 text-left text-gray-500">¿En qué puedo ayudarte hoy?</span>
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto p-4 pb-24">
        {/* Banner de bienvenida */}
        <div className="bg-gradient-to-r from-primary to-blue-800 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-2xl mb-2">¡Hola! 👋</h2>
          <p className="text-blue-100">
            Estoy aquí para ayudarte a navegar el campus, encontrar aulas, eventos y mucho más.
          </p>
        </div>

        {/* Accesos rápidos */}
        <div className="mb-6">
          <h3 className="text-lg mb-4">Accesos Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.screen)}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-left"
                >
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Eventos destacados */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Eventos Destacados</h3>
            <button
              onClick={() => onNavigate('events')}
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex gap-4">
                <div className="bg-accent text-primary rounded-lg p-3 h-fit">
                  <div className="text-center">
                    <div className="text-sm">FEB</div>
                    <div className="text-2xl">15</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">Conferencia de IA y Tecnología</h4>
                  <p className="text-sm text-muted-foreground mb-2">Auditorio Principal, 2:00 PM</p>
                  <span className="inline-block bg-blue-100 text-primary text-xs px-2 py-1 rounded">
                    Tecnología
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex gap-4">
                <div className="bg-accent text-primary rounded-lg p-3 h-fit">
                  <div className="text-center">
                    <div className="text-sm">FEB</div>
                    <div className="text-2xl">18</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">Feria de Emprendimiento</h4>
                  <p className="text-sm text-muted-foreground mb-2">Plaza Central, 10:00 AM</p>
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Emprendimiento
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips útiles */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="flex items-center gap-2 mb-2">
            💡 <span>Tip del día</span>
          </h4>
          <p className="text-sm text-gray-700">
            Puedes usar el comando de voz en el chat para hacer preguntas rápidamente. ¡Pruébalo!
          </p>
        </div>
      </main>
    </div>
  );
}
