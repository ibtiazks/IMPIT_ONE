import React, { useState } from "react";

// Mock Data with diverse scenarios (Profit, Loss, High Costs)
const INITIAL_DATA = {
  "Client Payment Received": [
    15000, 18000, 14000, 16500, 20000, 12000, 19000, 22000, 17500, 16000, 21000,
    25000,
  ],
  "Contractor Payment": [
    8000, 9500, 7800, 9000, 11000, 8500, 10500, 12000, 9500, 8800, 11500, 13000,
  ],
  "PPW Cost": [150, 150, 150, 150, 200, 200, 200, 200, 200, 200, 200, 200],
  // Operating Costs
  "Operating Cost": [
    1200, 1100, 1300, 1250, 1400, 1150, 1350, 1500, 1200, 1100, 1300, 1600,
  ],
  "General Liability Insurance": [
    200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
  ],
  "Workers Compensation Insurance": [
    150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
  ],
  "Auto Insurance": [
    300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
  ],
  "Phone Service Cost": [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
  "Shared Company Cost": [0, 0, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "Investment Withdrawal": [0, 2000, 0, 0, 5000, 0, 0, 0, 0, 0, 0, 10000], // Big withdrawal causing dip
  "Back charges": [0, 0, 0, 150, 0, 500, 0, 0, 200, 0, 0, 0],
  "Previous Due": [500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "TC & Overdraft": [0, 25, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0],
  Others: [100, 50, 120, 80, 200, 50, 100, 150, 80, 60, 120, 300],
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const IncomeStatement = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedClient, setSelectedClient] = useState("All Clients");

  const handleCellChange = (category, monthIndex, val) => {
    const newData = { ...data };
    newData[category][monthIndex] = parseFloat(val) || 0;
    setData(newData);
  };

  // --- CALCULATIONS ---
  const calculateRow = (rowName) => {
    if (rowName === "Gross Profit") {
      return data["Client Payment Received"].map(
        (val, i) => val - data["Contractor Payment"][i] - data["PPW Cost"][i]
      );
    }
    if (rowName === "Total Operating Cost") {
      const opKeys = [
        "Operating Cost",
        "General Liability Insurance",
        "Workers Compensation Insurance",
        "Auto Insurance",
        "Phone Service Cost",
        "Shared Company Cost",
        "Investment Withdrawal",
        "Back charges",
        "Previous Due",
        "TC & Overdraft",
        "Others",
      ];
      return Array(12)
        .fill(0)
        .map((_, i) => opKeys.reduce((acc, key) => acc + data[key][i], 0));
    }
    if (rowName === "Net Income (profit)") {
      const gross = calculateRow("Gross Profit");
      const ops = calculateRow("Total Operating Cost");
      return gross.map((g, i) => g - ops[i]);
    }
    return data[rowName];
  };

  const renderRow = (label, isHeader = false, isCalculated = false) => {
    const values = calculateRow(label);
    const total = values.reduce((a, b) => a + b, 0);

    return (
      <tr
        className={`${
          isHeader
            ? "bg-slate-100 dark:bg-slate-800 font-bold"
            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
        } ${
          label === "Net Income (profit)"
            ? "bg-slate-200 dark:bg-slate-700 font-extrabold"
            : ""
        }`}
      >
        <td className="px-4 py-2 border-r border-slate-200 dark:border-slate-700 min-w-[200px] text-sm text-slate-800 dark:text-white">
          {label}
        </td>
        {values.map((val, i) => (
          <td
            key={i}
            className="px-2 py-2 border-r border-slate-100 dark:border-slate-800 text-right min-w-[80px]"
          >
            {isCalculated ? (
              <span
                className={`text-sm ${
                  val < 0
                    ? "text-red-500"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {Math.round(val).toLocaleString()}
              </span>
            ) : (
              <input
                type="number"
                className="w-full text-right bg-transparent text-sm outline-none focus:text-orange-500"
                value={val}
                onChange={(e) => handleCellChange(label, i, e.target.value)}
              />
            )}
          </td>
        ))}
        <td className="px-4 py-2 font-bold text-right bg-slate-50 dark:bg-slate-900 text-sm dark:text-white">
          {Math.round(total).toLocaleString()}
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Income Statement (P&L)
        </h2>
        <select
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm font-bold"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option>All Clients</option>
          <option>Cyprexx</option>
          <option>MCS</option>
          <option>Sandcastle</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#030F1D] text-white text-xs uppercase font-bold">
            <tr>
              <th className="px-4 py-3 sticky left-0 bg-[#030F1D] z-10">
                Category
              </th>
              {MONTHS.map((m) => (
                <th key={m} className="px-2 py-3 text-right">
                  {m}
                </th>
              ))}
              <th className="px-4 py-3 text-right bg-orange-600">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {renderRow("Client Payment Received")}
            {renderRow("Contractor Payment")}
            {renderRow("PPW Cost")}
            {renderRow("Gross Profit", true, true)}

            {/* Operating Costs */}
            <tr>
              <td
                colSpan={14}
                className="px-4 py-1 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                Operating Expenses
              </td>
            </tr>

            {renderRow("Operating Cost")}
            {renderRow("General Liability Insurance")}
            {renderRow("Workers Compensation Insurance")}
            {renderRow("Auto Insurance")}
            {renderRow("Phone Service Cost")}
            {renderRow("Shared Company Cost")}
            {renderRow("Investment Withdrawal")}
            {renderRow("Back charges")}
            {renderRow("Previous Due")}
            {renderRow("TC & Overdraft")}
            {renderRow("Others")}

            {renderRow("Total Operating Cost", true, true)}
            {renderRow("Net Income (profit)", true, true)}

            {/* Profit Share Eligibility Row */}
            <tr className="bg-slate-50 dark:bg-slate-950">
              <td className="px-4 py-2 font-bold text-xs text-slate-500 uppercase border-r dark:border-slate-800">
                Profit Share Eligible?
              </td>
              {calculateRow("Net Income (profit)").map((val, i) => (
                <td
                  key={i}
                  className="px-2 py-2 text-center text-xs font-bold border-r dark:border-slate-800"
                >
                  {val > 3500 ? (
                    <span className="text-emerald-600 bg-emerald-100 px-1 rounded">
                      YES
                    </span>
                  ) : (
                    <span className="text-slate-400">NO</span>
                  )}
                </td>
              ))}
              <td className="bg-slate-100 dark:bg-slate-900"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeStatement;
