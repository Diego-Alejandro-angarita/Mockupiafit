import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  Filter,
  ArrowLeft
} from 'lucide-react';
import type { User, Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DirectoryProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface Faculty {
  id: string;
  name: string;
  photo: string;
  position: string;
  department: string;
  office: string;
  email: string;
  phone: string;
  schedule: string;
}

export default function Directory({ user, onNavigate }: DirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const faculties: Faculty[] = [
    {
      id: '1',
      name: 'Dr. Carlos Rodríguez',
      photo: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Profesor Titular',
      department: 'Ingeniería de Sistemas',
      office: 'Bloque 19 - Oficina 402',
      email: 'crodriguez@eafit.edu.co',
      phone: 'Ext. 9401',
      schedule: 'Lun-Mié 2:00 PM - 5:00 PM'
    },
    {
      id: '2',
      name: 'Dra. Ana María González',
      photo: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Profesora Asociada',
      department: 'Administración',
      office: 'Bloque 26 - Oficina 301',
      email: 'agonzalez@eafit.edu.co',
      phone: 'Ext. 9302',
      schedule: 'Mar-Jue 10:00 AM - 1:00 PM'
    },
    {
      id: '3',
      name: 'Dr. Miguel Ángel Pérez',
      photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Decano',
      department: 'Ciencias',
      office: 'Bloque 34 - Oficina 501',
      email: 'mperez@eafit.edu.co',
      phone: 'Ext. 9501',
      schedule: 'Lun-Vie 9:00 AM - 12:00 PM'
    },
    {
      id: '4',
      name: 'Dra. Laura Martínez',
      photo: 'https://images.unsplash.com/photo-1607503873903-c5e95f80ba9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Profesora Asistente',
      department: 'Ingeniería de Sistemas',
      office: 'Bloque 19 - Oficina 305',
      email: 'lmartinez@eafit.edu.co',
      phone: 'Ext. 9305',
      schedule: 'Mié-Vie 3:00 PM - 6:00 PM'
    },
    {
      id: '5',
      name: 'Dr. Roberto Sánchez',
      photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Director de Investigación',
      department: 'Ingeniería',
      office: 'Bloque 38 - Oficina 201',
      email: 'rsanchez@eafit.edu.co',
      phone: 'Ext. 9201',
      schedule: 'Lun-Jue 8:00 AM - 11:00 AM'
    },
    {
      id: '6',
      name: 'Dra. Patricia López',
      photo: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Coordinadora Académica',
      department: 'Administración',
      office: 'Bloque 26 - Oficina 205',
      email: 'plopez@eafit.edu.co',
      phone: 'Ext. 9205',
      schedule: 'Mar-Vie 1:00 PM - 4:00 PM'
    },
    {
      id: '7',
      name: 'Dr. Fernando Vargas',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Profesor Titular',
      department: 'Ciencias',
      office: 'Bloque 34 - Oficina 410',
      email: 'fvargas@eafit.edu.co',
      phone: 'Ext. 9410',
      schedule: 'Lun-Mié 11:00 AM - 2:00 PM'
    },
    {
      id: '8',
      name: 'Dra. Claudia Ramírez',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      position: 'Jefa de Departamento',
      department: 'Humanidades',
      office: 'Bloque 38 - Oficina 303',
      email: 'cramirez@eafit.edu.co',
      phone: 'Ext. 9303',
      schedule: 'Lun-Vie 2:00 PM - 5:00 PM'
    }
  ];

  const departments = ['all', 'Ingeniería de Sistemas', 'Administración', 'Ciencias', 'Ingeniería', 'Humanidades'];

  const filteredFaculties = faculties.filter((faculty) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-[#FFB800] p-3 rounded-xl">
                  <UserIcon size={28} />
                </div>
                <div>
                  <h1 className="text-2xl">Directorio Institucional</h1>
                  <p className="text-blue-200 text-sm">Encuentra profesores y administrativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, departamento o cargo..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[#003366] outline-none text-lg"
              />
            </div>

            {/* Department Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter size={20} />
                <span className="text-sm">Departamento:</span>
              </div>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedDepartment === dept
                      ? 'bg-[#003366] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dept === 'all' ? 'Todos' : dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Se encontraron <span className="text-[#003366]">{filteredFaculties.length}</span> resultados
          </p>
        </div>

        {/* Faculty Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFaculties.map((faculty) => (
            <motion.div
              key={faculty.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#003366] to-[#004d99]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <ImageWithFallback
                      src={faculty.photo}
                      alt={faculty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl text-[#003366] mb-1">{faculty.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{faculty.position}</p>
                  <span className="inline-block px-3 py-1 bg-[#FFB800]/10 text-[#FFB800] rounded-full text-sm">
                    {faculty.department}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Building2 size={16} className="mt-0.5 flex-shrink-0 text-[#003366]" />
                    <span>{faculty.office}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Mail size={16} className="mt-0.5 flex-shrink-0 text-[#003366]" />
                    <span className="break-all">{faculty.email}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-[#003366]" />
                    <span>{faculty.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#003366]" />
                    <span>{faculty.schedule}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('map')}
                  className="w-full bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 group-hover:shadow-md"
                >
                  <MapPin size={20} />
                  <span>Ver en mapa</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFaculties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <UserIcon size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl text-gray-600 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#004d99] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
