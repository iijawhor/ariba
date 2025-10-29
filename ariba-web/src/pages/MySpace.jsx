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
  const attendanceError = useSelector((state) => state.attendance.error);
  const gettAttendanceByUserUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/attendance/get-attendance`;

  useEffect(() => {
    dispatch(
      gettAttendanceByUser({ gettAttendanceByUserUrl, accessToken, userId })
    );
  }, [userId, accessToken]); // include dependencies if they can change

  const headings = ["date", "gross hours", "login", "logout", "log"];
  return (
    <div className="flex flex-col rounded-lg gap-4 p-2 md:p-2 lg:p-2 h-full bg-gray-50 font-sans">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-2">
          <h2 className="text-gray-900 font-bold font-[sans-serif] text-lg mb-3">
            Attendance Stats
          </h2>
          <AttendanceStats className="text-gray-700 text-sm" />
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <h2 className="text-gray-900 font-bold font-[sans-serif] text-lg mb-3">
            Timings
          </h2>
          <Timings className="text-gray-700 text-sm" />
        </div>

        <div className="bg-white rounded-lg shadow p-2">
          <h2 className="text-gray-900 font-bold font-[sans-serif] text-lg mb-3">
            Actions
          </h2>
          <Actions className="text-gray-700 text-sm" />
        </div>
      </div>

      {/* Attendance List Section */}
      <div className="bg-white rounded-lg h-full shadow w-full flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-1 border-b border-gray-200">
          <h2 className="text-gray-900 font-bold text-lg">Attendance</h2>
          <p className="bg-blue-100 text-blue-600 px-4 py-1 rounded text-sm cursor-pointer font-medium">
            September
          </p>
        </div>

        <div className="overflow-x-auto h-full">
          <div className="min-w-full flex flex-col gap-1">
            {/* Headings */}

            {/* Attendance Items */}
            <div className="flex flex-col divide-y divide-gray-200">
              {attendance?.attendance?.map((att, index) => (
                <AttendanceList
                  key={index}
                  attendance={att}
                  headings={headings}
                  className="text-gray-700 text-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySpace;
