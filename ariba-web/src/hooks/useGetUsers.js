// hooks/useUsers.js
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationUsers, getUser } from "../store/slices/userSlice.js";
import { toast } from "react-toastify";

export const useGetUsers = (organization, userRole) => {
  const users = useSelector(
    (state) => state.user.usersByOrganization?.users || []
  );
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [isActive, setIsActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const getOrganizationUserApi = `${
    import.meta.env.VITE_API_BASE_URL
  }/user/get-organization-users`;
  const getUserApi = `${import.meta.env.VITE_API_BASE_URL}/user/get-user-by-id`;

  // Fetch users by role (teacher/student)
  const getOrganizationUsersHook = async () => {
    if (!accessToken) {
      return;
    }
    try {
      await dispatch(
        getOrganizationUsers({
          getOrganizationUserApi,
          organization,
          userRole,
          accessToken
        })
      ).unwrap();
    } catch (error) {
      toast.error("Failed to fetch user");
    }
  };

  // Fetch first user’s details when users load
  useEffect(() => {
    if (users.length > 0) {
      setIsActive(0);
      dispatch(getUser({ getUserApi, userRole, id: users[0]._id }));
    }
  }, [users, dispatch]);

  // Filter users by search query
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(query) ||
        user.lastName?.toLowerCase().includes(query)
    );
  }, [searchQuery, users]);

  const displayUsers = searchQuery ? filteredUsers : users;

  const handleSelectUser = (rowIndex, id) => {
    setIsActive(rowIndex);
    dispatch(getUser({ getUserApi, id }));
  };

  return {
    users: displayUsers,
    searchQuery,
    setSearchQuery,
    isActive,
    handleSelectUser,
    getOrganizationUsersHook
  };
};
