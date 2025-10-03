import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationUsers, getUser } from "../../store/slices/userSlice.js";
import { CreateUser } from "../../allFiles.jsx";
const TeacherList = ({ creatUserModal, setCreateUserModal }) => {
  const user = useSelector((state) => state.user.loggedInUser?.user);
  const teachers = useSelector(
    (state) => state.user.usersByOrganization?.users || []
  );
  const organization = user?.organization;
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(0);
  const header = [
    { name: "photo", id: 1 },
    { name: "name", id: 2 },
    { name: "id", id: 3 }
  ];
  const flexRatios = ["flex-[1_1_0%]", "flex-[3_1_0%]", "flex-[1_1_0%]"];
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUser = teachers?.filter((teacher) => {
    const query = searchQuery?.toLowerCase();
    return (
      teacher.firstName?.toLowerCase().includes(query) ||
      teacher.lastName?.toLowerCase().includes(query)
    );
  });
  const displayteacher = searchQuery ? filteredUser : teachers;
  const getOrganizationUserApi = `${
    import.meta.env.VITE_API_BASE_URL
  }/user/get-organization-users/?organizationId=`;

  useEffect(() => {
    dispatch(
      getOrganizationUsers({
        getOrganizationUserApi,
        organization,
        userRole: "teacher"
      })
    );
  }, []);

  // get user by id
  const getUserApi = `${import.meta.env.VITE_API_BASE_URL}/user/get-user-by-id`;

  const handleGetUser = (rowIndex, id) => {
    setIsActive(rowIndex);
    dispatch(getUser({ getUserApi, id }));
  };

  return (
    <div className="relative bg-white w-full h-full flex flex-col gap-3 rounded-lg shadow-sm p-3">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-2">
        <div className="flex items-center gap-2">
          <h1 className="font-sans text-gray-800 font-semibold text-lg md:text-lg tracking-wide">
            Teachers
          </h1>
          <button
            onClick={() => setCreateUserModal((prev) => !prev)}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20"
              height="20"
            >
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

        {/* Search Bar */}
        <label className="flex items-center gap-2 bg-[#E7EAFE] rounded-md p-1 flex-1">
          <svg
            className="h-5 w-5 text-[#2C80FF] opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="font-sans text-[#2C80FF] placeholder:text-gray-400 text-sm md:text-base w-full outline-none bg-transparent"
            required
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher"
          />
        </label>
      </div>

      {/* Table Header */}
      <div className="flex w-full  bg-gray-50 rounded-md p-1">
        {header.map((item, index) => (
          <p
            key={item.id}
            className={`${flexRatios[index]} text-gray-400 flex-1 text-center text-[10px] md:text-sx font-medium uppercase tracking-wide`}
          >
            {item.name}
          </p>
        ))}
      </div>

      {/* Teacher Rows */}
      <div className="flex flex-col gap-1 overflow-y-auto h-full">
        {displayteacher.map((teacher, rowIndex) => (
          <div key={rowIndex}>
            <button
              onClick={() => handleGetUser(rowIndex, teacher._id)}
              className={`flex items-center uppercase w-full p-1 hover:cursor-pointer rounded-md transition-all duration-150 ${
                rowIndex === isActive
                  ? "bg-[#2C80FF] text-white shadow"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {/* Avatar */}
              <div className="flex items-center flex-1 md:flex-[1]">
                <img
                  alt="avatar"
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                  className={`h-8 w-8 rounded-full border-2 ${
                    rowIndex === isActive ? "border-white" : "border-[#2C80FF]"
                  }`}
                />
              </div>

              {/* Name */}
              <span
                className={`flex-[3] text-left md:text-center font-semibold text-sm md:text-xs tracking-wide ${
                  rowIndex === isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {teacher.firstName} {teacher.lastName}
              </span>

              {/* ID */}
              <span
                className={`flex-1 text-right font-semibold text-sm md:text-xs tracking-wide ${
                  rowIndex === isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {teacher.ids || "ariba1"}
              </span>
            </button>

            {/* Divider */}
            {rowIndex !== displayteacher.length - 1 && (
              <hr className="border-gray-200 mt-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
