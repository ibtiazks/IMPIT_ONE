import React, { useState } from "react";
import { FileSpreadsheet, Eye, Edit2, X } from "lucide-react";

// --- MOCK DATA ---
const INITIAL_ORDERS = [
  {
    id: "WO-9921",
    status: "In Field",
    workType: "Preservation",
    contractor: "Jake Ross",
    client: "Client A",
    dateDue: "2025-11-30",
    clientDateDue: "2025-12-05",
    photos: 45,
    address: "123 Maple Ave",
    state: "TX",
    zip: "75001",
    dateReceived: "2025-11-20",
    rvm: "Sarah Jenkins",
    comment: "",
    rvmRemarks: "Initial inspection pending.",
    clientRemarks: "",
    rvmRemarks2: "",
  },
  {
    id: "WO-9922",
    status: "Ready for Office",
    workType: "Inspection",
    contractor: "Bruce Yasin",
    client: "Client B",
    dateDue: "2025-11-28",
    clientDateDue: "2025-12-01",
    photos: 12,
    address: "456 Oak Ln",
    state: "NY",
    zip: "10001",
    dateReceived: "2025-11-22",
    rvm: "Michael Chen",
    comment: "Ready for Office",
    rvmRemarks: "All good",
    clientRemarks: "Needs faster turnaround.",
    rvmRemarks2: "",
  },
];

const AVAILABLE_RVMS = [
  "Sarah Jenkins",
  "Michael Chen",
  "David Kim",
  "Emily Davis",
];

