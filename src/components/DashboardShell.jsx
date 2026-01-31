import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  LayoutGrid,
  Activity,
  Truck,
  UploadCloud,
  Users,
  Map,
  DollarSign,
  PieChart,
  Shield,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  Search,
  Sun,
  Moon,
  Clock,
  ChevronDown,
  Key,
  FileText,
  CalendarDays,
  BrainCircuit,
  FileClock, // NEW ICON
} from "lucide-react";
import { LogoSmall } from "./SharedComponents";

// --- IMPORT MODULES ---
import ImpitHome from "../modules/ImpitHome";
import MainDashboard from "../modules/MainDashboard";
import HRDashboard from "../modules/HRDashboard";
import Performance360 from "../modules/Performance360";
import Operations from "../modules/operations";
import DataIngestion from "../modules/DataIngestion";
import HRPayroll from "../modules/hr";
import VendorMap from "../modules/VendorMap";
import Financials from "../modules/financials";
import Reports from "../modules/reports";
import RolePermissions from "../modules/RolePermissions";
import PasswordManager from "../modules/PasswordManager";
import CompanyDrive from "../modules/CompanyDrive";
import InvoiceGenerator from "../modules/InvoiceGenerator";
import HolidaySetup from "../modules/HolidaySetup";
import Forecasting from "../modules/Forecasting";
import AuditLog from "../modules/AuditLog"; // NEW IMPORT

