import React, { useState } from "react";
import { Download, Filter, Eye, Edit2, Save, X } from "lucide-react";

const MOCK_PAYMENTS = [
  {
    id: 1,
    wo: "WO-1001",
    contractor: "Apex Solutions",
    address: "123 Main",
    city: "Dallas",
    state: "TX",
    zip: "75001",
    client: "CYP",
    type: "Preservation",
    totalDue: 450,
    paidAmount: 400,
  },
  {
    id: 2,
    wo: "WO-1002",
    contractor: "Badger Maint",
    address: "456 Oak",
    city: "NYC",
    state: "NY",
    zip: "10001",
    client: "MCS",
    type: "Repair",
    totalDue: 1200,
    paidAmount: 1200,
  },
];

const ContractorPayments = () => {
  const [data, setData] = useState(MOCK_PAYMENTS);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const totalLiability = data.reduce(
    (acc, curr) => acc + (curr.totalDue - curr.paidAmount),
    0
  );

  const handleUpdate = (updatedItem) => {
    setData(
      data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setModalType(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold">
            Outstanding Contractor Dues
          </p>
          <p className="text-2xl font-bold text-red-500">
            ${totalLiability.toLocaleString()}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-bold transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3">WO#</th>
              <th className="px-4 py-3">Contractor</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Work Type</th>
              <th className="px-4 py-3 text-right">Total Due</th>
              <th className="px-4 py-3 text-right">Paid Amount</th>
              <th className="px-4 py-3 text-right">Balance Due</th>
              <th className="px-4 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {data.map((row) => {
              const due = row.totalDue - row.paidAmount;
              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300 font-bold">
                    {row.wo}
                  </td>
                  <td className="px-4 py-3 text-slate-800 dark:text-white">
                    {row.contractor}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {row.city}, {row.state}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.client}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700 dark:text-slate-200">
                    ${row.totalDue}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-600">
                    ${row.paidAmount}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-red-500">
                    ${due}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(row);
                          setModalType("view");
                        }}
                        className="text-slate-400 hover:text-blue-500"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(row);
                          setModalType("edit");
                        }}
                        className="text-slate-400 hover:text-orange-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalType && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalType(null)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#030F1D] p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {modalType === "view" ? "Payment Details" : "Edit Payment"}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {modalType === "view" ? (
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Payment Batch Info
                    </p>
                    <p className="dark:text-white mt-1">
                      Batch #9921 - Processed on 2025-10-12
                    </p>
                    <p className="dark:text-white">
                      Batch #9925 - Processed on 2025-10-15
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2">
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      Total Paid:
                    </span>
                    <span className="font-bold text-emerald-600">
                      ${selectedItem.paidAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-600 dark:text-slate-300">
                      Remaining Due:
                    </span>
                    <span className="font-bold text-red-500">
                      ${selectedItem.totalDue - selectedItem.paidAmount}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      Total Invoice Amount
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      value={selectedItem.totalDue}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          totalDue: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">
                      Paid Amount
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      value={selectedItem.paidAmount}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          paidAmount: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => handleUpdate(selectedItem)}
                      className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-orange-600 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Update Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorPayments;
