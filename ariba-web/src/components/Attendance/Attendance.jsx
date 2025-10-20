import React from "react";
import { useSelector } from "react-redux";
import Card from "../card/Card.jsx";
import { useAttendanceStats } from "../../hooks/useCalculatePercentage.js";

const Attendance = ({ filterValue }) => {
  const userByRole = useSelector((state) => state.attendance.users) || [];
  const attendanceData = useSelector(
    (state) => state.attendance.attendanceRecord
  );

  const attendanceList = attendanceData?.attendance || [];

  // Flatten all attendanceRecords
  const attendanceRecords = attendanceList.flatMap(
    (user) =>
      user.attendanceRecords?.map((record) => ({
        ...record,
        userName: `${user.firstName} ${user.lastName}`,
        userRole: user.userRole,
        email: user.email // use email as unique id
      })) || []
  );

  // Get attendance stats using helper hook
  const { totalUsers, presentUsers, absentCount, percentage } =
    useAttendanceStats(attendanceList, userByRole, filterValue);

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
          title={filterValue.user || "All Users"}
          totalUsers={totalUsers}
          present={presentUsers}
          percentage={percentage}
          absent={absentCount}
          totalUserStyle="text-sm text-gray-600 uppercase"
        />
      </div>

      {/* Present Attendance List */}
      <div className="bg-white rounded-lg shadow p-4 md:p-5 flex flex-col gap-3">
        <h2 className="text-lg md:text-xl text-[#2C80FF] font-sans font-semibold tracking-wide">
          Present
        </h2>

        <div className="flex flex-col gap-2 w-full overflow-x-auto">
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-md p-1 sm:p-2 hover:bg-gray-100 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <p className="text-sm sm:text-base font-sans font-medium text-gray-800">
                    {record.userName}
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-gray-600">
                    {record?.status === "in"
                      ? "Present"
                      : record?.status === "out"
                      ? "Absent"
                      : "Not Found"}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <p className="text-xs flex flex-col text-gray-500 font-medium">
                    <span>In</span>
                    {record.loggedInAt
                      ? new Date(record.loggedInAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })
                      : "—"}
                  </p>
                  <span className="h-2 w-2 bg-blue-300 rounded-full" />
                  <p className="text-xs flex flex-col text-gray-500 font-medium">
                    <span>Out</span>
                    {record.loggedOutAt
                      ? new Date(record.loggedOutAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })
                      : "—"}
                  </p>

                  <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold">
                    {record.totalHours || "—"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-400 w-full font-sans font-medium text-center">
              No attendance records found for the selected date range and user
              role.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
