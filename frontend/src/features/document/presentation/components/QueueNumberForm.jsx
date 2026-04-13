import React, { useState } from 'react';
import { Loader2, AlertCircle, KeyRound } from 'lucide-react';

const QueueNumberForm = ({ onSubmit, isLoading, error }) => {
  const [queueNumber, setQueueNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(queueNumber);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rs-gold/10 rounded-2xl text-rs-gold mb-4">
          <KeyRound size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-rs-dark-blue dark:text-white mb-2">Lengkapi Dokumen</h2>
        <p className="text-gray-600 dark:text-slate-400">
          Silakan masukkan nomor pendaftaran untuk mengecek status dan melengkapi dokumen Anda.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 font-bold">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 transition-colors">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              Nomor Pendaftaran / Antrian
            </label>
            <input
              type="text"
              required
              value={queueNumber}
              onChange={(e) => setQueueNumber(e.target.value)}
              className="w-full p-4 border dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:border-rs-gold dark:focus:border-rs-gold outline-none font-bold text-rs-dark-blue dark:text-white transition-colors"
              placeholder="Contoh: V001"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-rs-gold text-rs-dark-blue font-bold rounded-xl hover:bg-rs-gold/90 transition shadow-lg flex items-center justify-center gap-2 text-lg disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueueNumberForm;
