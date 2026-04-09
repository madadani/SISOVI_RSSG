import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Syringe, Clock, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Manajemen Pasien', path: '/dashboard/patients', icon: Users },
    { name: 'Data Vaksin', path: '/dashboard/vaccines', icon: Syringe },
    { name: 'Antrian Harian', path: '/dashboard/queues', icon: Clock },
    { name: 'Sertifikat', path: '/dashboard/certificates', icon: FileText },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md text-rs-dark-blue dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 shadow-lg md:shadow-none transform transition-all duration-300 ease-in-out md:translate-x-0 md:static md:w-64 md:h-screen md:flex-shrink-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
          <h2 className="text-lg font-black text-rs-dark-blue dark:text-blue-400 font-sans tracking-tight">Panel Admin</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-primary dark:bg-blue-600 text-white shadow-md shadow-primary/20 dark:shadow-blue-900/30 ring-1 ring-primary/50 dark:ring-blue-500/50' 
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/80 hover:text-rs-dark-blue dark:hover:text-blue-300'
                }`
              }
            >
              <item.icon size={18} strokeWidth={2.5} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
