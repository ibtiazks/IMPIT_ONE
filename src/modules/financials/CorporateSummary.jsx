import React, { useMemo } from "react";
import { Download, Calendar } from "lucide-react";

const CLIENTS = ["Brolex", "Cyprexx", "MCS", "Sandcastle"];

// --- COMPANY WISE PROFIT ---
const CompanyProfit = () => {
  // 1. Mock Base Data
  const rawData = [
    {
      name: "Brolex",
      ctSalary: 2000,
      maint: 15,
      recur: 30,
      totalWO: 45,
      profit: 5000,
    },
    {
      name: "Cyprexx",
      ctSalary: 2500,
      maint: 20,
      recur: 10,
      totalWO: 30,
      profit: 4000,
    },
    {
      name: "MCS",
      ctSalary: 2200,
      maint: 50,
      recur: 50,
      totalWO: 100,
      profit: 9000,
    },
    {
      name: "Sandcastle",
      ctSalary: 1800,
      maint: 5,
      recur: 5,
      totalWO: 10,
      profit: 1200,
    },
  ];

  const TOTAL_OPS_COST = 50000; // Mock base for calculations (Operating Cost)

  // 2. Calculate Totals
  const totals = rawData.reduce(
    (acc, r) => ({
      ctSalary: acc.ctSalary + r.ctSalary,
      maint: acc.maint + r.maint,
      recur: acc.recur + r.recur,
      totalWO: acc.totalWO + r.totalWO,
      profit: acc.profit + r.profit,
    }),
    { ctSalary: 0, maint: 0, recur: 0, totalWO: 0, profit: 0 }
  );

  // 3. Process Rows with Percentage Logic
  const processedRows = rawData.map((r) => {
    const mainPerc = r.maint / totals.maint;
    const recurPerc = r.recur / totals.recur;
    const profitPerc = r.profit / totals.profit;

    return {
      ...r,
      mainPerc: (mainPerc * 100).toFixed(1),
      mainOp: Math.round(mainPerc * TOTAL_OPS_COST * 0.3),
      recurPerc: (recurPerc * 100).toFixed(1),
      recurOp: Math.round(recurPerc * TOTAL_OPS_COST * 0.2),
      profitPerc: (profitPerc * 100).toFixed(1),
      profitOp: Math.round(profitPerc * TOTAL_OPS_COST * 0.5),
    };
  });

  // 4. Totals for Calculated Columns
  const totalCalc = processedRows.reduce(
    (acc, r) => ({
      mainOp: acc.mainOp + r.mainOp,
      recurOp: acc.recurOp + r.recurOp,
      profitOp: acc.profitOp + r.profitOp,
    }),
    { mainOp: 0, recurOp: 0, profitOp: 0 }
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border dark:border-slate-800">
        <span className="text-xs font-bold text-slate-500 uppercase">
          Base Total Operating Cost: ${TOTAL_OPS_COST.toLocaleString()}
        </span>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3 text-right">CT Salary</th>
              <th className="px-4 py-3 text-right">Maint. #</th>
              <th className="px-4 py-3 text-right">Main %</th>
              <th className="px-4 py-3 text-right">Main Ops ($)</th>
              <th className="px-4 py-3 text-right">Recur #</th>
              <th className="px-4 py-3 text-right">Recur %</th>
              <th className="px-4 py-3 text-right">Recur Ops ($)</th>
              <th className="px-4 py-3 text-right">Total WO</th>
              <th className="px-4 py-3 text-right">Profit ($)</th>
              <th className="px-4 py-3 text-right">Profit %</th>
              <th className="px-4 py-3 text-right">Profit Ops ($)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {processedRows.map((r) => (
              <tr
                key={r.name}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-2 font-bold dark:text-white">
                  {r.name}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  ${r.ctSalary.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  {r.maint}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  {r.mainPerc}%
                </td>
                <td className="px-4 py-2 text-right font-medium text-blue-600">
                  ${r.mainOp.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  {r.recur}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  {r.recurPerc}%
                </td>
                <td className="px-4 py-2 text-right font-medium text-purple-600">
                  ${r.recurOp.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  {r.totalWO}
                </td>
                <td className="px-4 py-2 text-right text-emerald-600 font-bold">
                  ${r.profit.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  {r.profitPerc}%
                </td>
                <td className="px-4 py-2 text-right font-bold text-orange-600">
                  ${r.profitOp.toLocaleString()}
                </td>
              </tr>
            ))}
            {/* TOTAL ROW */}
            <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
              <td className="px-4 py-2">TOTAL</td>
              <td className="px-4 py-2 text-right">
                ${totals.ctSalary.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right">{totals.maint}</td>
              <td className="px-4 py-2 text-right">100%</td>
              <td className="px-4 py-2 text-right">
                ${totalCalc.mainOp.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right">{totals.recur}</td>
              <td className="px-4 py-2 text-right">100%</td>
              <td className="px-4 py-2 text-right">
                ${totalCalc.recurOp.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right">{totals.totalWO}</td>
              <td className="px-4 py-2 text-right">
                ${totals.profit.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right">100%</td>
              <td className="px-4 py-2 text-right">
                ${totalCalc.profitOp.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- FINANCIAL SUMMARY & WORK TYPE ---
const SummaryView = ({ type }) => {
  // Mock Data for Work Type
  const workData = [
    { name: "Brolex", recur: 42, maint: 12 },
    { name: "Cyprexx", recur: 20, maint: 35 },
    { name: "MCS", recur: 100, maint: 5 },
  ];
  const workTotals = workData.reduce(
    (acc, curr) => ({
      recur: acc.recur + curr.recur,
      maint: acc.maint + curr.maint,
    }),
    { recur: 0, maint: 0 }
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
        {type === "summary"
          ? "Financial Breakdown (Summary)"
          : "Work Type Analysis"}
      </h3>
      <div className="space-y-4">
        {type === "summary" ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { l: "Total Ops Cost", v: "$50,000" },
              { l: "CT Salary", v: "$12,500" },
              { l: "Profit Ops", v: "$25,000" },
              { l: "Maint Ops", v: "$7,500" },
              { l: "Recur Ops", v: "$5,000" },
            ].map((item) => (
              <div
                key={item.l}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700"
              >
                <p className="text-xs text-slate-500 uppercase font-bold">
                  {item.l}
                </p>
                <p className="text-xl font-bold dark:text-white mt-1">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#030F1D] text-white uppercase font-bold">
              <tr>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3 text-right">Recurring #</th>
                <th className="px-6 py-3 text-right">Maintenance #</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {workData.map((c) => (
                <tr key={c.name}>
                  <td className="px-6 py-3 font-bold dark:text-white">
                    {c.name}
                  </td>
                  <td className="px-6 py-3 text-right dark:text-slate-300">
                    {c.recur}
                  </td>
                  <td className="px-6 py-3 text-right dark:text-slate-300">
                    {c.maint}
                  </td>
                </tr>
              ))}
              {/* TOTAL ROW */}
              <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white">
                <td className="px-6 py-3 uppercase">Total</td>
                <td className="px-6 py-3 text-right">{workTotals.recur}</td>
                <td className="px-6 py-3 text-right">{workTotals.maint}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export const CorporateSummary = ({ activeTab }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Common Date Filter */}
      <div className="flex justify-end gap-2 mb-4">
        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input
            type="month"
            className="bg-transparent text-sm outline-none dark:text-white"
            defaultValue="2025-10"
          />
        </div>
      </div>

      {activeTab === "company-profit" && <CompanyProfit />}
      {activeTab === "fin-summary" && <SummaryView type="summary" />}
      {activeTab === "work-type" && <SummaryView type="work" />}
    </div>
  );
};
