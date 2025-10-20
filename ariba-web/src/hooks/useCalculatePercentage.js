import { useMemo } from "react";

/**
 * Calculates attendance statistics for a given attendance list, user list, and date range.
 * @param {Array} attendanceList - Array of users with attendanceRecords
 * @param {Array} userByRole - Array of users in this role
 * @param {Object} filterValue - Object containing fromDate and toDate
 */
export const useAttendanceStats = (
  attendanceList = [],
  userByRole = [],
  filterValue = {}
) => {
  return useMemo(() => {
    const totalUsers = userByRole.length;

    // Flatten all attendance records
    const attendanceRecords = attendanceList.flatMap(
      (user) =>
        user.attendanceRecords?.map((record) => ({
          ...record,
          userName: `${user.firstName} ${user.lastName}`,
          userRole: user.userRole,
          email: user.email // use email as unique identifier
        })) || []
    );

    const fromDate = filterValue.fromDate
      ? new Date(filterValue.fromDate)
      : null;
    const toDate = filterValue.toDate ? new Date(filterValue.toDate) : null;

    // Filter records within date range
    const filteredRecords = attendanceRecords.filter((record) => {
      if (!fromDate || !toDate) return true; // if no filter, include all
      const recordDate = new Date(record.date);
      return recordDate >= fromDate && recordDate <= toDate;
    });

    // Get unique users present
    const uniqueUsersPresent = new Set(filteredRecords.map((r) => r.email));

    const presentUsers = uniqueUsersPresent.size;
    const absentCount = totalUsers - presentUsers;
    const percentage = totalUsers ? (presentUsers / totalUsers) * 100 : 0;

    return {
      totalUsers,
      presentUsers,
      absentCount,
      percentage: percentage.toFixed(2)
    };
  }, [attendanceList, userByRole, filterValue]);
};
