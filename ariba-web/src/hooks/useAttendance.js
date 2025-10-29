import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import {
  getPresentDayAttendance,
  getUsersByRole,
  markClockIn,
  markClockOut
} from "../store/slices/atttendanceSlice.js";
import { toast } from "react-toastify";
export const useAttendance = (userRole) => {
  const user = useSelector((state) => state.user.loggedInUser);
  const presnetDayAttendance = useSelector(
    (state) => state.attendance.presnetDayAttendance
  );
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const attendance = useSelector((state) => state.attendance.attendanceRecord);
  const attendanceId = attendance?.data?._id;
  const userId = loggedInUser?.user?._id;
  const getUserByRole = async () => {
    const getUserByRoleUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/attendance/by-role`;

    try {
      await dispatch(
        getUsersByRole({ getUserByRoleUrl, userRole, accessToken })
      );
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  // const attendanceUrlLogin =
  //   "http://localhost:7000/api/v1/attendance/create-login";
  const attendanceUrlLogin = `${
    import.meta.env.VITE_API_BASE_URL
  }/attendance/create-login`;
  const attendanceUrlLogout = `${
    import.meta.env.VITE_API_BASE_URL
  }/attendance/create-logout`;
  const getPresentDayAttendanceUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/attendance/my-today`;

  const handleLoginHook = async () => {
    if (!presnetDayAttendance) {
      try {
        // Wait for Clock In API to complete
        await dispatch(
          markClockIn({ attendanceUrlLogin, accessToken, userId })
        ).unwrap();

        // Now fetch updated attendance
        getPresentDayAttendanceHook();
      } catch (error) {
        toast.error(error?.message || "Failed to log in");
      }
    } else {
      setShowLogoutPopup(true);
    }
  };

  const confirmLogoutHook = async () => {
    if (presnetDayAttendance.status === "in") {
      setShowLogoutPopup(false);

      try {
        // Wait for Clock Out API to complete
        await dispatch(
          markClockOut({
            attendanceUrlLogout,
            accessToken,
            userId,
            attendanceId
          })
        ).unwrap();

        // Fetch updated attendance to update the button/UI immediately
        getPresentDayAttendanceHook();
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error(error?.message || "Logout failed");
      }
    }
  };

  const cancelLogoutHook = () => {
    setShowLogoutPopup(false);
  };

  const getPresentDayAttendanceHook = useCallback(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      await dispatch(
        getPresentDayAttendance({
          getPresentDayAttendanceUrl,
          today,
          accessToken
        })
      ).unwrap();
    } catch (error) {
      toast.error(error?.message || "Failed to get today's attendance");
    }
  }, [accessToken]);

  return {
    getUserByRole,
    handleLoginHook,
    confirmLogoutHook,
    cancelLogoutHook,
    showLogoutPopup,
    getPresentDayAttendanceHook
  };
};
