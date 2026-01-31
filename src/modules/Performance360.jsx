import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  Legend,
} from "recharts";
import {
  User,
  Users,
  TrendingUp,
  Award,
  Target,
  Calendar,
  ChevronDown,
  Star,
  Activity,
  Shield,
  X,
  Briefcase,
  CheckCircle2,
  Ban,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
} from "lucide-react";

// --- 1. CONFIGURATION & BADGES ---

const BADGE_CONFIG = {
  Platinum: {
    min: 96,
    className:
      "bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-white shadow-[0_4px_15px_rgba(37,99,235,0.5)] border-2 border-blue-300 ring-2 ring-blue-500/50",
    icon: Shield,
    colorHex: "#2563EB",
    label: "Platinum",
  },
  Gold: {
    min: 85,
    className:
      "bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-white shadow-[0_4px_15px_rgba(234,179,8,0.5)] border-2 border-yellow-200 ring-2 ring-yellow-500/50",
    icon: Star,
    colorHex: "#EAB308",
    label: "Gold",
  },
  Silver: {
    min: 70,
    className:
      "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 text-white shadow-[0_4px_15px_rgba(148,163,184,0.5)] border-2 border-slate-200 ring-2 ring-slate-400/50",
    icon: Award,
    colorHex: "#94A3B8",
    label: "Silver",
  },
  Bronze: {
    min: 0,
    className:
      "bg-gradient-to-br from-orange-400 via-orange-600 to-orange-800 text-white shadow-[0_4px_15px_rgba(234,88,12,0.5)] border-2 border-orange-300 ring-2 ring-orange-500/50",
    icon: Activity,
    colorHex: "#EA580C",
    label: "Bronze",
  },
  Green: {
    className:
      "bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800 text-white shadow-[0_4px_15px_rgba(16,185,129,0.5)] border-2 border-emerald-300 ring-2 ring-emerald-500/50",
    icon: CheckCircle2,
    colorHex: "#10B981",
    label: "Compliant",
  },
  Black: {
    className:
      "bg-gradient-to-br from-slate-700 via-black to-slate-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.5)] border-2 border-slate-600 ring-2 ring-red-500/50",
    icon: Ban,
    colorHex: "#000000",
    label: "Violation",
  },
};

const getBadge = (score, role, metrics) => {
  if (role === "Admin") {
    const isViolation = metrics.lateDays > 10 && metrics.workingHours < 30;
    return isViolation ? BADGE_CONFIG.Black : BADGE_CONFIG.Green;
  }
  if (score >= 96) return BADGE_CONFIG.Platinum;
  if (score >= 85) return BADGE_CONFIG.Gold;
  if (score >= 70) return BADGE_CONFIG.Silver;
  return BADGE_CONFIG.Bronze;
};

// --- 2. SCORING ENGINES ---

const getKpiScore = (amount) => {
  if (amount >= 20000) return 5;
  if (amount >= 10000) return 3.33;
  if (amount >= 5000) return 1.66;
  return 0;
};

const getExpScore = (years) => {
  if (years >= 3) return 5;
  if (years >= 2) return 3.33;
  return 1.66;
};

const addCommonScores = (score, m) => {
  score += getKpiScore(m.kpiAmount);
  score += Math.max(0, 1 - m.lateDays / 22) * 5;
  score += Math.min(1, m.workingHours / 45) * 5;
  score += getExpScore(m.experienceYears);
  return score;
};

const calculateRVMScore = (m) => {
  let score = 0;
  score += Math.min(1, m.woRfo / 100) * 15;
  score += (m.avgRfoTime <= 4.0 ? 1 : Math.max(0, 4.0 / m.avgRfoTime)) * 25;
  score += Math.min(1, m.activeCrew / 20) * 15;
  score += Math.min(1, m.newCrew / 5) * 15;
  score += Math.min(1, m.states / 4) * 10;
  score += (m.woRatio <= 5 ? 1 : Math.max(0, 5 / m.woRatio)) * 5;
  score = addCommonScores(score, m);
  return Math.min(100, score).toFixed(1);
};

