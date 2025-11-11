import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchHandler } from "../store/slices/searchSlice";
import { useUser } from "../hooks/useUser.js";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu, sidebar, setActiveMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedInUser);
  const tenant = useSelector((state) => state.user.organization);
  const { logoutHook } = useUser();
  const sidebarRef = useRef(null);

  // Close sidebar if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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
    <>
      <nav className="bg-white shadow-md px-4 py-3 md:py-2 rounded-xl sticky top-0 z-50 border-b border-blue-100">
        <div className="flex items-center justify-between w-full">
          {/* 🔹 Left Section - Active Menu + Organization */}
          <div className="flex items-center gap-3">
            {/* Active Menu */}
            <span className="text-[#2563EB] tracking-wide font-bold capitalize text-lg md:text-xl tracking-tight leading-tight">
              {activeMenu}
            </span>

            {/* Separator */}
            <span className="hidden md:inline h-5 w-[2px] bg-gradient-to-b from-[#2C80FF] to-blue-300 rounded-full"></span>

            {/* Organization Name */}
            <span className="hidden md:inline text-[#2C80FF]/80 text-[12px] md:text-[13px] font-semibold tracking-wider uppercase">
              {tenant?.tenant?.name || "Default Organization ARIBA"}
            </span>
          </div>

          {/* 🔹 Right Section - Profile + Dropdown + Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="dropdown dropdown-end">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                tabIndex={0}
              >
                <div className="hidden md:flex flex-col text-right">
                  <h5 className="text-xs font-semibold text-[#1E3A8A] uppercase group-hover:text-[#2C80FF] transition-colors">
                    {user?.firstName} {user?.lastName}
                  </h5>
                  <p className="text-[11px] text-[#2563EB]/80 capitalize group-hover:text-[#2C80FF]">
                    {user?.userRole}
                  </p>
                </div>

                <div className="border-2 border-transparent rounded-full hover:border-[#2C80FF] transition-all duration-300 shadow-sm">
                  <img
                    src={user?.avatar || "/logo/user.png"}
                    alt="avatar"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-44 bg-white border border-blue-100 rounded-xl shadow-md text-gray-700 p-2 space-y-1"
              >
                <li>
                  <Link
                    to="/settings"
                    className="rounded-lg px-3 py-2 hover:bg-[#EEF4FF] hover:text-[#2C80FF] transition"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHook}
                    className="w-full text-left rounded-lg px-3 py-2 hover:bg-[#EEF4FF] hover:text-[#2C80FF] transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-[#EEF4FF] text-[#2C80FF] transition"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              )}
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Search Bar */}
        <div className="flex justify-center mt-3 md:hidden">
          <div className="flex items-center w-11/12 border border-[#2C80FF] rounded-full bg-[#EEF4FF] px-3 py-1.5 gap-2 shadow-sm">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search student / teacher / document..."
              className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-[#2C80FF] hover:scale-110 transition-transform"
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
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </nav>

      {/* 🔹 Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/30"></div>
          <div
            ref={sidebarRef}
            className="relative w-fit h-full bg-[#2C80FF] p-5 overflow-y-auto rounded-r-2xl shadow-lg"
          >
            <Sidebar sidebar={sidebar} setActiveMenu={setActiveMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
