import { useState } from "react";
import { ModalWrapper } from "../../allFiles";
import { useAcademic } from "../../hooks/useAcademic.js";

const ClassModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    capacity: ""
  });
  const classes = ["V", "VI", "VII", "VIII", "IX", "X"];
  const sections = ["A", "B", "C", "D"];
  const { handleCreateGradeHook } = useAcademic();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCreateGrade = (e) => {
    handleCreateGradeHook({ e, formData });
  };

  return (
    <ModalWrapper
      title="Create Class / Batch"
      onClose={onClose}
      onSubmit={(e) => handleCreateGrade(e)}
      className="space-y-4"
    >
      <div className="space-y-1">
        <label className="block text-sm text-gray-700 font-medium">Class</label>
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

      <div className="space-y-1">
        <label className="block text-sm text-gray-700 font-medium">
          Section
        </label>
        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm text-gray-700 font-medium">
          Capacity
        </label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Number of students"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </ModalWrapper>
  );
};

export default ClassModal;
