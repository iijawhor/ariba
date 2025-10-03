import { useState } from "react";
import { useSelector } from "react-redux";
import { TimelineModal, CreateUser } from "../../allFiles";

const TeacherDetails = ({ creatUserModal, setCreateUserModal }) => {
  const [timelineModal, setTimelineModal] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);
  const userData = userDetails?.data;

  return (
    <div className="relative h-full bg-gray-50 flex flex-col gap-2 p-2 md:p-2 rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
        <h1 className="bg-white p-0.5 rounded-md shadow text-lg md:text-lf pl-1 pr-1 font-semibold text-gray-800 tracking-wide">
          Teacher Details
        </h1>
        <button
          onClick={() => setCreateUserModal((prev) => !prev)}
          className="bg-blue-500 p-0.5 text-sm pl-1 pr-1 rounded-md hover:bg-blue-600 transition-colors text-white font-semibold"
        >
          Add Teacher
        </button>
      </div>

      {/* Basic Details */}
      <div className="bg-white p-2 rounded-md shadow flex flex-col gap-3">
        <h2 className="bg-gray-100 p-2 rounded text-sm md:text-base font-semibold text-gray-700 tracking-wide">
          Basic Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm md:text-base font-medium tracking-wide">
          <p>
            <span className="font-semibold">First Name:</span>{" "}
            {userData?.firstName || "Not Added"}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span>{" "}
            {userData?.lastName || "Not Added"}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {userData?.phoneNumber || "Not Added"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {userData?.email || "Not Added"}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {userData?.department || "Not Added"}
          </p>
          <p>
            <span className="font-semibold">Gender:</span>{" "}
            {userData?.gender || "Not Added"}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {userData?.dateOfBirth || "Not Added"}
          </p>
          <p className="md:col-span-2">
            <span className="font-semibold">Address:</span>{" "}
            {userData?.address || "Not Added"}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-2 rounded-md shadow flex flex-col gap-2">
        <h2 className="bg-gray-100 p-2 rounded text-sm md:text-base font-semibold text-gray-700 tracking-wide">
          About {userData?.userRole || ""}
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          {userData?.about || "Not Added"}
        </p>
      </div>

      {/* Timeline Section */}
      <div className="bg-white p-2 h-full rounded-md shadow flex flex-col gap-2 max-h-[400px] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-sm md:text-base font-semibold tracking-wide">
            Teacher Timeline
          </h2>
          <button
            onClick={() => setTimelineModal((prev) => !prev)}
            className="bg-blue-500 p-0.5 pr-1 pl-1 rounded-md hover:bg-blue-600 transition-colors text-white"
          >
            Add Event
          </button>
        </div>

        {timelineModal && (
          <div className="absolute z-10 shadow-sm p-2 w-80 bg-white rounded-md bottom-10 right-5">
            <TimelineModal
              id={userData?._id}
              setTimelineModal={setTimelineModal}
            />
          </div>
        )}

        {/* Timeline list */}
        <ul className="flex flex-col h-full gap-3">
          {userData?.timeline.map((timeline, index) => (
            <li
              key={index}
              className="flex flex-col gap-1 bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <span className="text-xs text-blue-500 font-semibold">
                {timeline.eventDate}
              </span>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="bg-blue-100 text-blue-600 text-xs md:text-sm p-1 rounded">
                  {timeline.event}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDetails;
