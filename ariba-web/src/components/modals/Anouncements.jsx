import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../../utils/socket.js";
const AnnouncementModal = ({ isOpen, onClose, setAnnouncement }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    targetUser: ""
  });
  const token = useSelector((state) => state.user.accessToken);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!isOpen) return;

    const socket = createSocketConnection(token);
    socket.on("announcementReceived", ({ title, content, targetUser }) => {
      setAnnouncement((prev) => {
        // Avoid duplicates (optional)
        const exists = prev.some(
          (a) => a.title === title && a.content === content
        );
        if (exists) return prev;

        const newAnnouncement = {
          title,
          content,
          targetUser,
          timestamp: new Date().toISOString()
        };

        // Newest first
        return [newAnnouncement, ...prev];
      });
    });

    // Save socket instance to a ref so handleSubmit can use it
    window.currentSocket = socket;

    return () => {
      socket.disconnect();
    };
  }, [isOpen, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = window.currentSocket;
    if (!socket) return;

    socket.emit("joinAnnouncements", {
      title: formData.title,
      content: formData.content,
      targetUser: formData.targetUser
    });

    setFormData({ title: "", content: "", targetUser: "" });
    // onClose();
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
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2C80FF] text-gray-800"
            required
          />

          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2C80FF] text-gray-800"
            rows={4}
            required
          />

          <select
            name="targetUser"
            value={formData.targetUser}
            onChange={handleChange}
            className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2C80FF] text-gray-800 ${
              formData.targetUser === "" ? "text-gray-400" : ""
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
