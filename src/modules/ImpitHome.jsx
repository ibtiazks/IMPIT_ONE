import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Trophy,
  Shield,
  Star,
  Award,
  Activity,
  Target, // <--- Added this missing import
} from "lucide-react";

// --- MOCK DATA ---

// 1. My Current Metrics (To calculate Flags)
// Standard: RFO=100, Time=4.0, Crew=20, New=5
const MY_CURRENT_METRICS = {
  woRfo: 110, // > 100 (Good)
  avgRfoTime: 3.5, // < 4.0 (Good)
  activeCrew: 18, // < 20 (LAGGING - RED FLAG)
  newCrew: 3, // < 5 (LAGGING - RED FLAG)
  states: 5, // > 4 (Good)
  kpiAmount: 25000, // Tier 3 (Good)
};

// 2. Top 5 Client Invoices (Companies)
const TOP_CLIENTS = [
  { name: "Hometown Property Group", revenue: 85000, color: "#3B82F6" },
  { name: "Apex Asset Management", revenue: 62000, color: "#10B981" },
  { name: "Urban Real Estate", revenue: 45000, color: "#8B5CF6" },
  { name: "Keystone Holdings", revenue: 38000, color: "#F59E0B" },
  { name: "Liberty Homes LLC", revenue: 29000, color: "#EC4899" },
];

// 3. Best RFO Time (Employees) - Lower is better
const TOP_RFO_EMPLOYEES = [
  {
    id: 1,
    name: "Sarah Jenkins",
    time: 2.1,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    name: "David Kim",
    time: 2.4,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    name: "Mike Chen",
    time: 2.8,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 4,
    name: "Jessica Low",
    time: 3.1,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 5,
    name: "Tom Wilson",
    time: 3.5,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100",
  },
];

// 4. Highest Bid Approval (Employees)
const TOP_BID_EMPLOYEES = [
  {
    id: 1,
    name: "Sarah Jenkins",
    amount: 42000,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 2,
    name: "Jessica Low",
    amount: 38500,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 3,
    name: "Mike Chen",
    amount: 31000,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 4,
    name: "Amanda Lee",
    amount: 28000,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 5,
    name: "David Kim",
    amount: 25000,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
  },
];

// 5. Invoice Target Data
const INVOICE_TARGET_DATA = [
  { name: "Achieved", value: 68, color: "#10B981" }, // Emerald
  { name: "Remaining", value: 32, color: "#E2E8F0" }, // Slate 200
];

// --- COMPONENTS ---

// 1. Kickass Badge
const UserBadge = ({ score = 98.5 }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 blur-sm rounded-full opacity-50 animate-pulse"></div>
          <Shield
            className="w-8 h-8 text-white relative z-10 drop-shadow-md"
            fill="#2563EB"
          />
        </div>
        <div>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">
            Current Tier
          </p>
          <p className="text-lg font-black text-white leading-none tracking-wide">
            PLATINUM
          </p>
        </div>
        <div className="ml-2 pl-3 border-l border-blue-500/30 text-right">
          <p className="text-[10px] text-blue-200 uppercase font-bold">Score</p>
          <p className="text-xl font-bold text-white leading-none">{score}</p>
        </div>
      </div>
    </div>
  );
};

// 2. Performance Flags
const PerformanceInsights = ({ metrics }) => {
  // Logic to determine flags
  const flags = [
    {
      label: "Avg RFO Time",
      actual: `${metrics.avgRfoTime}h`,
      target: "4.0h",
      status: metrics.avgRfoTime <= 4.0 ? "good" : "bad",
      msg:
        metrics.avgRfoTime <= 4.0
          ? "Great efficiency!"
          : "Slower than standard.",
    },
    {
      label: "Active Crew Count",
      actual: metrics.activeCrew,
      target: 20,
      status: metrics.activeCrew >= 20 ? "good" : "bad",
      msg: metrics.activeCrew >= 20 ? "Target met." : "Recruitment needed.",
    },
    {
      label: "Work Order RFO",
      actual: metrics.woRfo,
      target: 100,
      status: metrics.woRfo >= 100 ? "good" : "bad",
      msg: metrics.woRfo >= 100 ? "High volume!" : "Below target.",
    },
    {
      label: "New Crew Onboarded",
      actual: metrics.newCrew,
      target: 5,
      status: metrics.newCrew >= 5 ? "good" : "bad",
      msg: metrics.newCrew >= 5 ? "Strong growth." : "Lagging behind.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {flags.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
            item.status === "good"
              ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
              : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
          }`}
        >
          <div className="flex justify-between items-start">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                item.status === "good"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {item.label}
            </span>
            {item.status === "good" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${
                item.status === "good"
                  ? "text-emerald-800 dark:text-white"
                  : "text-red-800 dark:text-white"
              }`}
            >
              {item.actual}
            </span>
            <span className="text-xs text-slate-400">
              / Target: {item.target}
            </span>
          </div>
          <p
            className={`text-xs font-medium ${
              item.status === "good" ? "text-emerald-600/80" : "text-red-600/80"
            }`}
          >
            {item.msg}
          </p>
        </div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---

const ImpitHome = ({ setActiveModule }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. WELCOME HEADER & BADGE */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#030F1D] dark:text-white">
              Welcome back, Nayeeb.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Your system is operational and ready.
            </p>
            <button
              onClick={() => setActiveModule && setActiveModule("dashboard")}
              className="mt-3 text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              Go to Main Dashboard <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="shrink-0">
          <UserBadge score={98.5} />
        </div>
      </div>

      {/* 2. PERFORMANCE FLAGS (RED/GREEN Analysis) */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" /> Performance Pulse
        </h3>
        <PerformanceInsights metrics={MY_CURRENT_METRICS} />
      </div>

      {/* 3. LEADERBOARDS & CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* TOP 5: Highest Client Invoice */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" /> Top Clients
              (Revenue)
            </h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              This Month
            </span>
          </div>
          <div className="flex-1 space-y-4">
            {TOP_CLIENTS.map((client, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-black text-slate-300 w-4 text-center">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {client.name}
                    </p>
                    <div
                      className="h-1.5 w-24 rounded-full mt-1 opacity-50"
                      style={{ backgroundColor: client.color }}
                    ></div>
                  </div>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">
                  ${client.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP 5: Best RFO Time (Employees) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" /> Best RFO Time
            </h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              Top 5
            </span>
          </div>
          <div className="flex-1 space-y-4">
            {TOP_RFO_EMPLOYEES.map((emp, idx) => (
              <div key={emp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.img}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-100"
                  />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {emp.name}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded text-xs">
                  {emp.time} hrs
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP 5: Highest Bid Approval */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> Top Bidders
            </h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              Approved Amt
            </span>
          </div>
          <div className="flex-1 space-y-4">
            {TOP_BID_EMPLOYEES.map((emp, idx) => (
              <div key={emp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.img}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-100"
                  />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {emp.name}
                  </p>
                </div>
                <div className="font-bold text-slate-800 dark:text-white">
                  ${emp.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PIE CHART: Client Invoice Target */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" /> Monthly Invoice
              Target
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Tracking overall invoiced amount against the monthly goal of
              $300,000.
            </p>

            <div className="flex gap-8">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Achieved
                </p>
                <p className="text-2xl font-black text-emerald-500">$204,000</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Remaining
                </p>
                <p className="text-2xl font-black text-slate-400">$96,000</p>
              </div>
            </div>
          </div>

          <div className="h-48 w-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INVOICE_TARGET_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {INVOICE_TARGET_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800 dark:text-white">
                68%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Done
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpitHome;
