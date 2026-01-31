import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Coffee,
  AlertCircle,
  CheckCircle2,
  Clock,
  Cake,
  PartyPopper,
  Medal,
  Users,
} from "lucide-react";

// --- HELPER FUNCTIONS ---

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const isWeekend = (year, month, day) => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0=Sun, 6=Sat
};

const formatDate = (dateStr) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

const isSameMonthDay = (dateStr, currentMonth, currentDay) => {
  const [y, m, day] = dateStr.split("-").map(Number);
  return m - 1 === currentMonth && day === currentDay;
};

// --- MOCK DATA ---

const INITIAL_HOLIDAYS = [
  { id: 1, date: "2026-01-01", name: "New Year's Day" },
  { id: 2, date: "2026-07-04", name: "Independence Day" },
  { id: 3, date: "2026-12-25", name: "Christmas Day" },
];

const MOCK_EMPLOYEES = [
  {
    id: 101,
    name: "Sarah Jenkins",
    dob: "1992-01-15",
    joinDate: "2020-01-20",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 102,
    name: "Mike Chen",
    dob: "1988-03-12",
    joinDate: "2019-06-15",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 103,
    name: "Jessica Low",
    dob: "1995-01-28",
    joinDate: "2021-11-01",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 104,
    name: "David Kim",
    dob: "1990-07-20",
    joinDate: "2022-01-05",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
  },
  {
    id: 105,
    name: "Md Nayeeb",
    dob: "1985-01-10",
    joinDate: "2015-01-01",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100",
  }, // Founder
];

