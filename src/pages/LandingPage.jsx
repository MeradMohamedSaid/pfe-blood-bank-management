import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import heroIllu from "../assets/hero-illu.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AppLayout } from "../components/AppLayout";
import footerImg from "../assets/footer.png";
const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [center, setCenter] = useState();
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
            <div className=" flex justify-between items-center mt-10 gap-2">
              <div
                onClick={() => {
                  setShowModal(!showModal);
                }}
                className="relative bg-white w-full py-4 px-6 rounded-full flex justify-between items-center text-red  text-opacity-50 border hover:border-red duration-300 cursor-pointer"
              >
                {center == null ? (
                  <p>{t("landingpage.findCenter")}</p>
                ) : (
                  <p>{center}</p>
                )}
                <ChevronDownIcon class="h-6 w-6 " />
                {showModal ? (
                  <div className="absolute top-16 overflow-y-auto h-40 w-full left-0 rounded-2xl text-sm bg-white border hover:border-red flex flex-col">
                    <p
                      onClick={() => {
                        setCenter("Medical Center 1");
                      }}
                      className="py-2 px-4 hover:bg-red-50 duration-300"
                    >
                      Medical Center 1
                    </p>
                    <p
                      onClick={() => {
                        setCenter("Medical Center 2");
                      }}
                      className="py-2 px-4 hover:bg-red-50 duration-300"
                    >
                      Medical Center 2
                    </p>
                    <p
                      onClick={() => {
                        setCenter("Medical Center 3");
                      }}
                      className="py-2 px-4 hover:bg-red-50 duration-300"
                    >
                      Medical Center 3
                    </p>
                    <p
                      onClick={() => {
                        setCenter("Medical Center 4");
                      }}
                      className="py-2 px-4 hover:bg-red-50 duration-300"
                    >
                      Medical Center 4
                    </p>
                    <p
                      onClick={() => {
                        setCenter("Medical Center 5");
                      }}
                      className="py-2 px-4 hover:bg-red-50 duration-300"
                    >
                      Medical Center 5
                    </p>
                    <p
                      onClick={() => {
                        setCenter("Medical Center 6");
                      }}
                      className="py-2 px-4 hover:bg-red-50 duration-300"
                    >
                      Medical Center 6
                    </p>
                  </div>
                ) : null}
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
      <footer className="absolute bottom-0 -z-10">
        <img src={footerImg} />
      </footer>
    </AppLayout>
  );
};

export default LandingPage;
