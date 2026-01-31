import React, { useMemo } from "react";
import { Download, Calendar } from "lucide-react";

const CLIENT_LIST = [
  "Cyprexx",
  "First Allegiance",
  "Sandcastle",
  "Brookstone",
  "Guardian",
  "Spectrum",
  "Five Brothers",
  "Aremco",
  "Kando",
  "Home365",
  "DMG Pro",
  "BMG",
  "Liberty Home Guard",
  "Armadillo",
  "MCS",
  "Blackdome",
  "Singlesource",
  "Leading Edge",
  "American Homes",
  "Altisource",
  "MP Home",
];

// Helper to generate consistent mock data
const generateSummaryData = () => {
  return CLIENT_LIST.map((client, i) => {
    const invoiced = Math.floor(Math.random() * 50000) + 10000;
    const paid = Math.floor(invoiced * (0.5 + Math.random() * 0.4)); // 50-90% paid
    const totalDue = invoiced - paid;
    const dueGT40 = Math.floor(totalDue * (Math.random() * 0.6)); // Some portion is > 40 days
    const dueLT40 = totalDue - dueGT40;
    const contractorPaid = Math.floor(paid * 0.65); // Contractor gets ~65% of paid
    const profit = paid - contractorPaid;
    const profitPercent = paid > 0 ? ((profit / paid) * 100).toFixed(1) : 0;

    return {
      client,
      invoiced,
      paid,
      totalDue,
      dueLT40,
      dueGT40,
      contractorPaid,
      profit,
      profitPercent,
    };
  });
};

const PaymentTrackerSummary = () => {
  const tableData = useMemo(() => generateSummaryData(), []);

  // Calculate Totals for Footer & Dashboard
  const totals = useMemo(() => {
    return tableData.reduce(
      (acc, curr) => ({
        invoiced: acc.invoiced + curr.invoiced,
        paid: acc.paid + curr.paid,
        totalDue: acc.totalDue + curr.totalDue,
        dueLT40: acc.dueLT40 + curr.dueLT40,
        dueGT40: acc.dueGT40 + curr.dueGT40,
        contractorPaid: acc.contractorPaid + curr.contractorPaid,
        profit: acc.profit + curr.profit,
      }),
      {
        invoiced: 0,
        paid: 0,
        totalDue: 0,
        dueLT40: 0,
        dueGT40: 0,
        contractorPaid: 0,
        profit: 0,
      }
    );
  }, [tableData]);

  // Dashboard Metrics
  const profitability =
    totals.paid > 0
      ? (((totals.paid - totals.contractorPaid) / totals.paid) * 100).toFixed(2)
      : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 w-full sm:w-auto">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input
            type="month"
            className="bg-transparent text-sm outline-none dark:text-white w-full"
            defaultValue="2025-10"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 w-full sm:w-auto justify-center">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      {/* Top Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`p-4 rounded-xl border shadow-sm ${
            parseFloat(profitability) > 0
              ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">
            Profitability (Margin)
          </p>
          <p
            className={`text-2xl font-extrabold ${
              parseFloat(profitability) > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600"
            }`}
          >
            {profitability}%
          </p>
          <p className="text-[10px] text-slate-400">
            (Paid - Contr. Paid) / Paid
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Due
          </p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            ${totals.totalDue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* FIX: Escaped the '>' character here */}
          <p className="text-xs text-slate-500 uppercase font-bold">
            Expected Payment (&gt; 40 Days)
          </p>
          <p className="text-2xl font-bold text-amber-500">
            ${totals.dueGT40.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3 sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 border-r border-slate-200 dark:border-slate-800">
                Client Name
              </th>
              <th className="px-4 py-3 text-right">Invoiced</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-right text-red-500">Total Due</th>
              <th className="px-4 py-3 text-right">Due &lt;40 Days</th>
              <th className="px-4 py-3 text-right text-amber-500">
                Due &gt;40 Days
              </th>
              <th className="px-4 py-3 text-right">Contractor Paid</th>
              <th className="px-4 py-3 text-right">Profit</th>
              <th className="px-4 py-3 text-right">Profit %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {tableData.map((row) => (
              <tr
                key={row.client}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-3 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-100 dark:border-slate-800">
                  {row.client}
                </td>
                <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                  ${row.invoiced.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                  ${row.paid.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-red-500 font-medium">
                  ${row.totalDue.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                  ${row.dueLT40.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-amber-600 font-bold">
                  ${row.dueGT40.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">
                  ${row.contractorPaid.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-3 text-right font-bold ${
                    row.profit >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  ${row.profit.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-3 text-right font-bold ${
                    row.profit >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {row.profitPercent}%
                </td>
              </tr>
            ))}

            {/* TOTAL ROW */}
            <tr className="bg-[#030F1D] text-white font-bold text-sm">
              <td className="px-4 py-3 sticky left-0 bg-[#030F1D] z-10 border-r border-white/10 uppercase tracking-wider">
                Total
              </td>
              <td className="px-4 py-3 text-right">
                ${totals.invoiced.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                ${totals.paid.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-red-300">
                ${totals.totalDue.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                ${totals.dueLT40.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-amber-300">
                ${totals.dueGT40.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                ${totals.contractorPaid.toLocaleString()}
              </td>
              <td
                className={`px-4 py-3 text-right ${
                  totals.profit >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                ${totals.profit.toLocaleString()}
              </td>
              <td
                className={`px-4 py-3 text-right ${
                  totals.profit >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {profitability}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTrackerSummary;
