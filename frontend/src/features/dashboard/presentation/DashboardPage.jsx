import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Syringe, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Clock, 
  FileText, 
  ArrowUpRight,
  UserCheck,
  MoreVertical,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../application/dashboardService';
import { formatDate } from '../../../core/utils/formatters';

const StatCard = ({ title, value, subValue, icon: Icon, colorClass, loading, link }) => {
  const getGradient = (color) => {
    switch(color) {
      case 'bg-rs-blue': return 'from-blue-500 to-rs-dark-blue';
      case 'bg-rs-green': return 'from-green-400 to-rs-green';
      case 'bg-rs-gold': return 'from-yellow-400 to-rs-gold';
      case 'bg-rs-light-blue': return 'from-cyan-400 to-rs-light-blue';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <Link to={link || '#'} className="bg-white p-6 rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100/80 group hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 relative overflow-hidden block">
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${getGradient(colorClass)} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${getGradient(colorClass)} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <button className="text-gray-300 hover:text-gray-600 transition-colors p-1 relative z-10">
          <MoreVertical size={20} />
        </button>
      </div>
      <div className="relative z-10">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        {loading ? (
          <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-lg mt-1"></div>
        ) : (
          <h3 className="text-4xl font-black text-gray-800 tracking-tight">{value}</h3>
        )}
        <div className="flex items-center gap-2 mt-3">
          <span className="flex items-center gap-0.5 text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md">
            <ArrowUpRight size={14} strokeWidth={3} /> {subValue}
          </span>
          <span className="text-xs text-gray-400 font-medium">dari kemarin</span>
        </div>
      </div>
    </Link>
  );
};

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchStats = async () => {
    try {
      const stats = await dashboardService.getDashboardStats();
      setData(stats);
      setLastRefreshed(new Date());
      setError(null);
    } catch (err) {
      setError('Gagal memperbarui data dari server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Real-time polling every 10 seconds
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: 'Total Pasien', value: data?.totalPatients ?? '-', subValue: data?.totalPatients ? '+12%' : '0%', icon: Users, colorClass: 'bg-rs-blue', link: '/dashboard/patients' },
    { title: 'Vaksin Terjual', value: data?.totalVaccinations ?? '-', subValue: data?.totalVaccinations ? '+5%' : '0%', icon: Syringe, colorClass: 'bg-rs-green', link: '/dashboard/vaccines' },
    { title: 'Antrian Hari Ini', value: data?.todayQueue ?? '-', subValue: data?.todayQueue ? '+24%' : '0%', icon: Clock, colorClass: 'bg-rs-gold', link: '/dashboard/queues' },
    { title: 'Sertifikat Terbit', value: data?.certificatesIssued ?? '-', subValue: data?.certificatesIssued ? '+8%' : '0%', icon: FileText, colorClass: 'bg-rs-light-blue', link: '/dashboard/certificates' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with real-time status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black text-rs-dark-blue dark:text-blue-400">Dashboard Admin</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/30 text-rs-green dark:text-green-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100 dark:border-green-800">
              <span className="w-1.5 h-1.5 bg-rs-green dark:bg-green-400 rounded-full animate-pulse"></span> live
            </div>
          </div>
          <p className="text-gray-500 dark:text-slate-400">Terakhir diperbarui: {lastRefreshed.toLocaleTimeString('id-ID')} WIB</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchStats}
            className="p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-400 hover:text-primary dark:text-gray-400 transition shadow-sm"
            title="Refresh Manual"
          >
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition shadow-sm flex items-center gap-2">
            <Calendar size={18} /> {formatDate(new Date(), 'dd MMMM yyyy')}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 font-bold animate-in fade-in slide-in-from-top-2">
          <AlertTriangle size={20} />
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} loading={loading && !data} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Table Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
            <h3 className="font-black text-rs-dark-blue dark:text-white flex items-center gap-2">
              <UserCheck size={20} className="text-primary" /> Antrian Terbaru
            </h3>
            <button className="text-sm font-bold text-primary dark:text-blue-400 hover:underline underline-offset-4">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto min-h-[300px]">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-slate-800">
                  <th className="px-6 py-4">Pasien</th>
                  <th className="px-6 py-4">Jenis Vaksin</th>
                  <th className="px-6 py-4">Jam</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
                {loading && !data ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-24"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-20"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-12"></div></td>
                      <td className="px-6 py-4"><div className="h-6 bg-gray-100 dark:bg-slate-800 rounded-full w-16"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 dark:bg-slate-800 rounded w-8 mx-auto"></div></td>
                    </tr>
                  ))
                ) : data?.recentRegistrations?.length > 0 ? (
                  (data.recentRegistrations).map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-slate-200">{reg.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-400">{reg.vaccine}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-500 font-medium">{reg.time}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] tracking-widest border ${
                          reg.status === 'DONE' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 
                          reg.status === 'SCREENING' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : 
                          'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 hover:bg-primary hover:text-white rounded-lg font-bold text-[10px] uppercase transition-all">
                          Kelola
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 dark:text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users size={32} className="text-gray-300 dark:text-slate-600 mb-2" />
                        <p className="font-semibold text-gray-500 dark:text-slate-400">Belum ada antrian</p>
                        <p className="text-sm">Pasien yang mendaftar akan muncul di sini</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          {/* Real-time Indicator Card */}
          {(() => {
            const todayQueue = data?.todayQueue || 0;
            const maxCapacity = 100; // Contoh kapasitas harian maksimal
            const percentage = Math.min(Math.round((todayQueue / maxCapacity) * 100), 100);
            
            return (
              <div className="bg-rs-dark-blue dark:bg-slate-900 border border-transparent dark:border-slate-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex items-center justify-between mb-4">
                   <h4 className="text-lg font-black tracking-tight">Kapasitas RS</h4>
                   <span className="text-[10px] font-black uppercase bg-white/20 px-2 py-0.5 rounded-full">Beban: {percentage}%</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full mb-6 relative z-10 overflow-hidden">
                   <div 
                    className="absolute top-0 left-0 h-full bg-rs-gold rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(245,168,0,0.5)]"
                    style={{ width: `${percentage}%` }}
                   ></div>
                </div>
                <button className="w-full py-3 bg-white text-rs-dark-blue font-black rounded-xl hover:bg-rs-gold hover:text-rs-dark-blue transition-all relative z-10 shadow-lg active:scale-95">
                  Optimalkan Antrian
                </button>
              </div>
            );
          })()}

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
            <h4 className="font-black text-rs-dark-blue dark:text-blue-400 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-rs-gold dark:text-yellow-400" /> Lokasi Pelayanan
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-rs-green/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-200">Poli Vaksinasi Lt.1</span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Beban: Rendah (12 Pasien)</span>
                </div>
                <span className="bg-rs-green dark:bg-green-500 w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_#2EAA4A]"></span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-rs-green/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-200">Poli KIA</span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Beban: Padat (32 Pasien)</span>
                </div>
                <span className="bg-rs-green dark:bg-green-500 w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_#2EAA4A]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
