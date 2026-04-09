import { CheckCircle, AlertCircle, File, UploadCloud, Upload } from 'lucide-react';

const STATUS_CONFIG = {
  verified: {
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    label: '✅ Lengkap & Diverifikasi',
  },
  rejected: {
    icon: AlertCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    label: '⚠️ Kurang / Ditolak',
  },
  pending: {
    icon: File,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    label: '⏳ Menunggu Verifikasi',
  },
};

const DocumentStatusCard = ({ title, status, note }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;
  const isRejected = status === 'rejected';
  const isVerified = status === 'verified';

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isRejected ? 'border-red-200' : ''} p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden`}>
      {isRejected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>}
      <div className="flex items-center gap-4 w-full">
        <div className={`${config.bgColor} ${config.textColor} p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{title}</h4>
          <p className={`text-sm ${config.textColor} font-medium`}>{config.label}</p>
          {note && <p className="text-xs text-gray-500 mt-1">Catatan: {note}</p>}
        </div>
      </div>
      {isVerified ? (
        <button disabled className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm font-semibold whitespace-nowrap cursor-not-allowed">
          Sudah Lengkap
        </button>
      ) : isRejected ? (
        <label className="px-6 py-2 bg-rs-gold text-rs-dark-blue rounded-lg text-sm font-bold cursor-pointer hover:bg-rs-gold/80 transition flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
          <UploadCloud size={18} /> Upload Ulang
          <input type="file" className="hidden" />
        </label>
      ) : (
        <label className="px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-50 transition flex items-center justify-center gap-2 whitespace-nowrap">
          <Upload size={18} /> Ganti File
          <input type="file" className="hidden" />
        </label>
      )}
    </div>
  );
};

export default DocumentStatusCard;
