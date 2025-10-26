import { useState } from "react";
import { useSelector } from "react-redux";
import { TimelineModal, UserModal } from "../../allFiles";

const TeacherDetails = ({
  userModal,
  setUserModal,
  mode,
  setMode,
  setShowSidebar
}) => {
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
      label: "Date of Birth",
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

  const handleUpdateModal = () => {
    setMode("update");
    setUserModal(true);
  };

  return (
    <div className="relative h-full flex flex-col gap-6 p-3 md:p-6 bg-gray-50">
      {/* ===== Header ===== */}
      <div className="bg-white rounded-xl shadow-md p-3 md:p-4 flex items-center justify-between sticky top-0 z-1">
        <div className="flex items-center gap-3">
          {/* Sidebar toggle (mobile only) */}
          <button
            onClick={() => setShowSidebar?.(true)}
            className="md:hidden bg-[#2C80FF] text-white rounded-md p-2 hover:bg-blue-600 transition"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Teacher Details
          </h1>
        </div>

        <button
          onClick={handleUpdateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 active:scale-95 transition-all"
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
          <span>Update</span>
        </button>
      </div>

      {/* ===== User Modal ===== */}
      {mode === "update" && userModal && (
        <UserModal
          isOpen={userModal}
          onClose={() => setUserModal(false)}
          title="Update User"
          mode="update"
          userData={userData} // actual teacher data
        />
      )}

      {/* ===== Basic Details ===== */}
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-700 border-b pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 text-gray-700">
          {detailFields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-sm text-gray-500">{field.label}</span>
              <span className="text-[15px] font-semibold text-gray-800">
                {field.value || "Not Added"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== About Section ===== */}
      <div className="bg-gray-100 rounded-xl shadow-inner p-5 flex flex-col gap-2">
        <h2 className="text-base md:text-lg font-semibold text-gray-700">
          About {userData?.userRole || "Teacher"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {userData?.about || "No description added yet."}
        </p>
      </div>

      {/* ===== Timeline Section ===== */}
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Timeline
          </h2>
          <button
            onClick={() => setTimelineModal(true)}
            className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
          >
            + Add Event
          </button>
        </div>

        {timelineModal && (
          <div className="absolute z-20 shadow-md p-2 w-80 bg-white rounded-md top-24 right-6">
            <TimelineModal
              id={userData?._id}
              setTimelineModal={setTimelineModal}
            />
          </div>
        )}
        <div className="max-h-80 overflow-y-auto pr-2">
          <ul className="relative flex flex-col gap-6 mt-3">
            {userData?.timeline?.length ? (
              userData.timeline.map((item, i) => (
                <li key={i} className="relative flex items-start">
                  {/* Timeline Line */}
                  {i !== userData.timeline.length - 1 && (
                    <span className="absolute left-2 top-5 h-full border-l-2 border-blue-300"></span>
                  )}

                  {/* Timeline Dot */}
                  <span className="flex-shrink-0 h-3 w-3 mt-1 rounded-full bg-blue-600 z-10"></span>

                  {/* Event Content */}
                  <div className="ml-6 flex-1">
                    <span className="text-xs text-blue-500 font-semibold">
                      {item.eventDate}
                    </span>
                    <p className="bg-blue-50 text-blue-700 px-3 py-1 mt-1 rounded-md text-sm">
                      {item.event}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center">
                No timeline events yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
