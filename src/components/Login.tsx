import { useState } from 'react';
import { User, LogIn, UserPlus } from 'lucide-react';
import type { User as UserType } from '../App';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    onLogin({
      name: email.split('@')[0] || 'Usuario',
      email: email || 'invitado@eafit.edu.co',
      role: email.includes('eafit.edu.co') ? 'student' : 'guest',
      id: Math.random().toString(36).substr(2, 9)
    });
  };

  const handleGuestLogin = () => {
    onLogin({
      name: 'Invitado',
      email: 'invitado@eafit.edu.co',
      role: 'guest',
      id: 'guest-' + Math.random().toString(36).substr(2, 9)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004080] to-[#002244] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo y header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-lg">
            <div className="relative">
              <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center">
                <span className="text-[#FFB800] text-3xl">E</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl text-white mb-2">Asistente EAFIT</h1>
          <p className="text-blue-200 text-lg">Tu compañero inteligente en el campus</p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!showForm ? (
            <div className="space-y-4">
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-[#003366] hover:bg-[#004080] text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
              >
                <LogIn size={24} />
                <span className="text-lg">Iniciar sesión con credenciales EAFIT</span>
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">o</span>
                </div>
              </div>

              <button
                onClick={handleGuestLogin}
                className="w-full bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
              >
                <UserPlus size={24} />
                <span className="text-lg">Continuar como invitado</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Correo institucional
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@eafit.edu.co"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#003366] focus:outline-none transition-colors"
                    required
                  />
                  <User className="absolute right-3 top-3.5 text-gray-400" size={20} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#003366] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Recordarme</span>
                </label>
                <a href="#" className="text-[#003366] hover:text-[#004080]">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#003366] hover:bg-[#004080] text-white py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span className="text-lg">Comenzar</span>
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors"
              >
                Volver
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-blue-200 text-sm mt-6">
          © 2026 Universidad EAFIT - Medellín, Colombia
        </p>
      </div>
    </div>
  );
}
