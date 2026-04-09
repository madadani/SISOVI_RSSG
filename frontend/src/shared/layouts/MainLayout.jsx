import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { APP_CONFIG } from '../../core/config/constants';
import { useTheme } from '../../core/contexts/ThemeContext';

const MainLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      <header className="bg-white dark:bg-slate-900 shadow relative transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <img src="/logo_rssg.png" alt="Logo RSSG" className="w-9 h-9 object-contain" />
            <div>
              <h1 className="font-bold text-xl text-rs-dark-blue dark:text-blue-400">{APP_CONFIG.APP_NAME}</h1>
              <p className="text-xs text-gray-500 dark:text-slate-400 hidden sm:block">{APP_CONFIG.APP_DESCRIPTION}</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {!isDashboard && !isLoginPage && (
              <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-rs-blue-dark/90 transition shadow-sm">
                Login Petugas
              </Link>
            )}
            {isDashboard && (
              <Link to="/" className="px-5 py-2.5 text-sm font-bold text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition">
                Keluar Panel
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 py-6 mt-4 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} {APP_CONFIG.HOSPITAL_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
