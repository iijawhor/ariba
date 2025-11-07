import { useDispatch, useSelector } from "react-redux";
import {
  createGrade,
  createRoutine,
  createSubject,
  getTeachers,
  getStudents,
  getGrades,
  getSubjects,
  getRoutine
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
const getTeachersUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/get-teachers`;
const getStudentsUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/get-students`;
const getSubjectsUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/get-subjects`;
const getGradesUrl = `${import.meta.env.VITE_API_BASE_URL}/academic/get-grades`;
const getRoutineUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/get-routine`;

export const useAcademic = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
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

  const handleCreateRoutineHook = async ({ e, formData }, thunkAPI) => {
    e.preventDefault();
    try {
      await dispatch(
        createRoutine({ createRoutineUrl, formData, accessToken })
      ).unwrap();
      toast.success("Routine scheduled successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        error ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  const getTeachersHook = async () => {
    try {
      await dispatch(
        getTeachers({
          getTeachersUrl,
          userRole: "teacher",
          accessToken
        })
      ).unwrap();
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };
  const getStudentsHook = async () => {
    try {
      await dispatch(
        getStudents({
          getStudentsUrl,
          userRole: "student",
          accessToken
        })
      ).unwrap();
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };
  const getGradesHook = async () => {
    try {
      await dispatch(getGrades({ getGradesUrl, accessToken })).unwrap();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };
  const getSubjectsHook = async () => {
    try {
      await dispatch(getSubjects({ getSubjectsUrl, accessToken })).unwrap();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  const getRoutineHook = async (routineFilter) => {
    try {
      await dispatch(
        getRoutine({ getRoutineUrl, routineFilter, accessToken })
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
    handleCreateGradeHook,
    handleCreateSubjectHook,
    handleCreateRoutineHook,
    getTeachersHook,
    getGradesHook,
    getSubjectsHook,
    getRoutineHook,
    getStudentsHook
  };
};
