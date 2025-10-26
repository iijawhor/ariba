// src/components/InfoCard.jsx
import React, { useState } from "react";

const InfoCard = ({
  title,
  items = [],
  color = "#2C80FF",
  displayKey = "firstName"
}) => {
  const [search, setSearch] = useState("");

  // Filter items based on the dynamic displayKey
  const filteredItems = items.filter((item) => {
    const value = item?.[displayKey];
    return value?.toString().toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
      {/* Title + Search */}
      <div className="flex justify-between items-center mb-3 gap-2">
        <h2 className="text-lg font-semibold" style={{ color }}>
          {title}
        </h2>
        {items.length > 0 && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm w-32"
          />
        )}
      </div>

      {/* Items */}
      {filteredItems.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto py-1 custom-scrollbar">
          {filteredItems.map((item, index) => (
            <span
              key={index}
              className="flex-shrink-0 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-100 transition-colors"
            >
              {item?.[displayKey]} {item?.lastName && item.lastName}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">No data found</p>
      )}
    </div>
  );
};

export default InfoCard;
