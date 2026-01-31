import React from "react";
import { Download } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const DATA = [
  {
    name: "Jerry",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    wo: 171,
    rec: 59,
    maint: 112,
    avgBid: 3.28,
    avgAmt: 2928,
    baInv: 27454.43,
    appRatio: 5.48,
    profit: 13737,
    profitability: 50.04,
  },
  {
    name: "Ricky",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    wo: 166,
    rec: 86,
    maint: 80,
    avgBid: 3.18,
    avgAmt: 2480,
    baInv: 23066.15,
    appRatio: 5.6,
    profit: 11228,
    profitability: 48.68,
  },
  {
    name: "Oliver",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    wo: 239,
    rec: 144,
    maint: 95,
    avgBid: 1.54,
    avgAmt: 1405,
    baInv: 3380.6,
    appRatio: 1.01,
    profit: 2055,
    profitability: 60.81,
  },
];

const AnalystPerformance = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Analyst Performance Summary
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <ReportFilter />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white font-bold uppercase text-xs">
            <tr>
              <th className="px-4 py-4">Analyst</th>
              <th className="px-4 py-4 text-center">Total WO</th>
              <th className="px-4 py-4 text-center">Recur WO</th>
              <th className="px-4 py-4 text-center">Maint WO</th>
              <th className="px-4 py-4 text-center">Avg Bid/WO</th>
              <th className="px-4 py-4 text-center">Avg Amt/WO</th>
              <th className="px-4 py-4 text-center">Total BA Inv</th>
              <th className="px-4 py-4 text-center">Appr Ratio</th>
              <th className="px-4 py-4 text-center">Total GP</th>
              <th className="px-4 py-4 text-center">Profit %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {DATA.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-3 font-bold dark:text-white flex items-center gap-3">
                  <img
                    src={row.avatar}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600"
                    alt={row.name}
                  />
                  {row.name}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.wo > 200 ? (
                    <GlassBadge type="success">{row.wo}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.wo}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center dark:text-slate-300">
                  {row.rec}
                </td>
                <td className="px-4 py-3 text-center dark:text-slate-300">
                  {row.maint}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.avgBid > 3.2 ? (
                    <GlassBadge type="success">{row.avgBid}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.avgBid}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center dark:text-slate-300">
                  ${row.avgAmt}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.baInv > 25000 ? (
                    <GlassBadge type="success">
                      ${row.baInv.toLocaleString()}
                    </GlassBadge>
                  ) : row.baInv > 20000 ? (
                    <GlassBadge type="success">
                      ${row.baInv.toLocaleString()}
                    </GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">
                      ${row.baInv.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.appRatio > 5.5 ? (
                    <GlassBadge type="success">{row.appRatio}%</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.appRatio}%</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center dark:text-slate-300">
                  ${row.profit.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  {row.profitability > 60 ? (
                    <GlassBadge type="success">{row.profitability}%</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">
                      {row.profitability}%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalystPerformance;
