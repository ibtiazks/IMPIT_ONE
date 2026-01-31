import React, { useState } from "react";
import { Calendar, Filter } from "lucide-react";

// --- REUSABLE FILTER COMPONENT ---
export const ReportFilter = ({ onFilterChange }) => {
  const [mode, setMode] = useState("month"); // 'month' or 'range'
  const [month, setMonth] = useState("2025-10");
  const [range, setRange] = useState({ start: "", end: "" });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
        <button
          onClick={() => setMode("month")}
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
            mode === "month"
              ? "bg-white dark:bg-slate-700 shadow text-orange-600"
              : "text-slate-500"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setMode("range")}
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
            mode === "range"
              ? "bg-white dark:bg-slate-700 shadow text-orange-600"
              : "text-slate-500"
          }`}
        >
          Date Range
        </button>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <Calendar className="w-4 h-4 text-slate-400" />
        {mode === "month" ? (
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-transparent text-sm font-bold outline-none dark:text-white border-b border-slate-300 dark:border-slate-700 px-2 py-1"
          />
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="bg-transparent text-sm font-bold outline-none dark:text-white border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              className="bg-transparent text-sm font-bold outline-none dark:text-white border border-slate-300 dark:border-slate-700 rounded px-2 py-1"
            />
          </div>
        )}
      </div>

      <button className="flex items-center gap-2 px-6 py-2 bg-[#030F1D] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg">
        <Filter className="w-4 h-4" /> Apply Filter
      </button>
    </div>
  );
};

// --- GLASSMORPHISM BADGE ---
export const GlassBadge = ({ value, type = "neutral", children }) => {
  // Types: success (green), danger (red), neutral (slate), warning (amber)
  let styles = "bg-slate-500/10 text-slate-600 border-slate-500/20";

  if (type === "success")
    styles =
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
  if (type === "danger")
    styles =
      "bg-red-500/10 text-red-600 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]";
  if (type === "warning")
    styles = "bg-amber-500/10 text-amber-600 border-amber-500/20";
  if (type === "blue")
    styles = "bg-blue-500/10 text-blue-600 border-blue-500/20";

  return (
    <div
      className={`px-3 py-1 rounded-lg border backdrop-blur-md font-bold text-xs inline-flex items-center justify-center ${styles}`}
    >
      {children || value}
    </div>
  );
};
