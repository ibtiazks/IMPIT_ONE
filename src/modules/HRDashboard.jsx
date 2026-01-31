import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Filter,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";

// --- MOCK DATA (Derived from Grid.xlsx) ---
const DEPT_EXP_DATA = [
  { name: "Operations", exp: 3.5 },
  { name: "Quality", exp: 4.2 },
  { name: "Vendor Mgmt", exp: 2.8 },
  { name: "Analytics", exp: 3.1 },
  { name: "HR", exp: 5.0 },
  { name: "Accounts", exp: 4.5 },
];

const SALARY_GROWTH_DATA = [
  { name: "Avg Growth", value: 28 },
  { name: "Remaining", value: 72 }, // Filler for pie
];

const SALARY_TABLE = [
  { dept: "Operations", join: 25000, curr: 32000, growth: "28%" },
  { dept: "Quality", join: 30000, curr: 38000, growth: "26%" },
  { dept: "Vendor Mgmt", join: 22000, curr: 28000, growth: "27%" },
  { dept: "Analytics", join: 35000, curr: 45000, growth: "28%" },
];

const RETENTION_DATA = [
  { year: "2023", Joined: 45, Resigned: 5 },
  { year: "2024", Joined: 62, Resigned: 8 },
  { year: "2025", Joined: 30, Resigned: 2 },
];

const EXPERIENCE_DIST_DATA = [
  { name: "0-1 Yr", count: 12 },
  { name: "1-3 Yrs", count: 25 },
  { name: "3-5 Yrs", count: 15 },
  { name: "5+ Yrs", count: 8 },
];

const BID_APPROVAL_DATA = [
  { name: "Approved", value: 65 },
  { name: "Rejected", value: 35 },
];

// For Pic 5 (Both Data in Bar) -> Mapping to KPI vs Increment
const FINANCIAL_COMP_DATA = [
  { name: "Q1", KPI: 12000, Increment: 5000 },
  { name: "Q2", KPI: 15000, Increment: 8000 },
  { name: "Q3", KPI: 18000, Increment: 4000 },
  { name: "Q4", KPI: 22000, Increment: 12000 },
];

// For Pic 6 (Bar Chart) -> Mapping to Performance Ratings
const RATING_DATA = [
  { name: "1 Star", count: 2 },
  { name: "2 Stars", count: 5 },
  { name: "3 Stars", count: 18 },
  { name: "4 Stars", count: 25 },
  { name: "5 Stars", count: 10 },
];

// For Pic 7 (Avg Middle Column Pie + Table) -> Mapping to Training Stats
const TRAINING_TABLE = [
  { dept: "Ops", employees: 45, avgScore: 85, completed: 40 },
  { dept: "HR", employees: 5, avgScore: 92, completed: 5 },
  { dept: "IT", employees: 12, avgScore: 78, completed: 10 },
];
const TRAINING_PIE = [
  { name: "Avg Score", value: 85 },
  { name: "Gap", value: 15 },
];

const COLORS = ["#10B981", "#E5E7EB", "#F59E0B", "#EF4444", "#3B82F6"];

// --- COMPONENTS ---

const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
  >
    <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">{title}</h3>
    {children}
  </div>
);

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold">{label}</p>
      <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

const HRDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            HR Dashboard
          </h2>
          <p className="text-slate-500 text-sm">
            Workforce analytics and performance metrics.
          </p>
        </div>

        {/* Multi-select Filters Placeholder */}
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent text-sm font-bold outline-none dark:text-white cursor-pointer">
              <option>2025</option>
              <option>2024</option>
            </select>
            <div className="w-px h-4 bg-slate-300 mx-2"></div>
            <select className="bg-transparent text-sm font-bold outline-none dark:text-white cursor-pointer">
              <option>All Months</option>
              <option>Q1</option>
            </select>
          </div>
          <button className="bg-[#030F1D] text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Apply
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Employees"
          value="84"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          label="Avg Salary Growth"
          value="28%"
          icon={TrendingUp}
          color="bg-emerald-500"
        />
        <StatCard
          label="Total KPI Paid"
          value="৳1.2M"
          icon={DollarSign}
          color="bg-orange-500"
        />
        <StatCard
          label="Avg Rating"
          value="4.2"
          icon={Award}
          color="bg-purple-500"
        />
      </div>

      {/* 3. ROW 1: Dept Experience & Salary Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pic 1: Dept Wise Avg Experience */}
        <Card title="Avg Experience by Dept (Years)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPT_EXP_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="exp" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pic 2: Salary Analysis */}
        <Card title="Salary Growth Analysis">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-40 h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SALARY_GROWTH_DATA}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SALARY_GROWTH_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#10B981" : "#F3F4F6"}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-emerald-600">
                28%
              </div>
            </div>
            <div className="flex-1 w-full overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 font-bold text-slate-500">
                  <tr>
                    <th className="p-2">Dept</th>
                    <th className="p-2">Join</th>
                    <th className="p-2">Curr</th>
                    <th className="p-2">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {SALARY_TABLE.map((r, i) => (
                    <tr key={i}>
                      <td className="p-2 font-medium">{r.dept}</td>
                      <td className="p-2">{r.join.toLocaleString()}</td>
                      <td className="p-2 font-bold">
                        {r.curr.toLocaleString()}
                      </td>
                      <td className="p-2 text-emerald-600">{r.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. ROW 2: Retention */}
      <Card title="Employee Retention (Joined vs Resigned)">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RETENTION_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Joined" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Resigned" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 5. ROW 3: Experience Dist & Bid Approval */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Experience Distribution & Bid Ratio">
          <div className="flex flex-col gap-6">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EXPERIENCE_DIST_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={60}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#8B5CF6"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 border-t pt-4">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={BID_APPROVAL_DATA}
                      innerRadius={25}
                      outerRadius={40}
                      dataKey="value"
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-sm">
                <p className="font-bold">Bid Approval Ratio</p>
                <div className="flex gap-4 mt-1">
                  <span className="text-emerald-600 font-bold">
                    65% Approved
                  </span>
                  <span className="text-amber-500 font-bold">35% Rejected</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pic 5: Both Data (KPI vs Increment) */}
        <Card title="Financial Performance (KPI vs Increments)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FINANCIAL_COMP_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="KPI" fill="#F59E0B" stackId="a" />
                <Bar dataKey="Increment" fill="#10B981" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-center p-2 bg-slate-50 rounded w-full mr-2">
              <p className="text-xs text-slate-500">Total KPI</p>
              <p className="font-bold text-lg">৳67,000</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded w-full ml-2">
              <p className="text-xs text-slate-500">Total Incr.</p>
              <p className="font-bold text-lg">৳29,000</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 6. ROW 4: Rating Distribution & Training Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pic 6 */}
        <Card title="Performance Rating Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RATING_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#EC4899" radius={[4, 4, 0, 0]}>
                  {RATING_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index > 3 ? "#10B981" : "#EC4899"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pic 7: Avg Middle Pie + Table */}
        <Card title="Training & Assessment Scores">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-32 h-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TRAINING_PIE}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    cy="70%"
                  >
                    <Cell fill="#6366F1" />
                    <Cell fill="#E5E7EB" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-end justify-center pb-2">
                <span className="text-2xl font-bold text-indigo-600">85%</span>
              </div>
              <p className="text-center text-xs font-bold text-slate-500 -mt-2">
                Avg Score
              </p>
            </div>
            <div className="flex-1">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold">
                  <tr>
                    <th className="p-2 rounded-l">Dept</th>
                    <th className="p-2 text-center">Avg Score</th>
                    <th className="p-2 rounded-r text-right">Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TRAINING_TABLE.map((r, i) => (
                    <tr key={i}>
                      <td className="p-2 font-medium">{r.dept}</td>
                      <td className="p-2 text-center font-bold text-indigo-600">
                        {r.avgScore}
                      </td>
                      <td className="p-2 text-right">{r.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;
