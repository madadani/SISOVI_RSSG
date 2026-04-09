import { FileText, QrCode, Download } from 'lucide-react';

const CertificateCard = ({ vaccineName, patientName, date, batchNumber }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-rs-green/10 p-3 rounded-full text-rs-green">
            <FileText size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-rs-dark-blue">{vaccineName}</h4>
            <p className="text-sm text-gray-600">{patientName} • Tgl: {date}</p>
            <p className="text-xs text-gray-500">Batch: {batchNumber} • RSSG Gemolong</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 border-2 border-rs-light-blue text-rs-light-blue rounded-lg font-semibold hover:bg-rs-light-blue hover:text-white transition flex items-center justify-center gap-2">
            <QrCode size={18} /> E-Sertifikat
          </button>
          <button className="flex-1 md:flex-none px-4 py-2 bg-rs-green text-white rounded-lg font-semibold hover:bg-rs-green/90 transition shadow flex items-center justify-center gap-2">
            <Download size={18} /> Cetak ICV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
