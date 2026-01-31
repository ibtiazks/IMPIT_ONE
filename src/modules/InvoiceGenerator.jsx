import React, { useState } from "react";
import {
  FileText,
  Search,
  Send,
  Printer,
  Download,
  CheckCircle,
  Clock,
  DollarSign,
  MoreVertical,
  X,
  Mail,
  ChevronRight,
} from "lucide-react";

// --- MOCK DATA: RFO WORK ORDERS ---
const RFO_ORDERS = [
  {
    id: "WO-2026-881",
    client: "René Khan",
    clientCompany: "Hometown Property Group",
    clientAddress: "169 Ramapo Valley Road, Oakland, NJ 07436",
    propertyAddress: "557 Azalea Rd, Mobile, AL 36609",
    rfoDate: "Jan 10, 2026",
    status: "RFO",
    description:
      "Verify Address, Shrubs Trimming, Tree Trimming - (front and rear side), Vines Removal - (apartment's exterior wall), Fallen Tree Branches Removal - (rear side), Gutter Cleaning.",
    amount: 19000.0,
    advance: 12000.0,
    tax: 0,
    discount: 0,
  },
  {
    id: "WO-2026-885",
    client: "Sarah Miller",
    clientCompany: "Apex Asset Management",
    clientAddress: "4455 Landing Way, Jacksonville, FL 32250",
    propertyAddress: "8921 Bayview Blvd, Norfolk, VA 23503",
    rfoDate: "Jan 11, 2026",
    status: "RFO",
    description:
      "Full Winterization, Lock Change (Front/Back), Debris Removal (25 CYD), Roof Tarping (15x20).",
    amount: 4500.0,
    advance: 0.0,
    tax: 0,
    discount: 0,
  },
  {
    id: "WO-2026-892",
    client: "David Chen",
    clientCompany: "Urban Real Estate",
    clientAddress: "1010 Market St, Philadelphia, PA 19107",
    propertyAddress: "2204 Walnut St, Philadelphia, PA 19103",
    rfoDate: "Jan 12, 2026",
    status: "RFO",
    description:
      "Mold Remediation (Basement), Drywall Repair, Interior Painting (White Semi-Gloss).",
    amount: 8200.0,
    advance: 4100.0,
    tax: 0,
    discount: 0,
  },
];

// --- COMPONENTS ---

