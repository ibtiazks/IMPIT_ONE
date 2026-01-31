import React, { useState } from "react";
import {
  Search,
  Plus,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Globe,
  User,
  Shield,
  Key,
  Users,
  X,
  Check,
  MoreVertical,
  Trash2,
  Edit2,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_USERS = [
  { id: 1, name: "Sarah Jenkins", role: "Processing" },
  { id: 2, name: "Mike Chen", role: "RVM" },
  { id: 3, name: "Jessica Low", role: "Client Team" },
  { id: 4, name: "David Kim", role: "Admin" },
];

const INITIAL_CREDENTIALS = [
  {
    id: 1,
    serviceName: "AWS Console",
    url: "https://aws.amazon.com/console/",
    username: "admin@impitone.com",
    password: "SecurePassword123!",
    code: "882931",
    assignedTo: [1, 2], // IDs of users who can see this
    category: "Infrastructure",
  },
  {
    id: 2,
    serviceName: "Jira Software",
    url: "https://impitone.atlassian.net",
    username: "pm@impitone.com",
    password: "JiraPass#9988",
    code: "",
    assignedTo: [1, 3, 4],
    category: "Productivity",
  },
  {
    id: 3,
    serviceName: "Chase Bank (Corp)",
    url: "https://chase.com",
    username: "finance_admin",
    password: "BankPassword$$$",
    code: "1102",
    assignedTo: [4],
    category: "Finance",
  },
];

// --- COMPONENTS ---

const CredentialCard = ({ cred, users, onEdit, onDelete, onCopy, isAdmin }) => {
  const [showPass, setShowPass] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Get names of assigned users
  const assignedNames = users
    .filter((u) => cred.assignedTo.includes(u.id))
    .map((u) => u.name);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">
              {cred.serviceName}
            </h3>
            <a
              href={cred.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-500 hover:underline truncate max-w-[200px] block"
            >
              {cred.url}
            </a>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(cred)}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-blue-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(cred.id)}
              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-slate-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="space-y-3">
        {/* Username */}
        <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center group/field">
          <div className="flex items-center gap-2 overflow-hidden">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
              {cred.username}
            </span>
          </div>
          <button
            onClick={() => onCopy(cred.username, "Username")}
            className="text-slate-400 hover:text-blue-500 opacity-0 group-hover/field:opacity-100 transition-opacity"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Password */}
        <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center group/field">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <Key className="w-4 h-4 text-slate-400 shrink-0" />
            <span
              className={`text-sm font-medium truncate ${
                showPass
                  ? "text-slate-700 dark:text-slate-300"
                  : "text-slate-400 tracking-widest"
              }`}
            >
              {showPass ? cred.password : "••••••••••••"}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPass(!showPass)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPass ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={() => onCopy(cred.password, "Password")}
              className="text-slate-400 hover:text-blue-500 opacity-0 group-hover/field:opacity-100 transition-opacity"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Code (2FA/Pin) */}
        {cred.code && (
          <div className="bg-orange-50 dark:bg-orange-900/10 p-2.5 rounded-lg border border-orange-100 dark:border-orange-800/30 flex justify-between items-center group/field">
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <Shield className="w-4 h-4 text-orange-500 shrink-0" />
              <span
                className={`text-sm font-bold truncate ${
                  showCode
                    ? "text-orange-700 dark:text-orange-300"
                    : "text-orange-300 tracking-widest"
                }`}
              >
                {showCode ? cred.code : "••• •••"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-orange-400 hover:text-orange-600"
              >
                {showCode ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => onCopy(cred.code, "Security Code")}
                className="text-orange-400 hover:text-orange-600 opacity-0 group-hover/field:opacity-100 transition-opacity"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer: Access Control */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Users className="w-3.5 h-3.5" />
          <span>Shared with:</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {assignedNames.length > 0 ? (
            assignedNames.map((name, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-400"
              >
                {name}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-slate-400 italic">
              Only Admin
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const AddEditModal = ({ isOpen, onClose, onSave, users, editingItem }) => {
  const [form, setForm] = useState(
    editingItem || {
      serviceName: "",
      url: "",
      username: "",
      password: "",
      code: "",
      assignedTo: [],
      category: "General",
    }
  );

  // Reset form when opening for new item
  React.useEffect(() => {
    setForm(
      editingItem || {
        serviceName: "",
        url: "",
        username: "",
        password: "",
        code: "",
        assignedTo: [],
        category: "General",
      }
    );
  }, [editingItem, isOpen]);

  const toggleUser = (userId) => {
    const current = form.assignedTo;
    if (current.includes(userId)) {
      setForm({ ...form, assignedTo: current.filter((id) => id !== userId) });
    } else {
      setForm({ ...form, assignedTo: [...current, userId] });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-[#030F1D] p-5 text-white flex justify-between items-center shrink-0">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Lock className="w-5 h-5" />{" "}
            {editingItem ? "Edit Credential" : "Add New Credential"}
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 hover:text-red-400 transition-colors" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Service Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              value={form.serviceName}
              onChange={(e) =>
                setForm({ ...form, serviceName: e.target.value })
              }
              placeholder="e.g. AWS Production"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              URL
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Username / Email
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>General</option>
                <option>Infrastructure</option>
                <option>Finance</option>
                <option>Social Media</option>
                <option>Productivity</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Password
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white font-mono"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Security Code (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white font-mono"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. 2FA Backup"
              />
            </div>
          </div>

          {/* Access Control */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Assign Visibility (Who can see this?)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {users.map((u) => (
                <div
                  key={u.id}
                  onClick={() => toggleUser(u.id)}
                  className={`p-2 rounded-lg border cursor-pointer flex items-center justify-between text-sm transition-all ${
                    form.assignedTo.includes(u.id)
                      ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <span>
                    {u.name}{" "}
                    <span className="text-[10px] opacity-70">({u.role})</span>
                  </span>
                  {form.assignedTo.includes(u.id) && (
                    <Check className="w-3 h-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-200 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 text-sm"
          >
            Save Credential
          </button>
        </div>
      </div>
    </div>
  );
};

const PasswordManager = () => {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Simulated User Role (In real app, this comes from Auth Context)
  const [currentUser] = useState({
    id: 999,
    name: "Admin User",
    role: "Super Admin",
  });
  const isAdmin = currentUser.role === "Super Admin";

  const filteredCredentials = credentials.filter(
    (c) =>
      c.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (data) => {
    if (editingItem) {
      setCredentials(
        credentials.map((c) =>
          c.id === editingItem.id ? { ...data, id: editingItem.id } : c
        )
      );
    } else {
      setCredentials([...credentials, { ...data, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this credential?")) {
      setCredentials(credentials.filter((c) => c.id !== id));
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    // In a real app, show a toast notification here
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-500" /> Password Manager
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Securely manage and assign access to team credentials.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search credentials..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isAdmin && (
            <button
              onClick={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#030F1D] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCredentials.map((cred) => (
          <CredentialCard
            key={cred.id}
            cred={cred}
            users={MOCK_USERS}
            isAdmin={isAdmin}
            onEdit={() => {
              setEditingItem(cred);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCredentials.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <Lock className="w-12 h-12 mb-4 opacity-20" />
          <p>No credentials found matching your search.</p>
        </div>
      )}

      {/* Modal */}
      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        users={MOCK_USERS}
        editingItem={editingItem}
      />
    </div>
  );
};

export default PasswordManager;
