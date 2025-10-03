import React, { useState } from "react";

const Regularization = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 max-w-xs md:max-w-[220px]">
      {/* Button to open drawer */}
      <button
        className="w-full bg-[#2C80FF] text-white text-xs md:text-sm font-sans rounded-lg py-1.5 px-4 shadow hover:bg-blue-600 transition"
        onClick={() => setIsOpen(true)}
      >
        Regularization Requests
      </button>

      {/* Blurred Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="bg-[#2C80FF] text-white text-sm md:text-base font-sans font-semibold p-4 flex justify-between items-center">
          <span>Regularization Requests</span>
          <button
            className="text-white font-bold text-lg leading-none hover:text-gray-200 transition"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-gray-800 text-xs md:text-sm font-sans flex-1 overflow-auto">
          <p>
            Manage your regularization requests here. Press the close button or
            click outside to dismiss.
          </p>
          {/* Add form elements here */}
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end gap-2 border-t border-gray-200">
          <button
            className="bg-gray-200 text-gray-800 text-xs md:text-sm rounded-lg px-3 py-1 hover:bg-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button className="bg-[#2C80FF] text-white text-xs md:text-sm rounded-lg px-3 py-1 hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Regularization;
