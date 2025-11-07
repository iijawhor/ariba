import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  generateRefreshAccessToken,
  refreshUser
} from "../store/slices/userSlice.js";

const getUserOnRefreshApiUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/user/get-current-user`;
const generateRefreshAccessTokenApi = `${
  import.meta.env.VITE_API_BASE_URL
}/user/refresh-token`;
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

      console.log("New token received:", data);
    } catch (error) {
      console.log("Refresh failed:", error);
    }
  };

  return {
    getCurrentUserHook,
    refreshTokenHook
  };
};
