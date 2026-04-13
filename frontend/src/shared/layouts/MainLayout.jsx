import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, MoreVertical, LogIn, ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '../../core/config/constants';
import { useTheme } from '../../core/contexts/ThemeContext';

const MainLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isLoginPage = location.pathname === '/login';

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div
      className={`${
        isLoginPage ? 'h-screen overflow-hidden' : 'min-h-screen'
      } bg-gray-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300`}
    >
      <header className="bg-white dark:bg-slate-900 shadow relative transition-colors duration-300 shrink-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <img
              src="/logo_rssg_64.png"
              srcSet="/logo_rssg_64.png 1x, /logo_rssg_128.png 2x"
              alt="Logo RSSG"
              width="36"
              height="36"
              decoding="async"
              fetchPriority="high"
              className="w-9 h-9 object-contain"
            />
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

            {/* Hidden staff login dropdown */}
            {!isDashboard && !isLoginPage && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-slate-300 transition-all border border-transparent dark:border-slate-700"
                  title="Menu lainnya"
                  aria-label="Menu lainnya"
                  aria-expanded={menuOpen}
                >
                  <MoreVertical size={20} />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-52 origin-top-right transition-all duration-200 ease-out z-50 ${
                    menuOpen
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-gray-100 dark:border-slate-700 overflow-hidden backdrop-blur-xl">
                    <div className="px-4 py-2.5 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Akses Petugas</p>
                    </div>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <LogIn size={16} className="text-gray-400 dark:text-slate-500" />
                      Login Petugas
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {isDashboard && (
              <Link to="/" className="px-5 py-2.5 text-sm font-bold text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition">
                Keluar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className={`${isLoginPage ? 'overflow-hidden' : ''} flex-1 flex flex-col min-h-0`}>
        {children}
      </main>

      {!isLoginPage && (
        <footer className="bg-white dark:bg-slate-900 py-6 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} IT Boys RSSG. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
