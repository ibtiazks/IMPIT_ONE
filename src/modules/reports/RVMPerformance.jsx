import React from "react";
import { Download } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const DATA = [
  {
    name: "Bruce Yasin",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    wo: 119,
    rfo: 8.3,
    states: 6,
    profit: 12263,
    crew: 17,
  },
  {
    name: "Daniel Dawson",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    wo: 60,
    rfo: 11.4,
    states: 6,
    profit: 3257,
    crew: 5,
  },
  {
    name: "Jake Ross",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    wo: 246,
    rfo: 9.1,
    states: 6,
    profit: 13744,
    crew: 17,
  },
  {
    name: "Leo Vincent",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    wo: 160,
    rfo: 8.2,
    states: 6,
    profit: 9967,
    crew: 19,
  },
  {
    name: "Stella Hart",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    wo: 35,
    rfo: 13.9,
    states: 7,
    profit: 7860,
    crew: 4,
  },
  {
    name: "Victor Hilbert",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    wo: 160,
    rfo: 5.4,
    states: 5,
    profit: 7097,
    crew: 16,
  },
];

const RVMPerformance = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          RVM Performance Summary
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
              <th className="px-6 py-4">RVM</th>
              <th className="px-6 py-4 text-center">Total WO</th>
              <th className="px-6 py-4 text-center">RFO Timeline</th>
              <th className="px-6 py-4 text-center">States Covered</th>
              <th className="px-6 py-4 text-center">Gross Profit</th>
              <th className="px-6 py-4 text-center">No. of Crew</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {DATA.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-3 font-bold dark:text-white flex items-center gap-3">
                  <img
                    src={row.avatar}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-600"
                    alt={row.name}
                  />
                  {row.name}
                </td>
                <td className="px-6 py-3 text-center">
                  {row.wo >= 160 ? (
                    <GlassBadge type="success">{row.wo}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.wo}</span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {row.rfo < 6 ? (
                    <GlassBadge type="success">{row.rfo}</GlassBadge>
                  ) : row.rfo > 10 ? (
                    <span className="text-red-500 font-bold">{row.rfo}</span>
                  ) : (
                    <span className="dark:text-slate-300">{row.rfo}</span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {row.states >= 7 ? (
                    <GlassBadge type="success">{row.states}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.states}</span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {row.profit > 10000 ? (
                    <GlassBadge type="success">
                      ${row.profit.toLocaleString()}
                    </GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">
                      ${row.profit.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {row.crew > 15 ? (
                    <GlassBadge type="success">{row.crew}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.crew}</span>
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

export default RVMPerformance;
