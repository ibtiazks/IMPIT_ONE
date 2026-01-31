import React from "react";
import { Download } from "lucide-react";
import { ReportFilter } from "./ReportUtils";

const ProfitLossStatement = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Profit / Loss Statement
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <ReportFilter />

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#D9E1F2] text-black font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Criteria</th>
              <th className="px-6 py-4 text-right">UNIQUE</th>
              <th className="px-6 py-4 text-right">BROLLEX</th>
              <th className="px-6 py-4 text-right">EFFCY</th>
              <th className="px-6 py-4 text-right">RITE OPTION</th>
              <th className="px-6 py-4 text-right">TRUCARE</th>
              <th className="px-6 py-4 text-right">TINKER</th>
              <th className="px-6 py-4 text-right bg-amber-300">Overall</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-[#F2F2F2] text-black">
            <tr>
              <td className="px-6 py-4 font-bold">Total Revenue</td>
              <td className="px-6 py-4 text-right">$15,378</td>
              <td className="px-6 py-4 text-right">$19,803</td>
              <td className="px-6 py-4 text-right">$13,910</td>
              <td className="px-6 py-4 text-right">$1,893</td>
              <td className="px-6 py-4 text-right">$56,595</td>
              <td className="px-6 py-4 text-right">$12,973</td>
              <td className="px-6 py-4 text-right font-bold bg-[#E9E9E9]">
                $120,554
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Total Cost</td>
              <td className="px-6 py-4 text-right">$17,956</td>
              <td className="px-6 py-4 text-right">$24,770</td>
              <td className="px-6 py-4 text-right">$11,631</td>
              <td className="px-6 py-4 text-right">$11,747</td>
              <td className="px-6 py-4 text-right">$43,569</td>
              <td className="px-6 py-4 text-right">$11,353</td>
              <td className="px-6 py-4 text-right font-bold bg-[#E9E9E9]">
                $121,029
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Profit / Loss</td>
              <td className="px-6 py-4 text-right bg-green-200 text-green-900 font-bold">
                $(2,578)
              </td>
              <td className="px-6 py-4 text-right bg-red-500 text-white font-bold">
                $(4,967)
              </td>
              <td className="px-6 py-4 text-right bg-green-200 text-green-900 font-bold">
                $2,278
              </td>
              <td className="px-6 py-4 text-right bg-red-500 text-white font-bold">
                $(9,854)
              </td>
              <td className="px-6 py-4 text-right bg-green-200 text-green-900 font-bold">
                $13,026
              </td>
              <td className="px-6 py-4 text-right bg-green-200 text-green-900 font-bold">
                $1,619
              </td>
              <td className="px-6 py-4 text-right font-bold bg-amber-300">
                $(475)
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Percentage (%)</td>
              <td className="px-6 py-4 text-right">-14.36%</td>
              <td className="px-6 py-4 text-right">-20.05%</td>
              <td className="px-6 py-4 text-right">19.59%</td>
              <td className="px-6 py-4 text-right">-83.88%</td>
              <td className="px-6 py-4 text-right">29.90%</td>
              <td className="px-6 py-4 text-right">14.27%</td>
              <td className="px-6 py-4 text-right font-bold bg-amber-300">
                -0.39%
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-blue-800">
                Previous Month
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $(4,150)
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $26,689
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $(2,831)
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $1,207
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $10,181
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $(2,462)
              </td>
              <td className="px-6 py-4 text-right bg-blue-100 font-bold">
                $28,633
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitLossStatement;
