import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../store/slices/userSlice.js";
import { toast } from "react-toastify";

const createUserApi = `${import.meta.env.VITE_API_BASE_URL}/user/create-user`;
const updateUserApi = `${import.meta.env.VITE_API_BASE_URL}/user/update-user`;

export const useSaveUser = () => {
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;

  const saveUser = async ({ e, formData, userId, mode }) => {
    e.preventDefault();

    try {
      if (mode === "add") {
        await dispatch(
          createUser({ createUserApi, formData, accessToken })
        ).unwrap();

        toast.success("User created successfully!");
      } else if (mode === "update") {
        await dispatch(
          updateUser({ updateUserApi, formData, accessToken, userId })
        ).unwrap();

        toast.success("User updated successfully!");
      }
    } catch (err) {
      // Handle and show API errors gracefully
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return { saveUser };
};
