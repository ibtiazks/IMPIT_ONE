import React, { useState, useMemo } from "react";
import { Download, Calendar } from "lucide-react";

const CLIENTS = ["Brolex", "Cyprexx", "MCS", "Sandcastle"];

// --- SCENARIO-BASED MOCK DATA GENERATOR ---
const generateDiverseMockData = () => {
  // 1. Base Gross Ops Data (Child 21 Scenarios)
  const grossOps = [
    {
      company: "Brolex",
      grossOperating: 4500,
      kpi: 0,
      ceoAdj: 0,
      rif: 200,
      previous: 500,
    }, // Standard
    {
      company: "Cyprexx",
      grossOperating: 5200,
      kpi: 1000,
      ceoAdj: 500,
      rif: 0,
      previous: 0,
    }, // High Bonus + Adj
    {
      company: "MCS",
      grossOperating: 8000,
      kpi: 0,
      ceoAdj: 0,
      rif: 1500,
      previous: 1200,
    }, // High RIF & Previous Due
    {
      company: "Sandcastle",
      grossOperating: 3100,
      kpi: 0,
      ceoAdj: -200,
      rif: 100,
      previous: 0,
    }, // Negative Adj (Deduction)
  ];

  // 2. Base Transfer Data (Child 22 Scenarios)
  const transfers = [
    {
      company: "Brolex",
      usd: 5000,
      trCost: 50,
      status: "Completed",
      sentToImpit: 600000,
    }, // Approx Balanced
    {
      company: "Cyprexx",
      usd: 4000,
      trCost: 150,
      status: "Partial",
      sentToImpit: 450000,
    }, // High Tr Cost, Underpaid
    { company: "MCS", usd: 0, trCost: 0, status: "Pending", sentToImpit: 0 }, // No Transfer (High Due)
    {
      company: "Sandcastle",
      usd: 3500,
      trCost: 30,
      status: "Overpaid",
      sentToImpit: 450000,
    }, // Overpaid (Green Due)
  ];

  return { grossOps, transfers };
};

