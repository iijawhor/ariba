import React from "react";

const ViewRoutineModal = ({ onClose, filters, routines }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 z-50 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#2C80FF]">
            Routine — {filters.date}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-lg"
          >
            &times;
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-gray-800">
            <thead className="bg-[#EEF4FF] text-gray-700">
              <tr>
                <th className="text-left px-4 py-2 border-b">Class</th>
                <th className="text-left px-4 py-2 border-b">Teacher</th>
                <th className="text-left px-4 py-2 border-b">Subject</th>
                <th className="text-left px-4 py-2 border-b">Day</th>
                <th className="text-left px-4 py-2 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {routines.length > 0 ? (
                routines.map((r, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 border-b">{r.grade.className}</td>
                    {r.teachers.map((t, idx) => (
                      <td key={idx} className="px-4 py-2 border-b">
                        {t.firstName}
                      </td>
                    ))}
                    <td className="px-4 py-2 border-b">
                      {r.subject.subjectName}
                    </td>
                    <td className="px-4 py-2 border-b">{r.day}</td>
                    <td className="px-4 py-2 border-b">
                      {r.startTime} - {r.endTime}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No routines found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewRoutineModal;
