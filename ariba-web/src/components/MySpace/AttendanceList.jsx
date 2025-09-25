import { calculateGrossHours, getISTDate, getISTTime } from "../../allFiles";
const AttendanceList = (attendance) => {
  const loggedInDate = getISTDate(attendance.attendance.loggedInAt);
  const loggedInTime = getISTTime(attendance.attendance.loggedInAt);
  const loggedOutTime = getISTTime(attendance.attendance.loggedOutAt);
  const grossHours = calculateGrossHours(loggedInTime, loggedOutTime);
  return (
    <div className="bg-gray-100 text-center flex items-center p-2  flex justify-between pl-2 pr-10">
      <p className="text-sm font-[sans-serif] text-gray-600 tracking-wide">
        {loggedInDate}
      </p>
      <p className="text-sm font-[sans-serif] text-gray-600 tracking-wide">
        {grossHours}
      </p>
      <p className="text-sm font-[sans-serif] text-gray-600 tracking-wide">
        {loggedInTime}
      </p>
      <p className="text-sm font-[sans-serif] text-gray-600 tracking-wide">
        {loggedOutTime}
      </p>{" "}
      <button aria-label="More actions" className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
