import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Attendance,
  FilterDates,
  Regularization,
  UserFilter
} from "../allFiles";
import { useAttendance } from "../hooks/useAttendance";
import { getAttendance } from "../store/slices/atttendanceSlice.js";
import { useDispatch } from "react-redux";
const AttendancePage = () => {
  const [filterValue, setFilterValue] = useState({
    user: "teacher",
    fromDate: "",
    toDate: ""
  });
  const { getUserByRole } = useAttendance(filterValue.user);
  useEffect(() => {
    getUserByRole();
  }, [filterValue]);
  const dispatch = useDispatch();
  const getAttendanceUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/attendance/filter-attendance`;

  const user = useSelector((state) => state.user.loggedInUser);
  const users = useSelector((state) => state.attendance.users);
  console.log("SSSSSSS......", users);

  const accessToken = user?.accessToken;
  console.log(accessToken);

  const handleGetAttendance = () => {};
  useEffect(() => {
    if (filterValue.fromDate && filterValue.toDate) {
      dispatch(
        getAttendance({
          getAttendanceUrl,
          userRole: filterValue.user,
          fromDate: filterValue.fromDate,
          toDate: filterValue.toDate,
          accessToken
        })
      );
    }
  }, [filterValue]);

  return (
    <div className="flex flex-col gap-2 p-1 md:p-2 w-full h-full">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center bg-white shadow rounded-md p-2">
        <FilterDates
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          className="flex-1"
          handleGetAttendance={handleGetAttendance}
        />
        <UserFilter
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          className="flex-1"
        />
        <Regularization className="md:w-auto w-full mt-1 md:mt-0" />
      </div>

      {/* Attendance Table Section */}
      <div className="flex-1 overflow-auto">
        <Attendance filterValue={filterValue} />
      </div>
    </div>
  );
};

export default AttendancePage;
