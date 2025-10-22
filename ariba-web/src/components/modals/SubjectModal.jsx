import React, { useState, useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { useAcademic } from "../../hooks/useAcademic.js";

const SubjectModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: ""
  });

  const subjects = [
    "Bengali",
    "English",
    "Mathematics",
    "Physical Science",
    "Life Science",
    "Social Science",
    "Computer Science",
    "Nutrition",
    "Geography",
    "History",
    "Philosophy",
    "Physical Education",
    "Arabic",
    "Islamic Studies",
    "Political Science",
    "Modern Computer Application",
    "Economics",
    "Sociology",
    "Work Education",
    "Accountancy",
    "Business Organisation and Management",
    "Islamic History",
    "Psychology",
    "Arts"
  ];

  const [search, setSearch] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredSubjects(
      subjects.filter((sub) => sub.toLowerCase().includes(value.toLowerCase()))
    );
    setShowDropdown(true);
  };

  const handleSelectSubject = (sub) => {
    setFormData({ ...formData, subjectName: sub });
    setSearch(sub);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const { handleCreateSubjectHook } = useAcademic();

  const handleCreateSubject = (e) => {
    handleCreateSubjectHook({ e, formData });
  };
  return (
    <ModalWrapper
      title="Create Subject"
      onClose={onClose}
      onSubmit={(e) => handleCreateSubject(e)}
      className="space-y-4"
    >
      {/* Subject Name */}
      <div className="space-y-1 relative" ref={dropdownRef}>
        <label className="block text-sm text-gray-700 font-medium">
          Subject Name
        </label>
        <input
          type="text"
          name="subjectName"
          value={search}
          onChange={handleSearch}
          placeholder="Search subject"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={() => setShowDropdown(true)}
        />
        {showDropdown && filteredSubjects.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-auto shadow-lg">
            {filteredSubjects.map((sub) => (
              <li
                key={sub}
                onClick={() => handleSelectSubject(sub)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
              >
                {sub}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Subject Code */}
      <div className="space-y-1">
        <label className="block text-sm text-gray-700 font-medium">
          Subject Code
        </label>
        <input
          type="text"
          name="subjectCode"
          value={formData.subjectCode}
          onChange={handleChange}
          placeholder="Enter subject code (e.g., MATH101)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </ModalWrapper>
  );
};

export default SubjectModal;
