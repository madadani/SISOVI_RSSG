import { useState } from 'react';
import { FileText, QrCode, Download, Loader2, ExternalLink } from 'lucide-react';
import { certificateService } from '../../application/certificateService';

const CertificateCard = ({ id, vaccineName, patientName, date, batchNumber }) => {
  const [downloading, setDownloading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Generate QR data based on certificate info
  const qrData = `RSSG-CERT|${patientName}|${vaccineName}|${batchNumber}|${date}`;

  const handleDownload = async () => {
    if (!id) {
      // Fallback: generate a printable certificate page
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html><head>
          <title>Sertifikat Vaksinasi - ${patientName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 3px solid #22c55e; padding-bottom: 20px; margin-bottom: 28px; }
            .header h1 { font-size: 22px; color: #1e3a5f; }
            .header p { font-size: 12px; color: #64748b; margin-top: 6px; }
            .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 16px; border-radius: 100px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; }
            .info-table { width: 100%; border-collapse: collapse; }
            .info-table td { padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
            .info-table td:first-child { font-weight: 700; color: #64748b; width: 40%; background: #f8fafc; }
            .qr-section { text-align: center; margin: 28px 0; }
            .qr-section img { width: 140px; height: 140px; }
            .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 28px; }
          </style>
        </head><body>
          <div class="header">
            <h1>SERTIFIKAT VAKSINASI</h1>
            <p>International Certificate of Vaccination — RS Sultan Agung Gemolong</p>
          </div>
          <div style="text-align:center"><span class="badge">✅ Terverifikasi</span></div>
          <table class="info-table">
            <tr><td>Nama Pasien</td><td>${patientName}</td></tr>
            <tr><td>Jenis Vaksin</td><td>${vaccineName}</td></tr>
            <tr><td>Tanggal Vaksinasi</td><td>${date}</td></tr>
            <tr><td>Nomor Batch</td><td>${batchNumber}</td></tr>
            <tr><td>Fasilitas Kesehatan</td><td>RS Sultan Agung Gemolong</td></tr>
          </table>
          <div class="qr-section">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}" alt="QR" />
            <p style="font-size:10px;color:#94a3b8;margin-top:8px">Scan untuk verifikasi keaslian</p>
          </div>
          <div class="footer">
            <p>Dokumen ini diterbitkan secara digital oleh SISOVI-RSSG</p>
            <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
          </div>
        </body></html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => { printWindow.print(); }, 800);
      return;
    }

    // If we have a real certificate ID, try downloading from backend
    setDownloading(true);
    try {
      const blob = await certificateService.downloadCertificate(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sertifikat_${vaccineName}_${patientName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback to print if download fails  
      console.error('Download failed, using print fallback', err);
      handleDownload(); // will hit the !id branch
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition bg-white dark:bg-slate-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-rs-green/10 p-3 rounded-full text-rs-green shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-rs-dark-blue dark:text-white">{vaccineName}</h4>
            <p className="text-sm text-gray-600 dark:text-slate-400">{patientName} • Tgl: {date}</p>
            <p className="text-xs text-gray-500 dark:text-slate-500">Batch: {batchNumber} • RSSG Gemolong</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setShowQR(!showQR)}
            className="flex-1 md:flex-none px-4 py-2 border-2 border-rs-light-blue text-rs-light-blue rounded-lg font-semibold hover:bg-rs-light-blue hover:text-white transition flex items-center justify-center gap-2"
          >
            <QrCode size={18} /> E-Sertifikat
          </button>
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 md:flex-none px-4 py-2 bg-rs-green text-white rounded-lg font-semibold hover:bg-rs-green/90 transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
            Cetak ICV
          </button>
        </div>
      </div>

      {/* QR Code Panel */}
      {showQR && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 inline-block">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`} 
              alt="QR Sertifikat" 
              className="w-36 h-36"
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500">Scan QR Code untuk verifikasi keaslian sertifikat</p>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
