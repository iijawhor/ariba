import React from "react";

const Card = ({
  style,
  present,
  percentage,
  title,
  totalUsers,
  totalUserStyle
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition p-4 md:p-5 flex flex-col justify-between">
      {/* Title */}
      {title && (
        <h2 className="text-sm md:text-base font-semibold text-[#2C80FF] uppercase mb-3">
          {title}
        </h2>
      )}

      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        {/* Left Info */}
        <div className="flex flex-col gap-2">
          {totalUsers && (
            <p
              className={`${
                totalUserStyle || "text-sm"
              } text-gray-600 font-medium`}
            >
              Total {title}:{" "}
              <span className="text-blue-600 font-bold ml-1">{totalUsers}</span>
            </p>
          )}
          {present && (
            <p
              className={`${
                totalUserStyle || "text-sm"
              } text-gray-600 font-medium`}
            >
              Was Present:{" "}
              <span className="text-blue-600 font-bold ml-1">
                {present || 0}
              </span>
            </p>
          )}
        </div>

        {/* Right Circle / Percentage */}
        {percentage !== undefined && (
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-4 border-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg md:text-xl font-bold">
                {percentage}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Optional extra content area */}
      {style && <div className={`${style} mt-3`}></div>}
    </div>
  );
};

export default Card;
