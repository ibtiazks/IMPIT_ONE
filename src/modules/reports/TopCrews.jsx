import React from "react";
import { Download } from "lucide-react";
import { ReportFilter } from "./ReportUtils";

const MOCK_DATA = [
  { name: "Valerie George", wo: 52, rfo: 5.1 },
  { name: "Juan Marroquin", wo: 42, rfo: 7.4 },
  { name: "Kristin Shimkets", wo: 36, rfo: 5.5 },
  { name: "Aaron Mattorano", wo: 27, rfo: 11.7 },
  { name: "Max Morales", wo: 22, rfo: 10.7 },
  { name: "Donna Reagon", wo: 21, rfo: 8.3 },
  { name: "Rodrigo Ugalde", wo: 14, rfo: 6.3 },
  { name: "Zoe Tolbert", wo: 14, rfo: 9.3 },
  { name: "Richard Traylor", wo: 14, rfo: 21.0 },
];

const TopCrews = () => {
  // Sort for RFO logic: We need to know ranking by RFO to color correctly
  const sortedByRFO = [...MOCK_DATA].sort((a, b) => a.rfo - b.rfo);
  const top3RFO = sortedByRFO.slice(0, 3).map((x) => x.name);
  const bottom3RFO = sortedByRFO.slice(-3).map((x) => x.name);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Top Crews (Performance)
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <ReportFilter />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-500 text-white font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Contractor</th>
              <th className="px-6 py-3 text-center">Total Work Orders</th>
              <th className="px-6 py-3 text-center">RFO Timeline (Days)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_DATA.map((row, i) => {
              let rfoClass = "dark:text-slate-300";
              if (top3RFO.includes(row.name))
                rfoClass = "bg-green-400 text-black font-bold";
              if (bottom3RFO.includes(row.name))
                rfoClass = "bg-red-500 text-white font-bold";

              return (
                <tr
                  key={i}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-3 font-bold dark:text-white">
                    {row.name}
                  </td>
                  <td className="px-6 py-3 text-center dark:text-slate-300">
                    {row.wo}
                  </td>
                  <td className={`px-6 py-3 text-center ${rfoClass}`}>
                    {row.rfo}
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

export default TopCrews;
