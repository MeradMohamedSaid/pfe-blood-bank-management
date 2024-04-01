import React from "react";
import { Link } from "react-router-dom";

const AppNotice = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] fade-in-up">
      <h1 className="text-4xl mb-4 font-bold">
        Your Application is being processed!
      </h1>
      <p>Thank you for applying to become a donor. </p>
      <p>
        Your application is currently being processed by our team at a high
        pace.{" "}
      </p>
      <p>We appreciate your patience.</p>
      <Link
        to="/donor/application"
        className="my-4 bg-red text-white py-4 px-14 hover:bg-opacity-90 duration-300  rounded-xl"
      >
        Review Your Application
      </Link>
      <Link to="/about-us" className="text-sm text-red hover:underline duration-300 cursor-pointer">
        Or find out more About Us!
      </Link>
    </div>
  );
};

export default AppNotice;
