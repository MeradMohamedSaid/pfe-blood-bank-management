// Importing necessary modules from React and external libraries
import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline"; // Importing icons for UI
import { useTranslation } from "react-i18next"; // Importing translation hook
import loginDrop from "../assets/loginDrop.png"; // Importing image asset
import { AppLayout } from "../components/AppLayout"; // Importing custom layout component
import { Link } from "react-router-dom"; // Importing Link component for routing
import footerImg from "../assets/footer.png";

// Define Login component
const Login = () => {
  // State to manage password visibility
  const [pwVisible, setPwVisible] = useState("false");

  // Translation hook
  const { t, i18n } = useTranslation();

  // Render UI
  return (
    <AppLayout>
      <div className="container w-fit pt-20 flex justify-center items-center">
        {/* Background image */}
        <img className="fixed top-[19rem] -z-50" src={loginDrop} alt="" />

        {/* Login form */}
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

          {/* Input Fields */}
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
                placeholder="Password"
                type={!pwVisible ? "text" : "Password"} // Toggle password visibility
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

          {/* Login button */}
          <button
            className={
              i18n.language === "ar"
                ? "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
                : "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin"
            }
          >
            <h1>{t("login.login")}</h1>
          </button>

          {/* Link to signup */}
          <Link
            to="/signup"
            className="text-red underline mt-2 text-sm cursor-pointer"
          >
            {t("login.notDonor")}
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-0 -z-10">
        <img src={footerImg} />
      </footer>
    </AppLayout>
  );
};

// Exporting Login component as default
export default Login;
