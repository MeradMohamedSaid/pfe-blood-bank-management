import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import loginDrop from "../assets/loginDrop.png";
import { AppLayout } from "../components/AppLayout";
const Login = () => {
  const [steps, setSteps] = useState(1);
  const [pwVisible, setPwVisible] = useState("false");
  const { t, i18n } = useTranslation();
  return (
    <AppLayout>
      <div className="container w-fit pt-20 flex justify-center items-center flex-col">
        <img className="fixed top-[19rem] -z-50" src={loginDrop} alt="" />
        {/* Steps Tracker */}
        <div className="mb-4 flex justify-center items-center">
          {/* Step 1 */}
          <div className="bg-red text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center">
            <p>1</p>
          </div>
          <div
            className={steps > 1 ? "h-1 bg-red w-20" : "h-1 bg-slate-200 w-20"}
          ></div>
          {/* Step 2 */}
          <div
            className={
              steps > 1
                ? "bg-red text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center"
                : "bg-slate-200 text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center"
            }
          >
            <p>2</p>
          </div>
          <div
            className={steps > 2 ? "h-1 bg-red w-20" : "h-1 bg-slate-200 w-20"}
          ></div>
          {/* Step 3 */}
          <div
            className={
              steps > 2
                ? "bg-red text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center"
                : "bg-slate-200 text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center"
            }
          >
            <p>3</p>
          </div>
          <div
            className={steps > 3 ? "h-1 bg-red w-20" : "h-1 bg-slate-200 w-20"}
          ></div>
          {/* Step 4 */}
          <div
            className={
              steps > 3
                ? "bg-red text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center"
                : "bg-slate-200 text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center"
            }
          >
            <p>4</p>
          </div>
        </div>
        
        {/* Continue Button */}
        <button
          className={
            i18n.language === "ar"
              ? "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
              : "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin"
          }
        >
          <h1>Continue</h1>
        </button>
      </div>
    </AppLayout>
  );
};

export default Login;
