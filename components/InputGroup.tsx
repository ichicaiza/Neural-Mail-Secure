
import React from 'react';

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (val: number) => void;
  helper?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, value, onChange, helper }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <span className="text-slate-400">{icon}</span>
        {label}
      </label>
      <div className="relative group">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all group-hover:bg-white"
        />
      </div>
      {helper && <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1 px-1">{helper}</p>}
    </div>
  );
};

export default InputGroup;
