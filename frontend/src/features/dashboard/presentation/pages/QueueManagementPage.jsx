import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Play, SkipForward, PauseCircle, CheckCircle, Volume2, UserX, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../application/adminService';

const QueueManagementPage = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const data = await adminService.getQueues();
      // separate active/pending
      const active = data.find(q => q.status === 'CALLED' || q.status === 'SCREENING' || q.status === 'VACCINATING') || null;
      let waiting = data.filter(q => q.id !== active?.id && q.status !== 'DONE' && q.status !== 'SKIPPED');
      
      // if no active but we have waiting, grab first waiting queue? Let's just keep it null until they call
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
    // simulate real-time polling
    const intv = setInterval(fetchQueue, 15000);
    return () => clearInterval(intv);
  }, []);

  const handleNext = async () => {
    if (queue.length === 0) return;
    
    // Mark current as done if there was one
    if (activePatient) {
       await adminService.setQueueStatus(activePatient.id, 'DONE');
    }

    const nextList = [...queue];
    const nextPatient = nextList.shift();
    
    // Set next to CALLED
    await adminService.setQueueStatus(nextPatient.id, 'CALLED');
    nextPatient.status = 'CALLED';
    
    setActivePatient(nextPatient);
    setQueue(nextList);
    // Let's refetch completely to be safe
    fetchQueue();
  };

  const handleSkipOrMarkAsDone = async (statusArg) => {
     if(!activePatient) return;
     await adminService.setQueueStatus(activePatient.id, statusArg);
     setActivePatient(null);
     fetchQueue();
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
          <h2 className="text-3xl font-black text-rs-dark-blue dark:text-blue-400 flex items-center gap-3">
            <Clock size={32} className="text-rs-gold" /> Kontrol Antrian Harian
          </h2>
          <p className="text-gray-500 dark:text-slate-400">Panggil, tunda, atau selesaikan antrian pasien yang sedang berjalan.</p>
        </div>
      </div>

      {/* Active Call Card */}
      <div className="bg-rs-dark-blue dark:bg-slate-900 rounded-3xl p-8 mb-8 text-white flex flex-col lg:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden border border-transparent dark:border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>
        
        <div className="flex-1 relative z-10 w-full text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-white/80">Sedang Dilayani</span>
          </div>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-md">{activePatient ? activePatient.id : '---'}</h3>
          <div className="mt-4 text-xl font-bold text-white/90">
            Atas Nama: <span className="text-rs-gold dark:text-yellow-400 text-2xl">{activePatient ? activePatient.name : 'Belum Ada Antrian'}</span>
          </div>
          <div className="mt-2 text-lg text-white/70 font-medium">
            Tindakan: {activePatient ? activePatient.vax : '-'}
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-end gap-4 relative z-10 w-full lg:w-auto">
          <button 
            onClick={() => handleSkipOrMarkAsDone('DONE')}
            className="flex flex-col items-center justify-center p-4 w-28 h-28 bg-green-500 hover:bg-green-400 rounded-2xl text-white transition-all shadow-lg shadow-green-500/30 active:scale-95 group"
            title="Tandai Selesai"
          >
            <CheckCircle size={36} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Selesai</span>
          </button>
          
          <button 
             className="flex flex-col items-center justify-center p-4 w-28 h-28 bg-white hover:bg-rs-gold rounded-2xl text-rs-dark-blue transition-all shadow-lg active:scale-95 group"
             title="Panggil Ulang Suara"
          >
            <Volume2 size={36} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Panggil</span>
          </button>

          <button 
            onClick={() => handleSkipOrMarkAsDone('SKIPPED')}
            className="flex flex-col items-center justify-center p-4 w-28 h-28 bg-white/10 border border-white/20 hover:bg-white/20 rounded-2xl text-white transition-all shadow-lg active:scale-95 group"
            title="Pasien Tidak Hadir"
          >
            <UserX size={36} className="mb-2 group-hover:scale-110 transition-transform text-red-300" />
            <span className="text-xs font-bold uppercase tracking-wider">Lewati</span>
          </button>
          
          <button 
            onClick={handleNext}
            disabled={queue.length === 0}
            className="flex flex-col items-center justify-center p-4 w-28 h-28 bg-primary hover:bg-blue-400 rounded-2xl text-white transition-all shadow-lg shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group col-span-2 sm:col-span-1"
            title="Panggil Antrian Selanjutnya"
          >
            <SkipForward size={36} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Next</span>
          </button>
        </div>
      </div>

      {/* Queue List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-slate-800/30">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Daftar Tunggu Selanjutnya</h3>
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
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 text-sm font-bold border-b border-gray-100 dark:border-slate-800">
                <th className="py-4 px-6 uppercase tracking-wider">No. Antrian</th>
                <th className="py-4 px-6 uppercase tracking-wider">Nama Pasien</th>
                <th className="py-4 px-6 uppercase tracking-wider">Tindakan</th>
                <th className="py-4 px-6 uppercase tracking-wider">Estimasi Jam</th>
                <th className="py-4 px-6 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
              {filteredQueue.length > 0 ? (
                filteredQueue.map((q) => (
                  <tr key={q.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap text-gray-800 dark:text-slate-200 font-bold text-lg">
                      {q.id}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-700 dark:text-slate-300">
                      {q.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-slate-400 font-medium">
                      {q.vax}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-slate-400 font-medium flex items-center gap-2">
                      <Clock size={16} className="text-primary"/> {q.time} WIB
                    </td>
                    <td className="py-4 px-6 text-right">
                      {getStatusBadge(q.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <p className="text-gray-500 dark:text-slate-400 font-medium">Tidak ada daftar tunggu yang ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueueManagementPage;
