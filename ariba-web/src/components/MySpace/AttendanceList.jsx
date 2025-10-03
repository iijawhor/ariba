import { calculateGrossHours, getISTDate, getISTTime } from "../../allFiles";

const AttendanceList = ({ attendance }) => {
  const loggedInDate = getISTDate(attendance.loggedInAt);
  const loggedInTime = getISTTime(attendance.loggedInAt);
  const loggedOutTime = getISTTime(attendance.loggedOutAt);
  const grossHours = calculateGrossHours(loggedInTime, loggedOutTime);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-md shadow-sm p-3 mb-2 hover:bg-blue-50 transition overflow-hidden">
      {/* Date */}
      <p className="text-sm md:w-1/5 font-[sans-serif] text-gray-800 truncate">
        {loggedInDate}
      </p>

      {/* Gross Hours */}
      <p className="text-sm md:w-1/5 font-[sans-serif] text-gray-700 font-medium text-center">
        {grossHours}
      </p>

      {/* Login Time */}
      <p className="text-sm md:w-1/5 font-[sans-serif] text-gray-700 text-center truncate">
        {loggedInTime}
      </p>

      {/* Logout Time */}
      <p className="text-sm md:w-1/5 font-[sans-serif] text-gray-700 text-center truncate">
        {loggedOutTime}
      </p>

      {/* Action Button */}
      <button
        aria-label="More actions"
        className="md:w-1/5 flex justify-center items-center p-1 hover:bg-gray-200 rounded transition mt-2 md:mt-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
    </div>
  );
};

export default AttendanceList;
