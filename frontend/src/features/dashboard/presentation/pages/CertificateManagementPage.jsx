import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Printer, Search, Download, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../application/adminService';

const CertificateManagementPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [filteredCerts, setFilteredCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await adminService.getCertificates();
        setCertificates(data);
        setFilteredCerts(data);
      } catch (err) {
        console.error('Failed to fetch certificates', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filtering Logic
  useEffect(() => {
     if (!searchTerm) {
       setFilteredCerts(certificates);
     } else {
       const lowercased = searchTerm.toLowerCase();
       setFilteredCerts(certificates.filter(c => 
         (c.ptName && c.ptName.toLowerCase().includes(lowercased)) || 
         (c.id && c.id.toLowerCase().includes(lowercased))
       ));
     }
  }, [searchTerm, certificates]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SIAP_CETAK': return <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">Siap Cetak</span>;
      case 'TELAH_TERBIT': return <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">Telah Terbit</span>;
      case 'VERIFIKASI': return <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 dark:border-yellow-800">Proses Verifikasi Dokter</span>;
      default: return null;
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
              <FileText size={32} className="text-rs-light-blue" /> Penerbitan Sertifikat
            </h2>
            <p className="text-gray-500 dark:text-slate-400">Verifikasi tanda tangan digital dan cetak sertifikat (Buku Kuning / ICV).</p>
          </div>
        </div>
        
        <button className="px-5 py-3 bg-rs-light-blue text-white font-bold rounded-2xl shadow-lg shadow-rs-light-blue/30 flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
          <Printer size={20} /> Cetak Masal
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Verification Status Card */}
        <div className="bg-gradient-to-br from-rs-dark-blue to-blue-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
          <ShieldCheck size={40} className="text-blue-300 mb-4" />
          <h3 className="text-2xl font-black mb-1">24</h3>
          <p className="text-blue-200 text-sm font-medium">Menunggu Verifikasi Dokter</p>
        </div>
        
        {/* Ready to Print Status Card */}
        <div className="bg-gradient-to-br from-rs-light-blue to-cyan-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
          <FileText size={40} className="text-cyan-200 mb-4" />
          <h3 className="text-2xl font-black mb-1">12</h3>
          <p className="text-cyan-100 text-sm font-medium">Sertifikat Siap Cetak Pagi Ini</p>
        </div>

        {/* Global Security Verify */}
        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-6 flex items-center justify-center flex-col text-center shadow-sm">
           <Search size={32} className="text-gray-400 dark:text-slate-500 mb-3" />
           <p className="text-gray-600 dark:text-slate-400 text-sm font-bold mb-3">Verifikasi Silang Dokumen Digital</p>
           <button className="w-full py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
             <ExternalLink size={16} /> Buka Portal Kemenkes
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4 bg-gray-50/50 dark:bg-slate-800/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Cari ID Sertifikat atau Nama Pasien..." 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-rs-light-blue/40 outline-none font-medium text-gray-800 dark:text-slate-200 transition-all shadow-sm" 
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 text-sm font-bold border-b border-gray-100 dark:border-slate-800">
                <th className="py-4 px-6 uppercase tracking-wider">ID Sertifikat</th>
                <th className="py-4 px-6 uppercase tracking-wider">Nama Pasien</th>
                <th className="py-4 px-6 uppercase tracking-wider">Tindakan Vaksin</th>
                <th className="py-4 px-6 uppercase tracking-wider">Tgl Terbit</th>
                <th className="py-4 px-6 uppercase tracking-wider">Status Dokumen</th>
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
              ) : filteredCerts.length > 0 ? (
                filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="py-4 px-6 font-bold text-gray-800 dark:text-slate-200 whitespace-nowrap">
                      {cert.id}
                      {cert.valid && <CheckCircle2 size={14} className="inline ml-2 text-green-500" title="Valid Secara Kriptografi" />}
                      {!cert.valid && <AlertTriangle size={14} className="inline ml-2 text-yellow-500" title="Belum Tervalidasi" />}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-700 dark:text-slate-300">
                      {cert.ptName}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-slate-400">
                      {cert.vaxType}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-slate-400">
                      {cert.date}
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(cert.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          disabled={cert.status === 'VERIFIKASI'}
                          className="p-2 text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed group-hover:opacity-100 opacity-60" 
                          title="Pratinjau Dokumen"
                        >
                          <FileText size={18} />
                        </button>
                        <button 
                          disabled={cert.status === 'VERIFIKASI'}
                          className="px-3 py-1.5 bg-rs-light-blue text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          <Printer size={14} /> Cetak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 dark:text-slate-400 font-medium">
                    Tidak ada sertifikat yang cocok dengan pencarian Anda.
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

export default CertificateManagementPage;
