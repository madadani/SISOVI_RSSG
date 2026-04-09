import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

const LoginForm = ({ onLogin, isLoading, error }) => {
  const [queueNumber, setQueueNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin?.(queueNumber);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-rs-dark-blue mb-2">Lengkapi Dokumen</h2>
        <p className="text-gray-600">Silakan login untuk mengecek status dan melengkapi dokumen pendaftaran Anda.</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Pendaftaran / Antrian</label>
            <input 
              type="text" 
              required 
              value={queueNumber}
              onChange={(e) => setQueueNumber(e.target.value)}
              className="w-full p-4 border rounded-xl focus:border-rs-gold outline-none font-bold text-rs-dark-blue" 
              placeholder="Contoh: VK-20261012-001" 
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

export default LoginForm;
