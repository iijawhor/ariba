import { useDispatch, useSelector } from "react-redux";
import { addTimeline } from "../store/slices/userSlice.js";
import { useState } from "react";
const TimelineModal = ({ id, setTimelineModal }) => {
  const [timelineData, setTimelineData] = useState({
    title: "",
    eventDate: "",
    event: ""
  });
  const inputs = [
    {
      name: "title",
      type: "text",
      placeholder: "Timeline Title eg: Enrollment",
      required: true
    },
    {
      name: "event",
      type: "text",
      placeholder: "Timeline Event : eg - Enrolled on",
      required: true
    },
    {
      name: "eventDate",
      type: "date",
      required: true
    }
  ];
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
          onSubmit={handleAddTimeline}
          className="w-full flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          {inputs.map(({ name, type, placeholder, required }) => (
            <input
              key={name}
              name={name}
              type={type}
              onChange={onHandleChange}
              value={timelineData[name]}
              placeholder={placeholder}
              required={required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-sans text-gray-800 outline-none focus:ring-2 focus:ring-[#2C80FF] focus:border-[#2C80FF] transition"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-white cursor-pointer border border-[#2C80FF] text-[#2C80FF] hover:bg-[#2C80FF] hover:text-white transition font-sans text-sm py-2 rounded-md tracking-wide"
          >
            Add Timeline
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimelineModal;
