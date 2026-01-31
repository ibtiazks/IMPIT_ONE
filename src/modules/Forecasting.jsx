import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  Target,
  AlertTriangle,
  Users,
  Briefcase,
  ArrowRight,
  BrainCircuit,
  Calculator,
  UserPlus,
  Clock, // <--- This was missing
  CheckCircle2,
} from "lucide-react";

// --- MOCK DATA: CLIENT TEAM ---
const REVENUE_HISTORY = [
  { month: "Oct", revenue: 22000, fixedCost: 15000, variableCost: 5000 },
  { month: "Nov", revenue: 24500, fixedCost: 15000, variableCost: 6000 },
  { month: "Dec", revenue: 21000, fixedCost: 15000, variableCost: 5500 },
];

const CLIENT_CHURN_DATA = [
  { month: "Oct", new: 4, inactive: 1 },
  { month: "Nov", new: 3, inactive: 2 },
  { month: "Dec", new: 5, inactive: 1 },
];

// --- MOCK DATA: RVM TEAM ---
const RVM_STATS = {
  avgRfoTime: 5.8, // Bad (>5)
  totalOrdersClosed: 150,
  activeWorkOrders: 45,
  contractors: [
    { id: 1, name: "Apex Solutions", state: "TX", activeOrders: 24 }, // Overwhelmed
    { id: 2, name: "FixIt Bros", state: "FL", activeOrders: 12 },
    { id: 3, name: "Rapid Rooter", state: "NY", activeOrders: 22 }, // Overwhelmed
  ],
  stateLoad: [
    { state: "TX", orders: 45, contractors: 6 },
    { state: "FL", orders: 20, contractors: 5 },
    { state: "NY", orders: 35, contractors: 4 },
  ],
};

// --- MOCK DATA: EMPLOYEE SCORES ---
const EMPLOYEE_PERFORMANCE = [
  {
    name: "Sarah Jenkins",
    role: "Processing",
    score: 75,
    issues: [
      { metric: "Error Count", val: 4, target: 2 },
      { metric: "Late", val: 3, target: 0 },
    ],
  },
  {
    name: "Mike Chen",
    role: "RVM",
    score: 82,
    issues: [{ metric: "Avg RFO Time", val: 5.2, target: 4.0 }],
  },
];

// --- COMPONENTS ---

