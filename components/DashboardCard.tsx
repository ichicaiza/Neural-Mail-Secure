
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  type: 'success' | 'warning' | 'info';
  icon: React.ReactNode;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, type, icon, description }) => {
  const styles = {
    success: 'bg-emerald-600 text-white shadow-emerald-200/50',
    warning: 'bg-white border-4 border-red-600 text-slate-900 shadow-red-100/50',
    info: 'bg-white border border-slate-100 text-slate-900 shadow-slate-200/50'
  };

  const textContrast = {
    success: 'text-emerald-50',
    warning: 'text-slate-500',
    info: 'text-slate-500'
  };

  return (
    <div className={`rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.02] duration-300 ${styles[type]}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={`text-sm font-bold uppercase tracking-wider ${type === 'success' ? 'text-emerald-100' : 'text-slate-400'}`}>
          {title}
        </h4>
        <div className={`p-2 rounded-lg ${type === 'success' ? 'bg-emerald-500/50' : 'bg-slate-100 text-slate-600'}`}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className={`text-3xl font-black ${type === 'warning' ? 'text-red-600' : ''}`}>{value}</p>
        <p className={`text-xs font-medium ${textContrast[type]}`}>{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
