import { useState, useEffect } from "react";
import { useSaveUser } from "../hooks/useSaveUser.js";
import { useSelector } from "react-redux";

const UserModal = ({ isOpen, onClose, userData, mode }) => {
  const { saveUser } = useSaveUser();
  const isEdit = mode === "update";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    organization: "",
    dateOfBirth: "",
    about: "",
    gender: "",
    religion: "",
    address: "",
    userRole: "",
    department: "",
    dateOfjoining: ""
  });

  useEffect(() => {
    if (!isOpen) return; // Only run when modal is opened

    if (mode === "update" && userData) {
      setFormData({
        ...userData
      });
    }

    if (mode === "add") {
      // Force reset to empty every time Add modal opens
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        organization: "",
        dateOfBirth: "",
        about: "",
        gender: "",
        religion: "",
        address: "",
        userRole: "",
        department: "",
        dateOfjoining: ""
      });
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const icons = {
    firstName: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 14c3.866 0 7 3.134 7 7H5c0-3.866 3.134-7 7-7zM12 12a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    ),
    lastName: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 14c3.866 0 7 3.134 7 7H5c0-3.866 3.134-7 7-7zM12 12a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
    ),
    email: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
        />
      </svg>
    ),
    password: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3zM5 11h14v10H5z"
        />
      </svg>
    ),
    phoneNumber: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M2 3h5l2 5-3 2a11 11 0 005 5l2-3 5 2v5a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"
        />
      </svg>
    ),
    organization: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 7h18M3 12h18M3 17h18"
        />
      </svg>
    ),
    department: (
      <svg
        className="w-4 h-4 text-[#2C80FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({ e, formData, userId: userData?._id, mode });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto border-t-4 border-[#2C80FF]">
        {/* Header */}
        <ToastContainer />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Update User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#2C80FF] text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {/* Text Inputs */}
          {[
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "email", label: "Email" },

            ...(isEdit
              ? []
              : [{ name: "password", label: "Password", type: "password" }]),
            { name: "phoneNumber", label: "Phone Number" },
            { name: "dateOfBirth", label: "Date of Birth", type: "date" },
            { name: "dateOfjoining", label: "Date of Joining", type: "date" }
          ].map(({ name, label, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <div className="relative flex items-center">
                {icons[name] && (
                  <div className="absolute left-3">{icons[name]}</div>
                )}
                <input
                  type={type}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  placeholder={label}
                  className={`w-full border border-gray-200 rounded-lg ${
                    icons[name] ? "pl-9" : "pl-3"
                  } pr-3 py-2 text-gray-700 text-sm 
                    focus:ring-2 focus:ring-[#2C80FF] lowercase focus:border-[#2C80FF] outline-none
                    shadow-sm hover:shadow-md transition-all duration-200`}
                />
              </div>
            </div>
          ))}

          {/* Dropdowns */}
          {/* Organization */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Organization
            </label>
            <select
              name="organization"
              value={formData.organizationDetails?.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <option value={userData?.organizationDetails?.name}>
                {userData?.organizationDetails.name}
              </option>
            </select>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <option value="">Select Department</option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
              <option value="math">Mathematics</option>
              <option value="english">English</option>
              <option value="physicalEducation">Physical Education</option>
            </select>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Religion */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Religion
            </label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <option value="">Select Religion</option>
              <option value="Islam">Islam</option>
              <option value="Christian">Christian</option>
              <option value="Hindu">Hindu</option>
              <option value="Not willing to share">Not willing to share</option>
            </select>
          </div>

          {/* User Role */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              User Role
            </label>
            <select
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <option value="">Select Role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* About */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write something about user..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 h-20"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm
                         focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] outline-none
                         shadow-sm hover:shadow-md transition-all duration-200 h-16"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#2C80FF] text-white hover:bg-[#256fe0] transition text-sm font-medium cursor-pointer"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
