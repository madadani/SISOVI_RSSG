import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

const SearchableSelect = ({ options, value, onChange, placeholder = "-- Pilih --", label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative space-y-1" ref={containerRef}>
      {label && <label className="block text-sm font-bold text-gray-800">{label}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2.5 bg-white border rounded-lg flex items-center justify-between cursor-pointer transition-all ${
          isOpen ? 'ring-2 ring-blue-100 border-blue-400' : 'border-gray-200'
        }`}
      >
        <div className="flex-1 truncate">
          {value ? (
            <span className="text-gray-800">{value}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {value && (
            <X 
              size={16} 
              className="text-gray-400 hover:text-gray-600" 
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            />
          )}
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Cari..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    value === option 
                      ? 'bg-blue-50 text-blue-700 font-bold' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-gray-400">
                Tidak ada hasil ditemukan
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
