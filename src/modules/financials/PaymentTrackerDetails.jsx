import React, { useState, useMemo } from "react";
import { Download, Filter, Search, Calendar } from "lucide-react";

const CLIENT_LIST = [
  "Cyprexx",
  "First Allegiance",
  "Sandcastle",
  "Brookstone",
  "Guardian",
  "Spectrum",
  "Five Brothers",
  "Aremco",
  "Kando",
  "Home365",
  "DMG Pro",
  "BMG",
  "Liberty Home Guard",
  "Armadillo",
  "MCS",
  "Blackdome",
  "Singlesource",
  "Leading Edge",
  "American Homes",
  "Altisource",
  "MP Home",
];

// Mock Data Generator
const generateMockData = (clientName) => {
  return Array.from({ length: 15 }).map((_, i) => {
    const invoiced = Math.floor(Math.random() * 500) + 200;
    const paid = Math.random() > 0.3 ? invoiced : 0; // 30% chance unpaid
    const contractorPaid = Math.floor(invoiced * 0.6);
    const completeDate = new Date(2025, 9, 1 + i); // Oct 2025
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - completeDate);
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      id: i,
      completeDate: completeDate.toISOString().split("T")[0],
      currentDate: currentDate.toISOString().split("T")[0],
      duration: duration,
      wo: `WO-${9000 + i}`,
      woType: i % 2 === 0 ? "Preservation" : "Repair",
      address: `${100 + i} Maple St`,
      county: "Dallas",
      city: "Dallas",
      state: "TX",
      zip: "75001",
      invoiceCharged: invoiced,
      invoicePaid: paid,
      dispute: paid < invoiced && paid > 0 ? invoiced - paid : 0,
      status: paid === invoiced ? "Paid" : "Due",
      contractorPaid: contractorPaid,
      contractor: "Apex Solutions",
      paymentDate: "2025-10-25",
    };
  });
};

const PaymentTrackerDetails = () => {
  const [selectedClient, setSelectedClient] = useState(CLIENT_LIST[0]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Generate data based on client selection
  const data = useMemo(
    () => generateMockData(selectedClient),
    [selectedClient]
  );

  // Calculate Summary
  const summary = useMemo(() => {
    return data.reduce(
      (acc, curr) => ({
        invoiced: acc.invoiced + curr.invoiceCharged,
        paid: acc.paid + curr.invoicePaid,
        contractorPaid: acc.contractorPaid + curr.contractorPaid,
        woCount: acc.woCount + 1,
      }),
      { invoiced: 0, paid: 0, contractorPaid: 0, woCount: 0 }
    );
  }, [data]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 uppercase">
            Select Client
          </label>
          <select
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-bold dark:text-white outline-none focus:border-orange-500"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {CLIENT_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              className="bg-transparent text-sm outline-none dark:text-white w-28"
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              className="bg-transparent text-sm outline-none dark:text-white w-28"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 whitespace-nowrap">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Invoiced
          </p>
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            ${summary.invoiced.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Paid
          </p>
          <p className="text-xl font-bold text-emerald-600">
            ${summary.paid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Contractor Paid
          </p>
          <p className="text-xl font-bold text-blue-600">
            ${summary.contractorPaid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total WO Numbers
          </p>
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            {summary.woCount}
          </p>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3">Complete Date</th>
              <th className="px-4 py-3">Current Date</th>
              <th className="px-4 py-3 text-center">Duration</th>
              <th className="px-4 py-3">WO</th>
              <th className="px-4 py-3">WO Type</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">County</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Zip</th>
              <th className="px-4 py-3 text-right">Invoiced</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-right">Dispute</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Contr. Paid</th>
              <th className="px-4 py-3 text-right">Difference</th>
              <th className="px-4 py-3">Contractor</th>
              <th className="px-4 py-3">Payment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {data.map((row) => {
              const diff = row.invoicePaid - row.contractorPaid;
              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.completeDate}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.currentDate}
                  </td>
                  <td className="px-4 py-3 text-center font-bold">
                    {row.duration}d
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-200">
                    {row.wo}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.woType}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[150px] truncate"
                    title={row.address}
                  >
                    {row.address}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.county}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.city}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.state}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.zip}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${row.invoiceCharged}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-600">
                    ${row.invoicePaid}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-red-500">
                    ${row.dispute}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        row.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${row.contractorPaid}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-bold ${
                      diff >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    ${diff}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.contractor}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.paymentDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTrackerDetails;
