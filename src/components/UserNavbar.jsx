import React from "react";
import AplicationIcon from "../assets/rqstIcon.svg";
import HistoryIcon from "../assets/HstryIcon.svg";
import AppointmentIcon from "../assets/rdvIcon.svg";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

const UserNavbar = () => {
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

  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setUserRole] = useState();
  const [loading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [docs, setDocs] = useState(0);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = await getUserRole();
      console.log(data.Role);
      setUserRole((old) => data.Role);
      if (data.Role !== 2) {
        setLoggedIn((loggedin) => false);
        setIsLoading(false);
        navigate("/");
      } else {
        setLoggedIn((loggedin) => true);
        setIsLoading(false);
      }
    };
    checkLoggedIn();
    const userStatus = async () => {
      const data = await getUserStatus();
      console.log("Data user Status : ", data);
      if (data.Stat === 0) {
        setIsVerified((old) => false);
      } else {
        setIsVerified((old) => true);
      }
      if (data.docs !== 1) {
        setDocs((olds) => data.docs);
        if (data.docs === 0) navigate("/donor");
      } else {
        setDocs((olds) => data.docs);
      }
      new Promise((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 500);
      });
    };
    userStatus();
  }, []);

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
  const getUserStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/userStat", {
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
      <div className="flex flex-col gap-4 mt-auto">
        <Link
          to="/donor/appointment"
          className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
        >
          <img className="w-12 h-12" src={AppointmentIcon} alt="" />
        </Link>

        {isVerified && (
          <>
            <Link
              to="/donor/history"
              className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
            >
              <img className="w-12 h-12" src={HistoryIcon} alt="" />
            </Link>
          </>
        )}
        {!isVerified && docs !== 0 && (
          <Link
            to="/donor/application"
            className="h-fit w-fit p-4 rounded-xl bg-white hover:bg-red-100 hover:scale-110 duration-300 hover:border-red border border-transparent cursor-pointer"
          >
            <img className="w-12 h-12" src={AplicationIcon} alt="" />
          </Link>
        )}
      </div>
      {/* LogOut and Settings */}
      <div className="mt-auto flex gap-2">
        <div
          className="h-fit w-fit p-4 rounded-xl text-white bg-red hover:scale-110 duration-300 border-red border  cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
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
