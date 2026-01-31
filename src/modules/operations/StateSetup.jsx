import React, { useState } from "react";
import {
  UserPlus,
  MapPin,
  Edit2,
  Trash2,
  Save,
  X,
  Plus,
  Truck,
  Briefcase,
  ToggleLeft,
  ToggleRight,
  Search,
  Building2,
  Phone,
  Mail,
  CreditCard,
  User,
  // Note: CheckCircle is NOT imported here to avoid conflict with local icon
} from "lucide-react";

// --- MOCK DATABASES ---
const INITIAL_CONTRACTORS = [
  {
    id: 101,
    name: "Apex Property Sol",
    status: "Active",
    address: "123 Main St",
    state: "TX",
    zip: "75001",
    phone: "555-0101",
    email: "contact@apex.com",
    paymentInfo: "ACH: ****8892",
  },
  {
    id: 102,
    name: "FixIt Bros",
    status: "Inactive",
    address: "456 Oak Ave",
    state: "OK",
    zip: "73001",
    phone: "555-0102",
    email: "info@fixit.com",
    paymentInfo: "Check Mailed",
  },
  {
    id: 103,
    name: "Metro Maintenance",
    status: "Active",
    address: "789 Broadway",
    state: "NY",
    zip: "10001",
    phone: "555-0103",
    email: "metro@maint.com",
    paymentInfo: "Wire Transfer",
  },
];

const INITIAL_CLIENTS = [
  {
    id: 201,
    name: "Wells Fargo",
    status: "Active",
    address: "420 Montgomery St",
    state: "CA",
    zip: "94104",
    contactPerson: "John Doe",
    email: "vendor.mgmt@wellsfargo.com",
  },
  {
    id: 202,
    name: "Chase",
    status: "Active",
    address: "270 Park Ave",
    state: "NY",
    zip: "10017",
    contactPerson: "Jane Smith",
    email: "assets@chase.com",
  },
];

