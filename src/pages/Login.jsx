import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import loginDrop from "../assets/loginDrop.png";
const Login = () => {
  const [pwVisible, setPwVisible] = useState("false");
  const { t, i18n } = useTranslation();
  return (
    <div className="container w-fit pt-20">
      <div className="flex flex-col justify-center items-center">
        <img className="fixed top-[19rem] -z-50" src={loginDrop} alt="" />
        <p>Donators</p>
        <h1 className="text-4xl mb-8 text-center">
          We've Been Waiting <br /> For You
        </h1>
        {/* Input Field */}
        <div className="w-full">
          <p className="text-sm mb-2">E-mail :</p>
          <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
            <EnvelopeIcon className="w-6" />
            <input
              class="outline-none w-full"
              type="text"
              placeholder="name@example.com"
            />
          </div>
          <p className="text-sm mb-2">Password :</p>
          <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
            <LockClosedIcon className="w-6" />
            <input
              type={!pwVisible ? "text" : "Password"}
              class="outline-none w-full"
            />
            {pwVisible ? (
              <EyeIcon
                onClick={() => {
                  setPwVisible(false);
                }}
                className="w-6 cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                onClick={() => {
                  setPwVisible(true);
                }}
                className="w-6 cursor-pointer"
              />
            )}
          </div>
        </div>
        <h1 className="bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer">
          Login
        </h1>
        <p className="text-red underline mt-2 text-sm cursor-pointer">
          Not a donor yet?
        </p>
      </div>
    </div>
  );
};

export default Login;
