import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../../core/config/constants';
import Sidebar from '../components/Sidebar';
import { LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans transition-colors overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white dark:bg-slate-900 shadow-sm z-10 border-b border-gray-100 dark:border-slate-800 hidden md:block transition-colors">
          <div className="px-8 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/logo_rssg.png" alt="Logo RSSG" className="w-8 h-8 object-contain" />
              <div className="font-bold text-gray-800 dark:text-white">Panel Administrasi <span className="text-primary dark:text-blue-400">RSSG</span></div>
            </Link>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition"
            >
              <LogOut size={16} /> Keluar Panel
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-950 transition-colors">
          <div className="py-6 pt-16 md:pt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
