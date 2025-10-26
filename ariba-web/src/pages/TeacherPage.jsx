import React, { useState } from "react";
import {
  AnnouncementModal,
  MessageBox,
  TeacherDetails,
  TeacherList
} from "../allFiles";

const TeacherPage = () => {
  const [mode, setMode] = useState("");
  const [userModal, setUserModal] = useState(false);
  return (
    <div className="flex h-full gap-2 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <TeacherList
          userModal={userModal}
          setUserModal={setUserModal}
          mode={mode}
          setMode={setMode}
        />
      </div>
      <div className="flex-2 overflow-auto">
        <TeacherDetails
          userModal={userModal}
          setUserModal={setUserModal}
          mode={mode}
          setMode={setMode}
        />
      </div>
      <div className="flex-1 hidden md:inline border border-green-600 flex flex-col overflow-auto">
        <MessageBox />
        <AnnouncementModal />
      </div>
    </div>
  );
};

export default TeacherPage;
