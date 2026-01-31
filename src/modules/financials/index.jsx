import React, { useState } from "react";
import {
  FileText,
  CreditCard,
  AlertCircle,
  TrendingUp,
  Receipt,
  BarChart4,
  PieChart,
  List,
  Layout,
  ArrowRightLeft,
  Tags,
  Calculator,
  Users,
  Activity,
  Wallet,
  Briefcase,
  DollarSign,
  Send,
  ClipboardList,
  UserCheck,
} from "lucide-react";

// Sub-components
import ProfitLoss from "./ProfitLoss";
import ContractorPayments from "./ContractorPayments";
import ContractorDue from "./ContractorDue";
import Revenue from "./Revenue";
import CostSheet from "./CostSheet";
import IncomeStatement from "./IncomeStatement";
import ClientRevenue from "./ClientRevenue";
import PaymentTrackerDetails from "./PaymentTrackerDetails";
import PaymentTrackerSummary from "./PaymentTrackerSummary";
import TransferLedger from "./TransferLedger";
import OtherCostLedger from "./OtherCostLedger";
import TransferSummary from "./TransferSummary";
import ContractorSummary from "./ContractorSummary"; // <--- NEW IMPORT
import { OperatingFinance } from "./OperatingFinance";
import { OwnershipFinance } from "./OwnershipFinance";
import { CorporateSummary } from "./CorporateSummary";
import TransferOperations from "./TransferOperations";

const TABS = [
  { id: "pnl", label: "Profit & Loss", icon: FileText },
  { id: "payments", label: "Contractor Payments", icon: CreditCard },
  { id: "due", label: "Contractor Due", icon: AlertCircle },
  { id: "revenue", label: "Revenue", icon: TrendingUp },
  { id: "cost", label: "Cost Sheet", icon: Receipt },
  { id: "income", label: "Income Statement", icon: BarChart4 },
  { id: "client-rev", label: "Client Revenue", icon: PieChart },
  { id: "pay-details", label: "Payment Details", icon: List },
  { id: "pay-summary", label: "Payment Summary", icon: Layout },
  { id: "trans-ledger", label: "Transfer Ledger", icon: ArrowRightLeft },
  { id: "other-cost", label: "Other Cost", icon: Tags },
  { id: "trans-summary", label: "Transfer Summary", icon: Calculator },
  { id: "crew-payment", label: "Crew Payments", icon: Users },
  { id: "operating-dash", label: "Operating Dash", icon: Activity },
  { id: "expense-sheet", label: "Expense Sheet", icon: Receipt },
  { id: "chairman-share", label: "Chairman Share", icon: Wallet },
  { id: "owner-due", label: "Owner Due", icon: Briefcase },
  { id: "company-profit", label: "Company Profit", icon: DollarSign },
  { id: "fin-summary", label: "Fin Summary", icon: BarChart4 },
  { id: "work-type", label: "Work Type Analysis", icon: List },
  { id: "comp-gross", label: "Co. Gross Ops", icon: ClipboardList },
  { id: "transfer-sheet", label: "Transfer Sheet", icon: Send },
  { id: "summary-transfer", label: "Summary Transfer", icon: FileText },

  // --- NEW FINAL TAB ---
  { id: "contr-summary", label: "Contr. Summary", icon: UserCheck },
];

const Financials = () => {
  const [activeTab, setActiveTab] = useState("pnl");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white">
          Financial Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Track revenue, expenses, and profitability across the organization.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-[#030F1D] text-white shadow-lg shadow-blue-900/20"
                : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            <tab.icon
              className={`w-4 h-4 ${
                activeTab === tab.id ? "text-orange-500" : "text-slate-400"
              }`}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeTab === "pnl" && <ProfitLoss />}
        {activeTab === "payments" && <ContractorPayments />}
        {activeTab === "due" && <ContractorDue />}
        {activeTab === "revenue" && <Revenue />}
        {activeTab === "cost" && <CostSheet />}
        {activeTab === "income" && <IncomeStatement />}
        {activeTab === "client-rev" && <ClientRevenue />}
        {activeTab === "pay-details" && <PaymentTrackerDetails />}
        {activeTab === "pay-summary" && <PaymentTrackerSummary />}
        {activeTab === "trans-ledger" && <TransferLedger />}
        {activeTab === "other-cost" && <OtherCostLedger />}
        {activeTab === "trans-summary" && <TransferSummary />}
        {activeTab === "contr-summary" && <ContractorSummary />}{" "}
        {/* <--- NEW */}
        {/* Bundled Modules */}
        {["crew-payment", "operating-dash", "expense-sheet"].includes(
          activeTab
        ) && <OperatingFinance activeTab={activeTab} />}
        {["chairman-share", "owner-due"].includes(activeTab) && (
          <OwnershipFinance activeTab={activeTab} />
        )}
        {["company-profit", "fin-summary", "work-type"].includes(activeTab) && (
          <CorporateSummary activeTab={activeTab} />
        )}
        {["comp-gross", "transfer-sheet", "summary-transfer"].includes(
          activeTab
        ) && <TransferOperations activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default Financials;
