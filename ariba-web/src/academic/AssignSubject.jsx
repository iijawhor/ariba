import React from "react";

const AssignSubjectModal = ({ onClose }) => {
  return (
    <dialog className="modal w-full max-w-md rounded-lg shadow-lg p-0">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-[#2C80FF] text-white px-4 py-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Assign Subject to Class</h3>
          <button className="text-white font-bold text-xl" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <select className="border p-2 rounded-md w-full outline-none">
            <option>Select Class</option>
            <option>Class 1</option>
            <option>Class 2</option>
          </select>

          <select className="border p-2 rounded-md w-full outline-none">
            <option>Select Subject</option>
            <option>Mathematics</option>
            <option>Science</option>
          </select>
        </div>

        <div className="p-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-[#2C80FF] text-white hover:bg-blue-600">
            Assign
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AssignSubjectModal;
