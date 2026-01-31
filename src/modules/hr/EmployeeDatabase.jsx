import React, { useState } from "react";
import { Download, Filter, Search } from "lucide-react";

// --- MOCK DATA BASED ON EXCEL ---
const MOCK_DB = [
  {
    status: "Working",
    id: "11",
    name: "Zahid Hasan Shipu",
    virtual: "Tom",
    gender: "Male",
    dob: "1993-07-06",
    age: 32,
    joinDate: "2020-11-02",
    anniversary: "June",
    probationEnd: "",
    joinSalary: 18000,
    currSalary: 90000,
    address: "41/6, Chad Housing, Mohammadpur, Dhaka-1206",
    totalInc: 3,
    totalIncAmt: 72000,
    lastIncDate: "2025-03-01",
    lastIncAmt: 15000,
    tin: "277861673850",
    dept: "Business Operations",
    designation: "Manager",
    hierarchy: "Manager",
    level: 2,
    manager: "John",
    empType: "Permanent",
    location: "Office",
    resignation: "",
    nid: "1030839011",
    blood: "A+",
    bankAcc: "2103186282001",
    contact: "1775685431",
    email: "zahid.hasan0037@gmail.com",
    emerName: "Hasina Akter",
    emerContact: "1767663510",
    emerRel: "Mother",
    rating: 5,
    training: "Yes",
    promoCount: 1,
    nextReview: "2026-03-01",
    experience: "5 Years",
    growth: "400%",
    lastKpi: 5000,
    totalKpi: 25000,
    university: "Dhaka College",
    religion: "Islam",
    hometown: "Dhaka",
    living: "Mohammadpur",
    baRatio: "N/A",
    revenue: "N/A",
    remarks: "",
  },
  {
    status: "Resigned",
    id: "161",
    name: "Jannatul Ferdoushe",
    virtual: "Janate",
    gender: "Female",
    dob: "1993-04-12",
    age: 25,
    joinDate: "2025-03-10",
    anniversary: "March",
    probationEnd: "2025-06-10",
    joinSalary: 30000,
    currSalary: 30000,
    address: "Block J, Rd 10, house 321 bashundhara r/a",
    totalInc: 0,
    totalIncAmt: 0,
    lastIncDate: "",
    lastIncAmt: 0,
    tin: "",
    dept: "Client Management",
    designation: "Key Accounts Executive",
    hierarchy: "Executive",
    level: 1,
    manager: "Labib",
    empType: "Permanent",
    location: "Office",
    resignation: "2026-01-07",
    nid: "9153952347",
    blood: "B+",
    bankAcc: "2104458046001",
    contact: "1776274768",
    email: "jannatulritu402@gmail.com",
    emerName: "Md Towhidul",
    emerContact: "01726828637",
    emerRel: "Brother",
    rating: 3,
    training: "No",
    promoCount: 0,
    nextReview: "",
    experience: "0.8 Years",
    growth: "0%",
    lastKpi: 0,
    totalKpi: 0,
    university: "NSU",
    religion: "Islam",
    hometown: "Comilla",
    living: "Vatara",
    baRatio: "",
    revenue: "",
    remarks: "Resigned for higher studies",
  },
];

