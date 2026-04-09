import { useNavigate } from 'react-router-dom';
import { Upload, Megaphone, Stethoscope, ClipboardList, Cross, Syringe, HeartPulse, ShieldAlert, Pill } from 'lucide-react';
import ScreeningCard from './components/ScreeningCard';
import ServicesCard from './components/ServicesCard';
import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';

const HomePage = () => {
  const navigate = useNavigate();

  // Create a localized date string:
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const currentDate = new Date().toLocaleDateString('id-ID', dateOptions);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-10 transition-colors duration-300">
      
      <BackgroundDecorator />

      <div className="container mx-auto px-4 py-10 relative z-10 pt-8">
        
        {/* Date Pill */}
        <div className="flex justify-center mb-6">
           <div className="bg-[#3b82f6] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30">
              {currentDate}
           </div>
        </div>

        {/* Hero Typography */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Sistem Pendaftaran <span className="text-[#3b82f6] dark:text-blue-400">Vaksinasi RSSG</span>
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium">
            Lakukan skrining vaksinasi, cek ketersediaan kuota, dan lacak status dokumen Anda 
            dengan mudah, cepat, dan transparan melalui platform digital pendaftaran mandiri kami.
          </p>
        </div>

        {/* Content Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ScreeningCard onNavigateScreening={(vax) => navigate('/screening', { state: { selectedVaccine: vax } })} />
            <ServicesCard onNavigateCertificate={() => navigate('/certificate')} />
          </div>

          <button 
            onClick={() => navigate('/upload-document')}
            className="w-full py-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-rs-dark-blue dark:text-blue-400 rounded-3xl font-black text-xl hover:bg-rs-gold dark:hover:bg-blue-600 hover:text-white transition shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] flex justify-center items-center gap-3 group">
            <Upload size={28} className="group-hover:-translate-y-1 transition-transform" />
            Lengkapi Dokumen Verifikasi (Re-Upload)
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button className="fixed bottom-8 right-8 bg-[#3b82f6] text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition hover:scale-110 z-50 shadow-blue-500/50">
        <Megaphone size={28} />
      </button>
    </div>
  );
};

export default HomePage;

