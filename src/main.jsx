import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import "./font.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import "./i18n";
import { Suspense } from "react";
import footerImg from "./assets/footer.png";
import SignUp from "./pages/SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense>
      <Navbar />
      <RouterProvider router={router} />
      <footer className="absolute bottom-0">
        <img src={footerImg} />
      </footer>
    </Suspense>
  </React.StrictMode>
);
