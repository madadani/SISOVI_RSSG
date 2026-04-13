import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Syringe, 
  Calendar, 
  MapPin, 
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

const StatCard = ({ title, value, subValue, icon: Icon, tone = 'blue', loading, link }) => {
  const toneStyles = {
    blue: {
      iconBg: 'bg-rs-blue/10 dark:bg-rs-blue/15',
      iconText: 'text-rs-blue',
      hoverRing: 'hover:ring-rs-blue/15',
      chipBg: 'bg-rs-blue/10 dark:bg-rs-blue/15',
      chipText: 'text-rs-blue',
    },
    green: {
      iconBg: 'bg-rs-green/10 dark:bg-rs-green/15',
      iconText: 'text-rs-green',
      hoverRing: 'hover:ring-rs-green/15',
      chipBg: 'bg-rs-green/10 dark:bg-rs-green/15',
      chipText: 'text-rs-green',
    },
    gold: {
      iconBg: 'bg-rs-gold/10 dark:bg-rs-gold/15',
      iconText: 'text-rs-gold',
      hoverRing: 'hover:ring-rs-gold/15',
      chipBg: 'bg-rs-gold/10 dark:bg-rs-gold/15',
      chipText: 'text-rs-gold',
    },
    lightBlue: {
      iconBg: 'bg-rs-light-blue/10 dark:bg-rs-light-blue/15',
      iconText: 'text-rs-light-blue',
      hoverRing: 'hover:ring-rs-light-blue/15',
      chipBg: 'bg-rs-light-blue/10 dark:bg-rs-light-blue/15',
      chipText: 'text-rs-light-blue',
    },
  };

  const styles = toneStyles[tone] ?? toneStyles.blue;

  return (
    <Link
      to={link}
      className={[
        'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4',
        'shadow-sm hover:shadow-md transition-all duration-300',
        'ring-1 ring-transparent',
        styles.hoverRing,
        'hover:-translate-y-0.5',
        'group block relative overflow-hidden',
      ].join(' ')}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gray-900/2 dark:bg-white/5"></div>
      </div>

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={['h-10 w-10 rounded-xl flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10', styles.iconBg].join(' ')}>
            <Icon size={18} strokeWidth={2.5} className={styles.iconText} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">{title}</p>
            {loading ? (
              <div className="h-7 w-20 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-xl mt-1"></div>
            ) : (
              <h3 className="text-2xl font-black text-gray-900 dark:text-slate-50 tracking-tight leading-tight mt-0.5">{value}</h3>
            )}
          </div>
        </div>

        <button
          type="button"
          className="text-gray-300 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-300 transition-colors p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800"
          aria-label="Menu"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className={['inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg', styles.chipBg, styles.chipText].join(' ')}>
          <ArrowUpRight size={13} strokeWidth={3} /> {subValue}
        </span>
        <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">dari kemarin</span>
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
    { title: 'Total Pasien', value: data?.totalPatients ?? '-', subValue: data?.totalPatients ? '+12%' : '0%', icon: Users, tone: 'blue', link: '/dashboard/patients' },
    { title: 'Vaksin Terjual', value: data?.totalVaccinations ?? '-', subValue: data?.totalVaccinations ? '+5%' : '0%', icon: Syringe, tone: 'green', link: '/dashboard/vaccines' },
    { title: 'Antrian Hari Ini', value: data?.todayQueue ?? '-', subValue: data?.todayQueue ? '+24%' : '0%', icon: Clock, tone: 'gold', link: '/dashboard/queues' },
    { title: 'Sertifikat Terbit', value: data?.certificatesIssued ?? '-', subValue: data?.certificatesIssued ? '+8%' : '0%', icon: FileText, tone: 'lightBlue', link: '/dashboard/certificates' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-700 dark:text-red-300 font-bold">
          <AlertTriangle size={20} />
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} loading={loading && !data} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Table Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-gray-100/70 dark:border-slate-800 flex justify-between items-center bg-gray-50/60 dark:bg-slate-800/30">
            <h3 className="font-black text-rs-dark-blue dark:text-slate-50 flex items-center gap-2">
              <UserCheck size={20} className="text-primary" /> Antrian Terbaru
            </h3>
            <Link to="/dashboard/queues" className="text-sm font-bold text-primary hover:underline underline-offset-4">Lihat Semua</Link>
          </div>
          <div className="overflow-x-auto min-h-75">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100/70 dark:border-slate-800">
                  <th className="px-6 py-4">Pasien</th>
                  <th className="px-6 py-4">Jenis Vaksin</th>
                  <th className="px-6 py-4">Jam</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/70 dark:divide-slate-800/60">
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
                    <tr key={reg.id} className="hover:bg-gray-50/70 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-slate-100">{reg.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{reg.vaccine}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400 font-medium">{reg.time}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] tracking-widest border ${
                          reg.status === 'DONE' ? 'bg-rs-green/10 dark:bg-rs-green/15 text-rs-green border-rs-green/20' : 
                          reg.status === 'SCREENING' ? 'bg-rs-blue/10 dark:bg-rs-blue/15 text-rs-blue border-rs-blue/20' : 
                          'bg-rs-gold/10 dark:bg-rs-gold/15 text-rs-gold border-rs-gold/20'
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link to="/dashboard/queues" className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-[10px] uppercase transition-all">
                          Kelola
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 dark:text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users size={32} className="text-gray-300 dark:text-slate-600 mb-2" />
                        <p className="font-semibold text-gray-600 dark:text-slate-300">Belum ada antrian</p>
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
              <div className="bg-rs-dark-blue border border-gray-100/10 dark:border-white/10 p-8 rounded-2xl text-white shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <h4 className="text-lg font-black tracking-tight">Kapasitas RS</h4>
                  <span className="text-[10px] font-black uppercase bg-white/15 px-2.5 py-1 rounded-full ring-1 ring-white/15">Beban: {percentage}%</span>
                </div>

                <div className="h-2.5 w-full bg-white/15 rounded-full mb-6 relative z-10 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-rs-gold rounded-full transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <Link to="/dashboard/queues" className="block text-center w-full py-3 bg-white text-rs-dark-blue font-black rounded-2xl hover:bg-rs-gold transition-all relative z-10 shadow-sm active:scale-[0.99]">
                  Optimalkan Antrian
                </Link>
              </div>
            );
          })()}

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800">
            <h4 className="font-black text-rs-dark-blue dark:text-slate-50 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-rs-gold" /> Lokasi Pelayanan
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50/70 dark:bg-slate-800/40 rounded-2xl border border-gray-100/70 dark:border-slate-800 hover:border-rs-green/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 dark:text-slate-200">Poli Vaksinasi Lt.1</span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Beban: Rendah (12 Pasien)</span>
                </div>
                <span className="bg-rs-green w-2.5 h-2.5 rounded-full animate-pulse"></span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50/70 dark:bg-slate-800/40 rounded-2xl border border-gray-100/70 dark:border-slate-800 hover:border-rs-green/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 dark:text-slate-200">Poli KIA</span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">Beban: Padat (32 Pasien)</span>
                </div>
                <span className="bg-rs-green w-2.5 h-2.5 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
