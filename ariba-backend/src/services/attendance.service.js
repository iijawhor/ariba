import * as AttendanceRepositories from "../repositories/attendance.repositories.js";
import ApiError from "../utils/ApiError.js";

export const markAttendance = async (req) => {
  const { status, attendanceId } = req.body;
  const { id } = req.params;
  if (!["in", "out"].includes(status)) {
    throw new ApiError("Please provide a valid data", 2400);
  }

  // Otherwise, update existing attendance
  const existingAttendance = await AttendanceRepositories.getAttendanceById(
    attendanceId
  );
  if (status === "out") {
    if (!existingAttendance) {
      throw new ApiError("Attendance not found!", 404);
    }

    return await AttendanceRepositories.createAttendanceLogout({
      _id: attendanceId,
      loggedOutAt: new Date(),
      status
    });
  } else if (status === "in") {
    if (!id) {
      throw new ApiError("Invalid user ID", 404);
    }
    if (existingAttendance) {
      throw new ApiError("Already logged in!", 404);
    }
    return await AttendanceRepositories.createAttendanceLogin({
      status,
      user: id,
      loggedInAt: new Date(),
      loggedOutAt: new Date()
    });
  }

  throw new ApiError("Invalid status provided", 400);
};
export const getAttendanceByUserService = async (req) => {
  const { id } = req.params;
  return await AttendanceRepositories.getAttendanceByUserId(id);
};
export const getUsersByRole = async (req) => {
  return await AttendanceRepositories.getUserByRole(req);
};
