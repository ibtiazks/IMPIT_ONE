import React, { useState } from "react";
import {
  FileSpreadsheet,
  Eye,
  X,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";

// --- MOCK DATA ---
const INITIAL_ROWS = [
  {
    id: 1,
    wo: "WO-9955",
    type: "P&P",
    criteria: "Standard",
    status: "Open",
    address: "789 Pine St",
    state: "GA",
    zip: "30301",
    clientDue: "2025-11-30",
    analyst: null,
    dayProg: -30,
    analystStatus: "",
    instruction: "",
    baFrom: "",
    baBy: "-",
    bidCount: 2,
    bidAmount: "$450",
  },
  {
    id: 2,
    wo: "WO-9958",
    type: "Repair",
    criteria: "Urgent",
    status: "Processing",
    address: "101 River Rd",
    state: "NY",
    zip: "14623",
    clientDue: "2025-11-25",
    analyst: "Emily Davis",
    dayProg: -35,
    analystStatus: "Reviewing",
    instruction: "Must Bid",
    baFrom: "John Doe",
    baBy: "Emily Davis",
    bidCount: 5,
    bidAmount: "$1250",
  },
];

const AVAILABLE_ANALYSTS = [
  "Sarah Jenkins",
  "Michael Chen",
  "David Kim",
  "Emily Davis",
  "James Wilson",
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Open: "bg-slate-100 text-slate-600",
    Processing: "bg-blue-50 text-blue-600",
    Completed: "bg-emerald-50 text-emerald-600",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-bold ${
        styles[status] || styles.Open
      }`}
    >
      {status}
    </span>
  );
};

const ProgStatusBadge = ({ days }) => {
  let label = "ON TIME";
  let style = "bg-emerald-100 text-emerald-700";

  if (days < -20) {
    label = "SUPER LATE";
    style = "bg-red-100 text-red-600 border border-red-200";
  } else if (days < 0) {
    label = "LATE";
    style = "bg-amber-100 text-amber-700";
  }

  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase ${style}`}
    >
      {label}
    </span>
  );
};

