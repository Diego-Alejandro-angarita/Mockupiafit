import { useState } from 'react';
import { ArrowLeft, User as UserIcon, Bell, Globe, Moon, Shield, HelpCircle, LogOut, ChevronRight, Search, MapPin, Calendar, MessageCircle, User } from 'lucide-react';
import type { User as UserType, Screen } from '../App';

interface ProfileProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function Profile({ user, onNavigate, onLogout }: ProfileProps) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('es');
  const [darkMode, setDarkMode] = useState(false);

  const handleLogoutClick = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      onLogout();
    }
  };

  const stats = [
    { label: 'Eventos registrados', value: '5' },
    { label: 'Aulas reservadas', value: '12' },
    { label: 'Consultas al asistente', value: '43' }
  ];

  const menuSections = [
    {
      title: 'Cuenta',
      items: [
        { icon: UserIcon, label: 'Información personal', action: () => {} },
        { icon: Shield, label: 'Privacidad y seguridad', action: () => {} },
        ...(user.role === 'admin' ? [{ icon: Shield, label: 'Panel Administrativo', action: () => onNavigate('admin') }] : [])
      ]
    },
    {
      title: 'Preferencias',
      items: [
        { 
          icon: Bell, 
          label: 'Notificaciones', 
          toggle: true,
          value: notifications,
          onChange: setNotifications
        },
        { 
          icon: Globe, 
          label: 'Idioma', 
          select: true,
          value: language,
          options: [
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' }
          ],
          onChange: setLanguage
        },
        { 
          icon: Moon, 
          label: 'Modo oscuro', 
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    },
    {
      title: 'Soporte',
      items: [
        { icon: HelpCircle, label: 'Centro de ayuda', action: () => {} },
        { icon: MessageCircle, label: 'Contactar soporte', action: () => {} }
      ]
    }
  ];

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
              <h1 className="text-xl">Mi Perfil</h1>
              <p className="text-blue-200 text-sm">Configuración y preferencias</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#003366] to-[#004080] rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl text-gray-800 mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <div className="inline-block px-3 py-1 bg-[#FFB800] text-[#003366] rounded-full text-sm">
                  {user.role === 'student' ? 'Estudiante' : user.role === 'professor' ? 'Profesor' : 'Invitado'}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl text-[#003366] mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="text-sm text-gray-500 uppercase px-4 mb-3">{section.title}</h3>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  
                  if (item.toggle) {
                    return (
                      <div
                        key={itemIndex}
                        className={`flex items-center justify-between p-4 ${
                          itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Icon size={20} className="text-[#003366]" />
                          </div>
                          <span className="text-gray-800">{item.label}</span>
                        </div>
                        <button
                          onClick={() => item.onChange && item.onChange(!item.value)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            item.value ? 'bg-[#FFB800]' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              item.value ? 'transform translate-x-6' : ''
                            }`}
                          ></div>
                        </button>
                      </div>
                    );
                  }

                  if (item.select) {
                    return (
                      <div
                        key={itemIndex}
                        className={`flex items-center justify-between p-4 ${
                          itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Icon size={20} className="text-[#003366]" />
                          </div>
                          <span className="text-gray-800">{item.label}</span>
                        </div>
                        <select
                          value={item.value}
                          onChange={(e) => item.onChange && item.onChange(e.target.value)}
                          className="px-3 py-1 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#003366]"
                        >
                          {item.options?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Icon size={20} className="text-[#003366]" />
                        </div>
                        <span className="text-gray-800">{item.label}</span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="w-full bg-white hover:bg-red-50 text-red-600 rounded-2xl shadow-md p-4 flex items-center justify-center gap-3 transition-colors"
          >
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Asistente EAFIT v1.0.0</p>
            <p className="mt-1">© 2026 Universidad EAFIT</p>
          </div>
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
              className="flex flex-col items-center gap-1 px-4 py-2 text-[#003366]"
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
