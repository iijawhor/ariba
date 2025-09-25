import { useState, useEffect } from "react";
export const LiveClock = ({
  parentClass,
  dateClass = "text-black font-bold font-[sans-serif] text-xs tracking-wider",
  timeClass = "text-[#2C80FF] font-[sans-serif] tracking-wider font-bold text-md "
}) => {
  const [currentTimeAndDate, setCurrentTimeAndDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeAndDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTimeAndDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const formattedDate = currentTimeAndDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

  return (
    <p className="flex flex-col gap-1 items-center">
      <span className={`${timeClass}border border-blue-200 p-1 rounded-sm`}>
        {formattedTime}
      </span>
      <span className="lowercase text-xs font-semibold tracking-wide text-gray-600">
        {formattedDate}
      </span>
    </p>
  );
};
