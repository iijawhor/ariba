import { useState } from "react";
import { useSelector } from "react-redux";
import { TimelineModal, UserModal } from "../../allFiles";

const TeacherDetails = ({ userModal, setUserModal, mode, setMode }) => {
  const [timelineModal, setTimelineModal] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);
  const userData = userDetails?.data;
  const detailFields = [
    { label: "First Name", value: userData?.firstName },
    { label: "Last Name", value: userData?.lastName },
    { label: "Phone Number", value: userData?.phoneNumber },
    { label: "Email", value: userData?.email },
    { label: "Department", value: userData?.department },
    { label: "Gender", value: userData?.gender },
    {
      label: "Date of Joining",
      value: userData?.dateOfBirth
        ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
        : ""
    },
    {
      label: "Date of Joining",
      value: userData?.dateOfjoining
        ? new Date(userData.dateOfjoining).toISOString().split("T")[0]
        : ""
    },
    { label: "User Id", value: userData?.userId || "ARIBA 000" },
    { label: "Religion", value: userData?.religion },
    { label: "Address", value: userData?.address }
  ];

  const hanleUpdateModal = () => {
    setMode("update");
    setUserModal(true);
  };

  return (
    <div className="relative h-full bg-gray-50 flex flex-col gap-4 p-3 rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h1 className="bg-white p-2 rounded-md shadow text-lg font-semibold text-gray-800 tracking-wide">
          Teacher Details
        </h1>
        <button
          onClick={hanleUpdateModal}
          className="flex items-center cursor-pointer gap-1 border border-[#2C80FF] px-3 py- rounded-full bg-[#2C80FF] text-white hover:bg-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M16.5 3.5a2.121 2.121 0 013 3L7 19H4v-3L16.5 3.5z"
            />
          </svg>
        </button>
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={userModal}
        onClose={() => setUserModal(false)}
        title="Update User"
        mode={mode}
        userData={userData}
      />

      {/* Basic Details Grid */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-3">
        <h2 className="bg-gray-100 p-2 rounded text-base font-semibold text-gray-700 tracking-wide">
          Basic Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
          {detailFields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-medium text-gray-500">{field.label}</span>
              <span className="font-semibold text-gray-800">
                {field.value || "Not Added"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
        <h2 className="bg-gray-100 p-2 rounded text-base font-semibold text-gray-700 tracking-wide">
          About {userData?.userRole || ""}
        </h2>
        <p className="text-gray-700">{userData?.about || "Not Added"}</p>
      </div>

      {/* Timeline Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-3 max-h-[250px] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-base font-semibold tracking-wide">
            Teacher Timeline
          </h2>
          <button
            onClick={() => setTimelineModal(true)}
            className="bg-blue-500 px-3 cursor-pointer py-1 rounded-full text-white hover:bg-blue-600 transition"
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

        <ul className="flex flex-col gap-3 mt-2">
          {userData?.timeline?.length ? (
            userData.timeline.map((timeline, index) => (
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
            ))
          ) : (
            <p className="text-gray-400 text-sm">No timeline events added.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDetails;
