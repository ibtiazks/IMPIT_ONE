import React, { useState } from "react";
import {
  FileClock,
  Search,
  Filter,
  Eye,
  Download,
  ChevronRight,
  User,
  Shield,
  Clock,
  Activity,
  X,
  ArrowRight,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_LOGS = [
  {
    id: "LOG-9921",
    user: {
      name: "Md Nayeeb",
      role: "Super Admin",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
    },
    action: "UPDATE",
    module: "Role Permission",
    target: "Sarah Jenkins",
    description: "Updated permission set for Processing role",
    timestamp: "Jan 13, 2026 14:05:22",
    details: {
      changeType: "Permission Modification",
      previous: { accessLevel: "Read Only", module: "Financials" },
      new: { accessLevel: "Read/Write", module: "Financials" },
    },
  },
  {
    id: "LOG-9920",
    user: {
      name: "Mike Chen",
      role: "RVM",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
    },
    action: "CREATE",
    module: "RVM Orders",
    target: "WO-2026-885",
    description: "Created new RFO Work Order",
    timestamp: "Jan 13, 2026 13:45:10",
    details: {
      amount: "$4,500.00",
      state: "VA",
      contractor: "Pending Assignment",
    },
  },
  {
    id: "LOG-9919",
    user: {
      name: "Jessica Low",
      role: "Client Team",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
    },
    action: "GENERATE",
    module: "Invoice Generator",
    target: "INV-18312025",
    description: "Generated Deposit Invoice sent to client",
    timestamp: "Jan 13, 2026 11:20:05",
    details: {
      client: "René Khan",
      totalAmount: "$56,000.00",
      sentVia: "Email",
    },
  },
  {
    id: "LOG-9918",
    user: {
      name: "David Kim",
      role: "Admin",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
    },
    action: "DELETE",
    module: "Company Drive",
    target: "Old_Policy_v1.pdf",
    description: "Removed outdated documentation",
    timestamp: "Jan 12, 2026 16:15:00",
    details: {
      fileSize: "2.4 MB",
      path: "/SOPs & Guidelines/Archive",
    },
  },
  {
    id: "LOG-9917",
    user: {
      name: "Md Nayeeb",
      role: "Super Admin",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
    },
    action: "SECURITY",
    module: "Password Manager",
    target: "AWS Console",
    description: "Accessed credentials with 2FA code",
    timestamp: "Jan 12, 2026 09:30:45",
    details: {
      ipAddress: "192.168.1.1",
      device: "Chrome / Windows 11",
      status: "Success",
    },
  },
];

// --- COMPONENTS ---

const ActionBadge = ({ type }) => {
  const styles = {
    CREATE: "bg-emerald-100 text-emerald-700 border-emerald-200",
    UPDATE: "bg-blue-100 text-blue-700 border-blue-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
    GENERATE: "bg-purple-100 text-purple-700 border-purple-200",
    SECURITY: "bg-orange-100 text-orange-700 border-orange-200",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-bold border ${
        styles[type] || "bg-slate-100 text-slate-600"
      }`}
    >
      {type}
    </span>
  );
};

const LogDetailModal = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="bg-[#030F1D] p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Audit Details</h3>
              <p className="text-xs text-slate-400 font-mono">{log.id}</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            <img
              src={log.user.img}
              alt={log.user.name}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
            />
            <div>
              <p className="font-bold text-slate-800 dark:text-white">
                {log.user.name}
              </p>
              <p className="text-xs text-slate-500">{log.user.role}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs font-bold text-slate-500 flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3" /> Timestamp
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">
                {log.timestamp}
              </p>
            </div>
          </div>

          {/* Action Context */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-sm text-slate-500">Action Type</span>
              <ActionBadge type={log.action} />
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-sm text-slate-500">Module</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">
                {log.module}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-sm text-slate-500">Target Entity</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">
                {log.target}
              </span>
            </div>
          </div>

          {/* Change Data (JSON Visualization) */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">
              Change Payload
            </p>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner">
              <pre>{JSON.stringify(log.details, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = MOCK_LOGS.filter(
    (log) =>
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
            <FileClock className="w-6 h-6 text-orange-500" /> System Audit Log
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Track user activities, security events, and data changes.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* LOG TABLE */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Description</th>
                <th className="p-4">Target</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={log.user.img}
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                        alt="u"
                      />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">
                          {log.user.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {log.user.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <ActionBadge type={log.action} />
                  </td>
                  <td
                    className="p-4 text-slate-600 dark:text-slate-300 max-w-xs truncate"
                    title={log.description}
                  >
                    {log.description}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
                        {log.target}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500 text-xs font-mono">
                    {log.timestamp}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Mock */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Showing {filteredLogs.length} recent logs</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 border rounded hover:bg-slate-50 dark:hover:bg-slate-800">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
};

export default AuditLog;
