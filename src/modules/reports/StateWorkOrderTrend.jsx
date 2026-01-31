import React from "react";
import { Download } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const FULL_DATA = [
  { state: "WV", prev: 1, curr: 8 }, // +700%
  { state: "IA", prev: 1, curr: 4 }, // +300%
  { state: "IL", prev: 11, curr: 40 }, // +263%
  { state: "KY", prev: 6, curr: 16 },
  { state: "NC", prev: 10, curr: 25 },
  { state: "VA", prev: 36, curr: 68 },
  { state: "TX", prev: 106, curr: 142 },
  { state: "CO", prev: 27, curr: 36 },
  { state: "PA", prev: 96, curr: 119 },
  { state: "FL", prev: 96, curr: 113 },
  { state: "WA", prev: 23, curr: 24 },
  { state: "AL", prev: 17, curr: 16 },
  { state: "IN", prev: 24, curr: 22 },
  { state: "NY", prev: 118, curr: 104 },
  { state: "DC", prev: 8, curr: 6 },
  { state: "RI", prev: 28, curr: 19 },
  { state: "MD", prev: 9, curr: 6 },
  { state: "OH", prev: 3, curr: 2 },
  { state: "TN", prev: 23, curr: 12 },
  { state: "CA", prev: 8, curr: 4 },
  { state: "ID", prev: 2, curr: 1 },
  { state: "GA", prev: 9, curr: 4 },
  { state: "SC", prev: 8, curr: 3 },
  { state: "MA", prev: 11, curr: 4 },
  { state: "DE", prev: 17, curr: 6 },
  { state: "OR", prev: 10, curr: 3 },
  { state: "MS", prev: 7, curr: 2 },
  { state: "AR", prev: 4, curr: 1 },
];

const StateWorkOrderTrend = () => {
  const totalPrev = 727; // From screenshot
  const totalCurr = 815; // From screenshot

  // Chart Logic: Simple CSS Bar
  const maxVal = Math.max(...FULL_DATA.map((d) => Math.max(d.prev, d.curr)));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          State-wise Work Order Trend
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <ReportFilter />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-blue-100 dark:border-slate-700 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Previous Period (Sep 2025)
            </p>
            <p className="text-3xl font-extrabold text-slate-700 dark:text-white mt-1">
              {totalPrev}
            </p>
          </div>
          <div className="h-10 w-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Current Period (Oct 2025)
            </p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">
              {totalCurr}
            </p>
            <GlassBadge type="success">
              +{(((totalCurr - totalPrev) / totalPrev) * 100).toFixed(1)}%
            </GlassBadge>
          </div>
        </div>
      </div>

      {/* Data Grid with Visuals */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4 text-center">Previous</th>
              <th className="px-6 py-4 text-center">Current</th>
              <th className="px-6 py-4 w-48">Comparison Chart</th>
              <th className="px-6 py-4 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {FULL_DATA.map((row, i) => {
              const trend = ((row.curr - row.prev) / row.prev) * 100;
              const type =
                trend >= 50 ? "success" : trend <= -50 ? "danger" : "neutral";

              return (
                <tr
                  key={i}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-3 font-bold dark:text-white">
                    {row.state}
                  </td>
                  <td className="px-6 py-3 text-center text-slate-500 dark:text-slate-400">
                    {row.prev}
                  </td>
                  <td className="px-6 py-3 text-center font-bold text-slate-800 dark:text-white">
                    {row.curr}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1 h-8">
                      <div
                        style={{ width: `${(row.prev / maxVal) * 100}%` }}
                        className="h-2 bg-slate-300 rounded-l-full"
                      ></div>
                      <div
                        style={{ width: `${(row.curr / maxVal) * 100}%` }}
                        className="h-2 bg-blue-500 rounded-r-full"
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <GlassBadge type={type}>
                      {trend > 0 ? "+" : ""}
                      {trend.toFixed(2)}%
                    </GlassBadge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StateWorkOrderTrend;
