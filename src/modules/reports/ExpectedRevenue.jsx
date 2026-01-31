import React, { useState } from "react";
import { Download, Percent } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const DATA = [
  { llc: "UNIQUE", inv: 18869.2 },
  { llc: "BROLLEX", inv: 20986.99 },
  { llc: "EFFCY", inv: 5915.36 },
  { llc: "RITE-OPTION", inv: 11439.53 },
  { llc: "TRUCARE", inv: 49044.8 },
  { llc: "TINKER", inv: 9843.96 },
];

const ExpectedRevenue = () => {
  const [percent, setPercent] = useState(80); // Default 80%

  // Calculations
  const processedData = DATA.map((d) => ({
    ...d,
    expected: d.inv * (percent / 100),
  }));

  // Find Top 3 for Green Highlight
  const top3Inv = [...processedData]
    .sort((a, b) => b.inv - a.inv)
    .slice(0, 3)
    .map((x) => x.llc);
  const top3Exp = [...processedData]
    .sort((a, b) => b.expected - a.expected)
    .slice(0, 3)
    .map((x) => x.llc);

  // Totals
  const totalInv = processedData.reduce((a, b) => a + b.inv, 0);
  const totalExp = processedData.reduce((a, b) => a + b.expected, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Expected Revenue Projection
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-sm">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <ReportFilter />

      {/* Input Control */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 max-w-md">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-600">
          <Percent className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
            Set Expectation %
          </label>
          <input
            type="number"
            className="w-full text-lg font-bold bg-transparent outline-none border-b border-slate-300 focus:border-orange-500 dark:text-white"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">LLC</th>
              <th className="px-6 py-4 text-center">
                Total Client Invoice (Current)
              </th>
              <th className="px-6 py-4 text-center">Expected Payment (Next)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {processedData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-3 font-bold dark:text-white">
                  {row.llc}
                </td>
                <td className="px-6 py-3 text-center">
                  {top3Inv.includes(row.llc) ? (
                    <GlassBadge type="success">
                      $
                      {row.inv.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300">
                      $
                      {row.inv.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {top3Exp.includes(row.llc) ? (
                    <GlassBadge type="success">
                      $
                      {row.expected.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </GlassBadge>
                  ) : (
                    <span className="dark:text-slate-300 font-medium">
                      $
                      {row.expected.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {/* TOTALS */}
            <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
              <td className="px-6 py-4">TOTAL</td>
              <td className="px-6 py-4 text-center text-lg text-emerald-600">
                $
                {totalInv.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-center text-lg">
                $
                {totalExp.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpectedRevenue;
