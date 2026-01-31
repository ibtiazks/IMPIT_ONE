import React, { useState } from "react";
import {
  Shield,
  Lock,
  Unlock,
  Eye,
  Edit,
  Trash2,
  Save,
  Users,
  Wifi,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X,
  Globe,
} from "lucide-react";

// --- MOCK DATA ---

const ROLES = ["Super Admin", "RVM", "Client Team", "Processing", "Admin"];

const MODULES = [
  { id: "dashboard", name: "Main Dashboard" },
  { id: "performance", name: "Performance 360" },
  { id: "forecasting", name: "Forecasting" },
  { id: "operations", name: "Operations (RVM/Processing)" },
  { id: "hr", name: "HR & Payroll" },
  { id: "finance", name: "Financials" },
  { id: "map", name: "Vendor Map" },
  { id: "drive", name: "Company Drive" },
  { id: "passwords", name: "Password Manager" },
  { id: "audit", name: "Audit Log" },
];

// Initial Permission Matrix
const INITIAL_PERMISSIONS = {
  RVM: { dashboard: ["view"], operations: ["view", "edit"], map: ["view"] },
  "Client Team": { dashboard: ["view"], finance: ["view"] },
  Processing: { operations: ["view", "edit"] },
  Admin: { hr: ["view", "edit"], drive: ["view", "edit", "delete"] },
  // Super Admin has everything by default logic
};

const INITIAL_USERS = [
  {
    id: 101,
    name: "Mike Chen",
    role: "RVM",
    ipLocked: true,
    accessExpiry: null,
  },
  {
    id: 102,
    name: "Jessica Low",
    role: "Client Team",
    ipLocked: true,
    accessExpiry: null,
  },
  {
    id: 103,
    name: "Sarah Jenkins",
    role: "Processing",
    ipLocked: true,
    accessExpiry: null,
  },
  {
    id: 104,
    name: "David Kim",
    role: "Admin",
    ipLocked: false,
    accessExpiry: new Date(Date.now() + 3600000).toISOString(),
  }, // 1 hour left
];

// --- COMPONENTS ---

