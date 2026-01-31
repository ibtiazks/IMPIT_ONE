import React, { useState } from "react";
import {
  Eye,
  Printer,
  X,
  FileText,
  ArrowLeft,
  Download,
  CheckCircle,
} from "lucide-react";
import { LogoSmall } from "../../components/SharedComponents";

// --- MOCK DATA ---
const BATCHES = [
  {
    id: "PAY-OCT-23",
    month: "October 2025",
    employees: 4,
    total: 241500,
    status: "Disbursed",
  },
  {
    id: "PAY-SEP-23",
    month: "September 2025",
    employees: 4,
    total: 238000,
    status: "Disbursed",
  },
];

const EMPLOYEES_DATA = [
  {
    id: "90",
    name: "Sarah Jenkins",
    designation: "Senior Processor",
    department: "Operations",
    joinDate: "1/16/2022",
    email: "sarah@impit.us",
    taxYear: "2025-2026",
    month: "October",
    payType: "Salary",
    salaryAcc: "2104077479001",
    bankName: "The City Bank PLC",
    paymentDate: "10/09/2025",
    tin: "123-456-7890",

    // Financials
    grossSalary: 45000,
    breakdown: {
      basic: 22500,
      house: 15750,
      conv: 3600,
      medical: 3150,
      others: 0,
    },
    bonuses: {
      kpi: 13652,
      attendance: 2000,
      birthday: 0,
      festival: 0,
      overtime: 0,
    },
    deductions: {
      leaveAdj: 0,
      lateAdj: 0,
      tds: 0,
      pf: 0,
      other: 0,
    },
    status: "Paid",
  },
  {
    id: "91",
    name: "Michael Chen",
    designation: "QC Specialist",
    department: "Quality",
    joinDate: "11/01/2022",
    email: "michael@impit.us",
    taxYear: "2025-2026",
    month: "October",
    payType: "Salary",
    salaryAcc: "2104077479002",
    bankName: "BRAC Bank",
    paymentDate: "10/09/2025",
    tin: "987-654-3210",

    grossSalary: 40000,
    breakdown: {
      basic: 20000,
      house: 14000,
      conv: 3200,
      medical: 2800,
      others: 0,
    },
    bonuses: {
      kpi: 5000,
      attendance: 2000,
      birthday: 0,
      festival: 0,
      overtime: 1500,
    },
    deductions: { leaveAdj: 500, lateAdj: 0, tds: 200, pf: 0, other: 0 },
    status: "Paid",
  },
];

