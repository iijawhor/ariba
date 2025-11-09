import { Outlet, useNavigate } from "react-router-dom";
import { Loading, Navbar, Sidebar } from "./allFiles";
import { useEffect, useState } from "react";
import { useAttendance } from "./hooks/useAttendance.js";
import {
  generateRefreshAccessToken,
  setLoggedInUser
} from "./store/slices/userSlice.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrganization } from "./hooks/useGetOrganization.js";

function App() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const { getPresentDayAttendanceHook } = useAttendance(accessToken);
  const { fetchOrganizationDetails } = useGetOrganization(accessToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // to delay redirect until refresh check finishes
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const dispatch = useDispatch();
  useEffect(() => {
    fetchOrganizationDetails();
  }, [accessToken]);
  // ✅ Fetch current user if refresh token exists
  useEffect(() => {
    const generateRefreshAccessTokenApi = `${
      import.meta.env.VITE_API_BASE_URL
    }/user/refresh-token`;

    dispatch(generateRefreshAccessToken(generateRefreshAccessTokenApi));
    const getUserOnRefresh = async () => {
      try {
        // 1️⃣ Ask backend to refresh the access token (cookie auto-sent)
        const refreshRes = await axios.post(
          generateRefreshAccessTokenApi,
          {},
          { withCredentials: true }
        );

        // 3️⃣ Use that access token to fetch the user
        const userRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/get-current-user`,

          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true
          }
        );

        // 4️⃣ Save user to local state
        const currentUser = userRes.data;
        dispatch(setLoggedInUser(currentUser.user));
        setUser(currentUser);

        if (!accessToken) {
          return;
        }

        // Optional — load any user-specific data
        await getPresentDayAttendanceHook();
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUserOnRefresh();
  }, [accessToken]);

  // ✅ If user is null after check, redirect to signin
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [loading, user, navigate]);

  // ✅ Show loading until check completes
  if (loading) {
    return <Loading />;
  }
  const sidebar = [
    {
      name: "dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <rect x="3" y="3" width="8" height="8" rx="2" />{" "}
          <rect x="13" y="3" width="8" height="5" rx="2" />{" "}
          <rect x="13" y="10" width="8" height="11" rx="2" />{" "}
          <rect x="3" y="13" width="8" height="8" rx="2" />{" "}
        </svg>
      ),
      to: "",
      id: 1
    },
    {
      name: "My Space",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <circle cx="12" cy="12" r="10" /> <circle cx="12" cy="9" r="3" />{" "}
          <path d="M7 19c0-2.5 2-4.5 5-4.5s5 2 5 4.5" />{" "}
        </svg>
      ),
      to: "me",
      id: 2
    },
    {
      name: "academic",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          {" "}
          <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" fill="white" />{" "}
          <path d="M20 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" fill="white" />{" "}
        </svg>
      ),
      to: "academic",
      id: 6
    },
    {
      name: "attendance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          {" "}
          <circle cx="12" cy="8" r="4" fill="white" />{" "}
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="white" />{" "}
          <path
            d="M19 6v4M17 8h4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />{" "}
        </svg>
      ),
      to: "attendance",
      id: 5
    },
    {
      name: "teachers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <circle cx="12" cy="7" r="4" />{" "}
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />{" "}
          <path d="M12 11l-1 2 1 2 1-2-1-2z" />{" "}
          <line x1="12" y1="13" x2="12" y2="17" />{" "}
        </svg>
      ),
      to: "teachers",
      id: 3
    },
    {
      name: "students",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          {" "}
          <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V20h14v-3.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.7 0-1 .1 1.2.8 2 1.9 2 3.4V20h6v-3.5c0-2.3-4.7-3.5-7-3.5z" />{" "}
        </svg>
      ),
      to: "students",
      id: 4
    },

    {
      name: "payment",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          {" "}
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />{" "}
        </svg>
      ),
      to: "payment",
      id: 7
    },
    {
      name: "settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          {" "}
          <path d="M19.14,12.94c0-.31,0-.62-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7,7,0,0,0-1.62-.94l-.38-2.65A.5.5,0,0,0,13.73,3H10.27a.5.5,0,0,0-.49.42l-.38,2.65a7,7,0,0,0-1.62.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64l2.11,1.65c0,.32-.05.63-.05.94s0,.62.05.94L3,15.53a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7,7,0,0,0,1.62.94l.38,2.65a.5.5,0,0,0,.49.42h3.46a.5.5,0,0,0,.49-.42l.38-2.65a7,7,0,0,0,1.62-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />{" "}
        </svg>
      ),
      to: "settings",
      id: 8
    }
  ];
  return (
    <div className="bg-[#E7EAFE] p-5 pr-2 min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col p-5 w-56 fixed left-0 top-0 h-full z-20">
        <Sidebar sidebar={sidebar} setActiveMenu={setActiveMenu} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-56 flex gap-1 flex-col min-h-screen">
        <header className="sticky top-0 rounded-full z-10 bg-[#F9FAFF] shadow-sm">
          <Navbar activeMenu={activeMenu} sidebar={sidebar} />
        </header>

        <main className="flex-1 rounded-lg overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
