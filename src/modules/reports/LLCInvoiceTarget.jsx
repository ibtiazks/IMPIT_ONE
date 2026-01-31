import React, { useState } from "react";
import { Download, Target } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const BASE_DATA = [
  { llc: "BROLLEX", inv: 21027.68, comm: 1, main: 0, pres: 97, rent: 1 },
  { llc: "CAREGUARD", inv: 6110.6, comm: 0, main: 0, pres: 33, rent: 0 },
  { llc: "EFFCY", inv: 5915.36, comm: 0, main: 0, pres: 113, rent: 0 },
  { llc: "RITE-OPTION", inv: 11516.12, comm: 0, main: 0, pres: 92, rent: 1 },
  { llc: "TINKER", inv: 9793.96, comm: 0, main: 5, pres: 120, rent: 5 },
  { llc: "TRUCARE", inv: 49224.58, comm: 0, main: 0, pres: 281, rent: 1 },
  { llc: "UNIQUE", inv: 18879.2, comm: 0, main: 1, pres: 64, rent: 0 },
];

const LLCInvoiceTarget = () => {
  const [targets, setTargets] = useState({});
  const [showReport, setShowReport] = useState(false);

  // Initial setup for targets
  React.useEffect(() => {
    const init = {};
    BASE_DATA.forEach((d) => (init[d.llc] = ""));
    setTargets(init);
  }, []);

  const handleGenerate = () => setShowReport(true);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          LLC Wise Invoice Target
        </h2>
        {showReport && (
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        )}
      </div>

      <ReportFilter />

      {!showReport ? (
        // INPUT STAGE
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" /> Set Monthly Targets
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {BASE_DATA.map((d) => (
              <div key={d.llc}>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  {d.llc}
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  placeholder="Enter Target $"
                  value={targets[d.llc] || ""}
                  onChange={(e) =>
                    setTargets({ ...targets, [d.llc]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-[#030F1D] text-white font-bold rounded-lg hover:bg-slate-800"
          >
            Generate Report
          </button>
        </div>
      ) : (
        // REPORT STAGE
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#030F1D] text-white font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">LLC</th>
                <th className="px-6 py-4 text-right">Total Invoice</th>
                <th className="px-6 py-4 text-right">Target</th>
                <th className="px-6 py-4 text-center">Completion %</th>
                <th className="px-6 py-4 text-center">Commercial</th>
                <th className="px-6 py-4 text-center">Maintenance</th>
                <th className="px-6 py-4 text-center">Preservation</th>
                <th className="px-6 py-4 text-center">Rental</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {BASE_DATA.map((row, i) => {
                const target = parseFloat(targets[row.llc]) || 1;
                const perc = (row.inv / target) * 100;
                const type =
                  perc < 60 ? "danger" : perc > 100 ? "success" : "neutral";

                return (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-3 font-bold dark:text-white">
                      {row.llc}
                    </td>
                    <td className="px-6 py-3 text-right dark:text-slate-300">
                      ${row.inv.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-right dark:text-slate-300">
                      ${target.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <GlassBadge type={type}>{perc.toFixed(2)}%</GlassBadge>
                    </td>
                    <td className="px-6 py-3 text-center dark:text-slate-300">
                      {row.comm}
                    </td>
                    <td className="px-6 py-3 text-center dark:text-slate-300">
                      {row.main}
                    </td>
                    <td className="px-6 py-3 text-center dark:text-slate-300">
                      {row.pres}
                    </td>
                    <td className="px-6 py-3 text-center dark:text-slate-300">
                      {row.rent}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setShowReport(false)}
              className="text-sm font-bold text-slate-500 hover:text-orange-500"
            >
              Edit Targets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLCInvoiceTarget;
