import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, setActiveMenu }) => {
  const [isSidebarNameActive, setIsSidebarNameActive] = useState(true);

  return (
    <div
      className="
        pt-5 pb-5
        h-full
        w-[40px] sm:w-[40px] md:w-full
        bg-[#2C80FF]
        rounded-sm md:rounded-lg
        fixed sm:relative top-0 left-0 z-50
        overflow-y-auto
        flex flex-col
        items-center md:items-start
        px-[1px] sm:px-[1px] md:px-3
      "
    >
      {/* Logo */}
      <div className="flex mb-5 w-full justify-center md:justify-start">
        <Link to="/" className="flex items-center">
          <img
            className="h-6 w-6 sm:w-6 md:w-20"
            src="../logo/image.png"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Sidebar Links */}
      <ul className="flex gap-4 flex-col text-center md:text-left w-full">
        {sidebar.map((item, index) => (
          <Link
            onClick={() => setActiveMenu(item.name)}
            key={index}
            to={item.to}
            className="
              text-white
              group
              relative
              flex
              w-full
              gap-2
              items-center
              md:pl-5
              capitalize
              tracking-wider
              text-sm
              p-1
              font-[sans-serif]
              hover:bg-blue-600
              rounded
              transition
              justify-center md:justify-start
            "
          >
            {item.icon}
            {/* Sidebar name hidden on small screens */}
            <span className="hidden md:inline">
              {isSidebarNameActive && item.name}
            </span>
          </Link>
        ))}
      </ul>

      {/* Admin Section (md+) */}
      <div className="absolute bg-[#2a89ff] hidden md:flex border border-[#67acffff] rounded-lg h-fit w-30 bottom-15 p-2 flex flex-col items-center gap-1 lg:left-10 left-1">
        <div className="flex justify-center">
          <img className="h-20" src="../logo/logo1.webp" alt="Admin Logo" />
        </div>
        <div className="text-center flex flex-col items-center relative bottom-3 gap-1">
          <p className="font-[sans-serif] text-xs text-white">Make a Admin</p>
          <button className="font-[sans-serif] text-xs font-semibold cursor-pointer text-[#2C80FF] tracking-wider border-white border bg-white p-1 w-fit rounded-xl">
            Admin +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
