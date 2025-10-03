import React from "react";

const UserFilter = ({ filterValue, setFilterValue }) => {
  return (
    <div className="relative flex-1 max-w-xs md:max-w-[150px]">
      <label htmlFor="userFilter" className="sr-only">
        Select User Role
      </label>
      <select
        id="userFilter"
        value={filterValue?.user}
        onChange={(e) =>
          setFilterValue((prev) => ({ ...prev, user: e.target.value }))
        }
        className="w-full bg-[#2C80FF] text-white text-xs font-sans rounded-lg p-2 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
      >
        {["teachers", "students", "admin"].map((option) => (
          <option
            key={option}
            value={option}
            className="text-gray-900 capitalize"
          >
            {option}
          </option>
        ))}
      </select>
      {/* Dropdown arrow using Tailwind */}
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
      </div>
    </div>
  );
};

export default UserFilter;
