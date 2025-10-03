import React from "react";

const FilterDates = ({ filterValue, setFilterValue }) => {
  return (
    <div className="w-full max-w-xs md:max-w-sm">
      <div className="flex flex-col md:flex-row gap-2 items-center bg-white rounded-md shadow-sm p-2">
        {/* From Date */}
        <div className="flex flex-col flex-1">
          <label htmlFor="fromDate" className="font-sans text-xs text-gray-700">
            From
          </label>
          <input
            id="fromDate"
            type="date"
            value={filterValue?.fromDate}
            onChange={(e) =>
              setFilterValue((prev) => ({
                ...prev,
                fromDate: e.target.value
              }))
            }
            className="w-full text-xs text-gray-900 bg-[#E7F0FF] rounded-sm p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none text-center"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col flex-1">
          <label htmlFor="toDate" className="font-sans text-xs text-gray-700">
            To
          </label>
          <input
            id="toDate"
            type="date"
            value={filterValue?.toDate}
            onChange={(e) =>
              setFilterValue((prev) => ({
                ...prev,
                toDate: e.target.value
              }))
            }
            className="w-full text-xs text-gray-900 bg-[#E7F0FF] rounded-sm p-1 focus:ring-2 focus:ring-blue-400 focus:outline-none text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterDates;
