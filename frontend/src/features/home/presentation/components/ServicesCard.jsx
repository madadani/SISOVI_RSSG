import { FileText, Download } from 'lucide-react';

const ServicesCard = ({ onNavigateCertificate }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:border-blue-500/50 transition duration-300">
      <div className="bg-rs-light-blue/10 p-6 border-b border-rs-light-blue/20">
        <h3 className="text-2xl font-bold text-rs-dark-blue dark:text-blue-400 mb-2">Layanan Khusus</h3>
        <p className="text-gray-600 dark:text-slate-400">Untuk pasien yang telah memperoleh vaksinasi sebelumnya di RSSG.</p>
      </div>
      <div className="p-6 space-y-4">
        <button 
          onClick={onNavigateCertificate}
          className="w-full py-4 bg-rs-green text-white rounded-xl font-bold text-lg hover:bg-rs-green/90 transition shadow-md flex justify-center items-center gap-2">
          <FileText size={20} />
          Cetak Sertifikat Vaksin
        </button>
        <button 
          onClick={onNavigateCertificate}
          className="w-full py-4 bg-rs-light-blue text-white rounded-xl font-bold text-lg hover:bg-rs-light-blue/90 transition shadow-md flex justify-center items-center gap-2">
          <Download size={20} />
          Unduh E-Sertifikat
        </button>
      </div>
    </div>
  );
};

export default ServicesCard;
