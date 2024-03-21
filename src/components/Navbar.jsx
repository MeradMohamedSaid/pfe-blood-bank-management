import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="container">
      {/* Nav Bar */}
      <div className="flex justify-center items-center w-fit py-4">
        <img className="w-16" src={logo} alt="LifeFlow Logo" />
        <h1 className="text-3xl font-bold">LifeFlow</h1>
      </div>
      {/* Links */}
      <div>
        <Link to=""></Link>
        <Link to=""></Link>
        <Link to=""></Link>
      </div>
    </div>
  );
};

export default Navbar;
