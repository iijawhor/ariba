import { useState } from "react";
import { useSelector } from "react-redux";
import { TimelineModal, CreateUser } from "../../allFiles";

const TeacherDetails = ({ creatUserModal, setCreateUserModal }) => {
  const [timelineModal, setTimelineModal] = useState(false);
  const userDetails = useSelector((state) => state.user.userDetails);
  const userData = userDetails?.data;

  return (
    <div className="relative bg-white rounded-md h-full flex flex-col">
      <div className="w-full flex gap-3 items-center">
        <h1 className="bg-gray-100 capitalize p-2 md:text-sm text-[12px] font-semibold text-gray-700 font-[sans-serif] tracking-wide">
          teacher Details
        </h1>
        <button className="cursor-pointer h-fit">
          <svg
            className="text-[#2C80FF]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
            <path d="M9 15l6.5-6.5a1.5 1.5 0 0 1 2 2L11 17l-3 1z" />
            <path d="M14 7l3 3" />
          </svg>
        </button>
      </div>
      {creatUserModal && (
        <div className="absolute z-10 left-5 border-gray-300 h-fit border top-10 bg-white p-3 rounded-sm shadow-sm w-fit">
          <CreateUser
            createUser="teacher"
            setCreateUserModal={setCreateUserModal}
          />
        </div>
      )}
      {/* basic details */}
      <div className="">
        <h1 className="bg-gray-100 capitalize p-2 md:text-sm text-[10px] font-semibold text-gray-700 font-[sans-serif] tracking-wide">
          Basic Details
        </h1>

        <div className="p-2 flex flex-col md:text-sm text-[10px] text-gray-500 font-[sans-serif] md:text-xs text-sm font-semibold tracking-wide gap-3">
          <div className="flex gap-10  tracking-wider">
            <p className="">
              First Name :{" "}
              <span className="text-[#313234]">
                {" "}
                {userDetails ? userData?.firstName : ""}
              </span>{" "}
            </p>
            <p>
              Last Name :{" "}
              <span className="text-[#313234]">
                {userDetails ? userData?.lastName : ""}{" "}
              </span>{" "}
            </p>
          </div>
          <div className="flex md:flex-row flex-col w-full md:justify-between  tracking-wider">
            <p className="text-[#313234]">
              <span className="text-gray-500">Phone Number : </span>
              {userData?.phoneNumber || "Not Added"}
            </p>
            <p className="text-[#313234]">
              <span className="text-gray-500">Email : </span>
              {userData?.email || "Not Added"}
            </p>
          </div>

          <p className="text-[#313234] capitalize">
            <span className="text-gray-500">Department : </span>
            {userData?.department || "Not Added"}
          </p>

          <div className="flex gap-10  tracking-wider">
            <p className="text-[#313234] capitalize">
              <span className="text-gray-500 capitalize">Gender : </span>
              {userData?.gender || "Not Added"}
            </p>
            <p className="text-[#313234]">
              <span className="text-gray-500">Date Of Birth : </span>
              {userData?.dateOfBirth || "Not Added"}
            </p>
          </div>
          <p className="text-[#313234]">
            <span className="text-gray-500">Address : </span>
            {userData?.address || "Not Added"}
          </p>
        </div>
      </div>
      {/* about */}
      <div className="">
        <h1 className="bg-gray-100 capitalize p-2 md:text-sm text-[10px] font-semibold text-gray-700 font-[sans-serif] tracking-wide">
          About {userData ? userData?.userRole : ""}
        </h1>
        <div className="p-2 flex flex-col  text-gray-500 font-[sans-serif] text-sm font-semibold tracking-wide gap-3">
          <p className="text-[#313234]">
            <span className="text-xs"> {userData?.about || "Not Added"}</span>
          </p>
        </div>
      </div>
      {/* teacher timeline */}
      <div className="w-full relative h-70 p-1 ">
        {timelineModal && (
          <div className="absolute z-10 shadow-sm p-3 w-80 bg-white rounded-md top-1 left-30">
            <TimelineModal
              id={userData?._id}
              setTimelineModal={setTimelineModal}
            />
          </div>
        )}
        <div className="flex items-center bg-gray-100 w-full justify-between">
          <div className="flex gap-2 items-center">
            <h1 className="bg-gray-100 capitalize p-2 md:text-sm text-[10px] font-semibold text-gray-700 font-[sans-serif] tracking-wide">
              teacher Timeline
            </h1>
            <button
              onClick={() => setTimelineModal((prev) => !prev)}
              className="cursor-pointer h-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20"
                height="20"
                role="img"
                aria-label="Add"
              >
                <title>Add</title>
                <circle cx="24" cy="24" r="22" fill="#2563eb" />
                <path
                  d="M24 14v20M14 24h20"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-3 relative flex flex-col  h-60 overflow-scroll scroll-smooth w-full  text-gray-500 font-[sans-serif] text-sm font-semibold tracking-wide gap-3">
          <ul className="timeline timeline-vertical">
            {userData?.timeline.map((timeline) => (
              <li>
                <div className="timeline-start text-xs text-[#2C80FF] text-gray-700">
                  {timeline.eventDate}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5  text-[#2C80FF]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end bg-[#E7EAFE] text-[#2C80FF] border-none text-xs timeline-box">
                  {timeline.event}
                </div>
                <hr className=" border w-20 h-20 bg-[#2C80FF]" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
