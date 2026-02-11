import { useState } from 'react';
import { ArrowLeft, User, Bell, Globe, Moon, Sun, ChevronRight, Mail, Phone, Calendar, LogOut } from 'lucide-react';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('español');
  const [notifications, setNotifications] = useState({
    events: true,
    classrooms: false,
    general: true
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg">Perfil y Configuración</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">Juan Pérez García</h2>
              <p className="text-sm text-muted-foreground">juan.perez@eafit.edu.co</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-primary text-xs rounded-full">
                Estudiante
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span>juan.perez@eafit.edu.co</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>+57 300 123 4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Ingeniería de Sistemas</span>
            </div>
          </div>

          <button className="w-full mt-4 bg-accent text-accent-foreground py-2 rounded-lg hover:bg-yellow-500">
            Editar Perfil
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="mb-4">Preferencias</h3>

          {/* Language */}
          <div className="mb-4 pb-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm">Idioma</div>
                  <div className="text-xs text-muted-foreground">Selecciona tu idioma preferido</div>
                </div>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="español">Español</option>
              <option value="english">English</option>
            </select>
          </div>

          {/* Dark Mode */}
          <div className="mb-4 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                <div>
                  <div className="text-sm">Modo oscuro</div>
                  <div className="text-xs text-muted-foreground">Activa el tema oscuro</div>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <div className="text-sm">Notificaciones</div>
                <div className="text-xs text-muted-foreground">Gestiona tus alertas</div>
              </div>
            </div>
            <div className="space-y-3 ml-8">
              <div className="flex items-center justify-between">
                <span className="text-sm">Eventos próximos</span>
                <button
                  onClick={() => setNotifications({ ...notifications, events: !notifications.events })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.events ? 'bg-accent' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.events ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Aulas disponibles</span>
                <button
                  onClick={() => setNotifications({ ...notifications, classrooms: !notifications.classrooms })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.classrooms ? 'bg-accent' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.classrooms ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notificaciones generales</span>
                <button
                  onClick={() => setNotifications({ ...notifications, general: !notifications.general })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.general ? 'bg-accent' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications.general ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Options */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
            <span>Ayuda y soporte</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t"></div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span>Términos y condiciones</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t"></div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span>Política de privacidad</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="border-t"></div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-b-xl">
            <span>Acerca de EAFIT Asistente IA</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>

        {/* Version */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Versión 1.0.0 • Universidad EAFIT © 2026
        </div>
      </div>
    </div>
  );
}
