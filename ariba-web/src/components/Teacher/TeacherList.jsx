import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationUsers, getUser } from "../../store/slices/userSlice.js";
import { CreateUser } from "../../allFiles.jsx";
const TeacherList = ({ creatUserModal, setCreateUserModal }) => {
  const user = useSelector((state) => state.user.loggedInUser?.user);
  const students = useSelector(
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
  const filteredUser = students?.filter((student) => {
    const query = searchQuery?.toLowerCase();
    return (
      student.firstName?.toLowerCase().includes(query) ||
      student.lastName?.toLowerCase().includes(query)
    );
  });
  const displayStudent = searchQuery ? filteredUser : students;
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
    <div className=" relative bg-white w-full h-full flex flex-col gap-2 rounded-lg">
      <div className="p-2 flex md:gap-5 gap-1 md:flex-row flex-col ">
        <div className=" flex gap-1">
          <h1 className="font-[sans-serif] flex-1 text-[#313234] font-semibold text-sm tracking-wide">
            Teachers
          </h1>{" "}
          <button
            onClick={() => setCreateUserModal((prev) => !prev)}
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
          </button>{" "}
        </div>

        <label className="border-none w-full flex-1 flex items-center gap-1 text-sm text-center pl-1 rounded-sm bg-[#E7EAFE]">
          <svg
            className="h-[1em] opacity-50 text-[#2C80FF]"
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
            className="font-[sans-serif] text-[#2C80FF] text-xs w-full outline-none"
            required
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2  h-full">
        {/* Header row */}
        <div className="flex w-full gap-1">
          {header.map((item, index) => (
            <p
              key={item.id}
              className={`${flexRatios[index]} text-start pl-1 pr-1 font-inter uppercase text-[10px] text-gray-400`}
            >
              {item.name}
            </p>
          ))}
        </div>

        {/* Student rows */}
        <div className=" h-full flex flex-col">
          {displayStudent.map((student, rowIndex) => (
            <div key={rowIndex}>
              <button
                onClick={() => handleGetUser(rowIndex, student._id)}
                className={`${
                  rowIndex === isActive ? "bg-[#2C80FF] text-white" : ""
                } flex cursor-pointer justify-between w-full p-1 items-center`}
              >
                <span className="flex-1 md:inline hidden">
                  <img
                    alt="img"
                    className={`${
                      rowIndex === isActive ? "border-none" : ""
                    } h-8 rounded-full w-8 border-2 border-[#2C80FF]`}
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                  ></img>
                </span>
                <span
                  className={`${
                    rowIndex === isActive ? "bg-[#2C80FF] text-white" : ""
                  }  md:p-2 p-1 md:text-[10px] text-[8px] flex justify-between flex-3 w-full uppercase font-semibold font-[sans-serif] tracking-wider text-gray-700`}
                >
                  {student.firstName + " " + student.lastName}
                </span>
                <span
                  className={` ${
                    rowIndex === isActive ? "bg-[#2C80FF] text-white" : ""
                  } md:p-2 md:text-[10px] text-[8px] flex-1 justify-between text-right w-fit w-full uppercase font-semibold font-[sans-serif] tracking-wider text-gray-700`}
                >
                  {student.ids || "ariba1"}
                </span>
              </button>

              {/* ✅ Only show <hr> if not the last row */}
              {rowIndex !== students.length - 1 && (
                <hr className="border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
