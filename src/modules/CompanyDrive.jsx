import React, { useState, useRef, useMemo } from "react";
import {
  Folder,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Search,
  Plus,
  Grid,
  List,
  Star,
  Download,
  Trash2,
  Edit2,
  Share2,
  ChevronRight,
  UploadCloud,
  File,
  X,
  Check,
  Users,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_USERS = [
  { id: 1, name: "Sarah Jenkins", role: "Processing" },
  { id: 2, name: "Mike Chen", role: "RVM" },
  { id: 3, name: "Jessica Low", role: "Client Team" },
  { id: 4, name: "David Kim", role: "Admin" },
];

const INITIAL_FILES = [
  {
    id: 1,
    name: "SOPs & Guidelines",
    type: "folder",
    size: "-",
    modified: "2 days ago",
    starred: true,
    parentId: null,
  },
  {
    id: 2,
    name: "Q1 Financial Report.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "5 hours ago",
    starred: false,
    parentId: null,
  },
  {
    id: 3,
    name: "Vendor List 2025.xlsx",
    type: "excel",
    size: "1.1 MB",
    modified: "1 day ago",
    starred: true,
    parentId: null,
  },
  {
    id: 4,
    name: "Site_Photo_102.jpg",
    type: "image",
    size: "4.5 MB",
    modified: "3 days ago",
    starred: false,
    parentId: null,
  },
  // Inside SOPs Folder (parentId: 1)
  {
    id: 5,
    name: "Onboarding Checklist.docx",
    type: "doc",
    size: "500 KB",
    modified: "1 week ago",
    starred: false,
    parentId: 1,
  },
  {
    id: 6,
    name: "Safety Manual.pdf",
    type: "pdf",
    size: "3.2 MB",
    modified: "2 weeks ago",
    starred: false,
    parentId: 1,
  },
];

// --- ICONS HELPER ---
const getFileIcon = (type) => {
  if (type === "folder")
    return <Folder className="w-10 h-10 text-blue-500 fill-blue-500/20" />;
  if (type === "pdf") return <FileText className="w-10 h-10 text-red-500" />;
  if (type === "excel")
    return <FileText className="w-10 h-10 text-emerald-500" />;
  if (type === "doc") return <FileText className="w-10 h-10 text-blue-600" />;
  if (type === "image")
    return <ImageIcon className="w-10 h-10 text-purple-500" />;
  return <File className="w-10 h-10 text-slate-400" />;
};

// --- COMPONENTS ---

const FileCard = ({
  file,
  onRename,
  onDelete,
  onShare,
  onNavigate,
  onToggleStar,
}) => {
  return (
    <div
      onClick={() => (file.type === "folder" ? onNavigate(file.id) : null)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-40"
    >
      <div className="flex justify-between items-start">
        {getFileIcon(file.type)}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(file.id);
          }}
          className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
            file.starred
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-300 dark:text-slate-600 group-hover:text-slate-400"
          }`}
        >
          <Star className="w-4 h-4" />
        </button>
      </div>

      <div>
        <h4
          className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate mb-1"
          title={file.name}
        >
          {file.name}
        </h4>
        <p className="text-xs text-slate-400">
          {file.type === "folder" ? "Folder" : file.size} • {file.modified}
        </p>
      </div>

      {/* Hover Actions */}
      <div className="absolute top-14 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-slate-900/90 p-1 rounded-lg backdrop-blur-sm border border-slate-100 dark:border-slate-800 shadow-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare(file);
          }}
          className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded text-slate-500 hover:text-blue-500"
          title="Share"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRename(file);
          }}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 hover:text-slate-700"
          title="Rename"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(file.id);
          }}
          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-slate-500 hover:text-red-500"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const FileListItem = ({
  file,
  onRename,
  onDelete,
  onShare,
  onNavigate,
  onToggleStar,
}) => {
  return (
    <div
      onClick={() => (file.type === "folder" ? onNavigate(file.id) : null)}
      className="group flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer border-b border-slate-100 dark:border-slate-800/50 last:border-0"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="shrink-0 scale-75">{getFileIcon(file.type)}</div>
        <div className="truncate">
          <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate">
            {file.name}
          </h4>
          <span className="text-xs text-slate-400 md:hidden">{file.size}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-xs text-slate-500 w-1/3 justify-end">
        <span className="w-20 text-right">{file.size}</span>
        <span className="w-24 text-right">{file.modified}</span>
      </div>

      <div className="flex items-center gap-2 pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(file.id);
          }}
          className={`p-1.5 ${
            file.starred
              ? "text-yellow-400"
              : "text-slate-300 hover:text-slate-500"
          }`}
        >
          <Star className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare(file);
          }}
          className="p-1.5 text-slate-400 hover:text-blue-500"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRename(file);
          }}
          className="p-1.5 text-slate-400 hover:text-slate-600"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(file.id);
          }}
          className="p-1.5 text-slate-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- MODALS ---

const ShareModal = ({ isOpen, onClose, file }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUser = (id) => {
    if (selectedUsers.includes(id))
      setSelectedUsers(selectedUsers.filter((u) => u !== id));
    else setSelectedUsers([...selectedUsers, id]);
  };

  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#030F1D] p-5 text-white flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Share2 className="w-5 h-5" /> Share "{file.name}"
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Select Colleagues
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {MOCK_USERS.map((u) => (
                <div
                  key={u.id}
                  onClick={() => toggleUser(u.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedUsers.includes(u.id)
                      ? "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-700"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-white">
                        {u.name}
                      </p>
                      <p className="text-xs text-slate-400">{u.role}</p>
                    </div>
                  </div>
                  {selectedUsers.includes(u.id) && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              alert(`Shared with ${selectedUsers.length} people!`);
              onClose();
            }}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};

const RenameModal = ({ isOpen, onClose, file, onSave }) => {
  const [name, setName] = useState(file ? file.name : "");

  // Update local name state when file prop changes
  React.useEffect(() => {
    if (file) setName(file.name);
  }, [file]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-xl p-6">
        <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">
          Rename File
        </h3>
        <input
          autoFocus
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(file.id, name)}
            className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const CompanyDrive = () => {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [currentFolder, setCurrentFolder] = useState(null); // null = root
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [shareModal, setShareModal] = useState(null); // holds file obj
  const [renameModal, setRenameModal] = useState(null); // holds file obj
  const fileInputRef = useRef(null);

  // --- ACTIONS ---

  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      type: f.name.split(".").pop().toLowerCase() || "file",
      size: (f.size / 1024 / 1024).toFixed(1) + " MB",
      modified: "Just now",
      starred: false,
      parentId: currentFolder,
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleCreateFolder = () => {
    const name = prompt("Folder Name:");
    if (name) {
      setFiles([
        ...files,
        {
          id: Date.now(),
          name,
          type: "folder",
          size: "-",
          modified: "Just now",
          starred: false,
          parentId: currentFolder,
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this item?"))
      setFiles(files.filter((f) => f.id !== id));
  };

  const handleRename = (id, newName) => {
    setFiles(files.map((f) => (f.id === id ? { ...f, name: newName } : f)));
    setRenameModal(null);
  };

  const toggleStar = (id) => {
    setFiles(
      files.map((f) => (f.id === id ? { ...f, starred: !f.starred } : f))
    );
  };

  // --- DERIVED STATE ---

  const folderChain = useMemo(() => {
    let chain = [];
    let currentId = currentFolder;
    while (currentId) {
      const folder = files.find((f) => f.id === currentId);
      if (folder) {
        chain.unshift({ id: folder.id, name: folder.name });
        currentId = folder.parentId;
      } else break;
    }
    return chain;
  }, [currentFolder, files]);

  const displayedFiles = files.filter(
    (f) =>
      f.parentId === currentFolder &&
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in">
      {/* HEADER: Search & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
            <UploadCloud className="w-6 h-6 text-blue-500" /> Company Drive
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Secure file storage and collaboration.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Toggles */}
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-800 shadow text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-800 shadow text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Buttons */}
          <button
            onClick={handleCreateFolder}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Folder className="w-4 h-4 text-blue-500" /> New Folder
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            <UploadCloud className="w-4 h-4" /> Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleUpload}
          />
        </div>
      </div>

      {/* BREADCRUMBS & CONTENT AREA */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
        {/* Breadcrumb Bar */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 text-sm text-slate-500 bg-slate-50/50 dark:bg-slate-950/50">
          <button
            onClick={() => setCurrentFolder(null)}
            className={`hover:text-blue-500 font-medium ${
              !currentFolder ? "text-slate-800 dark:text-white" : ""
            }`}
          >
            My Drive
          </button>
          {folderChain.map((folder, idx) => (
            <React.Fragment key={folder.id}>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => setCurrentFolder(folder.id)}
                className={`hover:text-blue-500 font-medium ${
                  idx === folderChain.length - 1
                    ? "text-slate-800 dark:text-white"
                    : ""
                }`}
              >
                {folder.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Files Grid/List */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {displayedFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl m-4">
              <UploadCloud className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">This folder is empty</p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Upload a file
              </button>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {displayedFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onNavigate={setCurrentFolder}
                      onRename={() => setRenameModal(file)}
                      onDelete={handleDelete}
                      onShare={() => setShareModal(file)}
                      onToggleStar={toggleStar}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {displayedFiles.map((file) => (
                    <FileListItem
                      key={file.id}
                      file={file}
                      onNavigate={setCurrentFolder}
                      onRename={() => setRenameModal(file)}
                      onDelete={handleDelete}
                      onShare={() => setShareModal(file)}
                      onToggleStar={toggleStar}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Storage Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-xs text-slate-500">
          <span>{displayedFiles.length} items</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
            </div>
            <span>4.5 GB of 10 GB used</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={!!shareModal}
        onClose={() => setShareModal(null)}
        file={shareModal}
      />
      <RenameModal
        isOpen={!!renameModal}
        onClose={() => setRenameModal(null)}
        file={renameModal}
        onSave={(id, name) => {
          handleRename(id, name);
          setRenameModal(null);
        }}
      />
    </div>
  );
};

export default CompanyDrive;
