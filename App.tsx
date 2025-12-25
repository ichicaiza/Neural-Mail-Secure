
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  DollarSign, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Info,
  Calendar,
  Cloud,
  ChevronRight,
  ArrowDownCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import InputGroup from './components/InputGroup';
import DashboardCard from './components/DashboardCard';
import ComparisonTable from './components/ComparisonTable';

const App: React.FC = () => {
  // --- STATE ---
  const [users, setUsers] = useState<number>(50);
  const [compCostPerUser, setCompCostPerUser] = useState<number>(7.00);
  const [neuralImplCost, setNeuralImplCost] = useState<number>(2000);
  const [neuralVPSMonthly, setNeuralVPSMonthly] = useState<number>(30);
  const [neuralSupportMonthly, setNeuralSupportMonthly] = useState<number>(150);

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    const costMensualCompetencia = users * compCostPerUser;
    const costMensualNeural = neuralVPSMonthly + neuralSupportMonthly;
    const ahorroMensual = costMensualCompetencia - costMensualNeural;
    
    const costAnualCompetencia = costMensualCompetencia * 12;
    
    // Neural Costs by Year
    const costYear1Neural = (costMensualNeural * 12) + neuralImplCost;
    const costYear2Neural = costMensualNeural * 12;
    const costYear3Neural = costMensualNeural * 12;
    
    const cost3YearsCompetencia = costAnualCompetencia * 3;
    const cost3YearsNeural = costYear1Neural + costYear2Neural + costYear3Neural;
    const ahorro3Years = cost3YearsCompetencia - cost3YearsNeural;
    
    const percentageSavings = cost3YearsCompetencia > 0 
      ? (ahorro3Years / cost3YearsCompetencia) * 100 
      : 0;
      
    const roiMonths = ahorroMensual > 0 
      ? neuralImplCost / ahorroMensual 
      : 0;

    // Data for Chart
    const chartData = [
      { month: 'Inicio', competencia: 0, neural: neuralImplCost },
      ...Array.from({ length: 36 }, (_, i) => {
        const m = i + 1;
        const compTotal = costMensualCompetencia * m;
        const neuralTotal = neuralImplCost + (costMensualNeural * m);
        return {
          month: `Mes ${m}`,
          competencia: Math.round(compTotal),
          neural: Math.round(neuralTotal),
          saving: Math.round(compTotal - neuralTotal)
        };
      })
    ];

    return {
      costMensualCompetencia,
      costMensualNeural,
      ahorroMensual,
      cost3YearsCompetencia,
      cost3YearsNeural,
      ahorro3Years,
      percentageSavings,
      roiMonths,
      chartData
    };
  }, [users, compCostPerUser, neuralImplCost, neuralVPSMonthly, neuralSupportMonthly]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Neural Mail Secure</h1>
              <p className="text-sm text-slate-500 font-medium">Calculadora de Ahorro y ROI</p>
            </div>
          </div>
          <div className="hidden md:flex items-center text-sm font-medium text-slate-500 gap-6">
            <span className="flex items-center gap-1.5"><Calendar size={16} /> Proyección a 3 años</span>
            <span className="flex items-center gap-1.5"><Cloud size={16} /> Enterprise SaaS Suite</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CONTROL PANEL (SIDEBAR) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Settings className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Panel de Control</h2>
              </div>
              
              <div className="space-y-5">
                <InputGroup 
                  label="Número de Usuarios" 
                  icon={<Users size={18} />} 
                  value={users} 
                  onChange={setUsers} 
                  helper="Cantidad de cuentas activas"
                />
                <InputGroup 
                  label="Costo Competencia ($/mes)" 
                  icon={<DollarSign size={18} />} 
                  value={compCostPerUser} 
                  onChange={setCompCostPerUser} 
                  helper="Microsoft 365 / Google Workspace"
                />
                <div className="h-px bg-slate-100 my-4" />
                <InputGroup 
                  label="Implementación Neural" 
                  icon={<ArrowDownCircle size={18} />} 
                  value={neuralImplCost} 
                  onChange={setNeuralImplCost} 
                  helper="Pago único inicial"
                />
                <InputGroup 
                  label="Costo VPS Mensual" 
                  icon={<Cloud size={18} />} 
                  value={neuralVPSMonthly} 
                  onChange={setNeuralVPSMonthly} 
                  helper="Infraestructura propia"
                />
                <InputGroup 
                  label="Soporte Neural Mensual" 
                  icon={<TrendingUp size={18} />} 
                  value={neuralSupportMonthly} 
                  onChange={setNeuralSupportMonthly} 
                  helper="Soporte 24/7 gestionado"
                />
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex gap-2">
                  <Info className="text-blue-600 shrink-0" size={20} />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Los costos se actualizan automáticamente al modificar los parámetros. 
                    Neural Mail permite ahorrar hasta un 80% en licenciamientos a gran escala.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* DASHBOARD CONTENT */}
          <section className="lg:col-span-8 space-y-8">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard 
                title="Ahorro Total (3 Años)"
                value={`$${results.ahorro3Years.toLocaleString()}`}
                type="success"
                icon={<DollarSign />}
                description="Capital liberado para reinversión"
              />
              <DashboardCard 
                title="Porcentaje Ahorrado"
                value={`${results.percentageSavings.toFixed(1)}%`}
                type="info"
                icon={<TrendingUp />}
                description="Vs. proveedores tradicionales"
              />
              <DashboardCard 
                title="Break-even (ROI)"
                value={`${results.roiMonths <= 0 ? 'Inmediato' : results.roiMonths.toFixed(1) + ' Meses'}`}
                type="warning"
                icon={<Calendar />}
                description="Retorno de inversión inicial"
              />
            </div>

            {/* CHART SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Proyección de Costos Acumulados</h3>
                  <p className="text-sm text-slate-500">Comparativa histórica Neural vs Competencia</p>
                </div>
                <div className="flex gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span> Competencia
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span> Neural Mail
                  </div>
                </div>
              </div>
              
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData}>
                    <defs>
                      <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorNeural" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 10}}
                      interval={5}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 10}}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Area type="monotone" dataKey="competencia" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
                    <Area type="monotone" dataKey="neural" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorNeural)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TABLE COMPARISON */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Resumen Financiero Comparativo</h3>
                <p className="text-sm text-slate-500">Detalle de costos proyectados a 36 meses</p>
              </div>
              <ComparisonTable 
                comp3Y={results.cost3YearsCompetencia}
                neural3Y={results.cost3YearsNeural}
                saving3Y={results.ahorro3Years}
                compMonthly={results.costMensualCompetencia}
                neuralMonthly={results.costMensualNeural}
              />
            </div>

            {/* CALL TO ACTION */}
            <div className="bg-emerald-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">¿Listo para dar el salto?</h3>
                <p className="text-emerald-100 max-w-md">
                  Neural Mail Secure no solo protege tus datos, también protege la salud financiera de tu empresa.
                </p>
              </div>
              <button className="relative z-10 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center gap-2 group">
                Contratar Neural Mail
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-400 rounded-full opacity-30 blur-3xl"></div>
            </div>

          </section>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center text-slate-400 text-sm">
        <p>© 2024 Neural Mail Secure. Todos los derechos reservados.</p>
        <p className="mt-1">Esta herramienta es una simulación financiera basada en promedios del mercado.</p>
      </footer>
    </div>
  );
};

export default App;
