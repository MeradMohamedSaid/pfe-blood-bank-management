import React from "react";
import { useTranslation } from "react-i18next";
import heroIllu from "../assets/hero-illu.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
const LandingPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="container h-[100vh]">
      <div className="w-full grid grid-cols-2 gap-8 py-10">
        {/* Text */}
        <div className="flex justify-center flex-col">
          {/* Title */}
          <h1 className="text-5xl font-bold">{t("landingpage.title1")}</h1>
          <h1 className="text-5xl font-bold">{t("landingpage.title2")}</h1>
          <p className="mt-4 opacity-80">{t("landingpage.content")}</p>
          {/* Center Search */}
          <div className="flex justify-between items-center mt-10 gap-2">
            <div className="bg-white w-full py-4 px-6 rounded-full flex justify-between items-center text-red  text-opacity-50 border hover:border-red duration-300 cursor-pointer">
              <p>{t("landingpage.findCenter")}</p>
              <ChevronDownIcon class="h-6 w-6 " />
            </div>
            <button className="bg-red text-white py-4 px-6 rounded-full min-w-fit hover:bg-opacity-80 duration-300">
              {t("landingpage.startJourney")}
            </button>
          </div>
        </div>
        {/* Hero Illustration */}
        <div>
          <img src={heroIllu} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