// 1. INVOICE PREVIEW COMPONENT (The Design)
const InvoiceTemplate = ({ order }) => {
  const due = order.amount - order.advance;
  const invoiceNum = `INV-${order.id.split("-")[2]}`;
  const date = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <div
      className="bg-white text-slate-800 p-8 max-w-4xl mx-auto shadow-lg border border-slate-200"
      id="invoice-print"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-12">
        <div className="bg-[#0e4e68] text-white p-4 -ml-8 pl-8 pr-12 rounded-r-full shadow-md">
          <h1 className="font-bold text-xl uppercase tracking-wider">
            Rite-Option Preservation LLC
          </h1>
          <p className="text-xs opacity-90">6420 CABELL CT</p>
          <p className="text-xs opacity-90">Springfield, VA, 22150</p>
          <p className="text-xs opacity-90 underline">www.riteoption.com</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-extrabold text-[#0e4e68]">
            Deposit Invoice
          </h2>
          <p className="text-lg font-bold text-slate-600">{invoiceNum}</p>
        </div>
      </div>

      {/* BILL TO & DATE */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">
            Bill To:
          </p>
          <h3 className="text-xl font-bold">{order.client}</h3>
          <p className="text-sm text-slate-600">{order.clientCompany}</p>
          <p className="text-sm text-slate-600 max-w-xs">
            {order.clientAddress}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase">
            Invoice Date
          </p>
          <p className="font-bold">{date}</p>
        </div>
      </div>

      <hr className="border-slate-200 mb-6" />

      {/* PROPERTY ADDRESS */}
      <div className="mb-8">
        <span className="font-bold text-lg">Address of the Property: </span>
        <span className="font-bold text-lg text-slate-700">
          {order.propertyAddress}
        </span>
      </div>

      {/* TABLE */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-slate-800">
            <th className="text-left py-2 font-bold uppercase text-xs w-2/3">
              Description of Work
            </th>
            <th className="text-center py-2 font-bold uppercase text-xs">
              Quantity
            </th>
            <th className="text-right py-2 font-bold uppercase text-xs">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <td className="py-4 text-sm pr-4 leading-relaxed">
              {order.description}
            </td>
            <td className="py-4 text-center text-sm">1</td>
            <td className="py-4 text-right text-sm font-bold">
              $
              {order.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="flex justify-end mb-12">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-bold">Advance Paid</span>
            <span>
              $
              {order.advance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold">Due</span>
            <span>
              ${due.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold">Tax 0%</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold">Discount 0%</span>
            <span>$0.00</span>
          </div>
          <div className="bg-[#5a86a0] text-white p-2 flex justify-between items-center mt-2 rounded-sm shadow-sm">
            <span className="font-bold uppercase text-sm">Due Payable</span>
            <span className="font-extrabold text-lg">
              ${due.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER & BANKING */}
      <div className="flex justify-between items-end bg-slate-50 p-6 rounded-lg border border-slate-100">
        <div className="text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700 text-sm mb-2">
            Payment Method (Bank Deposit)
          </p>
          <p>
            <span className="font-semibold">Account Name:</span> Rite - Option
            Preservation Llc
          </p>
          <p>
            <span className="font-semibold">Account Number:</span> 435057259783
          </p>
          <p>
            <span className="font-semibold">Routing Number (ACH):</span>{" "}
            051000017
          </p>
          <p>
            <span className="font-semibold">Bank Name:</span> BANK OF AMERICA
            N.A
          </p>
        </div>
        <div className="text-right">
          <h4 className="font-bold text-lg text-slate-800">Morgan Conway</h4>
          <p className="text-xs font-bold text-slate-500 uppercase">
            Senior Manager
          </p>
          <p className="text-xs text-slate-400">Accounts & Audit</p>
        </div>
      </div>

      <div className="mt-4 bg-[#0e4e68] text-white text-center py-2 text-xs font-bold rounded-b-lg">
        Mail Us at vendors@riteoption.com or Call Us at +1 703 297 5976
      </div>
    </div>
  );
};

// 2. EMAIL COMPOSER MODAL
const EmailComposer = ({ order, onClose, onSend }) => {
  const subject = `Invoice #${order.id} - ${order.propertyAddress}`;
  const body = `Dear ${
    order.client
  },\n\nPlease find attached the deposit invoice for the work order at ${
    order.propertyAddress
  }.\n\nTotal Due: $${(
    order.amount - order.advance
  ).toLocaleString()}\n\nThank you for your business.\n\nBest regards,\nRite-Option Preservation LLC`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-[#030F1D] p-4 text-white flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Mail className="w-5 h-5" /> Send Invoice to Client
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              To
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
              value={`${order.client} <client@email.com>`}
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Subject
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:border-slate-700"
              defaultValue={subject}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg h-32 bg-white dark:bg-slate-950 dark:border-slate-700"
              defaultValue={body}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FileText className="w-4 h-4" />
            <span>Invoice_{order.id}.pdf attached</span>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const InvoiceGenerator = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // The order being viewed/invoiced
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = RFO_ORDERS.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendEmail = () => {
    // Logic to actually send would go here
    setShowEmailModal(false);
    setSelectedOrder(null);
    alert("Invoice Sent Successfully to Client!");
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* HEADER & SEARCH */}
      {!selectedOrder && (
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" /> Invoice Generator
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Generate and email invoices for RFO work orders.
            </p>
          </div>

          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Work Orders..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* LIST VIEW (GRID) */}
      {!selectedOrder ? (
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-500 uppercase sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Work Order #</th>
                  <th className="p-4">Property Address</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">RFO Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4 font-bold text-blue-600">{order.id}</td>
                    <td
                      className="p-4 text-slate-600 dark:text-slate-300 max-w-xs truncate"
                      title={order.propertyAddress}
                    >
                      {order.propertyAddress}
                    </td>
                    <td className="p-4 font-medium text-slate-800 dark:text-white">
                      {order.client}
                    </td>
                    <td className="p-4 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.rfoDate}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-700 dark:text-slate-200">
                      ${order.amount.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-2 ml-auto"
                      >
                        <DollarSign className="w-3 h-3" /> Create Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* INVOICE PREVIEW MODE */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-4 shrink-0">
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Grid
            </button>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button
                onClick={() => setShowEmailModal(true)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-blue-700 transition-transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" /> Send to Client
              </button>
            </div>
          </div>

          {/* Scrollable Invoice Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-black/50 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
            <InvoiceTemplate order={selectedOrder} />
          </div>
        </div>
      )}

      {/* EMAIL MODAL */}
      {showEmailModal && selectedOrder && (
        <EmailComposer
          order={selectedOrder}
          onClose={() => setShowEmailModal(false)}
          onSend={handleSendEmail}
        />
      )}
    </div>
  );
};

export default InvoiceGenerator;
