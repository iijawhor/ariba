import React from "react";

const AttendanceStats = () => {
  const stats = [
    {
      label: "Me",
      hours: "6 hr 20 mins",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2C80FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bg-blue-100 p-1 rounded-full"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      )
    },
    {
      label: "My Class",
      hours: "6 hr 20 mins",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2C80FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bg-blue-100 p-1 rounded-full"
        >
          <circle cx="12" cy="7" r="3" />
          <path d="M6 21c0-3 3-6 6-6s6 3 6 6" />
          <circle cx="5" cy="9" r="2" />
          <path d="M1 21c0-2.5 2-4.5 4.5-4.5" />
          <circle cx="19" cy="9" r="2" />
          <path d="M23 21c0-2.5-2-4.5-4.5-4.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
        >
          {/* Left: Icon + Label */}
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            {stat.icon}
            <span className="text-gray-800 font-semibold text-base">
              {stat.label}
            </span>
          </div>

          {/* Right: Hours Info */}
          <div className="flex flex-col items-center sm:items-end">
            <span className="text-gray-500 text-xs uppercase tracking-wider">
              Avg hrs / day
            </span>
            <span className="text-gray-800 font-medium text-sm">
              {stat.hours}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
