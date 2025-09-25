import { Attendance } from "../models/attendance.model.js";
export const getAttendanceById = async (id) => {
  return Attendance.findById(id);
};
export const getAttendanceByUserId = async (userId) => {
  return Attendance.find({ user: userId });
};

export const createAttendanceLogin = async (attendanceData) => {
  return Attendance.create(attendanceData);
};
export const createAttendanceLogout = async (data) => {
  return Attendance.findByIdAndUpdate(
    data._id, // the ID
    { loggedOutAt: data.loggedOutAt, status: data.status }, // update object
    { new: true } // return updated doc
  );
};
