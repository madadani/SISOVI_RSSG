const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  onClick, 
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-md';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-rs-blue-dark/90',
    green: 'bg-rs-green text-white hover:bg-rs-green/90',
    gold: 'bg-rs-gold text-rs-dark-blue hover:bg-rs-gold/90',
    lightBlue: 'bg-rs-light-blue text-white hover:bg-rs-light-blue/90',
    outline: 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none',
    dark: 'bg-gray-800 text-white hover:bg-gray-900',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
  };

  const appliedVariant = disabled ? 'disabled' : variant;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[appliedVariant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
