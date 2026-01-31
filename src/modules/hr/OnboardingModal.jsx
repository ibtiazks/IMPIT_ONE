import React, { useState } from "react";
import { X, Camera, UploadCloud, FileCheck, Save } from "lucide-react";

const OnboardingModal = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    nid: "",
    phone: "",
    blood: "A+",
    address: "",
    designation: "",
    dept: "Operations",
    reporting: "",
    joining: "",
    salary: "",
    houseRent: "",
    medical: "",
    conveyance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "salary") {
        const basic = parseFloat(value) || 0;
        newData.houseRent = (basic * 0.5).toFixed(0);
      }
      return newData;
    });
  };

  const handleComplete = () => {
    if (!formData.name || !formData.designation) {
      alert("Please fill in required fields.");
      return;
    }
    const newEmployee = {
      id: `IMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      role: formData.designation,
      dept: formData.dept,
      email: `${formData.name.split(" ")[0].toLowerCase()}@impit.us`,
      phone: formData.phone,
      joinDate: formData.joining || new Date().toISOString().split("T")[0],
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100",
      salary: formData.salary,
      houseRent: formData.houseRent,
      medical: formData.medical,
      conveyance: formData.conveyance,
    };
    onSave(newEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="bg-[#030F1D] p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h3 className="text-xl font-extrabold text-white">
              Employee Onboarding
            </h3>
            <p className="text-blue-200/60 text-sm">Step {step} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-lg font-bold text-orange-500 mb-4">
                Step 1: Personal Metadata
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 flex justify-center mb-4">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 cursor-pointer hover:bg-slate-200 transition-colors">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    NID Number
                  </label>
                  <input
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Blood Group
                  </label>
                  <select
                    name="blood"
                    value={formData.blood}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  >
                    <option>A+</option>
                    <option>B+</option>
                    <option>O+</option>
                    <option>AB+</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Present Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none h-20 dark:text-white"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-lg font-bold text-orange-500 mb-4">
                Step 2: Official Information
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Designation
                  </label>
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Department
                  </label>
                  <select
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  >
                    <option>Operations</option>
                    <option>Quality</option>
                    <option>HR</option>
                    <option>IT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Reporting To
                  </label>
                  <select
                    name="reporting"
                    value={formData.reporting}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  >
                    <option>Md Nayeeb (Super Admin)</option>
                    <option>Manager A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Joining Date
                  </label>
                  <input
                    name="joining"
                    value={formData.joining}
                    onChange={handleChange}
                    type="date"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-lg font-bold text-orange-500 mb-4">
                Step 3: Salary Structure (BD Labour Law)
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Basic Salary
                  </label>
                  <input
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                    placeholder="৳"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    House Rent (50%)
                  </label>
                  <input
                    type="number"
                    value={formData.houseRent}
                    readOnly
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-slate-400 cursor-not-allowed"
                    placeholder="Auto-calc"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Medical Allowance
                  </label>
                  <input
                    name="medical"
                    value={formData.medical}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                    Conveyance
                  </label>
                  <input
                    name="conveyance"
                    value={formData.conveyance}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-orange-500 outline-none dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-lg font-bold text-orange-500 mb-4">
                Step 4: Documents
              </h4>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Upload Employment Contract
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF or Docx (Max 5MB)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                      Resume.pdf
                    </span>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-center text-slate-400 text-sm hover:text-orange-500 cursor-pointer border-dashed">
                    + Add Certificate
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between rounded-b-2xl">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className={`px-6 py-2 rounded-lg font-bold text-sm ${
              step === 1
                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (step < 4) setStep(step + 1);
              else handleComplete();
            }}
            className="px-6 py-2 bg-[#030F1D] dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:opacity-90 transition-colors"
          >
            {step === 4 ? "Complete" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
