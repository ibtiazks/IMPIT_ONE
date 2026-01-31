import React, { useState, useMemo } from "react";
import {
  Download,
  Filter,
  Calendar,
  MessageSquare,
  Eye,
  Save,
  X,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_DATA = [
  {
    id: 1,
    wo: "WO-1001",
    ct: "Sarah Jenkins",
    rvm: "Jake Ross",
    status: "In Progress",
    type: "Preservation",
    contractor: "Apex Solutions",
    criteria: "Standard",
    client: "Cyprexx",
    dateDue: "2025-10-15",
    address: "123 Maple St",
    state: "TX",
    zip: "75001",
    actionReq: "Inprogress",
    rvmStatus: "In Progress",
    ctComment: "",
    rvmComment: "",
  },
  {
    id: 2,
    wo: "WO-1002",
    ct: "Michael Chen",
    rvm: "Leo Vincent",
    status: "New",
    type: "Repair",
    contractor: "Badger Maint",
    criteria: "Urgent",
    client: "MCS",
    dateDue: "2025-10-01",
    address: "456 Oak Ave",
    state: "NY",
    zip: "10001",
    actionReq: "RVM Push requested",
    rvmStatus: "Assigned",
    ctComment: "Needs review",
    rvmComment: "",
  },
  {
    id: 3,
    wo: "WO-1003",
    ct: "Sarah Jenkins",
    rvm: "Victor Hilbert",
    status: "Pending",
    type: "Inspection",
    contractor: "Rapid Fixers",
    criteria: "Hazard",
    client: "Altisource",
    dateDue: "2025-10-25",
    address: "789 Pine Rd",
    state: "CA",
    zip: "90001",
    actionReq: "Push Through",
    rvmStatus: "Onboarded",
    ctComment: "",
    rvmComment: "",
  },
  {
    id: 4,
    wo: "WO-1004",
    ct: "David Kim",
    rvm: "Bruce Yasin",
    status: "Late",
    type: "Preservation",
    contractor: "Elite Pros",
    criteria: "Standard",
    client: "Sandcastle",
    dateDue: "2025-09-20",
    address: "321 Elm St",
    state: "FL",
    zip: "33101",
    actionReq: "ECD requested",
    rvmStatus: "Regular Update",
    ctComment: "",
    rvmComment: "Delayed by weather",
  },
];

const CT_LIST = ["Sarah Jenkins", "Michael Chen", "David Kim", "Jessica Low"];
const ACTION_OPTS = [
  "ECD requested",
  "RVM Push requested",
  "Push Through",
  "Inprogress",
];
const RVM_STATUS_OPTS = [
  "Assigned",
  "Onboarded",
  "In Progress",
  "Regular Update",
];
const CT_STATUS_OPTS = ["URGENT", "IN FUTURE", "REGULAR"];

const CTSheet = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [filters, setFilters] = useState({
    analyst: "All",
    ctStatus: "All",
    start: "",
    end: "",
  });
  const [modal, setModal] = useState({
    open: false,
    rowId: null,
    field: null,
    value: "",
  });

  const processedData = useMemo(() => {
    const mockToday = new Date("2025-10-10");
    return data.map((row) => {
      const dueDate = new Date(row.dateDue);
      const diffTime = dueDate - mockToday;
      const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let lateStatus = "REGULAR";
      if (duration > 5) lateStatus = "TETP";
      else if (duration >= 0 && duration <= 5) lateStatus = "REGULAR";
      else if (duration >= -10 && duration <= -1) lateStatus = "LATE";
      else if (duration < -10) lateStatus = "SUPER LATE";

      let suggestedCTStatus = "REGULAR";
      if (lateStatus === "SUPER LATE") suggestedCTStatus = "URGENT";
      else if (lateStatus === "TETP") suggestedCTStatus = "IN FUTURE";
      else if (lateStatus === "LATE") suggestedCTStatus = "REGULAR";

      const finalCTStatus = row.ctStatusOverride || suggestedCTStatus;
      return { ...row, duration, lateStatus, finalCTStatus };
    });
  }, [data]);

  const filteredData = processedData.filter((row) => {
    const matchAnalyst =
      filters.analyst === "All" || row.ct === filters.analyst;
    const matchStatus =
      filters.ctStatus === "All" || row.finalCTStatus === filters.ctStatus;
    return matchAnalyst && matchStatus;
  });

  const handleUpdate = (id, field, value) => {
    setData(
      data.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const openCommentModal = (row, field) => {
    setModal({ open: true, rowId: row.id, field, value: row[field] });
  };

  const saveComment = () => {
    handleUpdate(modal.rowId, modal.field, modal.value);
    setModal({ ...modal, open: false });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          CT Sheet
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              className="bg-transparent text-sm outline-none dark:text-white"
              onChange={(e) =>
                setFilters({ ...filters, start: e.target.value })
              }
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              className="bg-transparent text-sm outline-none dark:text-white"
              onChange={(e) => setFilters({ ...filters, end: e.target.value })}
            />
          </div>
          <select
            className="px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 dark:text-white text-sm outline-none"
            value={filters.analyst}
            onChange={(e) =>
              setFilters({ ...filters, analyst: e.target.value })
            }
          >
            <option value="All">All CTs</option>
            {CT_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 dark:text-white text-sm outline-none"
            value={filters.ctStatus}
            onChange={(e) =>
              setFilters({ ...filters, ctStatus: e.target.value })
            }
          >
            <option value="All">All Status</option>
            {CT_STATUS_OPTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white font-bold uppercase">
            <tr>
              <th className="px-4 py-3">WO#</th>
              <th className="px-4 py-3">Assigned CT</th>
              <th className="px-4 py-3">RVM</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3 text-center">Duration</th>
              <th className="px-4 py-3 text-center">Late Status</th>
              <th className="px-4 py-3">CT Status</th>
              <th className="px-4 py-3">Action Required</th>
              <th className="px-4 py-3">RVM Status</th>
              <th className="px-4 py-3 text-center">Comments</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-4 py-2 font-mono font-bold dark:text-white">
                  {row.wo}
                </td>
                <td className="px-4 py-2">
                  <select
                    className="bg-transparent border-b border-dashed border-slate-300 outline-none w-32"
                    value={row.ct}
                    onChange={(e) => handleUpdate(row.id, "ct", e.target.value)}
                  >
                    {CT_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 dark:text-slate-300">{row.rvm}</td>
                <td className="px-4 py-2 dark:text-slate-300">{row.client}</td>
                <td className="px-4 py-2 dark:text-slate-300">{row.dateDue}</td>
                <td
                  className={`px-4 py-2 text-center font-bold ${
                    row.duration < 0
                      ? "text-red-500"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {row.duration}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      row.lateStatus === "SUPER LATE"
                        ? "bg-red-600 text-white"
                        : row.lateStatus === "LATE"
                        ? "bg-red-100 text-red-700"
                        : row.lateStatus === "TETP"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {row.lateStatus}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <select
                    className={`px-2 py-1 rounded text-xs font-bold outline-none cursor-pointer ${
                      row.finalCTStatus === "URGENT"
                        ? "bg-red-50 text-red-600"
                        : row.finalCTStatus === "IN FUTURE"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-green-50 text-green-600"
                    }`}
                    value={row.finalCTStatus}
                    onChange={(e) =>
                      handleUpdate(row.id, "ctStatusOverride", e.target.value)
                    }
                  >
                    {CT_STATUS_OPTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    className="bg-transparent border-b border-dashed border-slate-300 outline-none w-32 text-xs"
                    value={row.actionReq}
                    onChange={(e) =>
                      handleUpdate(row.id, "actionReq", e.target.value)
                    }
                  >
                    {ACTION_OPTS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    className="bg-transparent border-b border-dashed border-slate-300 outline-none w-32 text-xs"
                    value={row.rvmStatus}
                    onChange={(e) =>
                      handleUpdate(row.id, "rvmStatus", e.target.value)
                    }
                  >
                    {RVM_STATUS_OPTS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => openCommentModal(row, "ctComment")}
                      className={`p-1.5 rounded transition-colors ${
                        row.ctComment
                          ? "text-blue-600 bg-blue-50"
                          : "text-slate-300 hover:text-slate-500"
                      }`}
                      title="CT Comment"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openCommentModal(row, "rvmComment")}
                      className={`p-1.5 rounded transition-colors ${
                        row.rvmComment
                          ? "text-purple-600 bg-purple-50"
                          : "text-slate-300 hover:text-slate-500"
                      }`}
                      title="RVM Comment"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  <button className="text-slate-400 hover:text-orange-500 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModal({ ...modal, open: false })}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {modal.field === "ctComment" ? "CT Comment" : "RVM Comment"}
            </h3>
            <textarea
              className="w-full h-32 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 outline-none focus:border-orange-500 dark:text-white"
              placeholder="Enter comments here..."
              value={modal.value}
              onChange={(e) => setModal({ ...modal, value: e.target.value })}
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModal({ ...modal, open: false })}
                className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveComment}
                className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CTSheet;
