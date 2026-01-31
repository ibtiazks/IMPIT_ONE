import React, { useState } from "react";
import {
  BarChart2,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Target,
  UserCheck,
  Activity,
  Upload,
  DollarSign,
  PieChart,
} from "lucide-react";

// Imports
import StateWorkOrderTrend from "./StateWorkOrderTrend";
import StateClientInvoiceTrend from "./StateClientInvoiceTrend";
import TopCrews from "./TopCrews";
import TopClients from "./TopClients";
import LLCSummary from "./LLCSummary";
import LLCInvoiceTarget from "./LLCInvoiceTarget";
import RVMPerformance from "./RVMPerformance";
import AnalystPerformance from "./AnalystPerformance";
import ImportStats from "./ImportStats";
import ExpectedRevenue from "./ExpectedRevenue";
import ProfitLossStatement from "./ProfitLossStatement";

const TABS = [
  { id: "wo-trend", label: "State WO Trend", icon: BarChart2 },
  { id: "inv-trend", label: "Client Inv Trend", icon: TrendingUp },
  { id: "top-crews", label: "Top Crews", icon: Users },
  { id: "top-clients", label: "Top Clients", icon: Award },
  { id: "llc-summary", label: "LLC Summary", icon: Briefcase },
  { id: "llc-target", label: "LLC Target", icon: Target },
  { id: "rvm-perf", label: "RVM Perf", icon: UserCheck },
  { id: "analyst-perf", label: "Analyst Perf", icon: Activity },
  { id: "import-stats", label: "Import Stats", icon: Upload },
  { id: "exp-revenue", label: "Exp. Revenue", icon: DollarSign },
  { id: "pnl", label: "P&L Statement", icon: PieChart },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("wo-trend");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white">
          Reports & Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Detailed insights into operational and financial performance.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-[#030F1D] text-white shadow-lg shadow-blue-900/20"
                : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            <tab.icon
              className={`w-4 h-4 ${
                activeTab === tab.id ? "text-orange-500" : "text-slate-400"
              }`}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeTab === "wo-trend" && <StateWorkOrderTrend />}
        {activeTab === "inv-trend" && <StateClientInvoiceTrend />}
        {activeTab === "top-crews" && <TopCrews />}
        {activeTab === "top-clients" && <TopClients />}
        {activeTab === "llc-summary" && <LLCSummary />}
        {activeTab === "llc-target" && <LLCInvoiceTarget />}
        {activeTab === "rvm-perf" && <RVMPerformance />}
        {activeTab === "analyst-perf" && <AnalystPerformance />}
        {activeTab === "import-stats" && <ImportStats />}
        {activeTab === "exp-revenue" && <ExpectedRevenue />}
        {activeTab === "pnl" && <ProfitLossStatement />}
      </div>
    </div>
  );
};

export default Reports;
