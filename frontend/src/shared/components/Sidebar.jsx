import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Syringe, Clock, FileText, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
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
      {/* Mobile: Hamburger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md text-rs-dark-blue dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile: Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div className={`
        fixed inset-y-0 left-0 z-50
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-800
        shadow-lg md:shadow-none
        transform transition-all duration-300 ease-in-out
        md:translate-x-0 md:static md:h-screen md:flex-shrink-0
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'md:w-[72px] w-[72px]' : 'md:w-60 w-60'}
      `}>

        {/* Header */}
        <div className={`flex items-center h-[72px] border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity overflow-hidden">
              <img
                src="/logo_rssg_32.png"
                srcSet="/logo_rssg_32.png 1x, /logo_rssg_64.png 2x"
                alt="Logo RSSG"
                width="28"
                height="28"
                decoding="async"
                fetchPriority="high"
                className="w-7 h-7 object-contain flex-shrink-0"
              />
              <h2 className="text-sm font-black text-rs-dark-blue dark:text-blue-400 font-sans tracking-tight whitespace-nowrap">Dashboard Admin</h2>
            </Link>
          )}

          {isCollapsed && (
            <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
              <img
                src="/logo_rssg_32.png"
                alt="Logo RSSG"
                width="28"
                height="28"
                className="w-7 h-7 object-contain"
              />
            </Link>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className={`hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-rs-dark-blue dark:hover:text-blue-300 transition-all flex-shrink-0 ${isCollapsed ? 'mt-0' : ''}`}
            title={isCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Mobile Close Button */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`py-3 space-y-1 overflow-y-auto flex-1 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl font-bold text-sm transition-all ${isCollapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'} ${
                  isActive
                    ? 'bg-primary dark:bg-blue-600 text-white shadow-md shadow-primary/20 dark:shadow-blue-900/30'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/80 hover:text-rs-dark-blue dark:hover:text-blue-300'
                }`
              }
              title={isCollapsed ? item.name : ''}
            >
              <item.icon size={18} strokeWidth={2.5} className="flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
