import { useState } from "react";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchHandler } from "../store/slices/searchSlice";
const Navbar = ({ activeMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.loggedInUser?.user);
  const handleSearch = useCallback(() => {
    if (!searchQuery) {
      setError("Please enter something!");
      return;
    }

    const searchApi = `${import.meta.env.VITE_API_BASE_URL}/user/search?query=`;

    // Dispatch the thunk and wait for the result
    dispatch(searchHandler({ searchApi, searchQuery }))
      .unwrap() // if using Redux Toolkit, unwrap gives the resolved value
      .then((result) => {
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, [searchQuery, dispatch]);

  return (
    <div className="navbar borer bg-[#F9FAFF] flex items-center justify-between rounded-sm md:rounded-lg">
      <div className="flex">
        <p className="text-lg font-[sans-serif] tracking-wider flex gap-5 items-center capitalize font-semibold">
          <span className="text-[#2C80FF] md:w-21 w-fit text-xs md:text-sm tracking-wider text-center ">
            {activeMenu}
          </span>
          <span className="h-4 w-0.5 bg-[#2C80FF] hidden md:inline"></span>

          <span className=" tracking-wide uppercase hidden md:inline text-xs text-[#313234]">
            {user?.organization ? (
              user.organization
            ) : (
              <span>Kasbagola f. o. b model high madrasha</span>
            )}
          </span>
        </p>
      </div>
      <div className="flex gap-3  pl-1 items-center justify-center">
        <div className="flex flex-row items-center h-fit gap-2">
          <label className="border bg-[#eef1ffff] border-[#2C80FF] p-1 lg:w-70 p-0.5 rounded-full outline-none flex items-center gap-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // call your function
                }
              }}
              className="outline-none  w-full text-gray-800 text-xs p-1 font-[sans-serif] tracking-wide"
              placeholder="Search for student / teacher / document..."
            />
            <span className="border h-3 border-gray-300"></span>
            <button onClick={handleSearch}>
              <svg
                className="h-[1em] opacity-50"
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
            </button>
          </label>
          <button className="h-5 cursor-pointer">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
              <span className="h-2.5 w-2.5 rounded-full absolute left-2.5 bottom-3 bg-[#2C80FF]"></span>
            </div>
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div className="w-fit flex items-center gap-1 font-semibold text-gray-900">
            <div className="items-end text-end hidden md:inline">
              <h5 className="text-xs font-[sans-serif] uppercase  text-[#313234]">
                {user?.firstName + " " + user?.lastName}
              </h5>
              <p className="text-xs capitalize tracking-wide text-[#313234]">
                {user?.userRole}
              </p>
            </div>
            <div
              tabIndex={0}
              role="button"
              className=" border-2 border-gray-200 rounded-full cursor-pointer hover:border-[#2C80FF]"
            >
              <div className="w-10 rounded-full">
                {user?.avatar ? (
                  <img className="" src={user?.avatar} />
                ) : (
                  <img className="" src="./logo/user.png" />
                )}
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu text-white menu-sm dropdown-content bg-[#2C80FF] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className="text-white">
              <Link to="profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
