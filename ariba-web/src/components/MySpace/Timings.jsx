import React from "react";

const Timings = () => {
  const weekdays = [
    { name: "Sun", id: 0 },
    { name: "Mon", id: 1 },
    { name: "Tue", id: 2 },
    { name: "Wed", id: 3 },
    { name: "Thu", id: 4 },
    { name: "Fri", id: 5 },
    { name: "Sat", id: 6 }
  ];

  const currentDate = new Date();
  const dayOfWeekNumber = currentDate.getDay();

  // Example work/break times
  const workBeforeBreak = 180; // in minutes (e.g., 3h)
  const breakDuration = 45; // in minutes
  const workAfterBreak = 165; // in minutes (2h 45m)
  const totalMinutes = workBeforeBreak + breakDuration + workAfterBreak;

  const getWidthPercent = (minutes) => (minutes / totalMinutes) * 100;

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
      {/* Weekdays */}
      <div className="flex justify-between items-center flex-wrap gap-1">
        {weekdays.map((day) => (
          <div
            key={day.id}
            className={`flex items-center justify-center h-10 w-10 rounded-full text-xs font-semibold flex-shrink-0 ${
              day.id === dayOfWeekNumber
                ? "bg-[#2C80FF] text-white border-2 border-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {day.name.charAt(0)}
          </div>
        ))}
      </div>

      {/* Today's Timing */}
      <div className="flex flex-col gap-3 flex-1 overflow-auto">
        <p className="text-gray-800 font-semibold text-sm truncate">
          Today: 10:00 AM - 4:30 PM
        </p>

        {/* Timeline Bar */}
        <div className="flex w-full h-4 rounded-full overflow-hidden bg-gray-200">
          {/* Work Before Break */}
          <div
            className="bg-[#2C80FF] h-full"
            style={{ width: `${getWidthPercent(workBeforeBreak)}%` }}
          ></div>

          {/* Break */}
          <div
            className="bg-yellow-400 h-full flex items-center justify-center"
            style={{ width: `${getWidthPercent(breakDuration)}%` }}
          >
            <span className="text-[10px] text-gray-800 font-semibold">
              Break
            </span>
          </div>

          {/* Work After Break */}
          <div
            className="bg-[#2C80FF] h-full"
            style={{ width: `${getWidthPercent(workAfterBreak)}%` }}
          ></div>
        </div>

        {/* Total Hours */}
        <p className="text-xs text-gray-700 mt-1 truncate">7:00 hrs total</p>

        {/* Additional Info */}
        <div className="flex items-center gap-2 text-gray-600 text-xs flex-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#2C80FF] flex-shrink-0"
          >
            <path d="M4 10c0-3 2-5 5-5h4c3 0 5 2 5 5v3c0 3-2 5-5 5H9c-3 0-5-2-5-5v-3z" />
            <ellipse cx="11" cy="20" rx="7" ry="1.5" />
            <circle cx="19" cy="6" r="4" />
            <path d="M19 4v2l1.5 1" />
          </svg>
          <span className="truncate">45 mins break</span>
        </div>
      </div>
    </div>
  );
};

export default Timings;
