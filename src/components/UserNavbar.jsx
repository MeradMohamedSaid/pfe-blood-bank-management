import React from "react";
import AplicationIcon from "../assets/rqstIcon.svg";
import HistoryIcon from "../assets/HstryIcon.svg";
import AppointmentIcon from "../assets/rdvIcon.svg";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const UserNavbar = () => {
  return (
    <div className="fade-in-left-to-right fixed flex flex-col  justify-center items-center top-0 border-r border-transparent shadow-xl h-full left-0 p-4 z-10">
      {/* Links */}
      <div className="flex flex-col gap-4 mt-auto">
        <Link to="/donor/appointment" className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer">
          <img className="w-12 h-12" src={AppointmentIcon} alt="" />
        </Link>
        <Link to="/donor/history" className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer">
          <img className="w-12 h-12" src={HistoryIcon} alt="" />
        </Link>
        <Link
          to="/donor/application"
          className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <img className="w-12 h-12" src={AplicationIcon} alt="" />
        </Link>
      </div>
      {/* LogOut and Settings */}
      <div className="mt-auto flex gap-2">
        <div className="h-fit w-fit p-4 rounded-xl text-white bg-red hover:scale-110 duration-300 border-red border  cursor-pointer">
          <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
        </div>
        <div className="h-fit w-fit p-4 rounded-xl bg-white text-red hover:text-white hover:bg-red hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer">
          <Cog6ToothIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
