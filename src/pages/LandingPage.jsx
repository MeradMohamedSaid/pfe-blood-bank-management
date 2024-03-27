import React from "react";
import { useTranslation } from "react-i18next";
import heroIllu from "../assets/hero-illu.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AppLayout } from "../components/AppLayout";
const LandingPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <AppLayout>
      <div className="container ">
        <div
          className={
            i18n.language === "ar"
              ? "w-full grid grid-cols-2 grid-rows-1 grid-flow-col gap-8 py-10"
              : "w-full grid grid-cols-2 grid-rows-1 grid-flow-col gap-8 py-10"
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
          <div className={i18n === "ar" ? "col-start-1 row-start-1" : ""}>
            <img src={heroIllu} alt="" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
