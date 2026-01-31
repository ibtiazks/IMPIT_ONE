import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  X,
  FileText,
  CheckCircle,
  UploadCloud,
  ChevronRight,
  Eye,
  UserX,
  Briefcase,
  DollarSign,
  Calendar,
  Camera,
  ChevronLeft,
  TrendingUp,
  Star,
  Award,
  MoreVertical, // Added for Action Menu
  Lock, // Added for Step 4 Login
  Paperclip, // Added for Files
} from "lucide-react";

// --- CONSTANTS ---
const DEPARTMENTS = [
  "Client Team",
  "RVM Team",
  "Business Development",
  "Processing Team",
  "HR",
  "Admin",
  "Accounts & Finance",
  "Business Operations",
  "Import & Edit",
  "Technology",
];

const DESIGNATIONS = [
  "Client Team Manager",
  "RVM Manager",
  "HR Manager",
  "Assistant Manager",
  "Manager",
  "Sr. Manager",
  "Office Assitant",
  "Intern",
  "Junior Executive",
  "Executive",
  "Sr. Executive",
  "Key Accounts Executive",
  "Sr. Key Accounts Executive",
  "Business Analyst",
  "Sr. Business Analyst",
  "Management Trainee Officer",
  "Trainee Team Lead",
  "Team Lead",
  "Sr. Team Lead",
  "Vice President",
  "Chief Executive Officer",
  "Chief Financial Officer",
  "Chief Operating Officer",
  "Chief Technology Officer",
  "Chairman",
  "Managing Director",
  "Full Stack Developer",
  "Quality Assurance Engineer",
];

const DISTRICTS_BD = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chittagong",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jessore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

