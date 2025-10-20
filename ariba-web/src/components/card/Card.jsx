import React from "react";

const Card = ({
  style,
  title = "Attendance",
  totalUsers = 0,
  present = 0,
  percentage = 0
}) => {
  // Calculate absent count
  const absent = totalUsers - present;

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition p-4 md:p-5 flex flex-col justify-between">
      {/* Title */}
      {title && (
        <h2 className="text-sm md:text-base font-semibold text-[#2C80FF] uppercase mb-4">
          {title}
        </h2>
      )}

      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left Info */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600 font-medium">
            Total Users:{" "}
            <span className="text-blue-600 font-bold">{totalUsers}</span>
          </p>
          <p className="text-sm text-gray-600 font-medium">
            Present: <span className="text-green-600 font-bold">{present}</span>
          </p>
          <p className="text-sm text-gray-600 font-medium">
            Absent: <span className="text-red-600 font-bold">{absent}</span>
          </p>
        </div>

        {/* Right Circle / Percentage */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-4 border-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-lg md:text-xl font-bold">
              {Number(percentage || 0).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Optional extra content area */}
      {style && <div className={`${style} mt-3`}></div>}
    </div>
  );
};

export default Card;
