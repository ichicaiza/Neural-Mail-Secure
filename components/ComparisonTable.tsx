
import React from 'react';
import { Minus, Plus, Equals } from 'lucide-react';

interface ComparisonTableProps {
  comp3Y: number;
  neural3Y: number;
  saving3Y: number;
  compMonthly: number;
  neuralMonthly: number;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ comp3Y, neural3Y, saving3Y, compMonthly, neuralMonthly }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Concepto</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Competencia</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Neural Mail</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Diferencia</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="px-6 py-4 font-medium text-slate-700">Costo Mensual Base</td>
            <td className="px-6 py-4 text-right text-slate-600 font-mono">${compMonthly.toLocaleString()}</td>
            <td className="px-6 py-4 text-right text-slate-600 font-mono">${neuralMonthly.toLocaleString()}</td>
            <td className="px-6 py-4 text-right text-emerald-600 font-bold font-mono">-${(compMonthly - neuralMonthly).toLocaleString()}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-700">Inversión Inicial (Año 1)</td>
            <td className="px-6 py-4 text-right text-slate-600 font-mono">$0</td>
            <td className="px-6 py-4 text-right text-slate-600 font-mono">Incluida</td>
            <td className="px-6 py-4 text-right text-slate-400 font-mono">-</td>
          </tr>
          <tr className="bg-slate-50/50">
            <td className="px-6 py-5 font-bold text-slate-900">Total Proyectado (3 Años)</td>
            <td className="px-6 py-5 text-right text-slate-500 line-through font-mono decoration-red-400/50">${comp3Y.toLocaleString()}</td>
            <td className="px-6 py-5 text-right text-blue-600 font-bold font-mono text-lg">${neural3Y.toLocaleString()}</td>
            <td className="px-6 py-5 text-right bg-emerald-50">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-200">
                Ahorras ${saving3Y.toLocaleString()}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
