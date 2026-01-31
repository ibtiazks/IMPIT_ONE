import React from "react";
import { Download } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const FULL_DATA = [
  { state: "OR", prev: 50, curr: 284 }, // +468%
  { state: "CA", prev: 50, curr: 8677 }, // HUGE spike
  { state: "IN", prev: 753, curr: 7000 },
  { state: "IA", prev: 35, curr: 235 },
  { state: "WV", prev: 335, curr: 1691 },
  { state: "IL", prev: 645, curr: 1284 },
  { state: "VA", prev: 1973, curr: 3663 },
  { state: "SC", prev: 1012, curr: 1740 },
  { state: "TX", prev: 15617, curr: 25219 },
  { state: "CO", prev: 1915, curr: 2930 },
  { state: "TN", prev: 2790, curr: 2527 },
  { state: "DE", prev: 4035, curr: 3190 },
  { state: "PA", prev: 21424, curr: 13945 },
  { state: "AL", prev: 9755, curr: 5983 },
  { state: "WA", prev: 4832, curr: 2567 },
  { state: "ID", prev: 100, curr: 50 },
  { state: "MA", prev: 500, curr: 206 },
  { state: "KY", prev: 1844, curr: 685 },
  { state: "GA", prev: 840, curr: 280 },
  { state: "RI", prev: 7685, curr: 1282 },
  { state: "AR", prev: 1592, curr: 49 },
];

const StateClientInvoiceTrend = () => {
  const totalPrev = 109161;
  const totalCurr = 122468;
  const maxVal = Math.max(...FULL_DATA.map((d) => Math.max(d.prev, d.curr)));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          State-wise Client Invoice Trend
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <ReportFilter />

      {/* Summary */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl flex justify-between items-center shadow-sm">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">
            Total Invoice (Sep)
          </p>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
            ${totalPrev.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-500 uppercase">
            Total Invoice (Oct)
          </p>
          <div className="flex items-center justify-end gap-3">
            <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
              ${totalCurr.toLocaleString()}
            </p>
            <GlassBadge type="success">
              +{(((totalCurr - totalPrev) / totalPrev) * 100).toFixed(1)}%
            </GlassBadge>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4 text-right">Prev Invoice</th>
              <th className="px-6 py-4 text-right">Curr Invoice</th>
              <th className="px-6 py-4 w-64">Visual</th>
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
                  <td className="px-6 py-3 text-right dark:text-slate-300">
                    ${row.prev.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right font-bold dark:text-white">
                    ${row.curr.toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1 h-6">
                      {/* Simple visualization of magnitude */}
                      <div
                        style={{ width: `${(row.curr / maxVal) * 100}%` }}
                        className={`h-full rounded-r-md ${
                          type === "success"
                            ? "bg-emerald-500"
                            : type === "danger"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
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

export default StateClientInvoiceTrend;
