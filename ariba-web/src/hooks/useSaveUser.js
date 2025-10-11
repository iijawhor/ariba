import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../store/slices/userSlice.js";
const createUserApi = `${import.meta.env.VITE_API_BASE_URL}/user/create-user`;

const updateUserApi = `${import.meta.env.VITE_API_BASE_URL}/user/update-user`;

export const useSaveUser = () => {
  const user = useSelector((state) => state.user.loggedInUser);

  const accessToken = user?.accessToken;
  const dispatch = useDispatch();

  const saveUser = ({ e, formData, userId, mode }) => {
    e.preventDefault();
    if (mode === "add") {
      dispatch(createUser({ createUserApi, formData, accessToken }));
    } else if (mode === "update") {
      dispatch(updateUser({ updateUserApi, formData, accessToken, userId }));
    }
  };

  return { saveUser };
};
