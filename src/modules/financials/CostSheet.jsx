import React, { useState } from "react";
import { Plus, Download, Edit2, X, Save } from "lucide-react";

const COST_TYPES = [
  "Phone Service Cost",
  "General Liability Insurance",
  "Contractor Payment",
  "Operating Cost",
  "PPW Cost",
  "Auto Insurance",
  "Previous Due",
  "Workers Compensation Insurance",
  "Shared Company Cost",
  "Investment Withdrawal",
  "Back charges",
  "TC & Overdraft",
  "Others",
];

const MOCK_COSTS = [
  {
    id: 1,
    date: "2025-10-01",
    type: "PPW Cost",
    amount: 50,
    details: "Monthly sub",
    remarks: "-",
  },
  {
    id: 2,
    date: "2025-10-05",
    type: "Phone Service Cost",
    amount: 120,
    details: "RingCentral",
    remarks: "-",
  },
];

const CostSheet = () => {
  const [costs, setCosts] = useState(MOCK_COSTS);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    type: COST_TYPES[0],
    details: "",
    remarks: "",
  });
  const [editItem, setEditItem] = useState(null);

  const handleAdd = () => {
    if (!form.date || !form.amount) return;
    setCosts([
      ...costs,
      { ...form, id: Date.now(), amount: parseFloat(form.amount) },
    ]);
    setForm({
      date: "",
      amount: "",
      type: COST_TYPES[0],
      details: "",
      remarks: "",
    });
  };

  const handleUpdate = () => {
    setCosts(costs.map((c) => (c.id === editItem.id ? editItem : c)));
    setEditItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Form */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase">
          Add New Expense
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
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
              Cost Type
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {COST_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
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
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Details / Remarks
            </label>
            <input
              type="text"
              placeholder="Description..."
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
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

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-end">
          <button className="flex items-center gap-2 text-slate-500 hover:text-orange-500 text-sm font-bold">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {costs.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {c.date}
                </td>
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                  {c.type}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                  {c.details}
                </td>
                <td className="px-6 py-4 text-right font-mono font-medium text-slate-700 dark:text-slate-200">
                  ${c.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => setEditItem(c)}
                    className="text-slate-400 hover:text-orange-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditItem(null)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Edit Expense
              </h3>
              <button onClick={() => setEditItem(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Cost Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={editItem.type}
                  onChange={(e) =>
                    setEditItem({ ...editItem, type: e.target.value })
                  }
                >
                  {COST_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={editItem.amount}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Details
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={editItem.details}
                  onChange={(e) =>
                    setEditItem({ ...editItem, details: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-600 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostSheet;
