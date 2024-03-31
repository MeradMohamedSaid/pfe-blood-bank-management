import React from "react";

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
      <button className="my-4 bg-red text-white py-4 px-14 hover:bg-opacity-90 duration-300  hover:scale-110 rounded-xl">
        Review Your Application
      </button>
      <p className="text-sm text-red hover:underline duration-300 cursor-pointer">
        Or find out more About Us!
      </p>
    </div>
  );
};

export default AppNotice;
