import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const loginError = useSelector((state) => state.user.error);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const loginApi = `http://localhost:7000/api/v1/user/signin`;
    dispatch(loginHandler({ loginApi, loginCredentials }))
      .unwrap()
      .then((result) => {
        if (result) {
          toast.success("Logged in successfully");
          navigate("/");
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => {
        toast.error(loginError?.message || "Something went wrong!");
      });
  };

  return (
    <form className="flex flex-col gap-4 items-center w-full">
      {/* Email Input */}
      <div className="flex gap-3 flex-col items-center w-full">
        <label className="border border-blue-400 bg-white/20 backdrop-blur-sm w-full rounded-full flex items-center px-4 py-2 gap-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
          {/* Email Icon */}
          <svg
            className="h-5 w-5 text-blue-600 opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12H8m8 0l-4-4m0 8l4-4m-4 4v-8"
            />
          </svg>
          <input
            type="text"
            name="email"
            value={loginCredentials.email}
            onChange={handleChange}
            required
            placeholder="User ID or Email"
            className="outline-none w-full text-blue-900 bg-transparent placeholder-blue-400 text-sm"
          />
        </label>
      </div>

      {/* Password Input */}
      <div className="flex gap-3 flex-col items-center w-full">
        <label className="border border-blue-400 bg-white/20 backdrop-blur-sm w-full rounded-full flex items-center px-4 py-2 gap-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
          {/* Lock Icon */}
          <svg
            className="h-5 w-5 text-blue-600 opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 1 0-4 0v2c0 1.104.896 2 2 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"
            />
          </svg>
          <input
            type="password"
            name="password"
            value={loginCredentials.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="outline-none w-full text-blue-900 bg-transparent placeholder-blue-400 text-sm"
          />
        </label>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full py-2 cursor-pointer mt-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:from-blue-700 hover:to-blue-500 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
