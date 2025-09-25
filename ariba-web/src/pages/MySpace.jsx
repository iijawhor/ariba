import { useEffect } from "react";
import { Actions, AttendanceList, AttendanceStats, Timings } from "../allFiles";
import { gettAttendanceByUser } from "../store/slices/atttendanceSlice.js";
import { useDispatch, useSelector } from "react-redux";

const MySpace = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const attendance = useSelector((state) => state.attendance.attendanceByUser);
  const accessToken = loggedInUser?.accessToken;
  const userId = loggedInUser?.user?._id;
  const dispatch = useDispatch();
  const gettAttendanceByUserUrl =
    "http://localhost:7000/api/v1/attendance/get-attendance";

  useEffect(() => {
    dispatch(
      gettAttendanceByUser({ gettAttendanceByUserUrl, accessToken, userId })
    );
  }, [userId, accessToken]); // include dependencies if they can change

  const headings = ["date", "gross hours", "login", "logout", "log"];
  return (
    <div className="h-full p- flex flex-col gap-1">
      <div className="">
        {/* <div className="card  w-full bg-white !p-1 card-sm rounded-sm">
          <div className=" card-body"></div>
        </div> */}
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <h1 className=" ml-2 font-[sans-serif] text-md tracking-wide text-gray-800">
            Attendance Stats
          </h1>
          <AttendanceStats />
        </div>

        <div className="w-full">
          <h1 className=" ml-2 font-[sans-serif] text-md tracking-wide text-gray-800">
            Timings
          </h1>
          <Timings />
        </div>

        <div className="w-full">
          <h1 className=" ml-2 font-[sans-serif] text-md tracking-wide text-gray-800">
            Actions
          </h1>
          <Actions />
        </div>
      </div>
      {/* attendnce lists */}
      <div className="bg-white rounded-md w-full h-90 flex flex-col gap-1">
        <div className="flex gap-3 p-1 items-center">
          <h1 className=" font-[sans-serif] text-md tracking-wide text-gray-800">
            Attendance
          </h1>
          <div className="h-fit  ">
            <p className="font-[sans-serif] border border-gray-200 pl-1 pr-1 rounded-sm text-[#2C80FF] cursor-pointer  text-xs text-center h-fit">
              September
            </p>
          </div>
        </div>
        <div className="overflow-auto h-full flex flex-col gap-2">
          <div className="card  w-full bg-white !p-1 card-sm rounded-sm">
            <div className="flex justify-between pl-10 pr-10">
              {headings.map((heading) => (
                <span className="text-xs text-gray-500 uppercase font-[sans-serif]">
                  {heading}
                </span>
              ))}
            </div>
          </div>
          <div className=" h-full flex-col gap-1">
            {attendance?.attendance?.map((attendance) => (
              <AttendanceList attendance={attendance} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySpace;
