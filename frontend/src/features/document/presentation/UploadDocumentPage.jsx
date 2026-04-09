import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import LoginForm from './components/LoginForm';
import DocumentStatusCard from './components/DocumentStatusCard';
import { documentService } from '../application/documentService';
import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';

const UploadDocumentPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (queueNumber) => {
    setLoading(true);
    setError(null);
    try {
      const result = await documentService.getRegistrationStatus(queueNumber);
      setData(result);
    } catch (err) {
      setError('Nomor pendaftaran tidak ditemukan atau terjadi kesalahan server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 pb-20">
      <BackgroundDecorator />
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-3xl">
      {!data ? (
        <LoginForm onLogin={handleLogin} isLoading={loading} error={error} />
      ) : (
        <div className="animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-rs-dark-blue">Status Dokumen</h2>
              <p className="text-gray-600">No. Pend: {data.queueNumber} • Pendaftar: {data.patient?.name}</p>
            </div>
            <button onClick={() => setData(null)} className="text-sm text-red-500 font-semibold border border-red-500 px-4 py-2 rounded hover:bg-red-50 transition">
              Keluar
            </button>
          </div>

          <div className="space-y-4">
            {data.documents?.length > 0 ? (
              data.documents.map(doc => (
                <DocumentStatusCard 
                  key={doc.id}
                  title={doc.type === 'KTP' ? 'Kartu Tanda Penduduk (KTP)' : doc.type}
                  status={doc.status.toLowerCase()} 
                  note={doc.notes}
                />
              ))
            ) : (
              <div className="py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                 <p className="text-gray-500">Belum ada dokumen yang diunggah untuk pendaftaran ini.</p>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UploadDocumentPage;
