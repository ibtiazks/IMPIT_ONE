import React, { useState } from "react";
import { Plus, Download, Calendar, Tags } from "lucide-react";

const CLIENTS = [
  "Shared", // Special option
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

const MOCK_OTHER_COSTS = [
  {
    id: 1,
    purpose: "Office Rent Share",
    amount: 2000,
    usedBy: "Shared",
    paidBy: "Cyprexx",
  },
  {
    id: 2,
    purpose: "Specific Software License",
    amount: 150,
    usedBy: "MCS",
    paidBy: "MCS",
  },
];

const OtherCostLedger = () => {
  const [costs, setCosts] = useState(MOCK_OTHER_COSTS);
  const [form, setForm] = useState({
    purpose: "",
    amount: "",
    usedBy: "Shared",
    paidBy: "Cyprexx",
  });

  const handleAdd = () => {
    if (!form.purpose || !form.amount) return;
    setCosts([
      ...costs,
      { ...form, id: Date.now(), amount: parseFloat(form.amount) },
    ]);
    setForm({ purpose: "", amount: "", usedBy: "Shared", paidBy: "Cyprexx" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase flex items-center gap-2">
          <Tags className="w-4 h-4 text-orange-500" /> Other Cost Entry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Purpose
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="$"
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Used By
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.usedBy}
              onChange={(e) => setForm({ ...form, usedBy: e.target.value })}
            >
              {CLIENTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Paid By
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.paidBy}
              onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
            >
              {CLIENTS.filter((c) => c !== "Shared").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[#030F1D] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 flex justify-center items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Toolbar & Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="month"
              className="bg-transparent text-sm outline-none dark:text-white"
              defaultValue="2025-10"
            />
          </div>
          <button className="flex items-center gap-2 text-slate-500 hover:text-orange-500 text-sm font-bold">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Purpose</th>
              <th className="px-6 py-4">Used By</th>
              <th className="px-6 py-4">Paid By</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {costs.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                  {c.purpose}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      c.usedBy === "Shared"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {c.usedBy}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {c.paidBy}
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-slate-700 dark:text-slate-200">
                  ${c.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtherCostLedger;
