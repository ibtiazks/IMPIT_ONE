import React, { useState, useMemo } from "react";
import { Download, Calendar, Calculator } from "lucide-react";

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

// Generate Realistic Mock Data
const generateInitialData = () => {
  return CLIENTS.map((c) => {
    // Randomize costs to look realistic
    const cp1 = Math.floor(Math.random() * 3000) + 1000; // Main contractor payment
    const cp2 = Math.random() > 0.7 ? Math.floor(Math.random() * 800) : 0; // Occasional second payment
    const ppw = 150; // Standard cost
    const phone = 45; // Standard cost
    const transCost = 25; // Standard transaction fee
    const otherShared = 120; // Estimated shared cost portion

    // Random edge cases
    const prevDue = Math.random() > 0.85 ? Math.floor(Math.random() * 500) : 0;
    const prevOverpaid =
      Math.random() > 0.95 ? Math.floor(Math.random() * 200) : 0;

    const totalDue =
      cp1 +
      cp2 +
      ppw +
      phone +
      prevDue +
      transCost +
      otherShared -
      prevOverpaid;

    // Payment Scenarios:
    // 1. Fully Paid (Exact)
    // 2. Partial Payment (Due remains)
    // 3. Round Number Payment (Small due/overpaid)
    let transferred = totalDue;
    const scenario = Math.random();

    if (scenario > 0.8) {
      transferred = totalDue - 500; // Partial payment
    } else if (scenario > 0.9) {
      transferred = Math.ceil(totalDue / 100) * 100; // Paid round figure (likely overpaid)
    }

    return {
      company: c,
      cp1,
      cp2,
      ppw,
      phone,
      prevDue,
      transCost,
      otherShared,
      prevOverpaid,
      transferred: Math.round(transferred),
    };
  });
};

const TransferSummary = () => {
  const [data, setData] = useState(generateInitialData());

  // Dynamic Dashboard Calculations based on current Grid Data
  const dashboardStats = useMemo(() => {
    const totalShared = data.reduce(
      (acc, row) => acc + (row.otherShared || 0),
      0
    );
    const avgShared =
      data.length > 0 ? (totalShared / data.length).toFixed(2) : 0;
    return { totalShared, avgShared };
  }, [data]);

  const handleCellChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = parseFloat(value) || 0;
    setData(newData);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Summary Cards (Dynamic) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-purple-600 dark:text-purple-300 uppercase">
              Total Shared Cost
            </p>
            <p className="text-2xl font-extrabold text-purple-700 dark:text-purple-400">
              ${dashboardStats.totalShared.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-200 dark:bg-purple-800 p-2 rounded-full">
            <TagsIcon className="w-5 h-5 text-purple-700 dark:text-purple-300" />
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-300 uppercase">
              Avg Shared Cost / Company
            </p>
            <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">
              ${dashboardStats.avgShared}
            </p>
          </div>
          <div className="bg-blue-200 dark:bg-blue-800 p-2 rounded-full">
            <Calculator className="w-5 h-5 text-blue-700 dark:text-blue-300" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input
            type="month"
            className="bg-transparent text-sm outline-none dark:text-white"
            defaultValue="2025-10"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export Summary
        </button>
      </div>

      {/* Editable Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white text-xs uppercase font-bold">
            <tr>
              <th className="px-4 py-3 sticky left-0 bg-[#030F1D] z-10">
                Company
              </th>
              <th className="px-2 py-3 text-right">CP 1</th>
              <th className="px-2 py-3 text-right">CP 2</th>
              <th className="px-2 py-3 text-right">PPW</th>
              <th className="px-2 py-3 text-right">Phone</th>
              <th className="px-2 py-3 text-right">Prev Due</th>
              <th className="px-2 py-3 text-right">Trans Cost</th>
              <th className="px-2 py-3 text-right">Shared</th>
              <th className="px-2 py-3 text-right">Overpaid</th>
              <th className="px-4 py-3 text-right bg-orange-600">Total Due</th>
              <th className="px-2 py-3 text-right bg-slate-700">Transferred</th>
              <th className="px-4 py-3 text-right bg-slate-800">Due/Over</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {data.map((row, idx) => {
              const totalDue =
                row.cp1 +
                row.cp2 +
                row.ppw +
                row.phone +
                row.prevDue +
                row.transCost +
                row.otherShared -
                row.prevOverpaid;
              const finalBalance = totalDue - row.transferred;

              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-2 font-bold text-slate-800 dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-700">
                    {row.company}
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-16 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.cp1}
                      onChange={(e) =>
                        handleCellChange(idx, "cp1", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-16 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.cp2}
                      onChange={(e) =>
                        handleCellChange(idx, "cp2", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-14 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.ppw}
                      onChange={(e) =>
                        handleCellChange(idx, "ppw", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-14 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.phone}
                      onChange={(e) =>
                        handleCellChange(idx, "phone", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-16 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.prevDue}
                      onChange={(e) =>
                        handleCellChange(idx, "prevDue", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-14 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.transCost}
                      onChange={(e) =>
                        handleCellChange(idx, "transCost", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-14 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none dark:text-slate-300"
                      value={row.otherShared}
                      onChange={(e) =>
                        handleCellChange(idx, "otherShared", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-1 py-1">
                    <input
                      type="number"
                      className="w-14 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none text-red-500"
                      value={row.prevOverpaid}
                      onChange={(e) =>
                        handleCellChange(idx, "prevOverpaid", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-right font-bold text-slate-800 dark:text-white bg-orange-50 dark:bg-orange-900/10">
                    ${totalDue.toLocaleString()}
                  </td>

                  <td className="px-1 py-1 bg-slate-50 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      className="w-20 text-right bg-transparent font-bold text-blue-600 outline-none"
                      value={row.transferred}
                      onChange={(e) =>
                        handleCellChange(idx, "transferred", e.target.value)
                      }
                    />
                  </td>

                  <td
                    className={`px-4 py-2 text-right font-extrabold ${
                      finalBalance > 0
                        ? "text-red-500"
                        : finalBalance < 0
                        ? "text-blue-500"
                        : "text-emerald-500"
                    }`}
                  >
                    ${finalBalance.toLocaleString()}
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

// Helper Icon
const TagsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-5-5z" />
    <path d="M2 2l10 10" />
  </svg>
);

export default TransferSummary;
