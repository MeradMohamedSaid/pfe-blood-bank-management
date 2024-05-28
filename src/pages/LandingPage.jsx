import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import heroIllu from "../assets/hero-illu.svg";
import {
  ChevronDownIcon,
  ClockIcon,
  FireIcon,
  GlobeAltIcon,
  HeartIcon,
  LockClosedIcon,
  StarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";
import { AppLayout } from "../components/AppLayout";
import { Link } from "react-router-dom";
import footerImg from "../assets/footer.png";
const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [center, setCenter] = useState();
  return (
    <AppLayout>
      <div className="h-[88vh] w-[100vw] overflow-hidden px-20 flex flex-col justify-center items-center overflow-y-scroll">
        <div className="h-full px-40">
          <div
            className={
              i18n.language === "ar"
                ? "w-full grid grid-cols-2 grid-rows-1 grid-flow-col py-10 px-40"
                : "w-full grid grid-cols-2 grid-rows-1 grid-flow-col py-10 px-40"
            }
          >
            {/* Text */}
            <div
              className={
                i18n.language === "ar"
                  ? "flex justify-center flex-col col-start-2 text-arabic"
                  : "flex justify-center flex-col text-latin"
              }
            >
              {/* Title */}
              <h1
                className={
                  i18n.language === "ar"
                    ? "text-5xl font-bold text-arabic"
                    : "text-5xl font-bold text-latin"
                }
              >
                {t("landingpage.title1.word1")}{" "}
                <span className="text-red">{t("landingpage.title1.h1")}</span>
                {t("landingpage.title1.word2")}{" "}
                <span className="text-red">{t("landingpage.title1.h2")}</span>
              </h1>
              <h1
                className={
                  i18n.language === "ar"
                    ? "text-5xl font-bold text-arabic"
                    : "text-5xl font-bold text-latin"
                }
              >
                {t("landingpage.title2.word1")}{" "}
                <span className="text-red">{t("landingpage.title2.h1")}</span>
              </h1>
              <p className="mt-4 opacity-80">{t("landingpage.content")}</p>
              {/* Center Search */}
            </div>
            {/* Hero Illustration */}
            <div className={i18n === "ar" ? "col-start-1 row-start-1 " : ""}>
              <img src={heroIllu} alt="" />
            </div>
          </div>
          <section className="my-10">
            <h1 className="text-4xl text-red mb-4">Our Key Features</h1>
            <div className="grid grid-cols-3 gap-4">
              {/* cell */}
              <div className="hover:bg-red hover:text-white text-red border border-slate-200 hover:border-red bg-white p-4 rounded-lg cursor-default hover:scale-105 duration-300 hover:shadow-xl">
                <div className="flex gap-1 items-center mb-2">
                  <HeartIcon className="w-6" />
                  <p className="font-bold text-xl">User-Friendly Interface</p>
                </div>
                <p>
                  Access our intuitive and easy-to-navigate platform via any web
                  browser.
                </p>
              </div>
              {/* cell */}
              <div className="hover:bg-red hover:text-white text-red border border-slate-200 hover:border-red bg-white p-4 rounded-lg cursor-default hover:scale-105 duration-300 hover:shadow-xl">
                <div className="flex gap-1 items-center mb-2">
                  <LockClosedIcon className="w-6" />
                  <p className="font-bold text-xl">Secure Registration</p>
                </div>
                <p>
                  Sign up as a donor, clinic, or blood bank with our secure
                  registration process.
                </p>
              </div>
              {/* cell */}
              <div className="hover:bg-red hover:text-white text-red border border-slate-200 hover:border-red bg-white p-4 rounded-lg cursor-default hover:scale-105 duration-300 hover:shadow-xl">
                <div className="flex gap-1 items-center mb-2">
                  <ClockIcon className="w-6" />
                  <p className="font-bold text-xl">
                    Real-Time Stock Management
                  </p>
                </div>
                <p>Track the availability of blood packets in real-time.</p>
              </div>
              {/* cell */}
              <div className="hover:bg-red hover:text-white text-red border border-slate-200 hover:border-red bg-white p-4 rounded-lg cursor-default hover:scale-105 duration-300 hover:shadow-xl">
                <div className="flex gap-1 items-center mb-2">
                  <FireIcon className="w-6" />
                  <p className="font-bold text-xl">
                    Efficient Donor Management
                  </p>
                </div>
                <p>
                  Manage donor information, donation history, and appointment
                  scheduling.
                </p>
              </div>
              {/* cell */}
              <div className="hover:bg-red hover:text-white text-red border border-slate-200 hover:border-red bg-white p-4 rounded-lg cursor-default hover:scale-105 duration-300 hover:shadow-xl">
                <div className="flex gap-1 items-center mb-2">
                  <GlobeAltIcon className="w-6" />
                  <p className="font-bold text-xl">
                    Streamlined Clinic Requests
                  </p>
                </div>
                <p>
                  Submit and track blood requests easily through the clinic
                  dashboard.
                </p>
              </div>
              {/* cell */}
              <div className="hover:bg-red hover:text-white text-red border border-slate-200 hover:border-red bg-white p-4 rounded-lg cursor-default hover:scale-105 duration-300 hover:shadow-xl">
                <div className="flex gap-1 items-center mb-2">
                  <WrenchScrewdriverIcon className="w-6" />
                  <p className="font-bold text-xl">Administrative Control</p>
                </div>
                <p>
                  Full system oversight, user management, and transaction
                  validation by administrators.
                </p>
              </div>
            </div>
          </section>
          <section className="my-10">
            <h1 className="text-4xl text-red mb-4">How It Works</h1>
            <div className="grid grid-cols-2 gap-8">
              {/* row */}
              <div className="flex flex-col  justify-center">
                <div className="flex gap-1">
                  <h1 className="text-2xl text-red font-bold mb-4">
                    1. Register or Login
                  </h1>
                </div>
                <p className="">
                  - New users can register as a donor, clinic, or blood bank.
                </p>
                <p className="">
                  - Existing users can log in to access their dashboard.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-red">
                <img src={step1} alt="" />
              </div>
              {/* row */}
              <div className="overflow-hidden rounded-xl border border-red">
                <img src={step2} alt="" />
              </div>
              <div className="flex flex-col  justify-center">
                <div className="flex gap-1">
                  <h1 className="text-2xl text-red font-bold mb-4">
                    2. Manage Your Profile
                  </h1>
                </div>
                <p className="">
                  - Update your personal information and view your application
                  status.
                </p>
                <p className="">
                  - Schedule appointments and track donation history.
                </p>
              </div>
              {/* row */}
              <div className="flex flex-col  justify-center">
                <div className="flex gap-1">
                  <h1 className="text-2xl text-red font-bold mb-4">
                    3. Submit Requests
                  </h1>
                </div>
                <p className="">
                  - Clinics can submit blood requests and manage their stock.
                </p>
                <p className="">
                  - Blood banks can validate requests and manage blood packets.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-red">
                <img src={step3} alt="" />
              </div>
              {/* row */}
              <div className="overflow-hidden rounded-xl border border-red">
                <img src={step4} alt="" />
              </div>
              <div className="flex flex-col  justify-center">
                <div className="flex gap-1">
                  <h1 className="text-2xl text-red font-bold mb-4">
                    4. Track and Validate
                  </h1>
                </div>
                <p className="">
                  - Real-time tracking of blood packet status and request
                  validation ensures efficient management.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h1 className=" text-center   text-4xl text-red mb-4">
              Our Mission
            </h1>
            <p className="text-center text-xl">
              To create an efficient, secure, and user-friendly platform that
              connects donors, clinics, and blood banks, ensuring that blood is
              available when and where it is needed the most.
            </p>
          </section>
          <section className="my-20 bg-red text-white rounded-xl py-16 px-8 grid grid-cols-2 gap-8">
            <div className="">
              <h1 className="text-4xl font-bold">Join Us Today</h1>
              <p>
                Become a part of our life-saving network. Whether you're a
                donor, clinic, or blood bank, our system offers a seamless
                experience for managing blood donations and requests.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link
                className="text-red font-bold text-xl bg-white py-4 px-16 rounded-xl floating"
                to="/signup"
              >
                Join Us Now
              </Link>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
