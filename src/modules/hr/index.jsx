import React, { useState, useEffect } from "react";
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


 const sectionTitleMap = {
  "hr-directory": "Employee Directory",
  "hr-database": "Employee Database",
  "hr-attendance-upload": "Upload Attendance",
  "hr-attendance-log": "Attendance Log",
  "hr-payroll": "Payroll Center",
  "hr-hierarchy": "Org Chart",
  "hr-wo-profit": "WO Profit Calc",
  "hr-profit-dash": "Profit Dashboard",
};
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
  const [internalTab, setInternalTab] = useState(activeView || "hr-directory");

  useEffect(() => {
    if (activeView) setInternalTab(activeView);
  }, [activeView]);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#030F1D] dark:text-white">
          {sectionTitleMap[internalTab]}
        </h2>
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {internalTab === "hr-directory" && <EmployeeDirectory />}
        {internalTab === "hr-database" && <EmployeeDatabase />}
        {internalTab === "hr-attendance-upload" && <AttendanceUpload />}
        {internalTab === "hr-attendance-log" && <AttendanceLog />}
        {internalTab === "hr-payroll" && <PayrollCenter />}
        {internalTab === "hr-hierarchy" && <OrgChart />}

        {[
          "hr-wo-profit",
          "hr-analyst-share",
          "hr-rvm-share",
          "hr-admin-share",
          "hr-rvm-final",
          "hr-profit-dash",
        ].includes(internalTab) && (
          <ProfitShare activeTab={internalTab} />
        )}
      </div>
    </div>
  );
};


export default HRPayroll;
