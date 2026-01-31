import React from "react";
import { Calendar } from "lucide-react";

// --- MOCK DATA ---
const RVM_STATS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    unassigned: 2,
    unread: 5,
    inField: 12,
    followUp: 3,
    total: 22,
    late: 1,
  },
  {
    id: 2,
    name: "Michael Chen",
    unassigned: 0,
    unread: 1,
    inField: 8,
    followUp: 5,
    total: 14,
    late: 0,
  },
  {
    id: 3,
    name: "David Kim",
    unassigned: 5,
    unread: 0,
    inField: 15,
    followUp: 1,
    total: 21,
    late: 4,
  },
];

// --- COMPONENTS ---

const StatBadge = ({ value, type }) => {
  const styles = {
    neutral:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    red: "text-red-600 font-bold",
  };

  if (type === "late") {
    return <span className={styles.red}>{value}</span>;
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-sm font-bold min-w-[2rem] inline-block text-center ${
        styles[type] || styles.neutral
      }`}
    >
      {value}
    </span>
  );
};

const RVMDashboard = () => {
  const totalDealings = RVM_STATS.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
            RVM Dashboard
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Real-time team performance overview.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Total Dealings Card */}
          <div className="bg-orange-50 dark:bg-orange-500/10 px-5 py-3 rounded-xl border border-orange-100 dark:border-orange-900/50 flex flex-col items-start min-w-[160px]">
            <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-1">
              Total Dealings Today
            </span>
            <span className="text-3xl font-extrabold text-[#030F1D] dark:text-white">
              142
            </span>
          </div>

          {/* Date Picker */}
          <div className="relative">
            <input
              type="date"
              className="pl-4 pr-10 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-white focus:outline-none focus:border-orange-500 shadow-sm"
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Unassigned
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Unread
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  In Field
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Follow Up
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Total
                </th>
                <th className="px-6 py-4 text-xs font-bold text-red-500 uppercase tracking-wider text-center">
                  Late
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {RVM_STATS.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-5 font-bold text-slate-800 dark:text-white text-sm">
                    {row.name}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatBadge value={row.unassigned} type="neutral" />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatBadge value={row.unread} type="blue" />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatBadge value={row.inField} type="green" />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatBadge value={row.followUp} type="amber" />
                  </td>
                  <td className="px-6 py-5 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {row.total}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatBadge value={row.late} type="late" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RVMDashboard;
