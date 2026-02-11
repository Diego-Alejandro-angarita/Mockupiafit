import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  FileText,
  Plus,
  Edit,
  Trash2,
  Clock,
  Shield,
  Activity,
  Users,
  ArrowLeft,
  Search
} from 'lucide-react';
import type { User, Screen } from '../App';

interface AdminDashboardProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

interface Source {
  id: string;
  name: string;
  url: string;
  category: string;
  status: 'verified' | 'pending';
  lastUpdated: string;
}

export default function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'logs'>('overview');
  const [sources, setSources] = useState<Source[]>([
    {
      id: '1',
      name: 'Sitio Web Institucional',
      url: 'https://www.eafit.edu.co',
      category: 'General',
      status: 'verified',
      lastUpdated: '2026-02-10'
    },
    {
      id: '2',
      name: 'Reglamento Estudiantil 2026',
      url: 'https://www.eafit.edu.co/reglamentos',
      category: 'Normatividad',
      status: 'verified',
      lastUpdated: '2026-01-15'
    },
    {
      id: '3',
      name: 'Calendario Académico 2026-1',
      url: 'https://www.eafit.edu.co/calendario',
      category: 'Académico',
      status: 'verified',
      lastUpdated: '2026-02-01'
    },
    {
      id: '4',
      name: 'Bienestar Universitario',
      url: 'https://www.eafit.edu.co/bienestar',
      category: 'Servicios',
      status: 'pending',
      lastUpdated: '2026-02-08'
    }
  ]);

  const metrics = [
    {
      id: 1,
      title: 'Consultas Diarias',
      value: '1,247',
      change: '+12%',
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Tasa de Respuestas Correctas',
      value: '94.3%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Usuarios Activos',
      value: '3,842',
      change: '+8%',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Fuentes Verificadas',
      value: `${sources.filter(s => s.status === 'verified').length}/${sources.length}`,
      change: '75%',
      icon: Shield,
      color: 'bg-[#FFB800]'
    }
  ];

  const topQuestions = [
    { question: '¿Dónde está el Bloque 38?', count: 89 },
    { question: '¿Horario de la biblioteca?', count: 76 },
    { question: 'Proceso de matrícula', count: 64 },
    { question: 'Cancelación de materias', count: 52 },
    { question: 'Servicios de bienestar', count: 48 }
  ];

  const recentLogs = [
    { id: 1, action: 'Fuente actualizada', user: 'Admin', source: 'Calendario Académico', time: 'Hace 2 horas' },
    { id: 2, action: 'Nueva fuente agregada', user: 'Admin', source: 'Bienestar Universitario', time: 'Hace 5 horas' },
    { id: 3, action: 'Contenido aprobado', user: 'Admin', source: 'Reglamento Estudiantil', time: 'Hace 1 día' },
    { id: 4, action: 'Fuente verificada', user: 'Sistema', source: 'Sitio Web Institucional', time: 'Hace 2 días' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
                  <Shield size={28} />
                </div>
                <div>
                  <h1 className="text-2xl">Panel Administrativo</h1>
                  <p className="text-blue-200 text-sm">Gestión del Asistente EAFIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#003366] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 size={20} />
                <span>Resumen</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'sources'
                  ? 'bg-[#003366] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={20} />
                <span>Fuentes</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === 'logs'
                  ? 'bg-[#003366] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity size={20} />
                <span>Actividad</span>
              </div>
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${metric.color} text-white p-3 rounded-lg`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <TrendingUp size={16} />
                        <span>{metric.change}</span>
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{metric.title}</h3>
                    <p className="text-3xl text-[#003366]">{metric.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Top Questions */}
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl text-[#003366] mb-6">Preguntas Más Frecuentes</h2>
              <div className="space-y-4">
                {topQuestions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#FFB800] text-white w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-gray-800">{item.question}</span>
                    </div>
                    <div className="bg-[#003366] text-white px-4 py-2 rounded-lg">
                      {item.count} consultas
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* User Feedback Summary */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#003366] to-[#004d99] text-white rounded-xl shadow-md p-6">
              <h2 className="text-xl mb-4">Satisfacción de Usuarios</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Muy Satisfecho</p>
                  <p className="text-3xl">68%</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Satisfecho</p>
                  <p className="text-3xl">26%</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Insatisfecho</p>
                  <p className="text-3xl">6%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Sources Tab */}
        {activeTab === 'sources' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar fuente..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#003366] outline-none"
                  />
                </div>
                <button className="bg-[#FFB800] hover:bg-[#FFA000] text-[#003366] px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  <Plus size={20} />
                  <span>Agregar Fuente</span>
                </button>
              </div>

              <div className="space-y-4">
                {sources.map((source) => (
                  <motion.div
                    key={source.id}
                    variants={itemVariants}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#003366] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-[#003366]">{source.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              source.status === 'verified'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {source.status === 'verified' ? 'Verificado' : 'Pendiente'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{source.url}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">{source.category}</span>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>Actualizado: {source.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-[#003366]">
                          <Edit size={20} />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-[#003366] mb-6">Historial de Actividad</h2>
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="bg-[#003366] text-white w-10 h-10 rounded-full flex items-center justify-center">
                      <Activity size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{log.action}</p>
                      <p className="text-sm text-gray-600">
                        {log.source} • {log.user}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{log.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
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
