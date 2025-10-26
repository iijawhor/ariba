import React, { useEffect, useState } from "react";
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
import { useAcademic } from "../hooks/useAcademic.js";
import { useSelector } from "react-redux";
const AcademicPage = () => {
  const allTeachers = useSelector((state) => state.academic.teachers);
  const allGrades = useSelector((state) => state.academic.grades);
  const allSubjects = useSelector((state) => state.academic.subjects);
  const allRoutine = useSelector((state) => state.academic.routine);

  const [activeModal, setActiveModal] = useState(null);
  const [routineFilter, setRoutineFilter] = useState({
    date: new Date().toISOString().split("T")[0],
    class: "",
    teacher: "",
    day: ""
  });

  const { getTeachersHook, getSubjectsHook, getGradesHook } = useAcademic();
  const closeModal = () => setActiveModal(null);
  const isAnyModalOpen = !!activeModal;

  const buttons = [
    { label: "Create Class / Batch", modal: "class" },
    { label: "Create Subject", modal: "subject" },
    { label: "Assign Subject", modal: "assignSubject" },
    { label: "Assign Teacher", modal: "assignTeacher" },
    { label: "Create Routine", modal: "createRoutine" }
  ];

  useEffect(() => {
    getGradesHook();
    getSubjectsHook();
    getTeachersHook();
  }, []);

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
        <InfoCard
          title="Classes / Batches"
          items={allGrades.grades}
          displayKey="className"
        />

        <InfoCard
          title="Subjects"
          items={allSubjects.subjects}
          displayKey="subjectName"
        />

        <InfoCard
          title="Teachers"
          items={allTeachers.teachers}
          displayKey="firstName"
        />
      </div>

      {/* Routine Filter with View Routine button inside */}
      <RoutineFilter
        classes={allGrades.grades}
        teachers={allTeachers.teachers}
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
              {allGrades?.grades?.length}
            </p>
          </div>
          <div className="bg-[#EEF4FF] rounded-xl p-5 text-center hover:shadow-md transition">
            <h3 className="text-sm font-medium text-[#1E56D9]">
              Total Subjects
            </h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">
              {allSubjects?.subjects?.length}
            </p>
          </div>
          <div className="bg-[#EEF4FF] rounded-xl p-5 text-center hover:shadow-md transition">
            <h3 className="text-sm font-medium text-[#1E56D9]">
              Total Teachers
            </h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">
              {allTeachers?.teachers?.length}
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
      {activeModal === "createRoutine" && (
        <RoutineModal
          onClose={closeModal}
          teachers={allTeachers.teachers}
          classes={allGrades.grades}
          subjects={allSubjects.subjects}
        />
      )}
      {activeModal === "viewRoutine" && (
        <ViewRoutineModal
          onClose={closeModal}
          filters={routineFilter}
          routines={allRoutine?.data || []}
        />
      )}
    </div>
  );
};

export default AcademicPage;
