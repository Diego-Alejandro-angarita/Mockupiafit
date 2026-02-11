import { Home, MessageCircle, MapPin, Calendar, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'map', label: 'Mapa', icon: MapPin },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex-1 flex flex-col items-center py-3 px-2 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-primary' : ''}`} />
                <span className="text-xs">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent mx-auto" style={{ width: '60%' }}></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
