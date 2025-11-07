import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createGrade = createAsyncThunk(
  "grade/createGrade",
  async ({ createGradeUrl, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(createGradeUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create Grade!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const createSubject = createAsyncThunk(
  "academic/createsubject",
  async ({ createSubjectUrl, formData, accessToken }) => {
    try {
      const response = await axios.post(createSubjectUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const createRoutine = createAsyncThunk(
  "academic/createRoutine",
  async ({ createRoutineUrl, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(createRoutineUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data; // you can return response.data only
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create routine!";
      return thunkAPI.rejectWithValue(msg); // ✅ now thunkAPI works
    }
  }
);

export const getTeachers = createAsyncThunk(
  "academic/getTeachers",
  async ({ getTeachersUrl, userRole, accessToken }) => {
    try {
      const response = await axios.get(`${getTeachersUrl}/${userRole}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);
export const getStudents = createAsyncThunk(
  "academic/getStudents",
  async ({ getStudentsUrl, userRole, accessToken }) => {
    try {
      const response = await axios.get(`${getStudentsUrl}/${userRole}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);
export const getGrades = createAsyncThunk(
  "academic/gtGrades",
  async ({ getGradesUrl, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(getGradesUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get grades!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const getSubjects = createAsyncThunk(
  "academic/getSubjects",
  async ({ getSubjectsUrl, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(getSubjectsUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get subject!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const getRoutine = createAsyncThunk(
  "academic/getRoutine",
  async ({ getRoutineUrl, routineFilter, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(getRoutineUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: routineFilter // 👈 send day, date, grade, teacher here
      });
      return response.data;
    } catch (error) {
      console.log("err...", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to get routine!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    grade: null,
    loading: null,
    error: null,
    subject: null,
    routine: null,
    teachers: [],
    students: [],
    subjects: [],
    routine: [],
    grades: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grade = action.payload;
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder

      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder

      .addCase(createRoutine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.routine = action.payload;
      })
      .addCase(createRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = action.payload;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getRoutine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.routine = action.payload;
      })
      .addCase(getRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default attendanceSlice.reducer;
