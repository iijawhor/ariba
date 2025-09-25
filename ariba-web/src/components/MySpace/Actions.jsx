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
  const attendanceId = attendance?.data._id;
  const accessToken = loggedInUser?.accessToken;
  const userId = loggedInUser?.user?._id;
  const dispatch = useDispatch();
  const attendanceUrlLogin =
    "http://localhost:7000/api/v1/attendance/create-login";
  const attendanceUrlLogout =
    "http://localhost:7000/api/v1/attendance/create-logout";
  const handleLogin = () => {
    if (isLoggedIn === false) {
      setIsLoggedIn((prev) => !prev);
      dispatch(markClockIn({ attendanceUrlLogin, accessToken, userId }));
    } else {
      setShowLogoutPopup(true);
    }
  };

  const confirmLogout = () => {
    setIsLoggedIn((prev) => !prev);
    setShowLogoutPopup((prev) => !prev);
    dispatch(
      markClockOut({ attendanceUrlLogout, accessToken, userId, attendanceId })
    );
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="card p-2 h-45 border border-gray-200 w-full bg-white card-sm rounded-md">
      <div className=" flex h-full items-center justify-between">
        <div className=" pl-3 pr-3 p-1 rounded-sm">
          <LiveClock />
        </div>
        <div className=" flex flex-col gap-1 items-center">
          <div className="border p-1 w-30 text-center border-blue-200 rounded-sm">
            <button
              onClick={handleLogin}
              className="text-sm text-[#2C80FF] p-0 font-semibold cursor-pointer"
            >
              {isLoggedIn ? "Web Clock Out" : "Web Clock In"}
            </button>
            {showLogoutPopup ? (
              <div className="bg-gray-100 shadow-md flex justify-between p-2 absolute w-40 rounded-sm right-2 top-18  h-10">
                <button
                  className="text-[#2C80FF] rounded-sm border border-blue-400 pr-1 pl-1 cursor-pointer font-[sans-serif] uppercase text-xs tracking-wide"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
                <button
                  className="text-red-500 border pl-1 pr-1 rounded-sm border-red-400 cursor-pointer font-[sans-serif] uppercase text-xs tracking-wide"
                  onClick={confirmLogout}
                >
                  logout
                </button>
              </div>
            ) : null}
          </div>
          <p className="text-xs font-[sans-serif] flex gap-1">
            <span className="capitalize text-gray-600">logged in at :</span>
            <span className="lowercase font-semibold text-blue-400">
              10:00 am
            </span>
          </p>
        </div>
      </div>
      <p>{attendanceError?.code === 11000 ? "Already Logged In" : null}</p>
    </div>
  );
};

export default Actions;
