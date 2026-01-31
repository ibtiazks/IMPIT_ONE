import React, { useState } from "react";
import { FileUp, ChevronDown } from "lucide-react";

const AttendanceConsole = ({ viewMode, attendanceData = [], onUpload }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesEmployee =
      employeeFilter === "All" || record.name === employeeFilter;
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const recordDate = new Date(record.date);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      matchesDate = recordDate >= start && recordDate <= end;
    } else if (dateRange.start) {
      const recordDate = new Date(record.date);
      const start = new Date(dateRange.start);
      matchesDate = recordDate >= start;
    }
    return matchesEmployee && matchesDate;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {viewMode === "upload" && (
        <>
          <div>
            <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
              Upload Attendance
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Import TipShoi biometric data.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-sm transition-colors min-h-[400px]">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-blue-500">
              <FileUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">
              Select Monthly File
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 mb-6 max-w-sm">
              Supported formats: .xlsx, .csv
            </p>
            <div className="flex gap-4 w-full max-w-md">
              <input
                type="month"
                className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button
                onClick={onUpload}
                className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </>
      )}
      {viewMode === "log" && (
        <>
          <div>
            <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
              Attendance Log
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              View and filter employee attendance records.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
            <div className="flex items-center gap-3 w-full">
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Date Range
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="bg-transparent text-sm text-slate-600 dark:text-slate-300 outline-none px-2"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="bg-transparent text-sm text-slate-600 dark:text-slate-300 outline-none px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-64">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Employee
                </label>
                <div className="relative">
                  <select
                    value={employeeFilter}
                    onChange={(e) => setEmployeeFilter(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:border-orange-500 appearance-none"
                  >
                    <option value="All">All Employees</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="Michael Chen">Michael Chen</option>
                    <option value="David Kim">David Kim</option>
                    <option value="Emily Davis">Emily Davis</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <button
                onClick={() => {
                  setEmployeeFilter("All");
                  setDateRange({ start: "", end: "" });
                }}
                className="mt-5 px-4 py-2 text-sm text-slate-500 hover:text-orange-500 font-bold"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors animate-fade-in">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3 font-bold">Employee</th>
                  <th className="px-6 py-3 font-bold">Date</th>
                  <th className="px-6 py-3 font-bold text-center">Check In</th>
                  <th className="px-6 py-3 font-bold text-center">Check Out</th>
                  <th className="px-6 py-3 font-bold text-center">Duration</th>
                  <th className="px-6 py-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm font-medium text-[#030F1D] dark:text-white">
                        {record.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-500 dark:text-slate-400">
                        {record.date}
                      </td>
                      <td
                        className={`px-6 py-3 text-sm text-center font-mono ${
                          record.status === "Late"
                            ? "text-amber-600 font-bold"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {record.checkIn}
                      </td>
                      <td className="px-6 py-3 text-sm text-center text-slate-600 dark:text-slate-300 font-mono">
                        {record.checkOut}
                      </td>
                      <td className="px-6 py-3 text-sm text-center text-slate-600 dark:text-slate-300 font-mono">
                        {record.duration}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold ${
                            record.status === "Present"
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                              : record.status === "Late"
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-slate-400 dark:text-slate-500"
                    >
                      {attendanceData.length === 0
                        ? "No attendance data uploaded yet."
                        : "No attendance records found for the selected criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceConsole;
