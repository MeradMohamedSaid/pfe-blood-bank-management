import React from "react";
import { useTranslation } from "react-i18next";
const LandingPage = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage('fr-fr');
  return <h1>{t("Welcome to React")}</h1>;
};

export default LandingPage;