const calculateClientScore = (m) => {
  let score = 0;
  score += Math.min(1, m.totalInvoice / 20000) * 10;
  score += Math.min(1, m.invoiceCompletion / 90) * 15;
  score += Math.min(1, m.preservationWork / 100) * 15;
  score += Math.min(1, m.rentalWork / 10) * 5;
  score += Math.min(1, m.commercialWork / 5) * 5;
  score += Math.min(1, m.states / 5) * 10;
  score += Math.min(1, m.activeClients / 8) * 5;
  score += Math.min(1, m.newClients / 2) * 10;
  score += Math.min(1, m.grossProfit / 7000) * 10;
  score = addCommonScores(score, m);
  return Math.min(100, score).toFixed(1);
};

const calculateProcessingScore = (m) => {
  let score = 0;
  score += Math.min(1, m.woSubmitted / 90) * 20;
  score += Math.min(1, m.bidCount / 300) * 15;
  score += Math.min(1, m.bidAmount / 400000) * 15;
  score += Math.min(1, m.approvalRatio / 10) * 15;
  score += Math.min(1, m.baAmount / 20000) * 20;
  score = addCommonScores(score, m);
  return Math.min(100, score).toFixed(1);
};

const calculateAdminScore = (m) => {
  if (m.lateDays > 10 && m.workingHours < 30) return 50;
  return 100;
};

// --- MOCK DATA ---

// Manager (Me)
const MY_METRICS = {
  woRfo: 110,
  avgRfoTime: 3.5,
  activeCrew: 22,
  newCrew: 6,
  states: 5,
  woRatio: 4.5,
  kpiAmount: 25000,
  lateDays: 0,
  workingHours: 50,
  experienceYears: 4,
  teamWoRfo: 450,
  teamRfoTarget: 400,
  teamAvgRfoTime: 3.8,
  teamNewCrew: 15,
  history: [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 75 },
    { month: "Apr", score: 78 },
    { month: "May", score: 86 },
    { month: "Jun", score: 88 },
    { month: "Jul", score: 82 },
    { month: "Aug", score: 89 },
    { month: "Sep", score: 92 },
    { month: "Oct", score: 95 },
    { month: "Nov", score: 97 },
    { month: "Dec", score: 98.5 },
  ],
};

// Team Averages for Comparison (Mock)
const TEAM_AVERAGE_HISTORY = [
  { month: "Jan", score: 70 },
  { month: "Feb", score: 71 },
  { month: "Mar", score: 73 },
  { month: "Apr", score: 74 },
  { month: "May", score: 76 },
  { month: "Jun", score: 78 },
  { month: "Jul", score: 79 },
  { month: "Aug", score: 80 },
  { month: "Sep", score: 82 },
  { month: "Oct", score: 83 },
  { month: "Nov", score: 84 },
  { month: "Dec", score: 85 },
];

const SUBORDINATES = [
  {
    id: 101,
    name: "Mike Chen",
    role: "RVM",
    designation: "Regional Vendor Mgr",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
    dept: "Vendor Mgmt",
    metrics: {
      woRfo: 90,
      avgRfoTime: 4.2,
      activeCrew: 18,
      newCrew: 4,
      states: 3,
      woRatio: 6,
      kpiAmount: 12000,
      lateDays: 1,
      workingHours: 46,
      experienceYears: 2,
    },
    // Full 12 Month History for Trend Chart
    history: [
      { month: "Jan", score: 60 },
      { month: "Feb", score: 62 },
      { month: "Mar", score: 65 },
      { month: "Apr", score: 68 },
      { month: "May", score: 70 },
      { month: "Jun", score: 72 },
      { month: "Jul", score: 75 },
      { month: "Aug", score: 74 },
      { month: "Sep", score: 76 },
      { month: "Oct", score: 78 },
      { month: "Nov", score: 82 },
      { month: "Dec", score: 85 },
    ],
  },
  {
    id: 102,
    name: "Jessica Low",
    role: "Client Team",
    designation: "Account Manager",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
    dept: "Sales",
    metrics: {
      totalInvoice: 22000,
      invoiceCompletion: 95,
      preservationWork: 110,
      rentalWork: 12,
      commercialWork: 6,
      states: 6,
      activeClients: 9,
      newClients: 3,
      grossProfit: 8000,
      kpiAmount: 22000,
      lateDays: 0,
      workingHours: 48,
      experienceYears: 3,
    },
    history: [
      { month: "Jan", score: 85 },
      { month: "Feb", score: 86 },
      { month: "Mar", score: 88 },
      { month: "Apr", score: 89 },
      { month: "May", score: 90 },
      { month: "Jun", score: 91 },
      { month: "Jul", score: 90 },
      { month: "Aug", score: 92 },
      { month: "Sep", score: 93 },
      { month: "Oct", score: 92 },
      { month: "Nov", score: 94 },
      { month: "Dec", score: 96 },
    ],
  },
  {
    id: 103,
    name: "Sarah Jenkins",
    role: "Processing",
    designation: "Sr. Processor",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
    dept: "Production",
    metrics: {
      woSubmitted: 92,
      bidCount: 280,
      bidAmount: 380000,
      approvalRatio: 9,
      baAmount: 18000,
      kpiAmount: 8000,
      lateDays: 2,
      workingHours: 44,
      experienceYears: 1,
    },
    history: [
      { month: "Jan", score: 70 },
      { month: "Feb", score: 71 },
      { month: "Mar", score: 72 },
      { month: "Apr", score: 70 },
      { month: "May", score: 74 },
      { month: "Jun", score: 75 },
      { month: "Jul", score: 76 },
      { month: "Aug", score: 75 },
      { month: "Sep", score: 78 },
      { month: "Oct", score: 75 },
      { month: "Nov", score: 78 },
      { month: "Dec", score: 80 },
    ],
  },
  {
    id: 104,
    name: "David Kim",
    role: "Admin",
    designation: "Office Admin",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
    dept: "Administration",
    metrics: { lateDays: 12, workingHours: 25 },
    history: [
      { month: "Jan", score: 100 },
      { month: "Feb", score: 100 },
      { month: "Mar", score: 100 },
      { month: "Apr", score: 100 },
      { month: "May", score: 100 },
      { month: "Jun", score: 100 },
      { month: "Jul", score: 50 },
      { month: "Aug", score: 50 },
      { month: "Sep", score: 100 },
      { month: "Oct", score: 100 },
      { month: "Nov", score: 100 },
      { month: "Dec", score: 50 },
    ],
  },
];

