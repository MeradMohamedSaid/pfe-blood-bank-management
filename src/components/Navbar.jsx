import React, { useState } from "react";
import logo from "../assets/logo.png";
import arIcon from "../assets/arIcon.png";
import frIcon from "../assets/frIcon.png";
import enIcon from "../assets/enIcon.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [lang, setLang] = useState("en");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    setShowDropdown(false);
  };

  return (
    <div className="container flex items-center justify-between">
      {/* Nav Bar */}
      <div className="flex justify-center items-center w-fit py-4">
        <img className="w-16" src={logo} alt="LifeFlow Logo" />
        <h1 className="text-3xl font-bold">LifeFlow</h1>
      </div>
      {/* Language Switcher */}
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
          <div className="absolute top-10 right-0 bg-white border border-slate-100 rounded-full">
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
  );
};

export default Navbar;
