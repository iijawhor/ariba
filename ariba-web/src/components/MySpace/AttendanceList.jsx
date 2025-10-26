import { calculateGrossHours, getISTDate, getISTTime } from "../../allFiles";

const AttendanceList = ({ attendance, headings }) => {
  const loggedInDate = getISTDate(attendance.loggedInAt);
  const loggedInTime = getISTTime(attendance.loggedInAt);
  const loggedOutTime = getISTTime(attendance.loggedOutAt);
  const grossHours = calculateGrossHours(loggedInTime, loggedOutTime);

  return (
    <div className="w-full">
      {/* Headings */}
      <div className="hidden md:grid grid-cols-5 gap-2 bg-gray-100 px-4 py-2 text-xs uppercase text-gray-600 font-medium tracking-wide text-center">
        {headings.map((heading, index) => (
          <span key={index} className="truncate">
            {heading}
          </span>
        ))}
      </div>

      {/* Attendance Row */}
      <div className="flex items-center flex-col md:grid md:grid-cols-5 gap-2 bg-white  shadow-sm p-3 mb-2 hover:bg-blue-50 transition text-center">
        {/* Date */}
        <div className="flex flex-col items-center mb-1 md:mb-0">
          <span className="text-gray-400 text-xs md:hidden">Date</span>
          <span className="text-sm font-sans text-gray-800 truncate">
            {loggedInDate}
          </span>
        </div>

        {/* Gross Hours */}
        <div className="flex flex-col items-center mb-1 md:mb-0">
          <span className="text-gray-400 text-xs md:hidden">Gross Hours</span>
          <span className="text-sm font-sans text-gray-700 font-medium truncate">
            {grossHours}
          </span>
        </div>

        {/* Login Time */}
        <div className="flex flex-col items-center mb-1 md:mb-0">
          <span className="text-gray-400 text-xs md:hidden">Login</span>
          <span className="text-sm font-sans text-gray-700 truncate">
            {loggedInTime}
          </span>
        </div>

        {/* Logout Time */}
        <div className="flex flex-col items-center mb-1 md:mb-0">
          <span className="text-gray-400 text-xs md:hidden">Logout</span>
          <span className="text-sm font-sans text-gray-700 truncate">
            {loggedOutTime}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs md:hidden">Log</span>
          <button
            aria-label="More actions"
            className="flex justify-center items-center p-2 hover:bg-gray-200 rounded transition mt-1 md:mt-0"
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
      </div>
    </div>
  );
};

export default AttendanceList;