// --- MOCK DATA ---
const INITIAL_EMPLOYEES = [
  {
    id: "1001",
    name: "Sarah Jenkins",
    virtualName: "Sarah J",
    role: "Senior Processor",
    dept: "Operations",
    email: "sarah@impit.us",
    phone: "01711223344",
    gender: "Female",
    dob: "1995-05-15",
    joinDate: "2022-01-15",
    probationEnd: "2022-07-15",
    status: "Active",
    reportingTo: "Md Nayeeb",
    bloodGroup: "O+",
    address: "Bashundhara R/A, Dhaka",

    // Official Details
    tin: "123456789",
    nid: "987654321",
    birthCert: "BC-1122",
    passport: "A1234567",
    empType: "Permanent",
    workLocation: "Office",

    // Personal 2
    emergency: {
      name: "John Jenkins",
      relation: "Father",
      contact: "01711000000",
    },
    background: {
      university: "North South University",
      religion: "Islam",
      hometown: "Dhaka",
      livingArea: "Bashundhara",
    },

    // Financials
    bank: { name: "City Bank", acc: "1234567890" },
    salary: {
      basic: 22500,
      house: 15750,
      medical: 3150,
      conv: 3600,
      gross: 45000,
    },

    // New Fields for System Access & Docs
    impitoneId: "sarah.j",
    documents: [{ name: "Resume.pdf", type: "pdf", date: "2022-01-15" }],

    // Analytics Data (Mocked History)
    history: {
      joiningSalary: 35000,
      increments: [
        { date: "2023-01-15", amount: 5000 }, // 35k -> 40k
        { date: "2024-01-15", amount: 5000 }, // 40k -> 45k
      ],
      promotions: [
        {
          date: "2023-01-15",
          from: "Junior Processor",
          to: "Senior Processor",
        },
      ],
      kpiBonuses: [
        { date: "2024-06-01", amount: 3000 },
        { date: "2024-12-01", amount: 4500 },
      ],
      // Generic history for Contact updates etc
      updates: [],
    },
    performanceRating: 81.5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

// --- ACTION MODAL COMPONENT (New) ---
const ActionModal = ({ isOpen, onClose, type, employee, onSave }) => {
  const [val, setVal] = useState("");
  const [note, setNote] = useState("");

  // Contact Specific
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  React.useEffect(() => {
    if (employee) {
      setEmail(employee.email);
      setPhone(employee.phone);
    }
  }, [employee, isOpen]);

  if (!isOpen || !employee) return null;

  const handleSubmit = () => {
    let payload = { note };
    if (type === "Increment") payload.amount = val;
    if (type === "Promotion") payload.role = val;
    if (type === "Contact") payload = { email, phone };

    onSave(employee.id, type, payload);
    onClose();
    setVal("");
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            {type === "Increment" && (
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            )}
            {type === "Promotion" && (
              <Award className="w-5 h-5 text-yellow-500" />
            )}
            {type === "Contact" && <Phone className="w-5 h-5 text-blue-500" />}
            {type} Update
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400 hover:text-red-500" />
          </button>
        </div>

        <div className="space-y-4">
          {type === "Increment" && (
            <>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded mb-2">
                <p className="text-xs text-slate-500">Current Salary</p>
                <p className="font-bold dark:text-white">
                  {employee.salary?.gross?.toLocaleString()} BDT
                </p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  New Gross Salary
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="Enter Amount"
                />
              </div>
            </>
          )}
          {type === "Promotion" && (
            <>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded mb-2">
                <p className="text-xs text-slate-500">Current Role</p>
                <p className="font-bold dark:text-white">{employee.role}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  New Designation
                </label>
                <select
                  className="w-full p-2 border rounded bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                >
                  <option value="">Select Role</option>
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {type === "Contact" && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  New Phone
                </label>
                <input
                  className="w-full p-2 border rounded bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  New Email
                </label>
                <input
                  className="w-full p-2 border rounded bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
              Change Reason / Note
            </label>
            <textarea
              className="w-full p-2 border rounded bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white h-20 text-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note for history..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-500 font-bold text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#030F1D] text-white rounded font-bold text-sm hover:bg-slate-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState("");

  // --- MODAL STATES ---
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // --- NEW: Action State ---
  const [actionType, setActionType] = useState(null); // 'Increment', 'Promotion', 'Contact'

  // --- ONBOARDING WIZARD STATE ---
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    empId: "",
    fullName: "",
    virtualName: "",
    gender: "Male",
    dob: "",
    age: "",
    joinDate: "",
    anniversary: "",
    bloodGroup: "A+",
    contactNumber: "",
    email: "",
    pic: null,
    // Step 2: Official
    probationEnd: "",
    presentAddress: "",
    department: DEPARTMENTS[0],
    designation: DESIGNATIONS[9],
    tin: "",
    nid: "",
    birthCert: "",
    passport: "",
    manager: "Md Nayeeb",
    empType: "Permanent",
    workLocation: "Office",
    // Step 3: Additional Personal
    emergencyName: "",
    emergencyRelation: "",
    emergencyContact: "",
    university: "",
    religion: "",
    hometown: "Dhaka",
    livingArea: "",
    // Step 4: Financial
    bankName: "",
    salaryAcc: "",
    grossSalary: "",
    basic: 0,
    houseRent: 0,
    transport: 0,
    medical: 0,
    // NEW: System Access in Step 4
    impitoneId: "",
    password: "",
    // Step 5: Docs (New Structure)
    documents: [], // Array of file objects { name, type, date }
    resume: null,
    contract: null, // Legacy
  });

  // --- CALCULATIONS ---
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
      setFormData((prev) => ({ ...prev, age }));
    }
  }, [formData.dob]);

  useEffect(() => {
    if (formData.joinDate) {
      const date = new Date(formData.joinDate);
      const month = date.toLocaleString("default", { month: "long" });
      setFormData((prev) => ({ ...prev, anniversary: month }));
    }
  }, [formData.joinDate]);

  useEffect(() => {
    const gross = parseFloat(formData.grossSalary) || 0;
    setFormData((prev) => ({
      ...prev,
      basic: gross * 0.5,
      houseRent: gross * 0.35,
      transport: gross * 0.08,
      medical: gross * 0.07,
    }));
  }, [formData.grossSalary]);

  // --- ACTIONS ---
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // --- NEW: Document Handling ---
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map((f) => ({
      name: f.name,
      type: f.name.split(".").pop(),
      date: new Date().toISOString().split("T")[0],
    }));
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...newDocs],
    }));
  };

  const removeFile = (idx) => {
    const newDocs = [...formData.documents];
    newDocs.splice(idx, 1);
    setFormData((prev) => ({ ...prev, documents: newDocs }));
  };

  // --- NEW: Grid Actions Handler ---
  const handleActionUpdate = (id, type, payload) => {
    const emp = employees.find((e) => e.id === id);
    const today = new Date().toISOString().split("T")[0];
    let updatedEmp = { ...emp };
    let logEntry = { date: today, type, note: payload.note };

    if (type === "Increment") {
      updatedEmp.salary = {
        ...updatedEmp.salary,
        gross: parseInt(payload.amount),
      };
      // Simple recalc of breakdown
      updatedEmp.salary.basic = payload.amount * 0.5;
      updatedEmp.salary.house = payload.amount * 0.35;
      // ...
      updatedEmp.history.increments.push({
        date: today,
        amount: parseInt(payload.amount),
      });
      updatedEmp.history.updates.push(logEntry);
    } else if (type === "Promotion") {
      const oldRole = updatedEmp.role;
      updatedEmp.role = payload.role;
      updatedEmp.history.promotions.push({
        date: today,
        from: oldRole,
        to: payload.role,
      });
      updatedEmp.history.updates.push(logEntry);
    } else if (type === "Contact") {
      updatedEmp.email = payload.email;
      updatedEmp.phone = payload.phone;
      logEntry.details = `Phone: ${payload.phone}, Email: ${payload.email}`;
      updatedEmp.history.updates.push(logEntry);
    }

    setEmployees(employees.map((e) => (e.id === id ? updatedEmp : e)));
  };

  const handleStartOnboarding = () => {
    setEditingId(null);
    setStep(1);
    setFormData({
      empId: "",
      fullName: "",
      virtualName: "",
      gender: "Male",
      dob: "",
      age: "",
      joinDate: "",
      anniversary: "",
      bloodGroup: "A+",
      contactNumber: "",
      email: "",
      pic: null,
      probationEnd: "",
      presentAddress: "",
      department: DEPARTMENTS[0],
      designation: DESIGNATIONS[9],
      tin: "",
      nid: "",
      birthCert: "",
      passport: "",
      manager: "Md Nayeeb",
      empType: "Permanent",
      workLocation: "Office",
      emergencyName: "",
      emergencyRelation: "",
      emergencyContact: "",
      university: "",
      religion: "",
      hometown: "Dhaka",
      livingArea: "",
      bankName: "",
      salaryAcc: "",
      grossSalary: "",
      basic: 0,
      houseRent: 0,
      transport: 0,
      medical: 0,
      impitoneId: "",
      password: "",
      documents: [],
      resume: null,
      contract: null,
    });
    setOnboardingOpen(true);
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setStep(1);
    // Populate Form (Flatten structure)
    setFormData({
      empId: emp.id,
      fullName: emp.name,
      virtualName: emp.virtualName || "",
      gender: emp.gender || "Male",
      dob: emp.dob || "",
      age: emp.age || "",
      joinDate: emp.joinDate,
      anniversary: "",
      bloodGroup: emp.bloodGroup,
      contactNumber: emp.phone,
      email: emp.email,

      probationEnd: emp.probationEnd || "",
      presentAddress: emp.address,
      department: emp.dept,
      designation: emp.role,
      tin: emp.tin || "",
      nid: emp.nid || "",
      birthCert: emp.birthCert || "",
      passport: emp.passport || "",
      manager: emp.reportingTo,
      empType: emp.empType || "Permanent",
      workLocation: emp.workLocation || "Office",

      emergencyName: emp.emergency?.name || "",
      emergencyRelation: emp.emergency?.relation || "",
      emergencyContact: emp.emergency?.contact || "",
      university: emp.background?.university || "",
      religion: emp.background?.religion || "",
      hometown: emp.background?.hometown || "Dhaka",
      livingArea: emp.background?.livingArea || "",

      bankName: emp.bank?.name || "",
      salaryAcc: emp.bank?.acc || "",
      grossSalary: emp.salary?.gross || 0,
      basic: emp.salary?.basic || 0,
      houseRent: emp.salary?.house || 0,
      transport: emp.salary?.conv || 0,
      medical: emp.salary?.medical || 0,

      impitoneId: emp.impitoneId || "",
      password: "", // Password stays empty on edit
      documents: emp.documents || [],
      resume: null,
      contract: null,
    });
    setOnboardingOpen(true);
  };

  const handleFinishOnboarding = () => {
    const newEmp = {
      id: formData.empId || `100${employees.length + 1}`,
      name: formData.fullName,
      virtualName: formData.virtualName,
      role: formData.designation,
      dept: formData.department,
      email: formData.email,
      phone: formData.contactNumber,
      gender: formData.gender,
      dob: formData.dob,
      joinDate: formData.joinDate,
      probationEnd: formData.probationEnd,
      status: "Active",
      reportingTo: formData.manager,
      bloodGroup: formData.bloodGroup,
      address: formData.presentAddress,
      tin: formData.tin,
      nid: formData.nid,
      birthCert: formData.birthCert,
      passport: formData.passport,
      empType: formData.empType,
      workLocation: formData.workLocation,
      emergency: {
        name: formData.emergencyName,
        relation: formData.emergencyRelation,
        contact: formData.emergencyContact,
      },
      background: {
        university: formData.university,
        religion: formData.religion,
        hometown: formData.hometown,
        livingArea: formData.livingArea,
      },
      bank: { name: formData.bankName, acc: formData.salaryAcc },
      salary: {
        basic: formData.basic,
        house: formData.houseRent,
        medical: formData.medical,
        conv: formData.transport,
        gross: formData.grossSalary,
      },
      // New fields
      impitoneId: formData.impitoneId,
      documents: formData.documents,
      // Default structure
      history: editingId
        ? employees.find((e) => e.id === editingId).history
        : {
            joiningSalary: formData.grossSalary,
            increments: [],
            promotions: [],
            kpiBonuses: [],
            updates: [],
          },
      performanceRating: editingId
        ? employees.find((e) => e.id === editingId).performanceRating
        : 0,
      avatar: editingId
        ? employees.find((e) => e.id === editingId).avatar
        : `https://ui-avatars.com/api/?name=${formData.fullName.replace(
            " ",
            "+"
          )}&background=random`,
    };

    if (editingId) {
      setEmployees(employees.map((e) => (e.id === editingId ? newEmp : e)));
    } else {
      setEmployees([...employees, newEmp]);
    }

    setOnboardingOpen(false);
    setStep(1);
    setEditingId(null);
  };

  // --- VIEW HELPER FUNCTIONS ---
  const getExperience = (joinDate) => {
    const start = new Date(joinDate);
    const end = new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    return `${years}y ${months}m`;
  };

  const getLevel = (role) => {
    if (!role) return 1;
    if (
      role.includes("Chief") ||
      role.includes("President") ||
      role.includes("Director")
    )
      return 5;
    if (role.includes("Manager")) return 4;
    if (role.includes("Senior") || role.includes("Lead")) return 3;
    if (role.includes("Executive") || role.includes("Officer")) return 2;
    return 1;
  };

  const getNextReview = (emp) => {
    const lastChange =
      emp.history?.promotions?.length > 0
        ? emp.history.promotions[emp.history.promotions.length - 1].date
        : emp.joinDate;
    const date = new Date(lastChange);
    date.setFullYear(date.getFullYear() + 1);
    return date.toLocaleDateString();
  };

  const isProbationCompleted = (probationEnd) => {
    if (!probationEnd) return "No";
    const end = new Date(probationEnd);
    const today = new Date();
    return today > end ? "Yes" : "No";
  };

  const handleView = (emp) => {
    setSelectedEmp(emp);
    setViewModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?"))
      setEmployees(employees.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-orange-500 dark:text-white"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleStartOnboarding}
            className="flex items-center gap-2 px-4 py-2 bg-[#030F1D] text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Onboard Employee
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4">Employee Profile</th>
              <th className="px-6 py-4">Contact Info</th>
              <th className="px-6 py-4">Role & Dept</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {employees
              .filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">
                          {emp.name}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          {emp.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-3 h-3 text-slate-400" /> {emp.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-slate-400" /> {emp.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 dark:text-white">
                      {emp.role}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {emp.dept}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      ● {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 relative">
                      <button
                        onClick={() => handleView(emp)}
                        className="p-2 text-slate-400 hover:text-blue-500 bg-slate-50 dark:bg-slate-800 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(emp)}
                        className="p-2 text-slate-400 hover:text-orange-500 bg-slate-50 dark:bg-slate-800 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* NEW: 3-DOTS ACTION MENU */}
                      <div className="relative group/menu">
                        <button className="p-2 text-slate-400 hover:text-purple-500 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 top-10 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl rounded-lg overflow-hidden z-20 hidden group-hover/menu:block animate-fade-in text-left">
                          <button
                            onClick={() => {
                              setSelectedEmp(emp);
                              setActionType("Increment");
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2"
                          >
                            <TrendingUp className="w-3 h-3" /> Increment
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEmp(emp);
                              setActionType("Promotion");
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-yellow-50 hover:text-yellow-600 flex items-center gap-2"
                          >
                            <Award className="w-3 h-3" /> Promotion
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEmp(emp);
                              setActionType("Contact");
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                          >
                            <Phone className="w-3 h-3" /> Update Contact
                          </button>
                          <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* --- EXTENDED VIEW MODAL (ANALYTICS & FILES) --- */}
      {viewModalOpen && selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setViewModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#030F1D] p-6 flex justify-between items-start shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="flex items-center gap-4 z-10">
                <img
                  src={selectedEmp.avatar}
                  className="w-20 h-20 rounded-full border-4 border-white/20"
                  alt="avatar"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedEmp.name}
                  </h2>
                  <p className="text-orange-400 font-medium">
                    {selectedEmp.role} | Level {getLevel(selectedEmp.role)}
                  </p>
                  <p className="text-sm text-slate-400">
                    {selectedEmp.dept} Department | {selectedEmp.workLocation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-white/60 hover:text-white z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              {/* Top Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Experience
                  </p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">
                    {getExperience(selectedEmp.joinDate)}
                  </p>
                </div>
                {/* ... other stats remain same ... */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Salary Growth
                  </p>
                  <p className="text-lg font-bold text-emerald-600">
                    {(
                      ((selectedEmp.salary.gross -
                        selectedEmp.history.joiningSalary) /
                        selectedEmp.history.joiningSalary) *
                      100
                    ).toFixed(0)}
                    %
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Perf. Rating
                  </p>
                  <div className="flex items-center gap-1 text-orange-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />{" "}
                    {selectedEmp.performanceRating}/100
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Probation
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      isProbationCompleted(selectedEmp.probationEnd) === "Yes"
                        ? "text-emerald-600"
                        : "text-amber-500"
                    }`}
                  >
                    {isProbationCompleted(selectedEmp.probationEnd) === "Yes"
                      ? "Completed"
                      : "Pending"}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Next Review
                  </p>
                  <p className="text-lg font-bold text-blue-500">
                    {getNextReview(selectedEmp)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Official & Personal Info */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Official Details
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Employee ID</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Virtual Name</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.virtualName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Joining Date</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.joinDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Anniversary</p>
                        <p className="font-medium dark:text-white">
                          {new Date(selectedEmp.joinDate).toLocaleString(
                            "default",
                            { month: "long" }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Probation End</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.probationEnd}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">
                          Employment Type
                        </p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.empType}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Manager</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.reportingTo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Work Location</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.workLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase mb-4 flex items-center gap-2">
                      <UserX className="w-4 h-4" /> Personal Details
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Gender</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Blood Group</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.bloodGroup}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">
                          Emergency Contact
                        </p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.emergency?.name} (
                          {selectedEmp.emergency?.relation})
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Emergency No.</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.emergency?.contact}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">University</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.background?.university}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Hometown</p>
                        <p className="font-medium dark:text-white">
                          {selectedEmp.background?.hometown}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Documents & Analytics */}
                <div className="space-y-6">
                  {/* NEW DOCUMENTS SECTION IN VIEW MODE */}
                  <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" /> Documents
                    </h4>
                    <div className="space-y-2">
                      {selectedEmp.documents &&
                      selectedEmp.documents.length > 0 ? (
                        selectedEmp.documents.map((doc, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                                {doc.type === "pdf" ? (
                                  <FileText className="w-4 h-4 text-red-500" />
                                ) : (
                                  <Paperclip className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                  {doc.name}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  {doc.date}
                                </p>
                              </div>
                            </div>
                            <button className="text-xs font-bold text-blue-600 hover:underline">
                              Download
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          No documents uploaded.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Financial Analytics
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-emerald-100 dark:border-emerald-800 pb-2">
                        <span className="text-slate-600 dark:text-slate-300">
                          Joining Salary
                        </span>
                        <span className="font-bold dark:text-white">
                          ৳{selectedEmp.history.joiningSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-emerald-100 dark:border-emerald-800 pb-2">
                        <span className="text-slate-600 dark:text-slate-300">
                          Current Salary
                        </span>
                        <span className="font-extrabold text-emerald-600 text-lg">
                          ৳{selectedEmp.salary.gross.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-500">
                          Total Increment Count
                        </span>
                        <span className="font-medium dark:text-white">
                          {selectedEmp.history.increments.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Total Amount Incremented
                        </span>
                        <span className="font-bold text-blue-600">
                          +৳
                          {(
                            selectedEmp.salary.gross -
                            selectedEmp.history.joiningSalary
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-6">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-500" /> Growth & KPI
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-300">
                          Promotion Count
                        </span>
                        <span className="font-bold dark:text-white">
                          {selectedEmp.history.promotions.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-300">
                          Last KPI Bonus
                        </span>
                        <span className="font-bold text-emerald-600">
                          {selectedEmp.history.kpiBonuses.length > 0
                            ? `৳${selectedEmp.history.kpiBonuses[
                                selectedEmp.history.kpiBonuses.length - 1
                              ].amount.toLocaleString()}`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-300">
                          Total KPI Earned
                        </span>
                        <span className="font-bold text-emerald-600">
                          ৳
                          {selectedEmp.history.kpiBonuses
                            .reduce((acc, curr) => acc + curr.amount, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ONBOARDING WIZARD (MODIFIED FOR EDIT RULES) --- */}
      {onboardingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOnboardingOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="bg-[#030F1D] p-6 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {editingId ? "Edit Employee" : "Employee Onboarding"}
                </h3>
                <p className="text-white/60 text-sm">Step {step} of 5</p>
              </div>
              <button
                onClick={() => setOnboardingOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              {/* STEP 1: PERSONAL METADATA (Locked in Edit) */}
              {step === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-orange-500 border-b pb-2 flex justify-between">
                    Personal Information
                    {editingId && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Read Only
                      </span>
                    )}
                  </h4>
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-200">
                      <Camera className="w-8 h-8 mb-2" />
                      <span className="text-xs font-bold">Upload Pic</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <label className="label">Employee ID</label>
                        <input
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          type="number"
                          value={formData.empId}
                          onChange={(e) =>
                            setFormData({ ...formData, empId: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="label">Full Name</label>
                        <input
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Virtual Name</label>
                        <input
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.virtualName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              virtualName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Gender</label>
                        <select
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Blood Group</label>
                        <select
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.bloodGroup}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bloodGroup: e.target.value,
                            })
                          }
                        >
                          <option>A+</option>
                          <option>O+</option>
                          <option>B+</option>
                          <option>AB+</option>
                          <option>A-</option>
                          <option>O-</option>
                          <option>B-</option>
                          <option>AB-</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">Date of Birth</label>
                        <input
                          type="date"
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.dob}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Age (Auto)</label>
                        <input
                          className="input bg-slate-50 dark:bg-slate-800"
                          readOnly
                          value={formData.age}
                        />
                      </div>
                      <div>
                        <label className="label">Contact Number</label>
                        <input
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          type="number"
                          value={formData.contactNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contactNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Joining Date</label>
                        <input
                          type="date"
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.joinDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              joinDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Anniversary (Auto)</label>
                        <input
                          className="input bg-slate-50 dark:bg-slate-800"
                          readOnly
                          value={formData.anniversary}
                        />
                      </div>
                      <div>
                        <label className="label">Email ID</label>
                        <input
                          type="email"
                          disabled={!!editingId}
                          className={`input ${
                            editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                          }`}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: OFFICIAL INFO (Partial Edit) */}
              {step === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-orange-500 border-b pb-2 flex justify-between">
                    Official Information
                    {editingId && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                        Partially Editable
                      </span>
                    )}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="label">
                        Department {editingId && "(Locked)"}
                      </label>
                      <select
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            department: e.target.value,
                          })
                        }
                      >
                        {DEPARTMENTS.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">
                        Designation {editingId && "(Locked)"}
                      </label>
                      <select
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.designation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            designation: e.target.value,
                          })
                        }
                      >
                        {DESIGNATIONS.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">
                        Probation End Date {editingId && "(Locked)"}
                      </label>
                      <input
                        type="date"
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.probationEnd}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            probationEnd: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* EDITABLE FIELDS */}
                    <div className="col-span-3">
                      <label className="label text-emerald-600">
                        Present Address {editingId && "(Editable)"}
                      </label>
                      <input
                        className="input border-emerald-200 bg-emerald-50/50"
                        value={formData.presentAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            presentAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="label text-emerald-600">
                        TIN Number {editingId && "(Editable)"}
                      </label>
                      <input
                        type="number"
                        className="input border-emerald-200 bg-emerald-50/50"
                        value={formData.tin}
                        onChange={(e) =>
                          setFormData({ ...formData, tin: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="label text-emerald-600">
                        NID Number {editingId && "(Editable)"}
                      </label>
                      <input
                        type="number"
                        className="input border-emerald-200 bg-emerald-50/50"
                        value={formData.nid}
                        onChange={(e) =>
                          setFormData({ ...formData, nid: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="label text-emerald-600">
                        Passport No {editingId && "(Editable)"}
                      </label>
                      <input
                        className="input border-emerald-200 bg-emerald-50/50"
                        value={formData.passport}
                        onChange={(e) =>
                          setFormData({ ...formData, passport: e.target.value })
                        }
                      />
                    </div>

                    {/* LOCKED FIELDS */}
                    <div>
                      <label className="label">
                        Manager {editingId && "(Locked)"}
                      </label>
                      <select
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.manager}
                        onChange={(e) =>
                          setFormData({ ...formData, manager: e.target.value })
                        }
                      >
                        <option>Md Nayeeb</option>
                        <option>Sarah Jenkins</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">
                        Employment Type {editingId && "(Locked)"}
                      </label>
                      <select
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.empType}
                        onChange={(e) =>
                          setFormData({ ...formData, empType: e.target.value })
                        }
                      >
                        <option>Permanent</option>
                        <option>Intern</option>
                        <option>Contractual</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">
                        Work Location {editingId && "(Locked)"}
                      </label>
                      <select
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.workLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workLocation: e.target.value,
                          })
                        }
                      >
                        <option>Office</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PERSONAL DETAILS (Fully Editable) */}
              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-orange-500 border-b pb-2">
                    Personal Details
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="font-bold text-sm text-slate-500">
                        Emergency Contact
                      </h5>
                      <div>
                        <label className="label">Contact Person</label>
                        <input
                          className="input"
                          value={formData.emergencyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emergencyName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Relation</label>
                        <input
                          className="input"
                          value={formData.emergencyRelation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emergencyRelation: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Emergency Number</label>
                        <input
                          className="input"
                          type="number"
                          value={formData.emergencyContact}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emergencyContact: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-bold text-sm text-slate-500">
                        Background
                      </h5>
                      <div>
                        <label className="label">University</label>
                        <input
                          className="input"
                          value={formData.university}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              university: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Religion</label>
                        <input
                          className="input"
                          value={formData.religion}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              religion: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">Hometown</label>
                        <select
                          className="input"
                          value={formData.hometown}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hometown: e.target.value,
                            })
                          }
                        >
                          {DISTRICTS_BD.map((d) => (
                            <option key={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label">Living Area</label>
                        <input
                          className="input"
                          value={formData.livingArea}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              livingArea: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: FINANCIALS & LOGIN (Locked in Edit) */}
              {step === 4 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-orange-500 border-b pb-2 flex justify-between">
                    Financial & System Access
                    {editingId && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Read Only
                      </span>
                    )}
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="label">Bank Name</label>
                      <input
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        value={formData.bankName}
                        onChange={(e) =>
                          setFormData({ ...formData, bankName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="label">Salary A/C Number</label>
                      <input
                        disabled={!!editingId}
                        className={`input ${
                          editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        type="number"
                        value={formData.salaryAcc}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salaryAcc: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <label className="label text-blue-600">
                        Gross Salary (Monthly)
                      </label>
                      <input
                        disabled={!!editingId}
                        className={`input text-xl font-bold ${
                          editingId ? "bg-transparent" : ""
                        }`}
                        type="number"
                        value={formData.grossSalary}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            grossSalary: e.target.value,
                          })
                        }
                      />
                    </div>
                    {/* Read-Only Breakdowns */}
                    <div>
                      <label className="label">Basic (50%)</label>
                      <input
                        className="input bg-slate-50 dark:bg-slate-800"
                        readOnly
                        value={formData.basic}
                      />
                    </div>
                    <div>
                      <label className="label">House Rent (35%)</label>
                      <input
                        className="input bg-slate-50 dark:bg-slate-800"
                        readOnly
                        value={formData.houseRent}
                      />
                    </div>
                    <div>
                      <label className="label">Transport (8%)</label>
                      <input
                        className="input bg-slate-50 dark:bg-slate-800"
                        readOnly
                        value={formData.transport}
                      />
                    </div>
                    <div>
                      <label className="label">Medical (7%)</label>
                      <input
                        className="input bg-slate-50 dark:bg-slate-800"
                        readOnly
                        value={formData.medical}
                      />
                    </div>

                    {/* NEW: LOGIN CREDENTIALS */}
                    <div className="col-span-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <h5 className="font-bold text-sm text-slate-500 mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4" /> System Login (IMPITONE)
                      </h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">
                            User ID (Auto-generated/Editable)
                          </label>
                          <input
                            disabled={!!editingId}
                            className={`input ${
                              editingId ? "bg-slate-100 dark:bg-slate-800" : ""
                            }`}
                            value={formData.impitoneId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                impitoneId: e.target.value,
                              })
                            }
                            placeholder="firstname.lastname"
                          />
                        </div>
                        {!editingId && (
                          <div>
                            <label className="label">
                              Password (Create New)
                            </label>
                            <input
                              type="password"
                              className="input"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }
                              placeholder="Enter secure password"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: DOCUMENTS (NEW) */}
              {step === 5 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-orange-500 border-b pb-2">
                    Documents
                  </h4>

                  {/* Uploader */}
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 relative hover:bg-slate-100 transition-colors">
                    <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="font-bold text-slate-700 dark:text-white">
                      Click to upload files
                    </p>
                    <p className="text-xs text-slate-500 mb-4">
                      Resume, Certificates, ID (PDF/Image)
                    </p>
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={handleFileUpload}
                    />
                  </div>

                  {/* File List */}
                  <div className="space-y-2">
                    {formData.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-bold dark:text-white">
                              {doc.name}
                            </p>
                            <p className="text-xs text-slate-400">{doc.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(idx)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-between bg-slate-50 dark:bg-slate-950">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 font-bold text-slate-500 hover:bg-slate-200 rounded-lg flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 5 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-2 bg-[#030F1D] text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishOnboarding}
                  className="px-8 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                >
                  {editingId ? "Save Changes" : "Complete Onboarding"}{" "}
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NEW ACTION MODAL */}
      <ActionModal
        isOpen={!!actionType}
        type={actionType}
        employee={selectedEmp}
        onClose={() => setActionType(null)}
        onSave={handleActionUpdate}
      />

      <style>{`
        .label { display: block; font-size: 0.70rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.3rem; }
        .input { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.85rem; outline: none; background: transparent; transition: border-color 0.2s; }
        .input:focus { border-color: #f97316; }
        .input:disabled { background-color: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
        .dark .input { border-color: #475569; color: white; }
        .dark .input:disabled { background-color: #1e293b; color: #64748b; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default EmployeeDirectory;
