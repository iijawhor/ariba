import { useDispatch, useSelector } from "react-redux";
import {
  createGrade,
  createRoutine,
  createSubject
} from "../store/slices/academicSlice.js";
import { toast } from "react-toastify";

const createGradeUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/create-grade`;
const createSubjectUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/create-subject`;

const createRoutineUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/create-routine`;

export const useAcademic = () => {
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;
  const handleCreateGradeHook = async ({ e, formData }) => {
    e.preventDefault();
    try {
      await dispatch(
        createGrade({ createGradeUrl, formData, accessToken })
      ).unwrap();

      toast.success("Grade created successfully!");
    } catch (err) {
      // Handle and show API errors gracefully
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  const handleCreateSubjectHook = async ({ e, formData }) => {
    e.preventDefault();
    try {
      await dispatch(
        createSubject({ createSubjectUrl, formData, accessToken })
      ).unwrap();
      toast.success("Subject created successfully");
    } catch (error) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  const handleCreateRoutineHook = async ({ e, formData }) => {
    e.preventDefault();
    try {
      await dispatch(
        createRoutine({ createRoutineUrl, formData, accessToken })
      ).unwrap();
      toast.success("Routine scheduled successfully");
    } catch (error) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return {
    handleCreateGradeHook,
    handleCreateSubjectHook,
    handleCreateRoutineHook
  };
};
