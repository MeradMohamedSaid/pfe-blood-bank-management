import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
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

        <h1
          className={
            i18n.language === "ar"
              ? "text-5xl mb-8 text-center  text-arabic"
              : "text-5xl mb-8 text-center  text-latin"
          }
        >
          Create Your Account
        </h1>
        {steps === 1 ? (
          <div className="w-[26rem]">
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <EnvelopeIcon className="w-6" />
              <input
                class="outline-none w-full"
                type="text"
                placeholder="name@example.com"
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Password"
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
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Confirm Password"
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
        ) : steps === 2 ? (
          <div className="w-[26rem]">
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <EnvelopeIcon className="w-6" />
              <input
                class="outline-none w-full"
                type="text"
                placeholder="name@example.com"
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Password"
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
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Confirm Password"
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
        ) : steps === 3 ? (
          <div className="w-[26rem]">
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <EnvelopeIcon className="w-6" />
              <input
                class="outline-none w-full"
                type="text"
                placeholder="name@example.com"
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Password"
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
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Confirm Password"
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
        ) : (
          <div className="w-[26rem]">
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <EnvelopeIcon className="w-6" />
              <input
                class="outline-none w-full"
                type="text"
                placeholder="name@example.com"
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Password"
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
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Confirm Password"
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
        )}
        {/* Continue Button */}
        {steps === 1 ? (
          <button
            onClick={() => {
              if (steps < 5) {
                setSteps(steps + 1);
              }
            }}
            className={
              i18n.language === "ar"
                ? "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
                : "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin"
            }
          >
            <h1>Continue</h1>
          </button>
        ) : (
          <div className="min-w-[26rem] grid grid-cols-6 gap-2 grid-rows-1">
            <button
              onClick={() => {
                if (steps > 1) {
                  setSteps(steps - 1);
                }
              }}
              className="bg-transparent text-red flex justify-center items-center border border-red rounded-lg hover:bg-red hover:text-white duration-300"
            >
              <ArrowLeftIcon className="w-6" />
            </button>
            <button
              onClick={() => {
                if (steps < 4) {
                  setSteps(steps + 1);
                  console.log(steps);
                }
              }}
              className={
                i18n.language === "ar"
                  ? "col-span-5 bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
                  : "col-span-5 bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin"
              }
            >
              <h1>Continue</h1>
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Login;
