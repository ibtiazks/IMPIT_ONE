import React, { useState } from "react";
import {
  DollarSign,
  Users,
  FileText,
  AlertCircle,
  Download,
  Filter,
  Calendar as CalendarIcon,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- DUMMY DATA ---

const revenueData = [
  { name: "Jan", value: 30000 },
  { name: "Feb", value: 45000 },
  { name: "Mar", value: 35000 },
  { name: "Apr", value: 60000 },
  { name: "May", value: 48000 },
  { name: "Jun", value: 75000 },
  { name: "Jul", value: 65000 },
];

const vendorData = [
  { name: "Apex Prop", jobs: 145 },
  { name: "FixIt Bros", jobs: 210 },
  { name: "CleanSweep", jobs: 90 },
  { name: "Rapid Repair", jobs: 175 },
  { name: "Elite Maint", jobs: 120 },
];

const pieData = [
  { name: "Completed", value: 850, color: "#10B981" }, // emerald-500
  { name: "Pending", value: 220, color: "#F59E0B" }, // amber-500
  { name: "Review", value: 134, color: "#3B82F6" }, // blue-500
];

const transactions = [
  {
    id: "#WO-9321",
    vendor: "Apex Property",
    date: "Oct 24, 2025",
    status: "Completed",
    amount: "$450.00",
  },
  {
    id: "#WO-9322",
    vendor: "FixIt Bros",
    date: "Oct 24, 2025",
    status: "Pending",
    amount: "$1,200.00",
  },
  {
    id: "#WO-9323",
    vendor: "CleanSweep Inc",
    date: "Oct 23, 2025",
    status: "Review",
    amount: "$320.50",
  },
  {
    id: "#WO-9324",
    vendor: "Rapid Repair",
    date: "Oct 23, 2025",
    status: "Completed",
    amount: "$890.00",
  },
  {
    id: "#WO-9325",
    vendor: "Elite Maint",
    date: "Oct 22, 2025",
    status: "Completed",
    amount: "$1,500.00",
  },
];

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }) => {
  const colors = {
    Completed:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    Pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Review: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${
        colors[status] || "bg-slate-100 text-slate-800"
      }`}
    >
      {status}
    </span>
  );
};

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  iconBg,
  iconColor,
}) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <span
        className={`flex items-center gap-1 text-xs font-bold ${
          trend === "up" ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {trend === "up" ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {trendValue}
      </span>
      <span className="text-xs text-slate-400">vs last month</span>
    </div>
  </div>
);

// --- CUSTOM CHART TOOLTIP ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 border border-slate-100 dark:border-slate-700 rounded-lg shadow-lg">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-orange-500">
          {payload[0].name === "jobs" ? "Jobs: " : "Revenue: $"}
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// --- MAIN COMPONENT ---

const MainDashboard = () => {
  const [timeRange, setTimeRange] = useState("Daily");
  const totalOrders = pieData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* --- FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {["Daily", "Monthly", "Range"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                timeRange === range
                  ? "bg-white dark:bg-slate-700 text-orange-600 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap justify-end w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-medium">
            <CalendarIcon className="w-4 h-4" />
            <span>30-Dec-2025</span>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#030F1D] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> Apply
          </button>
          <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Revenue"
          value="$124,500"
          icon={DollarSign}
          trend="up"
          trendValue="12%"
          iconBg="bg-orange-100 dark:bg-orange-900/30"
          iconColor="text-orange-600 dark:text-orange-400"
        />
        <SummaryCard
          title="Active Vendors"
          value="84"
          icon={Users}
          trend="up"
          trendValue="4%"
          iconBg="bg-blue-100 dark:bg-blue-900/30"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <SummaryCard
          title="Open Orders"
          value="142"
          icon={FileText}
          trend="down"
          trendValue="2%"
          iconBg="bg-emerald-100 dark:bg-emerald-900/30"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <SummaryCard
          title="Pending Reviews"
          value="28"
          icon={AlertCircle}
          trend="up"
          trendValue="8%"
          iconBg="bg-red-100 dark:bg-red-900/30"
          iconColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* --- CHARTS ROW 1: Revenue & Status --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Revenue Trend (Line Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Revenue Trend
            </h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-800"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#F97316",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  activeDot={{
                    r: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    fill: "#F97316",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Order Status (Pie Chart) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Order Status
            </h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 relative">
            {/* Centered Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {totalOrders.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 uppercase font-semibold tracking-wider">
                Total Jobs
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  // This makes the slice pop out on hover
                  activeShape={({
                    cx,
                    cy,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    fill,
                  }) => (
                    <g>
                      <Pie
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius + 8}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                        data={[{ value: 1 }]}
                        dataKey="value"
                        stroke="none"
                      />
                    </g>
                  )}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.color}
                      className="hover:opacity-90 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Jobs`, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#334155", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CHARTS ROW 2: Top Vendors & Table --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Vendors (Bar Chart) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Top Vendors
            </h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vendorData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-800"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  dy={10}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <defs>
                  <linearGradient
                    id="vendorBarGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="jobs"
                  fill="url(#vendorBarGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                  className="hover:opacity-90 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions (Table) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm h-[400px] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Recent Transactions
            </h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Order ID
                  </th>
                  <th className="py-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Vendor
                  </th>
                  <th className="py-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Date
                  </th>
                  <th className="py-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="py-3 px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      {tx.id}
                    </td>
                    <td className="py-3 px-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {tx.vendor}
                    </td>
                    <td className="py-3 px-2 text-sm text-slate-500 dark:text-slate-400">
                      {tx.date}
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="py-3 px-2 text-sm font-bold text-slate-800 dark:text-white text-right">
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
