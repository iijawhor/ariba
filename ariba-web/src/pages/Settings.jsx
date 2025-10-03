import React, { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 font-sans min-h-screen bg-[#F4F6FA]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-60 bg-white rounded-lg shadow p-4 flex flex-col gap-2 sticky top-4 h-fit">
        <h2 className="text-lg font-bold text-[#2C80FF] mb-4">Settings</h2>
        {["profile", "account", "notifications", "system"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-left p-2 rounded-lg cursor-pointer transition-colors w-full font-semibold ${
              activeTab === tab
                ? "bg-[#2C80FF] text-white"
                : "text-gray-800 hover:bg-blue-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2C80FF] tracking-wide capitalize">
          {activeTab}
        </h1>

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Full Name
              <input
                type="text"
                placeholder="Enter full name"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Email
              <input
                type="email"
                placeholder="Enter email"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Phone
              <input
                type="text"
                placeholder="Enter phone number"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900"
              />
            </label>
            <button className="bg-[#2C80FF] text-white rounded-lg px-4 py-2 w-fit hover:bg-blue-600 transition">
              Save Changes
            </button>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === "account" && (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Change Password
              <input
                type="password"
                placeholder="Enter new password"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Confirm Password
              <input
                type="password"
                placeholder="Confirm new password"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900"
              />
            </label>
            <button className="bg-[#2C80FF] text-white rounded-lg px-4 py-2 w-fit hover:bg-blue-600 transition">
              Update Password
            </button>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="flex flex-col gap-4 text-gray-800">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#2C80FF]" />
              Receive email notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#2C80FF]" />
              Receive SMS notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#2C80FF]" />
              Enable push notifications
            </label>
          </div>
        )}

        {/* System Preferences */}
        {activeTab === "system" && (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Theme
              <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-gray-800">
              Language
              <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2C80FF] text-gray-900">
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
