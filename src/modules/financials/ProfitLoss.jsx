import React, { useState } from "react";
import { Download, Filter, Eye, Edit2, X, Save } from "lucide-react";

const MOCK_PNL_DATA = [
  {
    id: 1,
    sentDate: "2025-10-01",
    contractor: "Apex Solutions",
    address: "123 Main St",
    city: "Dallas",
    state: "TX",
    zip: "75001",
    wo: "WO-1001",
    client: "CYP (Cyprexx)",
    type: "Preservation",
    contractorTotal: 450,
    clientDiscountTotal: 600,
  },
  {
    id: 2,
    sentDate: "2025-10-02",
    contractor: "Badger Maint",
    address: "456 Oak Ln",
    city: "New York",
    state: "NY",
    zip: "10001",
    wo: "WO-1002",
    client: "MCS",
    type: "Repair",
    contractorTotal: 1200,
    clientDiscountTotal: 1100,
  },
  {
    id: 3,
    sentDate: "2025-10-05",
    contractor: "Rapid Fixers",
    address: "789 Pine Rd",
    city: "LA",
    state: "CA",
    zip: "90001",
    wo: "WO-1003",
    client: "FA (First Allegiance)",
    type: "Inspection",
    contractorTotal: 50,
    clientDiscountTotal: 75,
  },
];

const ProfitLoss = () => {
  const [data, setData] = useState(MOCK_PNL_DATA);
  const [filter, setFilter] = useState("");

  // Modal State
  const [modalType, setModalType] = useState(null); // 'view' | 'edit'
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = data.filter(
    (item) =>
      item.contractor.toLowerCase().includes(filter.toLowerCase()) ||
      item.wo.toLowerCase().includes(filter.toLowerCase()) ||
      item.client.toLowerCase().includes(filter.toLowerCase())
  );

  const totalContractor = filteredData.reduce(
    (acc, curr) => acc + curr.contractorTotal,
    0
  );
  const totalClient = filteredData.reduce(
    (acc, curr) => acc + curr.clientDiscountTotal,
    0
  );
  const totalProfit = totalClient - totalContractor;

  const handleUpdate = (updatedItem) => {
    setData(
      data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setModalType(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Contractor Payout
          </p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            ${totalContractor.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Total Client Revenue
          </p>
          <p className="text-2xl font-bold text-emerald-600">
            ${totalClient.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500 uppercase font-bold">
            Net Profit / Loss
          </p>
          <p
            className={`text-2xl font-bold ${
              totalProfit >= 0 ? "text-emerald-500" : "text-red-500"
            }`}
          >
            ${totalProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <Filter className="w-4 h-4 text-slate-400" />
          <input
            className="bg-transparent outline-none text-sm w-full dark:text-white"
            placeholder="Filter by Contractor, Client, or WO..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3">Sent Date</th>
              <th className="px-4 py-3">Contractor</th>
              <th className="px-4 py-3">WO#</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Work Type</th>
              <th className="px-4 py-3 text-right">Contr. Total</th>
              <th className="px-4 py-3 text-right">Client Total</th>
              <th className="px-4 py-3 text-right">P/L</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {filteredData.map((row) => {
              const pnl = row.clientDiscountTotal - row.contractorTotal;
              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.sentDate}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-white">
                    {row.contractor}
                    <div className="text-[10px] text-slate-400 font-normal">
                      {row.city}, {row.state}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                    {row.wo}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.client}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700 dark:text-slate-200">
                    ${row.contractorTotal}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700 dark:text-slate-200">
                    ${row.clientDiscountTotal}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-bold ${
                      pnl >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    ${pnl}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(row);
                          setModalType("view");
                        }}
                        className="text-slate-400 hover:text-blue-500"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(row);
                          setModalType("edit");
                        }}
                        className="text-slate-400 hover:text-orange-500"
                        title="Edit"
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
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#030F1D] p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {modalType === "view" ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <Edit2 className="w-4 h-4" />
                )}
                {modalType === "view"
                  ? "Profit/Loss Details"
                  : "Edit P&L Entry"}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {modalType === "view" ? (
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-500 font-bold block text-xs uppercase">
                        WO#
                      </span>
                      <span className="dark:text-white">{selectedItem.wo}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block text-xs uppercase">
                        Client
                      </span>
                      <span className="dark:text-white">
                        {selectedItem.client}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block text-xs uppercase">
                        Contractor
                      </span>
                      <span className="dark:text-white">
                        {selectedItem.contractor}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block text-xs uppercase">
                        Work Type
                      </span>
                      <span className="dark:text-white">
                        {selectedItem.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block text-xs uppercase">
                        Sent Date
                      </span>
                      <span className="dark:text-white">
                        {selectedItem.sentDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block text-xs uppercase">
                        Location
                      </span>
                      <span className="dark:text-white">
                        {selectedItem.address}, {selectedItem.city},{" "}
                        {selectedItem.state}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mt-3 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded">
                      <p className="text-xs text-slate-500">Contractor Paid</p>
                      <p className="font-bold dark:text-white">
                        ${selectedItem.contractorTotal}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded">
                      <p className="text-xs text-slate-500">Client Paid</p>
                      <p className="font-bold dark:text-white">
                        ${selectedItem.clientDiscountTotal}
                      </p>
                    </div>
                    <div
                      className={`${
                        selectedItem.clientDiscountTotal -
                          selectedItem.contractorTotal >=
                        0
                          ? "bg-emerald-50 dark:bg-emerald-900/20"
                          : "bg-red-50 dark:bg-red-900/20"
                      } p-2 rounded`}
                    >
                      <p className="text-xs text-slate-500">Net P/L</p>
                      <p
                        className={`font-bold ${
                          selectedItem.clientDiscountTotal -
                            selectedItem.contractorTotal >=
                          0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        $
                        {selectedItem.clientDiscountTotal -
                          selectedItem.contractorTotal}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Contractor Total
                      </label>
                      <input
                        type="number"
                        className="w-full border rounded p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={selectedItem.contractorTotal}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            contractorTotal: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Client Total
                      </label>
                      <input
                        type="number"
                        className="w-full border rounded p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={selectedItem.clientDiscountTotal}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            clientDiscountTotal: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Address
                      </label>
                      <input
                        className="w-full border rounded p-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={selectedItem.address}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => handleUpdate(selectedItem)}
                      className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-orange-600 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Changes
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

export default ProfitLoss;
