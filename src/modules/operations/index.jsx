import React from "react";
import { Truck } from "lucide-react";

// Sub-module imports
import StateSetup from "./StateSetup";
import RVMGrid from "./RVMGrid";
import RVMDashboard from "./RVMDashboard";
import ProcessingSheet from "./ProcessingSheet";
import CTSheet from "./CTSheet"; // <--- ADDED IMPORT

const Operations = ({ activeView }) => {
  return (
    <div className="min-h-[600px]">
      {activeView === "state-setup" && <StateSetup />}
      {activeView === "rvm-grid" && <RVMGrid />}
      {activeView === "rvm-dashboard" && <RVMDashboard />}
      {activeView === "processing-sheet" && <ProcessingSheet />}
      {activeView === "ct-sheet" && <CTSheet />} {/* <--- ADDED RENDER */}
      {!activeView && (
        <div className="flex flex-col items-center justify-center h-96 text-slate-400">
          <Truck className="w-16 h-16 mb-4 text-slate-300" />
          <h3 className="text-lg font-bold">Select an Operations Module</h3>
        </div>
      )}
    </div>
  );
};

export default Operations;
