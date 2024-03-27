import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  PhoneIcon,
  ChevronRightIcon,
  CheckIcon,
  CheckCircleIcon,
  MapPinIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import loginDrop from "../assets/loginDrop.png";
import { AppLayout } from "../components/AppLayout";
import donorIllu from "../assets/donor.png";
import medicalcenterIllu from "../assets/medicalcenter.png";
import { use } from "i18next";
const SignUp = () => {
  const [steps, setSteps] = useState(1);
  const [pwVisible, setPwVisible] = useState("false");
  // Data Grabbers
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState();
  const [userGender, setUserGender] = useState("");
  const [userType, setUserType] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [sexualRelationType, setSexualRelationType] = useState("");
  const [gotDiseases, setGotDiseases] = useState(false);
  // Validation States
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [clinicNameValid, setClinicNameValid] = useState(false);
  const [clinicAddressValid, setClinicAddressValid] = useState(false);
  // UI Conrolling States
  const [canContinue, setCanContinue] = useState();
  const [srBtn, setSrBtn] = useState(false);
  const [btBtn, setbtBtn] = useState(false);
  const { t, i18n } = useTranslation();
  const handleButtonClick = (type) => {
    setBloodType(type);
  };
  const handleSrButtonClick = (type) => {
    setSexualRelationType(type);
  };
  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setUserEmail(email);
    setEmailValid(isValid);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordVerificationChange = (event) => {
    const passwordVerification = event.target.value;
    const currentPassword = password;
    const isValid = passwordVerification === currentPassword;
    setPasswordVerification(passwordVerification);
    setPasswordValid(isValid);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
    if (userName != null) {
      setNameValid(true);
    }
  };
  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    const phoneNumberRegex = /^(05|06|07)\d{8}$/;
    const isValid = phoneNumberRegex.test(phoneNumber);
    setUserPhoneNumber(phoneNumber);
    setPhoneNumberValid(isValid);
  };

  const handleClinicNameChange = (event) => {
    setClinicName(event.target.value);
    if (clinicName != null) {
      setClinicNameValid(true);
    }
  };
  const handleClinicAddressChange = (event) => {
    setClinicAddress(event.target.value);
    if (clinicAddress != null) {
      setClinicAddressValid(true);
    }
  };

  return (
    <AppLayout>
      <div
        className={
          i18n.language === "ar"
            ? "container w-fit flex flex-col pt-20 justify-center items-center text-arabic"
            : "container w-fit flex flex-col pt-20 justify-center items-center text-latin"
        }
      >
        <img
          className={
            i18n.language === "ar"
              ? "fixed top-[19rem] left-[42%]  -z-50"
              : "fixed top-[19rem] -z-50"
          }
          src={loginDrop}
          alt=""
        />
        {/* Steps Tracker */}
        <div
          className={
            i18n.language === "ar"
              ? "mb-4 flex  justify-center items-center "
              : "mb-4 flex flex-row justify-center items-center text-latin"
          }
        >
          {/* Step 1 */}
          <div className="bg-red  text-white p-3 text-sm rounded-full w-4 h-4 flex justify-center items-center">
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
            {t("signup.steps.step1")}
          </h1>
        ) : steps === 2 ? (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            {t("signup.steps.step2")}
          </h1>
        ) : steps === 3 ? (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            {t("signup.steps.step3")}
          </h1>
        ) : (
          <h1
            className={
              i18n.language === "ar"
                ? "text-5xl mb-8 text-center  text-arabic"
                : "text-5xl mb-8 text-center  text-latin"
            }
          >
            {t("signup.steps.step4")}
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
                placeholder={t("signup.placeholders.email")}
                onChange={handleEmailChange} // Add onChange handler for email input
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder={t("signup.placeholders.password")}
                type={!pwVisible ? "text" : "Password"}
                class="outline-none w-full"
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
            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <LockClosedIcon className="w-6" />
              <input
                placeholder={t("signup.placeholders.confirmPassword")}
                type={!pwVisible ? "text" : "Password"}
                className="outline-none w-full"
                onChange={handlePasswordVerificationChange} // Add onChange handler for password verification input
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
                placeholder={t("signup.placeholders.name")}
                onChange={handleNameChange} // Add onChange handler for name input
              />
            </div>

            <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
              <PhoneIcon className="w-6" />
              <input
                placeholder={t("signup.placeholders.phoneNumber")}
                type="number"
                class="outline-none w-full"
                onChange={handlePhoneNumberChange} // Add onChange handler for phone number input
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
                <p>{t("signup.choices.male")}</p>
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
                <p>{t("signup.choices.female")}</p>
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
                <p className="text-red text-xl">{t("signup.choices.donor")}</p>
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
                <p className="text-red text-xl">
                  {t("signup.choices.medicalClinic")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[26rem] fade-in-up">
            {/* -------------------- Step 4 -------------------- */}
            {userType === "donor" ? (
              <div>
                {/* ----- Donor Fields -----  */}
                {/* Blood Type */}
                <div
                  onClick={() => {
                    setSrBtn(false);
                    setbtBtn(!btBtn);
                  }}
                  className={
                    btBtn
                      ? "relative cursor-pointer bg-red  duration-300 text-white  p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red  mb-4"
                      : "relative cursor-pointer hover:px-6 hover:bg-red duration-300 hover:text-white bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4"
                  }
                >
                  {bloodType === null ? (
                    <p>{t("signup.choices.bloodType")}</p>
                  ) : (
                    <p>
                      {t("signup.choices.bloodType")} : {bloodType}
                    </p>
                  )}
                  {i18n.language === "ar" ? (
                    <ChevronLeftIcon className="w-6" />
                  ) : (
                    <ChevronRightIcon className="w-6" />
                  )}
                  {btBtn ? (
                    <div
                      className={
                        i18n.language === "ar"
                          ? "bg-white border-red text-red absolute -left-28 top-0 p-2 border rounded-lg grid grid-cols-1 grid-rows-8 gap-2 fade-in-left-to-right"
                          : "bg-white border-red text-red absolute -right-28 top-0 p-2 border rounded-lg grid grid-cols-1 grid-rows-8 gap-2 fade-in-left-to-right"
                      }
                    >
                      <button
                        className={
                          bloodType === "A+"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("A+")}
                      >
                        A+
                      </button>
                      <button
                        className={
                          bloodType === "A-"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("A-")}
                      >
                        A-
                      </button>
                      <button
                        className={
                          bloodType === "B+"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("B+")}
                      >
                        B+
                      </button>
                      <button
                        className={
                          bloodType === "B-"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("B-")}
                      >
                        B-
                      </button>
                      <button
                        className={
                          bloodType === "AB+"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("AB+")}
                      >
                        AB+
                      </button>
                      <button
                        className={
                          bloodType === "AB-"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("AB-")}
                      >
                        AB-
                      </button>
                      <button
                        className={
                          bloodType === "O+"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("O+")}
                      >
                        O+
                      </button>
                      <button
                        className={
                          bloodType === "O-"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleButtonClick("O-")}
                      >
                        O-
                      </button>
                    </div>
                  ) : null}
                </div>
                {/* Sexual Relationship Type */}
                <div
                  onClick={() => {
                    setbtBtn(false);
                    setSrBtn(!srBtn);
                  }}
                  className={
                    srBtn
                      ? "relative cursor-pointer bg-red  duration-300 text-white  p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red  mb-4"
                      : "relative cursor-pointer hover:px-6 hover:bg-red duration-300 hover:text-white bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4"
                  }
                >
                  {sexualRelationType === null ? (
                    <p>{t("signup.choices.bloodType")}</p>
                  ) : (
                    <p>
                      {t("signup.choices.sexualRelationships")} :{" "}
                      {sexualRelationType}
                    </p>
                  )}
                  {i18n.language === "ar" ? (
                    <ChevronLeftIcon className="w-6" />
                  ) : (
                    <ChevronRightIcon className="w-6" />
                  )}
                  {srBtn ? (
                    <div
                      className={
                        i18n.language === "ar"
                          ? "bg-white border-red text-red absolute -left-52 top-0 p-2 border rounded-lg grid grid-cols-1 grid-rows-4 gap-2 fade-in-left-to-right"
                          : "bg-white border-red text-red absolute -right-44 top-0 p-2 border rounded-lg grid grid-cols-1 grid-rows-4 gap-2 fade-in-left-to-right"
                      }
                    >
                      <button
                        className={
                          sexualRelationType === "Marital"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleSrButtonClick("Marital")}
                      >
                        {t("signup.marriageType.maritial")}
                      </button>
                      <button
                        className={
                          sexualRelationType === "Premarital"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleSrButtonClick("Premarital")}
                      >
                        {t("signup.marriageType.preMaritial")}
                      </button>
                      <button
                        className={
                          sexualRelationType === "Casual"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleSrButtonClick("Casual")}
                      >
                        {t("signup.marriageType.casual")}
                      </button>
                      <button
                        className={
                          sexualRelationType === "Polyamorous"
                            ? "py-2 px-6 border-red border rounded-lg bg-red text-white duration-300"
                            : "py-2 px-6 border-red border rounded-lg hover:bg-red hover:text-white duration-300"
                        }
                        onClick={() => handleSrButtonClick("Polyamorous")}
                      >
                        {t("signup.marriageType.polyamorous")}
                      </button>
                    </div>
                  ) : null}
                </div>
                {/* Have Blood Related Diseases */}
                <div
                  onClick={() => {
                    setGotDiseases(!gotDiseases);
                  }}
                  className={
                    gotDiseases
                      ? "bg-red text-white p-4 cursor-pointer rounded-xl flex justify-between items-center gap-2 w-full border border-red  mb-4"
                      : "bg-white p-4 cursor-pointer rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4 hover:bg-red hover:text-white hover:px-6 duration-300"
                  }
                >
                  <p>{t("signup.choices.haveBloodRelatedDiseases")}</p>
                  {gotDiseases ? <CheckIcon className="w-6" /> : null}
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                  <IdentificationIcon className="w-6" />
                  <input
                    type="text"
                    className="w-full outline-none text-red"
                    placeholder={t("signup.placeholders.clinicName")}
                    onChange={handleClinicNameChange} // Add onChange handler for clinic name input
                  />
                </div>
                <div className="bg-white p-4 rounded-xl flex justify-between items-center gap-2 w-full border border-red text-red mb-4">
                  <MapPinIcon className="w-6" />
                  <input
                    type="text"
                    className="w-full outline-none text-red"
                    placeholder={t("signup.placeholders.clinicAddress")}
                    onChange={handleClinicAddressChange} // Add onChange handler for clinic address input
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {/* Continue Button */}
        {steps === 1 ? (
          <button
            disabled={emailValid === false && passwordValid === false}
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
            <h1
              className={i18n.language === "ar" ? "text-arabic" : "text-latin"}
            >
              {t("signup.buttons.continue")}
            </h1>
          </button>
        ) : (
          <div
            className={
              i18n.language === "ar"
                ? "min-w-[26rem]  grid grid-cols-6 gap-2 grid-rows-1 mt-4 text-arabic"
                : "min-w-[26rem]  grid grid-cols-6 gap-2 grid-rows-1 mt-4"
            }
          >
            <button
              onClick={() => {
                if (steps > 1) {
                  setSteps(steps - 1);
                }
              }}
              className="bg-transparent text-red flex justify-center items-center border border-red rounded-lg hover:bg-red hover:text-white duration-300"
            >
              {i18n.language === "ar" ? (
                <ArrowRightIcon className="w-6" />
              ) : (
                <ArrowLeftIcon className="w-6" />
              )}
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
              <h1
                className={
                  i18n.language === "ar" ? "text-arabic" : "text-latin"
                }
              >
                {t("signup.buttons.continue")}
              </h1>
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SignUp;
