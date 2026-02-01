import React, { useState, useEffect, useRef } from "react";

import {
  Eye,
  EyeOff,
  Check,
  User,
  Phone,
  Mail,
  Lock,
  ArrowLeft,
  Send,
  ShieldCheck,
  KeyRound,
  X,
  PhoneCall,
  FileText,
  Globe,
} from "lucide-react";

const Logo = ({ className = "w-12 h-12" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
      className="text-orange-500"
    />

    <path d="M50 5 L50 50 L90 75" className="text-orange-500" />

    <path d="M50 50 L10 75" className="text-orange-500" />

    <path d="M10 25 L50 50 L90 25" className="text-orange-500" />

    <path d="M10 25 L90 75" className="text-orange-500 opacity-50" />

    <path d="M90 25 L10 75" className="text-orange-500 opacity-50" />
  </svg>
);

const ContactAdminModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    ></div>

    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
      <div className="bg-[#030F1D] p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-md overflow-hidden border-2 border-white/20">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-white text-lg font-bold">Contact Support</h3>

        <p className="text-blue-200/60 text-xs uppercase tracking-wider">
          System Administrator
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <Mail className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Email Support
            </p>

            <p className="text-slate-800 font-semibold">support@impit.us</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <PhoneCall className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Helpline
            </p>

            <p className="text-slate-800 font-semibold">+1 (555) 019-2834</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="group relative w-full py-3 rounded-xl text-white font-bold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 transition-all duration-300 group-hover:scale-105"></div>

          <span className="relative z-10">Close</span>
        </button>
      </div>
    </div>
  </div>
);

const PrivacyModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    ></div>

    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
      <div className="bg-white border-b border-slate-100 p-6 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h3 className="text-2xl font-bold text-[#030F1D]">Privacy Policy</h3>

          <p className="text-slate-400 text-xs mt-1">
            Effective Date: Jan 01, 2026
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 text-slate-600 text-sm leading-relaxed">
        <section>
          <h4 className="text-slate-900 font-bold mb-2">1. Data Collection</h4>

          <p>
            IMPITONE collects minimal personal data required for operational
            purposes.
          </p>
        </section>

        <section>
          <h4 className="text-slate-900 font-bold mb-2">2. Usage of Data</h4>

          <p>
            Data is used strictly for generating operational reports and
            processing payroll.
          </p>
        </section>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
        <button
          onClick={onClose}
          className="px-8 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all bg-gradient-to-r from-orange-600 to-amber-500 hover:-translate-y-0.5"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const TermsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-100 p-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h3 className="text-2xl font-bold text-[#030F1D]">
              Terms & Conditions
            </h3>

            <p className="text-slate-400 text-xs mt-1">
              Last Updated: Dec 15, 2025
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />

          <p className="text-amber-800 text-xs leading-relaxed font-medium">
            Please read these terms carefully before using the IMPITONE
            platform.
          </p>
        </div>

        <div className="flex px-6 pt-4 gap-2 border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${
              activeTab === "general"
                ? "bg-orange-500 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            General
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${
              activeTab === "privacy"
                ? "bg-orange-500 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            Data Privacy
          </button>

          <button
            onClick={() => setActiveTab("liability")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${
              activeTab === "liability"
                ? "bg-orange-500 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            Liability
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 text-slate-600 text-sm leading-relaxed min-h-[300px]">
          {activeTab === "general" && (
            <div className="animate-fade-in">
              <section className="mb-6">
                <h4 className="text-slate-900 font-bold mb-2">
                  1. Acceptance of Terms
                </h4>

                <p>By accessing IMPITONE, you agree to these terms.</p>
              </section>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="animate-fade-in">
              <section className="mb-6">
                <h4 className="text-slate-900 font-bold mb-2">
                  1. Data Handling
                </h4>

                <p>Data is confidential.</p>
              </section>
            </div>
          )}

          {activeTab === "liability" && (
            <div className="animate-fade-in">
              <section className="mb-6">
                <h4 className="text-slate-900 font-bold mb-2">1. Limitation</h4>

                <p>IMPIT is not liable for indirect damages.</p>
              </section>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-white hover:shadow-sm transition-all"
          >
            Decline
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold shadow-lg shadow-orange-900/20 hover:bg-orange-600 transition-all"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default function LoginPortal({ onLogin }) {
  const [currentView, setCurrentView] = useState("login");

  const [showContactModal, setShowContactModal] = useState(false);

  const [showTermsModal, setShowTermsModal] = useState(false);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [loginMethod, setLoginMethod] = useState("email");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("nayeebrahman@gmail.com");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [fpMethod, setFpMethod] = useState("email");

  const [fpEmail, setFpEmail] = useState("");

  const [fpPhone, setFpPhone] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpInputRefs = useRef([]);

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (onLogin) onLogin();
  };

  const handleSendOTP = (e) => {
    e.preventDefault();

    setCurrentView("otp-verification");
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) otpInputRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpInputRefs.current[index - 1].focus();
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();

    setCurrentView("reset-password");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");

      return;
    }

    if (onLogin) {
      onLogin();
    } else {
      alert("Password Reset Successful! Redirecting to login...");

      setCurrentView("login");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-900 font-sans p-4">
      {showContactModal && (
        <ContactAdminModal onClose={() => setShowContactModal(false)} />
      )}

      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}

      {showPrivacyModal && (
        <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      <div
        className="absolute inset-0 z-0 opacity-100 transition-transform duration-[20s] ease-in-out transform hover:scale-105"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")`,

          backgroundSize: "cover",

          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-orange-900/40 mix-blend-multiply"></div>

      <div className="absolute inset-0 z-0 bg-black/20 backdrop-blur-[1px]"></div>

      <div className="relative z-10 w-full max-w-md md:max-w-2xl animate-fade-in-up px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/10 relative">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="grid md:grid-cols-1 gap-0">
            <div className="pt-10 pb-2 text-center relative px-6">
              <div className="flex justify-center mb-5 relative z-10">
                <div className="drop-shadow-2xl filter brightness-110">
                  <Logo className="w-20 h-20 text-white" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm text-white">
                <span className="text-[#030F1D]">IMPIT</span>

                <span className="text-orange-500">ONE</span>
              </h2>

              <p className="text-white/70 font-bold text-xs md:text-sm mt-2 tracking-[0.2em] uppercase">
                Property Preservation ERP
              </p>
            </div>

            {currentView === "login" ? (
              <div className="px-6 md:px-12 lg:px-16 pb-12 pt-6 animate-fade-in-up">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-white">
                      Welcome Back
                    </span>

                    <span className="text-2xl animate-wave origin-bottom-right">
                      👋
                    </span>
                  </div>
                </div>

                {/* <div className="flex gap-3 mb-8">
                  <button
                    onClick={() => setLoginMethod("email")}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border ${
                      loginMethod === "email"
                        ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <Mail className="w-4 h-4" /> Email
                  </button>

                  <button
                    onClick={() => setLoginMethod("phone")}
                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border ${
                      loginMethod === "phone"
                        ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <Phone className="w-4 h-4" /> Phone
                  </button>
                </div> */}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider ml-1">
                      {loginMethod === "email"
                        ? "Email / UserName"
                        : "Registered Phone"}
                    </label>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        {loginMethod === "email" ? (
                          <User className="h-5 w-5 text-white/80 group-focus-within:text-orange-400 transition-colors" />
                        ) : (
                          <Phone className="h-5 w-5 text-white/80 group-focus-within:text-orange-400 transition-colors" />
                        )}
                      </div>

                      <input
                        type={loginMethod === "email" ? "email" : "tel"}
                        value={loginMethod === "email" ? email : phone}
                        onChange={(e) =>
                          loginMethod === "email"
                            ? setEmail(e.target.value)
                            : setPhone(e.target.value)
                        }
                        className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all font-bold backdrop-blur-sm"
                        placeholder={
                          loginMethod === "email"
                            ? "name@impit.us"
                            : "+1 (555) 000-0000"
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider ml-1">
                      Password
                    </label>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-white/80 group-focus-within:text-orange-400 transition-colors" />
                      </div>

                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-12 pr-12 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all font-bold backdrop-blur-sm"
                        placeholder="••••••••"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => setRememberMe(!rememberMe)}
                    >
                      <div
                        className={`h-5 w-5 rounded border flex items-center justify-center transition-all duration-200 ${
                          rememberMe
                            ? "bg-orange-500 border-orange-500"
                            : "bg-white/10 border-slate-500"
                        }`}
                      >
                        {rememberMe && (
                          <Check
                            className="h-3.5 w-3.5 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>

                      <label className="ml-2 block text-sm font-bold text-white/80 select-none cursor-pointer hover:text-white transition-colors">
                        Remember me
                      </label>
                    </div>

                    {/* <div className="text-sm">
                      <button
                        type="button"
                        onClick={() => setCurrentView("forgot-password")}
                        className="font-bold text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div> */}
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 mt-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 transition-all duration-300 group-hover:scale-105"></div>

                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                    <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide">
                      Access Portal
                    </span>
                  </button>
                </form>

                <div className="mt-8 text-center border-t border-white/20 pt-6">
                  <p className="text-sm text-white/70 font-medium">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setShowContactModal(true)}
                      className="font-bold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      Contact Admin
                    </button>
                  </p>

                  <div className="mt-4 flex flex-col items-center gap-1">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                      Secured by IMPITONE Core
                    </p>

                    <div className="flex gap-2 items-center text-white/60 text-[10px] font-bold mt-1">
                      <button
                        onClick={() => setShowTermsModal(true)}
                        className="hover:text-orange-400 transition-colors"
                      >
                        Terms & Conditions
                      </button>

                      <span>•</span>

                      <button
                        onClick={() => setShowPrivacyModal(true)}
                        className="hover:text-orange-400 transition-colors"
                      >
                        Privacy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* --- Other Views (Forgot PW, OTP, Reset) --- */

              <div className="px-6 md:px-12 lg:px-16 pb-12 pt-6 animate-fade-in-up">
                {currentView === "forgot-password" && (
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Forgot Password
                    </h3>

                    <p className="text-white/70 text-sm max-w-xs mx-auto">
                      Enter your registered{" "}
                      {fpMethod === "email" ? "email" : "phone number"}. We'll
                      send you a code to reset your password.
                    </p>
                  </div>
                )}

                {currentView === "otp-verification" && (
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Verification Code
                    </h3>

                    <p className="text-white/70 text-sm max-w-xs mx-auto">
                      Please enter the code sent to your device.
                    </p>
                  </div>
                )}

                {currentView === "reset-password" && (
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Reset Password
                    </h3>

                    <p className="text-white/70 text-sm max-w-xs mx-auto">
                      Create a new strong password.
                    </p>
                  </div>
                )}

                {currentView === "forgot-password" && (
                  <>
                    <div className="flex gap-3 mb-8">
                      <button
                        onClick={() => setFpMethod("email")}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border ${
                          fpMethod === "email"
                            ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                            : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        <Mail className="w-4 h-4" /> Email
                      </button>

                      <button
                        onClick={() => setFpMethod("phone")}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border ${
                          fpMethod === "phone"
                            ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                            : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        <Phone className="w-4 h-4" /> Phone
                      </button>
                    </div>

                    <form onSubmit={handleSendOTP} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wider ml-1">
                          {fpMethod === "email"
                            ? "Email / UserName"
                            : "Registered Phone"}
                        </label>

                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            {fpMethod === "email" ? (
                              <Mail className="h-5 w-5 text-slate-400" />
                            ) : (
                              <Phone className="h-5 w-5 text-slate-400" />
                            )}
                          </div>

                          <input
                            type={fpMethod === "email" ? "email" : "tel"}
                            value={fpMethod === "email" ? fpEmail : fpPhone}
                            onChange={(e) =>
                              fpMethod === "email"
                                ? setFpEmail(e.target.value)
                                : setFpPhone(e.target.value)
                            }
                            className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            placeholder={
                              fpMethod === "email"
                                ? "name@impit.us"
                                : "+1 (555) 000-0000"
                            }
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 mt-6"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500"></div>

                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide">
                          Send OTP <Send className="w-4 h-4" />
                        </span>
                      </button>
                    </form>
                  </>
                )}

                {currentView === "otp-verification" && (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wider ml-1">
                        Sent to {fpMethod === "email" ? "Email" : "Phone"}
                      </label>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          {fpMethod === "email" ? (
                            <Mail className="h-5 w-5 text-slate-400" />
                          ) : (
                            <Phone className="h-5 w-5 text-slate-400" />
                          )}
                        </div>

                        <input
                          type="text"
                          value={fpMethod === "email" ? fpEmail : fpPhone}
                          readOnly
                          className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-xl text-slate-300 focus:outline-none cursor-not-allowed font-medium"
                        />

                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-4 pt-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-10 h-12 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 mt-8"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500"></div>

                      <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide">
                        Verify & Proceed <ShieldCheck className="w-4 h-4" />
                      </span>
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-slate-400">
                        Didn't receive code?{" "}
                        <button
                          type="button"
                          className="font-bold text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  </form>
                )}

                {currentView === "reset-password" && (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wider ml-1">
                        New Password
                      </label>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>

                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full pl-12 pr-12 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                          placeholder="••••••••"
                        />

                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white focus:outline-none"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wider ml-1">
                        Confirm Password
                      </label>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <ShieldCheck className="h-5 w-5 text-slate-400" />
                        </div>

                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 mt-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500"></div>

                      <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide">
                        Update Password <KeyRound className="w-4 h-4" />
                      </span>
                    </button>
                  </form>
                )}

                <div className="mt-8 text-center border-t border-white/20 pt-6">
                  <button
                    onClick={() => setCurrentView("login")}
                    className="flex items-center justify-center gap-2 mx-auto text-sm text-slate-300 font-bold hover:text-orange-400 transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />

                    {currentView === "reset-password"
                      ? "Cancel"
                      : "Back to Login"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes shine { 100% { left: 125%; } } .group:hover .animate-shine { animation: shine 1s; } @keyframes wave { 0% { transform: rotate(0deg); } 10% { transform: rotate(14deg); } 20% { transform: rotate(-8deg); } 30% { transform: rotate(14deg); } 40% { transform: rotate(-4deg); } 50% { transform: rotate(10deg); } 60% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } } .animate-wave { animation: wave 2.5s infinite; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; } @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }`}</style>
    </div>
  );
}
