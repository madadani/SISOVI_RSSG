import React, { useState, useEffect } from 'react';
import { Syringe, Loader2, ChevronDown } from 'lucide-react';
import { screeningService } from '../../../screening/application/screeningService';

const ScreeningCard = ({ onNavigateScreening }) => {
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVaccines() {
      try {
        const data = await screeningService.getVaccines();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch vaccines for home', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVaccines();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.1)] transition-all duration-500">
      <div className="bg-primary/5 p-6 border-b border-primary/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Syringe className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-blue-400 tracking-tight">Jenis Pelayanan</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Pilih salah satu layanan untuk memulai proses skrining.</p>
      </div>
      
      <div className="p-6 space-y-4">
        {loading ? (
          <div className="py-6 flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <p className="text-sm text-gray-400 dark:text-slate-500 font-medium">Memuat layanan...</p>
          </div>
        ) : (
          <div className="relative">
            <select
              value={selectedVaccine}
              onChange={(e) => setSelectedVaccine(e.target.value)}
              className="w-full py-4 px-5 pr-12 rounded-xl font-bold text-lg border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-[#00adef] focus:ring-2 focus:ring-[#00adef]/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">-- Pilih Jenis Pelayanan --</option>
              {services.map((vax) => (
                <option key={vax.id} value={vax.name} className="dark:bg-slate-800">{vax.name}</option>
              ))}
            </select>
            <ChevronDown size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          </div>
        )}

        <button 
          disabled={!selectedVaccine}
          onClick={() => onNavigateScreening(selectedVaccine)}
          className={`w-full py-4 rounded-xl font-extrabold text-xl transition-all duration-500 flex justify-center items-center gap-2 shadow-lg ${
            selectedVaccine 
              ? 'bg-[#007bff] text-white hover:bg-[#0069d9] hover:-translate-y-0.5 transform' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60'
          }`}
        >
          Lakukan Skrining
        </button>
      </div>
    </div>
  );
};

export default ScreeningCard;
