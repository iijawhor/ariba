import React, { useState } from "react";
import {
  ClassModal,
  SubjectModal,
  AssignSubjectModal,
  AssignTeacherModal,
  ScheduleModal
} from "../allFiles";

const AcademicPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  const buttons = [
    { label: "Create Class", modal: "class" },
    { label: "Create Subject", modal: "subject" },
    { label: "Assign Subject", modal: "assignSubject" },
    { label: "Assign Teacher", modal: "assignTeacher" },
    { label: "Create Schedule", modal: "schedule" }
  ];

  const isAnyModalOpen = !!activeModal;

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 font-sans relative">
      {/* Background blur when modal open */}
      {isAnyModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"></div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 z-40 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2C80FF] tracking-wide">
          Academic Management
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {buttons.map((btn) => (
            <button
              key={btn.modal}
              onClick={() => setActiveModal(btn.modal)}
              className="bg-[#2C80FF] text-white text-sm md:text-base rounded-lg px-4 py-2 hover:bg-blue-600 transition shadow-md"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700">Classes</h2>
          <ul className="text-sm text-gray-600">
            <li>Class 1</li>
            <li>Class 2</li>
            <li>Class 3</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700">Subjects</h2>
          <ul className="text-sm text-gray-600">
            <li>Mathematics</li>
            <li>Science</li>
            <li>English</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700">Teachers</h2>
          <ul className="text-sm text-gray-600">
            <li>Mr. Sharma</li>
            <li>Ms. Rani</li>
            <li>Mr. Ali</li>
          </ul>
        </div>
      </div>

      {/* Imported Modals */}
      {activeModal === "class" && <ClassModal onClose={closeModal} />}
      {activeModal === "subject" && <SubjectModal onClose={closeModal} />}
      {activeModal === "assignSubject" && (
        <AssignSubjectModal onClose={closeModal} />
      )}
      {activeModal === "assignTeacher" && (
        <AssignTeacherModal onClose={closeModal} />
      )}
      {activeModal === "schedule" && <ScheduleModal onClose={closeModal} />}
    </div>
  );
};

export default AcademicPage;
