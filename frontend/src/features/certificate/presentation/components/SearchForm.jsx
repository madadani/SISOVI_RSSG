import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchForm = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState({ nik: '', dob: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(formData.nik, formData.dob);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1">
        <label className="block text-sm font-semibold text-gray-700 mb-1">NIK atau No. RM</label>
        <input 
          type="text" 
          required 
          value={formData.nik}
          onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rs-light-blue outline-none font-medium text-gray-800" 
          placeholder="Masukkan NIK atau No. RM" 
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Lahir</label>
        <input 
          type="date" 
          required 
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rs-light-blue outline-none font-medium text-gray-700" 
        />
      </div>
      <div className="flex items-end">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto h-14 px-8 bg-rs-light-blue text-white font-bold rounded-xl hover:bg-rs-light-blue/90 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Search size={20} />
          )}
          <span>Cari</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
