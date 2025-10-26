import React, { useState, useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

const AssignSubjectModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    subject: "",
    teacher: "",
    className: ""
  });

  const classes = ["V", "VI", "VII", "VIII", "IX", "X"];
  const subjects = ["Math", "Science", "English", "Bengali", "Computer"];
  const teachers = ["Mr. Sharma", "Ms. Rani", "Mr. Ali", "Ms. Sen", "Mr. Das"];

  const [subjectSearch, setSubjectSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);

  const wrapperRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubjectSearch = (e) => {
    const value = e.target.value;
    setSubjectSearch(value);
    setFilteredSubjects(
      subjects.filter((sub) => sub.toLowerCase().includes(value.toLowerCase()))
    );
    setShowSubjectDropdown(true);
  };

  const handleTeacherSearch = (e) => {
    const value = e.target.value;
    setTeacherSearch(value);
    setFilteredTeachers(
      teachers.filter((t) => t.toLowerCase().includes(value.toLowerCase()))
    );
    setShowTeacherDropdown(true);
  };

  const selectSubject = (sub) => {
    setFormData({ ...formData, subject: sub });
    setSubjectSearch(sub);
    setShowSubjectDropdown(false);
  };

  const selectTeacher = (t) => {
    setFormData({ ...formData, teacher: t });
    setTeacherSearch(t);
    setShowTeacherDropdown(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSubjectDropdown(false);
        setShowTeacherDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalWrapper
      title="Assign Subject"
      onClose={onClose}
      onSubmit={() => console.log("clicked")}
      className="space-y-4"
    >
      {/* Class */}
      <div>
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Class
        </label>
        <select
          name="className"
          value={formData.className}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Subject (searchable) */}
      <div className="relative" ref={wrapperRef}>
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
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
            {filteredSubjects.map((sub) => (
              <li
                key={sub}
                onClick={() => selectSubject(sub)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
              >
                {sub}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Teacher (searchable) */}
      <div className="relative" ref={wrapperRef}>
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
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
            {filteredTeachers.map((t) => (
              <li
                key={t}
                onClick={() => selectTeacher(t)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ModalWrapper>
  );
};

export default AssignSubjectModal;
