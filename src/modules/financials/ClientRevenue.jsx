import React, { useState, useMemo } from "react";

const CLIENTS = [
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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Helper to generate fake data
const getRandomRevenue = () => Math.floor(Math.random() * 5000);

const ClientRevenue = () => {
  // Generate data once so totals match the rows
  const [tableData] = useState(() => {
    return CLIENTS.map((client) => ({
      name: client,
      monthlyValues: MONTHS.map(() => getRandomRevenue()),
    }));
  });

  // Calculate Column Totals
  const totals = useMemo(() => {
    const colTotals = Array(12).fill(0);
    let grandTotal = 0;

    tableData.forEach((row) => {
      row.monthlyValues.forEach((val, idx) => {
        colTotals[idx] += val;
      });
      grandTotal += row.monthlyValues.reduce((a, b) => a + b, 0);
    });

    return { colTotals, grandTotal };
  }, [tableData]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white">
        Client Revenue Dashboard
      </h2>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3 sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 border-r border-slate-200 dark:border-slate-800">
                Client Name
              </th>
              {MONTHS.map((m) => (
                <th key={m} className="px-4 py-3 text-right min-w-[80px]">
                  {m}
                </th>
              ))}
              <th className="px-4 py-3 text-right bg-slate-100 dark:bg-slate-800 min-w-[100px]">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {tableData.map((row) => {
              const rowTotal = row.monthlyValues.reduce((a, b) => a + b, 0);

              return (
                <tr
                  key={row.name}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-2 font-bold text-slate-700 dark:text-slate-200 sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-100 dark:border-slate-800">
                    {row.name}
                  </td>
                  {row.monthlyValues.map((val, idx) => (
                    <td
                      key={idx}
                      className="px-4 py-2 text-right text-slate-600 dark:text-slate-400"
                    >
                      ${val.toLocaleString()}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-right font-bold text-emerald-600 bg-slate-50 dark:bg-slate-950">
                    ${rowTotal.toLocaleString()}
                  </td>
                </tr>
              );
            })}

            {/* Grand Total Row */}
            <tr className="bg-[#030F1D] text-white font-bold text-sm">
              <td className="px-4 py-3 sticky left-0 bg-[#030F1D] z-10 border-r border-white/10 uppercase tracking-wider">
                Grand Total
              </td>
              {totals.colTotals.map((val, idx) => (
                <td key={idx} className="px-4 py-3 text-right">
                  ${val.toLocaleString()}
                </td>
              ))}
              <td className="px-4 py-3 text-right bg-orange-600 border-l border-white/10">
                ${totals.grandTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientRevenue;
