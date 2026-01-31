import React from "react";
import { Download } from "lucide-react";
import { ReportFilter, GlassBadge } from "./ReportUtils";

const DATA = [
  { client: "A2Z", pa: 0, ca: 0, ny: 0, tx: 219.19, ri: 0 },
  {
    client: "Altisource",
    pa: 8685.58,
    ca: 14231.26,
    ny: 2541.45,
    tx: 2949.65,
    ri: 6297.29,
  },
  { client: "Aremco", pa: 5540.0, ca: 0, ny: 1267.36, tx: 80.0, ri: 0 },
  { client: "Cyprexx", pa: 1097.0, ca: 0, ny: 6929.0, tx: 145.0, ri: 0 },
  { client: "MCS", pa: 0, ca: 0, ny: 0, tx: 124.88, ri: 0 },
  { client: "NFR", pa: 366.7, ca: 0, ny: 0, tx: 6557.08, ri: 0 },
  { client: "Northsight", pa: 1442.77, ca: 0, ny: 77.2, tx: 0, ri: 1519.97 },
];

const TopClients = () => {
  // 1. Calculate Row Totals
  const processedData = DATA.map((d) => ({
    ...d,
    total: d.pa + d.ca + d.ny + d.tx + d.ri,
  }));

  // 2. Calculate Col Totals
  const colTotals = processedData.reduce(
    (acc, curr) => ({
      pa: acc.pa + curr.pa,
      ca: acc.ca + curr.ca,
      ny: acc.ny + curr.ny,
      tx: acc.tx + curr.tx,
      ri: acc.ri + curr.ri,
      total: acc.total + curr.total,
    }),
    { pa: 0, ca: 0, ny: 0, tx: 0, ri: 0, total: 0 }
  );

  // Helper for finding top 2 in a column (for highlighting)
  const getTop2 = (vals) => vals.sort((a, b) => b - a).slice(0, 2);
  const topPA = getTop2(processedData.map((d) => d.pa));
  const topCA = getTop2(processedData.map((d) => d.ca));
  const topNY = getTop2(processedData.map((d) => d.ny));
  const topTX = getTop2(processedData.map((d) => d.tx));
  const topRI = getTop2(processedData.map((d) => d.ri));

  const renderCell = (val, topArr) => {
    if (val === 0) return <span className="text-slate-300">-</span>;
    const isTop = topArr.includes(val);
    return isTop ? (
      <GlassBadge type="success">${val.toLocaleString()}</GlassBadge>
    ) : (
      <span>${val.toLocaleString()}</span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Top Clients (Cross-Tab)
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
              <th className="px-6 py-4 sticky left-0 bg-[#030F1D] z-10 border-r border-white/10">
                Client
              </th>
              <th className="px-6 py-4 text-right">PA</th>
              <th className="px-6 py-4 text-right">CA</th>
              <th className="px-6 py-4 text-right">NY</th>
              <th className="px-6 py-4 text-right">TX</th>
              <th className="px-6 py-4 text-right">RI</th>
              <th className="px-6 py-4 text-right bg-slate-700">Grand Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {processedData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:text-slate-300"
              >
                <td className="px-6 py-3 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-800">
                  {row.client}
                </td>
                <td className="px-6 py-3 text-right">
                  {renderCell(row.pa, topPA)}
                </td>
                <td className="px-6 py-3 text-right">
                  {renderCell(row.ca, topCA)}
                </td>
                <td className="px-6 py-3 text-right">
                  {renderCell(row.ny, topNY)}
                </td>
                <td className="px-6 py-3 text-right">
                  {renderCell(row.tx, topTX)}
                </td>
                <td className="px-6 py-3 text-right">
                  {renderCell(row.ri, topRI)}
                </td>
                <td className="px-6 py-3 text-right font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">
                  ${row.total.toLocaleString()}
                </td>
              </tr>
            ))}
            {/* GRAND TOTAL ROW */}
            <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
              <td className="px-6 py-4 sticky left-0 bg-slate-100 dark:bg-slate-950 z-10 border-r border-slate-300 dark:border-slate-700">
                GRAND TOTAL
              </td>
              <td className="px-6 py-4 text-right">
                ${colTotals.pa.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                ${colTotals.ca.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                ${colTotals.ny.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                ${colTotals.tx.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                ${colTotals.ri.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right bg-slate-200 dark:bg-slate-900">
                ${colTotals.total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopClients;
