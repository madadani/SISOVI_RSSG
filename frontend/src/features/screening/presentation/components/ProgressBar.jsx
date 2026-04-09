const ProgressBar = ({ currentStep, totalSteps = 5 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const labels = ['Data Diri', 'Pilihan Vaksin', 'Kuesioner', 'Upload', 'Selesai'];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-300" 
          style={{ width: `${(currentStep - 1) * (100 / (totalSteps - 1))}%` }}
        ></div>
        
        {steps.map((item) => (
          <div 
            key={item} 
            className={`relative z-10 flex flex-col items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
              currentStep >= item 
                ? 'bg-primary text-white border-2 border-primary' 
                : 'bg-white text-gray-400 border-2 border-gray-200'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-2 hidden sm:flex">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
