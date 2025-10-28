import React, { useState } from "react";
import { AnnouncementModal } from "../allFiles";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal submit
  const handleAnnouncementSubmit = ({ title, content }) => {
    console.log("New Announcement:", title, content);
    // You can integrate API call here to save announcement
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#F9FAFF]">
      {/* Page Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Top Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">
            Total Students
          </span>
          <h3 className="text-lg md:text-2xl font-bold text-[#2C80FF] mt-1">
            1,250
          </h3>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">
            Total Teachers
          </span>
          <h3 className="text-lg md:text-2xl font-bold text-[#2C80FF] mt-1">
            75
          </h3>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">Attendance</span>
          <h3 className="text-lg md:text-2xl font-bold text-[#2C80FF] mt-1">
            92%
          </h3>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">Payments</span>
          <h3 className="text-lg md:text-2xl font-bold text-[#2C80FF] mt-1">
            ₹8.5L
          </h3>
        </div>
      </div>

      {/* Middle Section: Fee Collection + Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Fee Collection Overview */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 h-64 flex flex-col text-gray-800">
          <h3 className="text-base md:text-lg font-semibold mb-3 text-gray-800">
            Fee Collection Overview
          </h3>
          <div className="flex flex-col gap-3 text-xs md:text-sm text-gray-800">
            <div className="flex justify-between">
              <span>Total Fees Collected</span>
              <span className="font-bold text-[#2C80FF]">₹6.8L</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Fees</span>
              <span className="font-bold text-red-500">₹1.7L</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div
                className="bg-[#2C80FF] h-2 md:h-3 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              80% of fees collected this term
            </p>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 h-64 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-700">
              Announcements
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-2 cursor-pointer md:px-3 py-1 text-xs md:text-sm bg-[#2C80FF] text-white rounded-full hover:bg-blue-600 transition"
            >
              + Publish
            </button>
          </div>
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600 overflow-y-auto pr-2">
            <li>📢 School will remain closed on Oct 10 for holiday</li>
            <li>📝 New syllabus update for Class 9 & 10</li>
            <li>🎉 Cultural Fest registrations open till Oct 12</li>
            <li>⚠️ Submit fee dues before Oct 15</li>
            <li>📢 Extra announcement to test scrolling</li>
            <li>📢 Extra announcement 2</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Recent Activity + Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5">
          <h3 className="text-base md:text-lg font-semibold mb-3 text-gray-700">
            Recent Activities
          </h3>
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
            <li>
              ✔ Student <b>Rahul</b> marked present today
            </li>
            <li>📚 New assignment added for Class 10</li>
            <li>
              💳 Payment received from <b>Riya Sharma</b>
            </li>
            <li>
              👨‍🏫 Teacher <b>Mr. Verma</b> updated attendance
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5">
          <h3 className="text-base md:text-lg font-semibold mb-3 text-gray-700">
            Upcoming Events
          </h3>
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
            <li>📅 Parent Teacher Meeting - Oct 5</li>
            <li>🎓 Annual Function - Oct 15</li>
            <li>📝 Mid-term Exams - Oct 20</li>
            <li>🏆 Sports Day - Oct 28</li>
          </ul>
        </div>
      </div>

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAnnouncementSubmit}
      />
    </main>
  );
};

export default Dashboard;
