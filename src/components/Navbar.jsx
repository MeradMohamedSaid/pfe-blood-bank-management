import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import arIcon from "../assets/arIcon.png";
import frIcon from "../assets/frIcon.png";
import enIcon from "../assets/enIcon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import axios from "axios";

const Navbar = ({ loggedIn, role }) => {
  const [lang, setLang] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    window.location.reload();
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
  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto flex items-center justify-between">
      {/* Nav Bar */}
      <Link to="/">
        <div className="flex justify-center items-center w-fit py-4">
          <img className="w-16" src={logo} alt="LifeFlow Logo" />
          <h1 className="text-3xl font-bold">LifeFlow</h1>
        </div>
      </Link>
      <div className="flex justify-center items-center gap-4">
        {/* Buttons */}
        {!loggedIn && (
          <div className="flex justify-center items-center gap-2">
            <Link
              to="/login"
              className={
                i18n.language === "ar"
                  ? "rounded-full border hover:bg-red hover:text-white duration-300 py-2 px-4 text-red border-red text-arabic"
                  : "rounded-full border hover:bg-red hover:text-white duration-300 py-2 px-4 text-red border-red text-latin"
              }
            >
              {t("navbar.logIn")}
            </Link>
            <Link
              to="/signup"
              className={
                i18n.language === "ar"
                  ? "rounded-full border hover:border-red py-2 px-4 bg-red text-white border-red hover:bg-opacity-70 duration-700 text-arabic"
                  : "rounded-full border hover:border-red py-2 px-4 bg-red text-white border-red hover:bg-opacity-70 duration-700 text-latin"
              }
            >
              {t("navbar.signUp")}
            </Link>
          </div>
        )}

        <div className="grid  grid-cols-4 gap-2">
          {/* Icons */}
          {loggedIn && (
            <>
              <Link
                to={
                  role === 1
                    ? "/admin"
                    : role === 2
                    ? "/donor"
                    : role === 3
                    ? "/clinic"
                    : "/bloodcenter"
                }
              >
                <UserIcon className="hover:text-red text-gray-400 duration-300 cursor-pointer" />
              </Link>
              {role === 4 && (
                <Link onClick={() => handleLogout()}>
                  <ArrowLeftStartOnRectangleIcon className=" text-red hover:text-opacity-50 duration-300 cursor-pointer" />
                </Link>
              )}
            </>
          )}

          <MagnifyingGlassIcon className="hover:text-red text-gray-400 duration-300 cursor-pointer" />
          <div className="relative">
            <div
              className="w-8 border cursor-pointer border-slate-100 border rounded-full overflow-hidden hover:border-[#F0073B] duration-300"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={lang === "en" ? enIcon : lang === "ar" ? arIcon : frIcon}
                alt=""
              />
            </div>
            {showDropdown && (
              <div className="absolute top-10 -left-1 bg-white border border-slate-100 rounded-full">
                <ul>
                  <li
                    className="w-6 m-2 border cursor-pointer border-slate-100 border rounded-full overflow-hidden hover:border-[#F0073B] duration-300"
                    onClick={() => handleLanguageChange("en")}
                  >
                    <img src={enIcon} alt="English" />
                  </li>
                  <li
                    className="w-6 m-2 border cursor-pointer border-slate-100 border rounded-full overflow-hidden hover:border-[#F0073B] duration-300"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    <img src={arIcon} alt="Arabic" />
                  </li>
                  <li
                    className="w-6 m-2 border cursor-pointer border-slate-100 border rounded-full overflow-hidden hover:border-[#F0073B] duration-300"
                    onClick={() => handleLanguageChange("fr")}
                  >
                    <img src={frIcon} alt="French" />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
