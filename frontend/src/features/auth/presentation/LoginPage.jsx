import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../../../core/config/constants';
import Button from '../../../shared/components/ui/Button';

import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      // Success! Redirect to dashboard
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20 flex items-center justify-center transition-colors duration-300">
      <BackgroundDecorator />
      <div className="max-w-md w-full relative z-10 px-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 dark:text-slate-400 hover:text-rs-dark-blue dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Beranda</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden relative transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rs-blue via-rs-light-blue to-rs-green"></div>
          
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
                <Lock size={40} />
              </div>
              <h2 className="text-3xl font-black text-rs-dark-blue dark:text-white mb-2">Login Petugas</h2>
              <p className="text-gray-500 dark:text-slate-400">Masuk untuk mengakses dashboard manajemen vaksinasi RSSG</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">Username / NIP</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-all text-gray-800 dark:text-white font-medium"
                    placeholder="Masukkan username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-11 pr-12 py-4 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-all text-gray-800 dark:text-white font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-primary focus:ring-primary cursor-pointer" />
                  <span className="text-sm text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-200 transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="text-sm font-bold text-primary hover:underline">Lupa Password?</a>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 rounded-2xl text-lg shadow-xl shadow-primary/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Memproses...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn size={20} /> Masuk Sekarang
                  </div>
                )}
              </Button>
            </form>
          </div>
          
          <div className="bg-gray-50 dark:bg-slate-800/50 p-6 text-center border-t border-gray-100 dark:border-slate-800">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Belum punya akun? <span className="font-bold text-rs-dark-blue dark:text-blue-400 italic underline cursor-pointer">Hubungi Admin IT RSSG</span>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {APP_CONFIG.HOSPITAL_NAME}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
