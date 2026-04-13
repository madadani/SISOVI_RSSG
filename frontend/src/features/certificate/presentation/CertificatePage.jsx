import { useState } from 'react';
import { AlertCircle, FileQuestion, Loader2 } from 'lucide-react';
import SearchForm from './components/SearchForm';
import CertificateCard from './components/CertificateCard';
import { certificateService } from '../application/certificateService';

import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';

const CertificatePage = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (nik, dob) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const data = await certificateService.searchCertificates(nik, dob);
      setCerts(data);
    } catch (err) {
      setError('Gagal mencari sertifikat. Pastikan NIK dan Tanggal Lahir sesuai.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 transition-colors duration-300">
      <BackgroundDecorator />
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-3xl">
        <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-rs-dark-blue dark:text-white mb-4">Sertifikat Vaksinasi</h2>
        <p className="text-gray-600 dark:text-slate-400">Unduh E-Sertifikat atau cetak ICV (International Certificate of Vaccination) Anda.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 mb-8 transition-colors">
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 font-bold animate-in fade-in">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {loading && (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-gray-500 dark:text-slate-400 font-medium">Mencari sertifikat...</p>
          </div>
        )}

        {!loading && hasSearched && certs.length === 0 && !error && (
          <div className="py-12 bg-gray-50 dark:bg-slate-800/50 rounded-2xl text-center border-2 border-dashed border-gray-200 dark:border-slate-700 animate-in zoom-in duration-300">
            <FileQuestion size={48} className="mx-auto text-gray-300 dark:text-slate-600 mb-4" />
            <h4 className="text-lg font-bold text-gray-800 dark:text-white">Sertifikat Tidak Ditemukan</h4>
            <p className="text-gray-500 dark:text-slate-400 max-w-xs mx-auto mt-2 text-sm">NIK belum terdaftar atau proses vaksinasi belum selesai diverifikasi oleh petugas.</p>
          </div>
        )}

        {!loading && certs.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-200 dark:border-slate-800 pb-2 flex justify-between items-center">
              <span>Hasil Pencarian</span>
              <span className="text-xs bg-rs-green/10 text-rs-green px-2 py-1 rounded-full">{certs.length} Sertifikat</span>
            </h3>
            
            <div className="grid gap-4">
              {certs.map(cert => (
                <CertificateCard 
                  key={cert.id}
                  id={cert.id}
                  vaccineName={cert.vaccineName || cert.vaccine?.name || 'Vaksin'}
                  patientName={cert.patient?.name || 'Pasien'}
                  date={new Date(cert.issuedDate || cert.issueDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                  batchNumber={cert.batchNumber}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default CertificatePage;
