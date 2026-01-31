import React from "react";
import { FileText, TrendingUp, CheckCircle } from "lucide-react";
import { ReportFilter } from "./ReportUtils";

const ImportStats = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white">
        Import & Edit Statistics
      </h2>

      <ReportFilter />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Imported */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Work Orders Imported
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">
                1,087
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 z-10">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
              +12% vs last month
            </span>
          </div>
          {/* Decorative Background Blob */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
        </div>

        {/* Card 2: Avg WO/Day */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Average Work Orders / Day
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">
                45
              </h3>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 z-10">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
              +4% vs last month
            </span>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all"></div>
        </div>

        {/* Card 3: Bid Approvals */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Bid Approvals Imported
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">
                119
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 z-10">
            <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
              -2% vs last month
            </span>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
        </div>
      </div>
    </div>
  );
};

export default ImportStats;
