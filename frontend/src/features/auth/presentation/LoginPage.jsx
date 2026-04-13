import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

import BackgroundDecorator from '../../../shared/components/layout/BackgroundDecorator';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Immediate redirect for fast response
    navigate('/dashboard');
  };

  return (
    <div className="relative h-full overflow-hidden p-4 sm:p-6 flex items-center justify-center bg-linear-to-br from-[#eff6ff] via-[#e0f2fe] to-gray-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <BackgroundDecorator />
      <div className="max-w-md md:max-w-120 w-full relative z-10 flex">
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden relative transition-colors duration-300 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-rs-blue via-rs-light-blue to-rs-green"></div>
          
          <div className="p-6 pt-8 sm:p-8 sm:pt-10 md:p-10 md:pt-12">
            <div className="text-center mb-5 sm:mb-7 md:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 text-primary mb-4 sm:mb-5">
                <Lock className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-rs-dark-blue dark:text-white mb-1.5">Login Petugas</h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-snug">Masuk untuk mengakses dashboard manajemen vaksinasi RSSG</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full pl-11 pr-4 py-3 sm:py-3.5 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-all text-gray-800 dark:text-white font-medium"
                    placeholder="Masukkan username"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
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
                    className="block w-full pl-11 pr-12 py-3 sm:py-3.5 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl outline-none focus:border-primary focus:bg-white dark:focus:bg-slate-900 transition-all text-gray-800 dark:text-white font-medium"
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

              <Button
                type="submit"
                variant="primary"
                className="w-full !py-3 sm:!py-3.5 rounded-2xl text-base sm:text-lg shadow-xl shadow-primary/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn size={20} /> Masuk
                </div>
              </Button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;
