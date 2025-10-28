import React, { useState } from "react";
import { StudentDetails, StudentList } from "../allFiles";

const StudentPage = () => {
  const [mode, setMode] = useState("");
  const [userModal, setUserModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // 👈 for mobile sidebar toggle

  return (
    <div className="relative flex h-full bg-gray-50 overflow-hidden">
      {/* ===== Sidebar (StudentList) ===== */}
      <div
        className={`
          fixed top-16 left-0 z-40 md:z-0 w-64 h-[calc(100%-4rem)] transform bg-white shadow-lg transition-transform duration-300
          md:static md:translate-x-0 md:w-auto md:flex-1 md:h-auto
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <StudentList
          userModal={userModal}
          setUserModal={setUserModal}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* ===== Blurred Overlay for mobile ===== */}
      {showSidebar && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 z-30 md:z-10 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* ===== Details Section ===== */}
      <div className="flex-[2] h-screen overflow-hidden relative">
        <div className="h-full overflow-auto">
          <StudentDetails
            userModal={userModal}
            setUserModal={setUserModal}
            mode={mode}
            setMode={setMode}
            setShowSidebar={setShowSidebar} // pass toggle to open sidebar
          />
        </div>
      </div>

      {/* ===== Right Side (Message + Announcement) ===== */}
      <div className="hidden md:flex flex-1 flex-col h-screen overflow-auto border border-green-600">
        message box will be here
      </div>
    </div>
  );
};

export default StudentPage;
