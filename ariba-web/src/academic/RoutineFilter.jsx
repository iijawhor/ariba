// RoutineFilter.jsx
import { useState, useEffect } from "react";
import { useAcademic } from "../hooks/useAcademic";

const RoutineFilter = ({
  classes,
  teachers,
  onFilterChange,
  onViewRoutine
}) => {
  const { getRoutineHook } = useAcademic();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const [routineFilter, setRoutineFilter] = useState({
    date: new Date().toISOString().split("T")[0],
    grade: "",
    teacher: "",
    day: ""
  });

  // Call parent callback whenever filters change
  useEffect(() => {
    onFilterChange(routineFilter);
  }, [routineFilter]);

  const handleGetRoutine = () => {
    onViewRoutine();
    getRoutineHook(routineFilter);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
      <h2 className="text-[#2C80FF] text-xl font-semibold mb-5">
        Routine Filters
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-5 gap-4">
        {/* Day Dropdown */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Day <span className="text-red-500">*</span>
          </label>
          <select
            value={routineFilter.day}
            onChange={(e) =>
              setRoutineFilter((prev) => ({ ...prev, day: e.target.value }))
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-800 bg-white"
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Class Dropdown */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            value={routineFilter.grade}
            onChange={(e) =>
              setRoutineFilter((prev) => ({ ...prev, grade: e.target.value }))
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-800 bg-white"
          >
            <option value="">Select Class</option>
            {classes?.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>

        {/* Teacher Dropdown */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Teacher
          </label>
          <select
            value={routineFilter.teacher}
            onChange={(e) =>
              setRoutineFilter((prev) => ({ ...prev, teacher: e.target.value }))
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-800 bg-white"
          >
            <option value="">Select Teacher</option>
            {teachers?.map((tch) => (
              <option key={tch._id} value={tch._id}>
                {tch.firstName} {tch.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* View Routine Button */}
        <div className="flex justify-end sm:justify-start">
          <button
            onClick={handleGetRoutine}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition w-full sm:w-auto"
          >
            View Routine
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineFilter;
