import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchHandler } from "../store/slices/searchSlice";

const Navbar = ({ activeMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedInUser?.user);

  const handleSearch = useCallback(() => {
    if (!searchQuery) {
      setError("Please enter something!");
      return;
    }

    const searchApi = `${import.meta.env.VITE_API_BASE_URL}/user/search?query=`;

    dispatch(searchHandler({ searchApi, searchQuery }))
      .unwrap()
      .then(() => setError(null))
      .catch((err) => setError(err));
  }, [searchQuery, dispatch]);

  return (
    <nav className="bg-white shadow-md px-4 py-3 md:py-2 rounded-lg sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Left: Brand & Active Menu */}
        <div className="flex items-center gap-3">
          <span className="text-[#2C80FF] capitalize font-bold text-lg md:text-xl">
            {activeMenu}
          </span>
          <span className="hidden md:inline h-5 w-[1px] bg-[#2C80FF]"></span>
          <span className="hidden md:inline text-gray-500 text-xs uppercase tracking-wide">
            {user?.organization?.name || "Default Organization ARIBA"}
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Right: Search & User */}
        <div
          className={`flex-1 md:flex-none md:flex items-center gap-3 mt-2 md:mt-0 ${
            isMobileMenuOpen ? "flex flex-col w-full" : "hidden md:flex"
          }`}
        >
          {/* Search */}
          <div className="flex items-center w-full md:w-80 border border-[#2C80FF] rounded-full bg-[#eef1ff] px-3 py-1 gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search student / teacher / document..."
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm md:text-base"
            />
            <button
              onClick={handleSearch}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1 md:mt-0 ml-2">{error}</p>
          )}

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-[#2C80FF] border-2 border-white"></span>
          </button>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              tabIndex={0}
            >
              <div className="hidden md:flex flex-col text-right">
                <h5 className="text-xs font-semibold text-gray-800 uppercase">
                  {user?.firstName} {user?.lastName}
                </h5>
                <p className="text-xs text-gray-600 capitalize">
                  {user?.userRole}
                </p>
              </div>
              <div className="border-2 border-gray-200 rounded-full hover:border-[#2C80FF] transition">
                <img
                  src={user?.avatar || "/logo/user.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-44 bg-[#2C80FF] rounded-lg shadow text-white p-2"
            >
              <li>
                <Link to="/profile" className="justify-between">
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
    </nav>
  );
};

export default Navbar;
