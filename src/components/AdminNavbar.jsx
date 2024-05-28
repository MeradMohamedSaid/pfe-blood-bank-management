import React from "react";
import AplicationIcon from "../assets/rqstIcon.svg";
import HistoryIcon from "../assets/HstryIcon.svg";
import AppointmentIcon from "../assets/rdvIcon.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const AdminNavbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setUserRole] = useState();
  const [loading, setIsLoading] = useState(true);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const logout = async () => {
    axios
      .post("http://localhost:3000/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = await getUserRole();
      console.log("userRole :", data.Role);
      setUserRole((old) => data.Role);
      if (data.Role !== 1) {
        setLoggedIn((loggedin) => false);
        setIsLoading(false);
        navigate("/");
      } else {
        setLoggedIn((loggedin) => true);
        setIsLoading(false);
      }
    };
    checkLoggedIn();
  });

  const getUserRole = async () => {
    try {
      const response = await axios.get("http://localhost:3000/userRole", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Failed to fetch user role data");
      }

      console.log("User role data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user role data:", error.message);
      throw error;
    }
  };
  const navigate = useNavigate();

  return (
    <div className="fade-in-left-to-right fixed flex flex-col  justify-center items-center top-0 border-r border-transparent shadow-xl h-full left-0 p-4 z-10">
      {/* Links */}
      <div className="flex flex-col gap-2 ">
        <Link
          to="/admin/dashboard"
          className="h-fit w-fit w-full text-red gap-4 flex items-center p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <Squares2X2Icon className="w-6" />
          Dashboard
        </Link>

        <Link
          to="/admin/centers-dashboard"
          className="h-fit w-fit w-full text-red gap-4 flex items-center p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <BuildingOffice2Icon className="w-6" />
          Centers
        </Link>
        <Link
          to="/admin/users-dashboard"
          className="h-fit w-fit w-full text-red gap-4 flex items-center p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <UsersIcon className="w-6" />
          Users
        </Link>
        {/* <Link className="h-fit w-fit w-full text-red gap-4 flex items-center p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer">
          <Cog6ToothIcon className="w-6" />
          Settings
        </Link> */}
        <Link
          className="h-fit w-fit w-full bg-red text-white gap-4 flex items-center p-4 rounded-xl hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          <ArrowLeftStartOnRectangleIcon className="w-6" />
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