// --- HELPER FUNCTIONS ---
const calculateDuration = (dueDate) => {
  const today = new Date("2025-12-01"); // Fixed date for demo stability
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// --- COMPONENTS ---

const RVMGrid = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Filter States
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterRVM, setFilterRVM] = useState("All");

  // Popup States
  const [popupState, setPopupState] = useState({
    type: null, // 'remark' | 'rvm' | 'view'
    orderId: null,
    field: null,
    value: "",
    data: null, // For 'view' mode
  });

  // --- ACTIONS ---

  const handleActionChange = (id, field, value) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const openRemarkModal = (order, field) => {
    setPopupState({
      type: "remark",
      orderId: order.id,
      field: field,
      value: order[field] || "",
    });
  };

  const openRvmModal = (order) => {
    setPopupState({
      type: "rvm",
      orderId: order.id,
      field: "rvm",
      value: order.rvm,
    });
  };

  const openViewModal = (order) => {
    setPopupState({
      type: "view",
      data: order,
    });
  };

  const savePopup = () => {
    if (popupState.type !== "view") {
      handleActionChange(
        popupState.orderId,
        popupState.field,
        popupState.value
      );
    }
    setPopupState({
      type: null,
      orderId: null,
      field: null,
      value: "",
      data: null,
    });
  };

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesRVM = filterRVM === "All" || order.rvm === filterRVM;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "All Status" ? true : order.status === filterStatus);
    let matchesDate = true;
    if (filterStartDate && filterEndDate) {
      const orderDate = new Date(order.clientDateDue);
      const start = new Date(filterStartDate);
      const end = new Date(filterEndDate);
      matchesDate = orderDate >= start && orderDate <= end;
    }
    return matchesRVM && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Filters */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
            RVM Operations
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage field orders and vendor communications.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto flex-wrap">
          {/* Date Range */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-2 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Client Due:
            </span>
            <input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none w-24 sm:w-auto"
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="bg-transparent text-xs text-slate-600 dark:text-slate-300 outline-none w-24 sm:w-auto"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-orange-500 shadow-sm"
          >
            <option value="All">All Status</option>
            <option value="In Field">In Field</option>
            <option value="Ready for Office">Ready for Office</option>
          </select>

          {/* RVM Filter */}
          <select
            value={filterRVM}
            onChange={(e) => setFilterRVM(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 outline-none focus:border-orange-500 shadow-sm"
          >
            <option value="All">All RVMs</option>
            {AVAILABLE_RVMS.map((rvm) => (
              <option key={rvm} value={rvm}>
                {rvm}
              </option>
            ))}
          </select>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
            <FileSpreadsheet className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto pb-4">
        <table className="w-full text-left border-collapse min-w-[1800px]">
          <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3 sticky left-0 bg-slate-50 dark:bg-slate-950 z-20">
                WO#
              </th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Client Due</th>
              <th className="px-4 py-3 text-center">Days Left</th>
              <th className="px-4 py-3">RVM</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">RVM Remarks</th>
              <th className="px-4 py-3">Client Remarks</th>
              <th className="px-4 py-3">RVM Remarks (2nd)</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const daysLeft = calculateDuration(order.clientDateDue);
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 font-bold text-[#030F1D] dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-100 dark:border-slate-800">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {order.dateDue}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {order.clientDateDue}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`font-bold ${
                          daysLeft < 0 ? "text-red-500" : "text-emerald-500"
                        }`}
                      >
                        {daysLeft}d
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openRvmModal(order)}
                        className="text-xs font-bold text-orange-500 hover:underline flex items-center gap-1"
                      >
                        {order.rvm} <Edit2 className="w-3 h-3" />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs w-32 focus:border-orange-500 outline-none"
                        value={order.comment}
                        onChange={(e) =>
                          handleActionChange(
                            order.id,
                            "comment",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select...</option>
                        <option>Called (No Update)</option>
                        <option>No Show</option>
                        <option>Reassignment Req</option>
                        <option>Ready for Office</option>
                      </select>
                    </td>
                    {/* Remarks Columns - Click to Edit */}
                    {["rvmRemarks", "clientRemarks", "rvmRemarks2"].map(
                      (field) => (
                        <td key={field} className="px-4 py-3">
                          <button
                            onClick={() => openRemarkModal(order, field)}
                            className={`text-xs px-2 py-1 rounded border transition-colors max-w-[120px] truncate block ${
                              order[field]
                                ? field.includes("client")
                                  ? "bg-purple-50 border-purple-200 text-purple-700"
                                  : "bg-blue-50 border-blue-200 text-blue-700"
                                : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                            }`}
                          >
                            {order[field] || "Add..."}
                          </button>
                        </td>
                      )
                    )}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openViewModal(order)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white rounded transition-colors text-slate-500 flex items-center gap-1 mx-auto text-xs font-bold"
                      >
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 italic"
                >
                  No orders match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}

      {/* 1. EDIT REMARKS / ASSIGN RVM */}
      {popupState.type && popupState.type !== "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPopupState({ ...popupState, type: null })}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {popupState.type === "rvm" ? "Assign RVM" : "Update Remarks"}
            </h3>

            {popupState.type === "remark" && (
              <textarea
                className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:border-orange-500 outline-none text-sm"
                placeholder="Enter remarks here..."
                value={popupState.value}
                onChange={(e) =>
                  setPopupState({ ...popupState, value: e.target.value })
                }
              ></textarea>
            )}

            {popupState.type === "rvm" && (
              <div className="space-y-2">
                {AVAILABLE_RVMS.map((rvm) => (
                  <button
                    key={rvm}
                    onClick={() => setPopupState({ ...popupState, value: rvm })}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                      popupState.value === rvm
                        ? "bg-orange-50 border-orange-500 text-orange-700"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {rvm}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setPopupState({ ...popupState, type: null })}
                className="px-4 py-2 text-slate-500 hover:text-slate-700 font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={savePopup}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIEW DETAILS MODAL */}
      {popupState.type === "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPopupState({ ...popupState, type: null })}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
            <div className="bg-[#030F1D] p-6 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Work Order Details
                </h3>
                <p className="text-blue-200/60 text-sm">
                  ID: {popupState.data.id}
                </p>
              </div>
              <button
                onClick={() => setPopupState({ ...popupState, type: null })}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-orange-500 uppercase text-xs">
                    Order Info
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.status}
                    </span>
                    <span className="text-slate-500">Work Type:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.workType}
                    </span>
                    <span className="text-slate-500">Client:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.client}
                    </span>
                    <span className="text-slate-500">Contractor:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.contractor}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-orange-500 uppercase text-xs">
                    Location & Dates
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-slate-500">Address:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.address}
                    </span>
                    <span className="text-slate-500">State/Zip:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.state}, {popupState.data.zip}
                    </span>
                    <span className="text-slate-500">Received:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {popupState.data.dateReceived}
                    </span>
                    <span className="text-slate-500">Client Due:</span>
                    <span className="font-bold text-red-500">
                      {popupState.data.clientDateDue}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 space-y-4">
                  <h4 className="font-bold text-orange-500 uppercase text-xs">
                    Remarks & Notes
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <span className="block text-xs text-slate-400 font-bold uppercase mb-1">
                        RVM Remarks
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {popupState.data.rvmRemarks || "No remarks"}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <span className="block text-xs text-slate-400 font-bold uppercase mb-1">
                        Client Remarks
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {popupState.data.clientRemarks || "No remarks"}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <span className="block text-xs text-slate-400 font-bold uppercase mb-1">
                        RVM (2nd)
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {popupState.data.rvmRemarks2 || "No remarks"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setPopupState({ ...popupState, type: null })}
                className="px-6 py-2 bg-[#030F1D] dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RVMGrid;