const TransferOperations = ({ activeTab }) => {
  const initialData = useMemo(() => generateDiverseMockData(), []);

  // --- STATE MANAGEMENT ---
  const [grossOpData, setGrossOpData] = useState(initialData.grossOps);
  const [transferData, setTransferData] = useState(initialData.transfers);
  const [totalLoanInput, setTotalLoanInput] = useState(500); // Fixed Loan Input

  // --- HANDLERS ---
  const handleGrossOpChange = (index, field, value) => {
    const newData = [...grossOpData];
    newData[index][field] = parseFloat(value) || 0;
    setGrossOpData(newData);
  };

  const handleTransferChange = (index, field, value) => {
    const newData = [...transferData];
    newData[index][field] = field === "status" ? value : parseFloat(value) || 0;
    setTransferData(newData);
  };

  // --- CALCULATIONS FOR CHILD 21 (Co. Gross Ops) ---
  const processedGrossOp = useMemo(() => {
    const totalRif = grossOpData.reduce((acc, r) => acc + r.rif, 0);
    const rifUsdPerCompany = CLIENTS.length > 0 ? totalRif / CLIENTS.length : 0;
    const loanPerCompany =
      CLIENTS.length > 0 ? totalLoanInput / CLIENTS.length : 0;

    return grossOpData.map((row) => {
      const cOpt = row.grossOperating + row.kpi + row.ceoAdj;
      // Formula: C.Opt + RIF + RIF(USD) + Loan
      const grossOpt = cOpt + row.rif + rifUsdPerCompany + loanPerCompany;
      return {
        ...row,
        cOpt,
        rifUsd: rifUsdPerCompany,
        loan: loanPerCompany,
        grossOpt,
        optTotal: grossOpt + row.previous,
      };
    });
  }, [grossOpData, totalLoanInput]);

  const grossOpTotals = processedGrossOp.reduce(
    (acc, r) => ({
      grossOperating: acc.grossOperating + r.grossOperating,
      kpi: acc.kpi + r.kpi,
      ceoAdj: acc.ceoAdj + r.ceoAdj,
      cOpt: acc.cOpt + r.cOpt,
      rif: acc.rif + r.rif,
      rifUsd: acc.rifUsd + r.rifUsd,
      loan: acc.loan + r.loan,
      grossOpt: acc.grossOpt + r.grossOpt,
      previous: acc.previous + r.previous,
      optTotal: acc.optTotal + r.optTotal,
    }),
    {
      grossOperating: 0,
      kpi: 0,
      ceoAdj: 0,
      cOpt: 0,
      rif: 0,
      rifUsd: 0,
      loan: 0,
      grossOpt: 0,
      previous: 0,
      optTotal: 0,
    }
  );

  // --- CALCULATIONS FOR CHILD 22 (Transfer Sheet) ---
  const processedTransfers = useMemo(() => {
    return transferData.map((row) => {
      const usdSentToBd = row.usd - row.trCost;
      const usdToBdt = usdSentToBd * 120;
      const incentive = usdToBdt * 0.025; // 2.5% Incentive
      const totalReceived = usdToBdt + incentive;
      return {
        ...row,
        usdSentToBd,
        usdToBdt,
        incentive,
        totalReceived,
      };
    });
  }, [transferData]);

  const transferTotals = processedTransfers.reduce(
    (acc, r) => ({
      usd: acc.usd + r.usd,
      trCost: acc.trCost + r.trCost,
      usdSentToBd: acc.usdSentToBd + r.usdSentToBd,
      usdToBdt: acc.usdToBdt + r.usdToBdt,
      incentive: acc.incentive + r.incentive,
      totalReceived: acc.totalReceived + r.totalReceived,
      sentToImpit: acc.sentToImpit + r.sentToImpit,
    }),
    {
      usd: 0,
      trCost: 0,
      usdSentToBd: 0,
      usdToBdt: 0,
      incentive: 0,
      totalReceived: 0,
      sentToImpit: 0,
    }
  );

  // --- CALCULATIONS FOR CHILD 23 (Summary Transfer) ---
  const summaryData = useMemo(() => {
    return CLIENTS.map((company, i) => {
      // Find corresponding rows (safe matching by name if needed, but index works here since static list)
      const opRow = processedGrossOp.find((r) => r.company === company) || {};
      const transRow =
        processedTransfers.find((r) => r.company === company) || {};

      const currentMonth = opRow.grossOpt || 0;
      const previous = opRow.previous || 0;
      const total = currentMonth + previous;
      // Note: Per requirement, 'Received' comes from 'Sent to IMPIT' column of Child 22
      const received = transRow.sentToImpit || 0;
      const due = total - received;

      return { company, currentMonth, previous, total, received, due };
    });
  }, [processedGrossOp, processedTransfers]);

  const summaryTotals = summaryData.reduce(
    (acc, r) => ({
      currentMonth: acc.currentMonth + r.currentMonth,
      previous: acc.previous + r.previous,
      total: acc.total + r.total,
      received: acc.received + r.received,
      due: acc.due + r.due,
    }),
    { currentMonth: 0, previous: 0, total: 0, received: 0, due: 0 }
  );

  // --- RENDERERS ---

  const DateFilter = () => (
    <div className="flex justify-end gap-2 mb-4">
      <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700">
        <Calendar className="w-4 h-4 text-slate-400" />
        <input
          type="month"
          className="bg-transparent text-sm outline-none dark:text-white"
          defaultValue="2025-10"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700">
        <Download className="w-4 h-4" /> Export
      </button>
    </div>
  );

  if (activeTab === "comp-gross") {
    return (
      <div className="animate-fade-in">
        <DateFilter />
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 border-r border-slate-200 dark:border-slate-800">
                  Company
                </th>
                <th className="px-2 py-3 text-right">Gross Op</th>
                <th className="px-2 py-3 text-right">KPI Bonus</th>
                <th className="px-2 py-3 text-right">CEO Adj</th>
                <th className="px-2 py-3 text-right">C.Opt</th>
                <th className="px-2 py-3 text-right">RIF</th>
                <th className="px-2 py-3 text-right">RIF (USD)</th>
                <th className="px-2 py-3 text-right">Loan</th>
                <th className="px-2 py-3 text-right bg-blue-50 dark:bg-blue-900/20">
                  Gross OPT
                </th>
                <th className="px-2 py-3 text-right">Previous</th>
                <th className="px-2 py-3 text-right bg-orange-50 dark:bg-orange-900/20">
                  OPT Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {processedGrossOp.map((r, i) => (
                <tr
                  key={r.company}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-2 font-bold dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-700">
                    {r.company}
                  </td>
                  <td className="px-2 py-2 text-right dark:text-slate-300">
                    {r.grossOperating.toLocaleString()}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none"
                      value={r.kpi}
                      onChange={(e) =>
                        handleGrossOpChange(i, "kpi", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none"
                      value={r.ceoAdj}
                      onChange={(e) =>
                        handleGrossOpChange(i, "ceoAdj", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-2 text-right font-medium text-slate-600 dark:text-slate-400">
                    {r.cOpt.toLocaleString()}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none"
                      value={r.rif}
                      onChange={(e) =>
                        handleGrossOpChange(i, "rif", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-2 text-right text-slate-500">
                    {r.rifUsd.toFixed(0)}
                  </td>
                  <td className="px-2 py-2 text-right text-slate-500">
                    {r.loan.toFixed(0)}
                  </td>
                  <td className="px-2 py-2 text-right font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/10">
                    {Math.round(r.grossOpt).toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right text-slate-500">
                    {r.previous.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right font-extrabold text-orange-600 bg-orange-50 dark:bg-orange-900/10">
                    {Math.round(r.optTotal).toLocaleString()}
                  </td>
                </tr>
              ))}
              {/* TOTAL ROW */}
              <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
                <td className="px-4 py-2 sticky left-0 bg-slate-100 dark:bg-slate-950 z-10 border-r border-slate-300 dark:border-slate-700">
                  TOTAL
                </td>
                <td className="px-2 py-2 text-right">
                  {grossOpTotals.grossOperating.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {grossOpTotals.kpi.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {grossOpTotals.ceoAdj.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {grossOpTotals.cOpt.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {grossOpTotals.rif.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {Math.round(grossOpTotals.rifUsd).toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  <input
                    type="number"
                    className="w-20 text-right bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1 text-xs"
                    placeholder="Input Loan"
                    value={totalLoanInput}
                    onChange={(e) =>
                      setTotalLoanInput(parseFloat(e.target.value) || 0)
                    }
                  />
                </td>
                <td className="px-2 py-2 text-right bg-blue-100 dark:bg-blue-900/30">
                  {Math.round(grossOpTotals.grossOpt).toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  {grossOpTotals.previous.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right bg-orange-100 dark:bg-orange-900/30">
                  {Math.round(grossOpTotals.optTotal).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === "transfer-sheet") {
    return (
      <div className="animate-fade-in">
        <DateFilter />
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-slate-50 dark:bg-slate-950 z-10 border-r border-slate-200 dark:border-slate-800">
                  Company
                </th>
                <th className="px-2 py-3 text-right">USD Input</th>
                <th className="px-2 py-3 text-right">TR Cost</th>
                <th className="px-2 py-3 text-right">USD Sent (Net)</th>
                <th className="px-2 py-3 text-right">USD to BDT (x120)</th>
                <th className="px-2 py-3 text-right">Incentive (2.5%)</th>
                <th className="px-2 py-3 text-right bg-emerald-50 dark:bg-emerald-900/20">
                  Total Received
                </th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3 text-right bg-blue-50 dark:bg-blue-900/20">
                  Sent to IMPIT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {processedTransfers.map((r, i) => (
                <tr
                  key={r.company}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-2 font-bold dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-700">
                    {r.company}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none"
                      value={r.usd}
                      onChange={(e) =>
                        handleTransferChange(i, "usd", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      className="w-20 text-right bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none"
                      value={r.trCost}
                      onChange={(e) =>
                        handleTransferChange(i, "trCost", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-2 text-right dark:text-slate-300 font-medium">
                    ${r.usdSentToBd.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right dark:text-slate-300">
                    ৳{r.usdToBdt.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right dark:text-slate-300">
                    ৳{r.incentive.toLocaleString()}
                  </td>
                  <td className="px-2 py-2 text-right font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10">
                    ৳{r.totalReceived.toLocaleString()}
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      className="w-24 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 outline-none text-xs"
                      value={r.status}
                      onChange={(e) =>
                        handleTransferChange(i, "status", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 py-2 bg-blue-50 dark:bg-blue-900/10 border-l border-slate-200 dark:border-slate-700">
                    <input
                      type="number"
                      className="w-24 text-right bg-transparent font-bold text-blue-600 outline-none"
                      value={r.sentToImpit}
                      onChange={(e) =>
                        handleTransferChange(i, "sentToImpit", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
              {/* TOTAL ROW */}
              <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
                <td className="px-4 py-2 sticky left-0 bg-slate-100 dark:bg-slate-950 z-10 border-r border-slate-300 dark:border-slate-700">
                  TOTAL
                </td>
                <td className="px-2 py-2 text-right">
                  ${transferTotals.usd.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  ${transferTotals.trCost.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  ${transferTotals.usdSentToBd.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  ৳{transferTotals.usdToBdt.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right">
                  ৳{transferTotals.incentive.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-right bg-emerald-100 dark:bg-emerald-900/30">
                  ৳{transferTotals.totalReceived.toLocaleString()}
                </td>
                <td className="px-2 py-2"></td>
                <td className="px-2 py-2 text-right bg-blue-100 dark:bg-blue-900/30">
                  ৳{transferTotals.sentToImpit.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === "summary-transfer") {
    return (
      <div className="animate-fade-in">
        <DateFilter />
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#030F1D] text-white uppercase font-bold">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-[#030F1D] z-10 border-r border-white/10">
                  Company
                </th>
                <th className="px-6 py-3 text-right">
                  Current Month (Gross OPT)
                </th>
                <th className="px-6 py-3 text-right">Previous</th>
                <th className="px-6 py-3 text-right bg-slate-700">
                  Total Obligation
                </th>
                <th className="px-6 py-3 text-right">
                  Received (From Transfer)
                </th>
                <th className="px-6 py-3 text-right bg-orange-600">
                  Balance Due
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {summaryData.map((r) => (
                <tr
                  key={r.company}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 font-bold dark:text-white sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-700">
                    {r.company}
                  </td>
                  <td className="px-6 py-3 text-right dark:text-slate-300">
                    {Math.round(r.currentMonth).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right dark:text-slate-300">
                    {r.previous.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right font-bold bg-slate-50 dark:bg-slate-800">
                    {Math.round(r.total).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-right text-emerald-600 font-medium">
                    {r.received.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-3 text-right font-extrabold ${
                      r.due > 0 ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    {Math.round(r.due).toLocaleString()}
                  </td>
                </tr>
              ))}
              {/* TOTAL ROW */}
              <tr className="bg-slate-100 dark:bg-slate-950 font-extrabold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
                <td className="px-4 py-3 sticky left-0 bg-slate-100 dark:bg-slate-950 z-10 border-r border-slate-300 dark:border-slate-700">
                  TOTAL
                </td>
                <td className="px-6 py-3 text-right">
                  {Math.round(summaryTotals.currentMonth).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right">
                  {summaryTotals.previous.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right bg-slate-200 dark:bg-slate-900">
                  {Math.round(summaryTotals.total).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right">
                  {summaryTotals.received.toLocaleString()}
                </td>
                <td
                  className={`px-6 py-3 text-right bg-orange-100 dark:bg-orange-900/30 ${
                    summaryTotals.due > 0 ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  {Math.round(summaryTotals.due).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

export default TransferOperations;
