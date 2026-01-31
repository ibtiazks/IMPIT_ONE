import React, { useState, useMemo } from "react";
import {
  Download,
  Calendar,
  Plus,
  User,
  Calculator,
  PieChart,
  DollarSign,
  Users,
  Save,
} from "lucide-react";

// --- MOCK DATA ---
const EMPLOYEES = ["Sarah Jenkins", "Michael Chen", "David Kim", "Jessica Low"];
const RVMS = ["Sarah Jenkins", "Michael Chen"];
const ANALYSTS = ["David Kim", "Jessica Low"];
const ADMINS = ["Admin A", "Admin B", "Admin C"];
const COMPANIES = ["Brolex", "Cyprexx", "MCS"];

// --- 1. WORK ORDER FOR PROFIT ---
const WorkOrderProfit = ({ data, onAdd }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    wo: "",
    invoice: "",
    rvm: RVMS[0],
    analyst: ANALYSTS[0],
  });

  const handleAdd = () => {
    if (!form.wo || !form.invoice) return;
    onAdd({ ...form, id: Date.now(), invoice: parseFloat(form.invoice) });
    setForm({ ...form, wo: "", invoice: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            System Date
          </label>
          <input
            disabled
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded px-3 py-2 text-sm text-slate-500"
            value={form.date}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            WO Number
          </label>
          <input
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm"
            value={form.wo}
            onChange={(e) => setForm({ ...form, wo: e.target.value })}
            placeholder="WO-..."
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            Invoice Amount
          </label>
          <input
            type="number"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm"
            value={form.invoice}
            onChange={(e) => setForm({ ...form, invoice: e.target.value })}
            placeholder="$"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            RVM
          </label>
          <select
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm"
            value={form.rvm}
            onChange={(e) => setForm({ ...form, rvm: e.target.value })}
          >
            {RVMS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            Analyst
          </label>
          <select
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm"
            value={form.analyst}
            onChange={(e) => setForm({ ...form, analyst: e.target.value })}
          >
            {ANALYSTS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-5 flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-600"
          >
            Add Entry
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#030F1D] text-white uppercase font-bold">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">WO#</th>
              <th className="px-6 py-3">RVM</th>
              <th className="px-6 py-3">Analyst</th>
              <th className="px-6 py-3 text-right">Invoice ($)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-2 dark:text-slate-300">{r.date}</td>
                <td className="px-6 py-2 font-mono dark:text-white">{r.wo}</td>
                <td className="px-6 py-2 dark:text-slate-300">{r.rvm}</td>
                <td className="px-6 py-2 dark:text-slate-300">{r.analyst}</td>
                <td className="px-6 py-2 text-right font-bold text-emerald-600">
                  ${r.invoice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2 & 3. GENERIC SHARE TABLE (Analyst & RVM) ---
const ShareTable = ({ title, data, type }) => {
  const totalInvoice = data.reduce((acc, curr) => acc + curr.invoice, 0);
  const grouped = data.reduce((acc, curr) => {
    const key = type === "rvm" ? curr.rvm : curr.analyst;
    if (!acc[key]) acc[key] = 0;
    acc[key] += curr.invoice;
    return acc;
  }, {});

  const rows = Object.keys(grouped).map((k) => ({
    name: k,
    total: grouped[k],
    perc: totalInvoice ? (grouped[k] / totalInvoice) * 100 : 0,
  }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-lg dark:text-white">
        {title}
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase">
          <tr>
            <th className="px-6 py-3">{type === "rvm" ? "RVM" : "Analyst"}</th>
            <th className="px-6 py-3 text-right">Sum Invoice</th>
            <th className="px-6 py-3 text-right">Percentage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((r) => (
            <tr key={r.name}>
              <td className="px-6 py-3 font-bold dark:text-white">{r.name}</td>
              <td className="px-6 py-3 text-right dark:text-slate-300">
                ${r.total.toLocaleString()}
              </td>
              <td className="px-6 py-3 text-right font-bold text-blue-600">
                {r.perc.toFixed(2)}%
              </td>
            </tr>
          ))}
          <tr className="bg-slate-100 dark:bg-slate-950 font-bold">
            <td className="px-6 py-3">TOTAL</td>
            <td className="px-6 py-3 text-right">
              ${totalInvoice.toLocaleString()}
            </td>
            <td className="px-6 py-3 text-right">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// --- 4. ADMIN PROFIT SHARE ---
const AdminProfitShare = () => {
  const [selectedAdmins, setSelectedAdmins] = useState([
    { name: "Admin A", salary: 5000 },
  ]);
  const totalSalary = selectedAdmins.reduce(
    (acc, curr) => acc + curr.salary,
    0
  );

  const toggleAdmin = (name) => {
    if (selectedAdmins.find((a) => a.name === name))
      setSelectedAdmins(selectedAdmins.filter((a) => a.name !== name));
    else setSelectedAdmins([...selectedAdmins, { name, salary: 5000 }]); // Mock salary fetch
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex gap-2 mb-4">
        {ADMINS.map((a) => (
          <button
            key={a}
            onClick={() => toggleAdmin(a)}
            className={`px-3 py-1 rounded text-xs font-bold border ${
              selectedAdmins.find((x) => x.name === a)
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white border-slate-300 text-slate-500"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#030F1D] text-white uppercase font-bold">
            <tr>
              <th className="px-6 py-3">Admin</th>
              <th className="px-6 py-3 text-right">Salary</th>
              <th className="px-6 py-3 text-right">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {selectedAdmins.map((a) => (
              <tr key={a.name}>
                <td className="px-6 py-3 font-bold dark:text-white">
                  {a.name}
                </td>
                <td className="px-6 py-3 text-right dark:text-slate-300">
                  ${a.salary.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-right font-bold text-purple-600">
                  {((a.salary / totalSalary) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
            <tr className="bg-slate-100 dark:bg-slate-950 font-bold">
              <td className="px-6 py-3">TOTAL</td>
              <td className="px-6 py-3 text-right">
                ${totalSalary.toLocaleString()}
              </td>
              <td className="px-6 py-3 text-right">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 5. RVM FINAL PERCENTAGE ---
const RvmFinalPercentage = ({ workOrders }) => {
  // Calculate Invoice % from Work Orders
  const totalInv = workOrders.reduce((acc, curr) => acc + curr.invoice, 0);
  const invoicePercs = RVMS.reduce((acc, rvm) => {
    const sum = workOrders
      .filter((w) => w.rvm === rvm)
      .reduce((a, b) => a + b.invoice, 0);
    acc[rvm] = totalInv ? (sum / totalInv) * 100 : 0;
    return acc;
  }, {});

  // State for inputs
  const [rvmData, setRvmData] = useState(
    RVMS.map((r) => ({ name: r, rfo: 100, states: 5, crew: 10 }))
  );

  // Calculations
  const lowestRfo = Math.min(...rvmData.map((r) => r.rfo)) || 1;
  const totalStates = rvmData.reduce((acc, r) => acc + r.states, 0) || 1;
  const totalCrew = rvmData.reduce((acc, r) => acc + r.crew, 0) || 1;

  const processed = rvmData.map((r) => {
    const rfoPerc = (r.rfo / lowestRfo) * 100; // Logic check: Higher RFO usually bad? User said RVM RFO / Lowest RFO.
    const statePerc = (r.states / totalStates) * 100;
    const crewPerc = (r.crew / totalCrew) * 100;
    const invPerc = invoicePercs[r.name] || 0;

    // Weighted Final
    const finalRaw =
      rfoPerc * 0.2 + statePerc * 0.15 + crewPerc * 0.15 + invPerc * 0.5;
    return { ...r, rfoPerc, statePerc, crewPerc, invPerc, finalRaw };
  });

  const sumFinalRaw = processed.reduce((acc, r) => acc + r.finalRaw, 0) || 1;

  const handleUpdate = (idx, field, val) => {
    const newData = [...rvmData];
    newData[idx][field] = parseFloat(val) || 0;
    setRvmData(newData);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto animate-fade-in">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase text-xs">
          <tr>
            <th>RVM</th>
            <th className="text-right">RFO</th>
            <th className="text-right">States</th>
            <th className="text-right">Crew</th>
            <th className="text-right">RFO%</th>
            <th className="text-right">State%</th>
            <th className="text-right">Crew%</th>
            <th className="text-right">Inv%</th>
            <th className="text-right">Final% (Calc)</th>
            <th className="text-right bg-orange-100 text-orange-800">
              Final Normalized
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {processed.map((r, i) => (
            <tr key={r.name}>
              <td className="px-4 py-2 font-bold dark:text-white">{r.name}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-16 text-right bg-transparent border-b border-slate-300"
                  value={r.rfo}
                  onChange={(e) => handleUpdate(i, "rfo", e.target.value)}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-16 text-right bg-transparent border-b border-slate-300"
                  value={r.states}
                  onChange={(e) => handleUpdate(i, "states", e.target.value)}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-16 text-right bg-transparent border-b border-slate-300"
                  value={r.crew}
                  onChange={(e) => handleUpdate(i, "crew", e.target.value)}
                />
              </td>
              <td className="px-4 py-2 text-right text-slate-500">
                {r.rfoPerc.toFixed(1)}%
              </td>
              <td className="px-4 py-2 text-right text-slate-500">
                {r.statePerc.toFixed(1)}%
              </td>
              <td className="px-4 py-2 text-right text-slate-500">
                {r.crewPerc.toFixed(1)}%
              </td>
              <td className="px-4 py-2 text-right text-slate-500">
                {r.invPerc.toFixed(1)}%
              </td>
              <td className="px-4 py-2 text-right font-medium">
                {r.finalRaw.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-right font-bold text-orange-600 bg-orange-50">
                {((r.finalRaw / sumFinalRaw) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- 6. PROFIT SHARE DASHBOARD ---
const ProfitShareDashboard = ({ workOrders }) => {
  // 1. Company Input State
  const [companies, setCompanies] = useState(
    COMPANIES.map((c) => ({ name: c, profit: 0 }))
  );
  const [extraInput, setExtraInput] = useState(0); // For part 6 total
  const [ctMembers, setCtMembers] = useState([]); // Selected CT members

  // --- PART 1 CALCULATIONS ---
  const processedCompanies = companies.map((c) => {
    const shareAmt = c.profit > 3500 ? c.profit * 0.1 : 0;
    const bdtShare = shareAmt * 110;
    return {
      ...c,
      shareAmt,
      bdtShare,
      ct: bdtShare * 0.25,
      rvm: bdtShare * 0.3,
      analyst: bdtShare * 0.25,
      admin: bdtShare * 0.2,
      other: bdtShare * 0.06,
    };
  });

  // Totals from Part 1
  const totals = processedCompanies.reduce(
    (acc, c) => ({
      profit: acc.profit + c.profit,
      shareAmt: acc.shareAmt + c.shareAmt,
      bdtShare: acc.bdtShare + c.bdtShare,
      ct: acc.ct + c.ct,
      rvm: acc.rvm + c.rvm,
      analyst: acc.analyst + c.analyst,
      admin: acc.admin + c.admin,
      other: acc.other + c.other,
    }),
    {
      profit: 0,
      shareAmt: 0,
      bdtShare: 0,
      ct: 0,
      rvm: 0,
      analyst: 0,
      admin: 0,
      other: 0,
    }
  );

  // --- PART 2: RVM SHARE ---
  // Note: Re-using logic from RvmFinalPercentage for "Percentage" column simulation
  const rvmShares = RVMS.map((r) => {
    const perc = 50; // Simplified 50-50 split for mock. Real app needs shared state context.
    return { name: r, perc, amt: totals.rvm * (perc / 100) };
  });

  // --- PART 3: ANALYST SHARE ---
  const totalInv = workOrders.reduce((acc, curr) => acc + curr.invoice, 0) || 1;
  const analystShares = ANALYSTS.map((a) => {
    const sum = workOrders
      .filter((w) => w.analyst === a)
      .reduce((acc, curr) => acc + curr.invoice, 0);
    const perc = sum / totalInv;
    return { name: a, perc: perc * 100, amt: totals.analyst * perc };
  });

  // --- PART 4: ADMIN SHARE ---
  const adminShares = ADMINS.map((a) => ({
    name: a,
    perc: 33.3,
    amt: totals.admin * 0.333,
  }));

  // --- PART 5: CT TEAM ---
  const ctSharePerMember =
    ctMembers.length > 0 ? totals.other / ctMembers.length : 0;

  // --- PART 6: TOTALS ---
  const totalProfitShare =
    totals.ct + totals.rvm + totals.analyst + totals.admin + extraInput;
  const totalDisbursement =
    rvmShares.reduce((a, b) => a + b.amt, 0) +
    analystShares.reduce((a, b) => a + b.amt, 0) +
    adminShares.reduce((a, b) => a + b.amt, 0) +
    ctSharePerMember * ctMembers.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* PART 1: Company Wise */}
      <Section title="1. Company Profit Share Summary">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#030F1D] text-white uppercase font-bold">
            <tr>
              <th className="p-2">Company</th>
              <th className="p-2 text-right">Profit</th>
              <th className="p-2 text-right">Share ($)</th>
              <th className="p-2 text-right">Share (BDT)</th>
              <th className="p-2 text-right">CT (25%)</th>
              <th className="p-2 text-right">RVM (30%)</th>
              <th className="p-2 text-right">Analyst (25%)</th>
              <th className="p-2 text-right">Admin (20%)</th>
              <th className="p-2 text-right">Other (6%)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {processedCompanies.map((c, i) => (
              <tr
                key={c.name}
                className="hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <td className="p-2 font-bold dark:text-white">{c.name}</td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-20 text-right bg-transparent border-b border-slate-300"
                    value={c.profit}
                    onChange={(e) => {
                      const newC = [...companies];
                      newC[i].profit = parseFloat(e.target.value) || 0;
                      setCompanies(newC);
                    }}
                  />
                </td>
                <td className="p-2 text-right text-slate-500">
                  ${c.shareAmt.toFixed(0)}
                </td>
                <td className="p-2 text-right font-bold">
                  ৳{c.bdtShare.toFixed(0)}
                </td>
                <td className="p-2 text-right text-slate-500">
                  ৳{c.ct.toFixed(0)}
                </td>
                <td className="p-2 text-right text-slate-500">
                  ৳{c.rvm.toFixed(0)}
                </td>
                <td className="p-2 text-right text-slate-500">
                  ৳{c.analyst.toFixed(0)}
                </td>
                <td className="p-2 text-right text-slate-500">
                  ৳{c.admin.toFixed(0)}
                </td>
                <td className="p-2 text-right text-slate-500">
                  ৳{c.other.toFixed(0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="2. RVM Share Distribution">
          <ShareList items={rvmShares} total={totals.rvm} />
        </Section>
        <Section title="3. Analyst Share Distribution">
          <ShareList items={analystShares} total={totals.analyst} />
        </Section>
        <Section title="4. Admin Share Distribution">
          <ShareList items={adminShares} total={totals.admin} />
        </Section>
        <Section title="5. CT Team Share">
          <div className="p-2 flex gap-2 flex-wrap mb-2">
            {["CT1", "CT2", "CT3", "CT4"].map((m) => (
              <button
                key={m}
                onClick={() =>
                  ctMembers.includes(m)
                    ? setCtMembers(ctMembers.filter((x) => x !== m))
                    : setCtMembers([...ctMembers, m])
                }
                className={`text-xs px-2 py-1 rounded border ${
                  ctMembers.includes(m)
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-slate-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th>Member</th>
                <th className="text-right">Amount (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {ctMembers.map((m) => (
                <tr key={m}>
                  <td>{m}</td>
                  <td className="text-right">৳{ctSharePerMember.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>

      {/* PART 6 */}
      <div className="bg-[#030F1D] text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-sm font-bold text-slate-400 uppercase">
            Total Profit Share Fund
          </p>
          <p className="text-3xl font-bold">
            ৳{totalProfitShare.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-400">Add. Input:</span>
            <input
              type="number"
              className="w-20 bg-white/10 border-none text-white text-xs rounded p-1"
              value={extraInput}
              onChange={(e) => setExtraInput(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="h-12 w-px bg-white/20 hidden md:block"></div>
        <div>
          <p className="text-sm font-bold text-slate-400 uppercase">
            Total Disbursed
          </p>
          <p
            className={`text-3xl font-bold ${
              Math.abs(totalDisbursement - totalProfitShare) < 100
                ? "text-emerald-400"
                : "text-orange-400"
            }`}
          >
            ৳{totalDisbursement.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---
const Section = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <div className="bg-slate-50 dark:bg-slate-950 p-3 font-bold text-sm text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
      {title}
    </div>
    <div className="p-0 overflow-x-auto">{children}</div>
  </div>
);

const ShareList = ({ items, total }) => (
  <table className="w-full text-left text-xs">
    <thead>
      <tr>
        <th className="p-2">Name</th>
        <th className="p-2 text-right">Perc%</th>
        <th className="p-2 text-right">Amount</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {items.map((i) => (
        <tr key={i.name}>
          <td className="p-2 font-medium">{i.name}</td>
          <td className="p-2 text-right">{i.perc.toFixed(1)}%</td>
          <td className="p-2 text-right font-bold text-blue-600">
            ৳{i.amt.toFixed(0)}
          </td>
        </tr>
      ))}
      <tr className="bg-slate-100 font-bold">
        <td className="p-2">TOTAL</td>
        <td className="p-2"></td>
        <td className="p-2 text-right">৳{total.toFixed(0)}</td>
      </tr>
    </tbody>
  </table>
);

// --- MAIN COMPONENT ---
const ProfitShare = ({ activeTab }) => {
  // Shared State for Work Orders (feeds multiple children)
  const [workOrders, setWorkOrders] = useState([
    {
      id: 1,
      date: "2025-10-01",
      wo: "WO-9901",
      invoice: 500,
      rvm: "Sarah Jenkins",
      analyst: "David Kim",
    },
    {
      id: 2,
      date: "2025-10-05",
      wo: "WO-9902",
      invoice: 1200,
      rvm: "Michael Chen",
      analyst: "Jessica Low",
    },
  ]);

  const handleAddWO = (newWO) => setWorkOrders([...workOrders, newWO]);

  return (
    <div className="min-h-[500px]">
      {/* Common Date Filter for all Profit Share tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-lg border dark:border-slate-800 shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input
            type="month"
            className="bg-transparent text-sm outline-none dark:text-white"
            defaultValue="2025-10"
          />
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {activeTab === "wo-profit" && (
        <WorkOrderProfit data={workOrders} onAdd={handleAddWO} />
      )}
      {activeTab === "analyst-share" && (
        <ShareTable
          title="Analyst Profit Share"
          data={workOrders}
          type="analyst"
        />
      )}
      {activeTab === "rvm-share" && (
        <ShareTable title="RVM Profit Share" data={workOrders} type="rvm" />
      )}
      {activeTab === "admin-share" && <AdminProfitShare />}
      {activeTab === "rvm-final" && (
        <RvmFinalPercentage workOrders={workOrders} />
      )}
      {activeTab === "profit-dash" && (
        <ProfitShareDashboard workOrders={workOrders} />
      )}
    </div>
  );
};

export default ProfitShare;