const ToggleSwitch = ({ checked, onChange, disabled }) => (
  <div
    onClick={() => !disabled && onChange(!checked)}
    className={`w-10 h-5 rounded-full flex items-center p-1 cursor-pointer transition-colors ${
      checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <div
      className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    ></div>
  </div>
);

const IpAccessModal = ({ isOpen, onClose, user, onGrant }) => {
  const [hours, setHours] = useState(2);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#030F1D] p-5 text-white flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Globe className="w-5 h-5" /> Grant Remote Access
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Duration (Hours)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="24"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-bold text-lg text-center outline-none focus:border-blue-500"
              />
              <span className="text-slate-500 font-bold">Hours</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Access will automatically revoke
              after {hours} hours.
            </p>
          </div>

          <button
            onClick={() => onGrant(user.id, hours)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg flex justify-center items-center gap-2 transition-all"
          >
            <Unlock className="w-4 h-4" /> Enable Remote Access
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const RolePermissions = () => {
  const [activeTab, setActiveTab] = useState("roles"); // 'roles' | 'security'
  const [selectedRole, setSelectedRole] = useState("RVM");
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);
  const [userSecurity, setUserSecurity] = useState(INITIAL_USERS);

  // Modal State
  const [accessModalUser, setAccessModalUser] = useState(null);

  // --- ROLE LOGIC ---
  const togglePermission = (role, modId, type) => {
    if (role === "Super Admin") return; // Immutable

    const rolePerms = permissions[role] || {};
    const modPerms = rolePerms[modId] || [];

    let newModPerms;
    if (modPerms.includes(type)) {
      newModPerms = modPerms.filter((p) => p !== type);
    } else {
      newModPerms = [...modPerms, type];
    }

    setPermissions({
      ...permissions,
      [role]: {
        ...rolePerms,
        [modId]: newModPerms,
      },
    });
  };

  const getPermState = (role, modId, type) => {
    if (role === "Super Admin") return true;
    return permissions[role]?.[modId]?.includes(type) || false;
  };

  // --- SECURITY LOGIC ---
  const handleGrantAccess = (userId, hours) => {
    const expiry = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    setUserSecurity(
      userSecurity.map((u) =>
        u.id === userId ? { ...u, ipLocked: false, accessExpiry: expiry } : u
      )
    );
    setAccessModalUser(null);
  };

  const handleRevokeAccess = (userId) => {
    if (window.confirm("Immediately revoke remote access?")) {
      setUserSecurity(
        userSecurity.map((u) =>
          u.id === userId ? { ...u, ipLocked: true, accessExpiry: null } : u
        )
      );
    }
  };

  const calculateTimeLeft = (isoString) => {
    const diff = new Date(isoString) - new Date();
    if (diff <= 0) return "Expired";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}h ${m}m remaining`;
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-500" /> Role & Security
            Control
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage feature access permissions and IP security protocols.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("roles")}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "roles"
                ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users className="w-4 h-4" /> Role Permissions
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "security"
                ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Wifi className="w-4 h-4" /> IP Security
          </button>
        </div>
      </div>

      {/* --- TAB 1: ROLE PERMISSIONS --- */}
      {activeTab === "roles" && (
        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          {/* Role Sidebar */}
          <div className="w-full lg:w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-500 text-xs uppercase">
              Select Role
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                    selectedRole === role
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {role}
                  {selectedRole === role && (
                    <Shield className="w-4 h-4 fill-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  Permissions for{" "}
                  <span className="text-blue-600">{selectedRole}</span>
                </h2>
                {selectedRole === "Super Admin" && (
                  <p className="text-xs text-orange-500 font-bold mt-1 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Full access is locked for this
                    role.
                  </p>
                )}
              </div>
              <button className="px-4 py-2 bg-[#030F1D] text-white rounded-lg text-sm font-bold shadow hover:bg-slate-800 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <div className="grid grid-cols-12 gap-4 border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-xs font-bold text-slate-400 uppercase">
                <div className="col-span-6">Module Name</div>
                <div className="col-span-2 text-center">View</div>
                <div className="col-span-2 text-center">Edit / Create</div>
                <div className="col-span-2 text-center">Delete</div>
              </div>

              {MODULES.map((mod) => (
                <div
                  key={mod.id}
                  className="grid grid-cols-12 gap-4 items-center py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-lg px-2 transition-colors"
                >
                  <div className="col-span-6 font-medium text-slate-700 dark:text-slate-300 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    {mod.name}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <ToggleSwitch
                      checked={getPermState(selectedRole, mod.id, "view")}
                      onChange={() =>
                        togglePermission(selectedRole, mod.id, "view")
                      }
                      disabled={selectedRole === "Super Admin"}
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <ToggleSwitch
                      checked={getPermState(selectedRole, mod.id, "edit")}
                      onChange={() =>
                        togglePermission(selectedRole, mod.id, "edit")
                      }
                      disabled={selectedRole === "Super Admin"}
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <ToggleSwitch
                      checked={getPermState(selectedRole, mod.id, "delete")}
                      onChange={() =>
                        togglePermission(selectedRole, mod.id, "delete")
                      }
                      disabled={selectedRole === "Super Admin"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: IP SECURITY --- */}
      {activeTab === "security" && (
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-blue-50/50 dark:bg-blue-900/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-xl text-blue-600 dark:text-blue-300">
                <Wifi className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                  IP Enforcement Active
                </h2>
                <p className="text-sm text-slate-500">
                  System is currently locked to Office Network (192.168.x.x).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3" /> Security Protocol: ENFORCED
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {userSecurity.map((user) => (
                <div
                  key={user.id}
                  className={`relative p-5 rounded-2xl border transition-all ${
                    user.ipLocked
                      ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      : "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800 ring-1 ring-orange-200"
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {user.ipLocked ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-orange-600 bg-white px-2 py-1 rounded-full border border-orange-200 shadow-sm animate-pulse">
                        <Unlock className="w-3 h-3" /> Unlocked
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        user.ipLocked
                          ? "bg-slate-100 text-slate-500 dark:bg-slate-800"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">
                        {user.name}
                      </h4>
                      <p className="text-xs text-slate-500">{user.role}</p>
                    </div>
                  </div>

                  {!user.ipLocked && (
                    <div className="mb-4 p-3 bg-white/60 dark:bg-black/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Time Remaining
                      </p>
                      <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
                        {calculateTimeLeft(user.accessExpiry)}
                      </p>
                    </div>
                  )}

                  <div className="mt-2">
                    {user.ipLocked ? (
                      <button
                        onClick={() => setAccessModalUser(user)}
                        className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4 text-blue-500" /> Allow Remote
                        Access
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRevokeAccess(user.id)}
                        className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" /> Revoke & Lock
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <IpAccessModal
        isOpen={!!accessModalUser}
        onClose={() => setAccessModalUser(null)}
        user={accessModalUser}
        onGrant={handleGrantAccess}
      />
    </div>
  );
};

export default RolePermissions;
