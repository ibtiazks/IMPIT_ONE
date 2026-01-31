import React, { useState, useMemo } from "react";
import {
  Plus,
  Download,
  Calendar,
  Activity,
  Save,
  Eye,
  Edit2,
  X,
} from "lucide-react";

// --- CREW PAYMENT RECORD ---
const CrewPaymentRecord = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      date: "2025-10-10",
      requestedBy: "Sarah Jenkins",
      wo: "WO-9921",
      amount: 450,
      contractor: "Apex Solutions",
      approvedBy: "Md Nayeeb",
      category: "Regular",
      remarks: "Paid to Crew",
      method: "Zelle",
      status: "Paid",
      ppw: "Updated",
    },
  ]);
  const [form, setForm] = useState({
    date: "",
    requestedBy: "Sarah Jenkins",
    wo: "",
    amount: "",
    contractor: "",
    approvedBy: "Md Nayeeb",
    category: "Regular",
    remarks: "Paid to Crew",
    method: "",
    status: "Unpaid",
    ppw: "Not Updated",
  });

  // Modal State
  const [modalMode, setModalMode] = useState(null); // 'view' | 'edit' | null
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleAdd = () => {
    if (!form.amount) return;
    setRecords([
      ...records,
      { ...form, id: Date.now(), amount: parseFloat(form.amount) },
    ]);
  };

  // Handle Direct Grid Updates (Status/PPW)
  const handleGridUpdate = (id, field, value) => {
    setRecords(
      records.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  // Handle Edit Save from Modal
  const handleSaveEdit = () => {
    setRecords(
      records.map((r) => (r.id === selectedRecord.id ? selectedRecord : r))
    );
    setModalMode(null);
    setSelectedRecord(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="date"
          className="input-field"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <select
          className="input-field"
          value={form.requestedBy}
          onChange={(e) => setForm({ ...form, requestedBy: e.target.value })}
        >
          <option>Sarah Jenkins</option>
          <option>Michael Chen</option>
        </select>
        <input
          type="text"
          placeholder="Work Order(s)"
          className="input-field"
          value={form.wo}
          onChange={(e) => setForm({ ...form, wo: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          className="input-field"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contractor Name"
          className="input-field"
          value={form.contractor}
          onChange={(e) => setForm({ ...form, contractor: e.target.value })}
        />
        <select
          className="input-field"
          value={form.approvedBy}
          onChange={(e) => setForm({ ...form, approvedBy: e.target.value })}
        >
          <option>Md Nayeeb</option>
          <option>Manager A</option>
        </select>
        <select
          className="input-field"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Regular</option>
          <option>Early</option>
          <option>Late</option>
        </select>
        <select
          className="input-field"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        >
          <option>Paid to Crew</option>
          <option>Paid to Contractor</option>
        </select>
        <input
          type="text"
          placeholder="Method"
          className="input-field"
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
        />
        <select
          className="input-field"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Paid</option>
          <option>Unpaid</option>
        </select>
        <select
          className="input-field"
          value={form.ppw}
          onChange={(e) => setForm({ ...form, ppw: e.target.value })}
        >
          <option>Updated</option>
          <option>Not Updated</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-orange-500 text-white rounded-lg font-bold"
        >
          Add
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <div className="p-4 flex justify-end">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Req By</th>
              <th className="px-4 py-3">WO</th>
              <th className="px-4 py-3">Contractor</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Remarks</th>
              <th className="px-4 py-3">Approved By</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">PPW</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {records.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-2 dark:text-white">{r.date}</td>
                <td className="px-4 py-2 dark:text-white">{r.requestedBy}</td>
                <td className="px-4 py-2 dark:text-slate-300 font-mono text-xs">
                  {r.wo}
                </td>
                <td className="px-4 py-2 dark:text-slate-300">
                  {r.contractor}
                </td>
                <td className="px-4 py-2 text-right font-bold text-slate-800 dark:text-white">
                  ${r.amount}
                </td>
                <td className="px-4 py-2 dark:text-slate-300">{r.method}</td>
                <td className="px-4 py-2 dark:text-slate-300">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                    {r.category}
                  </span>
                </td>
                <td className="px-4 py-2 dark:text-slate-300 italic">
                  {r.remarks}
                </td>
                <td className="px-4 py-2 dark:text-slate-300">
                  {r.approvedBy}
                </td>
                {/* Editable Status Dropdown */}
                <td className="px-4 py-2">
                  <select
                    value={r.status}
                    onChange={(e) =>
                      handleGridUpdate(r.id, "status", e.target.value)
                    }
                    className={`px-2 py-1 rounded text-xs font-bold border-none outline-none cursor-pointer ${
                      r.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </td>
                {/* Editable PPW Dropdown */}
                <td className="px-4 py-2">
                  <select
                    value={r.ppw}
                    onChange={(e) =>
                      handleGridUpdate(r.id, "ppw", e.target.value)
                    }
                    className={`px-2 py-1 rounded text-xs font-bold border-none outline-none cursor-pointer ${
                      r.ppw === "Updated"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <option value="Updated">Updated</option>
                    <option value="Not Updated">Not Updated</option>
                  </select>
                </td>
                {/* Action Buttons */}
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRecord(r);
                        setModalMode("view");
                      }}
                      className="text-slate-400 hover:text-blue-500"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRecord(r);
                        setModalMode("edit");
                      }}
                      className="text-slate-400 hover:text-orange-500"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View / Edit Modal */}
      {modalMode && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalMode(null)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#030F1D] p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {modalMode === "view" ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <Edit2 className="w-4 h-4" />
                )}
                {modalMode === "view" ? "Payment Details" : "Edit Payment"}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {modalMode === "view" ? (
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="label-text">Date</span>
                      <p className="value-text">{selectedRecord.date}</p>
                    </div>
                    <div>
                      <span className="label-text">Amount</span>
                      <p className="value-text font-bold text-emerald-600">
                        ${selectedRecord.amount}
                      </p>
                    </div>
                    <div>
                      <span className="label-text">Req By</span>
                      <p className="value-text">{selectedRecord.requestedBy}</p>
                    </div>
                    <div>
                      <span className="label-text">Approved By</span>
                      <p className="value-text">{selectedRecord.approvedBy}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="label-text">Work Orders</span>
                      <p className="value-text font-mono">
                        {selectedRecord.wo}
                      </p>
                    </div>
                    <div>
                      <span className="label-text">Contractor</span>
                      <p className="value-text">{selectedRecord.contractor}</p>
                    </div>
                    <div>
                      <span className="label-text">Method</span>
                      <p className="value-text">{selectedRecord.method}</p>
                    </div>
                    <div>
                      <span className="label-text">Status</span>
                      <span
                        className={`badge ${
                          selectedRecord.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div>
                      <span className="label-text">PPW</span>
                      <span
                        className={`badge ${
                          selectedRecord.ppw === "Updated"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {selectedRecord.ppw}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <span className="label-text">Remarks</span>
                    <p className="value-text italic">
                      {selectedRecord.remarks}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">Date</label>
                      <input
                        type="date"
                        className="modal-input"
                        value={selectedRecord.date}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="input-label">Amount</label>
                      <input
                        type="number"
                        className="modal-input"
                        value={selectedRecord.amount}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            amount: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="input-label">Work Orders</label>
                      <input
                        type="text"
                        className="modal-input"
                        value={selectedRecord.wo}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            wo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="input-label">Contractor</label>
                      <input
                        type="text"
                        className="modal-input"
                        value={selectedRecord.contractor}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            contractor: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="input-label">Method</label>
                      <input
                        type="text"
                        className="modal-input"
                        value={selectedRecord.method}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            method: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="input-label">Status</label>
                      <select
                        className="modal-input"
                        value={selectedRecord.status}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            status: e.target.value,
                          })
                        }
                      >
                        <option>Paid</option>
                        <option>Unpaid</option>
                      </select>
                    </div>
                    <div>
                      <label className="input-label">PPW</label>
                      <select
                        className="modal-input"
                        value={selectedRecord.ppw}
                        onChange={(e) =>
                          setSelectedRecord({
                            ...selectedRecord,
                            ppw: e.target.value,
                          })
                        }
                      >
                        <option>Updated</option>
                        <option>Not Updated</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-orange-500 text-white px-4 py-2 rounded font-bold hover:bg-orange-600 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- OPERATING DASHBOARD ---
const OperatingDashboard = () => {
  const data = [
    { month: "Jan", expense: 12000, received: 15000 },
    { month: "Feb", expense: 14000, received: 13500 },
    { month: "Mar", expense: 11000, received: 16000 },
  ];

  const totals = data.reduce(
    (acc, curr) => ({
      expense: acc.expense + curr.expense,
      received: acc.received + curr.received,
    }),
    { expense: 0, received: 0 }
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#030F1D] text-white uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Month</th>
            <th className="px-6 py-4 text-right">Expense</th>
            <th className="px-6 py-4 text-right">Received</th>
            <th className="px-6 py-4 text-right">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.map((d, i) => (
            <tr
              key={i}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="px-6 py-4 font-bold dark:text-white">{d.month}</td>
              <td className="px-6 py-4 text-right dark:text-slate-300">
                ${d.expense.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right dark:text-slate-300">
                ${d.received.toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 text-right font-bold ${
                  d.received - d.expense >= 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                ${(d.received - d.expense).toLocaleString()}
              </td>
            </tr>
          ))}
          {/* TOTAL ROW */}
          <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
            <td className="px-6 py-4 uppercase">Total</td>
            <td className="px-6 py-4 text-right">
              ${totals.expense.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-right">
              ${totals.received.toLocaleString()}
            </td>
            <td
              className={`px-6 py-4 text-right ${
                totals.received - totals.expense >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              ${(totals.received - totals.expense).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// --- EXPENSE SHEET ---
const ExpenseSheet = () => {
  // 1. Data State
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      item: "Office Rent",
      month: "2025-10",
      expected: 2000,
      actual: 2000,
    },
    {
      id: 2,
      item: "Server Costs",
      month: "2025-10",
      expected: 500,
      actual: 550,
    },
  ]);
  const [form, setForm] = useState({
    item: "",
    month: "",
    expected: "",
    actual: "",
  });

  // 2. Variable inputs for the Dashboard Logic
  const [finVars, setFinVars] = useState({
    received: 15000,
    salaryAdj: 8000,
    prevBalance: 5000,
    otherAdj: 200,
  });

  const handleAdd = () => {
    if (!form.item || !form.actual) return;
    setExpenses([
      ...expenses,
      {
        ...form,
        id: Date.now(),
        expected: parseFloat(form.expected) || 0,
        actual: parseFloat(form.actual) || 0,
      },
    ]);
    setForm({ item: "", month: "", expected: "", actual: "" });
  };

  // 3. Calculations
  const totalExpExpected = expenses.reduce(
    (acc, curr) => acc + curr.expected,
    0
  );
  const totalExpActual = expenses.reduce((acc, curr) => acc + curr.actual, 0);
  const totalDiff = totalExpExpected - totalExpActual;

  // Logic: Surplus = Received - Total Actual Cost
  const surplus = finVars.received - totalExpActual;

  // Logic: Final Balance = Surplus - Salary Adjustment + Previous Month Balance
  const finalBalance = surplus - finVars.salaryAdj + finVars.prevBalance;

  // Logic: Final Month End Balance = Final Balance - Other Adjustment
  const monthEndBalance = finalBalance - finVars.otherAdj;

  return (
    <div className="space-y-6">
      {/* Top Dashboard with Inputs */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">
          Financial Overview (Editable)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Total Operating Received
            </label>
            <input
              type="number"
              className="text-xl font-bold bg-transparent outline-none w-full text-emerald-600 border-b border-dashed border-slate-300"
              value={finVars.received}
              onChange={(e) =>
                setFinVars({
                  ...finVars,
                  received: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Total Op Cost (Actual)
            </label>
            <p className="text-xl font-bold text-slate-700 dark:text-white">
              ${totalExpActual.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Surplus / Deficit
            </label>
            <p
              className={`text-xl font-bold ${
                surplus >= 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              ${surplus.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Salary Adjustment (HR)
            </label>
            <input
              type="number"
              className="text-xl font-bold bg-transparent outline-none w-full text-blue-600 border-b border-dashed border-slate-300"
              value={finVars.salaryAdj}
              onChange={(e) =>
                setFinVars({
                  ...finVars,
                  salaryAdj: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Prev Month Balance
            </label>
            <input
              type="number"
              className="text-xl font-bold bg-transparent outline-none w-full text-purple-600 border-b border-dashed border-slate-300"
              value={finVars.prevBalance}
              onChange={(e) =>
                setFinVars({
                  ...finVars,
                  prevBalance: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Final Balance
            </label>
            <p className="text-xl font-bold text-slate-800 dark:text-white">
              ${finalBalance.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">
              Other Adjustment
            </label>
            <input
              type="number"
              className="text-xl font-bold bg-transparent outline-none w-full text-orange-600 border-b border-dashed border-slate-300"
              value={finVars.otherAdj}
              onChange={(e) =>
                setFinVars({
                  ...finVars,
                  otherAdj: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-1 bg-slate-200 dark:bg-slate-800 p-2 rounded">
            <label className="text-xs text-slate-500 font-bold uppercase">
              Month End Balance
            </label>
            <p
              className={`text-xl font-extrabold ${
                monthEndBalance >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              ${monthEndBalance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Input Row */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-slate-500">
            Item Description
          </label>
          <input
            type="text"
            className="input-field"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">Month</label>
          <input
            type="month"
            className="input-field"
            value={form.month}
            onChange={(e) => setForm({ ...form, month: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">Expected</label>
          <input
            type="number"
            className="input-field"
            value={form.expected}
            onChange={(e) => setForm({ ...form, expected: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500">Actual</label>
          <input
            type="number"
            className="input-field"
            value={form.actual}
            onChange={(e) => setForm({ ...form, actual: e.target.value })}
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-[#030F1D] text-white px-6 py-2 rounded-lg font-bold"
        >
          Add
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="p-4 flex justify-end">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500">
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3 text-right">Amount (Expected)</th>
              <th className="px-6 py-3 text-right">Amount (Actual)</th>
              <th className="px-6 py-3 text-right">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {expenses.map((e) => (
              <tr key={e.id}>
                <td className="px-6 py-3 dark:text-white">{e.item}</td>
                <td className="px-6 py-3 dark:text-slate-300">{e.month}</td>
                <td className="px-6 py-3 text-right dark:text-slate-300">
                  ${e.expected}
                </td>
                <td className="px-6 py-3 text-right dark:text-slate-300">
                  ${e.actual}
                </td>
                <td
                  className={`px-6 py-3 text-right font-bold ${
                    e.expected - e.actual >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  ${e.expected - e.actual}
                </td>
              </tr>
            ))}
            {/* TOTAL ROW */}
            <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
              <td className="px-6 py-4 uppercase" colSpan={2}>
                Total
              </td>
              <td className="px-6 py-4 text-right">
                ${totalExpExpected.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                ${totalExpActual.toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 text-right ${
                  totalDiff >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                ${totalDiff.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MAIN EXPORT ---
export const OperatingFinance = ({ activeTab }) => {
  return (
    <div className="animate-fade-in">
      {activeTab === "crew-payment" && <CrewPaymentRecord />}
      {activeTab === "operating-dash" && <OperatingDashboard />}
      {activeTab === "expense-sheet" && <ExpenseSheet />}

      <style>{`
                .input-field {
                    width: 100%;
                    padding: 8px 12px;
                    background-color: transparent;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    outline: none;
                }
                .dark .input-field {
                    border-color: #334155;
                    color: white;
                }
                .dark .input-field:focus {
                    border-color: #f97316;
                }
                .label-text { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
                .value-text { font-size: 0.875rem; color: #1e293b; }
                .dark .value-text { color: white; }
                .modal-input { width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: transparent; }
                .dark .modal-input { border-color: #475569; color: white; }
                .input-label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 4px; uppercase; }
                .badge { padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
            `}</style>
    </div>
  );
};