const ProcessingSheet = () => {
  const [rows, setRows] = useState(INITIAL_ROWS);

  // Filters
  const [filterDateStart, setFilterDateStart] = useState("");
  const [filterDateEnd, setFilterDateEnd] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterAnalyst, setFilterAnalyst] = useState("All Analysts");

  // Popup State
  const [popupState, setPopupState] = useState({
    type: null, // 'assign' | 'view'
    rowId: null,
    field: null, // 'analyst' | 'baFrom' | 'baBy'
    value: "",
    data: null,
  });

  // --- ACTIONS ---

  const handleRowChange = (id, field, value) => {
    setRows((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const openAssignModal = (row, field) => {
    setPopupState({
      type: "assign",
      rowId: row.id,
      field: field,
      value: row[field] === "-" ? "" : row[field],
    });
  };

  const confirmAssignment = () => {
    // 1. Update the field being edited (Analyst, BA From, or BA By)
    handleRowChange(popupState.rowId, popupState.field, popupState.value);

    // 2. Logic: If we are assigning an Analyst, auto-fill 'BA By' with the same name
    if (popupState.field === "analyst") {
      handleRowChange(popupState.rowId, "baBy", popupState.value);
    }

    setPopupState({
      type: null,
      rowId: null,
      field: null,
      value: "",
      data: null,
    });
  };

  const openViewModal = (row) => {
    setPopupState({ type: "view", data: row });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
          Processing Sheet
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Work order processing queue and bid management.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row justify-end items-center gap-3">
        {/* Date Range */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 shadow-sm w-full lg:w-auto">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2">
            DUE:
          </span>
          <input
            type="date"
            className="bg-transparent text-sm outline-none text-slate-600 dark:text-slate-300 w-28"
          />
          <span className="text-slate-400">-</span>
          <input
            type="date"
            className="bg-transparent text-sm outline-none text-slate-600 dark:text-slate-300 w-28"
          />
        </div>

        {/* Dropdowns */}
        <select className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-orange-500 shadow-sm w-full lg:w-40">
          <option>All Status</option>
          <option>Open</option>
          <option>Processing</option>
        </select>

        <select className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-orange-500 shadow-sm w-full lg:w-40">
          <option>All Analysts</option>
          {AVAILABLE_ANALYSTS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-colors whitespace-nowrap w-full lg:w-auto">
          <FileSpreadsheet className="w-4 h-4" /> Export Excel
        </button>
      </div>

      {/* Data Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-4 py-4 sticky left-0 bg-slate-50 dark:bg-slate-950 z-10">
                  WO#
                </th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Criteria</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Address</th>
                <th className="px-4 py-4">State</th>
                <th className="px-4 py-4">Due</th>
                <th className="px-4 py-4">Analyst</th>
                <th className="px-4 py-4 text-center">Day Prog</th>
                <th className="px-4 py-4 text-center">Prog Status</th>
                <th className="px-4 py-4">Analyst Status</th>
                <th className="px-4 py-4">Instruction</th>
                <th className="px-4 py-4">BA From</th>
                <th className="px-4 py-4">BA By</th>
                <th className="px-4 py-4 text-center">Bids</th>
                <th className="px-4 py-4 text-right">Bid Amt</th>
                <th className="px-4 py-4 text-center sticky right-0 bg-slate-50 dark:bg-slate-950 z-10">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 font-bold text-[#030F1D] dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-100 dark:border-slate-800">
                    {row.wo}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.criteria}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[150px] truncate"
                    title={row.address}
                  >
                    {row.address}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.state}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.clientDue}
                  </td>

                  {/* Analyst Assignment */}
                  <td className="px-4 py-3">
                    {row.analyst ? (
                      <button
                        onClick={() => openAssignModal(row, "analyst")}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-bold hover:bg-purple-200 transition-colors"
                      >
                        {row.analyst}
                      </button>
                    ) : (
                      <button
                        onClick={() => openAssignModal(row, "analyst")}
                        className="bg-slate-200 text-slate-500 px-3 py-1 rounded text-xs font-bold hover:bg-slate-300 transition-colors uppercase tracking-wider blur-[0.5px] hover:blur-none"
                      >
                        Assign
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-bold px-2 py-1 rounded text-white text-xs ${
                        row.dayProg < 0 ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    >
                      {row.dayProg}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ProgStatusBadge days={row.dayProg} />
                  </td>

                  {/* Dropdowns */}
                  <td className="px-4 py-3">
                    <select
                      className="bg-transparent border-b border-slate-200 dark:border-slate-700 w-32 text-xs outline-none focus:border-orange-500 py-1"
                      value={row.analystStatus}
                      onChange={(e) =>
                        handleRowChange(row.id, "analystStatus", e.target.value)
                      }
                    >
                      <option value="">Select...</option>
                      <option>Reviewing</option>
                      <option>Submitted</option>
                      <option>Clarification</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="bg-transparent border-b border-slate-200 dark:border-slate-700 w-28 text-xs outline-none focus:border-orange-500 py-1"
                      value={row.instruction}
                      onChange={(e) =>
                        handleRowChange(row.id, "instruction", e.target.value)
                      }
                    >
                      <option value="">Select...</option>
                      <option>Must Bid</option>
                      <option>Approval</option>
                    </select>
                  </td>

                  {/* BA From - Editable */}
                  <td className="px-4 py-3">
                    {row.baFrom ? (
                      <button
                        onClick={() => openAssignModal(row, "baFrom")}
                        className="text-slate-700 dark:text-slate-200 font-medium hover:text-orange-500 hover:underline text-left"
                      >
                        {row.baFrom}
                      </button>
                    ) : (
                      <button
                        onClick={() => openAssignModal(row, "baFrom")}
                        className="text-orange-500 text-xs font-bold hover:underline"
                      >
                        Select
                      </button>
                    )}
                  </td>

                  {/* BA By - Editable (But pre-fills with Analyst) */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openAssignModal(row, "baBy")}
                      className={`text-sm hover:text-orange-500 hover:underline ${
                        row.baBy === "-"
                          ? "text-slate-400"
                          : "text-slate-500 dark:text-slate-300"
                      }`}
                    >
                      {row.baBy}
                    </button>
                  </td>

                  <td className="px-4 py-3 text-center">{row.bidCount}</td>

                  {/* Bid Amount - Editable Input */}
                  <td className="px-4 py-3 text-right">
                    <input
                      type="text"
                      value={row.bidAmount}
                      onChange={(e) =>
                        handleRowChange(row.id, "bidAmount", e.target.value)
                      }
                      className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 w-20 text-right font-mono font-bold text-slate-700 dark:text-slate-200 outline-none transition-colors"
                    />
                  </td>

                  <td className="px-4 py-3 text-center sticky right-0 bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 z-10 shadow-[-4px_0_12px_rgba(0,0,0,0.05)]">
                    <button
                      onClick={() => openViewModal(row)}
                      className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white hover:bg-orange-500 rounded flex items-center gap-1 text-xs font-bold mx-auto transition-colors"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Assignment Modal */}
      {popupState.type === "assign" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPopupState({ ...popupState, type: null })}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {popupState.field === "analyst"
                ? "Assign Analyst"
                : popupState.field === "baFrom"
                ? "Select BA From"
                : "Edit BA By"}
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {AVAILABLE_ANALYSTS.map((name) => (
                <button
                  key={name}
                  onClick={() => setPopupState({ ...popupState, value: name })}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    popupState.value === name
                      ? "bg-orange-50 border-orange-500 text-orange-700"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setPopupState({ ...popupState, type: null })}
                className="px-4 py-2 text-slate-500 hover:text-slate-700 font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssignment}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Detail View Modal */}
      {popupState.type === "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPopupState({ ...popupState, type: null })}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#030F1D] p-6 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Work Order Details
                </h3>
                <p className="text-blue-200/60 text-sm">
                  WO #: {popupState.data.wo}
                </p>
              </div>
              <button
                onClick={() => setPopupState({ ...popupState, type: null })}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-orange-500 uppercase mb-4">
                    Basic Info
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status:</span>{" "}
                      <span className="font-medium dark:text-white">
                        {popupState.data.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type:</span>{" "}
                      <span className="font-medium dark:text-white">
                        {popupState.data.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Criteria:</span>{" "}
                      <span className="font-medium dark:text-white">
                        {popupState.data.criteria}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Due Date:</span>{" "}
                      <span className="font-bold text-red-500">
                        {popupState.data.clientDue}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-orange-500 uppercase mb-4">
                    Location
                  </h4>
                  <p className="text-sm text-slate-800 dark:text-white font-medium">
                    {popupState.data.address}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Fulton, {popupState.data.state} {popupState.data.zip}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <h4 className="text-xs font-bold text-orange-500 uppercase mb-4">
                  Analysis & Bids
                </h4>
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      Analyst Status
                    </p>
                    <p className="font-medium mt-1 dark:text-white">
                      {popupState.data.analystStatus || "Pending"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      Instruction
                    </p>
                    <p className="font-medium mt-1 dark:text-white">
                      {popupState.data.instruction || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      Bid Amount
                    </p>
                    <p className="font-bold text-emerald-500 mt-1">
                      {popupState.data.bidAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      Assigned Analyst
                    </p>
                    <p className="font-medium mt-1 dark:text-white">
                      {popupState.data.analyst || "Unassigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      BA From
                    </p>
                    <p className="font-medium mt-1 dark:text-white">
                      {popupState.data.baFrom || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      BA By
                    </p>
                    <p className="font-medium mt-1 dark:text-white">
                      {popupState.data.baBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setPopupState({ ...popupState, type: null })}
                className="px-6 py-2 bg-[#030F1D] dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingSheet;
