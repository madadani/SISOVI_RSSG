import React from 'react';
import { Stethoscope, ClipboardList, Cross, Syringe, HeartPulse, ShieldAlert, Pill } from 'lucide-react';

const BackgroundDecorator = ({ opacity = 0.07 }) => {
  return (
    <>
      {/* Advanced Mesh Gradient & Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-blue-300/10 dark:bg-blue-400/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[5%] left-[10%] w-[30%] h-[30%] bg-blue-500/5 dark:bg-blue-700/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Floating Watermark Icons (Background) */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0`} style={{ opacity }}>
         <Stethoscope size={180} className="absolute top-[5%] left-[2%] text-rs-dark-blue dark:text-blue-400/40 rotate-12" />
         <ClipboardList size={160} className="absolute top-[15%] right-[2%] text-rs-dark-blue dark:text-blue-400/40 -rotate-6" />
         <Cross size={100} className="absolute top-[40%] left-[10%] text-rs-dark-blue dark:text-blue-400/40 rotate-45" />
         <Syringe size={180} className="absolute bottom-[2%] right-[2%] text-rs-dark-blue dark:text-blue-400/40 -rotate-12" />
         <HeartPulse size={120} className="absolute bottom-[20%] left-[5%] text-rs-dark-blue dark:text-blue-400/40" />
         <ShieldAlert size={140} className="absolute top-[60%] right-[10%] text-rs-dark-blue dark:text-blue-400/40 rotate-12" />
         <Pill size={70} className="absolute top-[30%] left-[35%] text-rs-dark-blue dark:text-blue-400/40 -rotate-45" />
      </div>
    </>
  );
};

export default BackgroundDecorator;
