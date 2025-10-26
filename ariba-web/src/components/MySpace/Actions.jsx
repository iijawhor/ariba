import { LiveClock } from "../../allFiles";
import { useSelector } from "react-redux";

import { useAttendance } from "../../hooks/useAttendance.js";

const Actions = () => {
  const presnetDayAttendance = useSelector(
    (state) => state.attendance.presnetDayAttendance
  );
  const {
    handleLoginHook,
    confirmLogoutHook,
    cancelLogoutHook,
    showLogoutPopup
  } = useAttendance();

  return (
    <div className="flex flex-col justify-between h-full w-full relative overflow-hidden">
      {/* Clock and Button Section */}
      <div className="flex flex-col md:flex-row md:justify-between  gap-3 p-2 flex-wrap">
        {/* Live Clock */}
        <div className="flex-1 min-w-0">
          <LiveClock />
        </div>

        {/* Clock In/Out Button */}
        <div className="flex flex-col items-center relative min-w-[120px]">
          <button
            onClick={handleLoginHook}
            disabled={presnetDayAttendance?.status === "out"}
            className={`px-4 py-2 text-sm font-semibold rounded w-full text-center transition 
    ${
      presnetDayAttendance?.status === "out"
        ? "bg-gray-400 cursor-not-allowed text-gray-200"
        : "bg-[#2C80FF] hover:bg-blue-600 text-white cursor-pointer"
    }`}
          >
            {presnetDayAttendance?.status === "out"
              ? "Logged Out"
              : presnetDayAttendance?.status === "in"
              ? "Web Clock Out"
              : "Web Clock In"}
          </button>

          {/* Logout Confirmation Popup */}
          {showLogoutPopup && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 shadow-lg rounded p-2 w-40 z-10 flex justify-between">
              <button
                className="px-2 py-1 border border-blue-400 text-blue-500 rounded text-xs font-semibold uppercase hover:bg-blue-50 transition"
                onClick={cancelLogoutHook}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 border border-red-400 text-red-500 rounded text-xs font-semibold uppercase hover:bg-red-50 transition"
                onClick={confirmLogoutHook}
              >
                Logout
              </button>
            </div>
          )}

          {/* Logged in time */}
          {presnetDayAttendance?.loggedInAt && (
            <p className="mt-2 text-xs text-gray-600 flex flex-col items-center truncate text-center">
              <span className="capitalize">Logged in at:</span>
              <span className="text-[#2C80FF] font-semibold lowercase">
                {new Date(presnetDayAttendance.loggedInAt).toLocaleTimeString({
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;
