import React from "react";

const AttendanceStats = () => {
  return (
    <div className="card h-45 border p-2 border-gray-200 w-full bg-white card-sm rounded-md">
      <div className="flex flex-col h-full  items justify-evenly">
        <div className="flex justify-between  ">
          <div className="w-full flex gap-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="border rounded-full text-[#2C80FF]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />

                <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
              </svg>
            </span>
            <span className="text-[sans-serif] text-gray-600">Me</span>
          </div>

          <div className="flex w-full text-right flex-col gap-1">
            <p className="text-xs tracking-wider font-[sans-serif] uppercase">
              Avg hrs / day
            </p>
            <p className="text-xs tracking-wider font-[sans-serif] uppercase">
              6 hr 20 mins
            </p>
          </div>
        </div>
        <span className="border border-gray-200 rounded-full"></span>
        <div className="flex justify-between  ">
          <div className="w-full flex gap-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="border rounded-full text-[#2C80FF]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="3" />
                <path d="M6 21c0-3 3-6 6-6s6 3 6 6" />

                <circle cx="5" cy="9" r="2" />
                <path d="M1 21c0-2.5 2-4.5 4.5-4.5" />

                <circle cx="19" cy="9" r="2" />
                <path d="M23 21c0-2.5-2-4.5-4.5-4.5" />
              </svg>
            </span>
            <span className="text-[sans-serif] text-gray-600 capitalize">
              My class
            </span>
          </div>

          <div className="flex w-full text-right flex-col gap-1">
            <p className="text-xs tracking-wider font-[sans-serif] uppercase">
              Avg hrs / day
            </p>
            <p className="text-xs tracking-wider font-[sans-serif] uppercase">
              6 hr 20 mins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;
