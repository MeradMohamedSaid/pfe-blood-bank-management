import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import "./font.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./i18n";
import { Suspense } from "react";

import SignUp from "./pages/SignUp.jsx";
import DonorApplication from "./pages/DApplication.jsx";
import DonorApp from "./pages/DAppointment.jsx";
import DonorHistory from "./pages/DHistory.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ClinicAppointment from "./pages/CAppointment.jsx";
import ClinicApplication from "./pages/CApplication.jsx";
import ClinicHistory from "./pages/CHistory.jsx";
import ClinicAppointmentPhase from "./pages/CAppointmentPhase.jsx";
import SetAppoitment from "./pages/DSetAppointment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/donor", element: <DonorApp /> },
  { path: "/donor/application", element: <DonorApplication /> },
  { path: "/donor/appointment", element: <DonorApp /> },
  { path: "/donor/appointment/setAppointment", element: <SetAppoitment /> },
  { path: "/donor/history", element: <DonorHistory /> },
  { path: "/clinic", element: <ClinicHistory /> },
  { path: "/clinic/application", element: <ClinicApplication /> },
  { path: "/clinic/appointment", element: <ClinicAppointment /> },
  { path: "/clinic/history", element: <ClinicHistory /> },
  { path: "/clinic/makeappointment", element: <ClinicAppointmentPhase /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
