import React from 'react';
import { UploadCloud, FileText, Check } from 'lucide-react';
import { formatDate } from '../../../../core/utils/formatters';

const ConfirmUploadStep = ({ formData, updateField, availableVaccines }) => {
  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField(field, file);
    }
  };

  // Map selected vaccine IDs to names for display
  const selectedVaccineNames = formData.vaccines
    .map(id => availableVaccines.find(v => v.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold border-b dark:border-slate-800 pb-2 mb-4 text-gray-800 dark:text-blue-400">4. Konfirmasi & Upload Dokumen</h3>
      
      <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-5 rounded-2xl mb-6">
        <h4 className="font-bold mb-3 text-rs-dark-blue dark:text-blue-300 flex items-center gap-2">
          <FileText size={18} /> Ringkasan Pendaftaran
        </h4>
        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
          <div className="flex justify-between border-b border-blue-100/50 dark:border-slate-800 pb-1">
            <span className="text-gray-500 dark:text-slate-400">Nama Pasien:</span>
            <span className="font-bold text-gray-800 dark:text-slate-200">{formData.namePassport1 || formData.name || '-'}</span>
          </div>
          <div className="flex justify-between border-b border-blue-100/50 dark:border-slate-800 pb-1">
            <span className="text-gray-500 dark:text-slate-400">Jenis Vaksin:</span>
            <span className="font-bold text-gray-800 dark:text-slate-200">{selectedVaccineNames.join(', ') || 'Belum dipilih'}</span>
          </div>
          <div className="flex justify-between border-b border-blue-100/50 dark:border-slate-800 pb-1">
            <span className="text-gray-500 dark:text-slate-400">Tanggal Kunjungan:</span>
            <span className="font-bold text-gray-800 dark:text-slate-200">
              {formData.visitDate ? formatDate(formData.visitDate, 'EEEE, dd MMMM yyyy') : '-'}
            </span>
          </div>
          <div className="flex justify-between border-b border-blue-100/50 dark:border-slate-800 pb-1">
            <span className="text-gray-500 dark:text-slate-400">Jam Kunjungan:</span>
            <span className="font-bold text-gray-800 dark:text-slate-200">{formData.visitTime || '-'} WIB</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="group transition-all">
          <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Foto / Scan KTP *</label>
          <div className="relative">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${formData.ktpFile ? 'border-rs-green bg-green-50/30 dark:bg-green-900/10' : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.ktpFile ? (
                  <>
                    <div className="bg-rs-green text-white p-2 rounded-full mb-2">
                      <Check size={20} />
                    </div>
                    <p className="text-sm font-bold text-rs-green dark:text-green-400 text-center px-4 truncate max-w-xs">{formData.ktpFile.name}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Klik untuk mengganti berkas</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-slate-400"><span className="font-semibold">Klik untuk unggah</span> atau seret berkas</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">PNG, JPG atau PDF (Maks. 5MB)</p>
                  </>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleFileChange('ktpFile', e)} />
            </label>
          </div>
        </div>

        <div className="group transition-all">
          <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Buku Vaksin (Opsional)</label>
          <div className="relative">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${formData.vaccineBookFile ? 'border-rs-blue bg-blue-50/30 dark:bg-blue-900/10' : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.vaccineBookFile ? (
                  <>
                    <div className="bg-rs-blue text-white p-2 rounded-full mb-2">
                      <Check size={20} />
                    </div>
                    <p className="text-sm font-bold text-rs-blue dark:text-blue-400 text-center px-4 truncate max-w-xs">{formData.vaccineBookFile.name}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Klik untuk mengganti berkas</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-slate-400"><span className="font-semibold">Klik untuk unggah</span> atau seret berkas</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">PNG, JPG atau PDF (Maks. 5MB)</p>
                  </>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleFileChange('vaccineBookFile', e)} />
            </label>
          </div>
        </div>

        <label className="flex items-start gap-3 mt-6 cursor-pointer bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30 group transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <div className="relative flex items-center pt-0.5">
            <input 
              type="checkbox" 
              checked={formData.consent}
              onChange={(e) => updateField('consent', e.target.checked)}
              className="w-5 h-5 text-primary rounded border-gray-300 dark:border-slate-700 focus:ring-primary cursor-pointer dark:bg-slate-800" 
            />
          </div>
          <span className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
            Saya menyatakan bahwa data yang saya isikan adalah benar dan saya menyetujui tindakan vaksinasi yang akan diberikan sesuai standar pelayanan medis. <span className="font-bold text-rs-dark-blue dark:text-blue-400">(Informed Consent)</span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default ConfirmUploadStep;
