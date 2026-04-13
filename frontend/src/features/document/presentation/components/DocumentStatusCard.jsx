import React, { useState } from 'react';
import { CheckCircle, AlertCircle, File, UploadCloud, Upload, Loader2 } from 'lucide-react';
import { documentService } from '../../application/documentService';

const STATUS_CONFIG = {
  verified: {
    icon: CheckCircle,
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    label: '✅ Lengkap & Diverifikasi',
  },
  rejected: {
    icon: AlertCircle,
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
    label: '⚠️ Kurang / Ditolak',
  },
  pending: {
    icon: File,
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    label: '⏳ Menunggu Verifikasi',
  },
};

const DocumentStatusCard = ({ title, status, note, registrationId, documentType, onUploadSuccess }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;
  const isRejected = status === 'rejected';
  const isVerified = status === 'verified';

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file maks. 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Format file: JPG, PNG, WebP, atau PDF');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setFileName(file.name);

    try {
      await documentService.uploadDocument(registrationId, documentType || title, file);
      onUploadSuccess?.();
    } catch (err) {
      setUploadError('Gagal upload. Coba lagi.');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border ${isRejected ? 'border-red-200 dark:border-red-900/50' : 'border-gray-100 dark:border-slate-800'} p-5 relative overflow-hidden transition-colors`}>
      {isRejected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className={`${config.bgColor} ${config.textColor} p-3 rounded-lg shrink-0`}>
            <Icon size={24} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-800 dark:text-slate-200 truncate">{title}</h4>
            <p className={`text-sm ${config.textColor} font-medium`}>{config.label}</p>
            {note && <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Catatan: {note}</p>}
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0">
          {isVerified ? (
            <button disabled className="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 rounded-lg text-sm font-semibold whitespace-nowrap cursor-not-allowed">
              Sudah Lengkap
            </button>
          ) : uploading ? (
            <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary">
              <Loader2 size={18} className="animate-spin" />
              <span className="truncate max-w-[120px]">Mengupload {fileName}...</span>
            </div>
          ) : (
            <label className={`w-full sm:w-auto px-6 py-2 ${isRejected ? 'bg-rs-gold text-rs-dark-blue hover:bg-rs-gold/80' : 'border-2 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'} rounded-lg text-sm font-bold cursor-pointer transition flex items-center justify-center gap-2 whitespace-nowrap shadow-sm`}>
              {isRejected ? <UploadCloud size={18} /> : <Upload size={18} />}
              {isRejected ? 'Upload Ulang' : 'Ganti File'}
              <input 
                type="file" 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="mt-3 text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertCircle size={14} /> {uploadError}
        </div>
      )}
    </div>
  );
};

export default DocumentStatusCard;
