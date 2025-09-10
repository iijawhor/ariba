import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser as createUserSlice } from "../store/slices/userSlice.js";

const CreateUser = ({ createUser, setCreateUserModal }) => {
  const [userData, setUserData] = useState({});
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  console.log("logged in user...", loggedInUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const dispatch = useDispatch();
  const createUserApi = `http://localhost:7000/api/v1/user/create-user`;
  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log(userData); // submit data
    dispatch(
      createUserSlice({
        createUserApi,
        userData,
        accessToken: loggedInUser?.accessToken
      })
    );
  };

  return (
    <div className="w-full bg-white z-10 relative">
      <div className="flex">
        <h1 className="font-[sans-serif] text-sm tracking-wide w-full text-center font-semibold">
          Create User
        </h1>
        <button
          onClick={() => setCreateUserModal((prev) => !prev)}
          className="cursor-pointer h-fit w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20"
            height="20"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="20" fill="url(#grad)" />
            <path
              d="M16 16l16 16M16 32L32 16"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <form
        onSubmit={handleCreateUser}
        className="flex flex-col gap-2 mt-2 font-[sans-serif]"
      >
        {/* first + last name */}
        <div className="flex gap-2">
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="p-1 outline-none text-xs w-full"
              required
              onChange={handleChange}
            />
          </label>

          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="p-1 outline-none text-xs w-full"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        {/* email and password */}
        <div className="flex items-center gap-1">
          {/* email */}
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-1 outline-none text-xs w-full"
              required
              onChange={handleChange}
            />
          </label>

          {/* password */}
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-1 outline-none text-xs w-full"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        {/* date of birth and phoneNumber */}
        <div className="flex items-center  gap-1">
          {/* date of birth */}
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <input
              type="date"
              name="dateOfBirth"
              className="p-1 outline-none text-xs w-full"
              onChange={handleChange}
            />
          </label>

          {/* phone number */}
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="p-1 outline-none text-xs w-full"
              required
              onChange={handleChange}
            />
          </label>
        </div>
        {/* department and role */}
        <div className="flex items-center gap-1">
          {/* department */}
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <select
              name="department"
              className="p-1 outline-none text-xs w-full bg-transparent"
              required
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select Department
              </option>
              <option value="science">Science</option>
              <option value="arts">Arts</option>
              <option value="commerce">Commerce</option>
            </select>
          </label>

          {/* role */}
          <label className="border border-gray-200 bg-white h-fit items-center p-1 rounded-sm w-full flex text-xs">
            <select
              name="userRole"
              className="p-1 outline-none text-xs w-full bg-transparent"
              required
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        {/* gender */}
        <div className="border border-gray-200 bg-white rounded-sm p-2 flex flex-col gap-1 text-xs">
          <h1 className="font-medium">Gender</h1>
          <div className="flex gap-3">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-200"
                  required
                  onChange={handleChange}
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>
        {/* about and address */}
        <div className="flex items-center gap-1">
          {" "}
          {/* about */}
          <label className="border border-gray-200 bg-white h-fit p-1 rounded-sm w-full flex text-xs">
            <textarea
              name="about"
              placeholder="About"
              rows="3"
              className="p-1 outline-none text-xs w-full resize-none"
              onChange={handleChange}
            ></textarea>
          </label>
          {/* address */}
          <label className="border border-gray-200 bg-white h-fit p-1 rounded-sm w-full flex text-xs">
            <textarea
              name="address"
              placeholder="Address"
              rows="3"
              className="p-1 outline-none text-xs w-full resize-none"
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        {/* submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white cursor-pointer text-xs py-2 rounded-sm hover:bg-blue-600 transition"
        >
          Create {createUser}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
