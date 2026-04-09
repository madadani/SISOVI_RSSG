import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Play, SkipForward, PauseCircle, CheckCircle, Volume2, UserX, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../application/adminService';
import Swal from 'sweetalert2';

const QueueManagementPage = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Custom Styled Swal
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
  });

  const customSwal = Swal.mixin({
    customClass: {
      popup: 'rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl dark:bg-slate-900',
      title: 'text-2xl font-black text-rs-dark-blue dark:text-white',
      confirmButton: 'px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30',
      cancelButton: 'px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-bold rounded-xl'
    },
    buttonsStyling: false,
    background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
  });

  const fetchQueue = async () => {
    try {
      const data = await adminService.getQueues();
      // separate active/pending
      const active = data.find(q => q.status === 'CALLED' || q.status === 'SCREENING' || q.status === 'VACCINATING') || null;
      let waiting = data.filter(q => q.id !== active?.id && q.status !== 'DONE' && q.status !== 'SKIPPED');
      
      setActivePatient(active);
      setQueue(waiting);
    } catch (err) {
      console.error('Failed to fetch queues', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const intv = setInterval(fetchQueue, 15000);
    return () => clearInterval(intv);
  }, []);

  const handleNext = async () => {
    if (queue.length === 0) {
      Toast.fire({ icon: 'info', title: 'Antrian sudah habis' });
      return;
    }
    
    // Mark current as done if there was one
    if (activePatient) {
       await adminService.setQueueStatus(activePatient.id, 'DONE');
    }

    const nextList = [...queue];
    const nextPatient = nextList.shift();
    
    await adminService.setQueueStatus(nextPatient.id, 'CALLED');
    
    Toast.fire({
      icon: 'success',
      title: `Memanggil ${nextPatient.name}`
    });

    fetchQueue();
  };

  const handleSkipOrMarkAsDone = async (statusArg) => {
     if(!activePatient) return;

     const actionText = statusArg === 'DONE' ? 'Selesaikan' : 'Lewati';

     const result = await customSwal.fire({
        title: `${actionText} Antrian?`,
        text: `Konfirmasi untuk ${actionText.toLowerCase()} pasien ${activePatient.name}.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Iya, Lanjutkan',
        cancelButtonText: 'Batal'
     });

     if (result.isConfirmed) {
        try {
          await adminService.setQueueStatus(activePatient.id, statusArg);
          Toast.fire({ icon: 'success', title: 'Status diperbarui' });
          fetchQueue();
        } catch (err) {
          Toast.fire({ icon: 'error', title: 'Gagal memperbarui status' });
        }
     }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'WAITING': return <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold">Menunggu</span>;
      case 'CALLED': return <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">Dipanggil</span>;
      case 'SKIPPED': return <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold">Dilewati</span>;
      case 'DONE': return <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">Selesai</span>;
      default: return null;
    }
  };

  const filteredQueue = queue.filter(q => q.id.toLowerCase().includes(searchTerm.toLowerCase()) || q.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-rs-dark-blue dark:text-blue-400 flex items-center gap-3">
            <Clock size={26} className="text-primary" /> Antrian Harian
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Atur pemanggilan dan status antrian pasien hari ini secara realtime.</p>
        </div>
      </div>

      {/* Active Call Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl mb-8 shadow-sm border border-gray-100 dark:border-slate-800 relative overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
             <span className="text-sm font-bold text-gray-500 dark:text-slate-400 tracking-widest uppercase">Sedang Dipanggil</span>
             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-800 animate-pulse">
               <Play size={12} fill="currentColor" /> {activePatient?.time || '--:--'}
             </span>
          </div>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-3xl text-primary dark:text-blue-400">
               <Volume2 size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-rs-dark-blue dark:text-white tracking-tight mb-2">
                {activePatient?.name || 'Tidak ada antrian aktif'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-bold rounded-xl border border-gray-200 dark:border-slate-700 text-sm">
                  {activePatient?.id || '---'}
                </span>
                <span className="px-4 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 font-bold rounded-xl border border-blue-100 dark:border-blue-800 text-sm">
                  {activePatient?.vax || '---'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => handleSkipOrMarkAsDone('DONE')} className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all">Selesai</button>
            <button onClick={() => handleSkipOrMarkAsDone('SKIPPED')} className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-bold rounded-xl transition-all">Lewati</button>
            <button onClick={handleNext} className="flex-1 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Queue List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-slate-800/30">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Daftar Tunggu</h3>
          <div className="relative w-full sm:w-auto min-w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Cari No. Antrian / Nama" 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-sm font-medium text-gray-800 dark:text-slate-200 transition-all shadow-sm" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 font-bold border-b border-gray-100 dark:border-slate-800">
                <th className="py-3 px-5 uppercase tracking-wider text-xs">No. Antrian</th>
                <th className="py-3 px-5 uppercase tracking-wider text-xs">Jadwal</th>
                <th className="py-3 px-5 uppercase tracking-wider text-xs">Identitas Pasien</th>
                <th className="py-3 px-5 uppercase tracking-wider text-xs">Layanan</th>
                <th className="py-3 px-5 uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                    <p className="mt-3 text-sm text-gray-500 dark:text-slate-400 font-medium">Memuat data dari server...</p>
                  </td>
                </tr>
              ) : filteredQueue.length === 0 ? (
                 <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 dark:text-slate-400 font-medium text-sm">
                    Tidak ada antrian yang terdaftar.
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">{item.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 font-bold text-rs-dark-blue dark:text-blue-400 text-sm">
                      {item.time}
                    </td>
                    <td className="py-3 px-5 text-gray-800 dark:text-slate-200 font-bold text-sm">
                      {item.name}
                    </td>
                    <td className="py-3 px-5 text-gray-600 dark:text-slate-300 text-sm">
                      {item.vax}
                    </td>
                    <td className="py-3 px-5">
                      {getStatusBadge(item.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueueManagementPage;
