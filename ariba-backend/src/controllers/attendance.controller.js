import { Attendance } from "../models/attendance.model.js";
import * as UserService from "../services/attendance.service.js";
import * as AttendanceService from "../services/attendance.service.js";

export const markAttendance = async (req, res) => {
  try {
    const attendanceRecord = await UserService.markAttendance(req);

    const msg =
      attendanceRecord.status === "in"
        ? "Logged in successfully"
        : "Logged out successfully";

    return res.status(200).json({ message: msg, data: attendanceRecord });
  } catch (error) {
    res.status(400).json({ message: error || "Something went wrong!" });
  }
};
export const getAttendanceByUserController = async (req, res) => {
  try {
    const attendance = await UserService.getAttendanceByUserService(req);
    return res
      .status(200)
      .json({ message: "Attendance fetched successfully", attendance });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to get the user attendance" });
  }
};

// attendance page started here

export const getUserByRole = async (req, res) => {
  try {
    const users = await UserService.getUsersByRole(req);
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch users by role" });
  }
};
export const getAttendance = async (req, res) => {
  try {
    const attendance = await AttendanceService.getAttendance(req);
    return res
      .status(200)
      .json({ message: "Attendance fetched successfully", attendance });
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch attendance" });
  }
};
export const getPresentDayAttendance = async (req, res) => {
  try {
    const response = await AttendanceService.getPresentDayAttendance(req);
    return res
      .status(200)
      .json({ message: "Successfully fetched today's attendance", response });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to get today's attendance" });
  }
};
