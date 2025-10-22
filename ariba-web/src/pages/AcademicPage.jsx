import React, { useState } from "react";
import {
  ClassModal,
  SubjectModal,
  AssignSubjectModal,
  AssignTeacherModal,
  RoutineModal,
  InfoCard
} from "../allFiles";
import ViewRoutineModal from "../components/modals/ViewRoutineModal.jsx";
import RoutineFilter from "../academic/RoutineFilter.jsx";

const AcademicPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [routineFilter, setRoutineFilter] = useState({
    date: new Date().toISOString().split("T")[0],
    class: "",
    teacher: "",
    day: ""
  });

  const closeModal = () => setActiveModal(null);
  const isAnyModalOpen = !!activeModal;

  // Sample dynamic data
  const classes = ["Class 1", "Class 2", "Class 3"];
  const subjects = ["Mathematics", "Science", "English"];
  const teachers = [
    "Mr. Sharma",
    "Ms. Rani",
    "Mr. Ali",
    "Mr. Sharma",
    "Ms. Rani",
    "Mr. Ali"
  ];
  const routines = [
    {
      class: "Class 1",
      teacher: "Mr. Sharma",
      day: "Monday",
      subject: "Mathematics",
      time: "9:00 AM - 10:00 AM"
    },
    {
      class: "Class 1",
      teacher: "Mr. Sharma",
      day: "Monday",
      subject: "Science",
      time: "10:00 AM - 11:00 AM"
    },
    {
      class: "Class 2",
      teacher: "Ms. Rani",
      day: "Tuesday",
      subject: "English",
      time: "11:00 AM - 12:00 PM"
    },
    {
      class: "Class 3",
      teacher: "Mr. Ali",
      day: "Wednesday",
      subject: "Mathematics",
      time: "1:00 PM - 2:00 PM"
    }
  ];

  const buttons = [
    { label: "Create Class / Batch", modal: "class" },
    { label: "Create Subject", modal: "subject" },
    { label: "Assign Subject", modal: "assignSubject" },
    { label: "Assign Teacher", modal: "assignTeacher" },
    { label: "Create Routine", modal: "createRoutine" }
  ];

  return (
    <div className="relative min-h-screen bg-[#F6F8FF] p-6 font-sans overflow-hidden">
      {isAnyModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"></div>
      )}

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1E56D9] via-[#2C80FF] to-[#5CAEFF] p-6 mb-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-sm">
            Academic Management
          </h1>
          <p className="text-sm text-blue-100 mt-1">
            Streamline your school’s academic structure, subjects, and routines.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {buttons.map((btn) => (
            <button
              key={btn.modal}
              onClick={() => setActiveModal(btn.modal)}
              className="relative overflow-hidden cursor-pointer rounded-2xl 
                bg-gradient-to-r from-blue-400 to-blue-600 
                text-white font-semibold text-sm md:text-base 
                px-6 py-3 shadow-lg transform transition-all duration-300
                hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <span className="relative z-10">{btn.label}</span>
              <span className="absolute inset-0 bg-white opacity-10 rounded-2xl pointer-events-none animate-pulse-slow"></span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <InfoCard title="Classes / Batches" items={classes} />
        <InfoCard title="Subjects" items={subjects} />
        <InfoCard title="Teachers" items={teachers} />
      </div>

      {/* Routine Filter with View Routine button inside */}
      <RoutineFilter
        classes={classes}
        teachers={teachers}
        onFilterChange={(filters) => setRoutineFilter(filters)}
        onViewRoutine={() => setActiveModal("viewRoutine")}
      />

      {/* Insights Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-[#2C80FF] text-xl font-semibold mb-5">
          Academic Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-[#EEF4FF] rounded-xl p-5 text-center hover:shadow-md transition">
            <h3 className="text-sm font-medium text-[#1E56D9]">
              Total Classes
            </h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">
              {classes.length}
            </p>
          </div>
          <div className="bg-[#EEF4FF] rounded-xl p-5 text-center hover:shadow-md transition">
            <h3 className="text-sm font-medium text-[#1E56D9]">
              Total Subjects
            </h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">
              {subjects.length}
            </p>
          </div>
          <div className="bg-[#EEF4FF] rounded-xl p-5 text-center hover:shadow-md transition">
            <h3 className="text-sm font-medium text-[#1E56D9]">
              Total Teachers
            </h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">
              {teachers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "class" && <ClassModal onClose={closeModal} />}
      {activeModal === "subject" && <SubjectModal onClose={closeModal} />}
      {activeModal === "assignSubject" && (
        <AssignSubjectModal onClose={closeModal} />
      )}
      {activeModal === "assignTeacher" && (
        <AssignTeacherModal onClose={closeModal} />
      )}
      {activeModal === "createRoutine" && <RoutineModal onClose={closeModal} />}
      {activeModal === "viewRoutine" && (
        <ViewRoutineModal
          onClose={closeModal}
          filters={routineFilter}
          routines={routines}
        />
      )}
    </div>
  );
};

export default AcademicPage;
