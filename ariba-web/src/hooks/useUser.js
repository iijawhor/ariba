import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  generateRefreshAccessToken,
  logout,
  refreshUser
} from "../store/slices/userSlice.js";

const getUserOnRefreshApiUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/user/get-current-user`;
const generateRefreshAccessTokenApi = `${
  import.meta.env.VITE_API_BASE_URL
}/user/refresh-token`;
const logoutApiUrl = `${import.meta.env.VITE_API_BASE_URL}/user/logout`;
export const useUser = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const getCurrentUserHook = async () => {
    dispatch(refreshUser({ getUserOnRefreshApiUrl, accessToken }));
  };

  const refreshTokenHook = async () => {
    try {
      const data = await dispatch(
        generateRefreshAccessToken(generateRefreshAccessTokenApi)
      ).unwrap(); // ✅ now awaits the actual Promise
    } catch (error) {
      console.log("Refresh failed:", error);
    }
  };

  const logoutHook = async () => {
    try {
      await dispatch(logout({ logoutApiUrl, accessToken })).unwrap(); // ✅ now awaits the actual Promise
      toast.success("Logged out successfully!");
    } catch (error) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        error ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  return {
    getCurrentUserHook,
    refreshTokenHook,
    logoutHook
  };
};
