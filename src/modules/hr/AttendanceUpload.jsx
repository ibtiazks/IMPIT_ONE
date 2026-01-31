import React, { useState } from "react";
import { UploadCloud, FileText, CheckCircle, AlertCircle } from "lucide-react";

const AttendanceUpload = () => {
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error

  const handleUpload = () => {
    setStatus("uploading");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Upload TipShoi Data
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Upload the daily attendance CSV/Excel file exported from the biometric
          device.
        </p>

        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 mb-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
          <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Click to browse or drag file here
          </p>
          <p className="text-xs text-slate-400 mt-1">Supports .csv, .xlsx</p>
        </div>

        {status === "idle" && (
          <button
            onClick={handleUpload}
            className="bg-[#030F1D] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
          >
            Process Attendance
          </button>
        )}

        {status === "uploading" && (
          <div className="flex items-center justify-center gap-2 text-blue-600 font-bold animate-pulse">
            <UploadCloud className="w-5 h-5" /> Processing Data...
          </div>
        )}

        {status === "success" && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-lg flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <div className="text-left">
              <p className="font-bold text-sm">Upload Successful!</p>
              <p className="text-xs opacity-90">
                Processed 45 records. Check Attendance Log for details.
              </p>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="ml-auto text-xs font-bold underline"
            >
              Upload Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceUpload;
