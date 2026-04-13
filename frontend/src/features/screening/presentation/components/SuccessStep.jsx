import React, { useRef } from 'react';
import { CheckCircle, Download, Share2, Printer } from 'lucide-react';
import { formatDate } from '../../../../core/utils/formatters';

const SuccessStep = ({ formData, result }) => {
  const queueNum = result?.queueNumber || 'VK-PENDING-000';
  const patientName = result?.patientName || formData?.name || 'Pasien';
  const visitDate = formData?.visitDate
    ? formatDate(formData.visitDate, 'EEEE, dd MMMM yyyy')
    : 'Belum dijadwalkan';
  const visitTime = formData?.visitTime || '08:00';

  // ─── Unduh Bukti Pendaftaran (Print-to-PDF) ────────────────
  const printRef = useRef(null);

  const handleDownload = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head>
        <title>Bukti Pendaftaran - ${queueNum}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
          .header { text-align: center; margin-bottom: 32px; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; }
          .header h1 { font-size: 20px; color: #1e3a5f; }
          .header p { font-size: 12px; color: #64748b; margin-top: 4px; }
          .queue-box { text-align: center; background: #f0f9ff; border: 2px dashed #3b82f6; border-radius: 16px; padding: 24px; margin: 24px 0; }
          .queue-box .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; }
          .queue-box .number { font-size: 32px; font-weight: 900; color: #3b82f6; margin: 8px 0; }
          .qr { text-align: center; margin: 20px 0; }
          .qr img { width: 160px; height: 160px; }
          .info-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .info-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #e2e8f0; }
          .info-table td:first-child { font-weight: 700; color: #64748b; width: 40%; }
          .footer { text-align: center; margin-top: 32px; font-size: 11px; color: #94a3b8; }
          @media print { body { padding: 20px; } }
        </style>
      </head><body>
        <div class="header">
          <h1>BUKTI PENDAFTARAN VAKSINASI</h1>
          <p>RS Sultan Agung Gemolong — Sistem Informasi Vaksinasi Online</p>
        </div>
        <div class="queue-box">
          <div class="label">Nomor Antrian</div>
          <div class="number">${queueNum}</div>
        </div>
        <div class="qr">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${queueNum}" alt="QR" />
        </div>
        <table class="info-table">
          <tr><td>Nama Pasien</td><td>${patientName}</td></tr>
          <tr><td>Tanggal Kunjungan</td><td>${visitDate}</td></tr>
          <tr><td>Jam Kunjungan</td><td>${visitTime} WIB</td></tr>
          <tr><td>Lokasi</td><td>Poli Vaksinasi RSSG</td></tr>
        </table>
        <div class="footer">
          <p>Tunjukkan QR Code ini kepada petugas pendaftaran saat tiba di lokasi.</p>
          <p style="margin-top:8px">Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
        </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    // wait for QR image to load
    setTimeout(() => {
      printWindow.print();
    }, 800);
  };

  // ─── Bagikan via WhatsApp ──────────────────────────────────
  const handleShareWA = () => {
    const text = `✅ *Pendaftaran Vaksinasi RSSG Berhasil!*\n\n` +
      `👤 Nama: ${patientName}\n` +
      `🎫 No. Antrian: *${queueNum}*\n` +
      `📅 Tanggal: ${visitDate}\n` +
      `🕐 Jam: ${visitTime} WIB\n` +
      `📍 Lokasi: Poli Vaksinasi RSSG\n\n` +
      `Tunjukkan pesan ini kepada petugas saat tiba di lokasi.`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="space-y-6 text-center py-8 animate-in zoom-in duration-500" ref={printRef}>
      <div className="relative inline-block">
        <div className="absolute inset-0 scale-150 bg-rs-green/20 rounded-full blur-2xl animate-pulse"></div>
        <CheckCircle className="w-24 h-24 text-rs-green mx-auto relative z-10" />
      </div>
      
      <div>
        <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Pendaftaran Berhasil!</h3>
        <p className="text-gray-600 dark:text-slate-400 max-w-md mx-auto">
          Terima kasih <span className="font-bold text-rs-dark-blue dark:text-blue-400">{patientName}</span>. 
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
            {visitDate}
          </p>
          <p className="text-md font-bold text-rs-blue dark:text-blue-300">
            Pukul {visitTime} WIB
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
        <button 
          onClick={handleDownload}
          className="flex-1 px-6 py-4 bg-rs-light-blue text-white font-bold rounded-2xl shadow-lg shadow-rs-light-blue/30 hover:bg-rs-light-blue/90 hover:translate-y-[-2px] active:translate-y-0 transition flex items-center justify-center gap-2"
        >
          <Download size={20} /> Unduh Bukti
        </button>
        <button 
          onClick={handleShareWA}
          className="flex-1 px-6 py-4 bg-rs-green text-white font-bold rounded-2xl shadow-lg shadow-rs-green/30 hover:bg-rs-green/90 hover:translate-y-[-2px] active:translate-y-0 transition flex items-center justify-center gap-2"
        >
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
