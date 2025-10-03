import React from "react";
import { Card } from "../../allFiles";

const Attendance = ({ filterValue }) => {
  const handleSearch = () => {};

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h1 className="text-lg md:text-xl font-sans text-[#2C80FF] font-semibold tracking-wide">
          Attendance
        </h1>
        <div className="w-full md:w-auto">
          <label className="flex items-center border bg-[#eef1ff] border-[#2C80FF] rounded-full px-2 py-1 gap-2 w-full md:w-72">
            <input
              type="search"
              placeholder="Search attendance by name..."
              className="outline-none w-full text-gray-800 text-sm font-sans tracking-wide"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch} className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </label>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <Card
          title={filterValue.user || "ds"}
          days="days"
          present="35"
          percentage="0"
          totalUsers="40"
          totalUserStyle="text-sm text-gray-600 uppercase"
        />
        <Card
          title="title"
          days="days"
          present="present"
          percenage="percentage"
        />
        <Card title="title" days="days" present="" percenage="percentage" />
      </div>

      {/* Present Attendance List */}
      <div className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col gap-3">
        {/* Section Header */}
        <h2 className="text-lg md:text-xl text-[#2C80FF] font-sans font-semibold tracking-wide">
          Present
        </h2>

        {/* List of Present Users */}
        <div className="flex flex-col gap-2 w-full overflow-x-auto">
          {/* Single User Row */}
          {["John Doe", "Jane Smith", "Robert Brown"].map((name, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-md p-3 sm:p-4 hover:bg-gray-100 transition"
            >
              {/* Left Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <p className="text-sm sm:text-base font-sans font-medium text-gray-800">
                  {name}
                </p>
                <p className="text-xs sm:text-sm font-sans text-gray-600">
                  Present Today
                </p>
              </div>

              {/* Right Info */}
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  10:00 AM
                </p>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  4:30 PM
                </p>
                <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold">
                  6h 30m
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
