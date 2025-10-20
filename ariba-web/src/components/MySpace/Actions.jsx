import { useState } from "react";
import { LiveClock } from "../../allFiles";
import { useDispatch, useSelector } from "react-redux";
import { markClockIn, markClockOut } from "../../store/slices/atttendanceSlice";

const Actions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const attendance = useSelector((state) => state.attendance.attendanceRecord);
  const attendanceError = useSelector((state) => state.attendance.error);
  const attendanceId = attendance?.data?._id;
  const accessToken = loggedInUser?.accessToken;
  const userId = loggedInUser?.user?._id;
  const dispatch = useDispatch();
  const attendanceUrlLogin =
    "http://localhost:7000/api/v1/attendance/create-login";
  const attendanceUrlLogout =
    "http://localhost:7000/api/v1/attendance/create-logout";

  const handleLogin = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      dispatch(markClockIn({ attendanceUrlLogin, accessToken, userId }));
    } else {
      setShowLogoutPopup(true);
    }
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutPopup(false);
    dispatch(
      markClockOut({ attendanceUrlLogout, accessToken, userId, attendanceId })
    );
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="flex flex-col justify-between h-full w-full relative overflow-hidden">
      {/* Clock and Button Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 flex-1 overflow-hidden">
        {/* Live Clock */}
        <div className="flex-1 min-w-0">
          <LiveClock />
        </div>

        {/* Clock In/Out Button */}
        <div className="flex flex-col items-center relative min-w-[120px]">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#2C80FF] rounded hover:bg-blue-600 transition w-full text-center"
          >
            {isLoggedIn ? "Web Clock Out" : "Web Clock In"}
          </button>

          {/* Logout Confirmation Popup */}
          {showLogoutPopup && (
            <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 shadow-lg rounded p-2 w-40 z-10 flex justify-between">
              <button
                className="px-2 py-1 border border-blue-400 text-blue-500 rounded text-xs font-semibold uppercase hover:bg-blue-50 transition"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 border border-red-400 text-red-500 rounded text-xs font-semibold uppercase hover:bg-red-50 transition"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          )}

          {/* Logged in time */}
          {isLoggedIn && (
            <p className="mt-2 text-xs text-gray-600 flex flex-col items-center truncate text-center">
              <span className="capitalize">Logged in at:</span>
              <span className="text-[#2C80FF] font-semibold lowercase">
                10:00 am
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {attendanceError?.code === 11000 && (
        <p className="mt-2 text-xs text-red-500 font-medium truncate">
          Already Logged In
        </p>
      )}
    </div>
  );
};

export default Actions;