const DashboardShell = ({ onSignOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeModule, setActiveModule] = useState("home");
  const [expandedMenus, setExpandedMenus] = useState([
    "dashboard",
    "hr",
    "operations",
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notifRef = useRef(null);
  const settingsRef = useRef(null);

  const navItems = [
    { id: "home", label: "IMPIT Home", icon: Home },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      children: [
        { id: "dashboard-main", label: "Main Dashboard" },
        { id: "dashboard-hr", label: "HR Dashboard" },
      ],
    },
    { id: "performance", label: "Performance 360", icon: Activity },
    { id: "forecasting", label: "Forecasting", icon: BrainCircuit },
    {
      id: "operations",
      label: "Operations",
      icon: Truck,
      children: [
        { id: "ops-state-setup", label: "State Setup" },
        { id: "ops-rvm-grid", label: "RVM Orders" },
        { id: "ops-rvm-dashboard", label: "RVM Dashboard" },
        { id: "ops-processing-sheet", label: "Processing Sheet" },
        { id: "ops-ct-sheet", label: "CT Sheet" },
      ],
    },
    { id: "ingestion", label: "Data Ingestion", icon: UploadCloud },
    { id: "drive", label: "Company Drive", icon: UploadCloud },
    { id: "invoices", label: "Invoice Generator", icon: FileText },
    { id: "holidays", label: "Holiday Setup", icon: CalendarDays },
    {
      id: "hr",
      label: "HR & Payroll",
      icon: Users,
      children: [
        { id: "hr-directory", label: "Employee Directory" },
        { id: "hr-database", label: "Employee Database" },
        { id: "hr-attendance-upload", label: "Upload Attendance" },
        { id: "hr-attendance-log", label: "Attendance Log" },
        { id: "hr-payroll", label: "Payroll Center" },
        { id: "hr-hierarchy", label: "Org Chart" },
        { id: "hr-wo-profit", label: "WO Profit Calc" },
        { id: "hr-profit-dash", label: "Profit Dashboard" },
      ],
    },
    { id: "map", label: "Vendor Map", icon: Map },
    { id: "passwords", label: "Password Manager", icon: Key },
    { id: "audit", label: "Audit Log", icon: FileClock }, // NEW MENU ITEM
    { id: "finance", label: "Financials", icon: DollarSign },
    { id: "reports", label: "Reports", icon: PieChart },
    { id: "roles", label: "Role Permission", icon: Shield },
  ];

  // ... (rest of the component remains same, just adding route below)

  const notifications = [
    { id: 1, title: "New Work Order #2938", time: "5 min ago", type: "info" },
    {
      id: 2,
      title: "Invoice #901 Approved",
      time: "1 hour ago",
      type: "success",
    },
  ];

  useEffect(() => {
    if (document.documentElement.classList.contains("dark"))
      setIsDarkMode(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target))
        setShowNotifications(false);
      if (settingsRef.current && !settingsRef.current.contains(event.target))
        setShowSettings(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const toggleMenu = (menuId) => {
    if (expandedMenus.includes(menuId))
      setExpandedMenus(expandedMenus.filter((id) => id !== menuId));
    else setExpandedMenus([...expandedMenus, menuId]);
  };

  const renderContent = () => {
    if (activeModule === "home")
      return <ImpitHome setActiveModule={setActiveModule} />;

    if (activeModule === "dashboard" || activeModule === "dashboard-main")
      return <MainDashboard />;
    if (activeModule === "dashboard-hr") return <HRDashboard />;

    if (activeModule === "performance") return <Performance360 />;
    if (activeModule === "forecasting") return <Forecasting />;
    if (activeModule === "ingestion") return <DataIngestion />;
    if (activeModule === "drive") return <CompanyDrive />;
    if (activeModule === "invoices") return <InvoiceGenerator />;
    if (activeModule === "holidays") return <HolidaySetup />;
    if (activeModule === "audit") return <AuditLog />; // NEW ROUTE
    if (activeModule === "roles") return <RolePermissions />;
    if (activeModule === "map") return <VendorMap />;
    if (activeModule === "passwords") return <PasswordManager />;
    if (activeModule === "finance") return <Financials />;
    if (activeModule === "reports") return <Reports />;

    if (activeModule.startsWith("ops-"))
      return <Operations activeView={activeModule.replace("ops-", "")} />;
    if (activeModule.startsWith("hr-"))
      return <HRPayroll activeView={activeModule.replace("hr-", "")} />;

    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed animate-fade-in transition-colors">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300 mb-1">
          Module Under Development
        </h3>
      </div>
    );
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex transition-colors duration-300">
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[#030F1D] text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="shrink-0">
                <LogoSmall className="w-8 h-8 text-white" />
              </div>
              {isSidebarOpen && (
                <span className="font-extrabold text-xl tracking-tight whitespace-nowrap">
                  IMPIT<span className="text-orange-500">ONE</span>
                </span>
              )}
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        if (!isSidebarOpen) setIsSidebarOpen(true);
                        toggleMenu(item.id);
                      } else {
                        setActiveModule(item.id);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                      activeModule === item.id ||
                      (item.children &&
                        item.children.some(
                          (child) => child.id === activeModule
                        ))
                        ? "bg-orange-500 text-white shadow-lg dark:shadow-none"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 shrink-0 ${
                        activeModule === item.id
                          ? "text-white"
                          : "text-slate-400 group-hover:text-orange-400"
                      } transition-colors`}
                    />
                    <span
                      className={`font-medium text-sm whitespace-nowrap flex-1 text-left transition-all duration-300 ${
                        !isSidebarOpen && "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.children && isSidebarOpen && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMenus.includes(item.id) ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {item.children &&
                    expandedMenus.includes(item.id) &&
                    isSidebarOpen && (
                      <div className="mt-1 ml-4 border-l-2 border-white/10 pl-2 space-y-1 animate-fade-in">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setActiveModule(child.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              activeModule === child.id
                                ? "text-orange-400 font-bold bg-white/5"
                                : "text-slate-500 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                activeModule === child.id
                                  ? "bg-orange-500"
                                  : "bg-slate-600"
                              }`}
                            ></span>
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onSignOut}
              className={`w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors ${
                !isSidebarOpen && "justify-center"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-orange-500/50"
              />
              {isSidebarOpen && (
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">
                    Md Nayeeb
                  </p>
                  <p className="text-xs text-slate-400 truncate">Super Admin</p>
                </div>
              )}
              {isSidebarOpen && (
                <LogOut className="w-4 h-4 text-slate-500 hover:text-orange-500 transition-colors" />
              )}
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shadow-sm transition-colors">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (window.innerWidth >= 1024)
                    setIsSidebarOpen(!isSidebarOpen);
                  else setIsMobileOpen(true);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="hidden sm:block text-lg font-bold text-[#030F1D] dark:text-white">
                {navItems
                  .flatMap((i) => [i, ...(i.children || [])])
                  .find((n) => n.id === activeModule)?.label || "Overview"}
              </h1>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <div className="hidden md:flex relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-lg transition-colors ${
                    showNotifications
                      ? "bg-orange-50 dark:bg-orange-500/20 text-orange-600"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border border-white dark:border-slate-900 animate-pulse"></span>
                </button>
              </div>
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-lg transition-colors ${
                    showSettings
                      ? "bg-orange-50 dark:bg-orange-500/20 text-orange-600"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto h-full">{renderContent()}</div>
          </main>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #F97316; } .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; } .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #F97316; } @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}</style>
    </div>
  );
};

export default DashboardShell;
