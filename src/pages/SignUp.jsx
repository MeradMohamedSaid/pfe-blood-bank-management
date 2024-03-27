import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import loginDrop from "../assets/loginDrop.png";
import { AppLayout } from "../components/AppLayout";
import donorIllu from "../assets/donor.png";
import medicalcenterIllu from "../assets/medicalcenter.png";
const Login = () => {
  const [steps, setSteps] = useState(1);
  const [pwVisible, setPwVisible] = useState("false");
  const [userGender, setUserGender] = useState("");
  const [userType, setUserType] = useState("");
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

        {steps === 1 ? (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            Create Your Account
          </h1>
        ) : steps === 2 ? (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            Enter Your Personal Informations
          </h1>
        ) : steps === 3 ? (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            Select Your Role
          </h1>
        ) : (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            Create Your Account
          </h1>
        )}
        {steps === 1 ? (
          <div className="w-[26rem] fade-in-up">
            {/* -------------------- Step 1 -------------------- */}
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
          <div className="w-[26rem] fade-in-up">
            {/* -------------------- Step 2 -------------------- */}
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4 ">
              <IdentificationIcon className="w-6" />
              <input
                class="outline-none w-full"
                type="text"
                placeholder="Name"
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <PhoneIcon className="w-6" />
              <input
                placeholder="Phone Number"
                type="number"
                class="outline-none w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => {
                  setUserGender("m");
                }}
                className={
                  userGender === "m"
                    ? "p-4 rounded-xl flex justify-center items-center gap-2 w-full border border-red bg-red h-fit text-white duration-300 cursor-not-allowed"
                    : "bg-white p-4 rounded-xl h-fit flex justify-center items-center gap-2 w-full border border-red text-red mb-4 hover:bg-red cursor-pointer hover:text-white duration-300"
                }
              >
                <p>Male</p>
              </div>
              <div
                onClick={() => {
                  setUserGender("f");
                }}
                className={
                  userGender === "f"
                    ? "p-4 rounded-xl flex justify-center items-center gap-2 w-full border border-red bg-red h-fit text-white duration-300 cursor-not-allowed"
                    : "bg-white p-4 rounded-xl h-fit flex justify-center items-center gap-2 w-full border border-red text-red mb-4 hover:bg-red cursor-pointer hover:text-white duration-300"
                }
              >
                <p>Female</p>
              </div>
            </div>
          </div>
        ) : steps === 3 ? (
          <div className="w-[40rem]">
            {/* -------------------- Step 3 -------------------- */}
            <div className="grid grid-cols-2 gap-8 mb-8 fade-in-up">
              {/* Donor */}
              <div
                onClick={() => {
                  setUserType("donor");
                }}
                className={
                  userType === "donor"
                    ? "bg-red bg-opacity-20 border  border-red hover:p-10 hover:-translate-y-4 cursor-pointer border-2 duration-300 rounded-xl p-8 flex justify-center items-center flex-col"
                    : "bg-white  border hover:border-red hover:p-10 hover:-translate-y-4 cursor-pointer border-2 duration-300 rounded-xl p-8 flex justify-center items-center flex-col"
                }
              >
                <img className="" src={donorIllu} alt="" />
                <p className="text-red text-xl">Donor</p>
              </div>
              {/* Medical Center */}
              <div
                onClick={() => {
                  setUserType("medicalcenter");
                }}
                className={
                  userType === "medicalcenter"
                    ? "bg-red bg-opacity-20 border text-white border-red hover:p-10 hover:-translate-y-4 cursor-pointer border-2 duration-300 rounded-xl p-8 flex justify-center items-center flex-col"
                    : "bg-white text-red border hover:border-red hover:p-10 hover:-translate-y-4 cursor-pointer border-2 duration-300 rounded-xl p-8 flex justify-center items-center flex-col"
                }
              >
                <img className="" src={medicalcenterIllu} alt="" />
                <p className="text-red text-xl">Medical Center</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[26rem]">
            {/* -------------------- Step 4 -------------------- */}
            {userType === "donor" ? (
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                <EnvelopeIcon className="w-6" />
                <input
                  class="outline-none w-full"
                  type="text"
                  placeholder="name@example.com"
                />
              </div>
            ) : (
              <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                <EnvelopeIcon className="w-6" />
                <input
                  class="outline-none w-full"
                  type="text"
                  placeholder="name@example.com"
                />
              </div>
            )}
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
                ? "mt-4 max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
                : "mt-4 max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin"
            }
          >
            <h1>Continue</h1>
          </button>
        ) : (
          <div className="min-w-[26rem] grid grid-cols-6 gap-2 grid-rows-1 mt-4">
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
