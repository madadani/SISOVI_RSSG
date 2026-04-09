import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Search, Filter, Download, MoreVertical, Edit, FileText, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../application/adminService';

const PatientManagementPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await adminService.getPatients();
        setPatients(data);
        setFilteredPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPatients(patients);
    } else {
      const lowercased = searchTerm.toLowerCase();
      setFilteredPatients(patients.filter(p => 
        p.name.toLowerCase().includes(lowercased) || 
        p.nik.includes(lowercased) ||
        (p.passport && p.passport.toLowerCase().includes(lowercased))
      ));
    }
  }, [searchTerm, patients]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Dipanggil': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-rs-dark-blue dark:text-blue-400 flex items-center gap-3">
              <Users size={32} className="text-primary" /> Manajemen Pasien
            </h2>
            <p className="text-gray-500 dark:text-slate-400">Kelola dan pantau seluruh data pasien operasional.</p>
          </div>
        </div>
        
        <button className="px-5 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
          <Download size={20} /> Export Excel
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4 bg-gray-50/50 dark:bg-slate-800/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari NIK, Passport, atau Nama..." 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none font-medium text-gray-800 dark:text-slate-200 transition-all shadow-sm" 
            />
          </div>
          <button className="px-5 py-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-bold rounded-2xl border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm">
            <Filter size={20} /> Filter Kategori
          </button>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 text-sm font-bold border-b border-gray-100 dark:border-slate-800">
                <th className="py-4 px-6 uppercase tracking-wider">Tgl Kunjungan</th>
                <th className="py-4 px-6 uppercase tracking-wider">Identitas Pasien</th>
                <th className="py-4 px-6 uppercase tracking-wider">Jenis Kelamin</th>
                <th className="py-4 px-6 uppercase tracking-wider">Tindakan Terakhir</th>
                <th className="py-4 px-6 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-gray-500 dark:text-slate-400 font-medium">Memuat data dari server...</p>
                  </td>
                </tr>
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="py-4 px-6 whitespace-nowrap text-gray-600 dark:text-slate-300 font-medium">
                      {patient.date}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-800 dark:text-slate-200">{patient.name}</div>
                      <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                        <span className="font-medium">NIK:</span> {patient.nik} <br/>
                        <span className="font-medium">Passport:</span> {patient.passport}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-slate-300">
                      {patient.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {patient.latestVax}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Lihat Rekam Medis">
                          <FileText size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Edit Data">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Hapus Data">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <p className="text-gray-500 dark:text-slate-400 font-medium">Tidak ada pasien yang ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */ }
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/20">
          <span className="text-sm text-gray-500 dark:text-slate-400">Menampilkan {filteredPatients.length} entri aktif</span>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
              <ChevronLeft size={18} />
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm shadow-md">1</button>
            <button className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagementPage;
