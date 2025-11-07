import { useDispatch, useSelector } from "react-redux";

import { getAnnouncement } from "../store/slices/announcementSlice.js";
import { toast } from "react-toastify";
const getAnnouncementApiUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/announcement/get-announcement`;

export const useAnnouncement = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  // console.log("VVVVVVVVV.....", accessToken);

  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const getAnnouncementHook = async () => {
    try {
      await dispatch(
        getAnnouncement({ getAnnouncementApiUrl, accessToken })
      ).unwrap();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  return {
    getAnnouncementHook
  };
};
