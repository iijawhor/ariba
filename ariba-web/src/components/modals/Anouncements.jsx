import { useState } from "react";

const AnnouncementModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetUser, setTargetUser] = useState(""); // initially empty so placeholder shows

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, targetUser });
    setTitle("");
    setContent("");
    setTargetUser(""); // reset back to placeholder
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-lg w-11/12 md:w-1/3 p-6 relative shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Publish Announcement
        </h2>
        <button
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2C80FF] text-gray-800"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2C80FF] text-gray-800"
            rows={4}
            required
          />

          {/* Select Target User Dropdown */}
          <select
            value={targetUser}
            onChange={(e) => setTargetUser(e.target.value)}
            className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2C80FF] text-gray-800 ${
              targetUser === "" ? "text-gray-400" : ""
            }`}
            required
          >
            <option value="" disabled hidden>
              Select user type
            </option>
            <option value="all">All Users</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>

          <button
            type="submit"
            className="bg-[#2C80FF] text-white px-4 cursor-pointer py-2 rounded hover:bg-blue-600 transition"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
