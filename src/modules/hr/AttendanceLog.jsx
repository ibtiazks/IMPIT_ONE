import React, { useState } from "react";
import { Calendar, Search, Filter, Clock } from "lucide-react";

// Mock Data for display
const MOCK_LOGS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    date: "2025-10-26",
    checkIn: "09:05 AM",
    checkOut: "06:10 PM",
    duration: "9h 5m",
    status: "Present",
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "2025-10-26",
    checkIn: "09:45 AM",
    checkOut: "06:30 PM",
    duration: "8h 45m",
    status: "Late",
  },
  {
    id: 3,
    name: "David Kim",
    date: "2025-10-26",
    checkIn: "-",
    checkOut: "-",
    duration: "0h 0m",
    status: "Absent",
  },
  {
    id: 4,
    name: "Jessica Low",
    date: "2025-10-26",
    checkIn: "08:55 AM",
    checkOut: "06:00 PM",
    duration: "9h 5m",
    status: "Present",
  },
];

const AttendanceLog = () => {
  const [logs] = useState(MOCK_LOGS);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 w-full md:w-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee..."
            className="bg-transparent text-sm outline-none dark:text-white w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              className="bg-transparent text-sm outline-none dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                  {log.name}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {log.date}
                </td>
                <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300">
                  {log.checkIn}
                </td>
                <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300">
                  {log.checkOut}
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {log.duration}
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      log.status === "Present"
                        ? "bg-emerald-100 text-emerald-700"
                        : log.status === "Late"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceLog;
