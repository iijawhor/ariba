import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginHandler } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

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
          navigate("/");
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <form className="flex flex-col gap-3 items-center">
      <div className="flex gap-3 flex-col items-center w-full">
        <div className="flex flex-col gap-1 text-center">
          <div className="">.</div>
          <h1 className="font-semibold font-[sans-serif] tracking-wider">
            Admin
          </h1>
          <p className="text-sm font-[sans-serif] tracking-wide ">
            Enter your crendentials to access the platform
          </p>
        </div>
        <label className="border bg-[#eef1ffff] border-[#2C80FF] lg:w-70 p-1 rounded-full outline-none flex items-center gap-1">
          <svg
            className="h-[1.2em] opacity-50"
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="text"
            name="email"
            value={loginCredentials.email}
            onChange={(e) => handleChange(e)}
            required
            placeholder="User ID or Email"
            className="outline-none  w-full text-gray-800 text-xs p-1 font-[sans-serif] tracking-wide"
          />
        </label>
      </div>
      <div className="">
        {" "}
        <label className="border bg-[#eef1ffff] border-[#2C80FF] lg:w-70 p-1  rounded-full outline-none flex items-center gap-1">
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
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            name="password"
            value={loginCredentials.password}
            onChange={(e) => handleChange(e)}
            required
            placeholder="Password"
            className="outline-none  w-full text-gray-800 text-xs p-1 font-[sans-serif] tracking-wide"
          />
        </label>
      </div>
      <button
        onClick={handleLogin}
        className="bg-[#2C80FF] text-[#e7eafe] font-[sans-serif] tracking-wide cursor-pointer  w-30 p-1 rounded-full"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