const PredictionCard = ({ title, icon: Icon, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
  >
    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-6">
      <Icon className="w-5 h-5 text-blue-500" /> {title}
    </h3>
    {children}
  </div>
);

const RecommendationPill = ({ type, text }) => {
  const colors = {
    hiring: "bg-purple-50 text-purple-700 border-purple-200",
    alert: "bg-red-50 text-red-700 border-red-200",
    action: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <div
      className={`p-3 rounded-lg border text-sm font-medium flex items-start gap-2 ${
        colors[type] || colors.action
      }`}
    >
      {type === "alert" && (
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
      )}
      {type === "hiring" && <UserPlus className="w-4 h-4 mt-0.5 shrink-0" />}
      {type === "action" && <Target className="w-4 h-4 mt-0.5 shrink-0" />}
      <span>{text}</span>
    </div>
  );
};

// --- MAIN PAGE ---

const Forecasting = () => {
  // 1. REVENUE FORECAST LOGIC
  const revenueForecast = useMemo(() => {
    const avgGrowth =
      (REVENUE_HISTORY[1].revenue -
        REVENUE_HISTORY[0].revenue +
        (REVENUE_HISTORY[2].revenue - REVENUE_HISTORY[1].revenue)) /
      2 /
      REVENUE_HISTORY[0].revenue;
    const lastRev = REVENUE_HISTORY[2].revenue;

    return [
      ...REVENUE_HISTORY.map((d) => ({ ...d, type: "Actual" })),
      {
        month: "Jan (Proj)",
        revenue: lastRev * (1 + avgGrowth),
        type: "Forecast",
      },
      {
        month: "Feb (Proj)",
        revenue: lastRev * (1 + avgGrowth * 2),
        type: "Forecast",
      },
      {
        month: "Mar (Proj)",
        revenue: lastRev * (1 + avgGrowth * 3),
        type: "Forecast",
      },
    ];
  }, []);

  // 2. BREAK EVEN LOGIC
  const breakEvenAnalysis = useMemo(() => {
    const avgFixed =
      REVENUE_HISTORY.reduce((acc, curr) => acc + curr.fixedCost, 0) / 3;
    const avgVarRatio =
      REVENUE_HISTORY.reduce(
        (acc, curr) => acc + curr.variableCost / curr.revenue,
        0
      ) / 3;
    const avgRevenue =
      REVENUE_HISTORY.reduce((acc, curr) => acc + curr.revenue, 0) / 3;

    const profit = avgRevenue - (avgFixed + avgRevenue * avgVarRatio);
    const isProfitable = profit > 0;

    const targetProfit = isProfitable ? 3500 : 0;
    const requiredRevenue = (avgFixed + targetProfit) / (1 - avgVarRatio);

    return { isProfitable, requiredRevenue, currentAvg: avgRevenue, profit };
  }, []);

  // 3. CLIENT ONBOARDING LOGIC
  const clientForecast = useMemo(() => {
    const avgChurn =
      CLIENT_CHURN_DATA.reduce((acc, c) => acc + c.inactive, 0) / 3;
    const growthTarget = 2; // Arbitrary "Growth" goal
    const needed = Math.ceil(avgChurn + growthTarget);

    return CLIENT_CHURN_DATA.map((d) => ({ ...d, needed: null })).concat([
      { month: "Jan", new: null, inactive: null, needed: needed },
      { month: "Feb", new: null, inactive: null, needed: needed },
      { month: "Mar", new: null, inactive: null, needed: needed },
    ]);
  }, []);

  // 4. RFO RECOVERY LOGIC
  const rfoRecovery = useMemo(() => {
    if (RVM_STATS.avgRfoTime <= 5) return null;

    const currentTotalHours =
      RVM_STATS.avgRfoTime * RVM_STATS.totalOrdersClosed;
    const targetAvg = 5.0;
    const catchUpSpeed = 3.0;

    const neededOrders = Math.ceil(
      (currentTotalHours - targetAvg * RVM_STATS.totalOrdersClosed) /
        (targetAvg - catchUpSpeed)
    );

    return { neededOrders, speed: catchUpSpeed };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-purple-500" /> Forecasting &
            AI Insights
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Predictive analysis for Revenue, Operations, and HR.
          </p>
        </div>
      </div>

      {/* --- SECTION 1: CLIENT TEAM PREDICTIONS --- */}
      <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <TrendingUp className="w-5 h-5 text-emerald-500" /> Client Team
        Forecasts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Revenue Forecast */}
        <PredictionCard title="Q2 Revenue Projection" icon={TrendingUp}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueForecast}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Legend />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Based on Q1 avg growth rate. Projections assume constant market
            conditions.
          </p>
        </PredictionCard>

        {/* Break Even & Profit Target */}
        <PredictionCard title="Profitability Targets" icon={Calculator}>
          <div className="flex flex-col justify-center h-full space-y-6">
            <div
              className={`p-4 rounded-xl border ${
                breakEvenAnalysis.isProfitable
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <p className="text-xs font-bold uppercase text-slate-500 mb-1">
                Current Status
              </p>
              <p
                className={`text-2xl font-black ${
                  breakEvenAnalysis.isProfitable
                    ? "text-emerald-600"
                    : "text-orange-600"
                }`}
              >
                {breakEvenAnalysis.isProfitable
                  ? `Profitable (+$${breakEvenAnalysis.profit.toFixed(0)})`
                  : "Below Break-Even"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Current 3-Mo Avg
                </span>
                <span className="font-bold">
                  ${breakEvenAnalysis.currentAvg.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Target for{" "}
                  {breakEvenAnalysis.isProfitable
                    ? "+$3.5k Profit"
                    : "Break-Even"}
                </span>
                <span className="font-bold text-blue-600">
                  ${breakEvenAnalysis.requiredRevenue.toFixed(0)}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(
                      100,
                      (breakEvenAnalysis.currentAvg /
                        breakEvenAnalysis.requiredRevenue) *
                        100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-right text-blue-500 font-bold">
                {(
                  (breakEvenAnalysis.currentAvg /
                    breakEvenAnalysis.requiredRevenue) *
                  100
                ).toFixed(1)}
                % to Target
              </p>
            </div>
          </div>
        </PredictionCard>

        {/* Client Onboarding */}
        <PredictionCard title="Hiring Forecast (Churn Adjusted)" icon={Users}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={clientForecast}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="new"
                  name="Actual New"
                  fill="#94A3B8"
                  barSize={20}
                />
                <Bar
                  dataKey="inactive"
                  name="Inactive (Churn)"
                  fill="#EF4444"
                  barSize={20}
                />
                <Line
                  type="monotone"
                  dataKey="needed"
                  name="Required Target"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
            To maintain growth, onboard{" "}
            <span className="font-bold text-blue-600">4 new clients</span>/month
            to offset avg churn.
          </div>
        </PredictionCard>
      </div>

      {/* --- SECTION 2: RVM PREDICTIONS --- */}
      <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 pt-6">
        <Target className="w-5 h-5 text-orange-500" /> RVM Operational Insights
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RFO Recovery */}
        <PredictionCard title="RFO Recovery Plan" icon={Clock}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-red-50 text-red-600 rounded-full border border-red-100">
              <span className="block text-xs font-bold uppercase">
                Current Avg
              </span>
              <span className="text-3xl font-black">
                {RVM_STATS.avgRfoTime}h
              </span>
            </div>
            <ArrowRight className="text-slate-300" />
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <span className="block text-xs font-bold uppercase">Target</span>
              <span className="text-3xl font-black">5.0h</span>
            </div>
          </div>

          {rfoRecovery ? (
            <div className="space-y-3">
              <RecommendationPill
                type="action"
                text={`ACTION: Close the next ${rfoRecovery.neededOrders} work orders within ${rfoRecovery.speed} hours.`}
              />
              <p className="text-xs text-slate-500 ml-1">
                *This aggressive target is required to mathematically bring the
                rolling 3-month average down to 5.0.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />{" "}
              <span>RFO Average is healthy. Keep it up!</span>
            </div>
          )}
        </PredictionCard>

        {/* Contractor Load & State Suggestions */}
        <PredictionCard title="Contractor Optimization" icon={Briefcase}>
          <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar pr-2">
            {/* Overwhelmed Alert */}
            {RVM_STATS.contractors
              .filter((c) => c.activeOrders > 20)
              .map((c) => (
                <RecommendationPill
                  key={c.id}
                  type="alert"
                  text={`CRITICAL: ${c.name} has ${c.activeOrders} active orders (>20). High risk of delay. Reassign work immediately.`}
                />
              ))}

            {/* State Onboarding Suggestions */}
            {RVM_STATS.stateLoad
              .filter((s) => s.orders / s.contractors > 5)
              .map((s) => (
                <RecommendationPill
                  key={s.state}
                  type="hiring"
                  text={`HIRING NEED: ${s.state} ratio is ${(
                    s.orders / s.contractors
                  ).toFixed(1)} (Target 5). Onboard ${
                    Math.ceil(s.orders / 5) - s.contractors
                  } new contractors in ${s.state}.`}
                />
              ))}

            {RVM_STATS.contractors.every((c) => c.activeOrders <= 20) &&
              RVM_STATS.stateLoad.every(
                (s) => s.orders / s.contractors <= 5
              ) && (
                <p className="text-slate-500 text-sm italic">
                  No critical contractor issues detected.
                </p>
              )}
          </div>
        </PredictionCard>
      </div>

      {/* --- SECTION 3: PERFORMANCE IMPROVEMENT --- */}
      <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 pt-6">
        <BrainCircuit className="w-5 h-5 text-blue-500" /> Performance 360 AI
        Coach
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {EMPLOYEE_PERFORMANCE.map((emp, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">
                  {emp.name}
                </h4>
                <p className="text-xs text-slate-500">{emp.role}</p>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs font-bold ${
                  emp.score >= 85
                    ? "bg-emerald-100 text-emerald-700"
                    : emp.score >= 70
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Score: {emp.score}
              </div>
            </div>

            <div className="space-y-3">
              {emp.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="text-sm bg-slate-50 dark:bg-slate-800 p-2 rounded border border-slate-100 dark:border-slate-700"
                >
                  <p className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-red-500" /> Improve{" "}
                    {issue.metric}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Current:{" "}
                    <span className="font-mono font-bold text-red-500">
                      {issue.val}
                    </span>{" "}
                    <ArrowRight className="w-3 h-3 inline mx-1" /> Target:{" "}
                    <span className="font-mono font-bold text-emerald-500">
                      {issue.target}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecasting;
