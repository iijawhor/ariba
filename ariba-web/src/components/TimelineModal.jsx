import { useDispatch, useSelector } from "react-redux";
import { addTimeline } from "../store/slices/userSlice.js";
import { useState } from "react";
const TimelineModal = ({ id, setTimelineModal }) => {
  const [timelineData, setTimelineData] = useState({
    title: "",
    eventDate: "",
    event: ""
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setTimelineData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addTimelineApi = `http://localhost:7000/api/v1/user/add-timeline`;
  const dispatch = useDispatch();
  const handleAddTimeline = (e) => {
    e.preventDefault();
    dispatch(addTimeline({ id: id, addTimelineApi, timeline: timelineData }));
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        <h1 className="font-[sans-serif] text-sm tracking-wide w-full text-center font-semibold">
          Add Timeline
        </h1>
        <button
          onClick={() => setTimelineModal((prev) => !prev)}
          className="cursor-pointer h-fit w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20"
            height="20"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="20" fill="url(#grad)" />
            <path
              d="M16 16l16 16M16 32L32 16"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div>
        <form
          action=""
          onSubmit={handleAddTimeline}
          className="w-full flex flex-col gap-1"
        >
          <input
            type="text"
            name="title"
            onChange={(e) => onHandleChange(e)}
            value={timelineData.title}
            className="border-gray-200 border p-2 rounded-sm w-full text-xs font-[sans-serif] outline-none"
            required
            placeholder="Timeline Title eg: Enrollment"
          />
          <input
            type="text"
            name="event"
            onChange={(e) => onHandleChange(e)}
            value={timelineData.event}
            className="border-gray-200 border p-2 rounded-sm w-full text-xs font-[sans-serif] outline-none"
            required
            placeholder="Timeline Event : eg - Enrolled on"
          />
          <input
            type="date"
            name="eventDate"
            onChange={(e) => onHandleChange(e)}
            value={timelineData.eventDate}
            required
            className="border-gray-200 border p-2 rounded-sm w-full text-xs font-[sans-serif] outline-none"
          />
          <button
            type="submit"
            className=" hover:border-none hover:bg-[#2C80FF] hover:text-white p-1 rounded-sm border border-gray-200 cursor-pointer font-[sans-serif] text-sm tracking-wide text-[#2C80FF]"
          >
            Add Timeline
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimelineModal;