const INITIAL_RVMS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    states: [
      { name: "Texas", code: "TX" },
      { name: "Oklahoma", code: "OK" },
    ],
    contractorIds: [101, 102], // Mapped by ID
    clientIds: [201], // Mapped by ID
  },
  {
    id: 2,
    name: "Michael Chen",
    states: [{ name: "New York", code: "NY" }],
    contractorIds: [103],
    clientIds: [202],
  },
];

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded text-xs font-bold ${
      status === "Active"
        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
    }`}
  >
    {status}
  </span>
);

const SearchBar = ({ placeholder, value, onChange }) => (
  <div className="relative w-64">
    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-orange-500 dark:text-white"
    />
  </div>
);

// --- MAIN COMPONENT ---

const StateSetup = () => {
  const [view, setView] = useState("rvms"); // 'rvms' | 'contractors' | 'clients'

  // Data State
  const [rvms, setRvms] = useState(INITIAL_RVMS);
  const [contractors, setContractors] = useState(INITIAL_CONTRACTORS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Holds the full object being edited
  const [modalType, setModalType] = useState(null); // 'rvm' | 'contractor' | 'client'

  // --- RVM FORM STATE ---
  const [rvmForm, setRvmForm] = useState({
    name: "",
    states: [],
    contractorIds: [],
    clientIds: [],
  });
  const [tempState, setTempState] = useState({ name: "", code: "" });

  // --- CONTRACTOR/CLIENT FORM STATE ---
  const [resourceForm, setResourceForm] = useState({
    name: "",
    status: "Active",
    address: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    paymentInfo: "",
    contactPerson: "",
  });

  // --- ACTIONS ---

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);

    if (type === "rvm") {
      if (item) setRvmForm({ ...item });
      else
        setRvmForm({ name: "", states: [], contractorIds: [], clientIds: [] });
    } else {
      // Contractor or Client
      if (item) setResourceForm({ ...item });
      else
        setResourceForm({
          name: "",
          status: "Active",
          address: "",
          state: "",
          zip: "",
          phone: "",
          email: "",
          paymentInfo: "",
          contactPerson: "",
        });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalType === "rvm") {
      if (!rvmForm.name) return alert("Name is required");
      if (editingItem) {
        setRvms(
          rvms.map((r) =>
            r.id === editingItem.id ? { ...rvmForm, id: editingItem.id } : r
          )
        );
      } else {
        setRvms([...rvms, { ...rvmForm, id: Date.now() }]);
      }
    } else if (modalType === "contractor") {
      if (!resourceForm.name) return alert("Name is required");
      if (editingItem) {
        setContractors(
          contractors.map((c) =>
            c.id === editingItem.id
              ? { ...resourceForm, id: editingItem.id }
              : c
          )
        );
      } else {
        setContractors([...contractors, { ...resourceForm, id: Date.now() }]);
      }
    } else if (modalType === "client") {
      if (!resourceForm.name) return alert("Name is required");
      if (editingItem) {
        setClients(
          clients.map((c) =>
            c.id === editingItem.id
              ? { ...resourceForm, id: editingItem.id }
              : c
          )
        );
      } else {
        setClients([...clients, { ...resourceForm, id: Date.now() }]);
      }
    }
    setIsModalOpen(false);
  };

  const toggleSelection = (listType, id) => {
    const key = listType === "contractor" ? "contractorIds" : "clientIds";
    const currentList = rvmForm[key];
    if (currentList.includes(id)) {
      setRvmForm({ ...rvmForm, [key]: currentList.filter((x) => x !== id) });
    } else {
      setRvmForm({ ...rvmForm, [key]: [...currentList, id] });
    }
  };

  // --- RENDERERS ---

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Nav */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
            State & Resource Setup
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage RVM territories, contractors, and client databases.
          </p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          {[
            { id: "rvms", label: "RVM Management", icon: User },
            { id: "contractors", label: "Contractor DB", icon: Truck },
            { id: "clients", label: "Client DB", icon: Building2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                view === tab.id
                  ? "bg-white dark:bg-slate-800 text-orange-600 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- VIEW 1: RVM MANAGEMENT --- */}
      {view === "rvms" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-end">
            <button
              onClick={() => handleOpenModal("rvm")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <UserPlus className="w-4 h-4" /> Add RVM
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">RVM Name</th>
                  <th className="px-6 py-4">Territories</th>
                  <th className="px-6 py-4">Assigned Resources</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rvms.map((rvm) => (
                  <tr
                    key={rvm.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                      {rvm.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {rvm.states.map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {s.code}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {rvm.contractorIds.length} Contractors
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {rvm.clientIds.length} Clients
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal("rvm", rvm)}
                        className="text-slate-400 hover:text-orange-500 p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- VIEW 2: CONTRACTOR DB --- */}
      {view === "contractors" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <SearchBar
              placeholder="Search contractors..."
              value=""
              onChange={() => {}}
            />
            <button
              onClick={() => handleOpenModal("contractor")}
              className="bg-[#030F1D] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Contractor
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Business Name</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Payment Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {contractors.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                      {c.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {c.city ? `${c.city}, ` : ""}
                      {c.state} {c.zip}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      <div>{c.phone}</div>
                      <div className="text-xs text-slate-400">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {c.paymentInfo}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal("contractor", c)}
                        className="text-slate-400 hover:text-orange-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- VIEW 3: CLIENT DB --- */}
      {view === "clients" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <SearchBar
              placeholder="Search clients..."
              value=""
              onChange={() => {}}
            />
            <button
              onClick={() => handleOpenModal("client")}
              className="bg-[#030F1D] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Client
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">HQ Location</th>
                  <th className="px-6 py-4">Contact Person</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {clients.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                      {c.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {c.address}, {c.state}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      <div>{c.contactPerson}</div>
                      <div className="text-xs text-slate-400">{c.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal("client", c)}
                        className="text-slate-400 hover:text-orange-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- SHARED MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-[#030F1D] p-6 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {modalType === "rvm" ? (
                  <User className="w-5 h-5" />
                ) : modalType === "contractor" ? (
                  <Truck className="w-5 h-5" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
                {editingItem ? "Edit" : "Add New"}{" "}
                {modalType === "rvm"
                  ? "RVM"
                  : modalType === "contractor"
                  ? "Contractor"
                  : "Client"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              {/* --- RVM FORM --- */}
              {modalType === "rvm" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
                      RVM Name
                    </label>
                    <input
                      type="text"
                      value={rvmForm.name}
                      onChange={(e) =>
                        setRvmForm({ ...rvmForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Territory Section */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                      Assigned Territories
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        placeholder="State"
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                        value={tempState.name}
                        onChange={(e) =>
                          setTempState({ ...tempState, name: e.target.value })
                        }
                      />
                      <input
                        placeholder="Code"
                        className="w-20 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                        maxLength={2}
                        value={tempState.code}
                        onChange={(e) =>
                          setTempState({
                            ...tempState,
                            code: e.target.value.toUpperCase(),
                          })
                        }
                      />
                      <button
                        onClick={() => {
                          if (tempState.name && tempState.code) {
                            setRvmForm({
                              ...rvmForm,
                              states: [...rvmForm.states, tempState],
                            });
                            setTempState({ name: "", code: "" });
                          }
                        }}
                        className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rvmForm.states.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                        >
                          {s.name} ({s.code})
                          <button
                            onClick={() => {
                              const newStates = [...rvmForm.states];
                              newStates.splice(i, 1);
                              setRvmForm({ ...rvmForm, states: newStates });
                            }}
                          >
                            <X className="w-3 h-3 hover:text-red-500" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contractor Selection (Mapping) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                      Map Contractors
                    </label>
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 max-h-40 overflow-y-auto custom-scrollbar space-y-2">
                      {contractors.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => toggleSelection("contractor", c.id)}
                          className={`flex items-center justify-between p-2 rounded cursor-pointer border ${
                            rvmForm.contractorIds.includes(c.id)
                              ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                              : "border-transparent hover:bg-white dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className="text-sm dark:text-white">
                            {c.name} ({c.state})
                          </span>
                          {rvmForm.contractorIds.includes(c.id) && (
                            <SimpleCheckIcon className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Selection (Mapping) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                      Map Clients
                    </label>
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 max-h-40 overflow-y-auto custom-scrollbar space-y-2">
                      {clients.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => toggleSelection("client", c.id)}
                          className={`flex items-center justify-between p-2 rounded cursor-pointer border ${
                            rvmForm.clientIds.includes(c.id)
                              ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                              : "border-transparent hover:bg-white dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className="text-sm dark:text-white">
                            {c.name}
                          </span>
                          {rvmForm.clientIds.includes(c.id) && (
                            <SimpleCheckIcon className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- CONTRACTOR / CLIENT FORM --- */}
              {(modalType === "contractor" || modalType === "client") && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Entity Name
                      </label>
                      <input
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        value={resourceForm.name}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Full Address
                      </label>
                      <input
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        value={resourceForm.address}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        State
                      </label>
                      <input
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        maxLength={2}
                        placeholder="TX"
                        value={resourceForm.state}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            state: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Zip Code
                      </label>
                      <input
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        value={resourceForm.zip}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            zip: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Unique fields for Contractor vs Client */}
                    {modalType === "contractor" ? (
                      <>
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            Payment Info (Bank/ACH)
                          </label>
                          <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3">
                            <CreditCard className="w-4 h-4 text-slate-400 mr-2" />
                            <input
                              className="w-full py-2 bg-transparent text-sm dark:text-white outline-none"
                              placeholder="e.g. Chase ****1234"
                              value={resourceForm.paymentInfo}
                              onChange={(e) =>
                                setResourceForm({
                                  ...resourceForm,
                                  paymentInfo: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                          Contact Person
                        </label>
                        <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3">
                          <User className="w-4 h-4 text-slate-400 mr-2" />
                          <input
                            className="w-full py-2 bg-transparent text-sm dark:text-white outline-none"
                            placeholder="Full Name"
                            value={resourceForm.contactPerson}
                            onChange={(e) =>
                              setResourceForm({
                                ...resourceForm,
                                contactPerson: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Phone
                      </label>
                      <input
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        value={resourceForm.phone}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Email
                      </label>
                      <input
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        value={resourceForm.email}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Status
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white outline-none focus:border-orange-500"
                        value={resourceForm.status}
                        onChange={(e) =>
                          setResourceForm({
                            ...resourceForm,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-500 hover:text-slate-700 font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper Icon for Missing Icons */}
      <style>{`
        .lucide-check-circle { display: inline-block; }
      `}</style>
    </div>
  );
};

// Simple Icon component for the "Check" in mapping list
const SimpleCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default StateSetup;
