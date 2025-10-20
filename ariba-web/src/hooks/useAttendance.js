import { useSelector, useDispatch } from "react-redux";
import { getUsersByRole } from "../store/slices/atttendanceSlice";
export const useAttendance = (userRole) => {
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;

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

  return { getUserByRole };
};
