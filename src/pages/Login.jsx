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
  const [pwVisible, setPwVisible] = useState("false");
  const { t, i18n } = useTranslation();
  return (
    <AppLayout>
      <div className="container w-fit pt-20 flex justify-center items-center">
        <img className="fixed top-[19rem] -z-50" src={loginDrop} alt="" />
        <div
          className={
            i18n.language === "ar"
              ? "flex flex-col justify-center items-center text-arabic"
              : "flex flex-col justify-center items-center text-latin"
          }
        >
          <p className="mb-2">{t("login.donor")}</p>
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center w-3/4 text-latin"
            }
          >
            {t("login.welcome")}
          </h1>
          {/* Input Field */}
          <div className="w-[26rem]">
            <p className="text-sm mb-2">{t("login.email")}</p>
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <EnvelopeIcon className="w-6" />
              <input
                class="outline-none w-full"
                type="text"
                placeholder="name@example.com"
              />
            </div>
            <p className="text-sm mb-2">{t("login.password")}</p>
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
          <button
            className={
              i18n.language === "ar"
                ? "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
                : "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin"
            }
          >
            <h1>{t("login.login")}</h1>
          </button>
          <p className="text-red underline mt-2 text-sm cursor-pointer">
            {t("login.notDonor")}
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