const PayrollCenter = () => {
  const [viewMode, setViewMode] = useState("batches");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- CALCULATIONS ---
  const calculateTotals = (emp) => {
    const totalSalary = Object.values(emp.breakdown).reduce((a, b) => a + b, 0);
    const totalBonus = Object.values(emp.bonuses).reduce((a, b) => a + b, 0);
    const totalDeductions = Object.values(emp.deductions).reduce(
      (a, b) => a + b,
      0
    );
    const netPay = totalSalary + totalBonus - totalDeductions;
    return { totalSalary, totalBonus, totalDeductions, netPay };
  };

  // --- HANDLERS ---
  const handleViewBatch = (batch) => {
    setSelectedBatch(batch);
    setViewMode("employees");
  };
  const handleViewSlip = (emp) => {
    setSelectedEmployee(emp);
    setViewMode("slip");
  };
  const triggerPrint = () => setViewMode("print");

  const handleBack = () => {
    if (viewMode === "print") setViewMode("slip");
    else if (viewMode === "slip") setViewMode("employees");
    else if (viewMode === "employees") {
      setSelectedBatch(null);
      setViewMode("batches");
    }
  };

  // --- REUSABLE SLIP COMPONENT ---
  const PaySlipTemplate = ({ employee, isPrint = false }) => {
    const { totalSalary, totalBonus, totalDeductions, netPay } =
      calculateTotals(employee);

    return (
      <div
        className={`bg-white ${
          isPrint ? "w-[210mm] min-h-[297mm] p-[10mm]" : "w-full p-8"
        } text-slate-900 font-sans text-xs`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="text-orange-600">
              <LogoSmall className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                IMPIT<span className="text-orange-600">ONE</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Excellence in Operation
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold uppercase text-slate-800">
              Pay Slip
            </h2>
            <p className="font-medium text-slate-500">
              {employee.month}, {employee.taxYear.split("-")[0]}
            </p>
          </div>
        </div>

        {/* Employee & Bank Info Grid */}
        <div className="border-2 border-slate-800 mb-6">
          <div className="grid grid-cols-4 border-b border-slate-300">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Employee ID
            </div>
            <div className="p-2 border-r border-slate-300">{employee.id}</div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Month
            </div>
            <div className="p-2">{employee.month}</div>
          </div>
          <div className="grid grid-cols-4 border-b border-slate-300">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Employee Name
            </div>
            <div className="p-2 border-r border-slate-300 font-bold">
              {employee.name}
            </div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Pay Type
            </div>
            <div className="p-2">{employee.payType}</div>
          </div>
          <div className="grid grid-cols-4 border-b border-slate-300">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Designation
            </div>
            <div className="p-2 border-r border-slate-300">
              {employee.designation}
            </div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Salary A/C
            </div>
            <div className="p-2 font-mono">{employee.salaryAcc}</div>
          </div>
          <div className="grid grid-cols-4 border-b border-slate-300">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Department
            </div>
            <div className="p-2 border-r border-slate-300">
              {employee.department}
            </div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Bank Name
            </div>
            <div className="p-2">{employee.bankName}</div>
          </div>
          <div className="grid grid-cols-4 border-b border-slate-300">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Joining Date
            </div>
            <div className="p-2 border-r border-slate-300">
              {employee.joinDate}
            </div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Gross Salary
            </div>
            <div className="p-2 font-bold">
              {employee.grossSalary.toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-4 border-b border-slate-300">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Email
            </div>
            <div className="p-2 border-r border-slate-300 text-[10px]">
              {employee.email}
            </div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Net Payable
            </div>
            <div className="p-2 font-bold text-emerald-700">
              {netPay.toLocaleString()}
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Tax Year
            </div>
            <div className="p-2 border-r border-slate-300">
              {employee.taxYear}
            </div>
            <div className="p-2 font-bold bg-slate-100 border-r border-slate-300">
              Payment Date
            </div>
            <div className="p-2">{employee.paymentDate}</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mb-2 text-center font-bold uppercase underline tracking-wider">
          Payment Details
        </div>
        <div className="border-2 border-slate-800 grid grid-cols-3 mb-6">
          {/* Col 1: Salary Breakdown */}
          <div className="border-r-2 border-slate-800">
            <div className="p-2 font-bold text-center bg-slate-100 border-b border-slate-300">
              Salary Breakdown
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Basic Salary</span>
              <span>{employee.breakdown.basic.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>House Rent</span>
              <span>{employee.breakdown.house.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Transport Allw.</span>
              <span>{employee.breakdown.conv.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Medical Allw.</span>
              <span>{employee.breakdown.medical.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Others</span>
              <span>{employee.breakdown.others.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between font-bold bg-slate-50">
              <span>Total</span>
              <span>{totalSalary.toLocaleString()}</span>
            </div>
          </div>

          {/* Col 2: Gross Bonuses */}
          <div className="border-r-2 border-slate-800">
            <div className="p-2 font-bold text-center bg-slate-100 border-b border-slate-300">
              Gross Bonuses
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>KPI Bonus</span>
              <span>{employee.bonuses.kpi.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Attendance</span>
              <span>{employee.bonuses.attendance.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Birthday</span>
              <span>{employee.bonuses.birthday.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Festival</span>
              <span>{employee.bonuses.festival.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Overtime</span>
              <span>{employee.bonuses.overtime.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between font-bold bg-slate-50">
              <span>Total</span>
              <span>{totalBonus.toLocaleString()}</span>
            </div>
          </div>

          {/* Col 3: Gross Deductions */}
          <div>
            <div className="p-2 font-bold text-center bg-slate-100 border-b border-slate-300">
              Gross Deductions
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Leave Adj.</span>
              <span>{employee.deductions.leaveAdj.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Late Adj.</span>
              <span>{employee.deductions.lateAdj.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>TDS</span>
              <span>{employee.deductions.tds.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>PF</span>
              <span>{employee.deductions.pf.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between border-b border-slate-200">
              <span>Other</span>
              <span>{employee.deductions.other.toLocaleString()}</span>
            </div>
            <div className="p-2 flex justify-between font-bold bg-slate-50 text-red-600">
              <span>Total</span>
              <span>{totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] italic text-slate-500 mb-6">
          * All Currency in BDT
        </div>

        {/* TDS & Summary */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* TDS Info */}
          <table className="w-full text-center border-2 border-slate-800 h-fit">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-800">
                <td className="p-2 border-r border-slate-800">
                  TDS Challan No
                </td>
                <td className="p-2 border-r border-slate-800">Payment Date</td>
                <td className="p-2">TIN Number</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-r border-slate-800">-</td>
                <td className="p-2 border-r border-slate-800">-</td>
                <td className="p-2">{employee.tin}</td>
              </tr>
            </tbody>
          </table>

          {/* Payment Summary */}
          <table className="w-full border-2 border-slate-800">
            <thead>
              <tr>
                <th
                  colSpan="2"
                  className="bg-slate-100 p-2 border-b border-slate-800 text-center"
                >
                  Payment Summary
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-r border-slate-800 border-b border-slate-300">
                  Gross Salary
                </td>
                <td className="p-2 text-right border-b border-slate-300 font-bold">
                  {totalSalary.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="p-2 border-r border-slate-800 border-b border-slate-300">
                  Gross Bonus
                </td>
                <td className="p-2 text-right border-b border-slate-300 font-bold">
                  {totalBonus.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="p-2 border-r border-slate-800">
                  Gross Deductions
                </td>
                <td className="p-2 text-right text-red-600 font-bold">
                  {totalDeductions.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Net Pay */}
        <div className="border-4 border-slate-900 p-4 flex justify-between items-center text-lg bg-slate-50 mb-12">
          <span className="font-bold uppercase">Net Salary Payable</span>
          <span className="font-extrabold text-2xl">
            ৳{netPay.toLocaleString()}
          </span>
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center">
            <div className="w-40 border-b-2 border-slate-400 mb-2"></div>
            <p className="font-bold uppercase text-[10px]">
              Employee Signature
            </p>
          </div>
          <div className="text-center">
            <div className="w-40 border-b-2 border-slate-400 mb-2"></div>
            <p className="font-bold uppercase text-[10px]">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 1. LANDING: BATCH LIST
  if (viewMode === "batches") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Payroll Center
            </h2>
            <p className="text-sm text-slate-500">
              Manage monthly salary disbursements.
            </p>
          </div>
          <button className="bg-[#030F1D] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Generate New Batch
          </button>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Batch ID</th>
                <th className="px-6 py-4">Billing Period</th>
                <th className="px-6 py-4 text-center">Employees</th>
                <th className="px-6 py-4 text-right">Total Disbursed</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {BATCHES.map((batch) => (
                <tr
                  key={batch.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4 font-mono font-bold text-orange-600">
                    {batch.id}
                  </td>
                  <td className="px-6 py-4 font-medium dark:text-white">
                    {batch.month}
                  </td>
                  <td className="px-6 py-4 text-center dark:text-slate-300">
                    {batch.employees}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">
                    ৳{batch.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewBatch(batch)}
                      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 2. BATCH DETAILS
  if (viewMode === "employees") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Batch: {selectedBatch.id}
            </h2>
            <p className="text-sm text-slate-500">{selectedBatch.month}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4 text-right">Net Pay</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {EMPLOYEES_DATA.map((emp) => {
                const totals = calculateTotals(emp);
                return (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {emp.designation}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">
                      ৳{totals.netPay.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-bold">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewSlip(emp)}
                        className="text-sm font-bold text-orange-500 hover:underline"
                      >
                        View Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3. MODAL PREVIEW
  if (viewMode === "slip") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in bg-black/80 backdrop-blur-sm">
        <div className="bg-white w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[95vh]">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">
              Pay Slip Preview
            </h3>
            <button
              onClick={handleBack}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-100 p-8 flex justify-center">
            <div className="shadow-xl">
              <PaySlipTemplate employee={selectedEmployee} />
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded"
            >
              Close
            </button>
            <button
              onClick={triggerPrint}
              className="px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. PRINT VIEW
  if (viewMode === "print") {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-800 overflow-y-auto flex justify-center py-10 print:p-0 print:bg-white">
        <div className="fixed top-4 right-4 flex gap-2 print:hidden">
          <button
            onClick={handleBack}
            className="bg-white text-slate-800 px-4 py-2 rounded shadow font-bold hover:bg-slate-100"
          >
            Close Preview
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow font-bold flex items-center gap-2 hover:bg-blue-700"
          >
            <Printer className="w-4 h-4" /> Print Now
          </button>
        </div>
        <div id="printable-pay-slip">
          <PaySlipTemplate employee={selectedEmployee} isPrint={true} />
        </div>
        <style>{`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-pay-slip, #printable-pay-slip * { visibility: visible; }
                        #printable-pay-slip { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
                        @page { size: A4; margin: 0; }
                    }
                `}</style>
      </div>
    );
  }

  return null;
};

export default PayrollCenter;
