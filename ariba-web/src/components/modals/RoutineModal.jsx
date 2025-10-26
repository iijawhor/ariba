import React, { useState, useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { useAcademic } from "../../hooks/useAcademic.js";

const RoutineModal = ({ onClose, classes, teachers, subjects }) => {
  const [formData, setFormData] = useState({
    grade: "",
    subjectName: "",
    teachers: "",
    day: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const { handleCreateRoutineHook } = useAcademic();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [subjectSearch, setSubjectSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);

  const subjectRef = useRef(null);
  const teacherRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubjectSearch = (e) => {
    const value = e.target.value;
    setSubjectSearch(value);
    setFilteredSubjects(
      subjects.filter((sub) =>
        sub?.subjectName.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowSubjectDropdown(true);
  };

  const handleTeacherSearch = (e) => {
    const value = e.target.value;
    setTeacherSearch(value);
    setFilteredTeachers(
      teachers.filter((t) =>
        t.firstName?.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowTeacherDropdown(true);
  };

  const selectSubject = (sub) => {
    const matchSubject = subjects.find(
      (subject) => subject.subjectName.toLowerCase() === sub.toLowerCase()
    );
    if (matchSubject) {
      setFormData({ ...formData, subjectName: matchSubject._id });
    }
    setSubjectSearch(sub);
    setShowSubjectDropdown(false);
  };

  const selectTeacher = (t) => {
    // Find teacher whose full name matches the clicked name
    const matchedTeacher = teachers.find(
      (teacher) =>
        `${teacher.firstName} ${teacher.lastName}`.toLowerCase() ===
        t.toLowerCase()
    );

    if (matchedTeacher) {
      setFormData({
        ...formData,
        teachers: matchedTeacher._id // store teacherId for backend
      });
      setTeacherSearch(
        `${matchedTeacher.firstName} ${matchedTeacher.lastName}`
      ); // show name in input
    }

    setShowTeacherDropdown(false);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subjectRef.current && !subjectRef.current.contains(event.target)) {
        setShowSubjectDropdown(false);
      }
      if (teacherRef.current && !teacherRef.current.contains(event.target)) {
        setShowTeacherDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateRoutine = (e) => {
    handleCreateRoutineHook({ e, formData });
  };

  return (
    <ModalWrapper
      title="Create Routine"
      onClose={onClose}
      onSubmit={(e) => handleCreateRoutine(e)}
      className="space-y-4 overflow-visible"
    >
      {/* Class + Subject */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Class
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 relative" ref={subjectRef}>
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Subject
          </label>
          <input
            type="text"
            value={subjectSearch}
            onChange={handleSubjectSearch}
            placeholder="Search subject"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {showSubjectDropdown && filteredSubjects.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
              {filteredSubjects.map((sub) => (
                <li
                  key={sub._id}
                  onClick={() => selectSubject(sub.subjectName)}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
                >
                  {sub.subjectName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Teacher */}
      <div className="relative" ref={teacherRef}>
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Teacher
        </label>
        <input
          type="text"
          value={teacherSearch}
          onChange={handleTeacherSearch}
          placeholder="Search teacher"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {showTeacherDropdown && filteredTeachers.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
            {filteredTeachers.map((t) => (
              <li
                key={t}
                onClick={() => selectTeacher(`${t.firstName} ${t.lastName}`)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
              >
                {t.firstName} {t.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Day + Date */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Day
          </label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="">Select Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 z-50"
          />
        </div>
      </div>

      {/* Start Time + End Time */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 z-50"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 z-50"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default RoutineModal;
