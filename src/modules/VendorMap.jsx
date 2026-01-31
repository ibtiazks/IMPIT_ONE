import React, { useState, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polygon,
  Tooltip,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Map as MapIcon,
  List,
  Search,
  Plus,
  Filter,
  Download,
  Navigation,
  Menu,
  Crosshair,
  Minus,
  Edit2,
  Layers,
  ShieldAlert,
  Star,
  MoreHorizontal,
  CheckCircle,
  MapPin,
  X,
  Car,
  Footprints,
  Train,
  Plane,
} from "lucide-react";

// --- FIX LEAFLET ICONS ---
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- UTILS: VIBRANT COLORS ---
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Construct a vibrant HSL color
  // Hue: Full range 0-360 based on hash
  // Saturation: Fixed high value (e.g., 70-90%) for vibrancy
  // Lightness: Medium (e.g., 45-60%) for visibility
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 80%, 50%)`; // Vibrant!
};

// --- CUSTOM PIN FACTORIES ---
const createVendorIcon = (color, isBlacklisted) => {
  const html = `
    <div class="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-md ${
      isBlacklisted ? "bg-slate-900" : color
    } transform transition-transform hover:scale-110 hover:z-50">
      ${
        isBlacklisted
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
      }
    </div>
  `;
  return L.divIcon({
    className: "custom-pin",
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const createClientIcon = () => {
  const html = `
      <div class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-xl bg-blue-600 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
      </div>
    `;
  return L.divIcon({
    className: "client-pin",
    html: html,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// --- MOCK GEO DATA ---
const COUNTIES = [
  {
    name: "Dallas Cty",
    parent: "Texas",
    path: [
      [33.0, -97.0],
      [33.0, -96.5],
      [32.6, -96.5],
      [32.6, -97.0],
    ],
  },
  {
    name: "Tarrant Cty",
    parent: "Texas",
    path: [
      [33.0, -97.5],
      [33.0, -97.0],
      [32.6, -97.0],
      [32.6, -97.5],
    ],
  },
];

const COMPANIES = [
  {
    id: 1,
    name: "Apex Solutions",
    color: "#ef4444",
    regions: [
      [
        [33.2, -97.8],
        [33.2, -96.2],
        [32.4, -96.2],
        [32.4, -97.8],
      ],
    ],
  },
  {
    id: 2,
    name: "FixIt Bros",
    color: "#3b82f6",
    regions: [
      [
        [37.2, -103.2],
        [37.2, -94.2],
        [33.2, -94.2],
        [33.8, -103.2],
      ],
    ],
  },
];

// --- 10 MOCK CONTRACTORS ---
const INITIAL_CONTRACTORS = [
  {
    id: 1,
    name: "Apex Solutions",
    state: "TX",
    lat: 32.7767,
    lng: -96.797,
    preference: "LLC (Unique)",
    source: "USA Map",
    fbGroup: "",
    status: "Onboarded",
    rating: 5,
    isBlacklisted: false,
    contact: "555-0101",
    email: "apex@ven.com",
    payment: "ACH ***99",
    w9: "Verified",
  },
  {
    id: 2,
    name: "Badger Maint",
    state: "NY",
    lat: 40.7128,
    lng: -74.006,
    preference: "General",
    source: "Craigslist",
    fbGroup: "",
    status: "Onboarded",
    rating: 2,
    isBlacklisted: true,
    contact: "555-0102",
    email: "badger@fix.com",
    payment: "Check",
    w9: "Pending",
  },
  {
    id: 3,
    name: "Rapid Fixers",
    state: "CA",
    lat: 34.0522,
    lng: -118.2437,
    preference: "LLC (Brollex)",
    source: "FB group",
    fbGroup: "LA Hub",
    status: "Waiting for response",
    rating: 0,
    isBlacklisted: false,
    contact: "555-0103",
    email: "rapid@fix.com",
    payment: "-",
    w9: "-",
  },
  {
    id: 4,
    name: "Midwest Pros",
    state: "IL",
    lat: 41.8781,
    lng: -87.6298,
    preference: "General",
    source: "Yelp",
    fbGroup: "",
    status: "Onboarded",
    rating: 4,
    isBlacklisted: false,
    contact: "555-0104",
    email: "midwest@pros.com",
    payment: "Zelle",
    w9: "Verified",
  },
  {
    id: 5,
    name: "Sunshine State Svcs",
    state: "FL",
    lat: 25.7617,
    lng: -80.1918,
    preference: "LLC (Trucare)",
    source: "Mail",
    fbGroup: "",
    status: "Onboarded",
    rating: 4.5,
    isBlacklisted: false,
    contact: "555-0105",
    email: "sunny@fl.com",
    payment: "Wire",
    w9: "Verified",
  },
  {
    id: 6,
    name: "Peach Tree Maint",
    state: "GA",
    lat: 33.749,
    lng: -84.388,
    preference: "General",
    source: "QHM Map",
    fbGroup: "",
    status: "Ongoing",
    rating: 3,
    isBlacklisted: false,
    contact: "555-0106",
    email: "peach@ga.com",
    payment: "-",
    w9: "Submitted",
  },
  {
    id: 7,
    name: "Buckeye Renovations",
    state: "OH",
    lat: 39.9612,
    lng: -82.9988,
    preference: "General",
    source: "Others",
    fbGroup: "",
    status: "Onboarded",
    rating: 3.5,
    isBlacklisted: false,
    contact: "555-0107",
    email: "buckeye@oh.com",
    payment: "ACH",
    w9: "Verified",
  },
  {
    id: 8,
    name: "Keystone Fixers",
    state: "PA",
    lat: 39.9526,
    lng: -75.1652,
    preference: "LLC (Unique)",
    source: "Unique Map",
    fbGroup: "",
    status: "Declined",
    rating: 1,
    isBlacklisted: true,
    contact: "555-0108",
    email: "key@pa.com",
    payment: "-",
    w9: "-",
  },
  {
    id: 9,
    name: "Desert Oasis Ops",
    state: "AZ",
    lat: 33.4484,
    lng: -112.074,
    preference: "General",
    source: "USA Map",
    fbGroup: "",
    status: "Onboarded",
    rating: 5,
    isBlacklisted: false,
    contact: "555-0109",
    email: "desert@az.com",
    payment: "Zelle",
    w9: "Verified",
  },
  {
    id: 10,
    name: "Tarheel Techs",
    state: "NC",
    lat: 35.7796,
    lng: -78.6382,
    preference: "LLC (Brollex)",
    source: "FB group",
    fbGroup: "NC Pros",
    status: "Onboarded",
    rating: 4,
    isBlacklisted: false,
    contact: "555-0110",
    email: "tar@nc.com",
    payment: "Check",
    w9: "Verified",
  },
];

// --- INTERNAL HELPERS (Safe for Map Context) ---
const MapInstanceCapture = ({ setMap }) => {
  const map = useMap();
  useEffect(() => {
    setMap(map);
  }, [map, setMap]);
  return null;
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

// --- MODAL COMPONENT ---
const VendorModal = ({ isOpen, onClose, onSave, editingItem }) => {
  const [form, setForm] = useState({
    name: "",
    state: "",
    preference: "General",
    source: "USA Map",
    sourceOther: "",
    fbGroup: "",
    status: "Waiting for response",
    coverage: [],
    contact: "",
    email: "",
    payment: "",
    w9: "",
    lat: "",
    lng: "",
    rating: 3,
    isBlacklisted: false,
  });

  useEffect(() => {
    if (editingItem) setForm(editingItem);
    else
      setForm({
        name: "",
        state: "",
        preference: "General",
        source: "USA Map",
        sourceOther: "",
        fbGroup: "",
        status: "Waiting for response",
        coverage: [],
        contact: "",
        email: "",
        payment: "",
        w9: "",
        lat: "",
        lng: "",
        rating: 3,
        isBlacklisted: false,
      });
  }, [editingItem]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-[#030F1D] p-6 flex justify-between items-center shrink-0">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {editingItem ? (
              <Edit2 className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {editingItem ? "Edit Contractor" : "Add New Contractor"}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Contractor Name
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Acme Services LLC"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                State
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="e.g. TX"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Preference
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.preference}
                onChange={(e) =>
                  setForm({ ...form, preference: e.target.value })
                }
              >
                <option>General</option>
                <option>LLC (Unique)</option>
                <option>LLC (Brollex)</option>
                <option>LLC (Trucare)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Source
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              >
                <option>USA Map</option>
                <option>QHM Map</option>
                <option>Unique Map</option>
                <option>FB group</option>
                <option>Craigslist</option>
                <option>Yelp</option>
                <option>Mail</option>
                <option>Others</option>
              </select>
            </div>
            {form.source === "FB group" && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  FB Group Name
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                  value={form.fbGroup}
                  onChange={(e) =>
                    setForm({ ...form, fbGroup: e.target.value })
                  }
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Waiting for response</option>
                <option>Ongoing</option>
                <option>Onboarded</option>
                <option>Declined</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Contact No
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Coverage (States)
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.coverage}
                onChange={(e) => setForm({ ...form, coverage: e.target.value })}
                placeholder="TX, OK, FL (Comma separated)"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Payment Info
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800"
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                W9 Info
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 h-20"
                value={form.w9}
                onChange={(e) => setForm({ ...form, w9: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold shadow-md hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const VendorMap = () => {
  const [view, setView] = useState("map");
  const [contractors, setContractors] = useState(INITIAL_CONTRACTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCompany, setActiveCompany] = useState(null);
  const [showBorders, setShowBorders] = useState(true);
  const [geoJsonData, setGeoJsonData] = useState(null); // All US States

  // Logistics
  const [clientCoords, setClientCoords] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [logistics, setLogistics] = useState(null);

  // Map Instance
  const [map, setMap] = useState(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // --- FETCH GEOJSON FOR ALL STATES ---
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Failed to load US states", err));
  }, []);

  // --- ACTIONS ---
  const handleMapClick = (latlng) => {
    setClientCoords(latlng);
    setLogistics(null);
  };

  const calculateLogistics = () => {
    if (!clientCoords || !selectedVendor) return;
    setLogistics({
      car: { time: "45 min", dist: "32 mi" },
      walk: { time: "8 hr", dist: "30 mi" },
      train: { time: "1 hr 15m", dist: "35 mi" },
      air: { time: "N/A", dist: "-" },
    });
  };

  const handleSaveContractor = (data) => {
    if (editingItem) {
      setContractors(
        contractors.map((c) =>
          c.id === editingItem.id ? { ...data, id: editingItem.id } : c
        )
      );
    } else {
      const newLat = 37.0 + (Math.random() - 0.5) * 10;
      const newLng = -95.0 + (Math.random() - 0.5) * 20;
      setContractors([
        ...contractors,
        { ...data, id: Date.now(), lat: newLat, lng: newLng },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "State",
      "Status",
      "Rating",
      "Contact",
      "Email",
      "Preference",
      "Source",
      "Payment",
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      contractors
        .map(
          (c) =>
            `${c.id},${c.name},${c.state},${c.status},${c.rating},${c.contact},${c.email},${c.preference},${c.source},${c.payment}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vendors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Data
  const mapVendors = contractors.filter((c) => c.status === "Onboarded");
  const gridVendors = contractors.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePolygons = useMemo(() => {
    if (!activeCompany) return [];
    const comp = COMPANIES.find((c) => c.id === activeCompany);
    if (!comp) return [];
    return comp.regions.map((region, idx) => ({
      id: `poly-${comp.id}-${idx}`,
      path: region,
      color: comp.color,
      name: comp.name,
    }));
  }, [activeCompany]);

  // GeoJSON Style Function
  const styleState = (feature) => {
    return {
      fillColor: stringToColor(feature.properties.name),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.6,
    };
  };

  const onEachState = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name, {
        direction: "center",
        className:
          "bg-transparent border-none shadow-none font-bold text-slate-800 text-xs opacity-70",
        permanent: false,
        sticky: true,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white">
            Vendor Logistics Map
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Locate onboarded vendors, check coverage, and calculate logistics.
          </p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === "map"
                ? "bg-white dark:bg-slate-800 text-orange-600 shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <MapIcon className="w-4 h-4" /> Map View
          </button>
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === "grid"
                ? "bg-white dark:bg-slate-800 text-orange-600 shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <List className="w-4 h-4" /> Contractor Grid
          </button>
        </div>
      </div>

      {view === "map" && (
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex relative">
          {/* LEFT OVERLAY: SEARCH & LOGISTICS */}
          <div className="absolute top-4 left-4 z-[400] w-80 flex flex-col gap-4 pointer-events-auto">
            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-lg shadow-md p-2 border border-transparent focus-within:border-blue-500 transition-all">
              <Menu className="w-5 h-5 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search Google Maps"
                className="flex-1 px-2 text-sm outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 text-slate-400" />
            </div>

            {/* Quick Toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowBorders(!showBorders)}
                className={`px-3 py-1 bg-white rounded-full text-xs font-bold shadow-sm border ${
                  showBorders
                    ? "text-blue-600 border-blue-200"
                    : "text-slate-600 border-transparent"
                }`}
              >
                Borders
              </button>
              <button className="px-3 py-1 bg-white rounded-full text-xs font-bold shadow-sm text-slate-600 border border-transparent hover:bg-slate-50">
                Traffic
              </button>
            </div>

            {/* Logistics Panel */}
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-slate-200">
              <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4" /> Logistics Calculator
              </h3>

              <div className="space-y-2 mb-3">
                <div className="relative">
                  <MapPin className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded border border-slate-200 text-xs"
                    readOnly
                    value={
                      clientCoords
                        ? `${clientCoords.lat.toFixed(
                            4
                          )}, ${clientCoords.lng.toFixed(4)}`
                        : "Click map to set Client Loc"
                    }
                  />
                </div>
                <div className="relative">
                  <CheckCircle className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded border border-slate-200 text-xs"
                    readOnly
                    value={
                      selectedVendor ? selectedVendor.name : "Select Vendor Pin"
                    }
                  />
                </div>
              </div>

              <button
                onClick={calculateLogistics}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm mb-3"
              >
                Calculate Distance
              </button>

              {logistics && (
                <div className="grid grid-cols-4 gap-2 text-center border-t pt-3 border-slate-100">
                  <div>
                    <Car className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                    <span className="block text-[10px] font-bold">
                      {logistics.car.time}
                    </span>
                  </div>
                  <div>
                    <Footprints className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                    <span className="block text-[10px] font-bold">
                      {logistics.walk.time}
                    </span>
                  </div>
                  <div>
                    <Train className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                    <span className="block text-[10px] font-bold">
                      {logistics.train.time}
                    </span>
                  </div>
                  <div>
                    <Plane className="w-4 h-4 mx-auto text-sky-500 mb-1" />
                    <span className="block text-[10px] font-bold">
                      {logistics.air.time}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT OVERLAY: LEGEND */}
          <div className="absolute top-4 right-4 z-[400] w-60 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden pointer-events-auto">
            <div className="p-3 bg-slate-50 border-b flex items-center gap-2 font-bold text-xs uppercase text-slate-500">
              <Layers className="w-4 h-4" /> Coverage Layers
            </div>
            <div className="p-2 max-h-64 overflow-y-auto space-y-1">
              {COMPANIES.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() =>
                    setActiveCompany(activeCompany === comp.id ? null : comp.id)
                  }
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-all ${
                    activeCompany === comp.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full border ${
                      activeCompany === comp.id
                        ? "bg-blue-500 border-blue-600"
                        : "border-slate-300"
                    }`}
                  ></div>
                  <span className="font-medium text-slate-600 text-xs">
                    {comp.name}
                  </span>
                  <div
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ backgroundColor: comp.color }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* BOTTOM RIGHT: ZOOM CONTROLS */}
          <div className="absolute bottom-8 right-4 z-[400] flex flex-col gap-2 pointer-events-auto">
            <button
              onClick={() => map?.locate()}
              className="p-3 bg-white rounded shadow-md hover:bg-slate-50 text-slate-600 border-0"
            >
              <Crosshair className="w-5 h-5" />
            </button>
            <div className="flex flex-col bg-white rounded shadow-md overflow-hidden">
              <button
                onClick={() => map?.zoomIn()}
                className="p-3 hover:bg-slate-50 text-slate-600 border-b border-slate-100"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => map?.zoomOut()}
                className="p-3 hover:bg-slate-50 text-slate-600"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MAP CONTAINER */}
          <div className="flex-1 z-0">
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution="&copy; CARTO"
              />

              <MapInstanceCapture setMap={setMap} />
              <MapClickHandler onClick={handleMapClick} />

              {/* DYNAMIC STATE BORDERS */}
              {showBorders && geoJsonData && (
                <GeoJSON
                  data={geoJsonData}
                  style={styleState}
                  onEachFeature={onEachState}
                />
              )}

              {/* County Borders */}
              {showBorders &&
                COUNTIES.map((c, i) => (
                  <Polygon
                    key={`county-${i}`}
                    positions={c.path}
                    pathOptions={{
                      color: "#94a3b8",
                      weight: 1,
                      fillColor: "transparent",
                      fillOpacity: 0,
                    }}
                  />
                ))}

              {/* Active Coverage Polygons */}
              {activePolygons.map((poly) => (
                <Polygon
                  key={poly.id}
                  positions={poly.path}
                  pathOptions={{
                    color: poly.color,
                    weight: 2,
                    fillColor: poly.color,
                    fillOpacity: 0.2,
                  }}
                >
                  <Tooltip sticky direction="top">
                    {poly.name} Zone
                  </Tooltip>
                </Polygon>
              ))}

              {/* Client Pin */}
              {clientCoords && (
                <Marker position={clientCoords} icon={createClientIcon()}>
                  <Popup>Client Location</Popup>
                </Marker>
              )}

              {/* Vendor Pins */}
              {mapVendors.map((c) => (
                <Marker
                  key={c.id}
                  position={[c.lat, c.lng]}
                  icon={createVendorIcon(
                    c.rating >= 4.5
                      ? "bg-emerald-500"
                      : c.rating >= 3
                      ? "bg-orange-500"
                      : "bg-red-500",
                    c.isBlacklisted
                  )}
                  eventHandlers={{ click: () => setSelectedVendor(c) }}
                >
                  <Popup>
                    <div className="text-center font-bold">
                      {c.name}
                      <br />
                      <span className="text-xs font-normal text-slate-500">
                        {c.state}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {/* --- GRID VIEW --- */}
      {view === "grid" && (
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2 relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search contractors..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                <Download className="w-4 h-4" /> Export
              </button>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#030F1D] text-white rounded-lg text-sm font-bold hover:bg-slate-800"
              >
                <Plus className="w-4 h-4" /> Add Contractor
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">State</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {gridVendors.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="p-4 font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      {c.name}{" "}
                      {c.isBlacklisted && (
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                      )}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {c.state}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {c.source}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          c.status === "Onboarded"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />{" "}
                      {c.rating}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {c.contact}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {c.payment}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setEditingItem(c);
                          setIsModalOpen(true);
                        }}
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

      {/* MODAL */}
      <VendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContractor}
        editingItem={editingItem}
      />

      <style>{`.leaflet-container { background-color: #f0f4f8; } .leaflet-tooltip { background-color: white; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-radius: 6px; padding: 4px 8px; font-family: sans-serif; font-size: 12px; }`}</style>
    </div>
  );
};

export default VendorMap;
