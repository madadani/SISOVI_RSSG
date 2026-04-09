import React from 'react';

const PURPOSES = ['Perjalanan Internasional', 'Ibadah Umrah/Haji', 'Keperluan Kerja', 'Program Imunisasi Rutin', 'Lainnya'];

const VaccineSelectStep = ({ formData, updateField, toggleVaccine, availableVaccines, locations }) => {
  // Filter only the 3 requested vaccines
  const filteredVaccines = availableVaccines.filter(v => 
    v.name.includes('Meningitis') || 
    v.name.includes('Yellow Fever') || 
    v.name.includes('Polio')
  );

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold border-b dark:border-slate-800 pb-2 mb-4 text-gray-800 dark:text-blue-400">2. Pilihan Vaksinasi</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Jenis Vaksin (Bisa pilih lebih dari 1)</label>
          <div className="space-y-3">
            {filteredVaccines.length > 0 ? (
              filteredVaccines.map(v => (
                <label 
                  key={v.id} 
                  className={`flex items-center gap-2 border-2 p-3.5 rounded-2xl cursor-pointer transition-all ${
                    formData.vaccines.includes(v.id) 
                      ? 'border-[#00adef] bg-[#00adef]/5 dark:bg-[#00adef]/10 shadow-sm' 
                      : 'border-slate-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={formData.vaccines.includes(v.id)}
                    onChange={() => toggleVaccine(v.id)}
                    className="w-5 h-5 text-[#00adef] rounded-lg accent-[#00adef]" 
                  />
                  <div>
                    <span className="font-bold text-gray-800 dark:text-white block text-sm">{v.name}</span>
                    <span className="text-xs text-[#00adef] font-black uppercase tracking-wider">Rp {v.price?.toLocaleString()}</span>
                  </div>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-slate-400 italic">Memuat daftar vaksin...</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Tujuan Vaksinasi</label>
            <div className="grid grid-cols-1 gap-2">
              {PURPOSES.map(t => (
                <label key={t} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                  formData.purpose === t 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300' 
                    : 'border-transparent text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}>
                  <input 
                    type="radio" 
                    name="tujuan" 
                    checked={formData.purpose === t}
                    onChange={() => updateField('purpose', t)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700" 
                  />
                  <span className="text-sm font-medium">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-bold text-gray-800 dark:text-slate-300 mb-2">Tanggal Kunjungan</label>
              <input 
                type="date" 
                value={formData.visitDate || ''}
                onChange={(e) => updateField('visitDate', e.target.value)}
                className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 dark:text-slate-300 mb-2">Waktu Kunjungan</label>
              <select 
                value={formData.visitTime || ''}
                onChange={(e) => updateField('visitTime', e.target.value)}
                className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
              >
                <option value="" className="dark:bg-slate-800">-- Jam --</option>
                <option value="08:00" className="dark:bg-slate-800">08:00 - 09:00</option>
                <option value="09:00" className="dark:bg-slate-800">09:00 - 10:00</option>
                <option value="10:00" className="dark:bg-slate-800">10:00 - 11:00</option>
                <option value="11:00" className="dark:bg-slate-800">11:00 - 12:00</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccineSelectStep;
