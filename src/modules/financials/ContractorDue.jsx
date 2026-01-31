import React from "react";
import { Download } from "lucide-react";

const MOCK_DUES = [
  { id: 1, contractor: "Apex Solutions", totalDue: 50 },
  { id: 2, contractor: "Rapid Fixers", totalDue: 2500 },
];

const ContractorDue = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Contractor Due Summary
        </h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Contractor Name</th>
              <th className="px-6 py-4 text-right">Total Balance Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_DUES.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                  {row.contractor}
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-red-500 text-lg">
                  ${row.totalDue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractorDue;
