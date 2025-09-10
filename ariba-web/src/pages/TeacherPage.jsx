import React, { useState } from "react";
import {
  Anouncements,
  MessageBox,
  TeacherDetails,
  TeacherList
} from "../allFiles";

const TeacherPage = () => {
  const [creatUserModal, setCreateUserModal] = useState(false);

  return (
    <div className="flex h-full gap-2 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <TeacherList
          setCreateUserModal={setCreateUserModal}
          creatUserModal={creatUserModal}
        />
      </div>
      <div className="flex-2 overflow-auto">
        <TeacherDetails
          setCreateUserModal={setCreateUserModal}
          creatUserModal={creatUserModal}
        />
      </div>
      <div className="flex-1 hidden md:inline border border-green-600 flex flex-col overflow-auto">
        <MessageBox />
        <Anouncements />
      </div>
    </div>
  );
};

export default TeacherPage;
