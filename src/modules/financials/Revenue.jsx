import React, { useState } from "react";
import { Download, Calendar, X } from "lucide-react";

const MOCK_REVENUE = [
  {
    id: 1,
    date: "2025-10-15",
    client: "Cyprexx",
    amount: 600,
    wo: "WO-1001",
    ppwAmount: 600,
    status: "Updated",
    bank: "Checked",
    batches: [
      { id: "B1", amt: 400, date: "2025-10-10" },
      { id: "B2", amt: 200, date: "2025-10-15" },
    ],
  },
  {
    id: 2,
    date: "2025-10-18",
    client: "MCS",
    amount: 1100,
    wo: "WO-1002",
    ppwAmount: 1100,
    status: "Not Updated",
    bank: "Not Checked",
    batches: [{ id: "B3", amt: 1100, date: "2025-10-18" }],
  },
];

const Revenue = () => {
  const [data, setData] = useState(MOCK_REVENUE);
  const [selectedBatches, setSelectedBatches] = useState(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="month"
              className="bg-transparent text-sm outline-none dark:text-white"
              defaultValue="2025-10"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3">Payment Date</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">WO#</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">PPW Amount</th>
              <th className="px-4 py-3">PPW Status</th>
              <th className="px-4 py-3">Bank Statement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {data.map((row, idx) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {row.date}
                </td>
                <td className="px-4 py-3 font-bold text-slate-800 dark:text-white">
                  {row.client}
                </td>
                <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                  {row.wo}
                </td>
                <td className="px-4 py-3 text-right font-medium text-emerald-600">
                  ${row.amount}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedBatches(row.batches)}
                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline border-b border-dashed border-blue-300"
                  >
                    ${row.ppwAmount}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <select
                    className="bg-transparent border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs dark:text-white dark:bg-slate-800"
                    value={row.status}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[idx].status = e.target.value;
                      setData(newData);
                    }}
                  >
                    <option>Updated</option>
                    <option>Not Updated</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    className="bg-transparent border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs dark:text-white dark:bg-slate-800"
                    value={row.bank}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[idx].bank = e.target.value;
                      setData(newData);
                    }}
                  >
                    <option>Checked</option>
                    <option>Not Checked</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Batch Modal */}
      {selectedBatches && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBatches(null)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-[#030F1D] p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Payment Batches</h3>
              <button
                onClick={() => setSelectedBatches(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase border-b dark:border-slate-800">
                  <tr>
                    <th className="py-2">Batch ID</th>
                    <th className="py-2">Date</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedBatches.map((b, i) => (
                    <tr key={i}>
                      <td className="py-2 font-mono dark:text-slate-300">
                        {b.id}
                      </td>
                      <td className="py-2 text-slate-600 dark:text-slate-400">
                        {b.date}
                      </td>
                      <td className="py-2 text-right font-bold text-emerald-600">
                        ${b.amt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue;
