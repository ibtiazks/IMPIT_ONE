import React from "react";

// --- 1. LOGO ---
export const LogoSmall = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
      className="text-orange-500"
    />
    <path d="M50 5 L50 50 L90 75" className="text-orange-500" />
    <path d="M50 50 L10 75" className="text-orange-500" />
    <path d="M10 25 L50 50 L90 25" className="text-orange-500" />
  </svg>
);

// --- 2. CHART COMPONENTS ---

export const RadialProgress = ({ percent, color, label }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="text-slate-100 dark:text-slate-800 transition-colors duration-300"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-700 dark:text-slate-200">
            {percent}%
          </span>
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
        {label}
      </span>
    </div>
  );
};

export const PerformanceChart = ({ data = [65, 78, 60, 85, 72, 88, 95] }) => {
  return (
    <div className="h-48 flex items-end justify-between gap-2 px-2 w-full">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
          <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-t-lg relative h-full flex items-end overflow-hidden group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors duration-300">
            <div
              className="w-full bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all duration-500"
              style={{ height: `${val}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            M{i + 1}
          </span>
        </div>
      ))}
    </div>
  );
};

export const SimpleLineChart = () => {
  const dataPoints = [
    { label: "Mon", x: 0, y: 220, val: "$22k" },
    { label: "Tue", x: 100, y: 190, val: "$38k" },
    { label: "Wed", x: 200, y: 120, val: "$65k" },
    { label: "Thu", x: 300, y: 140, val: "$55k" },
    { label: "Fri", x: 400, y: 80, val: "$85k" },
    { label: "Sat", x: 500, y: 40, val: "$95k" },
    { label: "Sun", x: 600, y: 90, val: "$78k" },
  ];
  const pathData = `M ${dataPoints.map((p) => `${p.x},${p.y}`).join(" L ")}`;
  const areaData = `${pathData} L 600,256 L 0,256 Z`;
  return (
    <div className="relative h-64 w-full group">
      <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-300 dark:text-slate-600 pointer-events-none transition-colors duration-300">
        {[100, 75, 50, 25, 0].map((val) => (
          <div
            key={val}
            className="border-b border-slate-100 dark:border-slate-800 w-full h-full flex items-end"
          >
            <span className="mb-1">{val}k</span>
          </div>
        ))}
      </div>
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 600 256"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
          </filter>
        </defs>
        <path d={areaData} fill="url(#lineGradient)" />
        <path
          d={pathData}
          fill="none"
          stroke="#F97316"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "url(#shadow)" }}
        />
        {dataPoints.map((point, index) => (
          <g key={index} className="group/point">
            <circle
              cx={point.x}
              cy={point.y}
              r="15"
              fill="transparent"
              className="cursor-pointer"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              className="fill-white stroke-orange-500 stroke-4 transition-all duration-300 group-hover/point:r-8 group-hover/point:fill-orange-50"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export const SimpleBarChart = () => {
  const data = [
    { label: "Vendor A", val: 60, display: "60%" },
    { label: "Vendor B", val: 85, display: "85%" },
    { label: "Vendor C", val: 45, display: "45%" },
    { label: "Vendor D", val: 70, display: "70%" },
    { label: "Vendor E", val: 90, display: "90%" },
  ];
  return (
    <div className="h-64 flex items-end justify-between gap-4 px-2 pb-6">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 flex-1 group relative h-full justify-end cursor-pointer"
        >
          <div
            className="w-full rounded-t-lg relative transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1"
            style={{
              height: `${d.val}%`,
              background: `linear-gradient(90deg, #ea580c 0%, #fb923c 100%)`,
            }}
          ></div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wide truncate w-full text-center absolute -bottom-6 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export const SimplePieChart = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative w-48 h-48 rounded-full border-[16px] border-slate-100 dark:border-slate-800 flex items-center justify-center">
        <div
          className="absolute inset-0 border-[16px] border-orange-500 rounded-full"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 30%)" }}
        ></div>
        <div
          className="absolute inset-0 border-[16px] border-emerald-500 rounded-full rotate-45"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 20%, 0 20%)" }}
        ></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-white">
            1,204
          </div>
          <div className="text-xs text-slate-500 uppercase">Orders</div>
        </div>
      </div>
    </div>
  );
};
