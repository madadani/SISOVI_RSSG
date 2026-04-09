import React from 'react';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import { formatDate } from '../../../../core/utils/formatters';

const SuccessStep = ({ formData, result }) => {
  // Use real queue number from backend result or fallback to mock
  const queueNum = result?.queueNumber || 'VK-PENDING-000';

  return (
    <div className="space-y-6 text-center py-8 animate-in zoom-in duration-500">
      <div className="relative inline-block">
        <div className="absolute inset-0 scale-150 bg-rs-green/20 rounded-full blur-2xl animate-pulse"></div>
        <CheckCircle className="w-24 h-24 text-rs-green mx-auto relative z-10" />
      </div>
      
      <div>
        <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Pendaftaran Berhasil!</h3>
        <p className="text-gray-600 dark:text-slate-400 max-w-md mx-auto">
          Terima kasih <span className="font-bold text-rs-dark-blue dark:text-blue-400">{result?.patientName || formData?.name || 'Pasien'}</span>. 
          Pendaftaran Anda telah kami terima dan sedang dalam proses verifikasi.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-8 max-w-sm mx-auto my-8 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        <div className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Nomor Antrian</div>
        <div className="text-3xl font-black text-primary mb-6 tracking-tighter group-hover:scale-105 transition-transform">{queueNum}</div>
        
        <div className="w-48 h-48 bg-gray-50 dark:bg-white rounded-2xl border-2 border-gray-100 dark:border-slate-800 mx-auto flex items-center justify-center relative overflow-hidden group">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${queueNum}`} 
            alt="QR Code Antrian" 
            className="w-40 h-40 object-contain mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <div className="mt-6 space-y-1">
          <p className="text-sm font-bold text-gray-700 dark:text-slate-300">Waktu Kedatangan:</p>
          <p className="text-lg font-black text-rs-dark-blue dark:text-blue-400">
            {formData?.visitDate ? formatDate(formData.visitDate, 'EEEE, dd MMMM yyyy') : 'Senin, 12 Oktober 2026'}
          </p>
          <p className="text-md font-bold text-rs-blue dark:text-blue-300">
            Pukul {formData?.visitTime || '08:00'} - 09:00 WIB
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-center gap-4">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Lokasi</p>
            <p className="text-xs font-bold text-gray-600 dark:text-slate-400">Poli Vaksinasi RSSG</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
        <button className="flex-1 px-6 py-4 bg-rs-light-blue text-white font-bold rounded-2xl shadow-lg shadow-rs-light-blue/30 hover:bg-rs-light-blue/90 hover:translate-y-[-2px] active:translate-y-0 transition flex items-center justify-center gap-2">
          <Download size={20} /> Unduh Bukti
        </button>
        <button className="flex-1 px-6 py-4 bg-rs-green text-white font-bold rounded-2xl shadow-lg shadow-rs-green/30 hover:bg-rs-green/90 hover:translate-y-[-2px] active:translate-y-0 transition flex items-center justify-center gap-2">
          <Share2 size={20} /> Bagikan WA
        </button>
      </div>
      
      <p className="text-xs text-gray-400 dark:text-slate-500 italic mt-4">
        * Tunjukkan QR Code ini kepada petugas pendaftaran saat tiba di lokasi.
      </p>
    </div>
  );
};

export default SuccessStep;
