import React, { useEffect, useState } from "react";
import { AnnouncementModal } from "../allFiles";
import { useAnnouncement } from "../hooks/useAnnouncement.js";
import { useSelector } from "react-redux";
import { useAcademic } from "../hooks/useAcademic.js";
const Dashboard = () => {
  const token = useSelector((state) => state.user.accessToken);
  const allTeachers = useSelector((state) => state.academic.teachers);
  const allStudents = useSelector((state) => state.academic.students);
  const { getTeachersHook, getStudentsHook } = useAcademic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getAnnouncementHook } = useAnnouncement();
  const announcements = useSelector(
    (state) => state.announcement.announcements
  );
  const loading = useSelector((state) => state.announcement.loading);
  const [announcement, setAnnouncement] = useState(
    announcements.announcement || []
  );

  useEffect(() => {
    if (!token) return; // ⛔ don’t call until token exists
    getAnnouncementHook();
  }, []);

  useEffect(() => {
    setAnnouncement(announcements.announcement || []);
  }, [announcements]);

  useEffect(() => {
    getTeachersHook();
    getStudentsHook();
  }, []);
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
            {allStudents?.students?.length}
          </h3>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-5 flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">
            Total Teachers
          </span>
          <h3 className="text-lg md:text-2xl font-bold text-[#2C80FF] mt-1">
            {allTeachers?.teachers?.length}
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
          <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 bg-gray-100 animate-pulse rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                </li>
              ))
            ) : announcement?.length > 0 ? (
              announcement.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-white shadow-sm border border-blue-100 rounded-xl px-4 py-3 hover:shadow-md hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex flex-col">
                    <p className="text-gray-800 font-semibold">
                      {item.title}
                      <span className="mx-1 text-gray-500 font-normal">–</span>
                      <span className="text-gray-600 font-normal">
                        {item.content}
                      </span>
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-center italic">
                No announcements yet
              </li>
            )}
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
        setAnnouncement={setAnnouncement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default Dashboard;
