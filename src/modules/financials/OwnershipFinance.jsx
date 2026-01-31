import React, { useState } from "react";
import { Plus, Download } from "lucide-react";

// --- CHAIRMAN SHARE ---
const ChairmanShare = () => {
  const [shares, setShares] = useState([
    {
      id: 1,
      month: "2025-10",
      usd: 1000,
      bdtConv: 120000,
      bdtShare: 50000,
      loan: 0,
      totalDue: 170000,
      received: "No",
      due: 170000,
    },
  ]);
  const [form, setForm] = useState({
    month: "",
    usd: "",
    bdtShare: "",
    loan: "",
    received: "No",
    due: "",
  });

  const handleAdd = () => {
    const bdtConv = (parseFloat(form.usd) || 0) * 120;
    const total =
      bdtConv + (parseFloat(form.bdtShare) || 0) + (parseFloat(form.loan) || 0);
    setShares([
      ...shares,
      {
        ...form,
        id: Date.now(),
        bdtConv,
        totalDue: total,
        due: parseFloat(form.due) || 0,
      },
    ]);
  };

  // Totals
  const totals = shares.reduce(
    (acc, s) => ({
      usd: acc.usd + parseFloat(s.usd || 0),
      bdtConv: acc.bdtConv + s.bdtConv,
      bdtShare: acc.bdtShare + parseFloat(s.bdtShare || 0),
      loan: acc.loan + parseFloat(s.loan || 0),
      totalDue: acc.totalDue + s.totalDue,
      due: acc.due + parseFloat(s.due || 0),
    }),
    { usd: 0, bdtConv: 0, bdtShare: 0, loan: 0, totalDue: 0, due: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs font-bold text-slate-500">Month</label>
          <input
            type="month"
            className="input-field w-32"
            onChange={(e) => setForm({ ...form, month: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">USD Amount</label>
          <input
            type="number"
            className="input-field w-32"
            onChange={(e) => setForm({ ...form, usd: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">BDT Share</label>
          <input
            type="number"
            className="input-field w-32"
            onChange={(e) => setForm({ ...form, bdtShare: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">Loan Share</label>
          <input
            type="number"
            className="input-field w-32"
            onChange={(e) => setForm({ ...form, loan: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">Received?</label>
          <select
            className="input-field w-32"
            onChange={(e) => setForm({ ...form, received: e.target.value })}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">Due Input</label>
          <input
            type="number"
            className="input-field w-32"
            onChange={(e) => setForm({ ...form, due: e.target.value })}
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3 text-right">Amount (USD)</th>
              <th className="px-4 py-3 text-right">BDT Conv (x120)</th>
              <th className="px-4 py-3 text-right">BDT Share</th>
              <th className="px-4 py-3 text-right">Loan Share</th>
              <th className="px-4 py-3 text-right">Total Due</th>
              <th className="px-4 py-3 text-center">Received</th>
              <th className="px-4 py-3 text-right">Due (Remaining)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {shares.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2 dark:text-white">{s.month}</td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  ${s.usd}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  ৳{s.bdtConv.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  ৳{s.bdtShare}
                </td>
                <td className="px-4 py-2 text-right dark:text-slate-300">
                  ৳{s.loan}
                </td>
                <td className="px-4 py-2 text-right font-bold text-blue-600">
                  ৳{s.totalDue.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      s.received === "Yes"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.received}
                  </span>
                </td>
                <td className="px-4 py-2 text-right font-bold text-red-500">
                  ৳{s.due}
                </td>
              </tr>
            ))}
            {/* TOTAL ROW */}
            <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
              <td className="px-4 py-3">TOTAL</td>
              <td className="px-4 py-3 text-right">${totals.usd}</td>
              <td className="px-4 py-3 text-right">
                ৳{totals.bdtConv.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                ৳{totals.bdtShare.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                ৳{totals.loan.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                ৳{totals.totalDue.toLocaleString()}
              </td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-right">
                ৳{totals.due.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- OWNER DUE ---
const OwnerDue = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between">
        <h3 className="font-bold text-slate-800 dark:text-white">
          Owners' Liabilities
        </h3>
        <button className="text-sm font-bold text-slate-500 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-[#030F1D] text-white uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-right">Rifat Saifur Tanvir</th>
            <th className="px-6 py-4 text-right">Ashraf Thanvi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            "Investment Due",
            "Previous Salary Due",
            "Loan Due",
            "Remuneration Due",
          ].map((cat) => (
            <tr key={cat}>
              <td className="px-6 py-4 font-bold dark:text-white">{cat}</td>
              <td className="px-6 py-4 text-right">
                <input
                  className="text-right bg-transparent outline-none w-full border-b border-transparent hover:border-slate-500 focus:border-orange-500"
                  placeholder="$0"
                />
              </td>
              <td className="px-6 py-4 text-right">
                <input
                  className="text-right bg-transparent outline-none w-full border-b border-transparent hover:border-slate-500 focus:border-orange-500"
                  placeholder="$0"
                />
              </td>
            </tr>
          ))}
          <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-800 dark:text-white">
            <td className="px-6 py-4">TOTAL</td>
            <td className="px-6 py-4 text-right">$0</td>
            <td className="px-6 py-4 text-right">$0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const OwnershipFinance = ({ activeTab }) => {
  return (
    <div className="animate-fade-in">
      {activeTab === "chairman-share" && <ChairmanShare />}
      {activeTab === "owner-due" && <OwnerDue />}
      <style>{`.input-field { padding: 8px; background: transparent; border: 1px solid #334155; border-radius: 6px; color: inherit; width: 100%; }`}</style>
    </div>
  );
};
