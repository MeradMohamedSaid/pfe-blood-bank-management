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
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";
import "ldrs/wobble";
import "ldrs/quantum";
import "ldrs/ring2";

// Define Login component
const Login = () => {
  const navigate = useNavigate();

  //state to block login
  const [isWorking, setIsWorking] = useState(false);

  // State to manage password visibility
  const [pwVisible, setPwVisible] = useState("false");

  const [ErrorMSG, setErrorMSG] = useState(false);

  // Translation hook
  const { t, i18n } = useTranslation();

  //Function
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setUserEmail(email);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async () => {
    setIsWorking((old) => true);
    const loginJson = { email: userEmail, password: password };
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginJson,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        // console.log("Login failed");
        throw new Error("Login failed");
      }
      console.log("Login successful:", response.data);
      new Promise((resolve) => {
        setTimeout(() => {
          setIsWorking((old) => false);
          switch (response.data.Session.role) {
            case 2:
              navigate("/donor");
              break;
            case 3:
              navigate("/clinic");
              break;
            default:
              break;
          }
          resolve();
        }, 1000);
      });
    } catch (error) {
      console.log("Login failed");
      new Promise((resolve) => {
        setTimeout(() => {
          setIsWorking((old) => false);
          setErrorMSG((ofld) => true);
          resolve();
        }, 1000);
      });

      console.error("Error logging in:", error.message);
    }
  };

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
                ? "text-5xl mb-8 text-center text-arabic"
                : "text-5xl mb-8 text-center w-3/4 text-latin"
            }
          >
            {t("login.welcome")}
          </h1>

          {/* Input Fields */}
          <div className="w-[26rem]">
            <p className="text-sm mb-2">{t("login.email")}</p>
            <div
              className={
                !isWorking
                  ? "bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4"
                  : "bg-F4F4F4 p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red cursor-not-allowed text-red mb-4"
              }
            >
              <EnvelopeIcon className="w-6" />
              <input
                className={
                  !isWorking
                    ? "outline-none w-full"
                    : "outline-none w-full bg-F4F4F4 cursor-not-allowed"
                }
                type="text"
                placeholder="name@example.com"
                onChange={handleEmailChange} // Add onChange handler for password input
                disabled={isWorking}
              />
            </div>

            <p className="text-sm mb-2">{t("login.password")}</p>
            <div
              className={
                !isWorking
                  ? "bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4"
                  : "bg-F4F4F4 p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red cursor-not-allowed text-red mb-4"
              }
            >
              <LockClosedIcon className="w-6" />
              <input
                placeholder="Password"
                type={!pwVisible ? "text" : "Password"} // Toggle password visibility
                className={
                  !isWorking
                    ? "outline-none w-full"
                    : "outline-none w-full bg-F4F4F4 cursor-not-allowed"
                }
                onChange={handlePasswordChange} // Add onChange handler for password input
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
              !isWorking
                ? i18n.language === "ar"
                  ? // ? "max-w-[26rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic"
                    "max-w-[26rem] min-h-[3rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-arabic flex justify-center items-center"
                  : "max-w-[26rem] min-h-[3rem] bg-red text-center text-white w-full py-2 rounded-xl hover:bg-opacity-70 duration-300 cursor-pointer text-latin flex justify-center items-center"
                : i18n.language === "ar"
                ? "max-w-[26rem] min-h-[3rem] bg-disable text-center text-white w-full py-2 rounded-xl cursor-not-allowed text-arabic flex justify-center items-center"
                : "max-w-[26rem] min-h-[3rem] bg-disable text-center text-white w-full py-2 rounded-xl cursor-not-allowed text-latin flex justify-center items-center"
            }
            disabled={isWorking}
            onClick={async () => {
              await handleLogin();
            }}
          >
            {isWorking ? (
              <>
                {/* <l-wobble
                  size="15"
                  speed="0.9"
                  color="rgb(255,197,207)"
                ></l-wobble> */}
                <l-ring-2
                  size="20"
                  stroke="2"
                  stroke-length="0.25"
                  bg-opacity="0.1"
                  speed="0.8"
                  color="rgb(255,197,207)"
                ></l-ring-2>
              </>
            ) : (
              <h1
                className={
                  i18n.language === "ar" ? "text-arabic" : "text-latin"
                }
              >
                {t("signup.buttons.signin")}
              </h1>
            )}
          </button>
          <h2
            className={
              i18n.language === "ar"
                ? "text-arabic-err max-w-[26rem] text-center"
                : "text-latin-err max-w-[26rem] text-center"
            }
          >
            {ErrorMSG ? t("login.wrong") : ""}
          </h2>
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
