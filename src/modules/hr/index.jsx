import React, { useState } from "react";
import {
  Users,
  Calendar,
  FileText,
  Briefcase,
  Network,
  UserPlus,
  DollarSign,
  PieChart,
  TrendingUp,
  Calculator,
  Grid,
  Layout,
  Database,
} from "lucide-react";

// Sub-components
import EmployeeDirectory from "./EmployeeDirectory";
import AttendanceUpload from "./AttendanceUpload";
import AttendanceLog from "./AttendanceLog";
import PayrollCenter from "./PayrollCenter";
import OrgChart from "./OrgChart";
import ProfitShare from "./ProfitShare";
import EmployeeDatabase from "./EmployeeDatabase"; // <--- NEW IMPORT

const TABS = [
  { id: "directory", label: "Employee Directory", icon: Users },
  { id: "database", label: "Employee Database", icon: Database }, // <--- NEW TAB
  { id: "attendance-upload", label: "Upload Attendance", icon: Calendar },
  { id: "attendance-log", label: "Attendance Log", icon: FileText },
  { id: "payroll", label: "Payroll Center", icon: DollarSign },
  { id: "hierarchy", label: "Org Chart", icon: Network },
  { id: "wo-profit", label: "WO Profit Calc", icon: Calculator },
  { id: "analyst-share", label: "Analyst Share", icon: TrendingUp },
  { id: "rvm-share", label: "RVM Share", icon: PieChart },
  { id: "admin-share", label: "Admin Share", icon: Briefcase },
  { id: "rvm-final", label: "RVM Final %", icon: Grid },
  { id: "profit-dash", label: "Profit Dashboard", icon: Layout },
];

const HRPayroll = ({ activeView }) => {
  const [internalTab, setInternalTab] = useState(activeView || "directory");

  React.useEffect(() => {
    if (activeView) setInternalTab(activeView);
  }, [activeView]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white">
          HR & Payroll Center
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage workforce, attendance, payroll, and profit sharing
          distributions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setInternalTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
              internalTab === tab.id
                ? "bg-[#030F1D] text-white shadow-lg shadow-blue-900/20"
                : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            <tab.icon
              className={`w-4 h-4 ${
                internalTab === tab.id ? "text-orange-500" : "text-slate-400"
              }`}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {internalTab === "directory" && <EmployeeDirectory />}
        {internalTab === "database" && <EmployeeDatabase />}{" "}
        {/* <--- NEW RENDER */}
        {internalTab === "attendance-upload" && <AttendanceUpload />}
        {internalTab === "attendance-log" && <AttendanceLog />}
        {internalTab === "payroll" && <PayrollCenter />}
        {internalTab === "hierarchy" && <OrgChart />}
        {/* Profit Share Modules */}
        {[
          "wo-profit",
          "analyst-share",
          "rvm-share",
          "admin-share",
          "rvm-final",
          "profit-dash",
        ].includes(internalTab) && <ProfitShare activeTab={internalTab} />}
      </div>
    </div>
  );
};

export default HRPayroll;
