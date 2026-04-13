import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import QueueNumberForm from './components/QueueNumberForm';
import DocumentStatusCard from './components/DocumentStatusCard';
import { documentService } from '../application/documentService';
import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';

const UploadDocumentPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queueNum, setQueueNum] = useState('');

  const handleSubmitQueueNumber = async (queueNumber) => {
    setLoading(true);
    setError(null);
    setQueueNum(queueNumber);
    try {
      const result = await documentService.getRegistrationStatus(queueNumber);
      setData(result);
    } catch {
      setError('Nomor pendaftaran tidak ditemukan atau terjadi kesalahan server.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!queueNum) return;
    try {
      const result = await documentService.getRegistrationStatus(queueNum);
      setData(result);
    } catch {
      // silently fail
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 transition-colors duration-300">
      <BackgroundDecorator />
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-3xl">
      {!data ? (
        <QueueNumberForm onSubmit={handleSubmitQueueNumber} isLoading={loading} error={error} />
      ) : (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-gray-200 dark:border-slate-800 pb-4 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-rs-dark-blue dark:text-white">Status Dokumen</h2>
              <p className="text-gray-600 dark:text-slate-400">No. Pend: <span className="font-bold text-primary">{data.queueNumber}</span> • Pendaftar: <span className="font-bold">{data.patient?.name}</span></p>
            </div>
            <button onClick={() => setData(null)} className="text-sm text-red-500 font-semibold border border-red-500 dark:border-red-400 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
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
                  registrationId={data.registrationId || data.id}
                  documentType={doc.type}
                  onUploadSuccess={handleRefresh}
                />
              ))
            ) : (
              <div className="py-10 text-center bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700">
                 <p className="text-gray-500 dark:text-slate-400">Belum ada dokumen yang diunggah untuk pendaftaran ini.</p>
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
