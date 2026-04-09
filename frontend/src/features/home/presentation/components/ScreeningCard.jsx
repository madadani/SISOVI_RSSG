import React, { useState } from 'react';
import { Syringe, CheckCircle2 } from 'lucide-react';

const ScreeningCard = ({ onNavigateScreening }) => {
  const [selectedVaccine, setSelectedVaccine] = useState('');

  const services = [
    { id: 'Yellow Fever', label: 'Yellow Fever' },
    { id: 'Meningitis', label: 'Meningitis' },
    { id: 'Polio', label: 'Polio' }
  ];

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
      
      <div className="p-6 space-y-3">
        {services.map((vax) => (
          <button
            key={vax.id}
            onClick={() => setSelectedVaccine(prev => prev === vax.id ? '' : vax.id)}
            className={`w-full py-4 px-5 rounded-xl font-bold text-lg transition-all duration-300 flex justify-center items-center gap-3 relative overflow-hidden ${
              selectedVaccine === vax.id
                ? 'bg-[#00adef] text-white shadow-md scale-[1.01] border-2 border-[#00adef]'
                : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-[#00adef] hover:text-[#00adef] hover:bg-[#00adef]/5'
            }`}
          >
            {vax.label}
            {selectedVaccine === vax.id && (
              <div className="absolute right-4 bg-white/20 p-0.5 rounded-full">
                <CheckCircle2 size={20} className="text-white" />
              </div>
            )}
          </button>
        ))}

        <div className="pt-4">
          <button 
            disabled={!selectedVaccine}
            onClick={() => onNavigateScreening(selectedVaccine)}
            className={`w-full py-4 rounded-xl font-extrabold text-xl transition-all duration-500 flex justify-center items-center gap-2 shadow-lg ${
              selectedVaccine 
                ? 'bg-[#007bff] text-white hover:bg-[#0069d9] hover:-translate-y-0.5 transform' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            Lakukan Skrining
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreeningCard;