const EmployeeDatabase = () => {
  const [data] = useState(MOCK_DB);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Master Employee Database
          </h2>
          <p className="text-sm text-slate-500">Full organizational records.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Massive Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#030F1D] text-white font-bold uppercase">
              <tr>
                <th className="p-3 sticky left-0 bg-[#030F1D] z-10 border-r border-slate-700">
                  Status
                </th>
                <th className="p-3 sticky left-[70px] bg-[#030F1D] z-10 border-r border-slate-700">
                  ID
                </th>
                <th className="p-3 sticky left-[110px] bg-[#030F1D] z-10 border-r border-slate-700">
                  Full Name
                </th>
                <th className="p-3">Virtual Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">DOB</th>
                <th className="p-3">Age</th>
                <th className="p-3">Joining Date</th>
                <th className="p-3">Anniversary</th>
                <th className="p-3">Probation End</th>
                <th className="p-3 text-right">Join Salary</th>
                <th className="p-3 text-right">Curr Salary</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-center">Total Incr.</th>
                <th className="p-3 text-right">Total Incr Amt</th>
                <th className="p-3">Last Incr Date</th>
                <th className="p-3 text-right">Last Incr Amt</th>
                <th className="p-3">TIN</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Hierarchy</th>
                <th className="p-3">Level</th>
                <th className="p-3">Manager</th>
                <th className="p-3">Type</th>
                <th className="p-3">Location</th>
                <th className="p-3">Resignation</th>
                <th className="p-3">NID/Passport</th>
                <th className="p-3">Blood</th>
                <th className="p-3">Bank Acc</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Email</th>
                <th className="p-3">Emerg. Name</th>
                <th className="p-3">Emerg. Contact</th>
                <th className="p-3">Relation</th>
                <th className="p-3 text-center">Rating</th>
                <th className="p-3 text-center">Training</th>
                <th className="p-3 text-center">Promotions</th>
                <th className="p-3">Next Review</th>
                <th className="p-3">Experience</th>
                <th className="p-3 text-right">Growth %</th>
                <th className="p-3 text-right">Last KPI</th>
                <th className="p-3 text-right">Total KPI</th>
                <th className="p-3">University</th>
                <th className="p-3">Religion</th>
                <th className="p-3">Hometown</th>
                <th className="p-3">Living Area</th>
                <th className="p-3">BA Ratio</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="p-3 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status === "Working"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 sticky left-[70px] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 font-mono text-slate-500">
                    {row.id}
                  </td>
                  <td className="p-3 sticky left-[110px] bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 font-bold text-slate-800 dark:text-white">
                    {row.name}
                  </td>
                  <td className="p-3 dark:text-slate-300">{row.virtual}</td>
                  <td className="p-3 dark:text-slate-300">{row.gender}</td>
                  <td className="p-3 dark:text-slate-300">{row.dob}</td>
                  <td className="p-3 dark:text-slate-300">{row.age}</td>
                  <td className="p-3 dark:text-slate-300">{row.joinDate}</td>
                  <td className="p-3 dark:text-slate-300">{row.anniversary}</td>
                  <td className="p-3 dark:text-slate-300">
                    {row.probationEnd}
                  </td>
                  <td className="p-3 text-right dark:text-slate-300">
                    {row.joinSalary.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-600">
                    {row.currSalary.toLocaleString()}
                  </td>
                  <td
                    className="p-3 dark:text-slate-300 max-w-[150px] truncate"
                    title={row.address}
                  >
                    {row.address}
                  </td>
                  <td className="p-3 text-center dark:text-slate-300">
                    {row.totalInc}
                  </td>
                  <td className="p-3 text-right dark:text-slate-300">
                    {row.totalIncAmt.toLocaleString()}
                  </td>
                  <td className="p-3 dark:text-slate-300">{row.lastIncDate}</td>
                  <td className="p-3 text-right dark:text-slate-300">
                    {row.lastIncAmt.toLocaleString()}
                  </td>
                  <td className="p-3 dark:text-slate-300">{row.tin}</td>
                  <td className="p-3 dark:text-slate-300">{row.dept}</td>
                  <td className="p-3 dark:text-slate-300">{row.designation}</td>
                  <td className="p-3 dark:text-slate-300">{row.hierarchy}</td>
                  <td className="p-3 dark:text-slate-300">{row.level}</td>
                  <td className="p-3 dark:text-slate-300">{row.manager}</td>
                  <td className="p-3 dark:text-slate-300">{row.empType}</td>
                  <td className="p-3 dark:text-slate-300">{row.location}</td>
                  <td className="p-3 text-red-500 font-bold">
                    {row.resignation}
                  </td>
                  <td className="p-3 dark:text-slate-300">{row.nid}</td>
                  <td className="p-3 dark:text-slate-300">{row.blood}</td>
                  <td className="p-3 dark:text-slate-300">{row.bankAcc}</td>
                  <td className="p-3 dark:text-slate-300">{row.contact}</td>
                  <td className="p-3 dark:text-slate-300">{row.email}</td>
                  <td className="p-3 dark:text-slate-300">{row.emerName}</td>
                  <td className="p-3 dark:text-slate-300">{row.emerContact}</td>
                  <td className="p-3 dark:text-slate-300">{row.emerRel}</td>
                  <td className="p-3 text-center font-bold text-orange-500">
                    {row.rating}
                  </td>
                  <td className="p-3 text-center dark:text-slate-300">
                    {row.training}
                  </td>
                  <td className="p-3 text-center dark:text-slate-300">
                    {row.promoCount}
                  </td>
                  <td className="p-3 dark:text-slate-300">{row.nextReview}</td>
                  <td className="p-3 dark:text-slate-300">{row.experience}</td>
                  <td className="p-3 text-right text-blue-600 font-bold">
                    {row.growth}
                  </td>
                  <td className="p-3 text-right dark:text-slate-300">
                    {row.lastKpi}
                  </td>
                  <td className="p-3 text-right dark:text-slate-300">
                    {row.totalKpi}
                  </td>
                  <td className="p-3 dark:text-slate-300">{row.university}</td>
                  <td className="p-3 dark:text-slate-300">{row.religion}</td>
                  <td className="p-3 dark:text-slate-300">{row.hometown}</td>
                  <td className="p-3 dark:text-slate-300">{row.living}</td>
                  <td className="p-3 dark:text-slate-300">{row.baRatio}</td>
                  <td className="p-3 dark:text-slate-300">{row.revenue}</td>
                  <td className="p-3 dark:text-slate-300 italic">
                    {row.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDatabase;
