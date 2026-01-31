import React, { useState } from "react";
import { Plus, Download, Calendar, ArrowRightLeft } from "lucide-react";

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

const MOCK_TRANSFERS = [
  {
    id: 1,
    date: "2025-10-05",
    amount: 5000,
    paidBy: "Cyprexx",
    notes: "Advance payment for Nov",
  },
  {
    id: 2,
    date: "2025-10-12",
    amount: 1200,
    paidBy: "MCS",
    notes: "Settlement for Batch #99",
  },
];

const TransferLedger = () => {
  const [transfers, setTransfers] = useState(MOCK_TRANSFERS);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    paidBy: CLIENTS[0],
    notes: "",
  });

  const handleAdd = () => {
    if (!form.date || !form.amount) return;
    setTransfers([
      ...transfers,
      { ...form, id: Date.now(), amount: parseFloat(form.amount) },
    ]);
    setForm({ date: "", amount: "", paidBy: CLIENTS[0], notes: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-orange-500" /> New Transfer
          Entry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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
              Paid By (Client)
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.paidBy}
              onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
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
              Notes
            </label>
            <input
              type="text"
              placeholder="Remarks..."
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
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
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Paid By</th>
              <th className="px-6 py-4">Notes</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {transfers.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {t.date}
                </td>
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                  {t.paidBy}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 italic">
                  {t.notes || "-"}
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">
                  ${t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferLedger;