const HolidaySetup = () => {
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState(INITIAL_HOLIDAYS);

  // Form State
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [newHolidayName, setNewHolidayName] = useState("");
  const [error, setError] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Actions
  const handleAddHoliday = () => {
    if (!newHolidayDate || !newHolidayName) {
      setError("Please fill in both fields.");
      return;
    }

    const dateObj = new Date(newHolidayDate);
    const dayOfWeek = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    ).getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setError("Selected date is already a weekend (Sat/Sun).");
      return;
    }

    if (holidays.some((h) => h.date === newHolidayDate)) {
      setError("This date is already marked as a holiday.");
      return;
    }

    setHolidays(
      [
        ...holidays,
        { id: Date.now(), date: newHolidayDate, name: newHolidayName },
      ].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
    setNewHolidayName("");
    setNewHolidayDate("");
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this holiday?")) {
      setHolidays(holidays.filter((h) => h.id !== id));
    }
  };

  // Grid Generation
  const renderCalendarDays = () => {
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-32 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
        ></div>
      );
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      const isSatSun = isWeekend(year, month, d);

      const holiday = holidays.find((h) => h.date === dateStr);
      const birthdays = MOCK_EMPLOYEES.filter((e) =>
        isSameMonthDay(e.dob, month, d)
      );
      const anniversaries = MOCK_EMPLOYEES.filter((e) =>
        isSameMonthDay(e.joinDate, month, d)
      ).map((e) => {
        const joinYear = parseInt(e.joinDate.split("-")[0]);
        const yearsExp = year - joinYear;
        return { ...e, yearsExp };
      });

      let bgClass = "bg-white dark:bg-slate-900";
      let textClass = "text-slate-700 dark:text-slate-300";
      let borderClass = "border-slate-200 dark:border-slate-800";

      if (isSatSun) {
        bgClass = "bg-slate-100 dark:bg-slate-800/50";
        textClass = "text-slate-400 dark:text-slate-500";
      } else if (holiday) {
        bgClass = "bg-orange-50 dark:bg-orange-900/20";
        borderClass = "border-orange-200 dark:border-orange-800";
      }

      days.push(
        <div
          key={d}
          className={`min-h-[8rem] p-2 border ${borderClass} ${bgClass} flex flex-col justify-between transition-colors hover:shadow-inner relative group`}
        >
          <div className="flex justify-between items-start">
            <span className={`font-bold text-sm ${textClass}`}>{d}</span>
            {isSatSun && (
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                Off
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-1 overflow-y-auto custom-scrollbar max-h-24">
            {/* Holiday Label */}
            {holiday && (
              <div className="text-[10px] font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/40 p-1 rounded leading-tight flex items-center gap-1">
                <Coffee className="w-3 h-3 shrink-0" /> {holiday.name}
              </div>
            )}

            {/* Birthday Labels with Picture */}
            {birthdays.map((emp) => (
              <div
                key={`bday-${emp.id}`}
                className="text-[10px] font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/30 p-1 rounded leading-tight flex items-center gap-1.5"
              >
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-4 h-4 rounded-full object-cover border border-pink-200"
                />
                <span className="truncate">{emp.name}</span>
                <Cake className="w-3 h-3 shrink-0 text-pink-500 ml-auto" />
              </div>
            ))}

            {/* Anniversary Labels with Picture */}
            {anniversaries.map((emp) => (
              <div
                key={`work-${emp.id}`}
                className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 p-1 rounded leading-tight flex items-center gap-1.5"
              >
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-4 h-4 rounded-full object-cover border border-indigo-200"
                />
                <span className="truncate">
                  {emp.name} ({emp.yearsExp}y)
                </span>
                <Medal className="w-3 h-3 shrink-0 text-indigo-500 ml-auto" />
              </div>
            ))}
          </div>

          {/* Hover Add (Business Day Only) */}
          {!isSatSun && !holiday && (
            <button
              onClick={() => setNewHolidayDate(dateStr)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-[1px] transition-opacity z-10"
            >
              <Plus className="w-6 h-6 text-blue-500" />
            </button>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[#030F1D] dark:text-white flex items-center gap-2">
            <Coffee className="w-6 h-6 text-orange-500" /> Company Calendar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage holidays, track birthdays, and celebrate work anniversaries.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-6 overflow-hidden">
        {/* CALENDAR VIEW (LEFT) */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 transition-colors"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className={`py-2 text-center text-xs font-bold uppercase ${
                  day === "Sun" || day === "Sat"
                    ? "text-red-400"
                    : "text-slate-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 grid grid-cols-7 overflow-y-auto custom-scrollbar bg-slate-200 dark:bg-slate-800 gap-px border-b border-slate-200 dark:border-slate-800">
            {renderCalendarDays()}
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-950 text-xs text-slate-500 flex gap-6 justify-center flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-slate-200 rounded-sm"></span> Weekend
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-orange-100 border border-orange-200 rounded-sm"></span>{" "}
              Holiday
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-pink-100 border border-pink-200 rounded-sm"></span>{" "}
              Birthday
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-indigo-100 border border-indigo-200 rounded-sm"></span>{" "}
              Work Anniversary
            </span>
          </div>
        </div>

        {/* SIDEBAR: INPUT & LIST (RIGHT) */}
        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0 overflow-y-auto custom-scrollbar">
          {/* Add Holiday Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">
              Add Holiday
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2 text-xs text-red-600 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-blue-500 dark:text-white"
                  value={newHolidayDate}
                  onChange={(e) => {
                    setError("");
                    setNewHolidayDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Holiday Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thanksgiving"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-blue-500 dark:text-white"
                  value={newHolidayName}
                  onChange={(e) => {
                    setError("");
                    setNewHolidayName(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={handleAddHoliday}
                className="w-full py-2 bg-[#030F1D] text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add to Calendar
              </button>
            </div>
          </div>

          {/* Upcoming List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                Scheduled Holidays
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {holidays.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-slate-400">
                  <Coffee className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs">No holidays set.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {holidays.map((h) => (
                    <div
                      key={h.id}
                      className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex flex-col items-center justify-center border border-orange-100 dark:border-orange-800/30">
                          <span className="text-[10px] font-bold uppercase leading-none">
                            {new Date(h.date).toLocaleString("default", {
                              month: "short",
                            })}
                          </span>
                          <span className="text-sm font-black leading-none">
                            {new Date(h.date).getDate()}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-700 dark:text-white">
                            {h.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatDate(h.date)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(h.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4" />
                <span>
                  Year Total:{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    {holidays.length} Days
                  </span>{" "}
                  off
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidaySetup;