// --- COMPONENTS ---

const PerformanceBadge = ({ score, role, metrics, size = "md" }) => {
  const badge = getBadge(score, role, metrics);
  const Icon = badge.icon;
  const sizeClass =
    size === "lg" ? "w-24 h-24" : size === "sm" ? "w-8 h-8" : "w-14 h-14";
  const iconSize =
    size === "lg" ? "w-12 h-12" : size === "sm" ? "w-4 h-4" : "w-7 h-7";
  const textSize = size === "lg" ? "text-3xl" : "text-xs";

  return (
    <div className={`flex flex-col items-center justify-center gap-2`}>
      <div
        className={`relative flex items-center justify-center rounded-full ${badge.className} ${sizeClass} transition-all duration-500 hover:scale-110`}
      >
        <Icon className={`${iconSize} drop-shadow-md`} />
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-t from-transparent to-white/30 pointer-events-none"></div>
      </div>
      {size !== "sm" && (
        <div className="text-center">
          <div
            className={`font-black uppercase tracking-widest ${textSize} text-slate-800 dark:text-white`}
          >
            {badge.label}
          </div>
          {role !== "Admin" && (
            <div className="text-xs font-mono text-slate-500 font-bold">
              {score} / 100
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  const badge = getBadge(payload.score);
  return (
    <svg
      x={cx - 6}
      y={cy - 6}
      width={12}
      height={12}
      fill="white"
      viewBox="0 0 12 12"
    >
      <circle
        cx="6"
        cy="6"
        r="6"
        fill={badge.colorHex}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

const DeviationBar = ({
  label,
  target,
  actual,
  unit = "",
  inverse = false,
  isCurrency = false,
}) => {
  let percent = 0;
  if (inverse) {
    const safeTarget = target || 1;
    percent =
      actual <= target
        ? 100
        : Math.max(0, 100 - ((actual - target) / target) * 100);
  } else {
    percent = Math.min(100, (actual / target) * 100);
  }

  const isGood = inverse ? actual <= target : actual >= target;
  const colorClass = isGood ? "bg-emerald-500" : "bg-red-500";
  const textClass = isGood ? "text-emerald-600" : "text-red-600";
  const format = (val) => (isCurrency ? `$${val.toLocaleString()}` : val);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className={textClass}>
          {format(actual)}
          {unit}{" "}
          <span className="text-slate-400 font-normal">
            / {format(target)}
            {unit}
          </span>
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

const CommonMetricsBreakdown = ({ metrics }) => {
  return (
    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
      <h5 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
        <Clock className="w-3 h-3" /> HR & Operations Metrics
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <DeviationBar
          label="Late Days (Inverse)"
          actual={metrics.lateDays}
          target={0}
          inverse={true}
        />
        <DeviationBar
          label="Working Hours / Week"
          actual={metrics.workingHours}
          target={45}
          unit="h"
        />
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500">Experience</span>
          <span className="text-xs font-bold text-blue-600">
            {metrics.experienceYears} Years
            <span className="ml-1 text-slate-400 font-normal">
              (
              {metrics.experienceYears >= 3
                ? "Tier 3"
                : metrics.experienceYears >= 2
                ? "Tier 2"
                : "Tier 1"}
              )
            </span>
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500">KPI Bonus</span>
          <span className="text-xs font-bold text-emerald-600">
            ${metrics.kpiAmount}
            <span className="ml-1 text-slate-400 font-normal">
              (
              {metrics.kpiAmount >= 20000
                ? "Tier 3"
                : metrics.kpiAmount >= 10000
                ? "Tier 2"
                : metrics.kpiAmount >= 5000
                ? "Tier 1"
                : "None"}
              )
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const Performance360 = () => {
  const [selectedSub, setSelectedSub] = useState(null);

  const processedSubs = useMemo(() => {
    return SUBORDINATES.map((sub) => {
      let score = 0;
      if (sub.role === "RVM") score = calculateRVMScore(sub.metrics);
      if (sub.role === "Client Team") score = calculateClientScore(sub.metrics);
      if (sub.role === "Processing")
        score = calculateProcessingScore(sub.metrics);
      if (sub.role === "Admin") score = calculateAdminScore(sub.metrics);
      return { ...sub, currentScore: score };
    });
  }, []);

  const myScore = calculateRVMScore(MY_METRICS);

  // Combine Self History with Team History for Chart
  const comparisonData = useMemo(() => {
    return MY_METRICS.history.map((item, index) => ({
      month: item.month,
      self: item.score,
      team: TEAM_AVERAGE_HISTORY[index].score,
    }));
  }, []);

  // Comparison Data for Subordinates (Selected Sub vs Team Avg)
  const subComparisonData = useMemo(() => {
    if (!selectedSub) return [];
    return selectedSub.history.map((item, index) => ({
      month: item.month,
      self: item.score,
      team: TEAM_AVERAGE_HISTORY[index].score, // Using same mock team avg for demo
    }));
  }, [selectedSub]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. MY PERFORMANCE HEADER */}
      <div className="bg-gradient-to-r from-[#030F1D] to-[#0a1f35] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Me"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Md Nayeeb
              </h1>
              <p className="text-blue-300 font-medium">Manager (RVM Lead)</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 bg-black/20 w-fit px-3 py-1 rounded-full">
                <Calendar className="w-3 h-3" /> Review: Q1 2026
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                My Score
              </p>
              <div className="text-5xl font-black text-white">{myScore}</div>
            </div>
            <div className="h-16 w-px bg-white/20"></div>
            <PerformanceBadge score={myScore} size="lg" />
          </div>
        </div>
      </div>

      {/* 2. MY TREND & IMPACT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Performance
              Trend (12 Months)
            </h3>
            <div className="flex gap-3 text-xs font-bold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-600"></span>{" "}
                Bronze
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>{" "}
                Silver
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>{" "}
                Gold
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>{" "}
                Platinum
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MY_METRICS.history}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  width={30}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    color: "white",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
                <ReferenceLine
                  y={96}
                  stroke="#2563EB"
                  strokeDasharray="3 3"
                  label={{ value: "Platinum", fill: "#2563EB", fontSize: 10 }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  dot={<CustomDot />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" /> Impact Analysis (RVM)
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-80 custom-scrollbar pr-2">
            <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                My Contribution
              </p>
              <DeviationBar
                label="Work Order RFO"
                actual={MY_METRICS.woRfo}
                target={100}
              />
              <DeviationBar
                label="Avg RFO Time"
                actual={MY_METRICS.avgRfoTime}
                target={4.0}
                unit=" hrs"
                inverse={true}
              />
              <DeviationBar
                label="Active Crew"
                actual={MY_METRICS.activeCrew}
                target={20}
              />
              <DeviationBar
                label="New Crew"
                actual={MY_METRICS.newCrew}
                target={5}
              />
              <DeviationBar
                label="States"
                actual={MY_METRICS.states}
                target={4}
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                Team Performance
              </p>
              <DeviationBar
                label="Team Total WO RFO"
                actual={MY_METRICS.teamWoRfo}
                target={MY_METRICS.teamRfoTarget}
              />
              <DeviationBar
                label="Team Avg RFO Time"
                actual={MY_METRICS.teamAvgRfoTime}
                target={4.0}
                unit=" hrs"
                inverse={true}
              />
              <DeviationBar
                label="Team New Crew"
                actual={MY_METRICS.teamNewCrew}
                target={12}
              />
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: MY SELF VS TEAM COMPARISON */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4 mb-6 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-500" /> Comparative
          Analysis: My Score vs. Team Average
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comparisonData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                width={30}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                }}
                itemStyle={{ color: "#e2e8f0" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line
                type="monotone"
                dataKey="self"
                name="My Score"
                stroke="#3B82F6"
                strokeWidth={4}
                dot={{ r: 4, strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="team"
                name="Team Average"
                stroke="#94A3B8"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. SUBORDINATES LIST */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-500" /> Direct Reports
          Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {processedSubs.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSub(sub)}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={sub.img}
                    alt={sub.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors">
                      {sub.name}
                    </h4>
                    <p className="text-xs text-slate-500">{sub.role} Team</p>
                  </div>
                </div>
                <PerformanceBadge
                  score={sub.currentScore}
                  role={sub.role}
                  metrics={sub.metrics}
                  size="sm"
                />
              </div>

              <div className="h-16 mb-4 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sub.history}>
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={
                        sub.currentScore >= 85
                          ? "#EAB308"
                          : sub.currentScore >= 70
                          ? "#94A3B8"
                          : "#EA580C"
                      }
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
                <span className="font-bold">
                  {sub.role === "Admin" ? "Compliance" : `${sub.currentScore}%`}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-blue-500 font-bold">
                  Details <ChevronDown className="w-3 h-3 -rotate-90" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DEEP DIVE MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedSub(null)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#030F1D] p-6 text-white flex justify-between items-start shrink-0">
              <div className="flex gap-6 items-center">
                <img
                  src={selectedSub.img}
                  className="w-20 h-20 rounded-full border-4 border-white/10 object-cover"
                  alt={selectedSub.name}
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedSub.name}</h2>
                  <p className="text-blue-300 font-medium">
                    {selectedSub.designation} • {selectedSub.dept}
                  </p>
                  <div className="flex gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> {selectedSub.role} Eval
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <PerformanceBadge
                  score={selectedSub.currentScore}
                  role={selectedSub.role}
                  metrics={selectedSub.metrics}
                  size="lg"
                />
                <button
                  onClick={() => setSelectedSub(null)}
                  className="text-white/60 hover:text-white ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {/* --- RVM DETAIL --- */}
                {selectedSub.role === "RVM" && (
                  <>
                    <DeviationBar
                      label="Work Order RFO"
                      actual={selectedSub.metrics.woRfo}
                      target={100}
                    />
                    <DeviationBar
                      label="Avg RFO Time (hrs)"
                      actual={selectedSub.metrics.avgRfoTime}
                      target={4.0}
                      inverse={true}
                    />
                    <DeviationBar
                      label="Active Crew"
                      actual={selectedSub.metrics.activeCrew}
                      target={20}
                    />
                    <DeviationBar
                      label="New Crew"
                      actual={selectedSub.metrics.newCrew}
                      target={5}
                    />
                    <DeviationBar
                      label="States Covered"
                      actual={selectedSub.metrics.states}
                      target={4}
                    />
                    <DeviationBar
                      label="WO/Contractor Ratio"
                      actual={selectedSub.metrics.woRatio}
                      target={5}
                      inverse={true}
                    />
                  </>
                )}

                {/* --- CLIENT TEAM DETAIL --- */}
                {selectedSub.role === "Client Team" && (
                  <>
                    <DeviationBar
                      label="Total Client Invoice"
                      actual={selectedSub.metrics.totalInvoice}
                      target={20000}
                      isCurrency={true}
                    />
                    <DeviationBar
                      label="Invoice Completion"
                      actual={selectedSub.metrics.invoiceCompletion}
                      target={90}
                      unit="%"
                    />
                    <DeviationBar
                      label="Preservation Work"
                      actual={selectedSub.metrics.preservationWork}
                      target={100}
                    />
                    <DeviationBar
                      label="Rental Work"
                      actual={selectedSub.metrics.rentalWork}
                      target={10}
                    />
                    <DeviationBar
                      label="Commercial Work"
                      actual={selectedSub.metrics.commercialWork}
                      target={5}
                    />
                    <DeviationBar
                      label="States Covered"
                      actual={selectedSub.metrics.states}
                      target={5}
                    />
                    <DeviationBar
                      label="Active Clients"
                      actual={selectedSub.metrics.activeClients}
                      target={8}
                    />
                    <DeviationBar
                      label="New Clients"
                      actual={selectedSub.metrics.newClients}
                      target={2}
                    />
                    <DeviationBar
                      label="Gross Profit"
                      actual={selectedSub.metrics.grossProfit}
                      target={7000}
                      isCurrency={true}
                    />
                  </>
                )}

                {/* --- PROCESSING DETAIL --- */}
                {selectedSub.role === "Processing" && (
                  <>
                    <DeviationBar
                      label="WO Submitted"
                      actual={selectedSub.metrics.woSubmitted}
                      target={90}
                      unit="%"
                    />
                    <DeviationBar
                      label="Total Bid Count"
                      actual={selectedSub.metrics.bidCount}
                      target={300}
                    />
                    <DeviationBar
                      label="Total Bid Amount"
                      actual={selectedSub.metrics.bidAmount}
                      target={400000}
                      isCurrency={true}
                    />
                    <DeviationBar
                      label="Approval Ratio"
                      actual={selectedSub.metrics.approvalRatio}
                      target={10}
                      unit="%"
                    />
                    <DeviationBar
                      label="Total BA Amount"
                      actual={selectedSub.metrics.baAmount}
                      target={20000}
                      isCurrency={true}
                    />
                  </>
                )}

                {/* --- ADMIN DETAIL --- */}
                {selectedSub.role === "Admin" && (
                  <div className="col-span-2 space-y-6">
                    <div
                      className={`p-4 rounded-xl border ${
                        selectedSub.currentScore === 100
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <h5 className="font-bold mb-2 flex items-center gap-2">
                        {selectedSub.currentScore === 100 ? (
                          <CheckCircle2 className="text-emerald-600" />
                        ) : (
                          <Ban className="text-red-600" />
                        )}
                        Compliance Status:{" "}
                        {selectedSub.currentScore === 100
                          ? "Active (Green)"
                          : "Violation (Black Badge)"}
                      </h5>
                      <p className="text-sm opacity-80">
                        {selectedSub.currentScore === 100
                          ? "Employee is meeting attendance and lateness protocols."
                          : "Employee has exceeded 10 late days AND worked less than 30 hours."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                        <span className="text-xs text-slate-500 uppercase font-bold">
                          Late Days
                        </span>
                        <div className="text-2xl font-black">
                          {selectedSub.metrics.lateDays}
                        </div>
                        <div className="text-xs text-slate-400">
                          Threshold: 10
                        </div>
                      </div>
                      <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                        <span className="text-xs text-slate-500 uppercase font-bold">
                          Working Hours
                        </span>
                        <div className="text-2xl font-black">
                          {selectedSub.metrics.workingHours}
                        </div>
                        <div className="text-xs text-slate-400">
                          Threshold: 30
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* COMMON METRICS */}
              {selectedSub.role !== "Admin" && (
                <CommonMetricsBreakdown metrics={selectedSub.metrics} />
              )}

              {/* 12-MONTH TREND CHART FOR SUBORDINATE (INCLUDING ADMIN) */}
              <div className="mt-8">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />{" "}
                  Performance History (12 Months)
                </h4>
                <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedSub.history}>
                      <defs>
                        <linearGradient
                          id="subScore"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3B82F6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        width={30}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          color: "white",
                          borderRadius: "8px",
                          border: "none",
                        }}
                        itemStyle={{ color: "#e2e8f0" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#subScore)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* TEAM VS SELF COMPARISON FOR SUBORDINATE (INCLUDING ADMIN) */}
              <div className="mt-8">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" /> Comparative
                  Analysis: Employee Score vs. Team Average
                </h4>
                <div className="h-64 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={subComparisonData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        width={30}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          color: "white",
                          borderRadius: "8px",
                          border: "none",
                        }}
                        itemStyle={{ color: "#e2e8f0" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="self"
                        name="Employee Score"
                        stroke="#3B82F6"
                        strokeWidth={4}
                        dot={{ r: 4, strokeWidth: 2, stroke: "white" }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="team"
                        name="Team Average"
                        stroke="#94A3B8"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance360;
