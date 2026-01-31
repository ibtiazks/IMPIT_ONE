import React, { useMemo } from "react";
import { Download, Calendar, Users } from "lucide-react";

const CONTRACTORS = [
  "Apex Solutions",
  "Badger Maintenance",
  "Rapid Fixers",
  "Midwest Pros",
  "Elite Restorations",
  "Summit Services",
  "Blue Sky Property",
  "Urban Fix",
  "Prime Contractors",
  "Global Maintenance",
];

// Generate Mock Data (Mix of Due and Overpaid)
const generateData = () => {
  return CONTRACTORS.map((c) => {
    // Randomly assign positive (Due) or negative (Overpaid)
    // 70% chance of Due, 30% chance of Overpaid
    const isDue = Math.random() > 0.3;
    const amount = Math.floor(Math.random() * 5000);

    return {
      contractor: c,
      balance: isDue ? amount : -amount, // Positive = Due, Negative = Overpaid
    };
  });
};

const ContractorSummary = () => {
  // Memoize data to prevent regen on re-render
  const data = useMemo(() => generateData(), []);

  // Calculate Grand Total
  const totalBalance = data.reduce((acc, curr) => acc + curr.balance, 0);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header / Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Contractor Ledger Summary
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Net balance status as on{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {currentDate}
            </span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 transition-colors">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#030F1D] text-white uppercase font-bold text-sm">
            <tr>
              <th className="px-6 py-4">Contractor Name</th>
              <th className="px-6 py-4 text-right">
                Net Balance (Due / Overpaid)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {data.map((row) => (
              <tr
                key={row.contractor}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-700 dark:text-white border-r border-slate-100 dark:border-slate-800">
                  {row.contractor}
                </td>
                <td
                  className={`px-6 py-4 text-right font-bold text-base ${
                    row.balance > 0 ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {row.balance > 0 ? "" : "-"}$
                  {Math.abs(row.balance).toLocaleString()}
                  <span className="text-[10px] uppercase ml-2 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {row.balance > 0 ? "Due" : "Overpaid"}
                  </span>
                </td>
              </tr>
            ))}

            {/* TOTAL ROW */}
            <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-4 border-double border-slate-300 dark:border-slate-700">
              <td className="px-6 py-4 uppercase tracking-wider text-right border-r border-slate-300 dark:border-slate-700">
                Total Net Position
              </td>
              <td
                className={`px-6 py-4 text-right text-lg ${
                  totalBalance > 0 ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {totalBalance > 0 ? "" : "-"}$
                {Math.abs(totalBalance).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractorSummary;
