import React, { useState, useMemo } from "react";
import {
  UploadCloud,
  Calendar,
  FileSpreadsheet,
  Eye,
  Search,
  ListFilter,
  X,
  Clock,
  History,
  CheckCircle,
  FileText,
  ChevronDown,
} from "lucide-react";

// --- MOCK DATA WITH VERSIONS ---
// Simulating two different uploads on the same day to test versioning
const MOCK_DB_DATA = [
  // BATCH 1: Uploaded at 09:00 AM
  {
    id: 1,
    batchId: "batch_01",
    uploadTime: "09:00 AM",
    status: "Unassigned",
    ppw: "13459",
    wo: "359846",
    category: "Client 16",
    received: "2025-12-30",
    due: "2026-04-30",
    loan: "4669-461-410",
    type: "FHA TX-16",
    address: "11013 33Rd Avenue North",
    city: "Texas City",
    state: "TX",
    zip: "77591",
    client: "Client A",
    invoice: "$1607",
    contractor: "Jake Ross",
    admin: "Admin User",
  },
  {
    id: 2,
    batchId: "batch_01",
    uploadTime: "09:00 AM",
    status: "In Field",
    ppw: "13468",
    wo: "4814455-1",
    category: "Client 1",
    received: "2025-12-30",
    due: "2026-04-07",
    loan: "21104740",
    type: "M&T Bank",
    address: "329 KNAPP AVENUE",
    city: "Rochester",
    state: "NY",
    zip: "14609",
    client: "Client B",
    invoice: "$103",
    contractor: "Bruce Yasin",
    admin: "Admin User",
  },
  // BATCH 2: Uploaded at 02:00 PM (Updates WO 359846, Adds new WO)
  {
    id: 3,
    batchId: "batch_02",
    uploadTime: "02:00 PM",
    status: "Ready for Office", // STATUS CHANGED in newer version
    ppw: "13459",
    wo: "359846", // SAME WO as ID 1
    category: "Client 16",
    received: "2025-12-30",
    due: "2026-04-30",
    loan: "4669-461-410",
    type: "FHA TX-16",
    address: "11013 33Rd Avenue North",
    city: "Texas City",
    state: "TX",
    zip: "77591",
    client: "Client A",
    invoice: "$1607",
    contractor: "Jake Ross",
    admin: "Admin User",
  },
  {
    id: 4,
    batchId: "batch_02",
    uploadTime: "02:00 PM",
    status: "Unassigned",
    ppw: "13499",
    wo: "998877", // NEW WO
    category: "Client 4",
    received: "2025-12-30",
    due: "2026-05-01",
    loan: "9988-111",
    type: "FNMA",
    address: "500 Ocean Dr",
    city: "Miami",
    state: "FL",
    zip: "33101",
    client: "Client C",
    invoice: "$500",
    contractor: "Pending",
    admin: "Admin User",
  },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Unassigned:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    "In Field":
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Ready for Office":
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Completed:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
        styles[status] || styles["Unassigned"]
      }`}
    >
      {status}
    </span>
  );
};

const DetailModal = ({ data, onClose }) => {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#030F1D] p-6 flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                WO Details
              </span>
              <span className="text-blue-200 text-xs font-mono">
                {data.batchId}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              #{data.wo} <span className="text-white/40 font-normal">|</span>{" "}
              {data.ppw}
            </h3>
            <p className="text-white/60 text-sm mt-1">
              {data.address}, {data.city}, {data.state} {data.zip}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                Order Info
              </h4>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-slate-500">Status:</span>
                <StatusBadge status={data.status} />

                <span className="text-slate-500">Client:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {data.client}
                </span>

                <span className="text-slate-500">Loan Type:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {data.type}
                </span>

                <span className="text-slate-500">Loan #:</span>
                <span className="font-mono text-slate-600 dark:text-slate-300">
                  {data.loan}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                Dates & Admin
              </h4>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-slate-500">Received:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {data.received}
                </span>

                <span className="text-slate-500">Due Date:</span>
                <span className="font-bold text-red-500">{data.due}</span>

                <span className="text-slate-500">Admin:</span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {data.admin}
                </span>

                <span className="text-slate-500">Invoice:</span>
                <span className="font-bold text-emerald-600">
                  {data.invoice}
                </span>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                Field Assignment
              </h4>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Assigned To
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {data.contractor}
                    </p>
                  </div>
                </div>
                <button className="text-xs text-orange-500 font-bold hover:underline">
                  Reassign
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">
            Data Version: {data.uploadTime}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DataIngestion = () => {
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' | 'view'
  const [viewState, setViewState] = useState("select-date"); // 'select-date' | 'grid'
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("latest"); // 'latest' | batchId
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingRow, setViewingRow] = useState(null);

  // --- LOGIC: Handle Data Processing ---
  // 1. Filter by Date
  // 2. Filter by Version (if 'latest', deduplicate by WO keeping the newest upload)
  const processedData = useMemo(() => {
    if (!selectedDate) return [];

    // Step 1: Filter by Date (Simulated using the string match for mock data)
    let data = MOCK_DB_DATA.filter((row) => row.received === selectedDate);

    // Step 2: Handle Versions
    if (selectedVersion === "latest") {
      // Group by WO and take the one with highest ID (simulating latest)
      const map = new Map();
      data.forEach((item) => {
        // Logic: If WO exists, overwrite it (assuming array is sorted by time, or ID implies order)
        // In a real app, you'd compare timestamps. Here ID 3 > ID 1.
        map.set(item.wo, item);
      });
      return Array.from(map.values());
    } else {
      // Filter by specific batch ID
      return data.filter((row) => row.batchId === selectedVersion);
    }
  }, [selectedDate, selectedVersion]);

  // Step 3: Search Filter
  const finalData = processedData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = [
    { key: "status", label: "Status" },
    { key: "ppw", label: "PPW #" },
    { key: "wo", label: "WO #" },
    { key: "category", label: "Category" },
    { key: "received", label: "Received" },
    { key: "due", label: "Due" },
    { key: "loan", label: "Loan #" },
    { key: "type", label: "Type" },
    { key: "admin", label: "Admin" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "zip", label: "Zip" },
    { key: "client", label: "Client" },
    { key: "invoice", label: "Invoice" },
    { key: "contractor", label: "Contractor" },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white tracking-tight">
            Data Ingestion
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Upload and manage operational data from PPW.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex shadow-sm">
          <button
            onClick={() => {
              setActiveTab("upload");
              setViewState("select-date");
            }}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "upload"
                ? "bg-orange-500 text-white shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            Upload Data
          </button>
          <button
            onClick={() => {
              setActiveTab("view");
            }}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "view"
                ? "bg-orange-500 text-white shadow-md"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            View Data
          </button>
        </div>
      </div>

      {/* --- 1. UPLOAD VIEW --- */}
      {activeTab === "upload" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 flex flex-col items-center justify-center min-h-[500px] animate-fade-in transition-colors">
          <div className="w-full max-w-lg space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Select Data Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group bg-slate-50/30 dark:bg-slate-900/30">
              <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <FileSpreadsheet className="w-10 h-10 text-orange-500" />
              </div>
              <p className="text-xl font-bold text-slate-700 dark:text-slate-200">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Excel (XLSX) or CSV files only
              </p>
            </div>

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <UploadCloud className="w-6 h-6" /> Process File
            </button>
          </div>
        </div>
      )}

      {/* --- 2. VIEW DATA: SELECT DATE --- */}
      {activeTab === "view" && viewState === "select-date" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 flex flex-col items-center justify-center min-h-[500px] animate-fade-in transition-colors">
          <div className="w-full max-w-md text-center space-y-8">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Calendar className="w-12 h-12 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#030F1D] dark:text-white mb-3">
                Select Date to Load Data
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Please choose a specific date to view the ingested operational
                data.
              </p>
            </div>
            <div className="relative text-left">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block ml-1">
                Data Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-medium text-lg"
                />
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <button
              onClick={() => {
                if (selectedDate) setViewState("grid");
                else alert("Please select a date (try Dec 30, 2025)");
              }}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                selectedDate
                  ? "bg-[#030F1D] dark:bg-white text-white dark:text-[#030F1D] hover:opacity-90 shadow-lg hover:-translate-y-0.5"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              }`}
              disabled={!selectedDate}
            >
              <Eye className="w-5 h-5" /> Load Data Grid
            </button>
          </div>
        </div>
      )}

      {/* --- 3. VIEW DATA: DATA GRID --- */}
      {activeTab === "view" && viewState === "grid" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in flex flex-col h-[700px] transition-colors relative">
          {/* Grid Toolbar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50 dark:bg-slate-950">
            <div className="flex flex-wrap items-center gap-4">
              {/* Date Display & Change */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-[#030F1D] dark:text-white">
                  {selectedDate}
                </span>
                <button
                  onClick={() => setViewState("select-date")}
                  className="ml-2 text-xs text-slate-400 hover:text-orange-500 underline"
                >
                  Change
                </button>
              </div>

              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden lg:block"></div>

              {/* Version Controller */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm group relative cursor-pointer">
                  <History className="w-4 h-4 text-blue-500" />
                  <select
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-6 z-10"
                  >
                    <option value="latest">Latest (Merged)</option>
                    <option value="batch_02">Batch 02 (02:00 PM)</option>
                    <option value="batch_01">Batch 01 (09:00 AM)</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
                </div>
                {selectedVersion !== "latest" && (
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded animate-pulse">
                    Viewing Historic Version
                  </span>
                )}
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full lg:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-orange-500 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-left border-collapse min-w-[2000px]">
              <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 z-10 shadow-sm">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  ))}
                  {/* Action Column Header */}
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 text-center bg-slate-100 dark:bg-slate-800 sticky right-0 z-20 shadow-[-4px_0_12px_rgba(0,0,0,0.05)] w-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {finalData.length > 0 ? (
                  finalData.map((row) => (
                    <tr
                      key={`${row.id}-${row.batchId}`}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-4 py-3 text-sm whitespace-nowrap ${
                            col.key === "wo" || col.key === "ppw"
                              ? "font-bold text-[#030F1D] dark:text-white"
                              : col.key === "invoice"
                              ? "font-mono font-semibold text-slate-700 dark:text-slate-300"
                              : "text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {col.key === "status" ? (
                            <StatusBadge status={row[col.key]} />
                          ) : (
                            row[col.key]
                          )}
                        </td>
                      ))}
                      {/* Action Column Cell */}
                      <td className="px-4 py-3 sticky right-0 bg-white dark:bg-slate-900 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 border-l border-slate-100 dark:border-slate-800 z-10 text-center shadow-[-4px_0_12px_rgba(0,0,0,0.05)]">
                        <button
                          onClick={() => setViewingRow(row)}
                          className="p-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 italic bg-slate-50/30 dark:bg-slate-900"
                    >
                      No records found for the selected date or version.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>Showing {finalData.length} records</span>
            <span>
              Current View:{" "}
              {selectedVersion === "latest"
                ? "Merged View"
                : `Historic (${selectedVersion})`}
            </span>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      <DetailModal data={viewingRow} onClose={() => setViewingRow(null)} />
    </div>
  );
};

export default DataIngestion;
