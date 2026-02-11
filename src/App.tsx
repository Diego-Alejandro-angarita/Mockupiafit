import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Chat from './components/Chat';
import MapView from './components/MapView';
import Classrooms from './components/Classrooms';
import Restaurants from './components/Restaurants';
import Events from './components/Events';
import Profile from './components/Profile';

export type Screen = 'login' | 'home' | 'chat' | 'map' | 'classrooms' | 'restaurants' | 'events' | 'profile';

export interface User {
  name: string;
  email: string;
  role: 'student' | 'professor' | 'guest';
  id: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {currentScreen === 'home' && user && (
        <Home user={user} onNavigate={navigate} />
      )}
      {currentScreen === 'chat' && user && (
        <Chat user={user} onNavigate={navigate} />
      )}
      {currentScreen === 'map' && user && (
        <MapView user={user} onNavigate={navigate} />
      )}
      {currentScreen === 'classrooms' && user && (
        <Classrooms user={user} onNavigate={navigate} />
      )}
      {currentScreen === 'restaurants' && user && (
        <Restaurants user={user} onNavigate={navigate} />
      )}
      {currentScreen === 'events' && user && (
        <Events user={user} onNavigate={navigate} />
      )}
      {currentScreen === 'profile' && user && (
        <Profile user={user} onNavigate={navigate} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
