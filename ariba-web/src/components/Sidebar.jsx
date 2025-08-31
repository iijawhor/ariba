import { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = ({ sidebar, setActiveMenu }) => {
  const [isSidebarNameActive, setIsSidebarNameActive] = useState(true);
  return (
    <div className=" pt-5 pb-5  h-full w-15 md:w-full relative bg-[#2C80FF] rounded-sm md:rounded-lg">
      <div>
        <button></button>
      </div>
      <div className="flex mb-5 w-full justify-center">
        <Link to="/" className="flex">
          <img
            className=" h-6 w-15 md:w-20"
            src="../logo/image.png"
            alt=""
            srcSet=""
          />
        </Link>
      </div>
      <ul className="flex gap-4 flex-col text-center items-center md:items-start">
        {sidebar.map((sidebar, index) => (
          <Link
            onClick={() => setActiveMenu(sidebar.name)}
            key={index}
            to={sidebar.to}
            className="text-white group relative justify-center md:justify-start  flex w-full  gap-2 items-center  md:pl-5 capitalize tracking-wider text-sm p-1 font-[sans-serif]"
          >
            {sidebar.icon}
            <span className="hidden md:inline">
              {isSidebarNameActive && <> {sidebar.name}</>}
            </span>
          </Link>
        ))}
      </ul>
      <div className="absolute bg-[#2a89ff] hidden md:inline border border-[#67acffff]   rounded-lg h-fit w-30 bottom-15 p-2 flex flex-col items-center gap-1 lg:left-10 left-1">
        <div className=" flex justify-center">
          <img className="h-20" src="../logo/logo1.webp" alt="" />
        </div>
        <div className="text-center flex flex-col items-center relative bottom-3 gap-1">
          <p className="font-[sans-serif] text-xs tracking-white text-white">
            Make a Admin
          </p>
          <button className="font-[sans-serif] text-xs font-semibold cursor-pointer text-[#2C80FF] tracking-wider border-white border bg-white p-1 w-fit rounded-xl">
            Admin +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
