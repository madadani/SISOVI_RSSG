import Swal from 'sweetalert2';

const getIsDarkMode = () => {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};

const getThemeColors = () => {
  const isDark = getIsDarkMode();
  return {
    background: isDark ? '#0f172a' : '#ffffff',
    color: isDark ? '#f1f5f9' : '#1e293b',
  };
};

export const createAdminToast = (overrides = {}) => {
  const { background, color } = getThemeColors();

  return Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background,
    color,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    ...overrides,
  });
};

export const createAdminSwal = (overrides = {}) => {
  const { background, color } = getThemeColors();

  return Swal.mixin({
    customClass: {
      popup: 'rounded-2xl border border-gray-100/80 dark:border-slate-800 shadow-2xl dark:bg-slate-900',
      title: 'text-2xl font-black text-rs-dark-blue dark:text-slate-50',
      confirmButton: 'px-6 py-3 bg-primary hover:bg-rs-blue-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-colors',
      cancelButton: 'px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors',
    },
    buttonsStyling: false,
    background,
    color,
    ...overrides,
  });
};
