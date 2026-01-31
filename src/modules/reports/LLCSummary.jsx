import React from "react";
import { Download } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const DATA = [
  { llc: "BROLLEX", wo: 99, profit: 10023, rfo: 12.1, states: 12, clients: 7 },
  { llc: "CAREGUARD", wo: 33, profit: 2748, rfo: 3.9, states: 6, clients: 3 },
  { llc: "EFFCY", wo: 113, profit: 2126, rfo: 6.2, states: 10, clients: 5 },
  {
    llc: "RITE-OPTION",
    wo: 93,
    profit: 6258,
    rfo: 7.2,
    states: 13,
    clients: 6,
  },
  { llc: "TINKER", wo: 130, profit: 3634, rfo: 7.0, states: 11, clients: 9 },
  { llc: "TRUCARE", wo: 282, profit: 19907, rfo: 9.2, states: 20, clients: 8 },
  { llc: "UNIQUE", wo: 65, profit: 10515, rfo: 10.0, states: 12, clients: 8 },
];

const LLCSummary = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          LLC Summary
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
              <th className="px-6 py-4">LLC</th>
              <th className="px-6 py-4 text-center">Work Order No</th>
              <th className="px-6 py-4 text-center">Gross Profit</th>
              <th className="px-6 py-4 text-center">RFO Timeline</th>
              <th className="px-6 py-4 text-center">States Covered</th>
              <th className="px-6 py-4 text-center">No. of Clients</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {DATA.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-3 font-bold dark:text-white">
                  {row.llc}
                </td>

                <td className="px-6 py-3 text-center">
                  {row.wo < 100 ? (
                    <GlassBadge type="danger">{row.wo.toFixed(1)}</GlassBadge>
                  ) : row.wo > 200 ? (
                    <GlassBadge type="success">{row.wo.toFixed(1)}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">
                      {row.wo.toFixed(1)}
                    </span>
                  )}
                </td>

                <td className="px-6 py-3 text-center">
                  {row.profit > 10000 ? (
                    <GlassBadge type="success">
                      ${row.profit.toLocaleString()}
                    </GlassBadge>
                  ) : row.profit < 2000 ? (
                    <GlassBadge type="danger">
                      ${row.profit.toLocaleString()}
                    </GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">
                      ${row.profit.toLocaleString()}
                    </span>
                  )}
                </td>

                <td className="px-6 py-3 text-center">
                  {row.rfo >= 10 ? (
                    <GlassBadge type="danger">{row.rfo}</GlassBadge>
                  ) : row.rfo <= 5 ? (
                    <GlassBadge type="success">{row.rfo}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.rfo}</span>
                  )}
                </td>

                <td className="px-6 py-3 text-center">
                  {row.states < 10 ? (
                    <GlassBadge type="danger">{row.states}</GlassBadge>
                  ) : row.states >= 20 ? (
                    <GlassBadge type="success">{row.states}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.states}</span>
                  )}
                </td>

                <td className="px-6 py-3 text-center">
                  {row.clients < 5 ? (
                    <GlassBadge type="danger">{row.clients}</GlassBadge>
                  ) : row.clients > 10 ? (
                    <GlassBadge type="success">{row.clients}</GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">{row.clients}</span>
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

export default LLCSummary;
