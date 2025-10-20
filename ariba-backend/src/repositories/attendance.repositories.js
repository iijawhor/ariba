import { Attendance } from "../models/attendance.model.js";
import { User } from "../models/user.model.js";
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

export const getUserByRole = async (req) => {
  const { userRole } = req.params;
  const { organization } = req.user;

  return User.find({ userRole, organization });
};
export const getAttendance = async ({ userRole, fromDate, toDate }) => {
  // 🧠 Safe date handling
  let safeToDate = toDate ? new Date(toDate) : new Date();
  let safeFromDate;

  if (fromDate) {
    safeFromDate = new Date(fromDate);
  } else {
    safeFromDate = new Date(safeToDate);
    safeFromDate.setMonth(safeFromDate.getMonth() - 1);
  }

  // 🕓 Extend toDate to include the full day (23:59:59)
  safeToDate.setHours(23, 59, 59, 999);
  safeFromDate.setHours(0, 0, 0, 0);

  return User.aggregate([
    { $match: { userRole } },
    {
      $lookup: {
        from: "attendances",
        let: {
          userId: "$_id",
          fromDate: safeFromDate,
          toDate: safeToDate
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$user", "$$userId"] },
                  { $gte: ["$date", "$$fromDate"] },
                  { $lte: ["$date", "$$toDate"] }
                ]
              }
            }
          },
          {
            $project: {
              _id: 0,
              date: 1,
              status: 1,
              loggedInAt: 1,
              loggedOutAt: 1
            }
          }
        ],
        as: "attendanceRecords"
      }
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        userRole: 1,
        attendanceRecords: 1
      }
    }
  ]);
};
