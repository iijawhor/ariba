import { useSelector } from "react-redux";
import { UserModal } from "../../allFiles.jsx";
import { useGetUsers } from "../../hooks/useGetUsers.js";

const TeacherList = ({ userModal, setUserModal, mode, setMode }) => {
  const user = useSelector((state) => state.user.loggedInUser);
  const organization = user?.organization;
  const { users, searchQuery, setSearchQuery, isActive, handleSelectUser } =
    useGetUsers(organization, "teacher");
  const header = ["photo", "name", "id"];
  const flexRatios = ["flex-[1_1_0%]", "flex-[3_1_0%]", "flex-[1_1_0%]"];
  const hanleAddModal = () => {
    setMode("add");
    setUserModal((prev) => !prev);
  };

  return (
    <div className="relative bg-white w-full h-full flex flex-col gap-3 rounded-lg shadow-sm p-3">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-2">
        <div className="flex items-center gap-2">
          <h1 className="font-sans text-gray-800 font-semibold text-lg md:text-lg tracking-wide">
            All Teachers
          </h1>
          <button
            onClick={hanleAddModal}
            className="flex items-center cursor-pointer gap-1 border border-[#2C80FF] px-2 py- rounded-full bg-[#2C80FF] text-white hover:bg-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {mode === "add" && userModal && (
          <UserModal
            isOpen={userModal}
            onClose={() => setUserModal(false)}
            title="Add Teacher"
            mode="add"
            userData={null}
          />
        )}

        {/* Search Input */}
        <label className="flex items-center gap-2 pl-1 pr-1 bg-[#E7EAFE] rounded-full flex-1">
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
            className="font-sans text-[#2C80FF] p-0.5 placeholder:text-gray-400 text-sm md:text-base w-full outline-none bg-transparent"
            placeholder="Search teacher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>

      {/* Table Header */}
      <div className="flex w-full bg-gray-50 rounded-md p-1">
        {header.map((name, index) => (
          <p
            key={index}
            className={`${flexRatios[index]} text-gray-400 flex-1 text-center text-[10px] md:text-sx font-medium uppercase tracking-wide`}
          >
            {name}
          </p>
        ))}
      </div>

      {/* Teacher List */}
      <div className="flex flex-col gap-1 overflow-y-auto h-full">
        {users.map((teacher, index) => (
          <div key={index}>
            <button
              onClick={() => handleSelectUser(index, teacher._id)}
              className={`flex items-center uppercase w-full p-1 hover:cursor-pointer rounded-md transition-all duration-150 ${
                index === isActive
                  ? "bg-[#2C80FF] text-white shadow"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {/* Avatar */}
              <div className="flex items-center flex-1 md:flex-[1]">
                <img
                  alt="avatar"
                  src={
                    teacher.photo ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                  }
                  className={`h-8 w-8 rounded-full border-2 ${
                    index === isActive ? "border-white" : "border-[#2C80FF]"
                  }`}
                />
              </div>

              {/* Name */}
              <span
                className={`flex-[3] text-left md:text-center font-semibold text-sm md:text-xs tracking-wide ${
                  index === isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {teacher.firstName} {teacher.lastName}
              </span>

              {/* ID */}
              <span
                className={`flex-1 text-right font-semibold text-sm md:text-xs tracking-wide ${
                  index === isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {teacher.ids || "ariba1"}
              </span>
            </button>

            {index !== users.length - 1 && (
              <hr className="border-gray-200 mt-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
