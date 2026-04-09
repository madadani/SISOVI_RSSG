import React from 'react';
import SearchableSelect from '../../../../shared/components/ui/SearchableSelect';
import { COUNTRIES } from '../../../../core/constants/countries';

const SERVICE_TYPES = [
  'Meningitis', 'Yellow Fever', 'Polio', 'Influenza', 'Hepatitis B', 'COVID-19', 'Lainnya'
];

const PatientDataStep = ({ formData, updateField }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b dark:border-slate-800 pb-4 mb-6">
        <h3 className="text-2xl font-bold text-[#1e9b9b] dark:text-[#26d0d0] mb-2">Formulir Persetujuan Tindakan Vaksinasi</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Row 1 */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Lokasi Pelayanan</label>
          <input 
            type="text" 
            value="RSSG Gemolong"
            readOnly
            className="w-full p-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Jenis Pelayanan</label>
          <select 
            value={formData.serviceType || ''}
            onChange={(e) => updateField('serviceType', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
          >
            <option value="">-- Pilih Jenis Pelayanan --</option>
            {SERVICE_TYPES.map(t => <option key={t} value={t} className="dark:bg-slate-800">{t}</option>)}
          </select>
        </div>

        {/* Row 2 */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">No. Passport</label>
          <input 
            type="text" 
            value={formData.passportNumber || ''}
            onChange={(e) => updateField('passportNumber', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
            placeholder="Masukkan No. Passport"
          />
        </div>
        
        <SearchableSelect 
          label="Negara Tujuan"
          options={COUNTRIES}
          value={formData.destinationCountry}
          onChange={(val) => updateField('destinationCountry', val)}
          placeholder="-- Pilih negara tujuan --"
        />

        {/* Row 3 */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Nama (sesuai halaman satu passport)</label>
          <input 
            type="text" 
            value={formData.namePassport1 || ''}
            onChange={(e) => updateField('namePassport1', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Nama (sesuai halaman empat passport)</label>
          <input 
            type="text" 
            value={formData.namePassport4 || ''}
            onChange={(e) => updateField('namePassport4', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
          />
        </div>

        {/* Row 4 */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Tanggal Lahir</label>
          <input 
            type="date" 
            value={formData.birthdate || ''}
            onChange={(e) => updateField('birthdate', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300 mb-2">Jenis Kelamin</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="gender" 
                checked={formData.gender === 'L'}
                onChange={() => updateField('gender', 'L')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              />
              <span className="text-sm text-gray-700 dark:text-slate-300">Laki-Laki</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="gender" 
                checked={formData.gender === 'P'}
                onChange={() => updateField('gender', 'P')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              />
              <span className="text-sm text-gray-700 dark:text-slate-300">Perempuan</span>
            </label>
          </div>
        </div>

        {/* Row 5 */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Email</label>
          <input 
            type="email" 
            value={formData.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">Tanggal Berangkat</label>
          <input 
            type="date" 
            value={formData.departureDate || ''}
            onChange={(e) => updateField('departureDate', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>

        {/* Row 6 */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-800 dark:text-slate-300">No. Handphone</label>
          <input 
            type="tel" 
            value={formData.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full p-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDataStep;
