import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_CONFIG } from '../../core/config/constants';
import Sidebar from '../components/Sidebar';
import { LogOut, User, ChevronDown, Sun, Moon, Clock } from 'lucide-react';
import { useTheme } from '../../core/contexts/ThemeContext';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef(null);

  // Live Clock Tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return { title: 'Dashboard Admin', showLive: true };
    if (location.pathname.includes('/patients')) return { title: 'Manajemen Pasien', showLive: false };
    if (location.pathname.includes('/vaccines')) return { title: 'Data Vaksin', showLive: false };
    if (location.pathname.includes('/queues')) return { title: 'Antrian Harian', showLive: true };
    if (location.pathname.includes('/certificates')) return { title: 'Sertifikat', showLive: false };
    return { title: 'Panel Administrasi', showLive: false };
  };

  const pageInfo = getPageTitle();

  return (
    <div className="h-screen bg-gray-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans transition-colors overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(v => !v)} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white dark:bg-slate-900 z-10 border-b border-gray-50 dark:border-slate-800 hidden md:block transition-colors h-[72px]">
          <div className="px-8 h-full flex items-center justify-between gap-4">
            {/* Halaman Title & Jam */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-rs-dark-blue dark:text-slate-50 leading-none">{pageInfo.title}</h2>
                {pageInfo.showLive && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-rs-green/10 dark:bg-rs-green/15 text-rs-green text-[10px] font-black uppercase tracking-widest rounded-full ring-1 ring-rs-green/15">
                    <span className="w-1.5 h-1.5 bg-rs-green rounded-full animate-pulse"></span> live
                  </div>
                )}
              </div>
              
              <div className="hidden lg:flex items-center gap-2.5 px-4 h-9 bg-gray-50/50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-800 text-gray-500 dark:text-slate-400 font-bold text-xs tracking-tight transition-all">
                <Clock size={16} className="text-primary" />
                <span>{currentTime.toLocaleTimeString('id-ID')} WIB</span>
              </div>
            </div>

            {/* Profile & Theme (Right Side) */}
            <div className="flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all border border-gray-100 dark:border-slate-700"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User size={16} />
                </div>
                <span>Admin</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Admin / Petugas</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@rssg.co.id</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                    >
                      <LogOut size={16} /> Keluar Panel
                    </button>
                  </div>
                </div>
              )}
            </div>
            </div>

          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-950 transition-colors">
          <div className="pb-6 pt-16 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
