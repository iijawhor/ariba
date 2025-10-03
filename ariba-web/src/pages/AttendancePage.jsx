import React, { useState, useEffect } from "react";
import {
  Attendance,
  FilterDates,
  Regularization,
  UserFilter
} from "../allFiles";
import { useDispatch, useSelector } from "react-redux";

const AttendancePage = () => {
  const presentUsers = useSelector((state) => state.attendance.presentUser);
  const attendanceByUser = useSelector(
    (state) => state.attendance.attendanceByUser
  );
  const users = useSelector((state) => state.attendance.users);

  const [filterValue, setFilterValue] = useState({
    user: "teacher",
    fromDate: "",
    toDate: ""
  });

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-2 p-1 md:p-2 w-full h-full">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center bg-white shadow rounded-md p-2">
        <FilterDates
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          className="flex-1"
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
