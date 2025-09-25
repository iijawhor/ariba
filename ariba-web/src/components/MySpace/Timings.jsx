import React from "react";

const Timings = () => {
  const weekdays = [
    { name: "sunday", id: 1 },
    { name: "Monday", id: 2 },
    { name: "tuesday", id: 3 },
    { name: "wednesday", id: 4 },
    { name: "thursday", id: 5 },
    { name: "friday", id: 6 },
    { name: "saturday", id: 7 }
  ];
  const currentDate = new Date();
  const dayOfWeekNumber = currentDate.getDay();
  const dayOfWeek = weekdays[dayOfWeekNumber];

  return (
    <div className="card p-2 h-45 border border-gray-200 w-full bg-white card-sm rounded-md">
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-evenly">
          {weekdays.map((day) => (
            <p
              className={`${
                day === dayOfWeek ? "!border-[#2C80FF] text-[#2C80FF]" : ""
              } border border-gray-300  h-5 w-5 text-xs text-center font-semibold text-[sans-serif] rounded-full`}
            >
              {day.name.charAt(0).toUpperCase()}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <div className="">
            <p className="text-xs font-[sans-serif] text-gray-800 uppercase">
              Today ( 10 AM - 4:30 PM)
            </p>
          </div>
          <div className="flex">
            <span className="bg-gray-300 h-2 flex-2 rounded-l-sm"></span>
            <p className="bg-[#2C80FF] text-center h-2 flex-1">
              <span className="text-xs text-gray-700 uppercase">7:00 hrs</span>
            </p>
            <span className="bg-gray-300 h-2 flex-2 rounded-r-sm"></span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                className="text-[#2C80FF]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10c0-3 2-5 5-5h4c3 0 5 2 5 5v3c0 3-2 5-5 5H9c-3 0-5-2-5-5v-3z" />
                <path d="M9 5c2.2-.3 4.5-.3 6.7 0" />
                <path d="M19 11c1.5 0 3 1.2 3 3s-1.5 3-3 3" />

                <ellipse cx="11" cy="20" rx="7" ry="1.5" />

                <circle cx="19" cy="6" r="4" />
                <path d="M19 4v2l1.5 1" />
              </svg>
            </span>
            <span className="text-xs font-[sans-serif]">45 mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timings;
