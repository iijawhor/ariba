// hooks/useGetOrganization.js
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getOrganizationDetails } from "../store/slices/userSlice.js";

export const useGetOrganization = (accessToken) => {
  const dispatch = useDispatch();
  // ✅ Function to manually trigger fetching organization details
  const fetchOrganizationDetails = useCallback(async () => {
    if (!accessToken) return;
    try {
      const getOrganizationDetailsApi = `${
        import.meta.env.VITE_API_BASE_URL
      }/organization/get-tenant`;

      await dispatch(
        getOrganizationDetails({
          getOrganizationDetailsApi,
          accessToken
        })
      ).unwrap();
    } catch (error) {
      console.error("Failed to fetch organization details:", error);
    }
  }, [dispatch, accessToken]);

  // ✅ Return the function so components can call it when needed
  return { fetchOrganizationDetails };
};
