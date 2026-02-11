import { ImageWithFallback } from './figma/ImageWithFallback';
import { LogIn, UserCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (asGuest: boolean) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y encabezado */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl inline-block">
            <div className="w-24 h-24 mx-auto bg-primary rounded-xl flex items-center justify-center">
              <span className="text-4xl text-accent">E</span>
            </div>
          </div>
          <h1 className="text-white text-3xl mb-2">Asistente IA EAFIT</h1>
          <p className="text-blue-200">Tu compañero inteligente en el campus</p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div>
            <h2 className="text-xl text-center mb-2">Bienvenido</h2>
            <p className="text-muted-foreground text-center text-sm">
              Inicia sesión para acceder a todas las funcionalidades
            </p>
          </div>

          {/* Formulario */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Usuario institucional</label>
              <input
                type="text"
                placeholder="usuario@eafit.edu.co"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              onClick={() => onLogin(false)}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </button>
          </div>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-muted-foreground">o</span>
            </div>
          </div>

          {/* Acceso invitado */}
          <button
            onClick={() => onLogin(true)}
            className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
          >
            <UserCircle className="w-5 h-5" />
            Continuar como Invitado
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Al continuar, aceptas los términos de uso y la política de privacidad de EAFIT
          </p>
        </div>
      </div>
    </div>
  );
}
