import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import heroIllu from "../assets/hero-illu.svg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AppLayout } from "../components/AppLayout";
import footerImg from "../assets/footer.png";

import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [center, setCenter] = useState();
  const [centers, setCenters] = useState();

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    console.log("fetching centers");
    const cent = await getCenters();
    setCenters((old) => cent);
  };

  const getCenters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getstroingcentre",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to fetch Centers data");
      }

      console.log("Centers data:", response.data.Results);
      return response.data.Results;
    } catch (error) {
      console.error("Error fetching Centers data:", error.message);
      throw error;
    }
  };

  return (
    <AppLayout>
      <div className="container">
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
                ? "flex justify-center flex-col col-start-2 text-arabic fade-in-right-to-left"
                : "flex justify-center flex-col text-latin fade-in-left-to-right"
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
                className="relative bg-white w-full py-4 px-6 rounded-xl flex justify-between items-center text-red  text-opacity-50 border hover:border-red duration-300 cursor-pointer"
              >
                {center == null ? (
                  <p>{t("landingpage.findCenter")}</p>
                ) : (
                  <p>{center.name}</p>
                )}
                <ChevronDownIcon className="h-6 w-6 " />
                {showModal ? (
                  <div className="absolute top-16 overflow-y-auto max-h-40 w-full left-0 rounded-md text-sm bg-white border hover:border-red flex flex-col">
                    {centers &&
                      centers.map((cen, _) => {
                        return (
                          <p
                            key={_}
                            onClick={() => {
                              setCenter(cen);
                            }}
                            className="py-2 px-4 hover:bg-red-50 duration-300"
                          >
                            {cen.name}
                          </p>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <Link
                className="bg-red text-white py-4 px-6 rounded-xl min-w-fit hover:bg-opacity-80 duration-300"
                to="/signup"
              >
                {t("landingpage.startJourney")}
              </Link>
            </div>
          </div>
          {/* Hero Illustration */}
          <div
            className={
              i18n === "ar"
                ? "col-start-1 row-start-1 fade-in-left-to-right"
                : "fade-in-right-to-left"
            }
          >
            <img src={heroIllu} alt="" />
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 -z-10 fade-in-up">
        <img src={footerImg} />
      </footer>
    </AppLayout>
  );
};

export default LandingPage;
